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

  const isCompact = smartCatGap <= 10;

  return (
    <div style={{ marginBottom: `${smartCatGap}px` }} className="relative z-10">
      <div className={`flex flex-col items-center gap-1.5 ${isCompact ? 'mb-1 mt-1' : 'mb-3 mt-3'}`}>
        
        {/* Elegant Top Divider (Art Deco) */}
        <div className="flex items-center justify-center w-full max-w-[200px] mb-1 opacity-80">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"></div>
          <div className="w-1.5 h-1.5 rotate-45 bg-brand-gold mx-2"></div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"></div>
        </div>

        <div className="flex items-center gap-3">
          {category.code && (
            <EditableText
              value={category.code}
              onChange={(v) => onUpdateCategory(catIdx, 'code', v)}
              style={{
                lineHeight: '1',
                textAlign: 'center',
                fontSize: `${Math.max(12, catTitleSize - 4)}px`,
              }}
              className="font-cinzel text-brand-gold font-bold bg-black/40 border border-brand-gold/30 rounded-full w-8 h-8 flex items-center justify-center shadow-inner"
            />
          )}
          <EditableText
            value={category.title}
            onChange={(v) => onUpdateCategory(catIdx, 'title', v)}
            className="font-cinzel font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#F3E5AB] tracking-[0.25em] uppercase text-center block drop-shadow-md"
            style={{ fontSize: `${catTitleSize}px` }}
          />
        </div>

        {/* Elegant Bottom Divider */}
        <div className="flex items-center justify-center w-full max-w-[120px] mt-0.5 opacity-60">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"></div>
        </div>
      </div>

      {/* Optional Subtitle / Quote */}
      {category.subtitle && (
        <EditableText
          value={category.subtitle}
          onChange={(v) => onUpdateCategory(catIdx, 'subtitle', v)}
          className={`font-serif italic text-center block ${isCompact ? 'mb-0.5' : 'mb-2'} px-4`}
          style={{
            fontSize: `${Math.max(10.5, catSubtitleSize)}px`,
            color: '#e6cd85',        /* bright gold — clearly readable on dark green */
            letterSpacing: '0.02em',
            opacity: 0.92,
          }}
        />
      )}

      {/* List of Dishes */}
      <div className={`flex flex-col ${isCompact ? 'gap-0' : 'gap-0.5'}`}>
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
