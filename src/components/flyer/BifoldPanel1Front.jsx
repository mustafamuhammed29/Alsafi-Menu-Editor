import React, { useRef, useState } from 'react';
import EditableText from '../common/EditableText';
import RestaurantLogo from '../common/RestaurantLogo';
import PageDecorativeBorder from '../common/PageDecorativeBorder';
import { useMenu } from '../../context/MenuContext';
import { Upload, Flame, Crown, Sparkles, Phone, MapPin, Tag } from 'lucide-react';
import { optimizeImageFile } from '../../utils/imageOptimizer';

export const BifoldPanel1Front = ({ panelData }) => {
  const { updateFlyerPanel1 } = useMenu();
  const heroImageInputRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const p1 = panelData || {};
  const heroImage = p1.heroImage || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1800&q=88';
  const heroScale = p1.heroScale !== undefined ? p1.heroScale : 1.05;
  const heroPosX = p1.heroPosX !== undefined ? p1.heroPosX : 50;
  const heroPosY = p1.heroPosY !== undefined ? p1.heroPosY : 50;
  const heroDarkness = p1.heroDarkness !== undefined ? p1.heroDarkness : 25;

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
    <div className="a4-page-wrapper" id="bifold-panel-1">
      <div
        className="a4-page relative overflow-hidden flex flex-col justify-between select-none bg-black"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Layer 0: Full Cover Photo Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <img
            src={heroImage}
            alt="Flyer Front Cover"
            className="w-full h-full object-cover transition-transform duration-300"
            style={{
              transform: `scale(${heroScale}) translate(${(heroPosX - 50)}%, ${(heroPosY - 50)}%)`,
              transformOrigin: `${heroPosX}% ${heroPosY}%`,
            }}
          />

          {/* Vignette Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(3,20,10,0.45) 24%, rgba(0,0,0,0.2) 48%, rgba(3,20,10,0.65) 75%, rgba(0,0,0,0.95) 100%)`,
            }}
          />

          {heroDarkness > 0 && (
            <div
              className="absolute inset-0 bg-black pointer-events-none"
              style={{ opacity: heroDarkness / 100 }}
            />
          )}
        </div>

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

        {/* ─── 1. TOP HEADER & LOGO ─────────────────────────────────────────────────── */}
        <header className="relative z-20 pt-7 px-8 flex flex-col items-center text-center shrink-0">
          <div className="mb-1 flex items-center justify-center gap-2">
            <span className="h-[1.5px] w-10 bg-gradient-to-r from-transparent via-brand-gold to-brand-gold/90" />
            <div className="bg-black/70 border border-brand-gold/80 px-3.5 py-0.5 rounded-full backdrop-blur-md shadow-lg">
              <EditableText
                value={p1.badge || 'ORIENTALISCHE GASTRONOMIE SEIT 2018 · HEIDELBERG'}
                onChange={(v) => updateFlyerPanel1('badge', v)}
                className="font-cinzel text-[9.5px] font-bold text-brand-gold tracking-[0.24em] uppercase block select-none"
              />
            </div>
            <span className="h-[1.5px] w-10 bg-gradient-to-l from-transparent via-brand-gold to-brand-gold/90" />
          </div>

          <div className="my-1.5 transition-transform hover:scale-105 drop-shadow-[0_6px_24px_rgba(0,0,0,0.95)]">
            <RestaurantLogo src="logo.jpg" size={72} multiplier={1} showSubtext={true} />
          </div>

          <div className="flex items-center justify-center gap-2.5 w-full max-w-[280px] my-1 opacity-95">
            <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#8dc63f] to-[#8dc63f]" />
            <span className="text-[#8dc63f] text-[12px] leading-none font-bold select-none drop-shadow">❖ ✦ ❖</span>
            <div className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent via-[#8dc63f] to-[#8dc63f]" />
          </div>

          <div className="my-0.5">
            <EditableText
              value={p1.title || 'ALSAFI RESTAURANT'}
              onChange={(v) => updateFlyerPanel1('title', v)}
              tagName="h1"
              className="font-cinzel font-black tracking-[0.16em] uppercase block leading-tight bg-clip-text text-transparent bg-gradient-to-b from-[#FFFFFF] via-[#E2F7C7] to-[#8DC63F] drop-shadow-[0_4px_16px_rgba(0,0,0,1)] text-4xl"
            />
          </div>

          <div>
            <EditableText
              value={p1.subtitle || '✦ SPEISEKARTE ZUM MITNEHMEN · سفري ✦'}
              onChange={(v) => updateFlyerPanel1('subtitle', v)}
              className="font-serif italic font-bold tracking-[0.16em] uppercase block text-brand-goldLight drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] text-xs"
            />
          </div>

          <div className="mt-1.5">
            <span className="inline-flex items-center px-4 py-0.5 rounded-full bg-black/70 border border-brand-gold/60 text-brand-gold font-cinzel font-bold text-[9px] tracking-widest uppercase shadow-lg backdrop-blur-sm">
              <EditableText
                value={p1.tagline || 'SCHAWARMA · HOLZKOHLEGRILL · MEZZE · WRAPS'}
                onChange={(v) => updateFlyerPanel1('tagline', v)}
                className="block"
              />
            </span>
          </div>
        </header>

        {/* ─── 2. SPECIAL OFFER BADGE ───────────────────────────────────────────────── */}
        {p1.offerBadge?.show !== false && (
          <div className="relative z-20 mx-auto my-2 shrink-0">
            <div className="bg-gradient-to-r from-red-950/90 via-red-900/95 to-red-950/90 border-2 border-yellow-400/90 rounded-2xl px-6 py-2.5 shadow-[0_8px_25px_rgba(220,38,38,0.5)] backdrop-blur-md text-center transform hover:scale-105 transition">
              <div className="flex items-center justify-center gap-2">
                <Tag className="w-4 h-4 text-yellow-300" />
                <EditableText
                  value={p1.offerBadge?.title || '🔥 10% RABATT'}
                  onChange={(v) => updateFlyerPanel1('offerBadge', { ...p1.offerBadge, title: v })}
                  className="font-cinzel text-base font-black text-yellow-300 tracking-wider uppercase drop-shadow block"
                />
                <Tag className="w-4 h-4 text-yellow-300" />
              </div>
              <EditableText
                value={p1.offerBadge?.subtitle || 'BEI ABHOLUNG & BARZAHLUNG'}
                onChange={(v) => updateFlyerPanel1('offerBadge', { ...p1.offerBadge, subtitle: v })}
                className="font-tajawal text-[10px] font-bold text-white tracking-widest uppercase block mt-0.5"
              />
            </div>
          </div>
        )}

        {/* ─── 3. CENTER UPLOAD ACTION ──────────────────────────────────────────────── */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center pointer-events-none">
          {hovered && (
            <button
              type="button"
              onClick={() => heroImageInputRef.current?.click()}
              className="pointer-events-auto px-5 py-2.5 bg-gradient-to-r from-brand-gold via-yellow-400 to-brand-gold text-black rounded-2xl text-xs font-black flex items-center gap-2 shadow-[0_8px_25px_rgba(0,0,0,0.9)] no-print transition transform hover:scale-110 active:scale-95 cursor-pointer hover:brightness-110 border border-white/30"
            >
              <Upload className="w-4 h-4 text-black" />
              <span>تغيير صورة الغلاف</span>
            </button>
          )}

          <input
            ref={heroImageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleHeroImageUpload}
          />
        </div>

        {/* ─── 4. THREE PILLARS ─────────────────────────────────────────────────────── */}
        <div className="relative z-20 mx-7 my-2 shrink-0">
          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-black/75 border border-brand-gold/60 rounded-xl p-2.5 text-center backdrop-blur-md shadow-xl">
              <Flame className="w-4 h-4 text-brand-gold mx-auto mb-1" />
              <div className="font-cinzel text-[9.5px] font-black text-white uppercase tracking-wider">
                HOLZKOHLEGRILL
              </div>
              <div className="text-[7.5px] text-gray-300 font-medium mt-0.5">
                Echtes Raucharoma
              </div>
            </div>

            <div className="bg-black/75 border border-brand-gold/60 rounded-xl p-2.5 text-center backdrop-blur-md shadow-xl">
              <Crown className="w-4 h-4 text-brand-gold mx-auto mb-1" />
              <div className="font-cinzel text-[9.5px] font-black text-white uppercase tracking-wider">
                ORIGINAL SCHAWARMA
              </div>
              <div className="text-[7.5px] text-gray-300 font-medium mt-0.5">
                Täglich frisch gesteckt
              </div>
            </div>

            <div className="bg-black/75 border border-brand-gold/60 rounded-xl p-2.5 text-center backdrop-blur-md shadow-xl">
              <Sparkles className="w-4 h-4 text-brand-gold mx-auto mb-1" />
              <div className="font-cinzel text-[9.5px] font-black text-white uppercase tracking-wider">
                HAUSGEMACHTE MEZZE
              </div>
              <div className="text-[7.5px] text-gray-300 font-medium mt-0.5">
                100% vegetarisch & vegan
              </div>
            </div>
          </div>
        </div>

        {/* ─── 5. FOOTER & QR CODE ─────────────────────────────────────────────────── */}
        <footer className="relative z-20 mx-7 mb-5 p-3 rounded-2xl bg-[#03140a]/95 border-2 border-brand-gold/70 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.95)] shrink-0 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span className="text-[9.5px] font-bold text-white font-mono">
                <EditableText
                  value={p1.phone || '06221 72 59 000'}
                  onChange={(v) => updateFlyerPanel1('phone', v)}
                />
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              <span className="text-[9.5px] font-semibold text-gray-200">
                <EditableText
                  value={p1.address || 'Hertzstraße 1, 69126 Heidelberg (Im Kaufland)'}
                  onChange={(v) => updateFlyerPanel1('address', v)}
                />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-black/60 border border-brand-gold/50 rounded-xl px-3 py-1.5 shadow">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(p1.qrUrl || 'https://alsafi-restaurant.de')}`}
              alt="QR Code"
              className="w-9 h-9 rounded bg-white p-0.5"
            />
            <div className="text-right">
              <div className="text-[8px] text-brand-gold font-cinzel font-black uppercase tracking-wider">
                SPEISEKARTE
              </div>
              <div className="text-[7px] text-gray-300">Hier scannen</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BifoldPanel1Front;
