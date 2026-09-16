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

  const effectiveTitleSize = Math.max(12, smartItemTitleSize || p.itemTitleSize || 14);
  const effectivePriceSize = Math.max(12, smartPriceSize || p.priceSize || 13.5);
  const effectiveDescSize = Math.max(8.5, smartDescSize || p.descSize || 10);
  const effectiveAllergenSize = smartAllergenSize || (p.allergenSize !== undefined ? Number(p.allergenSize) : Math.max(7, effectiveDescSize - 1.5));
  const effectiveNumSize = p.itemNumSize || 15;

  const handleNameChange = (newName) => {
    // Preserve existing dietary emoji suffixes
    const iconsMatch = item.name.match(/(🌱|🥬|🌶️🌶️|🌶️|🌶)/g);
    const iconStr = iconsMatch ? ' ' + iconsMatch.join('') : '';
    onUpdateItem(catIdx, itemIdx, 'name', newName.replace(/\s*(🌱|🥬|🌶️|🌶)+/g, '').trim() + iconStr);
  };

  const badgePresets = [
    '⭐ Bestseller',
    '👑 Chef Choice',
    '🔥 Beliebt',
    '✨ Haus-Spezial',
    '🥩 100% Halal',
    '🌱 100% Vegan',
  ];

  const isCreme = !p.bgStyle || p.bgStyle === 'creme-luxury';
  const blockStyle = p.itemBlockStyle || 'minimal';
  
  let containerClass = "relative flex items-start gap-3 transition px-2 group/row ";
  if (blockStyle === 'minimal') {
    containerClass += isCreme 
      ? "border-b border-black/5 last:border-0 hover:bg-black/5" 
      : "border-b border-white/5 last:border-0 hover:bg-white/5";
  } else if (blockStyle === 'card') {
    containerClass += isCreme
      ? "bg-[#F2EBD8]/70 rounded-xl shadow-sm border border-[#0F3B2E]/10 hover:bg-[#EDE5D0] mb-1.5 p-2"
      : "bg-[#0e2719]/80 rounded-xl shadow-md border border-white/5 hover:bg-[#0e2719] mb-1.5 p-2";
  } else if (blockStyle === 'outline') {
    containerClass += isCreme
      ? "bg-[#F2EBD8]/50 border border-[#B88A2A]/40 rounded-xl hover:bg-[#EDE5D0]/70 mb-1.5 p-2"
      : "bg-black/30 border border-brand-gold/30 rounded-xl hover:bg-black/50 mb-1.5 p-2";
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
          <div className="flex items-center flex-nowrap gap-1.5 shrink-0 max-w-[82%] py-0.2">
            <EditableText
              value={item.name.replace(/\s*(🌱|🥬|🌶️|🌶)+/g, '').trim()}
              onChange={handleNameChange}
              className={`font-bold tracking-wide block whitespace-nowrap ${isCreme ? 'text-[#0F3B2E] drop-shadow-none' : 'text-white drop-shadow-md'}`}
              style={{ fontSize: `${effectiveTitleSize}px`, lineHeight: 1.1, fontFamily: 'Outfit, sans-serif', wordBreak: 'keep-all', whiteSpace: 'nowrap' }}
            />

            {/* Inline Allergen / Additive badge for compact rows without descriptions (e.g. Drinks, Beilagen) */}
            {!hasDesc && p.showDishAllergens !== false && item.allergens && item.allergens.trim() !== '' && (
              <span
                className={`${isCreme ? 'text-[#334235]' : 'text-brand-goldLight/90'} font-medium tracking-tight shrink-0 whitespace-nowrap translate-y-[0.5px]`}
                style={{
                  fontSize: `${effectiveAllergenSize}px`,
                  color: p.allergenColor || undefined,
                }}
              >
                (
                <EditableText
                  value={item.allergens}
                  onChange={(v) => onUpdateItem(catIdx, itemIdx, 'allergens', v)}
                />
                )
              </span>
            )}

            {/* Featured Dish Badge */}
            {item.badge && item.badge.trim() !== '' && (
              <span className="inline-flex items-center gap-0.5 bg-gradient-to-r from-brand-accent/30 via-green-600/30 to-brand-accent/30 border border-brand-accent/70 text-brand-goldLight text-[8.5px] font-bold px-1.5 py-0.5 rounded-full shadow-sm tracking-wider uppercase shrink-0 whitespace-nowrap translate-y-[1px]">
                <EditableText
                  value={item.badge}
                  onChange={(v) => onUpdateItem(catIdx, itemIdx, 'badge', v)}
                  className="inline-block whitespace-nowrap"
                  style={{ wordBreak: 'keep-all', whiteSpace: 'nowrap' }}
                />
              </span>
            )}

            {/* Quick Badge Add Button */}
            <div className="relative no-print opacity-0 group-hover/row:opacity-100 transition-opacity shrink-0">
              <button
                type="button"
                onClick={() => setShowBadgeMenu(!showBadgeMenu)}
                className="p-0.5 text-brand-gold/70 hover:text-brand-gold hover:bg-black/80 rounded text-[9px] flex items-center gap-0.5"
              >
                <Tag className="w-2.5 h-2.5" />
              </button>

              {showBadgeMenu && (
                <div className="absolute top-full mt-1 left-0 bg-[#0a1610] border border-brand-gold/60 rounded-lg p-1.5 shadow-2xl z-50 w-36 text-right space-y-1">
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
            {item.name.includes('🌱') && <span className="text-[#8DBB3E] text-[11px] ml-1 shrink-0 whitespace-nowrap">🌱</span>}
            {item.name.includes('🥬') && <span className="text-[#0F3B2E] text-[11px] ml-1 shrink-0 whitespace-nowrap">🥬</span>}
            {item.name.includes('🌶️🌶️') ? (
              <span className="text-red-600 text-[11px] ml-1 font-bold shrink-0 whitespace-nowrap">🌶️🌶️</span>
            ) : (
              item.name.includes('🌶️') && <span className="text-red-500 text-[11px] ml-1 shrink-0 whitespace-nowrap">🌶️</span>
            )}
          </div>

          {/* Elegant Leader Line */}
          {item.price && (
            <div className={`flex-1 min-w-[8px] border-b border-dashed ${isCreme ? 'border-[#44443E]/25' : 'border-brand-gold/40'} mx-2.5 translate-y-[4px]`}></div>
          )}

          {/* Price */}
          {item.price && (
            <div className="shrink-0 flex items-center justify-end">
              <EditableText
                value={item.price}
                onChange={(v) => onUpdateItem(catIdx, itemIdx, 'price', v)}
                className={`price-badge-pill block origin-right font-bold ${isCreme ? 'text-[#0F3B2E]' : 'text-transparent bg-clip-text bg-gradient-to-r from-[#C2F280] via-[#A6E247] to-[#8DC63F]'}`}
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
                className={`block ${isCreme ? 'text-[#334235]' : 'text-brand-goldLight/90'} font-medium leading-none mb-0.5`}
                style={{
                  fontSize: `${effectiveAllergenSize}px`,
                  color: p.allergenColor || undefined,
                }}
              />
            )}
            <EditableText
              value={item.desc}
              onChange={(v) => onUpdateItem(catIdx, itemIdx, 'desc', v)}
              className={`${isCreme ? 'text-[#44443E]' : 'text-[#a8b5b0]'} font-normal block pr-0.5 leading-[1.4] tracking-wide`}
              style={{ fontSize: `${effectiveDescSize}px`, fontFamily: 'Inter, sans-serif' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItemRow;
