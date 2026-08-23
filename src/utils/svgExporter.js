import { toPng } from 'html-to-image';
import JSZip from 'jszip';

// ─── Filter: remove UI-only elements ──────────────────────────────────────────
const exportFilter = (node) => {
  if (node.classList &&
    (node.classList.contains('no-print') || node.classList.contains('export-hidden'))) {
    return false;
  }
  return true;
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

// ─── Extract Vector Graphics (SVGs & Images) for pure Illustrator layers ──────
const extractVectorElements = (rootElement, pageRect) => {
  const vectors = [];
  
  // Extract SVGs (Icons, Borders)
  const svgNodes = rootElement.querySelectorAll('svg');
  svgNodes.forEach(svg => {
    const rect = svg.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const style = window.getComputedStyle(svg);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;

    const relX = rect.left - pageRect.left;
    const relY = rect.top - pageRect.top;
    
    vectors.push({
      type: 'svg',
      html: svg.outerHTML,
      x: relX,
      y: relY,
      width: rect.width,
      height: rect.height,
      opacity: style.opacity !== '1' ? style.opacity : null,
      color: style.color || '#ffffff'
    });
  });

  // Extract Images (Photos)
  const imgNodes = rootElement.querySelectorAll('img');
  imgNodes.forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const style = window.getComputedStyle(img);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;

    const relX = rect.left - pageRect.left;
    const relY = rect.top - pageRect.top;

    vectors.push({
      type: 'image',
      src: img.src,
      x: relX,
      y: relY,
      width: rect.width,
      height: rect.height,
      opacity: style.opacity !== '1' ? style.opacity : null,
      objectFit: style.objectFit
    });
  });

  return vectors;
};

const generateSvgGraphicsElements = (vectors) => {
  return vectors.map((item, idx) => {
    if (item.type === 'svg') {
      let html = item.html;
      // Force exact dimensions and fix currentColors so Illustrator reads it right
      html = html.replace(/^<svg([^>]*)>/i, (match, attrs) => {
        let cleanAttrs = attrs.replace(/\b(width|height|x|y)="[^"]*"/gi, '');
        return `<svg width="${item.width}" height="${item.height}" ${cleanAttrs}>`;
      });
      html = html.replace(/currentColor/gi, item.color);
      
      return `    <g id="Vector_${idx}" transform="translate(${item.x.toFixed(1)}, ${item.y.toFixed(1)})" ${item.opacity ? `opacity="${item.opacity}"` : ''}>
      ${html}
    </g>`;
    } else if (item.type === 'image') {
      return `    <g id="Image_${idx}" transform="translate(${item.x.toFixed(1)}, ${item.y.toFixed(1)})" ${item.opacity ? `opacity="${item.opacity}"` : ''}>
      <image width="${item.width}" height="${item.height}" xlink:href="${escapeXml(item.src)}" href="${escapeXml(item.src)}" preserveAspectRatio="${item.objectFit === 'cover' ? 'xMidYMid slice' : 'xMidYMid meet'}" />
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
  const computedBg = window.getComputedStyle(element).backgroundColor;
  const bgColor = computedBg && computedBg !== 'rgba(0, 0, 0, 0)' ? computedBg : '#050a07';

  // 1. Measure and extract all live text nodes and vector elements before hiding
  const pageRect = element.getBoundingClientRect();
  const textItems = extractTextNodes(element, pageRect);
  const vectorItems = extractVectorElements(element, pageRect);

  // 2. Hide text and vectors temporarily to capture pure background layout at 300 DPI
  const hideTextStyle = document.createElement('style');
  hideTextStyle.id = 'temp-svg-export-style';
  hideTextStyle.innerHTML = `
    .temp-export-clean-bg,
    .temp-export-clean-bg * {
      color: transparent !important;
      text-shadow: none !important;
      -webkit-text-fill-color: transparent !important;
    }
    .temp-export-clean-bg svg,
    .temp-export-clean-bg img {
      opacity: 0 !important;
      visibility: hidden !important;
    }
  `;
  document.head.appendChild(hideTextStyle);
  element.classList.add('temp-export-clean-bg');

  let bgPngDataUrl;
  try {
    bgPngDataUrl = await toPng(element, {
      filter: exportFilter,
      backgroundColor: bgColor,
      pixelRatio: 3.15, // 300 DPI precision
      canvasWidth: 2480,
      canvasHeight: 3508,
      skipFonts: false,
      cacheBust: false,
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
    });
  } finally {
    element.classList.remove('temp-export-clean-bg');
    if (hideTextStyle.parentNode) {
      document.head.removeChild(hideTextStyle);
    }
  }

  // 3. Generate SVG vector layers
  const svgVectorContent = generateSvgGraphicsElements(vectorItems);
  const svgTextContent = generateSvgTextElements(textItems);

  // 4. Construct complete Illustrator-compatible SVG with structured layers
  const svgContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" 
     xmlns:xlink="http://www.w3.org/1999/xlink" 
     width="210mm" 
     height="297mm" 
     viewBox="0 0 ${w} ${h}" 
     version="1.1">
  <defs>
    <style type="text/css">
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&amp;family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap');
    </style>
  </defs>

  <!-- Layer 1: High-Res Background Layout (Divs, CSS Shapes, Shadows) -->
  <g id="Layer_1_Background_Layout">
    <rect width="${w}" height="${h}" fill="${bgColor}" />
    <image width="${w}" height="${h}" x="0" y="0" xlink:href="${bgPngDataUrl}" href="${bgPngDataUrl}" />
  </g>

  <!-- Layer 2: Vector Graphics, Icons & Decorative Borders -->
  <g id="Layer_2_Vector_Graphics_and_Photos">
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

  const zip = new JSZip();
  let addedCount = 0;

  for (let i = 0; i < total; i++) {
    const page = pages[i];
    if (onProgress) {
      onProgress(i + 1, total, `تجهيز الصفحة ${page.pageNumber || i + 1} للإليستريتور بنصوص حية قابلة للتعديل...`);
    }

    const wrapper = document.getElementById(page.id);
    if (!wrapper) continue;

    const element = wrapper.querySelector('.a4-page') || wrapper;
    const svgString = await capturePageAsSVG(element);
    
    zip.file(`Alsafi_Menu_Page_${String(i + 1).padStart(2, '0')}_Editable.svg`, svgString);
    addedCount++;
  }

  if (addedCount === 0) throw new Error('لم يتم العثور على صفحات للمعالجة.');
  
  if (onProgress) {
    onProgress(total, total, 'جاري ضغط ملفات الـ SVG وتحميلها...');
  }

  const content = await zip.generateAsync({ type: 'blob' });
  
  // Download the ZIP
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Alsafi_Menu_Illustrator_Editable_SVG_${new Date().toISOString().slice(0,10)}.zip`;
  a.click();
  URL.revokeObjectURL(url);
};
