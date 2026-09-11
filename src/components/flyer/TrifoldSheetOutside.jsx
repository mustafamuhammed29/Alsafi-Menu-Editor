import React, { useRef, useState } from 'react';
import EditableText from '../common/EditableText';
import RestaurantLogo from '../common/RestaurantLogo';
import PageDecorativeBorder from '../common/PageDecorativeBorder';
import PrintGuidesOverlay from '../common/PrintGuidesOverlay';
import { useMenu } from '../../context/MenuContext';
import { Upload, Phone, MapPin, Clock, Truck, Sparkles, Flame, Crown, Tag, QrCode, Mail, Globe } from 'lucide-react';
import { optimizeImageFile } from '../../utils/imageOptimizer';

export const TrifoldSheetOutside = ({ panel1, panel2, panel3 }) => {
  const { bifoldFlyerData, globalSettings, updateFlyerPanel1, updateFlyerPanel2, updateFlyerPanel3, showPrintGuides, showLayoutGrid } = useMenu();
  const heroImageInputRef = useRef(null);
  const [hoveredCover, setHoveredCover] = useState(false);

  const pageBrightness = globalSettings?.pageBrightness || 100;
  const pageContrast = globalSettings?.pageContrast || 100;

  const fontSizes = bifoldFlyerData?.fontSizeSettings || {};
  const catTitleSize = fontSizes.categoryTitleSize || 12;
  const nameSize = fontSizes.itemNameSize || 10.5;
  const descSize = fontSizes.itemDescSize || 8.5;
  const priceSize = fontSizes.priceSize || 10.5;

  const p1 = panel1 || {};
  const p2 = panel2 || {};
  const p3 = panel3 || {};

  const heroImage = p1.heroImage || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1800&q=88';
  const heroScale = p1.heroScale !== undefined ? p1.heroScale : 1.05;
  const heroPosX = p1.heroPosX !== undefined ? p1.heroPosX : 50;
  const heroPosY = p1.heroPosY !== undefined ? p1.heroPosY : 50;
  const heroDarkness = p1.heroDarkness !== undefined ? p1.heroDarkness : 25;

  const logoSize = fontSizes.logoSize || 62;

  const contact = p3.contact || {
    phone: '06221 72 59 000',
    address: 'Hertzstraße 1, 69126 Heidelberg (Im Kaufland)',
    hours: 'Mo-Sa 11:00-22:00 | So & Feiertage 12:00-22:00',
    delivery: 'Lieferando · Uber Eats · Wolt',
    website: 'www.alsafi-restaurant.de',
    email: 'info@alsafi-heidelberg.de',
  };

  const qrCodes = p3.qrCodes || [
    { id: 'menu', title: 'SPEISEKARTE', subtitle: 'Online ansehen', url: 'https://alsafi-restaurant.de' },
    { id: 'google', title: 'GOOGLE MAPS', subtitle: 'Route & Bewertung', url: 'https://g.page/r/alsafi-heidelberg' },
    { id: 'whatsapp', title: 'WHATSAPP', subtitle: 'Direkt bestellen', url: 'https://wa.me/4962217259000' },
  ];

  const handleHeroImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const optimized = await optimizeImageFile(file, 2000, 1500, 0.94);
      updateFlyerPanel1('heroImage', optimized);
    } catch {
      const reader = new FileReader();
      reader.onload = (ev) => {
        updateFlyerPanel1('heroImage', ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="a4-landscape-page-wrapper select-none" id="trifold-sheet-outside">
      <div 
        className="a4-landscape-page relative overflow-hidden bg-[#0a1610] shadow-2xl flex border-2 border-brand-gold/50"
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
          pageLabel="الوجه الخارجي للفلاير"
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
        {/* COLUMN 1 (LEFT): PANEL 2 — INSIDE FLAP (المطوية الداخلية) ────────────────── */}
        {/* ─────────────────────────────────────────────────────────────────────────── */}
        <div className="w-1/3 h-full relative p-3.5 flex flex-col justify-between border-r border-brand-gold/30 bg-gradient-to-b from-[#0e1f14] via-[#0a1610] to-[#060e0a] z-20">
          <PageDecorativeBorder showBorder={true} cornerStyle="royal" borderInset={8} borderWidth={1.5} borderOpacity={80} />

          {/* Header */}
          <div className="relative z-20 shrink-0 border-b border-brand-gold/30 pb-1.5 text-center">
            <span className="font-cinzel text-[11px] font-black text-brand-gold uppercase tracking-wider block">
              {p2.title || 'FRÜHSTÜCK & MEZZE'}
            </span>
            <span className="text-[8px] text-gray-300 block mt-0.5">
              ALSAFI RESTAURANT · ORIENTALISCHER GENUSS
            </span>
          </div>

          {/* Categories */}
          <div className="relative z-20 flex-1 space-y-2.5 my-1.5 overflow-hidden min-h-0">
            {(p2.categories || []).map((cat, catIdx) => (
              <div key={cat.id || `flap-cat-${catIdx}`} className="bg-black/70 border border-brand-gold/40 rounded-xl p-2 shadow-md backdrop-blur-sm">
                <div className="bg-gradient-to-r from-brand-gold/30 via-brand-gold/15 to-transparent border-r-2 border-brand-gold px-2 py-0.5 mb-1 rounded-l">
                  <span className="font-cinzel font-bold text-brand-goldLight uppercase tracking-wider block leading-tight" style={{ fontSize: `${catTitleSize}px` }}>
                    {cat.title}
                  </span>
                </div>
                <div className="space-y-0.5">
                  {(cat.items || []).slice(0, 4).map((item, itmIdx) => (
                    <div key={item.id || itmIdx} className="flex items-center justify-between text-[9px] border-b border-white/10 pb-0.5">
                      <span className="font-semibold text-white truncate max-w-[170px]" style={{ fontSize: `${nameSize}px` }}>
                        {item.name}
                      </span>
                      <span className="font-mono font-bold text-yellow-300 bg-brand-gold/20 px-1 rounded" style={{ fontSize: `${priceSize}px` }}>
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Flap Highlight Banner */}
          {p2.flapHighlight?.show !== false && (
            <div className="relative z-20 p-2 rounded-xl bg-gradient-to-r from-brand-gold/25 via-yellow-500/15 to-transparent border border-brand-gold/70 text-center shrink-0 shadow-lg">
              <span className="font-cinzel text-[9.5px] font-black text-brand-gold uppercase block">
                {p2.flapHighlight?.title || '✨ 100% HAUSGEMACHT & HALAL'}
              </span>
              <p className="text-[7.5px] text-gray-300 mt-0.5">
                {p2.flapHighlight?.desc || 'Alle Gerichte werden täglich frisch zubereitet.'}
              </p>
            </div>
          )}
        </div>

        {/* ─────────────────────────────────────────────────────────────────────────── */}
        {/* COLUMN 2 (CENTER): PANEL 3 — BACK COVER (الغلاف الخلفي للتواصل) ───────────── */}
        {/* ─────────────────────────────────────────────────────────────────────────── */}
        <div className="w-1/3 h-full relative p-3.5 flex flex-col justify-between border-r border-brand-gold/30 bg-[#020b06] z-20">
          <PageDecorativeBorder showBorder={true} cornerStyle="royal" borderInset={8} borderWidth={1.5} borderOpacity={80} />

          {/* Top Brand Logo Header */}
          <div className="relative z-20 text-center pt-1 shrink-0">
            <RestaurantLogo src="logo.jpg" size={44} multiplier={1} showSubtext={false} className="mx-auto mb-1 shadow-md" />
            <span className="font-cinzel text-[12px] font-black text-brand-gold tracking-widest uppercase block">
              ALSAFI HEIDELBERG
            </span>
            <span className="text-[8px] text-gray-300 block">
              ORIENTALISCHE GASTRONOMIE & CATERING
            </span>
          </div>

          {/* Contact Information Box */}
          <div className="relative z-20 my-auto space-y-2 bg-black/80 border border-brand-gold/60 rounded-2xl p-3 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 border-b border-white/10 pb-1.5">
              <Phone className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <div className="min-w-0">
                <span className="text-[7.5px] text-brand-accent uppercase font-bold block">Telefon & WhatsApp</span>
                <span className="text-[9.5px] font-bold text-white font-mono">{contact.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 border-b border-white/10 pb-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <div className="min-w-0">
                <span className="text-[7.5px] text-brand-accent uppercase font-bold block">Adresse</span>
                <span className="text-[8.5px] font-semibold text-gray-200 block truncate">{contact.address}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 border-b border-white/10 pb-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <div className="min-w-0">
                <span className="text-[7.5px] text-brand-accent uppercase font-bold block">Öffnungszeiten</span>
                <span className="text-[8px] font-semibold text-gray-200 block">{contact.hours}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <div className="min-w-0">
                <span className="text-[7.5px] text-brand-accent uppercase font-bold block">Bestellung über</span>
                <span className="text-[8.5px] font-semibold text-brand-goldLight block truncate">{contact.delivery}</span>
              </div>
            </div>
          </div>

          {/* 3 QR Codes Grid */}
          <div className="relative z-20 grid grid-cols-3 gap-1.5 shrink-0">
            {qrCodes.map((qr) => (
              <div key={qr.id} className="bg-black/85 border border-brand-gold/50 rounded-xl p-1 text-center shadow">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(qr.url || 'https://alsafi-restaurant.de')}`}
                  alt={qr.title}
                  className="w-7 h-7 mx-auto rounded bg-white p-0.5 mb-0.5 shadow"
                />
                <span className="font-cinzel text-[7px] font-bold text-brand-gold uppercase block truncate">
                  {qr.title}
                </span>
              </div>
            ))}
          </div>

          {/* Footer Copyright */}
          <div className="relative z-20 text-center shrink-0 pt-1 border-t border-white/10">
            <span className="text-[7.5px] text-gray-400 font-mono block">
              © {new Date().getFullYear()} ALSAFI RESTAURANT HEIDELBERG · 100% HALAL
            </span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────────── */}
        {/* COLUMN 3 (RIGHT): PANEL 1 — FRONT COVER (الغلاف الأمامي الرئيسي) ──────────── */}
        {/* ─────────────────────────────────────────────────────────────────────────── */}
        <div
          className="w-1/3 h-full relative p-3.5 flex flex-col justify-between z-20 overflow-hidden"
          onMouseEnter={() => setHoveredCover(true)}
          onMouseLeave={() => setHoveredCover(false)}
        >
          {/* Full Background Photo */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <img
              src={heroImage}
              alt="Front Cover"
              className="w-full h-full object-cover"
              style={{
                transform: `scale(${heroScale}) translate(${(heroPosX - 50)}%, ${(heroPosY - 50)}%)`,
                transformOrigin: `${heroPosX}% ${heroPosY}%`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(3,20,10,0.35) 30%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.92) 100%)`,
              }}
            />
            {heroDarkness > 0 && (
              <div className="absolute inset-0 bg-black pointer-events-none" style={{ opacity: heroDarkness / 100 }} />
            )}
          </div>

          <PageDecorativeBorder showBorder={true} cornerStyle="royal" borderInset={8} borderWidth={2} borderOpacity={95} />

          {/* Top Branding Header */}
          <header className="relative z-20 text-center pt-2 shrink-0">
            <div className="bg-black/80 border border-brand-gold px-2.5 py-0.5 rounded-full inline-block mb-1 shadow-lg">
              <EditableText
                value={p1.badge || 'ORIENTALISCHE GASTRONOMIE · HEIDELBERG'}
                onChange={(v) => updateFlyerPanel1('badge', v)}
                className="font-cinzel font-bold text-brand-gold tracking-widest uppercase text-[7.5px] block"
              />
            </div>

            <div className="my-1 transition-transform hover:scale-105">
              <RestaurantLogo src="logo.jpg" size={logoSize} multiplier={1} showSubtext={true} className="mx-auto shadow-xl" />
            </div>

            <div className="my-0.5">
              <EditableText
                value={p1.title || 'ALSAFI RESTAURANT'}
                onChange={(v) => updateFlyerPanel1('title', v)}
                tagName="h1"
                className="font-cinzel font-black tracking-wider uppercase block text-sm bg-clip-text text-transparent bg-gradient-to-b from-white via-[#E2F7C7] to-brand-gold drop-shadow-md"
              />
            </div>

            <EditableText
              value={p1.subtitle || '✦ SPEISEKARTE ZUM MITNEHMEN ✦'}
              onChange={(v) => updateFlyerPanel1('subtitle', v)}
              className="font-serif italic font-bold tracking-wider uppercase block text-brand-goldLight text-[8.5px]"
            />
          </header>

          {/* Middle Feature Highlights List */}
          <div className="relative z-20 my-auto space-y-1 bg-black/60 backdrop-blur-sm border border-brand-gold/40 rounded-xl p-2 text-center shadow">
            <div className="text-[7.5px] font-bold text-gray-200 flex items-center justify-center gap-1">
              <Flame className="w-2.5 h-2.5 text-yellow-400" />
              <span>Echter Holzkohlegrill &amp; tägl. frisches Schawarma</span>
            </div>
            <div className="text-[7px] text-gray-300 font-semibold">
              100% Halal · Hausgemachte Mezze · Catering Service
            </div>
          </div>

          {/* Special Offer Badge */}
          {p1.offerBadge?.show !== false && (
            <div className="relative z-20 mx-auto my-1 shrink-0">
              <div className="bg-gradient-to-r from-red-950/95 via-red-900 to-red-950/95 border-2 border-yellow-400 rounded-xl px-3 py-1 shadow-lg text-center backdrop-blur-sm transform hover:scale-105 transition">
                <div className="flex items-center justify-center gap-1">
                  <Tag className="w-3 h-3 text-yellow-300" />
                  <EditableText
                    value={p1.offerBadge?.title || '🔥 10% RABATT'}
                    onChange={(v) => updateFlyerPanel1('offerBadgeTitle', v)}
                    className="font-cinzel text-xs font-black text-yellow-300 uppercase block"
                  />
                </div>
                <EditableText
                  value={p1.offerBadge?.subtitle || 'BEI ABHOLUNG & BARZAHLUNG'}
                  onChange={(v) => updateFlyerPanel1('offerBadgeSubtitle', v)}
                  className="text-[7.5px] font-bold text-white uppercase block mt-0.2"
                />
              </div>
            </div>
          )}

          {/* Hover Button for Changing Image */}
          <div className="relative z-20 flex-1 flex flex-col items-center justify-center pointer-events-none">
            {hoveredCover && (
              <button
                type="button"
                onClick={() => heroImageInputRef.current?.click()}
                className="pointer-events-auto px-3 py-1.5 bg-gradient-to-r from-brand-gold to-yellow-400 text-black rounded-xl text-[10px] font-black flex items-center gap-1 shadow-lg no-print transition transform hover:scale-105 border border-white/30"
              >
                <Upload className="w-3 h-3 text-black" />
                <span>رفع صورة الغلاف</span>
              </button>
            )}
            <input ref={heroImageInputRef} type="file" accept="image/*" className="hidden" onChange={handleHeroImageUpload} />
          </div>

          {/* Bottom Quick Contact Bar */}
          <footer className="relative z-20 p-2 rounded-xl bg-[#03140a]/95 border border-brand-gold/70 backdrop-blur-md shadow shrink-0 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1 text-[8px] font-bold text-white font-mono">
                <Phone className="w-2.5 h-2.5 text-brand-gold" />
                <span>{p1.phone || '06221 72 59 000'}</span>
              </div>
              <div className="flex items-center gap-1 text-[7.5px] font-semibold text-gray-200">
                <MapPin className="w-2.5 h-2.5 text-brand-gold" />
                <span className="truncate max-w-[130px]">{p1.address || 'Hertzstraße 1, Heidelberg'}</span>
              </div>
            </div>

            <div className="bg-black/70 border border-brand-gold/50 rounded-lg p-1">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(p1.qrUrl || 'https://alsafi-restaurant.de')}`}
                alt="QR Code"
                className="w-6 h-6 rounded bg-white p-0.5"
              />
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default TrifoldSheetOutside;
