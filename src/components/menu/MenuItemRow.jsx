import React, { useState } from 'react';
import EditableText from '../common/EditableText';
import { Tag, Sparkles } from 'lucide-react';

export const MenuItemRow = ({
  item,
  itemIdx,
  catIdx,
  pageIdx,
  pageSettings,
  onUpdateItem,
  smartGap = 8,
  smartDescSize = 10,
  smartItemTitleSize,
  smartPriceSize,
  smartAllergenSize,
}) => {
  const p = pageSettings;
  const hasDesc = item.desc && item.desc.trim() !== '';
  const [showBadgeMenu, setShowBadgeMenu] = useState(false);

  const effectiveTitleSize = smartItemTitleSize || p.itemTitleSize || 14;
  const effectivePriceSize = smartPriceSize || p.priceSize || 13.5;
  const effectiveDescSize = smartDescSize || p.descSize || 10;
  const effectiveAllergenSize = smartAllergenSize || p.allergenSize || Math.max(7, effectiveDescSize - 1.5);
  const effectiveNumSize = p.itemNumSize || 12;

  const handleNameChange = (newName) => {
    // Preserve existing dietary emoji suffixes
    const iconsMatch = item.name.match(/ 🌱| 🥬| 🌶️🌶️| 🌶️/g);
    const iconStr = iconsMatch ? iconsMatch.join('') : '';
    onUpdateItem(catIdx, itemIdx, 'name', newName + iconStr);
  };

  const badgePresets = [
    '⭐ Bestseller',
    '👑 Chef Choice',
    '🔥 Beliebt',
    '✨ Haus-Spezial',
    '🥩 100% Halal',
    '🌱 100% Vegan',
  ];

  const blockStyle = p.itemBlockStyle || 'minimal';
  
  let containerClass = "relative flex items-start gap-3 transition px-2 group/row ";
  if (blockStyle === 'minimal') {
    containerClass += "border-b border-white/5 last:border-0 hover:bg-white/5";
  } else if (blockStyle === 'card') {
    containerClass += "bg-[#0e2719]/80 rounded-xl shadow-md border border-white/5 hover:bg-[#0e2719] mb-1.5 p-2";
  } else if (blockStyle === 'outline') {
    containerClass += "bg-black/30 border border-brand-gold/30 rounded-xl hover:bg-black/50 mb-1.5 p-2";
  }

  return (
    <div
      className={containerClass}
      style={{
        paddingTop: blockStyle === 'minimal' ? `${smartGap}px` : undefined,
        paddingBottom: blockStyle === 'minimal' ? `${smartGap}px` : undefined,
      }}
    >
      {/* Item Number */}
      {item.num !== undefined && item.num !== '' && (
        <div className="shrink-0">
          <EditableText
            value={item.num}
            onChange={(v) => onUpdateItem(catIdx, itemIdx, 'num', v)}
            style={{
              lineHeight: '1',
              textAlign: 'center',
              fontSize: `${effectiveNumSize}px`,
            }}
            className="item-number-badge shadow-md flex items-center justify-center m-0"
          />
        </div>
      )}

      {/* Main Content (Title, Dots, Price, Details) */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Row: Title -> Badges -> Dots -> Price */}
        <div className={`flex items-center justify-between w-full ${hasDesc ? 'min-h-[22px]' : 'min-h-[19px]'}`}>
          
          {/* Title & Badges */}
          <div className="flex items-center flex-wrap gap-1.5 shrink-0 max-w-[78%] py-0.2">
            <EditableText
              value={item.name.replace(/ 🌱| 🥬| 🌶️🌶️| 🌶️/g, '')}
              onChange={handleNameChange}
              className="font-bold text-white tracking-wide block"
              style={{ fontSize: `${effectiveTitleSize}px`, lineHeight: 1.1 }}
            />

            {/* Inline Allergen / Additive badge for compact rows without descriptions (e.g. Drinks) */}
            {!hasDesc && p.showDishAllergens !== false && item.allergens && item.allergens.trim() !== '' && (
              <span className="text-brand-gold/70 text-[8px] font-medium tracking-tight translate-y-[0.5px]">
                ({item.allergens.replace(/Zusatzstoffe:\s*/g, 'Z: ').replace(/Allergene:\s*/g, 'A: ')})
              </span>
            )}

            {/* Featured Dish Badge */}
            {item.badge && item.badge.trim() !== '' && (
              <span className="inline-flex items-center gap-0.5 bg-gradient-to-r from-brand-gold/30 via-yellow-600/30 to-brand-gold/30 border border-brand-gold/70 text-brand-goldLight text-[8.5px] font-bold px-1.5 py-0.2 rounded-full shadow-sm tracking-wider uppercase translate-y-[1px]">
                <EditableText
                  value={item.badge}
                  onChange={(v) => onUpdateItem(catIdx, itemIdx, 'badge', v)}
                  className="block"
                />
              </span>
            )}

            {/* Quick Badge Add Button */}
            <div className="relative no-print opacity-0 group-hover/row:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => setShowBadgeMenu(!showBadgeMenu)}
                className="p-0.5 text-brand-gold/70 hover:text-brand-gold hover:bg-black/80 rounded text-[9px] flex items-center gap-0.5"
              >
                <Tag className="w-2.5 h-2.5" />
              </button>

              {showBadgeMenu && (
                <div className="absolute top-full mt-1 left-0 bg-[#0a0f0c] border border-brand-gold/60 rounded-lg p-1.5 shadow-2xl z-50 w-36 text-right space-y-1">
                  <div className="text-[9px] text-brand-gold font-bold border-b border-white/10 pb-0.5 mb-1">
                    اختر شارة التميز:
                  </div>
                  {badgePresets.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => {
                        onUpdateItem(catIdx, itemIdx, 'badge', b);
                        setShowBadgeMenu(false);
                      }}
                      className="w-full text-right px-2 py-0.5 rounded text-[9.5px] hover:bg-brand-gold hover:text-black text-brand-goldLight transition block font-bold"
                    >
                      {b}
                    </button>
                  ))}
                  {item.badge && (
                    <button
                      type="button"
                      onClick={() => {
                        onUpdateItem(catIdx, itemIdx, 'badge', '');
                        setShowBadgeMenu(false);
                      }}
                      className="w-full text-right px-2 py-0.5 rounded text-[9px] hover:bg-red-600 text-red-400 hover:text-white transition block border-t border-white/10 mt-1"
                    >
                      إزالة الشارة
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Dietary Badges */}
            {item.name.includes('🌱') && <span className="text-brand-accent text-[11px] ml-1">🌱</span>}
            {item.name.includes('🥬') && <span className="text-green-500 text-[11px] ml-1">🥬</span>}
            {item.name.includes('🌶️🌶️') ? (
              <span className="text-red-600 text-[11px] ml-1 font-bold">🌶️🌶️</span>
            ) : (
              item.name.includes('🌶️') && <span className="text-red-500 text-[11px] ml-1">🌶️</span>
            )}
          </div>

          {/* Dotted Leader Line */}
          {item.price && <div className="flex-1 border-b-[2px] border-dotted border-brand-gold/30 mx-3 translate-y-[4px]"></div>}

          {/* Price */}
          {item.price && (
            <div className="shrink-0 flex items-center justify-end">
              <EditableText
                value={item.price}
                onChange={(v) => onUpdateItem(catIdx, itemIdx, 'price', v)}
                className="price-badge-pill block origin-right"
                style={{ fontSize: `${effectivePriceSize}px` }}
              />
            </div>
          )}
        </div>

        {/* Details (Allergens & Description for items with description) */}
        {hasDesc && (
          <div className="flex flex-col mt-0.5 pr-1">
            {p.showDishAllergens !== false && item.allergens && (
              <EditableText
                value={item.allergens}
                onChange={(v) => onUpdateItem(catIdx, itemIdx, 'allergens', v)}
                className="block text-brand-gold/70 font-medium leading-none mb-0.5"
                style={{ fontSize: `${effectiveAllergenSize}px` }}
              />
            )}
            <EditableText
              value={item.desc}
              onChange={(v) => onUpdateItem(catIdx, itemIdx, 'desc', v)}
              className="text-gray-200 font-medium block pr-0.5 leading-[1.3]"
              style={{ fontSize: `${effectiveDescSize}px` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItemRow;
