import React from 'react';
import EditableText from '../common/EditableText';
import RestaurantLogo from '../common/RestaurantLogo';
import PageDecorativeBorder from '../common/PageDecorativeBorder';
import PrintGuidesOverlay from '../common/PrintGuidesOverlay';
import { useMenu } from '../../context/MenuContext';
import { Sparkles, Flame, Crown, Tag } from 'lucide-react';

export const TrifoldSheetInside = ({ panel4, panel5, panel6 }) => {
  const { bifoldFlyerData, globalSettings, showPrintGuides, showLayoutGrid } = useMenu();

  const pageBrightness = globalSettings?.pageBrightness || 100;
  const pageContrast = globalSettings?.pageContrast || 100;

  const fontSizes = bifoldFlyerData?.fontSizeSettings || {};
  const catTitleSize = fontSizes.categoryTitleSize || 12;
  const nameSize = fontSizes.itemNameSize || 10.5;
  const descSize = fontSizes.itemDescSize || 8.5;
  const priceSize = fontSizes.priceSize || 10.5;

  const p4 = panel4 || {};
  const p5 = panel5 || {};
  const p6 = panel6 || {};

  const renderCategoryBox = (cat, catIdx, panelId) => {
    if (!cat) return null;
    return (
      <div
        key={cat.id || `${panelId}-cat-${catIdx}`}
        className="bg-black/65 border border-brand-gold/45 rounded-xl p-2 shadow-md backdrop-blur-sm overflow-hidden flex flex-col justify-start mb-2"
      >
        {/* Category Header Pill */}
        <div className="bg-gradient-to-r from-brand-gold/30 via-brand-gold/15 to-transparent border-r-2 border-brand-gold px-2 py-0.5 mb-1 rounded-l shrink-0 flex items-center justify-between">
          <span
            className="font-cinzel font-black text-brand-goldLight uppercase tracking-wider block leading-tight truncate"
            style={{ fontSize: `${catTitleSize}px` }}
          >
            {cat.title}
          </span>
          {cat.code && (
            <span className="text-[8px] font-mono text-brand-gold bg-black/60 px-1 rounded border border-brand-gold/40">
              {cat.code}
            </span>
          )}
        </div>

        {/* Items List */}
        <div className="space-y-0.5 flex-1 overflow-hidden">
          {(cat.items || []).map((item, itmIdx) => (
            <div key={item.id || item.num || itmIdx} className="flex items-center justify-between gap-1 border-b border-white/10 pb-0.5 text-[9px]">
              <div className="flex items-center gap-1 min-w-0 flex-1">
                {item.num && (
                  <span className="font-mono font-bold text-brand-gold/90 shrink-0" style={{ fontSize: `${nameSize}px` }}>
                    {item.num}.
                  </span>
                )}
                <span className="font-bold text-white font-cinzel truncate" style={{ fontSize: `${nameSize}px` }}>
                  {item.name}
                </span>
              </div>
              <span className="font-bold font-mono text-brand-goldLight bg-brand-gold/20 px-1 py-0.2 rounded border border-brand-gold/40 shrink-0 shadow-sm" style={{ fontSize: `${priceSize}px` }}>
                {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="a4-landscape-page-wrapper select-none" id="trifold-sheet-inside">
      <div 
        className="a4-landscape-page relative overflow-hidden bg-[#0a1610] shadow-2xl flex border-2 border-brand-gold/40"
        style={{
          filter: (pageBrightness !== 100 || pageContrast !== 100)
            ? `brightness(${pageBrightness}%) contrast(${pageContrast}%)`
            : undefined,
        }}
      >
        <PrintGuidesOverlay
          orientation="landscape"
          showPrintGuides={showPrintGuides}
          showLayoutGrid={showLayoutGrid}
          pageLabel="الوجه الداخلي للفلاير"
        />
        
        {/* ─── FOLD INDICATOR GUIDES (Visual Gold Dotted Lines) ───────────────────── */}
        <div className="absolute inset-y-0 left-[33.333%] w-0 border-r-2 border-dashed border-brand-gold/40 z-30 pointer-events-none no-print">
          <span className="absolute top-2 -left-8 bg-black/80 text-brand-gold text-[8px] font-mono px-1 rounded border border-brand-gold/40">
            ✂ طي 1
          </span>
        </div>
        <div className="absolute inset-y-0 left-[66.666%] w-0 border-r-2 border-dashed border-brand-gold/40 z-30 pointer-events-none no-print">
          <span className="absolute top-2 -left-8 bg-black/80 text-brand-gold text-[8px] font-mono px-1 rounded border border-brand-gold/40">
            ✂ طي 2
          </span>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────────── */}
        {/* COLUMN 1 (LEFT): PANEL 4 — INSIDE LEFT COLUMN ─────────────────────────────── */}
        {/* ─────────────────────────────────────────────────────────────────────────── */}
        <div className="w-1/3 h-full relative p-3 flex flex-col justify-between border-r border-brand-gold/30 bg-[#0a1610] z-20">
          <PageDecorativeBorder showBorder={true} cornerStyle="royal" borderInset={8} borderWidth={1.5} borderOpacity={80} />

          {/* Header */}
          <div className="relative z-20 shrink-0 border-b border-brand-gold/30 pb-1 mb-1 text-center flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <RestaurantLogo src="logo.jpg" size={24} multiplier={1} showSubtext={false} />
              <span className="font-cinzel text-[10px] font-bold text-brand-gold tracking-wider uppercase">
                ALSAFI SPEISEKARTE
              </span>
            </div>
            <span className="text-[7.5px] text-gray-300 font-mono">SEITE 1</span>
          </div>

          {/* Categories Grid */}
          <div className="relative z-20 flex-1 overflow-hidden space-y-1.5 min-h-0">
            {(p4.categories || []).map((cat, idx) => renderCategoryBox(cat, idx, 'panel4'))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────────── */}
        {/* COLUMN 2 (CENTER): PANEL 5 — INSIDE CENTER COLUMN ────────────────────────── */}
        {/* ─────────────────────────────────────────────────────────────────────────── */}
        <div className="w-1/3 h-full relative p-3 flex flex-col justify-between border-r border-brand-gold/30 bg-gradient-to-b from-[#0e1f14] via-[#0a1610] to-[#060e0a] z-20">
          <PageDecorativeBorder showBorder={true} cornerStyle="royal" borderInset={8} borderWidth={1.5} borderOpacity={80} />

          {/* Header */}
          <div className="relative z-20 shrink-0 border-b border-brand-gold/30 pb-1 mb-1 text-center flex items-center justify-between">
            <span className="text-[7.5px] text-gray-300 font-mono">SEITE 2</span>
            <span className="font-cinzel text-[10px] font-bold text-brand-gold tracking-wider uppercase">
              WRAPS · BURGER · SPEZIALITÄTEN
            </span>
            <span className="text-[7.5px] text-gray-300 font-mono">ALSAFI</span>
          </div>

          {/* Categories Grid */}
          <div className="relative z-20 flex-1 overflow-hidden space-y-1.5 min-h-0">
            {(p5.categories || []).map((cat, idx) => renderCategoryBox(cat, idx, 'panel5'))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────────── */}
        {/* COLUMN 3 (RIGHT): PANEL 6 — INSIDE RIGHT COLUMN ──────────────────────────── */}
        {/* ─────────────────────────────────────────────────────────────────────────── */}
        <div className="w-1/3 h-full relative p-3 flex flex-col justify-between bg-[#0a1610] z-20">
          <PageDecorativeBorder showBorder={true} cornerStyle="royal" borderInset={8} borderWidth={1.5} borderOpacity={80} />

          {/* Header */}
          <div className="relative z-20 shrink-0 border-b border-brand-gold/30 pb-1 mb-1 text-center flex items-center justify-between">
            <span className="font-cinzel text-[10px] font-bold text-brand-gold tracking-wider uppercase">
              GRILL · DESSERTS · GETRÄNKE
            </span>
            <span className="text-[7.5px] text-gray-300 font-mono">SEITE 3</span>
          </div>

          {/* Categories Grid */}
          <div className="relative z-20 flex-1 overflow-hidden space-y-1.5 min-h-0">
            {(p6.categories || []).map((cat, idx) => renderCategoryBox(cat, idx, 'panel6'))}
          </div>

          {/* Grand Combo Highlight Banner */}
          {p6.comboHighlight?.show !== false && (
            <div className="relative z-20 p-2 rounded-xl bg-gradient-to-r from-[#1c0b06] via-[#2a1307] to-[#1c0b06] border border-brand-gold shadow-lg flex items-center justify-between shrink-0">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-yellow-400 shrink-0" />
                  <span className="font-cinzel text-[9.5px] font-black text-yellow-300 uppercase truncate">
                    {p6.comboHighlight?.title || '👑 ALSAFI MIX PLATTE'}
                  </span>
                </div>
                <p className="text-[7.5px] text-gray-200 truncate mt-0.2">{p6.comboHighlight?.desc}</p>
              </div>
              <div className="bg-black/90 border border-brand-gold rounded-lg px-2 py-0.5 font-mono text-xs font-black text-yellow-400 shrink-0 ml-2 shadow">
                {p6.comboHighlight?.price}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrifoldSheetInside;
