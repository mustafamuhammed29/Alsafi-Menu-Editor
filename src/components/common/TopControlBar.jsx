import React, { useState } from 'react';
import {
  Printer,
  Download,
  Sparkles,
  Loader2,
  Check,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  X,
  Smartphone,
  Ruler,
  Grid,
  ShieldCheck,
  Sun,
} from 'lucide-react';
import { useMenu } from '../../context/MenuContext';
import { exportMenuAsPDF, printMenuDirectly } from '../../utils/pdfExporter';
import { exportMenuAsSVG } from '../../utils/svgExporter';
import { validateMenuForExport } from '../../utils/menuValidator';

// ─── Main TopControlBar ────────────────────────────────────────────────────────
export const TopControlBar = () => {
  const {
    appMode,
    setAppMode,
    flyerData,
    exportBackup,
    pages,
    coverPageData,
    showCoverPage,
    previewZoom,
    zoomInPreview,
    zoomOutPreview,
    resetPreviewZoom,
    setPreviewZoom,
    showPrintGuides,
    togglePrintGuides,
    showLayoutGrid,
    toggleLayoutGrid,
    maximizeAllPagesTypography,
    unifyAllTypography,
    enforceSafePrintInsets,
    isPlainPaperMode,
    togglePlainPaperMode,
  } = useMenu();

  const [isWorking, setIsWorking]               = useState(false);
  const [workProgress, setWorkProgress]         = useState({ current: 0, total: 0, text: '' });
  const [isPdfSuccess, setIsPdfSuccess]         = useState(false);
  const [isSvgSuccess, setIsSvgSuccess]         = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  // All exportable pages including the standalone Cover Page (Page 0) if enabled
  const allExportablePages = (showCoverPage && coverPageData)
    ? [coverPageData, ...pages]
    : pages;

  // ── validate helper ──────────────────────────────────────────────────────────
  const validate = () => {
    if (appMode === 'flyer') return true;
    const val = validateMenuForExport(allExportablePages);
    if (!val.isValid) { setValidationErrors(val.errors); return false; }
    return true;
  };

  // ── Direct High-Res Print (300 DPI Live DOM Capture) ───────────────────────
  const handleDirectPrint = async () => {
    if (!validate()) return;
    setIsWorking(true);
    try {
      if (appMode === 'flyer') {
        const bifoldPages = [
          { id: 'bifold-panel-1', pageNumber: '1', layout: 'flyer_p1' },
          { id: 'bifold-panel-2', pageNumber: '2', layout: 'flyer_p2' },
          { id: 'bifold-panel-3', pageNumber: '3', layout: 'flyer_p3' },
          { id: 'bifold-panel-4', pageNumber: '4', layout: 'flyer_p4' },
          { id: 'bifold-panel-5', pageNumber: '5', layout: 'flyer_p5' },
        ];
        await printMenuDirectly(bifoldPages, (c, t, txt) => setWorkProgress({ current: c, total: t, text: txt }));
      } else {
        await printMenuDirectly(allExportablePages, (c, t, txt) => setWorkProgress({ current: c, total: t, text: txt }));
      }
    } catch (e) {
      console.error(e);
      alert('حدث خطأ أثناء معالجة الطباعة المباشرة.');
    } finally {
      setIsWorking(false);
    }
  };

  // ── PDF Print / Web Export ──────────────────────────────────────────────────
  const handleExportPDF = async (options = { dpi: 300, quality: 0.95, pixelRatio: 3.8 }) => {
    if (!validate()) return;
    setIsWorking(true); setIsPdfSuccess(false);
    try {
      if (appMode === 'flyer') {
        const bifoldPages = [
          { id: 'bifold-panel-1', pageNumber: '1', layout: 'flyer_p1' },
          { id: 'bifold-panel-2', pageNumber: '2', layout: 'flyer_p2' },
          { id: 'bifold-panel-3', pageNumber: '3', layout: 'flyer_p3' },
          { id: 'bifold-panel-4', pageNumber: '4', layout: 'flyer_p4' },
          { id: 'bifold-panel-5', pageNumber: '5', layout: 'flyer_p5' },
        ];
        await exportMenuAsPDF(bifoldPages, (c, t, txt) => setWorkProgress({ current: c, total: t, text: txt }), options);
      } else {
        await exportMenuAsPDF(allExportablePages, (c, t, txt) => setWorkProgress({ current: c, total: t, text: txt }), options);
      }
      setIsPdfSuccess(true);
      setTimeout(() => setIsPdfSuccess(false), 3000);
    } catch (e) {
      console.error(e);
      alert('حدث خطأ أثناء تصدير ملف الـ PDF.');
    } finally {
      setIsWorking(false);
    }
  };

  // ── SVG Export ───────────────────────────────────────────────────────────────
  const handleExportSVG = async () => {
    if (!validate()) return;
    setIsWorking(true); setIsSvgSuccess(false);
    try {
      if (appMode === 'flyer') {
        const bifoldPages = [
          { id: 'bifold-panel-1', pageNumber: '1', layout: 'flyer_p1' },
          { id: 'bifold-panel-2', pageNumber: '2', layout: 'flyer_p2' },
          { id: 'bifold-panel-3', pageNumber: '3', layout: 'flyer_p3' },
          { id: 'bifold-panel-4', pageNumber: '4', layout: 'flyer_p4' },
          { id: 'bifold-panel-5', pageNumber: '5', layout: 'flyer_p5' },
        ];
        await exportMenuAsSVG(bifoldPages, (c, t, txt) => setWorkProgress({ current: c, total: t, text: txt }));
      } else {
        await exportMenuAsSVG(allExportablePages, (c, t, txt) => setWorkProgress({ current: c, total: t, text: txt }));
      }
      setIsSvgSuccess(true);
      setTimeout(() => setIsSvgSuccess(false), 3000);
    } catch (e) {
      console.error(e);
      alert('حدث خطأ أثناء تصدير ملفات الـ SVG.');
    } finally {
      setIsWorking(false);
    }
  };

  return (
    <>
      {/* ── Top Bar ───────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0c120e]/95 border-b border-brand-gold/30 px-6 flex justify-between items-center z-50 no-print backdrop-blur-md shadow-2xl">
        {/* Brand & Mode Switcher */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-goldLight via-brand-gold to-yellow-700 rounded-xl flex items-center justify-center font-cinzel font-bold text-brand-bg shadow-[0_0_15px_rgba(201,170,88,0.4)] text-lg">
            A
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-white font-bold text-base tracking-wide font-cinzel">
                Alsafi Restaurant <span className="text-brand-goldLight font-normal">| Studio PRO</span>
              </h1>
            </div>
            <p className="text-[11px] text-brand-textMuted flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-brand-gold" />
              تصدير PDF فائق الدقة 300DPI · طباعة بدون حواف · Full Bleed A4
            </p>
          </div>

          {/* 🌟 APP MODE SWITCHER (منيو المطعم / فلاير إعلاني) 🌟 */}
          <div className="flex items-center bg-black/80 border-2 border-brand-gold/60 rounded-xl p-1 shadow-2xl ml-4">
            <button
              type="button"
              onClick={() => setAppMode('menu')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                appMode === 'menu'
                  ? 'bg-gradient-to-r from-brand-gold via-[#a6e247] to-brand-gold text-black shadow-lg font-black'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>📖 منيو المطعم</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                appMode === 'menu' ? 'bg-black/80 text-brand-goldLight' : 'bg-brand-gold/20 text-brand-gold'
              }`}>
                {allExportablePages.length} صفحة
              </span>
            </button>

            <button
              type="button"
              onClick={() => setAppMode('flyer')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                appMode === 'flyer'
                  ? 'bg-gradient-to-r from-brand-gold via-[#a6e247] to-brand-gold text-black shadow-lg font-black'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>📄 كتيب ومطوية الفلاير</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                appMode === 'flyer' ? 'bg-black/80 text-brand-goldLight' : 'bg-brand-gold/20 text-brand-gold'
              }`}>
                5 صفحات
              </span>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {/* Screen Preview Zoom Control (UX feature) */}
          <div className="flex items-center gap-1.5 bg-black/60 border border-brand-gold/40 rounded-xl px-2.5 py-1 shadow-inner mr-2" title="تكبير وتصغير المعاينة على الشاشة فقط (لا يؤثر على الطباعة)">
            <span className="text-[10px] text-gray-400 font-bold ml-1">معاينة:</span>
            <button
              type="button"
              onClick={zoomOutPreview}
              disabled={previewZoom <= 50}
              className="p-1 text-brand-goldLight hover:bg-white/10 rounded transition disabled:opacity-30"
              title="تصغير المعاينة (Zoom Out)"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            <span className="text-xs font-mono font-bold text-brand-gold w-10 text-center select-none">
              {previewZoom}%
            </span>

            <button
              type="button"
              onClick={zoomInPreview}
              disabled={previewZoom >= 150}
              className="p-1 text-brand-goldLight hover:bg-white/10 rounded transition disabled:opacity-30"
              title="تكبير المعاينة (Zoom In)"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            {previewZoom !== 100 && (
              <button
                type="button"
                onClick={resetPreviewZoom}
                className="text-[10px] bg-brand-gold/20 hover:bg-brand-gold hover:text-black text-brand-goldLight px-1.5 py-0.5 rounded font-bold transition mr-1"
                title="إعادة ضبط المعاينة إلى 100%"
              >
                100%
              </button>
            )}
          </div>

          {/* Print Blueprint & Trimming Diagram Overlay Toggle Button */}
          <button
            type="button"
            onClick={togglePrintGuides}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 shadow-md cursor-pointer ${
              showPrintGuides
                ? 'bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 text-white border-brand-gold shadow-[0_0_12px_rgba(234,179,8,0.4)] font-black'
                : 'bg-black/70 hover:bg-white/10 text-gray-300 border-brand-gold/40'
            }`}
            title="إظهار/إخفاء مخطط حدود الطباعة والقص والمنطقة الآمنة (Safe Zone / Trim / Bleed)"
          >
            <Ruler className={`w-3.5 h-3.5 ${showPrintGuides ? 'text-yellow-300 animate-spin-slow' : 'text-brand-gold'}`} />
            <span>{showPrintGuides ? '📐 إخفاء مخطط القص' : '📐 مخطط حدود الطباعة والقص'}</span>
          </button>

          {/* Blueprint Alignment Grid Toggle */}
          <button
            type="button"
            onClick={toggleLayoutGrid}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1 shadow-md cursor-pointer ${
              showLayoutGrid
                ? 'bg-cyan-950 text-cyan-300 border-cyan-400 font-mono shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                : 'bg-black/70 hover:bg-white/10 text-gray-400 border-gray-700'
            }`}
            title="إظهار/إخفاء شبكة الرسم البياني ومحاور التنسيق"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>{showLayoutGrid ? 'شبكة المحاذاة' : 'الشبكة'}</span>
          </button>

          {/* Unify All Pages Sizes & Geometry */}
          <button
            type="button"
            onClick={unifyAllTypography}
            className="px-3.5 py-2 bg-gradient-to-r from-emerald-600/20 via-lime-500/30 to-emerald-600/20 hover:from-emerald-600/40 hover:to-lime-500/40 border border-brand-gold/60 text-brand-goldLight text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm hover:border-brand-gold cursor-pointer"
            title="توحيد أحجام ومقاسات الخطوط ومستطيلات التصنيف والتذييل والأسعار لتكون متطابقة 100% في جميع الصفحات"
          >
            <Sparkles className="w-3.5 h-3.5 text-lime-400" />
            <span>✨ توحيد مقاسات الجميع</span>
          </button>

          {/* Enforce Safe Margins & Insets (Prevent any cut-off) */}
          <button
            type="button"
            onClick={enforceSafePrintInsets}
            className="px-3 py-2 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border border-emerald-500/80 text-emerald-300 hover:text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-md hover:border-emerald-400 cursor-pointer"
            title="ضبط سحري فوري لهوامش جميع الصفحات والتذييل والإطارات لتدخل بالكامل داخل المنطقة الآمنة للطباعة بدون قص أي عنصر"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>🛡️ ضبط حواف الأمان (تجنب القص)</span>
          </button>

          {/* ☀️ PLAIN PAPER + THERMAL LAMINATION BRIGHTNESS BOOST BUTTON */}
          <button
            type="button"
            onClick={togglePlainPaperMode}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 shadow-md cursor-pointer ${
              isPlainPaperMode
                ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black border-yellow-300 shadow-[0_0_15px_rgba(251,191,36,0.6)] font-black'
                : 'bg-black/70 hover:bg-white/10 text-amber-200 border-amber-500/40'
            }`}
            title="تفعيل/إلغاء وضع الطباعة على الورق العادي والتغليف الحراري (يضيف +20% سطوع إضافي لتظهر الألوان ساطعة وزاهية)"
          >
            <Sun className={`w-3.5 h-3.5 ${isPlainPaperMode ? 'text-black font-black animate-spin-slow' : 'text-amber-400'}`} />
            <span>{isPlainPaperMode ? '☀️ ورق عادي وتغليف (+20% سطوع)' : '📄 ورق عادي وتغليف حراري'}</span>
          </button>

          {/* Backup */}
          <button
            type="button"
            onClick={exportBackup}
            className="px-3 py-2 bg-black/50 hover:bg-black/80 border border-brand-gold/40 text-brand-goldLight text-xs font-semibold rounded-lg transition flex items-center gap-1.5 hover:border-brand-gold shadow-sm"
            title="حفظ نسخة احتياطية JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>حفظ العمل</span>
          </button>

          {/* ★ SVG EXPORT BUTTON ★ */}
          <button
            type="button"
            onClick={handleExportSVG}
            disabled={isWorking}
            className="relative px-6 py-2 bg-[#162a1c] border border-brand-gold/50 text-brand-goldLight font-bold text-sm rounded-lg hover:bg-[#234a32] transition flex items-center gap-2 disabled:opacity-60 mr-2"
            title="تصدير جميع الصفحات كملفات SVG مفتوحة للإليستريتور"
          >
            {isWorking ? (
              <><Loader2 className="w-4 h-4 animate-spin" /><span>جاري التصدير...</span></>
            ) : isSvgSuccess ? (
              <><Check className="w-4 h-4 text-green-400" /><span>تم التصدير!</span></>
            ) : (
              <><Download className="w-4 h-4" /><span>تصدير للإليستريتور (SVG)</span></>
            )}
          </button>

          {/* ★ COMPRESSED WEB / WHATSAPP PDF EXPORT BUTTON ★ */}
          <button
            type="button"
            onClick={() => handleExportPDF({ dpi: 150, quality: 0.70 })}
            disabled={isWorking}
            className="px-4 py-2 bg-[#1b2a20] hover:bg-[#25392b] border border-emerald-500/50 text-emerald-300 font-bold text-xs rounded-lg transition flex items-center gap-1.5 disabled:opacity-60 shadow-sm"
            title="استخراج ملف PDF مضغوط بحجم صغير جداً ممتاز للمشاركة عبر الواتساب والموقع"
          >
            {isWorking ? (
              <><Loader2 className="w-3.5 h-3.5 animate-spin" /><span>جاري الضغط...</span></>
            ) : isPdfSuccess ? (
              <><Check className="w-3.5 h-3.5 text-green-400" /><span>تم!</span></>
            ) : (
              <><Smartphone className="w-3.5 h-3.5 text-emerald-400" /><span>PDF للواتساب (حجم صغير)</span></>
            )}
          </button>

          {/* ★ HIGH-RES PRINT EXPORT BUTTON ★ */}
          <button
            type="button"
            onClick={() => handleExportPDF({ dpi: 300, quality: 0.76, pixelRatio: 3.125 })}
            disabled={isWorking}
            className={`relative px-5 py-2 font-bold text-xs rounded-lg shadow-[0_0_20px_rgba(201,170,88,0.4)] transition flex items-center gap-1.5 disabled:opacity-60 ${
              isPlainPaperMode
                ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-black border-2 border-yellow-200'
                : 'bg-gradient-to-r from-brand-gold via-brand-goldLight to-brand-gold text-brand-bg hover:brightness-110'
            }`}
            title={isPlainPaperMode ? 'تصدير PDF (300 DPI) مع تفتيح السطوع المخصص للورق العادي (+20%)' : 'استخراج ملف PDF عالي الدقة (300 DPI) جاهز للمطبعة'}
          >
            {isWorking ? (
              <><Loader2 className="w-4 h-4 animate-spin" /><span>جاري التصدير ({workProgress.current}/{workProgress.total})...</span></>
            ) : isPdfSuccess ? (
              <><Check className="w-4 h-4" /><span>تم التصدير بنجاح!</span></>
            ) : (
              <><Printer className="w-4 h-4" /><span>{isPlainPaperMode ? '☀️ تصدير 300DPI (سطوع عالي)' : 'تصدير للمطبعة (300 DPI)'}</span></>
            )}
          </button>

          {/* ★ DIRECT PRINT BUTTON (طباعة مباشرة فورية) ★ */}
          <button
            type="button"
            onClick={handleDirectPrint}
            disabled={isWorking}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:brightness-110 text-black font-black text-xs rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.5)] transition flex items-center gap-1.5 cursor-pointer border border-emerald-200"
            title="فتح نافذة الطباعة المباشرة فوراً من المتصفح بدون تنزيل ملف PDF"
          >
            <Printer className="w-4 h-4 text-black" />
            <span>🖨️ طباعة مباشرة</span>
          </button>
        </div>
      </header>



      {/* ── Working Progress Overlay ──────────────────────────────────────────── */}
      {isWorking && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center no-print animate-in fade-in">
          <div className="bg-[#0e1611] border border-brand-gold rounded-2xl p-7 max-w-sm w-full mx-4 shadow-2xl text-center space-y-5">
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-brand-gold/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-brand-gold border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Printer className="w-6 h-6 text-brand-gold" />
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold font-cinzel text-base mb-1">
                جاري تجهيز المنيو للمطبعة
              </h3>
              <p className="text-[11px] text-brand-textMuted">
                {workProgress.text || 'يتم معالجة الصفحات بدقة 300 DPI...'}
              </p>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-black/60 rounded-full h-3 overflow-hidden border border-white/10">
              <div
                className="bg-gradient-to-r from-brand-gold to-yellow-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(workProgress.current / Math.max(1, workProgress.total)) * 100}%` }}
              />
            </div>
            <p className="text-[11px] font-mono text-brand-goldLight">
              الصفحة {workProgress.current} من {workProgress.total}
            </p>
            {isPlainPaperMode && (
              <div className="bg-amber-950/80 border border-amber-400/60 rounded-xl p-2 text-[10.5px] font-bold text-amber-300 flex items-center justify-center gap-1.5 shadow-md">
                <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                <span>تم تطبيق تفتيح السطوع المخصص للورق العادي والتغليف (+20%)</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Validation Error Modal ────────────────────────────────────────────── */}
      {validationErrors.length > 0 && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[10000] flex items-center justify-center p-4 no-print animate-in fade-in">
          <div className="bg-[#0e1611] border-2 border-red-500/80 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-red-950/50 border-b border-red-500/40 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">تنبيه: يوجد أطباق غير مكتملة</h3>
                  <p className="text-[11px] text-red-300">تم العثور على {validationErrors.length} عنصر يحتاج مراجعة</p>
                </div>
              </div>
              <button type="button" onClick={() => setValidationErrors([])} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto space-y-2.5 flex-1 text-right" dir="rtl">
              <p className="text-xs text-slate-300 leading-relaxed">
                لحماية جودة الطباعة، يُمنع التصدير مع وجود أطباق تجريبية أو أسعار صفرية:
              </p>
              <div className="space-y-2 mt-2">
                {validationErrors.map((err, idx) => (
                  <div key={idx} className="bg-black/60 border border-red-500/30 rounded-xl p-2.5 text-xs text-slate-200 flex flex-col gap-1">
                    <div className="flex items-center justify-between font-bold text-brand-goldLight">
                      <span>صفحة {err.pageNumber} · {err.pageTitle}</span>
                      <span className="text-red-400 font-mono text-[11px]">الطبق {err.itemNum}</span>
                    </div>
                    <div className="text-white font-semibold">الاسم: <span className="text-yellow-300">"{err.dishName}"</span></div>
                    <div className="text-[11px] text-red-300">⚠️ {err.reason}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3.5 bg-black/40 border-t border-white/10 flex justify-end">
              <button type="button" onClick={() => setValidationErrors([])} className="px-5 py-2 bg-brand-gold text-brand-bg hover:brightness-110 font-bold rounded-lg text-xs transition">
                فهمت، سأقوم بالتعديل الآن
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopControlBar;
