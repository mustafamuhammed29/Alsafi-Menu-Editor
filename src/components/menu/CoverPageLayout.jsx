import React, { useRef, useState } from 'react';
import EditableText from '../common/EditableText';
import RestaurantLogo from '../common/RestaurantLogo';
import PageDecorativeBorder from '../common/PageDecorativeBorder';
import FloatingShapeOverlay from '../common/FloatingShapeOverlay';
import PrintGuidesOverlay from '../common/PrintGuidesOverlay';
import { useMenu } from '../../context/MenuContext';
import { Upload, Sparkles, Phone, MapPin, Clock, Truck, Image as ImageIcon } from 'lucide-react';
import { optimizeImageFile } from '../../utils/imageOptimizer';

export const CoverPageLayout = ({
  pageData,
  pageIndex = 0,
  pageSettings,
  onUpdateHeader,
}) => {
  const p = pageSettings;
  const { updateCoverPage, updateFloatingShape, deleteFloatingShape, showPrintGuides, showLayoutGrid } = useMenu();

  const heroImageInputRef = useRef(null);
  const [hoveredCover, setHoveredCover] = useState(false);
  const [hoveredFooter, setHoveredFooter] = useState(false);

  // Helper function to convert Hex to RGBA
  const hexToRgba = (hex, opacityPercent) => {
    if (!hex || typeof hex !== 'string') return hex;
    if (hex.startsWith('rgba')) return hex;
    let clean = hex.replace('#', '');
    if (clean.length === 3) clean = clean.split('').map((c) => c + c).join('');
    const r = parseInt(clean.substring(0, 2), 16) || 0;
    const g = parseInt(clean.substring(2, 4), 16) || 0;
    const b = parseInt(clean.substring(4, 6), 16) || 0;
    const a = Math.max(0, Math.min(1, (opacityPercent !== undefined ? opacityPercent : 100) / 100));
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  // Helper for footer shadows
  const getShadowCss = (shadowType) => {
    switch (shadowType) {
      case 'none':
        return 'none';
      case 'soft':
        return '0 4px 15px rgba(0,0,0,0.5)';
      case 'gold-glow':
        return '0 0 25px rgba(212,175,55,0.45), 0 10px 30px rgba(0,0,0,0.95)';
      case 'green-glow':
        return '0 0 25px rgba(141,198,63,0.45), 0 10px 30px rgba(0,0,0,0.95)';
      case 'strong':
      default:
        return '0 10px 30px rgba(0,0,0,0.95)';
    }
  };

  // Full-Bleed Background Image parameters
  const heroImage = pageData.coverHeroImage || pageData.coverBottomHeroImage || '/dishes/dish2-kebab.jpg';
  const heroScale = pageData.coverHeroScale !== undefined ? pageData.coverHeroScale : 1.0;
  const heroPosX = pageData.coverHeroPosX !== undefined ? pageData.coverHeroPosX : 50;
  const heroPosY = pageData.coverHeroPosY !== undefined ? pageData.coverHeroPosY : 50;
  const heroDarkness = pageData.coverHeroDarkness !== undefined ? pageData.coverHeroDarkness : (p.coverHeroDarkness !== undefined ? p.coverHeroDarkness : 10);
  const heroVignette = pageData.coverHeroVignette !== undefined ? pageData.coverHeroVignette : (p.coverHeroVignette !== undefined ? p.coverHeroVignette : 35);
  
  // Calculate combined brightness & contrast for cover photo
  const heroBrightness = ((pageData.coverHeroBrightness !== undefined ? pageData.coverHeroBrightness : (p.coverHeroBrightness || 100)) * ((p.imageBrightness || 100) / 100));
  const heroContrast = ((pageData.coverHeroContrast !== undefined ? pageData.coverHeroContrast : (p.coverHeroContrast || 100)) * ((p.imageContrast || 100) / 100));

  // Typography Settings
  const coverTitleSize = pageData.coverTitleSize !== undefined ? pageData.coverTitleSize : (p.coverTitleSize !== undefined ? p.coverTitleSize : 34);
  const coverSubtitleSize = pageData.coverSubtitleSize !== undefined ? pageData.coverSubtitleSize : (p.coverSubtitleSize !== undefined ? p.coverSubtitleSize : 11.5);
  const coverLogoSize = pageData.coverLogoSize !== undefined ? pageData.coverLogoSize : (p.coverLogoSize !== undefined ? p.coverLogoSize : 68);
  const coverBadgeSize = pageData.coverBadgeSize !== undefined ? pageData.coverBadgeSize : (p.coverBadgeSize !== undefined ? p.coverBadgeSize : 9.5);
  const coverTaglineSize = pageData.coverTaglineSize !== undefined ? pageData.coverTaglineSize : (p.coverTaglineSize !== undefined ? p.coverTaglineSize : 9);

  // ─── Cover Footer Complete Master Parameters ───
  const showCoverFooter = pageData.showCoverFooter !== false;
  const showPhone = pageData.coverFooterPhoneVisible !== false;
  const showAddress = pageData.coverFooterAddressVisible !== false;
  const showHours = pageData.coverFooterHoursVisible !== false;
  const showDelivery = pageData.coverFooterDeliveryVisible !== false;

  const coverFooterColumns = pageData.coverFooterColumns || '4';
  const coverFooterGap = pageData.coverFooterGap !== undefined ? pageData.coverFooterGap : 12;
  const coverFooterPadding = pageData.coverFooterPadding !== undefined ? pageData.coverFooterPadding : 12;
  const coverFooterMarginBottom = pageData.coverFooterMarginBottom !== undefined ? pageData.coverFooterMarginBottom : 20;
  const coverFooterMarginSide = pageData.coverFooterMarginSide !== undefined ? pageData.coverFooterMarginSide : 28;
  const coverFooterRadius = pageData.coverFooterBorderRadius !== undefined ? pageData.coverFooterBorderRadius : 16;
  const coverFooterWrap = pageData.coverFooterWrap !== undefined ? pageData.coverFooterWrap : (p.coverFooterWrap !== undefined ? p.coverFooterWrap : true);

  // Background & Glassmorphism
  const coverFooterBgColor = pageData.coverFooterBgColor || '#0e1d14';
  const coverFooterBgOpacity = pageData.coverFooterBgOpacity !== undefined ? pageData.coverFooterBgOpacity : 90;
  const coverFooterBlur = pageData.coverFooterBlur !== undefined ? pageData.coverFooterBlur : 12;
  const coverFooterBorderColor = pageData.coverFooterBorderColor || '#8dc63f';
  const coverFooterBorderWidth = pageData.coverFooterBorderWidth !== undefined ? pageData.coverFooterBorderWidth : 2;
  const coverFooterBorderOpacity = pageData.coverFooterBorderOpacity !== undefined ? pageData.coverFooterBorderOpacity : 60;
  const coverFooterShadow = pageData.coverFooterShadow || 'strong';

  // Icons
  const coverFooterShowIcons = pageData.coverFooterShowIcons !== false;
  const coverFooterIconSize = pageData.coverFooterIconSize !== undefined ? pageData.coverFooterIconSize : 14;
  const coverFooterIconCircleSize = pageData.coverFooterIconCircleSize !== undefined ? pageData.coverFooterIconCircleSize : 28;
  const coverFooterIconShape = pageData.coverFooterIconShape || 'circle';
  const coverFooterIconColor = pageData.coverFooterIconColor || '#8dc63f';
  const coverFooterIconBgColor = pageData.coverFooterIconBgColor || 'rgba(141, 198, 63, 0.25)';
  const coverFooterIconBorderColor = pageData.coverFooterIconBorderColor || 'rgba(141, 198, 63, 0.60)';

  // Typography & Colors
  const coverFooterTitleSize = pageData.coverFooterTitleSize !== undefined ? pageData.coverFooterTitleSize : (p.coverFooterTitleSize !== undefined ? p.coverFooterTitleSize : 8);
  const coverFooterValueSize = pageData.coverFooterValueSize !== undefined ? pageData.coverFooterValueSize : (p.coverFooterValueSize !== undefined ? p.coverFooterValueSize : 9.5);
  const coverFooterTitleColor = pageData.coverFooterTitleColor || '#8dc63f';
  const coverFooterValueColor = pageData.coverFooterValueColor || '#ffffff';
  const coverFooterDeliveryColor = pageData.coverFooterDeliveryColor || '#a6e247';

  const contact = pageData.contactInfo || {
    phone: '06221 72 59 000',
    address: 'Hertzstraße 1, 69126 Heidelberg - Kaufland',
    hours: 'Mo-Sa 11:00-22:00 | So & Feiertage 12:00-22:00',
    delivery: 'Lieferando · Uber Eats · Wolt',
    email: 'info@alsafi-heidelberg.de',
  };

  const contactLabels = pageData.contactLabels || {
    phone: 'Telefon & WhatsApp',
    address: 'Adresse',
    hours: 'Öffnungszeiten',
    delivery: 'Bestellung über',
  };

  const handleHeroImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const optimized = await optimizeImageFile(file, 2000, 1500, 0.94);
      updateCoverPage({ coverHeroImage: optimized, coverBottomHeroImage: optimized });
    } catch {
      const reader = new FileReader();
      reader.onload = (ev) => {
        updateCoverPage({ coverHeroImage: ev.target.result, coverBottomHeroImage: ev.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateContact = (field, val) => {
    updateCoverPage({
      contactInfo: {
        ...contact,
        [field]: val,
      },
    });
  };

  const handleUpdateContactLabel = (field, val) => {
    updateCoverPage({
      contactLabels: {
        ...contactLabels,
        [field]: val,
      },
    });
  };

  // Helper for icon container style
  const getIconContainerStyle = () => {
    if (coverFooterIconShape === 'none') {
      return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${coverFooterIconSize + 4}px`,
        height: `${coverFooterIconSize + 4}px`,
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
      };
    }
    return {
      width: `${coverFooterIconCircleSize}px`,
      height: `${coverFooterIconCircleSize}px`,
      borderRadius: coverFooterIconShape === 'circle' ? '9999px' : (coverFooterIconShape === 'rounded' ? '8px' : '0px'),
      backgroundColor: coverFooterIconBgColor,
      borderColor: coverFooterIconBorderColor,
      borderWidth: '1px',
      borderStyle: 'solid',
    };
  };

  // Columns class
  const getGridColsClass = () => {
    if (coverFooterColumns === '2') return 'grid grid-cols-2';
    if (coverFooterColumns === 'flex') return 'flex flex-wrap items-center justify-around';
    return 'grid grid-cols-4';
  };

  const heroFit = pageData.coverHeroFit || 'cover';

  return (
    <div className="a4-page-wrapper" id="page0">
      <div
        className="a4-page relative overflow-hidden flex flex-col justify-between select-none bg-black"
        style={{
          filter: (p.pageBrightness && p.pageBrightness !== 100) || (p.pageContrast && p.pageContrast !== 100)
            ? `brightness(${p.pageBrightness || 100}%) contrast(${p.pageContrast || 100}%)`
            : undefined,
        }}
        onMouseEnter={() => setHoveredCover(true)}
        onMouseLeave={() => setHoveredCover(false)}
      >
        <PrintGuidesOverlay
          orientation="portrait"
          showPrintGuides={showPrintGuides}
          showLayoutGrid={showLayoutGrid}
          pageLabel="غلاف المنيو"
        />
        {/* ─── LAYER 0: FULL-BLEED 100% COVER BACKGROUND IMAGE (صورة تغطي الصفحة بالكامل) ─── */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <img
            src={heroImage}
            alt="Alsafi Cover"
            className={`w-full h-full ${heroFit === 'contain' ? 'object-contain' : (heroFit === 'fill' ? 'object-fill' : 'object-cover')} transition-transform duration-300`}
            style={{
              transform: `scale(${heroScale}) translate(${(heroPosX - 50)}%, ${(heroPosY - 50)}%)`,
              transformOrigin: `${heroPosX}% ${heroPosY}%`,
              filter: `brightness(${heroBrightness}%) contrast(${heroContrast}%)`,
            }}
          />

          {/* Cinematic Vignette Overlay (Controllable intensity to prevent dark print cast) */}
          {heroVignette > 0 && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity"
              style={{
                opacity: heroVignette / 100,
                background: `linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(3,20,10,0.3) 25%, rgba(0,0,0,0.05) 50%, rgba(3,20,10,0.4) 75%, rgba(0,0,0,0.9) 100%)`,
              }}
            />
          )}

          {/* User-configurable darkness tint */}
          {heroDarkness > 0 && (
            <div
              className="absolute inset-0 bg-black pointer-events-none transition-opacity"
              style={{ opacity: heroDarkness / 100 }}
            />
          )}
        </div>

        {/* ─── LAYER 1: ORNATE ROYAL DOUBLE GOLDEN FRAME ─────────────────────────────── */}
        <PageDecorativeBorder
          showBorder={p.showBorder !== false}
          borderTop={p.borderTop !== false}
          borderBottom={p.borderBottom !== false}
          borderLeft={p.borderLeft !== false}
          borderRight={p.borderRight !== false}
          cornerStyle={p.borderCornerStyle || 'royal'}
          borderInset={p.borderInset !== undefined ? p.borderInset : 24}
          borderWidth={p.borderWidth !== undefined ? p.borderWidth : 2}
          borderOpacity={p.borderOpacity !== undefined ? p.borderOpacity : 95}
          borderColorScheme={p.borderColorScheme}
          borderColor={p.borderColor}
          borderSecondaryColor={p.borderSecondaryColor}
          theme={p.bgStyle === 'creme-luxury' ? 'creme' : 'default'}
        />

        {/* ─── LAYER 2: FLOATING SHAPES OVERLAY ──────────────────────────────────────── */}
        <FloatingShapeOverlay
          shapes={pageData.floatingShapes || []}
          pageIndex={0}
          onUpdateShape={updateFloatingShape}
          onDeleteShape={deleteFloatingShape}
        />

        {/* ─── LAYER 3: TOP PROMINENT LOGO & IMPERIAL HEADER (الشعار فقط في الأعلى) ───── */}
        <header className="relative z-20 pt-7 px-8 flex flex-col items-center text-center shrink-0">
          {/* Top Royal Sub-Badge */}
          <div className="mb-1.5 flex items-center justify-center gap-2">
            <span className="h-[1.5px] w-10 bg-gradient-to-r from-transparent via-brand-gold to-brand-gold/90" />
            <div className="bg-black/60 border border-brand-gold/70 px-3 py-0.5 rounded-full backdrop-blur-md shadow-lg">
              <EditableText
                value={pageData.header?.badge || 'ORIENTALISCHE GASTRONOMIE SEIT 2018 · HEIDELBERG'}
                onChange={(v) => onUpdateHeader && onUpdateHeader(0, 'badge', v)}
                className="font-cinzel font-bold text-brand-gold tracking-[0.24em] uppercase block select-none"
                style={{ fontSize: `${coverBadgeSize}px` }}
              />
            </div>
            <span className="h-[1.5px] w-10 bg-gradient-to-l from-transparent via-brand-gold to-brand-gold/90" />
          </div>

          {/* Majestic Restaurant Logo with Ambient Halo */}
          <div className="my-1.5 transition-transform hover:scale-105 drop-shadow-[0_6px_24px_rgba(0,0,0,0.95)]">
            <RestaurantLogo
              src={p.logoImage || 'logo.jpg'}
              size={coverLogoSize}
              multiplier={1}
              showSubtext={true}
            />
          </div>

          {/* Golden Damascene Floral Emblem Divider */}
          <div className="flex items-center justify-center gap-2.5 w-full max-w-[280px] my-1 opacity-95">
            <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#8dc63f] to-[#8dc63f]" />
            <span className="text-[#8dc63f] text-[12px] leading-none font-bold select-none drop-shadow">❖ ✦ ❖</span>
            <div className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent via-[#8dc63f] to-[#8dc63f]" />
          </div>

          {/* Main Title: ALSAFI RESTAURANT */}
          <div className="my-0.5">
            <EditableText
              value={pageData.header?.title || 'ALSAFI RESTAURANT'}
              onChange={(v) => onUpdateHeader && onUpdateHeader(0, 'title', v)}
              tagName="h1"
              className="font-cinzel font-black tracking-[0.16em] uppercase block leading-tight bg-clip-text text-transparent bg-gradient-to-b from-[#FFFFFF] via-[#E2F7C7] to-[#8DC63F] drop-shadow-[0_4px_16px_rgba(0,0,0,1)]"
              style={{
                fontSize: `${coverTitleSize}px`,
                textShadow: '0 2px 14px rgba(141, 198, 63, 0.45)',
              }}
            />
          </div>

          {/* Subtitle */}
          <div>
            <EditableText
              value={pageData.header?.subtitle || '✦ SPEISEKARTE · EINE KULINARISCHE REISE DES ORIENTS ✦'}
              onChange={(v) => onUpdateHeader && onUpdateHeader(0, 'subtitle', v)}
              className="font-serif italic font-bold tracking-[0.16em] uppercase block text-brand-goldLight drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
              style={{
                fontSize: `${coverSubtitleSize}px`,
              }}
            />
          </div>

          {/* Tagline Pill */}
          <div className="mt-1.5">
            <span className="inline-flex items-center px-4 py-0.5 rounded-full bg-black/70 border border-brand-gold/60 text-brand-gold font-cinzel font-bold tracking-widest uppercase shadow-lg backdrop-blur-sm">
              <EditableText
                value={pageData.header?.tagline || 'SCHAWARMA · HOLZKOHLEGRILL · MEZZE · WRAPS'}
                onChange={(v) => onUpdateHeader && onUpdateHeader(0, 'tagline', v)}
                className="block"
                style={{ fontSize: `${coverTaglineSize}px` }}
              />
            </span>
          </div>
        </header>

        {/* ─── LAYER 4: CENTER INTERACTIVE HOVER ACTIONS & ACCENT ─────────────────────── */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center pointer-events-none">
          {/* Quick Change / Upload Button on Hover (no-print) */}
          {hoveredCover && (
            <button
              type="button"
              onClick={() => heroImageInputRef.current?.click()}
              className="pointer-events-auto px-5 py-2.5 bg-gradient-to-r from-brand-gold via-yellow-400 to-brand-gold text-black rounded-2xl text-xs font-black flex items-center gap-2 shadow-[0_8px_25px_rgba(0,0,0,0.9)] no-print transition transform hover:scale-110 active:scale-95 cursor-pointer hover:brightness-110 border border-white/30"
              title="تغيير أو رفع صورة الغلاف الكاملة"
            >
              <Upload className="w-4 h-4 text-black" />
              <span>رفع وتغيير صورة خلفية الغلاف</span>
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

        {/* ─── LAYER 5: BOTTOM LUXURY GLASS RESTAURANT INFO (المعلومات في الأسفل) ─────── */}
        {showCoverFooter && (
          <footer
            className="relative z-20 shrink-0 transition-all duration-200"
            style={{
              marginLeft: `${coverFooterMarginSide}px`,
              marginRight: `${coverFooterMarginSide}px`,
              marginBottom: `${coverFooterMarginBottom}px`,
              padding: `${coverFooterPadding}px`,
              borderRadius: `${coverFooterRadius}px`,
              backgroundColor: hexToRgba(coverFooterBgColor, coverFooterBgOpacity),
              backdropFilter: coverFooterBlur > 0 ? `blur(${coverFooterBlur}px)` : 'none',
              WebkitBackdropFilter: coverFooterBlur > 0 ? `blur(${coverFooterBlur}px)` : 'none',
              borderColor: hexToRgba(coverFooterBorderColor, coverFooterBorderOpacity),
              borderWidth: `${coverFooterBorderWidth}px`,
              borderStyle: coverFooterBorderWidth > 0 ? 'solid' : 'none',
              boxShadow: getShadowCss(coverFooterShadow),
            }}
            onMouseEnter={() => setHoveredFooter(true)}
            onMouseLeave={() => setHoveredFooter(false)}
          >
            {/* Quick controller indicator on hover (no-print) */}
            {hoveredFooter && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 no-print pointer-events-none z-30 animate-fade-in">
                <span className="px-2.5 py-0.5 rounded-full bg-black/90 text-brand-gold border border-brand-gold/60 text-[9px] font-bold shadow-lg flex items-center gap-1 backdrop-blur-md">
                  <span>⚙️ شريط معلومات التواصل والفوتر</span>
                </span>
              </div>
            )}

            <div
              className={`${getGridColsClass()} text-slate-200`}
              style={{ gap: `${coverFooterGap}px` }}
            >
              {/* Phone & WhatsApp */}
              {showPhone && (
                <div className="flex items-start gap-2 min-w-0">
                  {coverFooterShowIcons && (
                    <div
                      className="shrink-0 flex items-center justify-center shadow mt-0.5 transition-all"
                      style={getIconContainerStyle()}
                    >
                      <Phone
                        style={{
                          width: `${coverFooterIconSize}px`,
                          height: `${coverFooterIconSize}px`,
                          color: coverFooterIconColor,
                        }}
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1 text-left">
                    <div
                      className="font-bold uppercase tracking-wider leading-tight"
                      style={{
                        fontSize: `${coverFooterTitleSize}px`,
                        color: coverFooterTitleColor,
                      }}
                    >
                      <EditableText
                        value={contactLabels.phone || 'Telefon & WhatsApp'}
                        onChange={(v) => handleUpdateContactLabel('phone', v)}
                      />
                    </div>
                    <div
                      className={`font-semibold leading-tight ${
                        coverFooterWrap ? 'break-words whitespace-normal' : 'truncate'
                      }`}
                      style={{
                        fontSize: `${coverFooterValueSize}px`,
                        color: coverFooterValueColor,
                      }}
                    >
                      <EditableText
                        value={contact.phone}
                        onChange={(v) => handleUpdateContact('phone', v)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Address */}
              {showAddress && (
                <div className="flex items-start gap-2 min-w-0">
                  {coverFooterShowIcons && (
                    <div
                      className="shrink-0 flex items-center justify-center shadow mt-0.5 transition-all"
                      style={getIconContainerStyle()}
                    >
                      <MapPin
                        style={{
                          width: `${coverFooterIconSize}px`,
                          height: `${coverFooterIconSize}px`,
                          color: coverFooterIconColor,
                        }}
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1 text-left">
                    <div
                      className="font-bold uppercase tracking-wider leading-tight"
                      style={{
                        fontSize: `${coverFooterTitleSize}px`,
                        color: coverFooterTitleColor,
                      }}
                    >
                      <EditableText
                        value={contactLabels.address || 'Adresse'}
                        onChange={(v) => handleUpdateContactLabel('address', v)}
                      />
                    </div>
                    <div
                      className={`font-semibold leading-tight ${
                        coverFooterWrap ? 'break-words whitespace-normal' : 'truncate'
                      }`}
                      style={{
                        fontSize: `${coverFooterValueSize}px`,
                        color: coverFooterValueColor,
                      }}
                    >
                      <EditableText
                        value={contact.address}
                        onChange={(v) => handleUpdateContact('address', v)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Opening Hours */}
              {showHours && (
                <div className="flex items-start gap-2 min-w-0">
                  {coverFooterShowIcons && (
                    <div
                      className="shrink-0 flex items-center justify-center shadow mt-0.5 transition-all"
                      style={getIconContainerStyle()}
                    >
                      <Clock
                        style={{
                          width: `${coverFooterIconSize}px`,
                          height: `${coverFooterIconSize}px`,
                          color: coverFooterIconColor,
                        }}
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1 text-left">
                    <div
                      className="font-bold uppercase tracking-wider leading-tight"
                      style={{
                        fontSize: `${coverFooterTitleSize}px`,
                        color: coverFooterTitleColor,
                      }}
                    >
                      <EditableText
                        value={contactLabels.hours || 'Öffnungszeiten'}
                        onChange={(v) => handleUpdateContactLabel('hours', v)}
                      />
                    </div>
                    <div
                      className={`font-semibold leading-tight ${
                        coverFooterWrap ? 'break-words whitespace-normal' : 'truncate'
                      }`}
                      style={{
                        fontSize: `${coverFooterValueSize}px`,
                        color: coverFooterValueColor,
                      }}
                    >
                      <EditableText
                        value={contact.hours}
                        onChange={(v) => handleUpdateContact('hours', v)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Delivery Services */}
              {showDelivery && (
                <div className="flex items-start gap-2 min-w-0">
                  {coverFooterShowIcons && (
                    <div
                      className="shrink-0 flex items-center justify-center shadow mt-0.5 transition-all"
                      style={getIconContainerStyle()}
                    >
                      <Truck
                        style={{
                          width: `${coverFooterIconSize}px`,
                          height: `${coverFooterIconSize}px`,
                          color: coverFooterIconColor,
                        }}
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1 text-left">
                    <div
                      className="font-bold uppercase tracking-wider leading-tight"
                      style={{
                        fontSize: `${coverFooterTitleSize}px`,
                        color: coverFooterTitleColor,
                      }}
                    >
                      <EditableText
                        value={contactLabels.delivery || 'Bestellung über'}
                        onChange={(v) => handleUpdateContactLabel('delivery', v)}
                      />
                    </div>
                    <div
                      className={`font-semibold leading-tight ${
                        coverFooterWrap ? 'break-words whitespace-normal' : 'truncate'
                      }`}
                      style={{
                        fontSize: `${coverFooterValueSize}px`,
                        color: coverFooterDeliveryColor,
                      }}
                    >
                      <EditableText
                        value={contact.delivery}
                        onChange={(v) => handleUpdateContact('delivery', v)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};

export default CoverPageLayout;
