import React from 'react';
import EditableText from '../common/EditableText';
import MenuItemRow from './MenuItemRow';

export const CategorySection = ({
  category,
  catIdx,
  pageIdx,
  pageSettings,
  onUpdateCategory,
  onUpdateItem,
  smartGap,
  smartCatGap,
  smartDescSize,
  smartItemTitleSize,
  smartPriceSize,
  smartCatTitleSize,
  smartAllergenSize,
}) => {
  const p = pageSettings;
  const catTitleSize = smartCatTitleSize || p.catTitleSize || 16;
  const catSubtitleSize = p.catSubtitleSize || Math.max(10, smartDescSize + 1.5);

  // Category Header Layout & Style Controls
  const badgeStyle = p.categoryBadgeStyle || 'pill'; // 'pill' | 'outline' | 'gold' | 'art-deco' | 'minimal'
  const marginTop = smartCatGap <= 10 ? '2px' : `${p.categoryMarginTop !== undefined ? p.categoryMarginTop : 6}px`;
  const marginBottom = smartCatGap <= 10 ? '2px' : `${p.categoryMarginBottom !== undefined ? p.categoryMarginBottom : 6}px`;
  const showCode = p.showCategoryCode !== false && Boolean(category.code && String(category.code).trim() !== '');
  const codePosition = p.categoryCodePosition || 'left'; // 'left' | 'right'
  const pillOffsetX = p.categoryPillOffsetX ?? 0;
  const pillOffsetY = p.categoryPillOffsetY ?? 0;
  const pillPaddingX = p.categoryPillPaddingX !== undefined ? p.categoryPillPaddingX : 12;
  const pillPaddingLeft = p.categoryPillPaddingLeft !== undefined ? p.categoryPillPaddingLeft : pillPaddingX;
  const pillPaddingRight = p.categoryPillPaddingRight !== undefined ? p.categoryPillPaddingRight : pillPaddingX;
  const pillPaddingY = p.categoryPillPaddingY !== undefined ? p.categoryPillPaddingY : 4;
  const pillRadius = p.categoryPillRadius !== undefined ? p.categoryPillRadius : 6;
  const pillBorderWidth = p.categoryPillBorderWidth !== undefined ? p.categoryPillBorderWidth : 1;
  const pillBgOpacity = p.categoryPillBgOpacity !== undefined ? p.categoryPillBgOpacity / 100 : 0.96;
  const letterSpacing = p.categoryLetterSpacing !== undefined ? p.categoryLetterSpacing : 0.12;
  const noWrap = p.categoryPillNoWrap !== false; // Default true: maintains single line
  const codeSize = p.categoryCodeSize || 22;
  const textColor = p.categoryTextColor || 'gold-light'; // 'gold-light' | 'gold-gradient' | 'white'
  const align = p.categoryAlign || 'center'; // 'center' | 'left' | 'right'

  const isCreme = p.bgStyle === 'creme-luxury';

  // Text Typography Classes & Style
  let titleColorClass = isCreme ? 'text-[#FFFFFF]' : 'text-brand-goldLight';
  if (!isCreme) {
    if (textColor === 'gold-gradient') {
      titleColorClass = 'bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] via-[#E2F7C7] to-[#8DC63F]';
    } else if (textColor === 'white') {
      titleColorClass = 'text-white';
    }
  }

  // Background and Border logic for pill styles
  let badgeBg = isCreme 
    ? '#0F3B2E' 
    : `linear-gradient(135deg, rgba(22, 42, 28, ${pillBgOpacity}) 0%, rgba(10, 22, 14, ${pillBgOpacity}) 100%)`;
  let badgeBorder = isCreme 
    ? `${pillBorderWidth}px solid #0F3B2E` 
    : `${pillBorderWidth}px solid rgba(141, 198, 63, 0.7)`;

  if (!isCreme) {
    if (badgeStyle === 'outline') {
      badgeBg = `rgba(0, 0, 0, ${pillBgOpacity * 0.45})`;
      badgeBorder = `${pillBorderWidth}px solid #8dc63f`;
    } else if (badgeStyle === 'gold') {
      badgeBg = `linear-gradient(135deg, #8dc63f 0%, #6ea822 100%)`;
      badgeBorder = `${pillBorderWidth}px solid #d4f4a2`;
      titleColorClass = 'text-[#0b1c11] font-black';
    }
  }

  const justifyClass = align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center';

  return (
    <div style={{ marginBottom: `${smartCatGap}px` }} className="relative z-10">
      {/* Category Header Container */}
      <div
        className={`flex items-center ${justifyClass} w-full`}
        style={{
          marginTop,
          marginBottom,
          transform: `translate(${pillOffsetX}px, ${pillOffsetY}px)`,
        }}
      >
        {badgeStyle === 'art-deco' ? (
          /* Art Deco Divider Style: Lines on both sides */
          <div className="flex items-center justify-center gap-3 w-full max-w-[92%] mx-auto">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#8dc63f]/60 to-transparent"></div>
            {showCode && (
              <EditableText
                value={category.code}
                onChange={(v) => onUpdateCategory(catIdx, 'code', v)}
                style={{
                  fontSize: `${Math.max(10, Math.round(codeSize * 0.6))}px`,
                  width: `${codeSize}px`,
                  height: `${codeSize}px`,
                }}
                className="category-num-circle flex items-center justify-center m-0 shrink-0"
              />
            )}
            <EditableText
              value={category.title}
              onChange={(v) => onUpdateCategory(catIdx, 'title', v)}
              className={`font-cinzel font-bold tracking-wider uppercase text-center block ${titleColorClass}`}
              style={{
                fontSize: `${catTitleSize}px`,
                letterSpacing: `${letterSpacing}em`,
                whiteSpace: noWrap ? 'nowrap' : 'normal',
                lineHeight: 1.15,
              }}
            />
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#8dc63f]/60 to-transparent"></div>
          </div>
        ) : badgeStyle === 'minimal' ? (
          /* Minimal Style: Clean text without box */
          <div className="inline-flex items-center justify-center gap-2">
            {showCode && (
              <EditableText
                value={category.code}
                onChange={(v) => onUpdateCategory(catIdx, 'code', v)}
                style={{
                  fontSize: `${Math.max(10, Math.round(codeSize * 0.6))}px`,
                  width: `${codeSize}px`,
                  height: `${codeSize}px`,
                }}
                className="category-num-circle flex items-center justify-center m-0 shrink-0"
              />
            )}
            <EditableText
              value={category.title}
              onChange={(v) => onUpdateCategory(catIdx, 'title', v)}
              className={`font-cinzel font-bold tracking-wider uppercase text-center block drop-shadow-sm ${titleColorClass}`}
              style={{
                fontSize: `${catTitleSize}px`,
                letterSpacing: `${letterSpacing}em`,
                whiteSpace: noWrap ? 'nowrap' : 'normal',
                lineHeight: 1.15,
              }}
            />
          </div>
        ) : (
          /* Pill / Outline / Gold Badge Style: Box wraps tightly around content */
          <div
            className={`shadow-lg origin-center inline-flex items-center justify-center transition-all ${codePosition === 'right' ? 'flex-row-reverse' : 'flex-row'}`}
            style={{
              background: badgeBg,
              border: badgeBorder,
              borderRadius: `${pillRadius}px`,
              paddingLeft: `${pillPaddingLeft}px`,
              paddingRight: `${pillPaddingRight}px`,
              paddingTop: `${pillPaddingY}px`,
              paddingBottom: `${pillPaddingY}px`,
              gap: showCode ? `${Math.max(6, Math.round(Math.min(pillPaddingLeft, pillPaddingRight) * 0.65))}px` : '0px',
              maxWidth: '96%',
              boxSizing: 'border-box',
            }}
          >
            {showCode && (
              <EditableText
                value={category.code}
                onChange={(v) => onUpdateCategory(catIdx, 'code', v)}
                style={{
                  lineHeight: '1',
                  textAlign: 'center',
                  fontSize: `${Math.max(10, Math.round(codeSize * 0.6))}px`,
                  width: `${codeSize}px`,
                  height: `${codeSize}px`,
                  minWidth: `${codeSize}px`,
                  borderRadius: `${Math.max(2, pillRadius - 2)}px`,
                }}
                className="category-num-circle flex items-center justify-center m-0 shrink-0 select-none"
              />
            )}
            <EditableText
              value={category.title}
              onChange={(v) => onUpdateCategory(catIdx, 'title', v)}
              className={`font-cinzel font-bold uppercase inline-block text-center drop-shadow-sm ${titleColorClass}`}
              style={{
                fontSize: `${catTitleSize}px`,
                letterSpacing: `${letterSpacing}em`,
                whiteSpace: noWrap ? 'nowrap' : 'normal',
                lineHeight: 1.15,
              }}
            />
          </div>
        )}
      </div>

      {/* Optional Subtitle / Quote */}
      {category.subtitle && (
        <EditableText
          value={category.subtitle}
          onChange={(v) => onUpdateCategory(catIdx, 'subtitle', v)}
          className={`font-serif italic text-center block ${smartCatGap <= 10 ? 'mb-0.5' : 'mb-2'} px-4`}
          style={{
            fontSize: `${Math.max(10.5, catSubtitleSize)}px`,
            color: isCreme ? '#44443E' : '#e6cd85',        /* dark text on creme, bright gold on dark green */
            letterSpacing: '0.02em',
            opacity: 0.92,
          }}
        />
      )}

      {/* List of Dishes */}
      <div className={`flex flex-col ${smartCatGap <= 10 ? 'gap-0' : 'gap-0.5'}`}>
        {category.items.map((item, iIdx) => (
          <MenuItemRow
            key={iIdx}
            item={item}
            itemIdx={iIdx}
            catIdx={catIdx}
            pageIdx={pageIdx}
            pageSettings={pageSettings}
            onUpdateItem={onUpdateItem}
            smartGap={smartGap}
            smartDescSize={smartDescSize}
            smartItemTitleSize={smartItemTitleSize}
            smartPriceSize={smartPriceSize}
            smartAllergenSize={smartAllergenSize}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
