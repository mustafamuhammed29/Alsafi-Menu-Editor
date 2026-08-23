import React, { useState } from 'react';
import { Edit3, Palette, Download, Upload, SlidersHorizontal, ChevronRight, ChevronLeft, ZoomIn, ZoomOut } from 'lucide-react';
import ContentTab from './ContentTab';
import DesignTab from './DesignTab';
import { useMenu } from '../../context/MenuContext';

export const ControlPanel = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [collapsed, setCollapsed] = useState(false);
  const {
    exportBackup,
    importBackup,
    previewZoom,
    zoomInPreview,
    zoomOutPreview,
    resetPreviewZoom,
  } = useMenu();

  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      importBackup(file);
      e.target.value = '';
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
      </aside>
    </>
  );
};

export default ControlPanel;
