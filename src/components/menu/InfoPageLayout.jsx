import React from 'react';
import EditableText from '../common/EditableText';
import RestaurantLogo from '../common/RestaurantLogo';
import PageDecorativeBorder from '../common/PageDecorativeBorder';
import QRCodeDisplay from '../common/QRCodeDisplay';
import FloatingShapeOverlay from '../common/FloatingShapeOverlay';
import PageBackgroundLayer from '../common/PageBackgroundLayer';
import PageFooter from '../common/PageFooter';
import PrintGuidesOverlay from '../common/PrintGuidesOverlay';
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
  const { updateSetting, updateFloatingShape, deleteFloatingShape, showPrintGuides, showLayoutGrid } = useMenu();

  const qrList = p.qrCodes || DEFAULT_SETTINGS.qrCodes;

  const handleUpdateQrField = (qIdx, field, value) => {
    const updated = [...qrList];
    updated[qIdx] = { ...updated[qIdx], [field]: value };
    updateSetting('global', 'qrCodes', updated);
  };

  let bgColor = '#0a1610';
  let bgImage = '';

  if (p.bgStyle === 'gradient') {
    bgColor = '#0a1610';
    bgImage = 'radial-gradient(ellipse at top center, #163322 0%, #0a1610 70%, #040d08 100%)';
  } else if (p.bgStyle === 'solid-green' || !p.bgStyle) {
    bgColor = '#0a1610';
    bgImage = 'none';
  } else if (p.bgStyle === 'emerald-deep') {
    bgColor = '#112418';
    bgImage = 'linear-gradient(180deg, #173322 0%, #112418 60%, #0a1810 100%)';
  } else if (p.bgStyle === 'lime-vibrant-dark') {
    bgColor = '#0a1610';
    bgImage = 'radial-gradient(ellipse at 50% 12%, #1b3d26 0%, #0a1610 65%, #050c08 100%)';
  } else if (p.bgStyle === 'damascus-dark') {
    bgColor = '#07130b';
    bgImage = 'linear-gradient(180deg, #0e2416 0%, #07130b 60%, #030805 100%)';
  } else if (p.bgStyle === 'true-black') {
    bgColor = '#000000';
    bgImage = 'radial-gradient(ellipse at top center, #0a0a0a 0%, #000000 80%)';
  }

  const patternOpacity = p.bgPatternOpacity !== undefined ? (p.bgPatternOpacity / 100).toFixed(3) : 0.025;
  const patternScale = p.bgPatternScale !== undefined ? p.bgPatternScale / 100 : 1;
  const patternColor = p.bgPatternColor || '#8dc63f';
  let patternSvg = '';
  
  if (p.bgPatternType === 'none') {
    patternSvg = '';
  } else if (p.bgPatternType === 'custom' && p.customPatternImage) {
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
    } else if (p.bgPatternType === 'alsafiLeaf') {
      svgContent = `<svg width='${70 * patternScale}' height='${70 * patternScale}' viewBox='0 0 70 70' xmlns='http://www.w3.org/2000/svg'><g fill='${patternColor}' fill-opacity='${patternOpacity}' transform='rotate(25 35 35)'><path d='M35 15 C45 20, 48 35, 35 48 C22 35, 25 20, 35 15 Z' /><line x1='35' y1='18' x2='35' y2='52' stroke='${patternColor}' stroke-width='1' stroke-opacity='${patternOpacity}' /></g></svg>`;
    } else if (p.bgPatternType === 'logoLetter') {
      svgContent = `<svg width='${80 * patternScale}' height='${80 * patternScale}' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'><g fill='${patternColor}' fill-opacity='${patternOpacity}'><text x='36' y='52' font-family='Cinzel, serif' font-size='38' font-weight='bold' text-anchor='middle'>A</text><path d='M44 24 C48 18, 56 19, 58 25 C54 29, 47 28, 44 24 Z' /></g></svg>`;
    } else {
      svgContent = `<svg width='${60 * patternScale}' height='${60 * patternScale}' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><path d='M30 10 L33 27 L50 30 L33 33 L30 50 L27 33 L10 30 L27 27 Z' fill='${patternColor}' fill-opacity='${patternOpacity}'/></svg>`;
    }
    if (svgContent) {
      const base64Svg = btoa(unescape(encodeURIComponent(svgContent)));
      patternSvg = `url("data:image/svg+xml;base64,${base64Svg}")`;
    }
  }

  if (patternSvg && (p.bgPatternOpacity === undefined || p.bgPatternOpacity > 0)) {
    if (bgImage && bgImage !== 'none') {
       bgImage = `${patternSvg}, ${bgImage}`;
    } else {
       bgImage = patternSvg;
    }
  }

  return (
    <div className="a4-page-wrapper" id={pageData.id}>
      <div
        className="a4-page"
        style={{ 
          backgroundColor: bgColor, 
          backgroundImage: bgImage || 'none',
          filter: (p.pageBrightness && p.pageBrightness !== 100) || (p.pageContrast && p.pageContrast !== 100)
            ? `brightness(${p.pageBrightness || 100}%) contrast(${p.pageContrast || 100}%)`
            : undefined,
        }}
      >
        <PrintGuidesOverlay
          orientation="portrait"
          showPrintGuides={showPrintGuides}
          showLayoutGrid={showLayoutGrid}
          pageLabel={`صفحة ${pageData.pageNumber || pageIndex + 1}`}
        />
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
          borderInset={p.borderInset !== undefined ? p.borderInset : 24}
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

        {/* Main Center Content Area with Whole Page 13 Block Transform */}
        <div
          className="relative w-full h-full px-[24px] py-[16px] flex flex-col justify-between z-20 box-border transition-transform duration-75"
          style={{
            paddingRight: `${p.contentPaddingRight !== undefined ? p.contentPaddingRight : 36}px`,
            paddingLeft: `${p.contentPaddingLeft !== undefined ? p.contentPaddingLeft : 36}px`,
            transform: `translate(${p.page13OffsetX || 0}px, ${p.page13OffsetY || 0}px) scale(${(p.page13ContentScale || 100) / 100})`,
            transformOrigin: 'center center',
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

        {/* Central Catering & Contact Card Block */}
        <div className="flex-1 flex flex-col justify-between w-full my-auto">
          {/* 1. Central Catering & Contact Card */}
          <div className="w-full px-3 relative z-20 flex flex-col gap-2 my-auto">
            <div
              className="bg-[#03140a]/95 rounded-xl p-3.5 flex flex-col gap-2 text-slate-200 w-full mx-auto shadow-2xl transition-all"
              style={{
                border: p.showPage13CardBorders !== false ? `${p.page13BorderWidth !== undefined ? p.page13BorderWidth : 1.5}px solid rgba(201, 170, 88, ${p.page13BorderOpacity !== undefined ? p.page13BorderOpacity / 100 : 0.5})` : 'none',
              }}
            >
              <div className="flex items-center gap-3 justify-center">
                <div className="category-pill bg-brand-green border-brand-gold scale-100">
                  <span
                    className="category-num-circle bg-brand-accent/20 text-brand-goldLight"
                    style={{ textAlign: 'center', lineHeight: '1' }}
                  >
                    18
                  </span>
                  <span className="font-cinzel text-[13.5px] font-bold text-white tracking-widest uppercase pr-3 pl-1 block">
                    18. CATERING · LIEFERUNG · ABHOLUNG
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
                    Montag–Samstag 11:00–22:00 Uhr | Sonntag & Feiertage 12:00–22:00 Uhr
                  </div>
                </div>

                <div className="flex gap-2">
                  <span className="text-brand-gold text-sm">🚚</span>
                  <div>
                    <span className="text-brand-accent font-bold">Lieferzeiten:</span>
                    <br />
                    Montag–Samstag 14:00–21:00 Uhr | Sonntag & Feiertage 12:00–21:00 Uhr
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
            className="mt-auto relative z-20 flex flex-col px-3 shrink-0"
            style={{
              gap: `${p.page13CardGap !== undefined ? p.page13CardGap : 6}px`,
              transform: `translate(${p.legendOffsetX || 0}px, ${p.legendOffsetY || 0}px)`,
              paddingBottom: `${p.legendPaddingBottom !== undefined ? p.legendPaddingBottom : 2}px`,
            }}
          >
            {/* 2. Full Official HINWEISE & SYMBOLE Card */}
            {p.showHinweiseCard !== false && (
              <div
                className="rounded-lg p-2 bg-black/60 shadow-md text-slate-200 transition-all"
                style={{
                  border: p.showPage13CardBorders !== false ? `${p.page13BorderWidth !== undefined ? p.page13BorderWidth : 1.5}px solid rgba(201, 170, 88, ${p.page13BorderOpacity !== undefined ? p.page13BorderOpacity / 100 : 0.4})` : 'none',
                }}
              >
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
                      <span>🌶️ <strong className="text-white">pikant</strong></span>
                      <span>|</span>
                      <span>🌶️🌶️ <strong className="text-white">extra scharf</strong></span>
                    </span>
                  </div>
                  <span
                    className="text-slate-300 italic block mt-0.5 leading-tight"
                    style={{ fontSize: `${p.hinweiseNoticeSize !== undefined ? p.hinweiseNoticeSize : 8.5}px` }}
                  >
                    <EditableText
                      value={p.hinweiseNoticeText !== undefined ? p.hinweiseNoticeText : 'Die Symbole beziehen sich auf die Standardzubereitung. Gerichte mit 🌶️ sind pikant; 🌶️🌶️ kennzeichnet die extra scharfe Variante.'}
                      onChange={(v) => updateSetting('page13', 'hinweiseNoticeText', v)}
                    />
                  </span>
                </div>
              </div>
            )}

            {p.showAllergenLegend !== false && (
              <div className="flex gap-2">
                {/* 3. Allergen Legend Card */}
                <div
                  className="w-[46%] rounded-lg p-2.5 bg-black/70 shadow-md transition-all flex flex-col justify-between"
                  style={{
                    border: p.showPage13CardBorders !== false ? `${p.page13BorderWidth !== undefined ? p.page13BorderWidth : 1.5}px solid rgba(201, 170, 88, ${p.page13BorderOpacity !== undefined ? p.page13BorderOpacity / 100 : 0.4})` : 'none',
                  }}
                >
                  <h4
                    className="text-brand-goldLight font-cinzel text-center border-b border-brand-gold/30 pb-1 mb-1.5 tracking-widest font-bold shrink-0"
                    style={{ fontSize: `${p.legendTitleSize || 11}px` }}
                  >
                    ALLERGENLEGENDE
                  </h4>
                  <div
                    className="grid grid-cols-2 gap-x-2 gap-y-1 text-slate-200"
                    style={{ fontSize: `${p.legendTextSize || 9.5}px` }}
                  >
                    {ALLERGENS.map((item) => (
                      <span key={item.code} className="leading-tight break-words">
                        <strong className="text-brand-gold font-bold">{item.code}</strong> {item.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4. Additives Legend Card */}
                <div
                  className="flex-1 rounded-lg p-2.5 bg-black/70 shadow-md transition-all flex flex-col justify-between"
                  style={{
                    border: p.showPage13CardBorders !== false ? `${p.page13BorderWidth !== undefined ? p.page13BorderWidth : 1.5}px solid rgba(201, 170, 88, ${p.page13BorderOpacity !== undefined ? p.page13BorderOpacity / 100 : 0.4})` : 'none',
                  }}
                >
                  <h4
                    className="text-brand-goldLight font-cinzel text-center border-b border-brand-gold/30 pb-1 mb-1.5 tracking-widest font-bold shrink-0"
                    style={{ fontSize: `${p.legendTitleSize || 11}px` }}
                  >
                    ZUSATZSTOFFLEGENDE
                  </h4>
                  <div
                    className="grid grid-cols-2 gap-x-2 gap-y-1 text-slate-200"
                    style={{ fontSize: `${p.legendTextSize || 9.5}px` }}
                  >
                    {ADDITIVES.map((item) => (
                      <span key={item.code} className="leading-tight break-words">
                        <strong className="text-brand-accent font-bold">{item.code}</strong> {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Unified Universal Page Footer — 100% Identical Level & Position */}
      <PageFooter
        pageData={pageData}
        pageIndex={pageIndex}
        pageSettings={pageSettings}
        onUpdateHeader={onUpdateHeader}
        isTwoColumnMode={true}
      />
    </div>
  </div>
  );
};

export default InfoPageLayout;
