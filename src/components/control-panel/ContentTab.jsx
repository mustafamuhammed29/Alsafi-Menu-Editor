import React, { useState } from 'react';
import { Layers, Utensils } from 'lucide-react';
import { useMenu } from '../../context/MenuContext';

// Import child components
import PageImageControls from './content-settings/PageImageControls';
import CategoryItemEditor from './content-settings/CategoryItemEditor';
import CalloutCardEditor from './content-settings/CalloutCardEditor';
import FreeTextEditor from './content-settings/FreeTextEditor';
import Page13Editor from './content-settings/Page13Editor';

export const ContentTab = () => {
  const { pages, resetToOfficialPdfData, updatePage } = useMenu();
  const [editPageIdx, setEditPageIdx] = useState(0);
  const [editCatIdx, setEditCatIdx] = useState(0);

  const currentPage = pages[editPageIdx] || pages[0];
  const categories = currentPage?.categories || [];
  const currentCat = categories[editCatIdx] || categories[0];
  const pageImages = currentPage?.images || [];

  return (
    <div className="space-y-4 animate-fade-in text-right" dir="rtl">
      {/* Sync with Official PDF Data */}
      <div className="bg-black/50 border border-brand-gold/30 rounded-xl p-2.5 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-white block">مزامنة محتوى المنيو الرسمي (PDF)</span>
          <span className="text-[9.5px] text-brand-goldLight block">تحديث جميع النصوص والأسعار والأقسام من ملف الـ PDF المعتمد</span>
        </div>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('هل تريد إعادة تعيين ومزامنة جميع النصوص والأسعار مع ملف الـ PDF المعتمد؟ (سيتم الاحتفاظ بالصور المرفوعة)')) {
              resetToOfficialPdfData();
            }
          }}
          className="px-2.5 py-1.5 bg-brand-gold/20 hover:bg-brand-gold text-brand-goldLight hover:text-black border border-brand-gold/50 rounded-lg text-[10px] font-bold transition shadow-sm"
        >
          🔄 مزامنة من PDF
        </button>
      </div>

      {/* Page and Category Selectors */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="cms-label flex items-center gap-1 mb-1">
            <Layers className="w-3 h-3 text-brand-gold" />
            اختر الصفحة:
          </label>
          <select
            className="cms-input font-medium"
            value={editPageIdx}
            onChange={(e) => {
              setEditPageIdx(Number(e.target.value));
              setEditCatIdx(0);
            }}
          >
            {pages.map((p, idx) => (
              <option key={p.id} value={idx}>
                {p.pageNumber} · {p.header?.title ? p.header.title.split('\n')[0] : `صفحة ${idx + 1}`}
              </option>
            ))}
          </select>
        </div>

        {categories.length > 0 && (
          <div>
            <label className="cms-label flex items-center gap-1 mb-1">
              <Utensils className="w-3 h-3 text-brand-gold" />
              اختر القسم:
            </label>
            <select
              className="cms-input font-medium"
              value={editCatIdx}
              onChange={(e) => setEditCatIdx(Number(e.target.value))}
            >
              {categories.map((c, idx) => (
                <option key={c.id} value={idx}>
                  {c.code}. {c.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Page Food Photos Quick Control Card */}
      <PageImageControls editPageIdx={editPageIdx} pageImages={pageImages} />

      {/* Page Mode Toggle */}
      <div className="bg-black/40 border border-white/5 rounded-xl p-2.5">
        <label className="text-[11px] text-gray-300 font-bold mb-2 block">نموذج الصفحة (Page Mode):</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => updatePage(editPageIdx, { ...currentPage, pageMode: 'menu' })}
            className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition ${(!currentPage.pageMode || currentPage.pageMode === 'menu') ? 'bg-brand-gold text-black' : 'bg-black/60 text-gray-400 border border-white/10 hover:text-white'}`}
          >
            قائمة عمود واحد
          </button>
          <button
            type="button"
            onClick={() => updatePage(editPageIdx, { ...currentPage, pageMode: 'two-columns' })}
            className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition ${currentPage.pageMode === 'two-columns' ? 'bg-brand-gold text-black' : 'bg-black/60 text-gray-400 border border-white/10 hover:text-white'}`}
          >
            قائمة عمودين + صورة بالأسفل
          </button>
          <button
            type="button"
            onClick={() => updatePage(editPageIdx, { ...currentPage, pageMode: 'free-text' })}
            className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition ${currentPage.pageMode === 'free-text' ? 'bg-brand-gold text-black' : 'bg-black/60 text-gray-400 border border-white/10 hover:text-white'}`}
          >
            محرر نصوص حر
          </button>
        </div>
      </div>

      {/* Content Editor */}
      {currentPage.layout === 'info' ? (
        <Page13Editor pageIdx={editPageIdx} page={currentPage} />
      ) : currentPage.pageMode === 'free-text' ? (
        <FreeTextEditor pageIdx={editPageIdx} page={currentPage} />
      ) : (!categories || categories.length === 0) ? (
        <div className="text-center text-slate-400 text-xs py-6 px-4 border border-white/10 rounded-lg bg-black/30">
          ℹ️ هذه صفحة معلومات وعناصر ثابتة. يمكنك تعديل نصوصها مباشرة بالنقر عليها في الصفحة نفسها.
        </div>
      ) : (
        <CategoryItemEditor 
          editPageIdx={editPageIdx} 
          editCatIdx={editCatIdx} 
          currentCat={currentCat} 
        />
      )}

      {/* Callout Card Editor */}
      <CalloutCardEditor pageIdx={editPageIdx} page={currentPage} />
    </div>
  );
};

export default ContentTab;
