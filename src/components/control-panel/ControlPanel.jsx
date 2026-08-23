import React, { useState } from 'react';
import { Edit3, Palette, Download, Upload, SlidersHorizontal, ChevronRight, ChevronLeft, ZoomIn, ZoomOut, Code2, ClipboardPaste, Copy, Check, X } from 'lucide-react';
import ContentTab from './ContentTab';
import DesignTab from './DesignTab';
import { useMenu } from '../../context/MenuContext';

export const ControlPanel = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [collapsed, setCollapsed] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [pastedCode, setPastedCode] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [codeError, setCodeError] = useState('');

  const {
    exportBackup,
    importBackup,
    previewZoom,
    zoomInPreview,
    zoomOutPreview,
    resetPreviewZoom,
    globalSettings,
    pageOverrides,
    pages,
    restoreFromCode,
  } = useMenu();

  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      importBackup(file);
      e.target.value = '';
    }
  };

  // Generate a compact base64 code from current state
  const handleCopyCode = () => {
    try {
      const payload = {
        v: 1,
        gs: globalSettings,
        po: pageOverrides,
        pg: pages,
      };
      const json = JSON.stringify(payload);
      const code = btoa(encodeURIComponent(json));
      navigator.clipboard.writeText(code).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2500);
      });
    } catch (err) {
      console.error('Code copy failed:', err);
    }
  };

  // Restore from pasted code
  const handleRestoreCode = () => {
    setCodeError('');
    try {
      if (!pastedCode.trim()) {
        setCodeError('الرجاء لصق الكود أولاً.');
        return;
      }
      const json = decodeURIComponent(atob(pastedCode.trim()));
      const payload = JSON.parse(json);
      if (!payload.v || !payload.gs) {
        setCodeError('الكود غير صحيح أو تالف، حاول مرة أخرى.');
        return;
      }
      // Apply via context function or localStorage directly
      if (typeof restoreFromCode === 'function') {
        restoreFromCode(payload);
      } else {
        // Fallback: write directly to localStorage keys used by MenuContext
        localStorage.setItem('alsafi_menu_settings', JSON.stringify(payload.gs));
        if (payload.po) localStorage.setItem('alsafi_menu_overrides', JSON.stringify(payload.po));
        if (payload.pg) localStorage.setItem('alsafi_menu_pages', JSON.stringify(payload.pg));
        window.location.reload();
      }
      setShowCodeModal(false);
      setPastedCode('');
    } catch (err) {
      setCodeError('الكود غير صالح. تأكد من نسخه كاملاً ثم أعد المحاولة.');
    }
  };

  return (
    <>
      {/* Toggle button if collapsed */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="fixed left-4 top-24 z-50 no-print bg-brand-green border border-brand-gold text-brand-goldLight px-3 py-2 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold hover:brightness-110 transition"
        >
          <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
          <span>فتح لوحة التحكم</span>
        </button>
      )}

      {/* Main Panel */}
      <aside
        className={`control-panel no-print transition-all duration-300 ${
          collapsed ? '-translate-x-[480px] opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-3 pb-2.5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-brand-gold/20 flex items-center justify-center border border-brand-gold/40">
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-gold" />
            </div>
            <h2 className="text-base font-bold font-cinzel text-brand-goldLight">
              نظام إدارة المنيو
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Preview Zoom in Sidebar Header */}
            <div className="flex items-center gap-1 bg-black/60 border border-brand-gold/30 rounded-lg px-2 py-0.5" title="تكبير/تصغير شاشة المعاينة فقط">
              <button
                type="button"
                onClick={zoomOutPreview}
                disabled={previewZoom <= 50}
                className="text-gray-300 hover:text-white p-0.5 disabled:opacity-30"
              >
                <ZoomOut className="w-3 h-3" />
              </button>
              <span className="text-[11px] font-mono font-bold text-brand-goldLight w-8 text-center">
                {previewZoom}%
              </span>
              <button
                type="button"
                onClick={zoomInPreview}
                disabled={previewZoom >= 150}
                className="text-gray-300 hover:text-white p-0.5 disabled:opacity-30"
              >
                <ZoomIn className="w-3 h-3" />
              </button>
            </div>

            <button
              onClick={() => setCollapsed(true)}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-white/10 transition"
              title="إخفاء اللوحة"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 mb-4 border-b border-white/10 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'content'
                ? 'bg-gradient-to-r from-brand-gold via-brand-goldLight to-brand-gold text-black shadow-md'
                : 'bg-black/60 text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>📝 إدارة المحتوى</span>
          </button>
          
          <button
            type="button"
            onClick={() => setActiveTab('design')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'design'
                ? 'bg-gradient-to-r from-brand-gold via-brand-goldLight to-brand-gold text-black shadow-md'
                : 'bg-black/60 text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>🎨 التصميم والخطوط</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'content' ? <ContentTab /> : <DesignTab />}

        {/* Export & Import Footers */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={exportBackup}
            className="py-2 px-2 bg-brand-gold/15 hover:bg-brand-gold/30 border border-brand-gold/60 rounded-lg text-xs font-bold transition text-brand-goldLight flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-brand-gold" />
            <span>💾 حفظ نسخة (Backup)</span>
          </button>

          <label className="py-2 px-2 bg-[#0e4125] hover:bg-[#185d37] border border-[#8fa83b] rounded-lg text-xs font-bold transition cursor-pointer text-center text-white flex items-center justify-center gap-1.5 shadow-sm">
            <Upload className="w-3.5 h-3.5 text-brand-goldLight" />
            <span>📂 استرجاع ملف</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>
        </div>

        {/* Code-based Save & Restore */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <button
            type="button"
            onClick={handleCopyCode}
            className={`py-2 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
              copySuccess
                ? 'bg-green-700/60 border-green-500/60 text-green-300'
                : 'bg-indigo-900/40 hover:bg-indigo-800/60 border-indigo-500/40 text-indigo-300 hover:text-white'
            }`}
            title="انسخ الإعدادات الحالية ككود نصي قصير يمكن لصقه لاحقاً لاستعادة هذه النسخة"
          >
            {copySuccess ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copySuccess ? '✓ تم النسخ!' : '📋 نسخ كـ كود'}</span>
          </button>

          <button
            type="button"
            onClick={() => { setShowCodeModal(true); setCodeError(''); setPastedCode(''); }}
            className="py-2 px-2 bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/40 rounded-lg text-xs font-bold transition text-purple-300 hover:text-white flex items-center justify-center gap-1.5"
            title="الصق كود لاستعادة نسخة محفوظة مسبقاً"
          >
            <ClipboardPaste className="w-3.5 h-3.5" />
            <span>📥 لصق كود</span>
          </button>
        </div>
      </aside>

      {/* Paste Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm no-print">
          <div className="bg-[#0d1f0e] border border-brand-gold/40 rounded-2xl shadow-2xl p-6 w-[440px] max-w-[95vw] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-cinzel text-brand-goldLight flex items-center gap-2">
                <Code2 className="w-4 h-4 text-brand-gold" />
                استعادة نسخة من كود
              </h3>
              <button
                onClick={() => setShowCodeModal(false)}
                className="text-gray-400 hover:text-white p-1 rounded hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed">
              الصق هنا الكود الذي حصلت عليه من زر <span className="text-indigo-300 font-bold">📋 نسخ كـ كود</span>، وسيتم استعادة جميع الإعدادات فوراً.
            </p>

            <textarea
              value={pastedCode}
              onChange={(e) => { setPastedCode(e.target.value); setCodeError(''); }}
              placeholder="الصق الكود هنا..."
              rows={5}
              dir="ltr"
              className="w-full bg-black/60 border border-white/20 rounded-lg px-3 py-2 text-[11px] font-mono text-green-300 placeholder-gray-600 focus:outline-none focus:border-brand-gold/60 resize-none"
            />

            {codeError && (
              <p className="text-red-400 text-[11px] flex items-center gap-1">
                <X className="w-3 h-3" /> {codeError}
              </p>
            )}

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={handleRestoreCode}
                className="flex-1 py-2 bg-brand-gold/20 hover:bg-brand-gold/40 border border-brand-gold/60 rounded-lg text-sm font-bold text-brand-goldLight transition flex items-center justify-center gap-2"
              >
                <ClipboardPaste className="w-4 h-4" />
                استعادة الإعدادات
              </button>
              <button
                type="button"
                onClick={() => setShowCodeModal(false)}
                className="py-2 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-bold text-gray-400 transition"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ControlPanel;
