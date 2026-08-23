import React from 'react';
import EditableText from '../common/EditableText';
import RestaurantLogo from '../common/RestaurantLogo';
import PageDecorativeBorder from '../common/PageDecorativeBorder';
import QRCodeDisplay from '../common/QRCodeDisplay';
import FloatingShapeOverlay from '../common/FloatingShapeOverlay';
import PageBackgroundLayer from '../common/PageBackgroundLayer';
import { ALLERGENS, ADDITIVES, RESTAURANT_INFO } from '../../data/legendData';
import { DEFAULT_SETTINGS } from '../../data/defaultSettings';
import { useMenu } from '../../context/MenuContext';

export const InfoPageLayout = ({
  pageData,
  pageIndex,
  pageSettings,
  onUpdateHeader,
}) => {
  const p = pageSettings;
  const { updateSetting, updateFloatingShape, deleteFloatingShape } = useMenu();

  const qrList = p.qrCodes || DEFAULT_SETTINGS.qrCodes;

  const handleUpdateQrField = (qIdx, field, value) => {
    const updated = [...qrList];
    updated[qIdx] = { ...updated[qIdx], [field]: value };
    updateSetting('global', 'qrCodes', updated);
  };

  let bgColor = '#000000';
  let bgImage = '';

  if (p.bgStyle === 'gradient') {
    bgColor = '#050a07';
    bgImage = 'linear-gradient(180deg, #0a1f13 0%, #07150d 40%, #050a07 100%)';
  } else if (p.bgStyle === 'solid-green' || !p.bgStyle) {
    bgColor = '#050a07';
  } else if (p.bgStyle === 'true-black') {
    bgColor = '#000000';
  }

  const patternOpacity = p.bgPatternOpacity !== undefined ? (p.bgPatternOpacity / 100).toFixed(3) : 0.02;
  const patternScale = p.bgPatternScale !== undefined ? p.bgPatternScale / 100 : 1;
  const patternColor = p.bgPatternColor || '#c9aa58';
  let patternSvg = '';
  
  if (p.bgPatternType === 'custom' && p.customPatternImage) {
    const svgStr = `<svg width="${80 * patternScale}" height="${80 * patternScale}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><image href="${p.customPatternImage}" width="100" height="100" opacity="${patternOpacity}" /></svg>`;
    const base64Svg = btoa(unescape(encodeURIComponent(svgStr)));
    patternSvg = `url("data:image/svg+xml;base64,${base64Svg}")`;
  } else {
    let svgContent = '';
    if (p.bgPatternType === 'cutlery') {
      svgContent = `<svg width='${120 * patternScale}' height='${120 * patternScale}' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'><g fill='${patternColor}' fill-opacity='${patternOpacity}'><path d='M 48 44 v 12 c 0 3 2.5 5 5 5 v 15 h 2 v -15 c 2.5 0 5 -2 5 -5 v -12 h -2 v 12 c 0 1.5 -1.5 3 -3 3 s -3 -1.5 -3 -3 v -12 h -2 z M 51.5 44 v 12 h 2 v -12 h -2 z M 55.5 44 v 12 h 2 v -12 h -2 z'/><path d='M 68 44 c 4 0 6 4 6 12 v 6 h -4 v 14 h -2 v -32 z'/></g></svg>`;
    } else if (p.bgPatternType === 'diamonds') {
      svgContent = `<svg width='${60 * patternScale}' height='${60 * patternScale}' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><path d='M30 15 L35 30 L30 45 L25 30 Z' fill='${patternColor}' fill-opacity='${patternOpacity}'/></svg>`;
    } else if (p.bgPatternType === 'dots') {
      svgContent = `<svg width='${40 * patternScale}' height='${40 * patternScale}' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'><circle cx='20' cy='20' r='2.5' fill='${patternColor}' fill-opacity='${patternOpacity}'/></svg>`;
    } else if (p.bgPatternType === 'logoLetter') {
      svgContent = `<svg width='${80 * patternScale}' height='${80 * patternScale}' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'><text x='40' y='50' font-family='serif' font-size='36' font-weight='bold' text-anchor='middle' fill='${patternColor}' fill-opacity='${patternOpacity}'>A</text></svg>`;
    } else {
      svgContent = `<svg width='${60 * patternScale}' height='${60 * patternScale}' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><path d='M30 10 L33 27 L50 30 L33 33 L30 50 L27 33 L10 30 L27 27 Z' fill='${patternColor}' fill-opacity='${patternOpacity}'/></svg>`;
    }
    const base64Svg = btoa(unescape(encodeURIComponent(svgContent)));
    patternSvg = `url("data:image/svg+xml;base64,${base64Svg}")`;
  }

  if (p.bgPatternOpacity === undefined || p.bgPatternOpacity > 0) {
    if (bgImage) {
       bgImage = `${patternSvg}, ${bgImage}`;
    } else {
       bgImage = patternSvg;
    }
  }

  return (
    <div className="a4-page-wrapper" id={pageData.id}>
      <div
        className="a4-page"
        style={{ backgroundColor: bgColor, backgroundImage: bgImage || 'none' }}
      >
        {/* Custom Page Background Image & Watermark Layer */}
        <PageBackgroundLayer
          customBgImage={p.customBgImage}
          bgOpacity={p.bgOpacity}
          bgBlur={p.bgBlur}
          bgDarkness={p.bgDarkness}
          bgFit={p.bgFit}
          bgScale={p.bgScale}
          bgPosX={p.bgPosX}
          bgPosY={p.bgPosY}
        />

        {/* Decorative Inner Page Border */}
        <PageDecorativeBorder
          showBorder={p.showBorder !== false}
          borderTop={p.borderTop !== false}
          borderBottom={p.borderBottom !== false}
          borderLeft={p.borderLeft !== false}
          borderRight={p.borderRight !== false}
          cornerStyle={p.borderCornerStyle || 'royal'}
          borderInset={p.borderInset !== undefined ? p.borderInset : 18}
          borderWidth={p.borderWidth !== undefined ? p.borderWidth : 1.5}
          borderOpacity={p.borderOpacity !== undefined ? p.borderOpacity : 85}
        />

        {/* Interactive Floating Geometric Food & Ornament Shapes */}
        <FloatingShapeOverlay
          shapes={pageData.floatingShapes || []}
          pageIndex={pageIndex}
          onUpdateShape={updateFloatingShape}
          onDeleteShape={deleteFloatingShape}
        />

        {/* Main Center Content Area */}
        <div
          className="relative w-full h-full px-[24px] py-[16px] flex flex-col justify-between z-20 box-border"
          style={{
            paddingRight: `${p.contentPaddingRight !== undefined ? p.contentPaddingRight : 36}px`,
            paddingLeft: `${p.contentPaddingLeft !== undefined ? p.contentPaddingLeft : 36}px`,
          }}
        >

        {/* Header */}
        <header className="flex flex-col items-center text-center mb-2 relative z-20 mt-1 shrink-0">
          <EditableText
            value={pageData.header.subtitle}
            onChange={(v) => onUpdateHeader(pageIndex, 'subtitle', v)}
            className="text-[11px] tracking-[0.25em] text-brand-goldLight uppercase font-cinzel font-semibold mb-1 block"
          />

          <RestaurantLogo
            src={p.logoImage}
            size={p.page13LogoSize !== undefined ? p.page13LogoSize : 54}
            className="mb-1"
            multiplier={1}
            showSubtext={true}
          />

          <EditableText
            value={pageData.header.title}
            onChange={(v) => onUpdateHeader(pageIndex, 'title', v)}
            tagName="h2"
            className="font-playfair text-[26px] font-bold text-white leading-tight mb-0.5 whitespace-pre-wrap text-center block"
          />

          <div className="flex items-center gap-2 text-brand-goldLight opacity-90 mb-0.5">
            <span className="text-[11px]">❧</span>
            <EditableText
              value={pageData.header.tagline}
              onChange={(v) => onUpdateHeader(pageIndex, 'tagline', v)}
              className="font-serif italic text-[12.5px] block"
            />
            <span className="text-[11px]">☙</span>
          </div>
        </header>

        {/* Central Catering & Contact Card */}
        <div className="w-full px-3 relative z-20 flex flex-col gap-2 my-auto">
          <div className="bg-[#03140a]/95 border border-brand-gold/50 rounded-xl p-4 flex flex-col gap-2.5 text-slate-200 w-full mx-auto shadow-2xl">
            <div className="flex items-center gap-3 justify-center">
              <div className="category-pill bg-brand-green border-brand-gold scale-100">
                <span
                  className="category-num-circle bg-brand-accent/20 text-brand-goldLight"
                  style={{ textAlign: 'center', lineHeight: '1' }}
                >
                  17
                </span>
                <span className="font-cinzel text-[13.5px] font-bold text-white tracking-widest uppercase pr-3 pl-1 block">
                  CATERING, LIEFERUNG & ABHOLUNG
                </span>
              </div>
            </div>

            <div className="text-center">
              <p className="font-serif italic text-[13px] text-brand-goldLight/90 mb-0.5">
                „Du feierst. Wir kümmern uns um den Rest.“
              </p>
              <p className="text-[11px] text-slate-300 leading-relaxed max-w-xl mx-auto">
                Ob Geburtstag, Hochzeit, Firmenfeier oder Familienfest - wir bringen Alsafi auf euren Tisch. Frisch zubereitet, individuell abgestimmt und mit Liebe gemacht.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[11px] max-w-2xl mx-auto border-t border-white/10 pt-2">
              <div className="flex gap-2">
                <span className="text-brand-gold text-sm">📞</span>
                <div>
                  <span className="text-brand-accent font-bold">Telefon & WhatsApp:</span>
                  <br />
                  {RESTAURANT_INFO.phone}
                </div>
              </div>

              <div className="flex gap-2">
                <span className="text-brand-gold text-sm">@</span>
                <div>
                  <span className="text-brand-accent font-bold">Catering & Anfragen:</span>
                  <br />
                  {RESTAURANT_INFO.email}
                </div>
              </div>

              <div className="flex gap-2">
                <span className="text-brand-gold text-sm">📍</span>
                <div>
                  <span className="text-brand-accent font-bold">Adresse:</span>
                  <br />
                  {RESTAURANT_INFO.address}
                </div>
              </div>

              <div className="flex gap-2">
                <span className="text-brand-gold text-sm">📱</span>
                <div>
                  <span className="text-brand-accent font-bold">Bestellung auch über:</span>
                  <br />
                  {RESTAURANT_INFO.deliveryServices}
                </div>
              </div>

              <div className="flex gap-2">
                <span className="text-brand-gold text-sm">🕒</span>
                <div>
                  <span className="text-brand-accent font-bold">Öffnungszeiten:</span>
                  <br />
                  Mo-Sa 11:00-22:00 Uhr | So & Feiertage 12:00-22:00 Uhr
                </div>
              </div>

              <div className="flex gap-2">
                <span className="text-brand-gold text-sm">🚚</span>
                <div>
                  <span className="text-brand-accent font-bold">Lieferzeiten:</span>
                  <br />
                  Mo-Sa 14:00-21:00 Uhr | So & Feiertage 12:00-21:00 Uhr
                </div>
              </div>
            </div>

            {/* 3 Luxury QR Codes Showcase (Website, Google, WhatsApp) */}
            {p.showQrCodes !== false && (
              <div className="mt-1 pt-2 border-t border-brand-gold/40 flex items-center justify-around gap-4 bg-black/40 rounded-lg p-2">
                {qrList.map((qr, qIdx) => (
                  <QRCodeDisplay
                    key={qr.id || qIdx}
                    qr={qr}
                    index={qIdx}
                    size={p.qrCodeSize || 60}
                    color={p.qrCodeColor || '#050a07'}
                    onUpdateTitle={(idx, val) => handleUpdateQrField(idx, 'title', val)}
                    onUpdateSubtitle={(idx, val) => handleUpdateQrField(idx, 'subtitle', val)}
                    onUpdateUrl={(idx, val) => handleUpdateQrField(idx, 'url', val)}
                    onUpdateImage={(idx, val) => handleUpdateQrField(idx, 'customImage', val)}
                    onRemoveImage={(idx) => handleUpdateQrField(idx, 'customImage', '')}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Legends, Hinweise & Allergen Tables */}
        <div
          className="mt-auto relative z-20 flex flex-col gap-1.5 px-3 shrink-0"
          style={{
            transform: `translate(${p.legendOffsetX || 0}px, ${p.legendOffsetY || 0}px)`,
            paddingBottom: `${p.legendPaddingBottom !== undefined ? p.legendPaddingBottom : 2}px`,
          }}
        >
          {/* Full Official HINWEISE & SYMBOLE Card */}
          {p.showHinweiseCard !== false && (
            <div className="border border-brand-gold/40 rounded-lg p-2 bg-black/60 shadow-md text-slate-200">
              <div className="flex items-center justify-between border-b border-brand-gold/30 pb-0.5 mb-1">
                <h4
                  className="text-brand-gold font-cinzel font-bold tracking-widest uppercase flex items-center gap-1"
                  style={{ fontSize: `${p.legendTitleSize || 10}px` }}
                >
                  <span>📋 HINWEISE & SYMBOLE</span>
                </h4>
                <span
                  className="text-brand-goldLight font-bold tracking-wider"
                  style={{ fontSize: `${Math.max(7, (p.legendTitleSize || 10) - 1.5)}px` }}
                >
                  ALSAFI SPEISEKARTE
                </span>
              </div>

              <div
                className="grid grid-cols-2 gap-x-3 gap-y-1 text-slate-300 mb-1"
                style={{ fontSize: `${p.legendTextSize || 8}px` }}
              >
                <div>• <strong className="text-white">Alle Fleischgerichte sind halal.</strong></div>
                <div>• Unsere vegetarischen Gerichte können auf Wunsch auch vegan zubereitet werden. Sprich uns gerne an.</div>
                <div>• Frisches arabisches Fladenbrot (A) ist zu jeder Speise inklusive und wird auf Wunsch gerne dazu gereicht.</div>
                <div>• Bei Allergien, Unverträglichkeiten oder Fragen zu Allergenen und Zusatzstoffen wende dich bitte an unser Personal. Wir helfen dir gerne weiter.</div>
              </div>

              <div
                className="border-t border-white/10 pt-1 flex flex-wrap items-center justify-between gap-1"
                style={{ fontSize: `${p.legendTextSize || 8}px` }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="text-brand-gold font-bold font-cinzel"
                    style={{ fontSize: `${(p.legendTextSize || 8) + 0.5}px` }}
                  >
                    SYMBOLE:
                  </span>
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span>🌱 <strong className="text-white">vegan</strong></span>
                    <span>|</span>
                    <span>🥬 <strong className="text-white">vegetarisch</strong></span>
                    <span>|</span>
                    <span>🌶️ <strong className="text-white">pikant / scharf</strong></span>
                    <span>|</span>
                    <span>🌶️🌶️ <strong className="text-white">extra scharf</strong></span>
                  </span>
                </div>
                <span
                  className="text-slate-400 italic text-[7.5px]"
                >
                  Die Symbole beziehen sich auf die Standardzubereitung. Gerichte mit 🌶️ sind pikant bzw. scharf; 🌶️🌶️ kennzeichnet die extra scharfe Variante.
                </span>
              </div>
            </div>
          )}

          {p.showAllergenLegend !== false && (
            <div className="flex gap-2">
              {/* Allergen Legend */}
              <div className="w-[40%] border border-brand-gold/40 rounded-lg p-2.5 bg-black/70 shadow-md">
                <h4
                  className="text-brand-goldLight font-cinzel text-center border-b border-brand-gold/30 pb-1 mb-1.5 tracking-widest font-bold"
                  style={{ fontSize: `${p.legendTitleSize || 11}px` }}
                >
                  ALLERGENLEGENDE
                </h4>
                <div
                  className="grid grid-cols-2 gap-x-2 gap-y-1 text-slate-200"
                  style={{ fontSize: `${p.legendTextSize || 9.5}px` }}
                >
                  {ALLERGENS.map((item) => (
                    <span key={item.code} className="truncate">
                      <strong className="text-brand-gold font-bold">{item.code}</strong> {item.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Additives Legend */}
              <div className="flex-1 border border-brand-gold/40 rounded-lg p-2.5 bg-black/70 shadow-md">
                <h4
                  className="text-brand-goldLight font-cinzel text-center border-b border-brand-gold/30 pb-1 mb-1.5 tracking-widest font-bold"
                  style={{ fontSize: `${p.legendTitleSize || 11}px` }}
                >
                  ZUSATZSTOFFLEGENDE
                </h4>
                <div
                  className="grid grid-cols-2 gap-x-2 gap-y-1 text-slate-200"
                  style={{ fontSize: `${p.legendTextSize || 9.5}px` }}
                >
                  {ADDITIVES.map((item) => (
                    <span key={item.code} className="truncate">
                      <strong className="text-brand-accent font-bold">{item.code}</strong> {item.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer 
          className="absolute bottom-4 pt-0.5 border-t border-brand-gold/30 flex items-center justify-between text-brand-textMuted tracking-widest font-cinzel z-30"
          style={{
            fontSize: `${p.footerTextSize || 9.5}px`,
            left: `${p.contentPaddingLeft !== undefined ? p.contentPaddingLeft : 36}px`,
            right: `${p.contentPaddingRight !== undefined ? p.contentPaddingRight : 36}px`
          }}
        >
          <span 
            className="transition-transform duration-75" 
            style={{ transform: `translate(${p.footerTextOffsetX || 0}px, ${p.footerTextOffsetY || 0}px)`, display: 'inline-block' }}
          >
            ALSAFI RESTAURANT · HEIDELBERG
          </span>
          <div 
            className="transition-transform duration-75" 
            style={{ transform: `translate(${p.pageNumberOffsetX || 0}px, ${p.pageNumberOffsetY || 0}px)` }}
          >
            <EditableText
              value={pageData.pageNumber}
              onChange={(v) => onUpdateHeader(pageIndex, 'pageNumber', v)}
              className="text-brand-gold font-bold block"
              style={{ fontSize: `${p.pageNumberSize || 14}px` }}
            />
          </div>
        </footer>
        </div>
      </div>
    </div>
  );
};

export default InfoPageLayout;
