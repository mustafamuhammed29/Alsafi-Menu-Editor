import React from 'react';
import EditableText from '../common/EditableText';
import RestaurantLogo from '../common/RestaurantLogo';
import PageDecorativeBorder from '../common/PageDecorativeBorder';
import { useMenu } from '../../context/MenuContext';

export const BifoldMenuPageLayout = ({ pageId, pageNumber, pageTitle, pageSubtitle, panelData }) => {
  const { bifoldFlyerData } = useMenu();
  const categories = panelData?.categories || [];

  const titleSize = bifoldFlyerData?.fontSizeSettings?.categoryTitleSize || 13.5;
  const nameSize = bifoldFlyerData?.fontSizeSettings?.itemNameSize || 12;
  const descSize = bifoldFlyerData?.fontSizeSettings?.itemDescSize || 9.5;
  const priceSize = bifoldFlyerData?.fontSizeSettings?.priceSize || 12;

  return (
    <div className="a4-page-wrapper" id={pageId}>
      <div
        className="a4-page relative overflow-hidden flex flex-col justify-between select-none bg-[#030e07]"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 8%, #0d2e1c 0%, #05140b 50%, #010603 100%)',
        }}
      >
        {/* Layer 1: Golden Frame */}
        <PageDecorativeBorder
          showBorder={true}
          borderTop={true}
          borderBottom={true}
          borderLeft={true}
          borderRight={true}
          cornerStyle="royal"
          borderInset={14}
          borderWidth={2}
          borderOpacity={95}
        />

        {/* ─── 1. TOP HEADER ────────────────────────────────────────────────────────── */}
        <header className="relative z-20 pt-6 px-8 flex items-center justify-between border-b border-brand-gold/35 pb-2.5 shrink-0">
          <div className="flex items-center gap-3">
            <RestaurantLogo src="logo.jpg" size={40} multiplier={1} showSubtext={false} />
            <div>
              <span className="font-cinzel text-[13px] font-black text-brand-gold tracking-wider uppercase block leading-tight">
                {pageTitle || `ALSAFI SPEISEKARTE · SEITE ${pageNumber}`}
              </span>
              <span className="text-[9px] text-gray-300 block mt-0.5">
                {pageSubtitle || 'ORIENTALISCHE GASTRONOMIE SEIT 2018 · HEIDELBERG'}
              </span>
            </div>
          </div>
          <span className="bg-brand-gold/20 border border-brand-gold/70 text-brand-goldLight text-[9px] font-cinzel font-bold px-3 py-1 rounded-full shadow">
            100% HALAL
          </span>
        </header>

        {/* ─── 2. EXACTLY 4 CATEGORIES (2x2 BALANCED GRID) ──────────────────────────── */}
        <div className="relative z-20 mx-7 my-3 flex-1 grid grid-cols-2 grid-rows-2 gap-3.5 min-h-0">
          {categories.slice(0, 4).map((cat, catIdx) => (
            <div
              key={cat.id || `cat-${catIdx}`}
              className="bg-black/65 border border-brand-gold/45 rounded-2xl p-3 shadow-xl flex flex-col justify-start backdrop-blur-sm overflow-hidden"
            >
              {/* Category Header */}
              <div className="bg-gradient-to-r from-brand-gold/30 via-brand-gold/15 to-transparent border-r-3 border-brand-gold px-3 py-1 mb-2 rounded-l shrink-0">
                <span
                  className="font-cinzel font-black text-yellow-300 uppercase tracking-wider block leading-tight"
                  style={{ fontSize: `${titleSize}px` }}
                >
                  {cat.title}
                </span>
                {cat.subtitle && (
                  <span className="text-[8.5px] text-gray-400 block truncate mt-0.5">{cat.subtitle}</span>
                )}
              </div>

              {/* Items List (Large readable fonts) */}
              <div className="space-y-1.5 flex-1 overflow-hidden">
                {(cat.items || []).map((item, itmIdx) => (
                  <div
                    key={item.id || item.nr || itmIdx}
                    className="flex items-start justify-between gap-2 border-b border-white/10 pb-1"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="font-mono font-bold text-brand-gold/90 shrink-0"
                          style={{ fontSize: `${nameSize}px` }}
                        >
                          {item.nr ? `${item.nr}.` : '•'}
                        </span>
                        <span
                          className="font-bold text-white font-cinzel truncate"
                          style={{ fontSize: `${nameSize}px` }}
                        >
                          {item.name}
                        </span>
                        {item.badge && (
                          <span className="text-[8px] text-amber-300 font-bold bg-amber-950/80 px-1.5 py-0.2 rounded border border-amber-500/40 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.desc && (
                        <div
                          className="text-gray-300 leading-snug truncate mt-0.5"
                          style={{ fontSize: `${descSize}px` }}
                        >
                          {item.desc}
                        </div>
                      )}
                    </div>

                    <span
                      className="font-bold font-mono text-yellow-300 bg-brand-gold/20 px-2 py-0.5 rounded-lg border border-brand-gold/50 shrink-0 shadow-sm"
                      style={{ fontSize: `${priceSize}px` }}
                    >
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ─── 3. FOOTER ────────────────────────────────────────────────────────────── */}
        <footer className="relative z-20 mx-7 mb-4 px-4 py-2 rounded-xl bg-black/75 border border-brand-gold/40 flex items-center justify-between text-[9.5px] text-gray-200 shrink-0 shadow-lg">
          <span className="font-cinzel font-bold text-brand-gold">ALSAFI RESTAURANT · HEIDELBERG</span>
          <span className="text-yellow-300 font-mono font-bold">TEL: 06221 72 59 000</span>
          <span>HERTZSTR. 1 (IM KAUFLAND)</span>
        </footer>
      </div>
    </div>
  );
};

export default BifoldMenuPageLayout;
