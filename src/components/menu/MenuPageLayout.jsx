import React, { useRef, useState, useEffect } from 'react';
import EditableText from '../common/EditableText';
import RestaurantLogo from '../common/RestaurantLogo';
import PageDecorativeBorder from '../common/PageDecorativeBorder';
import PageCalloutCard from '../common/PageCalloutCard';
import FloatingShapeOverlay from '../common/FloatingShapeOverlay';
import PageBackgroundLayer from '../common/PageBackgroundLayer';
import PageFooter from '../common/PageFooter';
import PrintGuidesOverlay from '../common/PrintGuidesOverlay';
import ArchSidebar from './ArchSidebar';
import CategorySection from './CategorySection';
import { useMenu, normalizeImage } from '../../context/MenuContext';

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
  const { updatePageCallout, updateFloatingShape, deleteFloatingShape, updateSetting, showPrintGuides, showLayoutGrid } = useMenu();

  const containerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const totalItems = pageData.categories
    ? pageData.categories.reduce((acc, cat) => acc + (cat.items?.length || 0), 0)
    : 0;

  // 100% Unified Typography Sizes across All Pages
  const hasCallout = Boolean(p.showCalloutCards !== false && pageData.bottomCallout);

  // Unified base font sizes
  let smartItemTitleSize = p.itemTitleSize !== undefined ? Number(p.itemTitleSize) : 14.5;
  let smartDescSize      = p.descSize !== undefined ? Number(p.descSize) : 10;
  let smartPriceSize     = p.priceSize !== undefined ? Number(p.priceSize) : 14;
  let smartCatTitleSize  = p.catTitleSize !== undefined ? Number(p.catTitleSize) : 16;
  let smartAllergenSize  = p.allergenSize !== undefined ? Number(p.allergenSize) : 8.5;

  // Spacing gaps adapt smoothly to total items without altering font sizes
  let smartGap = p.itemGap !== undefined ? Number(p.itemGap) : (totalItems >= 20 ? 1 : totalItems >= 11 ? 4 : totalItems >= 9 ? 7 : (hasCallout ? 6 : 10));
  let smartCatGap = p.categoryGap !== undefined ? Number(p.categoryGap) : (totalItems >= 20 ? 4 : totalItems >= 11 ? 8 : totalItems >= 9 ? 12 : (hasCallout ? 10 : 16));

  // User Content Scale Slider multiplier (e.g. 110% -> 1.10)
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

  // Minimum legible font size constraints
  smartItemTitleSize = Math.max(11, smartItemTitleSize);
  smartPriceSize     = Math.max(11, smartPriceSize);
  smartDescSize      = Math.max(8, smartDescSize);

  // Real-time A4 height overflow detection
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const checkOverflow = () => {
      // 297mm height is ~1122.5px in 96dpi screen CSS
      const clientH = el.clientHeight || 1122;
      const scrollH = el.scrollHeight;
      setIsOverflowing(scrollH > clientH + 5);
    };
    checkOverflow();
    const timer = setTimeout(checkOverflow, 150);
    return () => clearTimeout(timer);
  }, [pageData, pageSettings, smartItemTitleSize, smartDescSize, smartGap, smartCatGap]);

  // Premium Background Styling
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

  // Force two-column layout for Page 12 (Drinks) to place Cold right, Hot left, and images below Hot
  const isTwoColumnMode = pageData.pageMode === 'two-columns' || pageIndex === 11;
  const colImages = pageData.images?.slice(0, 2).map(img => img?.url || (typeof img === 'string' ? img : null)).filter(Boolean) || [];

  // Smart Auto-Fit & Maximize: Intelligently calculates the maximum possible font size and clean spacing
  // so the page content fills the A4 page at the largest possible size without any overflow!
  const handleAutoFitAndMaximize = (e) => {
    e?.stopPropagation();
    const el = containerRef.current;
    if (!el) return;

    const clientH = el.clientHeight || 1122;
    const scrollH = el.scrollHeight;
    const currentScale = p.contentScale !== undefined ? Number(p.contentScale) : 100;

    // Target height with safety margin to guarantee zero overflow
    const targetH = clientH - 10;
    const fitFactor = Math.min(1.0, targetH / Math.max(1, scrollH));
    const newScale = Math.max(50, Math.min(140, Math.floor(currentScale * fitFactor * 0.99)));

    const pageScope = `page${pageIndex + 1}`;
    updateSetting(pageScope, 'contentScale', newScale);

    // Tighten gaps slightly if needed to give maximum room for larger text
    if ((p.itemGap !== undefined ? Number(p.itemGap) : baseGap) > 6) {
      updateSetting(pageScope, 'itemGap', Math.max(2, Math.floor((p.itemGap !== undefined ? Number(p.itemGap) : baseGap) * 0.85)));
    }
    if ((p.categoryGap !== undefined ? Number(p.categoryGap) : baseCatGap) > 10) {
      updateSetting(pageScope, 'categoryGap', Math.max(4, Math.floor((p.categoryGap !== undefined ? Number(p.categoryGap) : baseCatGap) * 0.85)));
    }
  };

  return (
    <div className="a4-page-wrapper" id={pageData.id}>
      <div 
        ref={containerRef}
        className={`a4-page ${isOverflowing ? 'a4-overflow-detected' : ''}`} 
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
        {/* Debug / Edit mode Visual Overflow Warning with One-Click Smart Auto-Fit Button */}
        {isOverflowing && (
          <div className="a4-overflow-badge no-print" title="المحتوى يتجاوز الحد الأقصى لارتفاع صفحة A4 (297mm)">
            <div className="flex items-center gap-1.5 font-bold text-xs text-white">
              <span>⚠️</span>
              <span>تجاوز ارتفاع A4 (297mm)</span>
            </div>
            <button
              type="button"
              onClick={handleAutoFitAndMaximize}
              className="px-3 py-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black text-xs font-black rounded-lg shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer border border-white/40"
              title="إعادة توزيع وضبط المحتوى تلقائياً بأكبر حجم خط ممكن ليتناسب 100% مع ورقة A4"
            >
              <span>⚡</span>
              <span>ضبط وتكبير تلقائي مثالي</span>
            </button>
          </div>
        )}

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
          borderInset={p.borderInset !== undefined ? p.borderInset : 32}
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
          archBorderColor={p.archBorderColor || '#8dc63f'}
          archInnerColor={p.archInnerColor || '#162a1c'}
          showArchBorder={p.showArchBorder !== false}
          photoBlend={p.photoBlend || 'smooth'}
          photoFeather={p.photoFeather || 60}
          imageBrightness={p.imageBrightness || 100}
          imageContrast={p.imageContrast || 100}
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
            paddingRight: `${p.contentPaddingRight !== undefined ? p.contentPaddingRight : 34}px`,
            paddingLeft: isTwoColumnMode ? `${p.contentPaddingRight !== undefined ? p.contentPaddingRight : 34}px` : `${p.contentPaddingLeft !== undefined ? p.contentPaddingLeft : 28}px`,
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
                    <span className="text-red-600 text-[9.5px]">🌶️🌶️</span> Extra Scharf
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
                        <div className="mt-4 flex-1 flex flex-col justify-start items-center opacity-95 px-1 pb-2 gap-4">
                          {colImages.map((img, idx) => (
                            <div key={idx} className="w-full flex flex-col items-center">
                              {idx === 0 && (
                                <div className="w-full flex justify-center items-center mb-2.5 gap-2">
                                  <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#8dc63f] opacity-60"></span>
                                  <span className="text-[#8dc63f] text-[10px]">❦</span>
                                  <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#8dc63f] opacity-60"></span>
                                </div>
                              )}
                              <div 
                                className="rounded-t-[120px] rounded-b-md border-[3px] border-[#8dc63f] p-1 shadow-lg relative overflow-hidden transition-all duration-200"
                                style={{ 
                                  height: `${p.twoColumnImageHeight || 245}px`,
                                  width: `${p.twoColumnImageWidth !== undefined ? p.twoColumnImageWidth : 100}%`,
                                  borderWidth: `${p.twoColumnImageBorder !== undefined ? p.twoColumnImageBorder : 3}px`
                                }}
                              >
                                {(() => {
                                  const imgNorm = normalizeImage(pageData.images?.[idx] || img, idx);
                                  const dishBrightness = ((imgNorm.brightness || 100) * ((p.imageBrightness || 100) / 100));
                                  const dishContrast = ((imgNorm.contrast || 100) * ((p.imageContrast || 100) / 100));
                                  return (
                                    <img 
                                      src={imgNorm.url || img} 
                                      crossOrigin="anonymous" 
                                      className="w-full h-full object-cover" 
                                      alt="Decorative" 
                                      style={{
                                        objectPosition: `${imgNorm.posX ?? 50}% ${imgNorm.posY ?? 50}%`,
                                        transform: `scale(${imgNorm.scale ?? 1}) ${imgNorm.flipX ? 'scaleX(-1)' : ''} ${imgNorm.flipY ? 'scaleY(-1)' : ''}`,
                                        filter: `brightness(${dishBrightness}%) contrast(${dishContrast}%)`,
                                      }}
                                    />
                                  );
                                })()}
                              </div>
                              <div className="w-full flex justify-center items-center mt-2.5 gap-2">
                                <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#8dc63f] opacity-60"></span>
                                <span className="text-[#8dc63f] text-[10px]">{idx === 0 && colImages.length > 1 ? '❧' : '❦'}</span>
                                <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#8dc63f] opacity-60"></span>
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

              {/* Chef Recommendation / Special Note Callout Card in natural flow - NEVER overlaps dishes */}
              {p.showCalloutCards !== false && pageData.bottomCallout && (
                <div className="w-full flex justify-center mt-2 mb-1 shrink-0 z-30">
                  <PageCalloutCard
                    callout={pageData.bottomCallout}
                    pageIndex={pageIndex}
                    onUpdateCallout={updatePageCallout}
                  />
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
          isTwoColumnMode={isTwoColumnMode}
        />
      </div>
    </div>
  );
};

export default MenuPageLayout;
