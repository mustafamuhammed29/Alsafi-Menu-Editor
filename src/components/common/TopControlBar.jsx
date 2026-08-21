import React, { useState } from 'react';
import {
  Printer,
  Download,
  Sparkles,
  Loader2,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { useMenu } from '../../context/MenuContext';
import { exportMenuAsPDF } from '../../utils/pdfExporter';
import { validateMenuForExport } from '../../utils/menuValidator';

// ─── Main TopControlBar ────────────────────────────────────────────────────────
export const TopControlBar = () => {
  const { exportBackup, pages } = useMenu();

  const [isWorking, setIsWorking]               = useState(false);
  const [workProgress, setWorkProgress]         = useState({ current: 0, total: 0, text: '' });
  const [isPdfSuccess, setIsPdfSuccess]         = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  // ── validate helper ──────────────────────────────────────────────────────────
  const validate = () => {
    const val = validateMenuForExport(pages);
    if (!val.isValid) { setValidationErrors(val.errors); return false; }
    return true;
  };

  // ── PDF Print Export ─────────────────────────────────────────────────────────
  const handleExportPDF = async () => {
    if (!validate()) return;
    setIsWorking(true); setIsPdfSuccess(false);
    try {
      await exportMenuAsPDF(pages, (c, t, txt) => setWorkProgress({ current: c, total: t, text: txt }));
      setIsPdfSuccess(true);
      setTimeout(() => setIsPdfSuccess(false), 3000);
    } catch (e) {
      console.error(e);
      alert('حدث خطأ أثناء تصدير ملف الـ PDF.');
    } finally {
      setIsWorking(false);
    }
  };

  return (
    <>
      {/* ── Top Bar ───────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0c120e]/95 border-b border-brand-gold/30 px-6 flex justify-between items-center z-50 no-print backdrop-blur-md shadow-2xl">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-goldLight via-brand-gold to-yellow-700 rounded-xl flex items-center justify-center font-cinzel font-bold text-brand-bg shadow-[0_0_15px_rgba(201,170,88,0.4)] text-lg">
            A
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-white font-bold text-base tracking-wide font-cinzel">
                Alsafi Restaurant <span className="text-brand-goldLight font-normal">| Menu Editor PRO</span>
              </h1>
              <span className="bg-brand-green border border-brand-accent/40 text-brand-goldLight text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                {pages.length} Seiten A4
              </span>
            </div>
            <p className="text-[11px] text-brand-textMuted flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-brand-gold" />
              تصدير PDF فائق الدقة 300DPI · طباعة بدون حواف · Full Bleed A4
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">

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

          {/* ★ HIGH-RES PRINT EXPORT BUTTON ★ */}
          <button
            type="button"
            onClick={handleExportPDF}
            disabled={isWorking}
            className="relative px-6 py-2 bg-gradient-to-r from-brand-gold via-brand-goldLight to-brand-gold text-brand-bg font-bold text-sm rounded-lg shadow-[0_0_24px_rgba(201,170,88,0.5)] hover:brightness-110 transition flex items-center gap-2 disabled:opacity-60"
            title="استخراج ملف PDF عالي الدقة جاهز للمطبعة"
          >
            {isWorking ? (
              <><Loader2 className="w-4 h-4 animate-spin" /><span>جاري التصدير ({workProgress.current}/{workProgress.total})...</span></>
            ) : isPdfSuccess ? (
              <><Check className="w-4 h-4" /><span>تم التصدير بنجاح!</span></>
            ) : (
              <><Printer className="w-4 h-4" /><span>تصدير للمطبعة (High-Res PDF)</span></>
            )}
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
