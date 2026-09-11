import { toJpeg, toPng } from 'html-to-image';
import JSZip from 'jszip';
import { ensureAllFontsLoaded } from './pdfExporter';

// ─── Filter: remove UI-only elements ──────────────────────────────────────────
const exportFilter = (node) => {
  if (node.classList &&
    (node.classList.contains('no-print') || node.classList.contains('export-hidden'))) {
    return false;
  }
  return true;
};

const fallbackPlaceholder =
  'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="transparent"/%3E%3C/svg%3E';

// ─── Ensure all images are fully loaded & decoded before canvas capture ──────
const ensureAllImagesLoaded = async (rootElement) => {
  const imgs = Array.from(rootElement.querySelectorAll('img'));
  await Promise.allSettled(
    imgs.map(async (img) => {
      if (img.complete && img.naturalWidth > 0) {
        if (img.decode) {
          try { await img.decode(); } catch (_) {}
        }
        return;
      }
      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
      if (img.decode) {
        try { await img.decode(); } catch (_) {}
      }
    })
  );
};

// XML Special character escaping
const escapeXml = (unsafe) => {
  if (typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

// ─── Extract Vector Graphics (SVGs & Ornaments) for pure Illustrator layers ───
const extractVectorElements = (rootElement, pageRect) => {
  const vectors = [];
  
  // Extract SVGs (Icons, Borders, Decorative elements)
  const svgNodes = rootElement.querySelectorAll('svg');
  svgNodes.forEach(svg => {
    // 1. Skip elements hidden from export or print
    if (svg.closest('.no-print') || svg.closest('.export-hidden')) return;

    // 2. Skip nested SVGs to avoid duplicate exports
    if (svg.parentElement && svg.parentElement.closest('svg')) return;

    const rect = svg.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const style = window.getComputedStyle(svg);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;

    const relX = rect.left - pageRect.left;
    const relY = rect.top - pageRect.top;

    // 3. Clone node and manipulate attributes via standard DOM APIs (never regex on XML strings)
    const clone = svg.cloneNode(true);

    // Apply explicit rendered dimensions (safely updates width/height without affecting stroke-width or others)
    clone.setAttribute('width', rect.width.toFixed(1));
    clone.setAttribute('height', rect.height.toFixed(1));
    clone.removeAttribute('x');
    clone.removeAttribute('y');

    // Ensure valid SVG namespace
    if (!clone.getAttribute('xmlns')) {
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    }

    // Replace currentColor with actual computed element color
    const computedColor = style.color || '#ffffff';
    const allDescendants = [clone, ...clone.querySelectorAll('*')];
    allDescendants.forEach(node => {
      if (node.getAttribute('stroke') === 'currentColor') {
        node.setAttribute('stroke', computedColor);
      }
      if (node.getAttribute('fill') === 'currentColor') {
        node.setAttribute('fill', computedColor);
      }
    });

    // Cleanly serialize DOM element to valid W3C XML
    const serializer = new XMLSerializer();
    const cleanSvgMarkup = serializer.serializeToString(clone);

    vectors.push({
      type: 'svg',
      html: cleanSvgMarkup,
      x: relX,
      y: relY,
      width: rect.width,
      height: rect.height,
      opacity: style.opacity !== '1' ? style.opacity : null,
    });
  });

  return vectors;
};

const generateSvgGraphicsElements = (vectors) => {
  return vectors.map((item, idx) => {
    if (item.type === 'svg') {
      return `    <g id="Vector_${idx}" transform="translate(${item.x.toFixed(1)}, ${item.y.toFixed(1)})" ${item.opacity ? `opacity="${item.opacity}"` : ''}>
      ${item.html}
    </g>`;
    }
    return '';
  }).join('\n');
};

// ─── Extract visible text nodes from DOM for live Illustrator editing ─────────
const extractTextNodes = (rootElement, pageRect) => {
  const textItems = [];
  const walker = document.createTreeWalker(rootElement, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (parent.closest('.no-print') || parent.closest('.export-hidden')) {
        return NodeFilter.FILTER_REJECT;
      }
      if (!node.nodeValue || !node.nodeValue.trim()) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  let node;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    const rect = parent.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;

    const style = window.getComputedStyle(parent);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;

    // Get exact range bounding box for this text node
    let targetRect = rect;
    try {
      const range = document.createRange();
      range.selectNodeContents(node);
      const rangeRect = range.getBoundingClientRect();
      if (rangeRect.width > 0 && rangeRect.height > 0) {
        targetRect = rangeRect;
      }
    } catch (_) { /* fallback to parent rect */ }

    const relX = targetRect.left - pageRect.left;
    const relY = targetRect.top - pageRect.top;

    let fontFamily = (style.fontFamily || 'sans-serif').split(',')[0].replace(/['"]/g, '').trim();
    if (!fontFamily) fontFamily = 'Plus Jakarta Sans';

    const fontSize = parseFloat(style.fontSize) || 12;
    const fontWeight = style.fontWeight || '400';
    const fontStyle = style.fontStyle || 'normal';
    
    // Resolve computed color (convert rgb/rgba to hex/rgb)
    let color = style.color || '#ffffff';
    if (color === 'rgba(0, 0, 0, 0)') color = '#ffffff';

    const letterSpacing = style.letterSpacing !== 'normal' ? style.letterSpacing : '0';

    textItems.push({
      text: node.nodeValue.trim(),
      x: relX,
      y: relY,
      width: targetRect.width,
      height: targetRect.height,
      fontSize,
      fontFamily,
      fontWeight,
      fontStyle,
      color,
      letterSpacing,
    });
  }

  return textItems;
};

// ─── Build SVG <text> elements with proper wrapping and baselines ─────────────
const generateSvgTextElements = (textItems) => {
  return textItems.map((item) => {
    const { text, x, y, width, height, fontSize, fontFamily, fontWeight, fontStyle, color, letterSpacing } = item;
    const baselineY = y + fontSize * 0.85;

    // Check if multi-line text description
    const isMultiLine = height > fontSize * 1.6 && text.includes(' ');

    if (!isMultiLine) {
      return `    <text x="${x.toFixed(1)}" y="${baselineY.toFixed(1)}" font-family="'${escapeXml(fontFamily)}', 'Segoe UI', sans-serif" font-size="${fontSize.toFixed(1)}" font-weight="${fontWeight}" font-style="${fontStyle}" fill="${color}" letter-spacing="${letterSpacing}">${escapeXml(text)}</text>`;
    }

    // Word wrapping for multi-line descriptions
    const words = text.split(/\s+/);
    const avgCharWidth = Math.max(5, fontSize * 0.52);
    const maxCharsPerLine = Math.max(15, Math.floor(width / avgCharWidth));

    const lines = [];
    let currentLine = '';
    for (const word of words) {
      if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
        currentLine = (currentLine + ' ' + word).trim();
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);

    const lineHeight = fontSize * 1.35;
    const tspans = lines.map((line, idx) => {
      const lineY = (baselineY + idx * lineHeight).toFixed(1);
      return `<tspan x="${x.toFixed(1)}" y="${lineY}">${escapeXml(line)}</tspan>`;
    }).join('');

    return `    <text font-family="'${escapeXml(fontFamily)}', 'Segoe UI', sans-serif" font-size="${fontSize.toFixed(1)}" font-weight="${fontWeight}" font-style="${fontStyle}" fill="${color}">${tspans}</text>`;
  }).join('\n');
};

// ─── Capture page as an Illustrator-compatible SVG with LIVE EDITABLE TEXT ────
const capturePageAsSVG = async (element) => {
  const w = element.offsetWidth || 794;
  const h = element.offsetHeight || 1123;
  const isLandscape = w > h;
  const widthMM = isLandscape ? '297mm' : '210mm';
  const heightMM = isLandscape ? '210mm' : '297mm';
  const canvasW = isLandscape ? 3508 : 2480;
  const canvasH = isLandscape ? 2480 : 3508;
  const computedBg = window.getComputedStyle(element).backgroundColor;
  const bgColor = computedBg && computedBg !== 'rgba(0, 0, 0, 0)' ? computedBg : '#0a1610';

  // 1. Ensure all photos (including arch sidebar photos) are decoded in memory
  await ensureAllImagesLoaded(element);

  // 2. Measure and extract all live text nodes and vector elements before hiding
  const pageRect = element.getBoundingClientRect();
  const textItems = extractTextNodes(element, pageRect);
  const vectorItems = extractVectorElements(element, pageRect);

  // 3. Hide text temporarily to capture pure background layout & photography at 300 DPI
  // NOTE: We deliberately do NOT hide SVGs here, because SVGs define <clipPath> (e.g. arch-clip)
  // needed by the photo containers to render the arch photography properly!
  const hideTextStyle = document.createElement('style');
  hideTextStyle.id = 'temp-svg-export-style';
  hideTextStyle.innerHTML = `
    .temp-export-clean-bg,
    .temp-export-clean-bg * {
      color: transparent !important;
      text-shadow: none !important;
      -webkit-text-fill-color: transparent !important;
    }
    .temp-export-clean-bg [class*="bg-clip-text"],
    .temp-export-clean-bg [style*="background-clip: text"],
    .temp-export-clean-bg [style*="-webkit-background-clip: text"] {
      background: transparent !important;
      background-image: none !important;
      -webkit-text-fill-color: transparent !important;
    }
  `;
  document.head.appendChild(hideTextStyle);
  element.classList.add('temp-export-clean-bg');

  let bgImgDataUrl;
  try {
    const captureOpts = {
      filter: exportFilter,
      backgroundColor: bgColor,
      quality: 0.85,
      pixelRatio: 3.15, // 300 DPI precision
      canvasWidth: w,
      canvasHeight: h,
      skipFonts: false,
      cacheBust: false,
      imagePlaceholder: fallbackPlaceholder,
      style: {
        transform: 'none',
        margin: '0',
        padding: '0',
        boxShadow: 'none',
        border: 'none',
        outline: 'none',
        overflow: 'hidden',
        width: `${w}px`,
        height: `${h}px`,
        minWidth: `${w}px`,
        maxWidth: `${w}px`,
        minHeight: `${h}px`,
        maxHeight: `${h}px`,
      },
    };

    try {
      bgImgDataUrl = await toJpeg(element, captureOpts);
    } catch {
      bgImgDataUrl = await toPng(element, captureOpts);
    }
  } finally {
    element.classList.remove('temp-export-clean-bg');
    if (hideTextStyle.parentNode) {
      document.head.removeChild(hideTextStyle);
    }
  }

  // 4. Generate SVG vector layers
  const svgVectorContent = generateSvgGraphicsElements(vectorItems);
  const svgTextContent = generateSvgTextElements(textItems);

  // 4. Construct complete Illustrator-compatible SVG with structured layers
  const svgContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" 
     xmlns:xlink="http://www.w3.org/1999/xlink" 
     width="${widthMM}" 
     height="${heightMM}" 
     viewBox="0 0 ${w} ${h}" 
     version="1.1">
  <defs>
    <style type="text/css">
      @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&amp;family=Cairo:wght@400;600;700;800&amp;family=Cinzel:wght@400;500;600;700;800;900&amp;family=Inter:wght@300;400;500;600;700&amp;family=Outfit:wght@300;400;500;600;700&amp;family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,600;1,700&amp;family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&amp;family=Tajawal:wght@400;500;700;800&amp;display=swap');
    </style>
  </defs>

  <!-- Layer 1: High-Res Background Layout & Photography (Divs, CSS Shapes, Shadows, Photos) -->
  <g id="Layer_1_Background_Layout">
    <rect width="${w}" height="${h}" fill="${bgColor}" />
    <image width="${w}" height="${h}" x="0" y="0" xlink:href="${bgImgDataUrl}" href="${bgImgDataUrl}" />
  </g>

  <!-- Layer 2: Vector Graphics, Icons & Decorative Borders -->
  <g id="Layer_2_Vector_Graphics_and_Borders">
${svgVectorContent}
  </g>

  <!-- Layer 3: Live Editable Texts, Dish Names & Prices (Selectable with Type Tool T in Illustrator) -->
  <g id="Layer_3_Editable_Texts_and_Prices">
${svgTextContent}
  </g>
</svg>`;

  return svgContent;
};

export const exportMenuAsSVG = async (pages, onProgress) => {
  const total = pages.length;
  if (total === 0) throw new Error('لا توجد صفحات للتصدير.');

  if (onProgress) {
    onProgress(0, total, 'جاري تحميل الخطوط وضمان جاهزية النصوص...');
  }
  await ensureAllFontsLoaded();

  const zip = new JSZip();
  let addedCount = 0;

  for (let i = 0; i < total; i++) {
    const page = pages[i];
    if (onProgress) {
      onProgress(i + 1, total, `تجهيز الصفحة ${page.pageNumber || i + 1} للإليستريتور بنصوص حية قابلة للتعديل...`);
    }

    const wrapper = document.getElementById(page.id);
    if (!wrapper) continue;

    const element = wrapper.querySelector('.a4-page, .a4-landscape-page') || wrapper;
    const fileName = (page.id === 'page0' || page.pageNumber === '00')
      ? 'Alsafi_Menu_Page_00_Cover_Editable.svg'
      : `Alsafi_Menu_Page_${String(page.pageNumber || i).padStart(2, '0')}_Editable.svg`;

    const svgString = await capturePageAsSVG(element);

    // Validate XML to guarantee no parse errors
    if (typeof DOMParser !== 'undefined') {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgString, 'image/svg+xml');
        const parserError = doc.querySelector('parsererror');
        if (parserError) {
          console.warn(`[SVG Exporter] XML Parsing warning in ${fileName}:`, parserError.textContent);
        }
      } catch (xmlErr) {
        console.warn('[SVG Exporter] XML validation check error:', xmlErr);
      }
    }

    zip.file(fileName, svgString);
    addedCount++;
  }

  if (addedCount === 0) throw new Error('لم يتم العثور على صفحات للمعالجة.');
  
  if (onProgress) {
    onProgress(total, total, 'جاري ضغط ملفات الـ SVG وتحميلها...');
  }

  const content = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });
  
  // Download the ZIP
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Alsafi_Menu_Illustrator_Editable_SVG_${new Date().toISOString().slice(0,10)}.zip`;
  a.click();
  URL.revokeObjectURL(url);
};
