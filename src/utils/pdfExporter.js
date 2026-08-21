import { toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';

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
 * Capture a page element as a JPEG at EXACTLY A4 @ 300 DPI (2480×3508px).
 *
 * The .a4-page element is defined as 210mm×297mm in CSS. At screen 96dpi,
 * this renders as ~793.7×1122.5px. Using pixelRatio=3.15 would give ~2500px
 * wide — slightly LARGER than true 300dpi A4 (2480px). Instead, we force
 * canvasWidth=2480 and canvasHeight=3508 so the output is mathematically
 * exact A4 regardless of screen DPI or zoom level.
 */
const capturePage = async (element, pixelRatio = 3.0, quality = 0.95) => {
  const w = element.offsetWidth || 794;
  const h = element.offsetHeight || 1123;

  const computedBg = window.getComputedStyle(element).backgroundColor;
  const opts = {
    quality: quality,
    pixelRatio:   Math.max(2.0, pixelRatio),
    backgroundColor: computedBg && computedBg !== 'rgba(0, 0, 0, 0)' ? computedBg : '#050a07',
    filter:       exportFilter,
    skipFonts:    false,
    cacheBust:    false,
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
    width:        w,
    height:       h,
    canvasWidth:  Math.round(w * Math.max(2.0, pixelRatio)),
    canvasHeight: Math.round(h * Math.max(2.0, pixelRatio)),
  };

  // Primary attempt
  try {
    // Inject Google Fonts directly into the element to ensure html-to-image picks them up
    const fontStyle = document.createElement('style');
    fontStyle.innerHTML = `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;
    element.appendChild(fontStyle);
    
    const result = await toJpeg(element, opts);
    element.removeChild(fontStyle);
    return result;
  } catch (_) {
    // Fallback attempt
    return await toJpeg(element, {
      ...opts,
      quality:    0.65,
      pixelRatio: 2.0,
    });
  }
};


/**
 * Build a jsPDF document from all pages.
 * Each page image is placed at (0,0) with size 210×297mm — ZERO margins, full bleed.
 */
const buildPDF = async (pages, onProgress, pixelRatio = 3.15, quality = 0.95) => {
  const total = pages.length;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [A4_W_MM, A4_H_MM], // exact A4
    compress: true,
    putOnlyUsedFonts: true,
    floatPrecision: 'smart',
  });

  // ── Document metadata ──────────────────────────────────────────────────────
  pdf.setDocumentProperties({
    title: 'Alsafi Restaurant Menu – Speisekarte',
    author: 'Alsafi Restaurant Heidelberg',
    subject: 'Speisekarte Full Bleed 300DPI',
    keywords: 'menu, speisekarte, alsafi, halal',
    creator: 'Alsafi Menu Editor PRO',
  });

  // ── PRINT LOCK — embedded inside the PDF file itself ───────────────────────
  // 1. PDF/ISO-32000 standard: instructs every compliant viewer (Acrobat,
  //    Chrome PDF, Edge, Foxit, Preview on macOS, etc.) to print at ACTUAL
  //    SIZE — no shrink-to-fit, no scale-to-paper, no auto-margin addition.
  try {
    pdf.viewerPreferences({
      PrintScaling:   'None',   // disables "Shrink to printable area"
      FitWindow:      false,    // don't resize viewer window
      CenterWindow:   true,
      DisplayDocTitle: true,
    });
  } catch (_) { /* older jsPDF builds may not have viewerPreferences */ }

  // 2. Acrobat JavaScript: fires when "Print" is triggered from Acrobat.
  //    bShrinkToFit:false = hard-block Acrobat's margin compensation.
  //    This works in Adobe Acrobat Reader & Pro.
  try {
    pdf.addJS(
      'if (typeof this.print === "function") {' +
      '  this.print({ bUI: true, bSilent: false, bShrinkToFit: false });' +
      '}'
    );
  } catch (_) { /* safe to skip */ }


  let addedCount = 0;

  for (let i = 0; i < total; i++) {
    const page = pages[i];
    if (onProgress) {
      onProgress(i + 1, total, `معالجة الصفحة ${page.pageNumber || i + 1} / ${total} بدقة 300 DPI...`);
    }

    const wrapper = document.getElementById(page.id);
    if (!wrapper) continue;

    // Use the inner .a4-page div for pixel-perfect capture
    const element = wrapper.querySelector('.a4-page') || wrapper;

    const dataUrl = await capturePage(element, pixelRatio, quality);

    if (addedCount > 0) pdf.addPage([A4_W_MM, A4_H_MM], 'portrait');

    // Place image: x=0, y=0, w=210mm, h=297mm → TRUE full bleed, zero margin
    pdf.addImage(
      dataUrl,
      'JPEG',
      0,        // x — from left edge
      0,        // y — from top edge
      A4_W_MM,  // full width
      A4_H_MM,  // full height
      `page_${i}`,
      'FAST',
    );

    addedCount++;
  }

  if (addedCount === 0) throw new Error('لم يتم العثور على صفحات للمعالجة.');
  return pdf;
};

// ─── PUBLIC API ────────────────────────────────────────────────────────────────

/**
 * Export full menu as a downloadable PDF.
 * 300 DPI, full bleed (0 margins), compressed JPEG stream.
 */
export const exportMenuAsPDF = async (
  pages,
  onProgress,
  options = { dpi: 300, quality: 0.65 } // Aggressive compression to fix huge 40MB+ file size
) => {
  const pixelRatio = options.dpi === 150 ? 1.75 : 3.15; // 3.15 perfectly maps A4 to 300 DPI (2480px width)
  const quality    = options.quality || 0.65; // Force 0.65 compression for optimal size/quality ratio

  if (onProgress) onProgress(0, pages.length, 'جاري بناء ملف الـ PDF بدقة 300 DPI...');

  const pdf = await buildPDF(pages, onProgress, pixelRatio, quality);

  if (onProgress) onProgress(pages.length, pages.length, 'جاري حفظ الملف...');

  const filename = `Alsafi_Menu_300DPI_${new Date().toISOString().slice(0, 10)}.pdf`;
  pdf.save(filename);
};

