import React from 'react';
import EditableText from '../common/EditableText';
import RestaurantLogo from '../common/RestaurantLogo';
import PageDecorativeBorder from '../common/PageDecorativeBorder';
import { useMenu } from '../../context/MenuContext';
import { Phone, MapPin, Clock, Truck, Sparkles } from 'lucide-react';

export const BifoldPanel4BackCover = ({ panelData }) => {
  const { bifoldFlyerData } = useMenu();
  const p5 = panelData || {};
  const categories = p5.categories || [];
  const combo = p5.comboHighlight || {};
  const contact = p5.contact || {};
  const qrCodes = p5.qrCodes || [];

  const titleSize = bifoldFlyerData?.fontSizeSettings?.categoryTitleSize || 13.5;
  const nameSize = bifoldFlyerData?.fontSizeSettings?.itemNameSize || 11.5;
  const priceSize = bifoldFlyerData?.fontSizeSettings?.priceSize || 11.5;

  return (
    <div className="a4-page-wrapper" id="bifold-panel-5">
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
                KINDER · BEILAGEN · DESSERTS · GETRÄNKE
              </span>
              <span className="text-[9px] text-gray-300 block mt-0.5">
                ALSAFI RESTAURANT HEIDELBERG · GLÜCK & GENUSS
              </span>
            </div>
          </div>
          <span className="bg-brand-gold/20 border border-brand-gold/70 text-brand-goldLight text-[9px] font-cinzel font-bold px-3 py-1 rounded-full shadow">
            HAUSGEMACHT
          </span>
        </header>

        {/* ─── 2. CATEGORIES 13 TO 17 GRID ───────────────────────────────────────────── */}
        <div className="relative z-20 mx-7 my-2 flex-1 grid grid-cols-2 gap-3.5 min-h-0">
          {categories.map((cat, catIdx) => (
            <div
              key={cat.id || `cat-p5-${catIdx}`}
              className="bg-black/65 border border-brand-gold/45 rounded-2xl p-2.5 shadow-xl flex flex-col justify-start backdrop-blur-sm overflow-hidden"
            >
              {/* Category Header */}
              <div className="bg-gradient-to-r from-brand-gold/30 via-brand-gold/15 to-transparent border-r-3 border-brand-gold px-2.5 py-1 mb-1.5 rounded-l shrink-0">
                <span
                  className="font-cinzel font-black text-yellow-300 uppercase tracking-wider block leading-tight"
                  style={{ fontSize: `${titleSize}px` }}
                >
                  {cat.title}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-1 flex-1 overflow-hidden">
                {(cat.items || []).map((item, itmIdx) => (
                  <div key={item.id || item.nr || itmIdx} className="flex items-center justify-between gap-1.5 border-b border-white/10 pb-0.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      {item.nr && (
                        <span
                          className="font-mono font-bold text-brand-gold/90 shrink-0"
                          style={{ fontSize: `${nameSize}px` }}
                        >
                          {item.nr}.
                        </span>
                      )}
                      <span
                        className="font-bold text-white font-cinzel truncate"
                        style={{ fontSize: `${nameSize}px` }}
                      >
                        {item.name}
                      </span>
                    </div>
                    <span
                      className="font-bold font-mono text-yellow-300 bg-brand-gold/20 px-1.5 py-0.2 rounded border border-brand-gold/50 shrink-0 shadow-sm"
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

        {/* ─── 3. GRAND COMBO BANNER ────────────────────────────────────────────────── */}
        {combo.show !== false && (
          <div className="relative z-20 mx-7 my-1.5 p-3 rounded-2xl bg-gradient-to-r from-[#1c0b06] via-[#2a1307] to-[#1c0b06] border-2 border-brand-gold shadow-2xl flex items-center justify-between shrink-0">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="font-cinzel text-[13px] font-black text-yellow-300 uppercase truncate">
                  {combo.title}
                </span>
              </div>
              <p className="text-[9.5px] text-gray-200 truncate mt-0.5">{combo.desc}</p>
            </div>
            <div className="bg-black/90 border border-brand-gold rounded-xl px-3.5 py-1.5 font-mono text-sm font-black text-yellow-400 shrink-0 ml-3 shadow-lg">
              {combo.price}
            </div>
          </div>
        )}

        {/* ─── 4. BOTTOM CONTACT & 3 QR CODES ───────────────────────────────────────── */}
        <footer className="relative z-20 mx-7 mb-4 p-3 rounded-2xl bg-[#03140a]/95 border-2 border-brand-gold/70 backdrop-blur-md shadow-2xl shrink-0 space-y-2.5">
          {/* 3 QR Codes */}
          <div className="grid grid-cols-3 gap-3 border-b border-brand-gold/35 pb-2">
            {qrCodes.map((qr) => (
              <div key={qr.id} className="flex items-center gap-2 bg-black/70 border border-brand-gold/50 rounded-xl p-1.5 shadow">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(qr.url || 'https://alsafi-restaurant.de')}`}
                  alt={qr.title}
                  className="w-8 h-8 rounded bg-white p-0.5 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-[8.5px] font-cinzel font-black text-brand-gold uppercase truncate">
                    {qr.title}
                  </div>
                  <div className="text-[7.5px] text-gray-300 truncate">
                    {qr.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-3 gap-2 text-slate-200 text-[9.5px]">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <span className="font-mono font-bold truncate">{contact.phone}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <span className="font-semibold truncate">{contact.address}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <span className="font-semibold text-brand-goldLight truncate">{contact.delivery}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BifoldPanel4BackCover;
