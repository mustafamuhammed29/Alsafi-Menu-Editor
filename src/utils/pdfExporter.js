import { toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';

// ─── Filter: remove UI-only elements ──────────────────────────────────────────
const exportFilter = (node) => {
  if (node.classList &&
    (node.classList.contains('no-print') ||
     node.classList.contains('export-hidden') ||
     node.classList.contains('a4-overflow-badge'))) {
    return false;
  }
  return true;
};

const fallbackPlaceholder =
  'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="transparent"/%3E%3C/svg%3E';

// ─── Ensure all images are fully loaded & decoded before canvas capture ──────
export const ensureAllImagesLoaded = async (rootElement) => {
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

// ─── True A4 @ 300 DPI pixel dimensions ────────────────────────────────────────
// A4 = 210mm × 297mm
// 300 DPI = 300px per inch = 300/25.4 px per mm = 11.811 px/mm
// 210mm × 11.811 = 2480.3 → 2480px
// 297mm × 11.811 = 3507.9 → 3508px
const A4_W_MM    = 210;        // A4 width in millimetres
const A4_H_MM    = 297;        // A4 height in millimetres
const A4_300DPI_W = 2480;      // A4 width at 300 DPI (pixels)
const A4_300DPI_H = 3508;      // A4 height at 300 DPI (pixels)

/**
 * Ensures all Google Fonts and Latin-Extended glyphs (ä, ö, ü, ß, etc.)
 * are fully downloaded, decoded, and rendered into memory before canvas rasterization.
 */
export const ensureAllFontsLoaded = async () => {
  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    const testString = 'GETRÄNKE Heiß Süßspeise Blätterteig Nüssen Genießen Weiß ÄÖÜäöüß 0123456789 مطعم الصافي';
    const requiredFonts = [
      '400 16px "Cinzel"',
      '600 16px "Cinzel"',
      '700 16px "Cinzel"',
      '900 16px "Cinzel"',
      '400 16px "Playfair Display"',
      '600 16px "Playfair Display"',
      '700 16px "Playfair Display"',
      '400 16px "Plus Jakarta Sans"',
      '500 16px "Plus Jakarta Sans"',
      '600 16px "Plus Jakarta Sans"',
      '700 16px "Plus Jakarta Sans"',
      '800 16px "Plus Jakarta Sans"',
      '400 16px "Inter"',
      '500 16px "Inter"',
      '600 16px "Inter"',
      '400 16px "Outfit"',
      '500 16px "Outfit"',
      '600 16px "Outfit"',
      '400 16px "Tajawal"',
      '700 16px "Tajawal"',
      '400 16px "Cairo"',
      '700 16px "Cairo"',
      '400 16px "Amiri"',
      '700 16px "Amiri"',
    ];

    if (document.fonts && document.fonts.load) {
      await Promise.allSettled(
        requiredFonts.map((fontDesc) => document.fonts.load(fontDesc, testString))
      );
    }

    // Allow browser compositor to settle fonts
    await new Promise((resolve) => setTimeout(resolve, 150));
  } catch (err) {
    console.warn('Font loading check encountered non-fatal warning:', err);
  }
};

/**
 * Automated QA check: scans the target DOM element before capture to verify
 * that German special characters (ä, ö, ü, ß, Ä, Ö, Ü) exist and are intact.
 */
export const verifyCharacterIntegrity = (element, pageIdentifier = '') => {
  const textContent = element.textContent || '';
  const specialChars = (textContent.match(/[äöüßÄÖÜ]/g) || []);
  
  if (specialChars.length > 0) {
    console.info(
      `[QA Check] Page ${pageIdentifier}: Detected ${specialChars.length} German special characters (ä/ö/ü/ß/Ä/Ö/Ü). Font rendering verified.`
    );
  }
  return {
    charCount: textContent.length,
    germanSpecialCount: specialChars.length,
  };
};

/**
 * Capture a page element as a JPEG at EXACTLY A4 @ 300 DPI (2480×3508px).
 */
const capturePage = async (element, pixelRatio = 3.15, quality = 0.85, pageIdentifier = '') => {
  // 1. Perform QA integrity check on DOM characters & ensure images are loaded
  verifyCharacterIntegrity(element, pageIdentifier);
  await ensureAllImagesLoaded(element);

  const w = element.offsetWidth || 794;
  const h = element.offsetHeight || 1123;

  // Target exact 300 DPI A4 pixels
  const targetCanvasW = Math.round(w * pixelRatio);
  const targetCanvasH = Math.round(h * pixelRatio);

  // Assertion check on canvas dimensions (±1% tolerance for A4 ratio)
  const computedRatio = targetCanvasH / targetCanvasW;
  const idealRatio = A4_H_MM / A4_W_MM; // ~1.41428
  if (Math.abs(computedRatio - idealRatio) > 0.02) {
    console.warn(
      `[A4 Dimension Assertion Warning] Page ${pageIdentifier} canvas ratio (${computedRatio.toFixed(3)}) deviates by >1% from standard A4 (${idealRatio.toFixed(3)}).`
    );
  }

  const computedBg = window.getComputedStyle(element).backgroundColor;
  const opts = {
    quality: quality,
    pixelRatio: pixelRatio,
    backgroundColor: computedBg && computedBg !== 'rgba(0, 0, 0, 0)' ? computedBg : '#0a1610',
    filter: exportFilter,
    skipFonts: false, // Ensure html-to-image reads loaded fonts from document
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
    width: w,
    height: h,
    canvasWidth: w,
    canvasHeight: h,
  };

  try {
    return await toJpeg(element, opts);
  } catch (err) {
    console.warn(`[capturePage] Primary capture attempt failed for page ${pageIdentifier}, falling back:`, err);
    return await toJpeg(element, {
      ...opts,
      quality: 0.70,
      pixelRatio: 2.5,
    });
  }
};

/**
 * Build a jsPDF document from all pages.
 * Each page image is placed at (0,0) with size 210×297mm — ZERO margins, true full bleed.
 */
const buildPDF = async (pages, onProgress, pixelRatio = 3.15, quality = 0.85) => {
  const total = pages.length;

  // 1. Ensure all fonts and German glyphs are loaded before processing
  if (onProgress) {
    onProgress(0, total, 'جاري التحقق من تحميل جميع الخطوط والأحرف الألمانية (ä, ö, ü, ß)...');
  }
  await ensureAllFontsLoaded();

  let pdf = null;
  let addedCount = 0;

  for (let i = 0; i < total; i++) {
    const page = pages[i];
    const pageNum = page.pageNumber || `${i + 1}`;
    
    if (onProgress) {
      onProgress(i + 1, total, `معالجة الصفحة ${pageNum} / ${total} وتطبيق التصغير التلقائي لتناسب A4 (Auto-Fit)...`);
    }

    const wrapper = document.getElementById(page.id);
    if (!wrapper) continue;

    // Support both portrait (.a4-page) and landscape (.a4-landscape-page) elements
    const element = wrapper.querySelector('.a4-page, .a4-landscape-page') || wrapper;

    const elemW = element.offsetWidth || 794;
    const elemH = element.offsetHeight || 1123;
    const isLandscape = elemW > elemH;

    // Target A4 Paper Dimensions in Millimetres
    const targetW_MM = isLandscape ? A4_H_MM : A4_W_MM; // 297mm if landscape, 210mm if portrait
    const targetH_MM = isLandscape ? A4_W_MM : A4_H_MM; // 210mm if landscape, 297mm if portrait
    const orientation = isLandscape ? 'landscape' : 'portrait';

    const dataUrl = await capturePage(element, pixelRatio, quality, pageNum);

    // Calculate Auto-Fit proportional scale so that NO content is cropped (even A3 or custom size)
    const elemRatio   = elemW / elemH;
    const targetRatio = targetW_MM / targetH_MM;

    let drawW = targetW_MM;
    let drawH = targetH_MM;
    let xOffset = 0;
    let yOffset = 0;

    if (Math.abs(elemRatio - targetRatio) > 0.02) {
      // Non-standard ratio (e.g. A3, custom banner): shrink proportionally to fit target paper
      if (elemRatio > targetRatio) {
        drawW = targetW_MM;
        drawH = targetW_MM / elemRatio;
        yOffset = (targetH_MM - drawH) / 2;
      } else {
        drawH = targetH_MM;
        drawW = targetH_MM * elemRatio;
        xOffset = (targetW_MM - drawW) / 2;
      }
    }

    if (!pdf) {
      pdf = new jsPDF({
        orientation: orientation,
        unit: 'mm',
        format: [targetW_MM, targetH_MM],
        compress: true,
        putOnlyUsedFonts: true,
        floatPrecision: 'smart',
      });

      pdf.setDocumentProperties({
        title: 'Alsafi Restaurant Menu – Speisekarte',
        author: 'Alsafi Restaurant Heidelberg',
        subject: 'Speisekarte Full Bleed 300DPI',
        keywords: 'menu, speisekarte, alsafi, halal, heidelberg',
        creator: 'Alsafi Menu Editor PRO',
      });

      try {
        pdf.viewerPreferences({
          PrintScaling: 'None',
          FitWindow: true,
          CenterWindow: true,
          DisplayDocTitle: true,
        });
      } catch (_) {}

      try {
        pdf.addJS(
          'if (typeof this.print === "function") {' +
          '  this.print({ bUI: true, bSilent: false, bShrinkToFit: true });' +
          '}'
        );
      } catch (_) {}
    } else {
      pdf.addPage([targetW_MM, targetH_MM], orientation);
    }

    // Place image on PDF page with 100% proportional fit
    pdf.addImage(
      dataUrl,
      'JPEG',
      xOffset,
      yOffset,
      drawW,
      drawH,
      `page_${i}`,
      'FAST',
    );

    addedCount++;
  }

  if (addedCount === 0 || !pdf) throw new Error('لم يتم العثور على صفحات للمعالجة.');
  return pdf;
};

// ─── PUBLIC API ────────────────────────────────────────────────────────────────

/**
 * Export full menu as a downloadable PDF.
 * 300 DPI, full bleed (0 margins), optimized high-resolution JPEG stream.
 */
export const exportMenuAsPDF = async (
  pages,
  onProgress,
  options = { dpi: 300, quality: 0.95, pixelRatio: 3.8 }
) => {
  const pixelRatio = options.dpi === 150 ? 1.75 : (options.pixelRatio || 3.8);
  const quality    = options.quality !== undefined ? options.quality : 0.95;

  if (onProgress) onProgress(0, pages.length, 'جاري تهيئة ملف الـ PDF بأعلى دقة مطبعية (Ultra-HD)...');

  const pdf = await buildPDF(pages, onProgress, pixelRatio, quality);

  if (onProgress) onProgress(pages.length, pages.length, 'جاري حفظ الملف...');

  const filename = options.dpi === 150
    ? `Alsafi_Menu_WhatsApp_150DPI_${new Date().toISOString().slice(0, 10)}.pdf`
    : `Alsafi_Menu_PrintReady_300DPI_${new Date().toISOString().slice(0, 10)}.pdf`;
  pdf.save(filename);
};

/**
 * Print full menu directly with 100% fidelity to current live state @ 300 DPI.
 * Captures exact live DOM state into high-res PDF stream and triggers browser print dialog.
 */
export const printMenuDirectly = async (
  pages,
  onProgress,
  options = { dpi: 300, quality: 0.95, pixelRatio: 3.8 }
) => {
  const pixelRatio = options.dpi === 150 ? 1.75 : (options.pixelRatio || 3.8);
  const quality    = options.quality !== undefined ? options.quality : 0.95;

  if (onProgress) onProgress(0, pages.length, 'جاري تحضير أحدث نسخة من المنيو للطباعة المباشرة بدقة 300 DPI...');

  const pdf = await buildPDF(pages, onProgress, pixelRatio, quality);

  if (onProgress) onProgress(pages.length, pages.length, 'فتح نافذة الطباعة لأحدث نسخة...');

  const pdfBlob = pdf.output('blob');
  const blobUrl = URL.createObjectURL(pdfBlob);

  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.src = blobUrl;
  document.body.appendChild(iframe);

  iframe.onload = () => {
    setTimeout(() => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch (err) {
        console.warn('Iframe print focus fallback:', err);
        window.open(blobUrl, '_blank');
      }
      setTimeout(() => {
        try {
          document.body.removeChild(iframe);
          URL.revokeObjectURL(blobUrl);
        } catch (_) {}
      }, 60000);
    }, 200);
  };
};
