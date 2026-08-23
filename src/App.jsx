import React from 'react';
import { MenuProvider, useMenu } from './context/MenuContext';
import TopControlBar from './components/common/TopControlBar';
import ControlPanel from './components/control-panel/ControlPanel';
import A4Page from './components/menu/A4Page';

const MenuEditorContent = () => {
  const { pages, getEffectiveSettingsForPage, previewZoom } = useMenu();

  const zoomScale = (previewZoom || 100) / 100;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#141414] flex print:p-0 print:m-0 print:min-h-0 print:bg-[#050a07] print:block selection:bg-brand-gold selection:text-black">
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
        {pages.map((page, idx) => (
          <A4Page
            key={page.id}
            pageData={page}
            pageIndex={idx}
            pageSettings={getEffectiveSettingsForPage(idx)}
          />
        ))}
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
