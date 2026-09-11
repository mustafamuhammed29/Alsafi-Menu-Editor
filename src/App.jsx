import React from 'react';
import { MenuProvider, useMenu } from './context/MenuContext';
import TopControlBar from './components/common/TopControlBar';
import ControlPanel from './components/control-panel/ControlPanel';
import A4Page from './components/menu/A4Page';
import CoverPageLayout from './components/menu/CoverPageLayout';
import TrifoldSheetOutside from './components/flyer/TrifoldSheetOutside';
import TrifoldSheetInside from './components/flyer/TrifoldSheetInside';

const MenuEditorContent = () => {
  const {
    appMode,
    bifoldFlyerData,
    trifoldViewMode,
    pages,
    coverPageData,
    showCoverPage,
    updateCoverHeader,
    getEffectiveSettingsForPage,
    previewZoom,
  } = useMenu();

  const zoomScale = (previewZoom || 100) / 100;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0e1712] flex print:p-0 print:m-0 print:min-h-0 print:bg-[#0a1610] print:block selection:bg-brand-gold selection:text-black">
      {/* Fixed Luxury Control Bar */}
      <TopControlBar />

      {/* Floating RTL Administration Sidebar */}
      <ControlPanel />

      {/* Main A4 Document Canvas Container with visual preview zoom */}
      <main
        className="flex-1 flex flex-col items-center gap-12 ml-[460px] print:ml-0 print:p-0 print:m-0 print:gap-0 print:block print:w-[210mm] no-print:ml-[460px] transition-transform duration-150 ease-out origin-top"
        style={{
          transform: zoomScale !== 1 ? `scale(${zoomScale})` : undefined,
        }}
      >
        {/* ─── 1. TRI-FOLD BROCHURE MODE (A4 LANDSCAPE 3-PANEL DOUBLE SIDED) ────────── */}
        {appMode === 'flyer' ? (
          <>
            {/* Sheet 1: Side A (Outside Sheet: Flap | Back Cover | Front Cover) */}
            {(trifoldViewMode === 'both' || trifoldViewMode === 'outside') && (
              <div className="flex flex-col items-center relative group print:block print:m-0 print:p-0 print:w-[297mm]">
                <div className="w-[297mm] flex items-center justify-between px-4 py-2 mb-2 bg-black/80 border border-brand-gold/50 rounded-xl no-print backdrop-blur-md shadow-lg">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-black text-brand-gold font-cinzel">
                      🖼️ الوجه الخارجي (Side A): الطية الداخلية + الغلاف الخلفي + الغلاف الأمامي الرئيسي
                    </span>
                  </div>
                  <span className="text-[10.5px] text-yellow-300 font-mono font-bold bg-black/90 px-2.5 py-0.5 rounded border border-yellow-500/40">
                    A4 Landscape (297mm × 210mm)
                  </span>
                </div>
                <TrifoldSheetOutside
                  panel1={bifoldFlyerData?.panel1}
                  panel2={bifoldFlyerData?.panel2}
                  panel3={bifoldFlyerData?.panel3}
                />
              </div>
            )}

            {/* Sheet 2: Side B (Inside Sheet: Left Column | Center Column | Right Column) */}
            {(trifoldViewMode === 'both' || trifoldViewMode === 'inside') && (
              <div className="flex flex-col items-center relative group print:block print:m-0 print:p-0 print:w-[297mm]">
                <div className="w-[297mm] flex items-center justify-between px-4 py-2 mb-2 bg-black/80 border border-brand-gold/50 rounded-xl no-print backdrop-blur-md shadow-lg">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-black text-brand-gold font-cinzel">
                      📝 الوجه الداخلي البانورامي (Side B): الأعمدة الثلاثة الشاملة المخصصة للوجبات
                    </span>
                  </div>
                  <span className="text-[10.5px] text-yellow-300 font-mono font-bold bg-black/90 px-2.5 py-0.5 rounded border border-yellow-500/40">
                    A4 Landscape (297mm × 210mm)
                  </span>
                </div>
                <TrifoldSheetInside
                  panel4={bifoldFlyerData?.panel4}
                  panel5={bifoldFlyerData?.panel5}
                  panel6={bifoldFlyerData?.panel6}
                />
              </div>
            )}
          </>
        ) : (
          /* ─── 2. MENU MODE (14 PAGES MENU EDITOR) ─────────────────────────────────── */
          <>
            {/* Standalone Isolated Cover Page (Page 0) */}
            {showCoverPage && coverPageData && (
              <div className="flex flex-col items-center relative group print:block print:m-0 print:p-0 print:w-[210mm]">
                <div className="w-[210mm] flex items-center justify-between px-3.5 py-1.5 mb-1.5 bg-black/60 border border-brand-gold/30 rounded-xl no-print backdrop-blur-md shadow-md">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold text-brand-gold font-cinzel">
                      👑 صفحة الغلاف والتعريف (Page 0)
                    </span>
                    <span className="text-xs text-gray-300 font-semibold truncate max-w-[260px]">
                      {coverPageData.header?.title || 'ALSAFI RESTAURANT'}
                    </span>
                  </div>
                  <span className="text-[10.5px] text-yellow-400 font-mono font-bold bg-black/80 px-2 py-0.5 rounded border border-yellow-500/40">
                    صفحة مستقلة مخصصة
                  </span>
                </div>

                <CoverPageLayout
                  pageData={coverPageData}
                  pageIndex={0}
                  pageSettings={getEffectiveSettingsForPage(0)}
                  onUpdateHeader={(idx, field, val) => updateCoverHeader(field, val)}
                />
              </div>
            )}

            {/* 13 Official Menu Pages (Pages 1 to 13) */}
            {pages.map((page, idx) => (
              <A4Page
                key={page.id || `page-${idx + 1}`}
                pageData={page}
                pageIndex={idx}
                pageSettings={getEffectiveSettingsForPage(idx)}
              />
            ))}
          </>
        )}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <MenuProvider>
      <MenuEditorContent />
    </MenuProvider>
  );
}
