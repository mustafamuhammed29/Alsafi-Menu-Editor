import React from 'react';
import EditableText from '../common/EditableText';
import RestaurantLogo from '../common/RestaurantLogo';
import PageDecorativeBorder from '../common/PageDecorativeBorder';
import PageBottomOrnament from '../common/PageBottomOrnament';
import PageCalloutCard from '../common/PageCalloutCard';
import FloatingShapeOverlay from '../common/FloatingShapeOverlay';
import PageBackgroundLayer from '../common/PageBackgroundLayer';
import ArchSidebar from './ArchSidebar';
import CategorySection from './CategorySection';
import { useMenu } from '../../context/MenuContext';

export const MenuPageLayout = ({
  pageData,
  pageIndex,
  pageSettings,
  onUpdateHeader,
  onUpdateCategory,
  onUpdateItem,
  onUpdateImage,
  onImageTransform,
  onResetTransform,
}) => {
  const p = pageSettings;
  const w = p.archWidth;
  const { updatePageCallout, updateFloatingShape, deleteFloatingShape } = useMenu();

  const totalItems = pageData.categories
    ? pageData.categories.reduce((acc, cat) => acc + (cat.items?.length || 0), 0)
    : 0;

  // Smart Dynamic Auto-Fit Spacing & Typography baseline calculation
  const hasCallout = Boolean(p.showCalloutCards !== false && pageData.bottomCallout);

  let baseGap = 6;
  let baseCatGap = 14;
  let baseItemTitleSize = 14.5;
  let baseDescSize = 10.5;
  let basePriceSize = 14;
  let baseCatTitleSize = 16;
  let baseAllergenSize = 8;

  if (totalItems >= 20) {
    // 20+ items (Page 12 drinks)
    baseGap = 0;
    baseCatGap = 4;
    baseItemTitleSize = 11.5;
    baseDescSize = 8.5;
    basePriceSize = 11.5;
    baseCatTitleSize = 13;
    baseAllergenSize = 7.5;
  } else if (totalItems >= 11) {
    baseGap = 1;
    baseCatGap = 4;
    baseItemTitleSize = 12.5;
    baseDescSize = 9.2;
    basePriceSize = 12.5;
    baseCatTitleSize = 14;
    baseAllergenSize = 8;
  } else if (totalItems === 10) {
    // e.g. Page 02 (Mezze + Vorspeisen mit Fleisch) and Page 08 (Burger + Veggie)
    baseGap = 1.5;
    baseCatGap = 5;
    baseItemTitleSize = 13;
    baseDescSize = 9.5;
    basePriceSize = 13;
    baseCatTitleSize = 14.5;
    baseAllergenSize = 8.5;
  } else if (totalItems === 9) {
    // e.g. Page 06 (Wraps)
    baseGap = 3;
    baseCatGap = 6;
    baseItemTitleSize = 13.5;
    baseDescSize = 9.8;
    basePriceSize = 13.5;
    baseCatTitleSize = 15;
    baseAllergenSize = 8.5;
  } else if (totalItems === 8) {
    // e.g. Page 03, Page 07, Page 09
    baseGap = hasCallout ? 3 : 4.5;
    baseCatGap = 8;
    baseItemTitleSize = 14;
    baseDescSize = 10.2;
    basePriceSize = 14;
    baseCatTitleSize = 15.5;
    baseAllergenSize = 8.5;
  } else if (totalItems === 7) {
    // e.g. Page 04 (Salate), Page 10 (Grillgerichte)
    baseGap = hasCallout ? 14 : 20;
    baseCatGap = 24;
    baseItemTitleSize = 16.5;
    baseDescSize = 11.5;
    basePriceSize = 16.5;
    baseCatTitleSize = 19;
    baseAllergenSize = 10;
  } else {
    // 6 or fewer items (Page 01 Frühstück)
    baseGap = hasCallout ? 18 : 28;
    baseCatGap = 32;
    baseItemTitleSize = 18;
    baseDescSize = 12.5;
    basePriceSize = 18;
    baseCatTitleSize = 22;
    baseAllergenSize = 11;
  }

  // Active Effective Typography (Controlled by User Sliders with 100% precision per page/global)
  let smartItemTitleSize = p.itemTitleSize !== undefined ? Number(p.itemTitleSize) : baseItemTitleSize;
  let smartPriceSize     = p.priceSize !== undefined ? Number(p.priceSize) : basePriceSize;
  let smartDescSize      = p.descSize !== undefined ? Number(p.descSize) : baseDescSize;
  let smartCatTitleSize  = p.catTitleSize !== undefined ? Number(p.catTitleSize) : baseCatTitleSize;
  let smartAllergenSize  = p.allergenSize !== undefined ? Number(p.allergenSize) : baseAllergenSize;
  let smartGap           = p.itemGap !== undefined ? Number(p.itemGap) : baseGap;
  let smartCatGap        = p.categoryGap !== undefined ? Number(p.categoryGap) : baseCatGap;

  // User Content Scale Slider multiplier (e.g. 108% -> 1.08, 90% -> 0.90)
  const userScale = p.contentScale !== undefined && p.contentScale > 0 ? p.contentScale / 100 : 1;

  if (userScale !== 1) {
    smartItemTitleSize = parseFloat((smartItemTitleSize * userScale).toFixed(1));
    smartDescSize      = parseFloat((smartDescSize * userScale).toFixed(1));
    smartPriceSize     = parseFloat((smartPriceSize * userScale).toFixed(1));
    smartCatTitleSize  = parseFloat((smartCatTitleSize * userScale).toFixed(1));
    smartAllergenSize  = parseFloat((smartAllergenSize * userScale).toFixed(1));
    smartGap           = parseFloat((smartGap * userScale).toFixed(1));
    smartCatGap        = parseFloat((smartCatGap * userScale).toFixed(1));
  }

  // Determine background style
  let bgColor = '#000000'; // Default to true-black
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

  const isTwoColumnMode = pageData.pageMode === 'two-columns';
  const colImages = pageData.images?.slice(0, 2).map(img => img?.url || (typeof img === 'string' ? img : null)).filter(Boolean) || [];

  return (
    <div className="a4-page-wrapper" id={pageData.id}>
      <div className="a4-page" style={{ backgroundColor: bgColor, backgroundImage: bgImage || 'none' }}>
        {/* Custom Page Background Image & Watermark Layer (100% Full-Bleed) */}
        <PageBackgroundLayer
          customBgImage={p.customBgImage}
          bgOpacity={p.bgOpacity}
          bgBlur={p.bgBlur}
          bgDarkness={p.bgDarkness}
          bgFit={p.bgFit || 'cover'}
          bgScale={p.bgScale}
          bgPosX={p.bgPosX !== undefined ? p.bgPosX : 68}
          bgPosY={p.bgPosY !== undefined ? p.bgPosY : 50}
        />

        {/* Royal Decorative Page Frame / Borders */}
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

        {/* Left Side Curved Arch Images */}
        {!isTwoColumnMode && (
          <ArchSidebar
            pageId={pageData.id}
          pageIndex={pageIndex}
          images={pageData.images || []}
          archWidth={p.archWidth !== undefined ? p.archWidth : 280}
          archCurveDepth={p.archCurveDepth !== undefined ? p.archCurveDepth : 110}
          archWaistY={p.archWaistY !== undefined ? p.archWaistY : 560}
          archBottomOffset={p.archBottomOffset !== undefined ? p.archBottomOffset : 10}
          archStyle={p.archStyle || 'classic'}
          archBorderWidth={p.archBorderWidth !== undefined ? p.archBorderWidth : 1.5}
          archInnerBorderWidth={p.archInnerBorderWidth !== undefined ? p.archInnerBorderWidth : 3}
          archBorderColor={p.archBorderColor || '#c9aa58'}
          archInnerColor={p.archInnerColor || '#0f3d23'}
          showArchBorder={p.showArchBorder !== false}
          photoBlend={p.photoBlend || 'smooth'}
          photoFeather={p.photoFeather || 60}
            onImageChange={(imgIdx, dataUrl) => onUpdateImage(pageIndex, imgIdx, dataUrl)}
            onImageTransform={onImageTransform}
            onResetTransform={onResetTransform}
          />
        )}

        {/* Right Side Menu Content Area - strictly bound to full A4 height */}
        <div
          className="relative ml-auto h-full py-5 flex flex-col justify-between z-20 box-border"
          style={{
            width: isTwoColumnMode ? '100%' : `calc(100% - ${Math.max(100, (p.archWidth !== undefined ? p.archWidth : 280) - ((p.archStyle === 'straight' ? 0 : (p.archCurveDepth !== undefined ? p.archCurveDepth : 110)) * 0.45)) + 10}px)`,
            paddingRight: `${p.contentPaddingRight !== undefined ? p.contentPaddingRight : 28}px`,
            paddingLeft: isTwoColumnMode ? `${p.contentPaddingRight !== undefined ? p.contentPaddingRight : 28}px` : `${p.contentPaddingLeft !== undefined ? p.contentPaddingLeft : 12}px`,
          }}
        >
          {/* Content Wrapper — ZERO transform/zoom to guarantee sharp text.
               Instead we rely purely on the smart font-size values already computed
               by the auto-fit logic above. The wrapper just fills its parent. */}
          <div className="flex-1 flex flex-col justify-between w-full pb-8">
            {/* Header Section */}
            <header 
              className="flex flex-col items-center text-center shrink-0 mb-1.5 mt-0 transition-transform duration-75"
              style={{ transform: `translateY(${p.headerOffsetY || 0}px)` }}
            >
              <EditableText
                value={pageData.header.subtitle}
                onChange={(v) => onUpdateHeader(pageIndex, 'subtitle', v)}
                className="tracking-[0.25em] text-brand-goldLight uppercase font-cinzel font-semibold block mb-0.5"
                style={{ fontSize: `${p.subtitleSize || (p.descSize + 1)}px` }}
              />

              {/* Restaurant Insignia / Logo */}
              {p.showLogo !== false && (
                <RestaurantLogo
                  src={p.logoImage}
                  size={p.logoSize || 36}
                  className="mb-0.5"
                  multiplier={1}
                  showSubtext={true}
                />
              )}

              <EditableText
                value={pageData.header.title}
                onChange={(v) => onUpdateHeader(pageIndex, 'title', v)}
                tagName="h2"
                className="font-playfair font-bold text-white leading-tight text-center block mb-0.5"
                style={{ fontSize: `${p.titleSize || 26}px` }}
              />

              <div className="flex items-center gap-2 text-brand-goldLight opacity-90 mb-0.5">
                <span className="text-[10px]">❧</span>
                <EditableText
                  value={pageData.header.tagline}
                  onChange={(v) => onUpdateHeader(pageIndex, 'tagline', v)}
                  className="font-serif italic block"
                  style={{ fontSize: `${p.taglineSize || (p.itemTitleSize - 1)}px` }}
                />
                <span className="text-[10px]">☙</span>
              </div>

              {/* Dietary Bar with clean flex-wrapping and safe bounds */}
              {pageData.header.showDietaryBar && (
                <div
                  className="dietary-bar font-bold text-brand-goldLight uppercase tracking-wider shadow-lg py-1 px-4 mt-1.5 max-w-full flex items-center justify-center gap-4"
                  style={{ fontSize: `${p.dietaryBarSize || 8}px` }}
                >
                  <span className="flex items-center gap-1">
                    <span className="text-brand-accent text-[9.5px]">🌱</span> Vegan
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-green-500 text-[9.5px]">🥬</span> Vegetarisch
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-red-500 text-[9.5px]">🌶️</span> Pikant
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-red-600 text-[9.5px]">🌶️🌶️</span> Scharf
                  </span>
                </div>
              )}
            </header>

            {/* Categories and Dishes List Block with live Block Positioner */}
            <div
              className="flex-1 flex flex-col justify-start h-full relative z-30 transition-transform duration-75"
              style={{
                transform: `translate(${p.contentOffsetX || 0}px, ${p.contentOffsetY || 0}px)`,
              }}
            >
              {pageData.pageMode === 'free-text' ? (
                <div 
                  className="w-full text-white leading-relaxed whitespace-pre-wrap"
                  style={{ fontSize: `${smartDescSize}px`, fontFamily: 'Cinzel, serif' }}
                  dangerouslySetInnerHTML={{ __html: pageData.freeTextContent || '' }}
                />
              ) : isTwoColumnMode ? (
                <div className="grid grid-cols-2 gap-x-12 gap-y-4 w-full flex-1">
                  {pageData.categories?.map((cat, cIdx) => (
                    <div key={cat.id} className="flex flex-col h-full">
                      <CategorySection
                        category={cat}
                        catIdx={cIdx}
                        pageIdx={pageIndex}
                        pageSettings={pageSettings}
                        onUpdateCategory={(cIndex, field, val) =>
                          onUpdateCategory(pageIndex, cIndex, field, val)
                        }
                        onUpdateItem={(cIndex, iIndex, field, val) =>
                          onUpdateItem(pageIndex, cIndex, iIndex, field, val)
                        }
                        smartGap={smartGap}
                        smartCatGap={smartCatGap}
                        smartDescSize={smartDescSize}
                        smartItemTitleSize={smartItemTitleSize}
                        smartPriceSize={smartPriceSize}
                        smartCatTitleSize={smartCatTitleSize}
                        smartAllergenSize={smartAllergenSize}
                      />
                      {/* Decorative image filler for the shorter column */}
                      {cIdx === 1 && colImages.length > 0 && (
                        <div className="mt-8 flex-1 flex flex-col justify-start items-center opacity-90 px-4 pb-4 gap-6">
                          {colImages.map((img, idx) => (
                            <div key={idx} className="w-full flex flex-col items-center">
                              {idx === 0 && (
                                <div className="w-full flex justify-center items-center mb-3 gap-2">
                                  <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#c9aa58] opacity-60"></span>
                                  <span className="text-[#c9aa58] text-[10px]">❦</span>
                                  <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#c9aa58] opacity-60"></span>
                                </div>
                              )}
                              <div 
                                className="rounded-t-[120px] rounded-b-md border-[3px] border-[#c9aa58] p-1 shadow-lg relative overflow-hidden transition-all duration-200"
                                style={{ 
                                  height: `${p.twoColumnImageHeight || 180}px`,
                                  width: `${p.twoColumnImageWidth || 90}%`,
                                  borderWidth: `${p.twoColumnImageBorder !== undefined ? p.twoColumnImageBorder : 3}px`
                                }}
                              >
                                <img 
                                  src={img} 
                                  crossOrigin="anonymous" 
                                  className="w-full h-full object-cover"
                                  alt="Decorative" 
                                  style={{
                                    objectPosition: `${pageData.imagesTransform?.[idx]?.x ?? 50}% ${pageData.imagesTransform?.[idx]?.y ?? 50}%`,
                                    transform: `scale(${pageData.imagesTransform?.[idx]?.zoom ?? 1})`
                                  }}
                                />
                                <div 
                                  className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" 
                                  style={{ borderRadius: '115px 115px 4px 4px' }}
                                ></div>
                              </div>
                              <div className="w-full flex justify-center items-center mt-3 gap-2">
                                <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#c9aa58] opacity-60"></span>
                                <span className="text-[#c9aa58] text-[10px]">{idx === 0 && colImages.length > 1 ? '❧' : '❦'}</span>
                                <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#c9aa58] opacity-60"></span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                pageData.categories?.map((cat, cIdx) => (
                  <CategorySection
                    key={cat.id}
                    category={cat}
                    catIdx={cIdx}
                    pageIdx={pageIndex}
                    pageSettings={pageSettings}
                    onUpdateCategory={(cIndex, field, val) =>
                      onUpdateCategory(pageIndex, cIndex, field, val)
                    }
                    onUpdateItem={(cIndex, iIndex, field, val) =>
                      onUpdateItem(pageIndex, cIndex, iIndex, field, val)
                    }
                    smartGap={smartGap}
                    smartCatGap={smartCatGap}
                    smartDescSize={smartDescSize}
                    smartItemTitleSize={smartItemTitleSize}
                    smartPriceSize={smartPriceSize}
                    smartCatTitleSize={smartCatTitleSize}
                    smartAllergenSize={smartAllergenSize}
                  />
                ))
              )}
            </div>

            {/* Bottom Section: Callout Card + Royal Bottom Ornament */}
            <div 
              className={`absolute bottom-11 flex flex-col items-center pointer-events-none z-20 ${isTwoColumnMode ? 'flex-1 justify-end' : ''}`}
              style={{
                left: isTwoColumnMode ? `${p.contentPaddingRight !== undefined ? p.contentPaddingRight : 28}px` : `${p.contentPaddingLeft !== undefined ? p.contentPaddingLeft : 12}px`,
                right: `${p.contentPaddingRight !== undefined ? p.contentPaddingRight : 28}px`
              }}
            >
              {/* Chef Recommendation / Note Callout Card */}
              {p.showCalloutCards !== false && pageData.bottomCallout && (
                <div className="pointer-events-auto w-full flex justify-center mb-1">
                  <PageCalloutCard
                    callout={pageData.bottomCallout}
                    pageIndex={pageIndex}
                    onUpdateCallout={updatePageCallout}
                  />
                </div>
              )}

              {/* Selectable Royal Bottom Ornament / Divider */}
              <div className="pointer-events-auto flex justify-center w-full">
                <PageBottomOrnament
                  style={p.bottomOrnamentStyle || 'royal'}
                  color="#c9aa58"
                  opacity={0.65}
                />
              </div>
            </div>

            {/* Page Footer */}
            <footer
              className="absolute bottom-5 pt-0.5 pb-0.5 border-t border-brand-gold/30 flex items-center justify-between text-brand-textMuted tracking-widest font-cinzel z-30"
              style={{
                fontSize: `${p.footerTextSize || 9.5}px`,
                left: isTwoColumnMode ? `${p.contentPaddingRight !== undefined ? p.contentPaddingRight : 28}px` : `${p.contentPaddingLeft !== undefined ? p.contentPaddingLeft : 12}px`,
                right: `${p.contentPaddingRight !== undefined ? p.contentPaddingRight : 28}px`
              }}
            >
              <span className="transition-transform duration-75" style={{ transform: `translate(${p.footerTextOffsetX || 0}px, ${p.footerTextOffsetY || 0}px)`, display: 'inline-block' }}>
                ALSAFI RESTAURANT · HEIDELBERG
              </span>
              <div className="transition-transform duration-75" style={{ transform: `translate(${p.pageNumberOffsetX || 0}px, ${p.pageNumberOffsetY || 0}px)` }}>
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
    </div>
  );
};

export default MenuPageLayout;
