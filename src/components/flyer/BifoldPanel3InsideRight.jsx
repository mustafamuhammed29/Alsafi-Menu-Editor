import React from 'react';
import EditableText from '../common/EditableText';
import RestaurantLogo from '../common/RestaurantLogo';
import PageDecorativeBorder from '../common/PageDecorativeBorder';
import { useMenu } from '../../context/MenuContext';

export const BifoldPanel3InsideRight = ({ panelData }) => {
  const { bifoldFlyerData } = useMenu();
  const categories = panelData?.categories || [];

  const titleSize = bifoldFlyerData?.fontSizeSettings?.categoryTitleSize || 12;
  const nameSize = bifoldFlyerData?.fontSizeSettings?.itemNameSize || 10.5;
  const descSize = bifoldFlyerData?.fontSizeSettings?.itemDescSize || 8.5;
  const priceSize = bifoldFlyerData?.fontSizeSettings?.priceSize || 10.5;

  return (
    <div className="a4-page-wrapper" id="bifold-panel-3">
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

        {/* ─── TOP HEADER ───────────────────────────────────────────────────────────── */}
        <header className="relative z-20 pt-6 px-8 flex items-center justify-between border-b border-brand-gold/35 pb-2 shrink-0">
          <div className="flex items-center gap-2.5">
            <RestaurantLogo src="logo.jpg" size={38} multiplier={1} showSubtext={false} />
            <div>
              <span className="font-cinzel text-xs font-black text-brand-gold tracking-wider uppercase block">
                ALSAFI SPEISEKARTE · SEITE 2
              </span>
              <span className="text-[8.5px] text-gray-300">WRAPS · BURGER · HAUPTGERICHTE · HOLZKOHLEGRILL</span>
            </div>
          </div>
          <span className="bg-brand-gold/15 border border-brand-gold/60 text-brand-goldLight text-[8.5px] font-cinzel font-bold px-2.5 py-0.5 rounded-full shadow">
            ECHTES RAUCHAROMA
          </span>
        </header>

        {/* ─── CATEGORIES 7 TO 12 GRID (LARGER SPACIOUS FONTS) ───────────────────────── */}
        <div className="relative z-20 mx-7 my-2 flex-1 grid grid-cols-2 gap-3 min-h-0">
          {categories.map((cat, catIdx) => (
            <div
              key={cat.id || `cat-${catIdx}`}
              className="bg-black/60 border border-brand-gold/40 rounded-xl p-2.5 shadow-lg flex flex-col justify-start backdrop-blur-sm"
            >
              {/* Category Header */}
              <div className="bg-gradient-to-r from-brand-gold/25 via-brand-gold/10 to-transparent border-r-2 border-brand-gold px-2.5 py-1 mb-2 rounded-l">
                <span
                  className="font-cinzel font-black text-yellow-300 uppercase tracking-wider block"
                  style={{ fontSize: `${titleSize}px` }}
                >
                  {cat.title}
                </span>
                {cat.subtitle && (
                  <span className="text-[8px] text-gray-400 block truncate mt-0.5">{cat.subtitle}</span>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-1.5">
                {(cat.items || []).map((item, itmIdx) => (
                  <div key={item.id || item.nr || itmIdx} className="flex items-start justify-between gap-1.5 border-b border-white/10 pb-1">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="font-mono font-bold text-brand-gold/90"
                          style={{ fontSize: `${nameSize}px` }}
                        >
                          {item.nr}.
                        </span>
                        <span
                          className="font-bold text-white font-cinzel truncate"
                          style={{ fontSize: `${nameSize}px` }}
                        >
                          {item.name}
                        </span>
                        {item.badge && (
                          <span className="text-[7.5px] text-amber-300 font-bold bg-amber-950/80 px-1 py-0.2 rounded border border-amber-500/40">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.desc && (
                        <div
                          className="text-gray-300 leading-tight truncate mt-0.5"
                          style={{ fontSize: `${descSize}px` }}
                        >
                          {item.desc}
                        </div>
                      )}
                    </div>

                    <span
                      className="font-bold font-mono text-yellow-300 bg-brand-gold/20 px-1.5 py-0.5 rounded border border-brand-gold/40 shrink-0 shadow-sm"
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

        {/* ─── FOOTER ───────────────────────────────────────────────────────────────── */}
        <footer className="relative z-20 mx-7 mb-4 px-4 py-1.5 rounded-xl bg-black/70 border border-brand-gold/40 flex items-center justify-between text-[9px] text-gray-300 shrink-0 shadow">
          <span className="font-cinzel font-bold text-brand-gold">ALSAFI RESTAURANT · HEIDELBERG</span>
          <span className="text-yellow-300 font-mono font-bold">TEL: 06221 72 59 000</span>
          <span>HERTZSTR. 1 (KAUFLAND)</span>
        </footer>
      </div>
    </div>
  );
};

export default BifoldPanel3InsideRight;
