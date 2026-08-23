import React from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
import MenuPageLayout from './MenuPageLayout';
import InfoPageLayout from './InfoPageLayout';
import { useMenu } from '../../context/MenuContext';

export const A4Page = ({ pageData, pageIndex, pageSettings }) => {
  const {
    updateHeader,
    updateCategory,
    updateItem,
    updatePageImage,
    updateImageTransform,
    resetImageTransform,
    maximizePageTypography,
    updateSetting,
  } = useMenu();

  return (
    <div className="flex flex-col items-center relative group print:block print:m-0 print:p-0 print:w-[210mm]">
      {/* Sleek Page Action Bar (no-print) */}
      <div className="w-[210mm] flex items-center justify-between px-3.5 py-1.5 mb-1.5 bg-black/60 border border-brand-gold/30 rounded-xl no-print backdrop-blur-md shadow-md">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold text-brand-gold font-cinzel">
            📄 صفحة {pageData.pageNumber || pageIndex + 1}
          </span>
          <span className="text-xs text-gray-300 font-semibold truncate max-w-[220px]">
            {pageData.header?.title ? pageData.header.title.split('\n')[0] : ''}
          </span>
          <span className="text-[10.5px] text-yellow-400 font-mono font-bold bg-black/80 px-2 py-0.5 rounded border border-yellow-500/40">
            مقياس المحتوى: {pageSettings.contentScale || 100}%
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => maximizePageTypography(pageIndex)}
            className="px-3 py-1 bg-gradient-to-r from-brand-gold via-yellow-400 to-brand-gold hover:brightness-110 text-black text-xs font-black rounded-lg shadow-md transition transform hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer border border-white/20"
            title="تكبير الخطوط واستغلال المساحة المتاحة بالصفحة لأقصى حد لتكون واضحة جداً للزبون"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>⚡ تكبير وملء المساحة</span>
          </button>

          {(pageSettings.contentScale !== undefined && pageSettings.contentScale !== 100) && (
            <button
              type="button"
              onClick={() => updateSetting(`page${pageIndex + 1}`, 'contentScale', 100)}
              className="px-2 py-1 bg-black/80 hover:bg-white/15 text-gray-300 hover:text-white text-[11px] font-bold rounded-lg border border-white/10 transition flex items-center gap-1 cursor-pointer"
              title="إعادة ضبط المقياس إلى 100%"
            >
              <RotateCcw className="w-3 h-3 text-gray-400" />
              <span>100%</span>
            </button>
          )}
        </div>
      </div>

      {/* Main A4 Page Renderer */}
      {pageData.layout === 'info' ? (
        <InfoPageLayout
          pageData={pageData}
          pageIndex={pageIndex}
          pageSettings={pageSettings}
          onUpdateHeader={updateHeader}
        />
      ) : (
        <MenuPageLayout
          pageData={pageData}
          pageIndex={pageIndex}
          pageSettings={pageSettings}
          onUpdateHeader={updateHeader}
          onUpdateCategory={updateCategory}
          onUpdateItem={updateItem}
          onUpdateImage={updatePageImage}
          onImageTransform={updateImageTransform}
          onResetTransform={resetImageTransform}
        />
      )}
    </div>
  );
};

export default A4Page;
