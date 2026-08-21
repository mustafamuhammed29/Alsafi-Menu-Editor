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
    <div style={{ marginBottom: `${smartCatGap}px` }} className="relative">
      <div className={`flex flex-col items-center gap-1 ${isCompact ? 'mb-0.5 mt-0.5' : 'mb-2 mt-2'}`}>
        <div className="category-pill shadow-lg origin-center">
          <EditableText
            value={category.code}
            onChange={(v) => onUpdateCategory(catIdx, 'code', v)}
            style={{
              lineHeight: '1',
              textAlign: 'center',
              fontSize: `${Math.max(11, catTitleSize - 2)}px`,
            }}
            className="category-num-circle flex items-center justify-center m-0"
          />
          <EditableText
            value={category.title}
            onChange={(v) => onUpdateCategory(catIdx, 'title', v)}
            className="font-cinzel font-bold text-brand-goldLight tracking-[0.2em] uppercase pr-2 block"
            style={{ fontSize: `${catTitleSize}px` }}
          />
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
