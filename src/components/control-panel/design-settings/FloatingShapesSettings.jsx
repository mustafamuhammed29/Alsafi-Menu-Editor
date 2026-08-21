import React, { useState } from 'react';
import { Sparkles, Trash2, Camera } from 'lucide-react';
import { useMenu } from '../../../context/MenuContext';
import { optimizeImageFile } from '../../../utils/imageOptimizer';

const EMOJI_CATEGORIES = [
  {
    name: '🥩 لحوم وأطباق',
    emojis: ['🥩', '🍖', '🍗', '🍔', '🍕', '🥙', '🧆', '🥘', '🍲', '🍛', '🍱', '🍤', '🌭', '🥪', '🍟', '🍳', '🥟'],
  },
  {
    name: '🥗 خضار ومقبلات',
    emojis: ['🥗', '🥑', '🥦', '🍅', '🌽', '🫒', '🍄', '🌱', '🌿', '🍋', '🌶️', '🧄', '🧅', '🥒', '🫑', '🧀', '🫓'],
  },
  {
    name: '🍰 حلويات ومشروبات',
    emojis: ['🍰', '🎂', '🧁', '🍨', '🍦', '🍩', '🥞', '☕', '🫖', '🥤', '🧃', '🍹', '🍧', '🍯', '🍫', '🍵', '🍮'],
  },
  {
    name: '👑 تميز وشارات ملكية',
    emojis: ['👑', '⭐', '🌟', '✨', '🔥', '🏆', '🥇', '🥈', '🥉', '💎', '🕌', '🌙', '🍽️', '🍴', '🏷️', '💫', '💖', '💯', '🎯', '⚡'],
  },
];

const ALSAFI_LOGO_PRESETS = [
  {
    type: 'alsafi',
    label: 'وسام الصافي الملكي',
    icon: '⚜️',
    badge: 'ALSAFI',
    subText: 'RESTAURANT',
    contentType: 'logo',
    size: 95,
  },
  {
    type: 'stamp',
    label: 'ختم الأصالة الصافي',
    icon: '👑',
    badge: 'ORIGINAL TASTE',
    subText: 'Seit 2020',
    contentType: 'logo',
    size: 95,
  },
  {
    type: 'octagon',
    label: 'مثمن الصافي الذهبي',
    icon: '❖',
    badge: 'CHEF SIGNATURE',
    subText: 'Al Safi Gourmet',
    contentType: 'logo',
    size: 95,
  },
  {
    type: 'shield',
    label: 'درع الصافي الشرفي',
    icon: '🛡️',
    badge: '100% HALAL',
    subText: 'Premium Quality',
    contentType: 'logo',
    size: 95,
  },
  {
    type: 'starBadge',
    label: 'نجمة الصافي الخاصة',
    icon: '🌟',
    badge: 'SPECIAL TASTE',
    subText: 'Alsafi Style',
    contentType: 'logo',
    size: 95,
  },
  {
    type: 'circle',
    label: 'دائرة الصافي المذهبة',
    icon: '⭕',
    badge: 'ALSAFI',
    subText: 'Gourmet Selection',
    contentType: 'logo',
    size: 95,
  },
];

const GEOMETRIC_SHAPE_PRESETS = [
  { type: 'free', label: 'صورة حرة بدون إطار', icon: '🖼️', badge: '', subText: '' },
  { type: 'octagon', label: 'مثمن أندلسي', icon: '❖', badge: '👑 CHEF TIPP', subText: 'Alsafi Style' },
  { type: 'circle', label: 'دائرة مذهبة', icon: '⭐', badge: '⭐ BESTSELLER', subText: 'Top Empfehlung' },
  { type: 'shield', label: 'درع ملكي', icon: '🥩', badge: '🥩 100% HALAL', subText: 'Beste Qualität' },
  { type: 'diamond', label: 'معين ذهبي', icon: '✨', badge: '✨ HAUS SPEZIAL', subText: 'Spezialität' },
  { type: 'hexagon', label: 'سداسي فاخر', icon: '🌱', badge: '🌱 100% VEGAN', subText: 'Frisch & Gesund' },
  { type: 'stamp', label: 'ختم شرقي', icon: '🔥', badge: '🔥 EXTRA SCHARF', subText: 'Spicy Delight' },
  { type: 'starBadge', label: 'نجمة ملكية', icon: '🌟', badge: '🌟 EMPFEHLUNG', subText: 'Gourmet' },
];

const DISH_EMOJI_PRESETS = [
  { type: 'shield', icon: '🥩', label: 'لحوم وشواء', badge: '100% HALAL', subText: 'Frisches Fleisch' },
  { type: 'circle', icon: '🍗', label: 'دجاج ومشاوي', badge: 'HAUS SPEZIAL', subText: 'Knusprig Zart' },
  { type: 'octagon', icon: '👑', label: 'توصية الشيف', badge: 'CHEF TIPP', subText: 'Empfehlung' },
  { type: 'circle', icon: '⭐', label: 'الأكثر طلباً', badge: 'BESTSELLER', subText: 'Kundenliebling' },
  { type: 'stamp', icon: '🔥', label: 'حار ولذيذ', badge: 'EXTRA SCHARF', subText: 'Spicy Hot' },
  { type: 'hexagon', icon: '🌱', label: 'نباتي وفيجن', badge: '100% VEGAN', subText: 'Frisch & Bio' },
  { type: 'circle', icon: '🍔', label: 'برجر فاخر', badge: 'GOURMET BURGER', subText: 'Premium Beef' },
  { type: 'circle', icon: '🍕', label: 'بيتزا ومعجنات', badge: 'STEINOFEN PIZZA', subText: 'Ofenfrisch' },
  { type: 'hexagon', icon: '🥗', label: 'سلطات ومقبلات', badge: 'FRISCHER SALAT', subText: 'Hausgemacht' },
  { type: 'octagon', icon: '🍰', label: 'حلويات شرقية', badge: 'DESSERT SPEZIAL', subText: 'Süße Verführung' },
  { type: 'diamond', icon: '☕', label: 'قهوة ومشروبات', badge: 'AROMATISCH', subText: 'Original Aroma' },
  { type: 'starBadge', icon: '🏆', label: 'جائزة التميز', badge: 'TOP QUALITÄT', subText: 'Auszeichnung' },
];

const SHAPE_TYPE_OPTIONS = [
  { id: 'free', label: '🖼️ صورة حرة (بدون قص)' },
  { id: 'octagon', label: '❖ مثمن أندلسي' },
  { id: 'circle', label: '⭕ دائرة مذهبة' },
  { id: 'shield', label: '🛡️ درع شرفي' },
  { id: 'diamond', label: '🔶 معين ذهبي' },
  { id: 'hexagon', label: '⬡ سداسي فاخر' },
  { id: 'stamp', label: '🏵️ ختم ملكي' },
  { id: 'alsafi', label: '⚜️ وسام الصافي' },
  { id: 'starBadge', label: '🌟 نجمة ملكية' },
];

const FloatingShapesSettings = () => {
  const { pages, addFloatingShape, deleteFloatingShape, updateFloatingShape } = useMenu();

  const [selectedShapePageIdx, setSelectedShapePageIdx] = useState(0);
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [activeShapeAddTab, setActiveShapeAddTab] = useState('logo');
  const [emojiCategoryTab, setEmojiCategoryTab] = useState(0);
  const [customEmojiInput, setCustomEmojiInput] = useState('');

  return (
    <div className="control-group bg-black/40 p-3 rounded-xl border border-white/5 space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
        <h3 className="text-xs font-bold text-brand-goldLight flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          الأشكال الهندسية، الإيموجي وشعار الصافي العائم
        </h3>
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById(pages[selectedShapePageIdx]?.id || 'page1');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          className="px-2 py-0.5 bg-brand-gold/20 hover:bg-brand-gold text-brand-goldLight hover:text-black border border-brand-gold/40 rounded text-[10px] font-bold transition flex items-center gap-1"
        >
          <span>عرض صفحة {selectedShapePageIdx + 1} ↗</span>
        </button>
      </div>

      <p className="text-[10px] text-slate-400 leading-relaxed">
        أضف شارات ملكية، شعار الصافي، إيموجيات الأطباق، أو أشكالاً هندسية فاخرة لوضع صور الأطباق المميزة في أي مكان فارغ بالصفحة مع إمكانية السحب والتحكم الكامل.
      </p>

      {/* Page Selector for Adding Shapes */}
      <div>
        <label className="text-[10px] text-gray-400 font-semibold block mb-1">
          اختر الصفحة المراد إضافة العنصر إليها:
        </label>
        <select
          className="cms-input text-xs py-1 font-medium bg-black/80"
          value={selectedShapePageIdx}
          onChange={(e) => {
            setSelectedShapePageIdx(Number(e.target.value));
            setSelectedShapeId(null);
          }}
        >
          {pages.map((p, idx) => (
            <option key={p.id} value={idx}>
              صفحة {p.pageNumber} · {p.header?.title ? p.header.title.split('\n')[0] : `صفحة ${idx + 1}`}
            </option>
          ))}
        </select>
      </div>

      {/* Category Tabs for Adding Shapes / Logos / Emojis */}
      <div className="pt-1">
        <label className="text-[10.5px] text-gray-300 font-semibold block mb-1.5">
          اختر نوع العنصر المراد إضافته بضغطة زر:
        </label>
        <div className="grid grid-cols-4 gap-1 p-1 bg-black/60 rounded-lg border border-white/10 mb-2">
          {[
            { id: 'logo', label: '⚜️ لوجو الصافي' },
            { id: 'shapes', label: '🔷 أشكال هندسية' },
            { id: 'badges', label: '🥩 شارات أطباق' },
            { id: 'emojis', label: '😃 مكتبة الإيموجي' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveShapeAddTab(tab.id)}
              className={`py-1 px-1 rounded text-[10px] font-bold transition text-center truncate ${
                activeShapeAddTab === tab.id
                  ? 'bg-brand-gold text-black shadow-sm'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: ALSAFI LOGO PRESETS */}
        {activeShapeAddTab === 'logo' && (
          <div className="space-y-1.5">
            <div className="grid grid-cols-3 gap-1.5">
              {ALSAFI_LOGO_PRESETS.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    addFloatingShape(selectedShapePageIdx, {
                      shapeType: s.type,
                      contentType: 'logo',
                      posX: 75,
                      posY: 70,
                      size: s.size || 95,
                      icon: s.icon,
                      badgeText: s.badge,
                      subText: s.subText,
                      borderColor: '#c9aa58',
                    });
                  }}
                  className="p-2 rounded-lg text-[9.5px] font-bold bg-[#14261b] hover:bg-brand-gold hover:text-black border border-brand-gold/50 text-brand-goldLight transition flex flex-col items-center justify-center gap-1 shadow-sm active:scale-95 text-center group"
                >
                  <div className="w-8 h-8 rounded-full bg-black/60 border border-brand-gold/40 flex items-center justify-center font-cinzel text-xs text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition">
                    {s.icon}
                  </div>
                  <span className="font-semibold leading-tight">{s.label}</span>
                  <span className="text-[8px] opacity-75 font-cinzel font-normal">{s.badge}</span>
                </button>
              ))}
            </div>
            <p className="text-[9.5px] text-brand-accent/90 text-center">
              ✨ يعرض هذا الخيار شعار الصافي مع إطار ملكي مذهب ونصوص تشريفية فاخرة.
            </p>
          </div>
        )}

        {/* TAB 2: GEOMETRIC SHAPES */}
        {activeShapeAddTab === 'shapes' && (
          <div className="grid grid-cols-3 gap-1.5">
            {GEOMETRIC_SHAPE_PRESETS.map((s) => (
              <button
                key={s.type}
                type="button"
                onClick={() => {
                  addFloatingShape(selectedShapePageIdx, {
                    shapeType: s.type,
                    contentType: 'icon',
                    posX: 75,
                    posY: 70,
                    size: 95,
                    icon: s.icon,
                    badgeText: s.badge,
                    subText: s.subText || 'Alsafi Style',
                    borderColor: '#c9aa58',
                  });
                }}
                className="py-2 px-1.5 rounded-lg text-[10px] font-bold bg-[#122318] hover:bg-brand-gold hover:text-black border border-brand-gold/40 text-brand-goldLight transition flex flex-col items-center justify-center gap-0.5 shadow-sm active:scale-95 text-center"
              >
                <span className="text-sm">{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* TAB 3: DISH EMOJI PRESETS */}
        {activeShapeAddTab === 'badges' && (
          <div className="grid grid-cols-3 gap-1.5">
            {DISH_EMOJI_PRESETS.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  addFloatingShape(selectedShapePageIdx, {
                    shapeType: s.type,
                    contentType: 'icon',
                    posX: 75,
                    posY: 70,
                    size: 95,
                    icon: s.icon,
                    badgeText: s.badge,
                    subText: s.subText,
                    borderColor: '#c9aa58',
                  });
                }}
                className="p-1.5 rounded-lg text-[9.5px] font-bold bg-[#102016] hover:bg-brand-gold hover:text-black border border-brand-gold/30 text-slate-200 hover:text-black transition flex flex-col items-center justify-center gap-0.5 shadow-sm active:scale-95 text-center group"
              >
                <span className="text-base">{s.icon}</span>
                <span className="font-semibold">{s.label}</span>
                <span className="text-[8px] text-brand-goldLight group-hover:text-black/80 font-cinzel">{s.badge}</span>
              </button>
            ))}
          </div>
        )}

        {/* TAB 4: COMPREHENSIVE EMOJI LIBRARY */}
        {activeShapeAddTab === 'emojis' && (
          <div className="space-y-2 bg-black/60 p-2.5 rounded-xl border border-white/10">
            {/* Category subtabs */}
            <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar">
              {EMOJI_CATEGORIES.map((cat, cIdx) => (
                <button
                  key={cIdx}
                  type="button"
                  onClick={() => setEmojiCategoryTab(cIdx)}
                  className={`px-2 py-1 rounded text-[9.5px] font-semibold whitespace-nowrap transition ${
                    emojiCategoryTab === cIdx
                      ? 'bg-brand-gold/30 border border-brand-gold text-brand-goldLight'
                      : 'bg-white/5 text-gray-400 hover:text-white border border-transparent'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Emoji Grid */}
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-1 p-1 bg-black/40 rounded-lg border border-white/5 max-h-36 overflow-y-auto">
              {EMOJI_CATEGORIES[emojiCategoryTab]?.emojis.map((emoji, eIdx) => (
                <button
                  key={eIdx}
                  type="button"
                  onClick={() => {
                    addFloatingShape(selectedShapePageIdx, {
                      shapeType: 'circle',
                      contentType: 'icon',
                      posX: 75,
                      posY: 70,
                      size: 90,
                      icon: emoji,
                      badgeText: '',
                      subText: '',
                      borderColor: '#c9aa58',
                    });
                  }}
                  className="p-1.5 rounded-lg text-lg hover:bg-brand-gold/30 hover:scale-110 active:scale-95 transition flex items-center justify-center cursor-pointer"
                  title={`إضافة إيموجي ${emoji} كعنصر عائم`}
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Custom Emoji Input */}
            <div className="flex items-center gap-1.5 pt-1">
              <input
                type="text"
                placeholder="أو اكتب أي إيموجي مخصص هنا..."
                value={customEmojiInput}
                onChange={(e) => setCustomEmojiInput(e.target.value)}
                className="cms-input text-xs py-1 flex-1"
              />
              <button
                type="button"
                disabled={!customEmojiInput.trim()}
                onClick={() => {
                  if (customEmojiInput.trim()) {
                    addFloatingShape(selectedShapePageIdx, {
                      shapeType: 'circle',
                      contentType: 'icon',
                      posX: 75,
                      posY: 70,
                      size: 90,
                      icon: customEmojiInput.trim(),
                      badgeText: '',
                      subText: '',
                      borderColor: '#c9aa58',
                    });
                    setCustomEmojiInput('');
                  }
                }}
                className="px-2.5 py-1 bg-brand-gold hover:bg-brand-goldLight text-black rounded text-[10.5px] font-bold transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                + إضافة
              </button>
            </div>
          </div>
        )}
      </div>

      {/* List of Existing Floating Shapes on this Page */}
      {(() => {
        const activePage = pages[selectedShapePageIdx] || pages[0];
        const activeShapes = activePage?.floatingShapes || [];

        if (activeShapes.length === 0) {
          return (
            <div className="bg-black/30 p-2.5 rounded-lg border border-dashed border-white/10 text-center text-[10px] text-gray-500">
              لا توجد أشكال أو شارات مضافة في صفحة {selectedShapePageIdx + 1} حالياً. اختر من المعرض أعلاه لإضافتها فوراً!
            </div>
          );
        }

        return (
          <div className="space-y-3 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-brand-gold font-bold">
                العناصر والشارات المضافة في هذه الصفحة ({activeShapes.length}):
              </span>
              <span className="text-[9.5px] text-gray-400">يمكنك سحب الشكل بالماوس في الصفحة مباشرة</span>
            </div>

            {activeShapes.map((shape, sIdx) => {
              const isSelected = selectedShapeId === shape.id || (selectedShapeId === null && sIdx === 0);
              const isLogo = shape.contentType === 'logo' || shape.shapeType === 'alsafi' || shape.isLogo;

              return (
                <div
                  key={shape.id}
                  className={`bg-black/70 p-3 rounded-xl border transition-all space-y-2.5 ${
                    isSelected
                      ? 'border-brand-gold shadow-md'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                    <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setSelectedShapeId(shape.id)}>
                      <span className="text-base">{isLogo ? '⚜️' : shape.icon || '✨'}</span>
                      <span className="text-xs font-bold text-white">
                        شكل {sIdx + 1}: {isLogo ? 'شعار الصافي' : shape.shapeType} ({shape.badgeText || shape.icon || 'بدون نص'})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteFloatingShape(selectedShapePageIdx, shape.id)}
                      className="text-red-400 hover:text-red-200 text-[10px] font-bold p-1 rounded hover:bg-red-500/20 transition flex items-center gap-1"
                      title="حذف هذا العنصر"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>حذف</span>
                    </button>
                  </div>

                  {/* Shape Controls */}
                  <div className="space-y-2.5">
                    {/* Content Type Selector: Logo vs Emoji/Icon vs Dish Image */}
                    <div>
                      <label className="text-[9.5px] text-gray-400 block mb-1">نوع المحتوى داخل الشكل:</label>
                      <div className="grid grid-cols-3 gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateFloatingShape(selectedShapePageIdx, shape.id, {
                              contentType: 'logo',
                              image: '',
                            })
                          }
                          className={`py-1 px-1 rounded text-[10px] font-bold transition text-center flex items-center justify-center gap-1 ${
                            isLogo
                              ? 'bg-brand-gold text-black'
                              : 'bg-white/5 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <span>⚜️</span>
                          <span>شعار الصافي</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updateFloatingShape(selectedShapePageIdx, shape.id, {
                              contentType: 'icon',
                              image: '',
                            })
                          }
                          className={`py-1 px-1 rounded text-[10px] font-bold transition text-center flex items-center justify-center gap-1 ${
                            !isLogo && !shape.image
                              ? 'bg-brand-gold text-black'
                              : 'bg-white/5 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <span>😃</span>
                          <span>إيموجي / أيقونة</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updateFloatingShape(selectedShapePageIdx, shape.id, {
                              contentType: 'image',
                            })
                          }
                          className={`py-1 px-1 rounded text-[10px] font-bold transition text-center flex items-center justify-center gap-1 ${
                            shape.image
                              ? 'bg-brand-gold text-black'
                              : 'bg-white/5 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <span>📷</span>
                          <span>صورة طبق</span>
                        </button>
                      </div>
                    </div>

                    {/* If Content Type is Emoji / Icon: Quick Emoji Changer */}
                    {!isLogo && !shape.image && (
                      <div>
                        <div className="control-label mb-1">
                          <span className="text-[10px] text-gray-300">اختر إيموجي للشكل:</span>
                          <span className="font-mono text-brand-gold text-sm">{shape.icon || '✨'}</span>
                        </div>
                        <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar bg-black/40 p-1 rounded-lg border border-white/5">
                          {['🥩', '🍗', '🍔', '🍕', '🥗', '🍰', '☕', '👑', '⭐', '✨', '🔥', '🌱', '🏆', '💎', '🕌', '🏷️', '🍽️', '🌶️'].map((em) => (
                            <button
                              key={em}
                              type="button"
                              onClick={() =>
                                updateFloatingShape(selectedShapePageIdx, shape.id, {
                                  icon: em,
                                })
                              }
                              className={`p-1 text-base rounded hover:bg-brand-gold/30 transition shrink-0 ${
                                shape.icon === em ? 'bg-brand-gold/40 ring-1 ring-brand-gold' : ''
                              }`}
                            >
                              {em}
                            </button>
                          ))}
                        </div>
                        <div className="mt-1 flex items-center gap-1">
                          <span className="text-[9.5px] text-gray-400">إيموجي أو رمز مخصص:</span>
                          <input
                            type="text"
                            className="cms-input text-xs py-0.5 px-2 w-20 text-center"
                            value={shape.icon || ''}
                            onChange={(e) =>
                              updateFloatingShape(selectedShapePageIdx, shape.id, {
                                icon: e.target.value,
                              })
                            }
                            placeholder="✨"
                          />
                        </div>
                      </div>
                    )}

                    {/* Geometry Selector */}
                    <div>
                      <label className="text-[9.5px] text-gray-400 block mb-1">الإطار والشكل الهندسي:</label>
                      <div className="grid grid-cols-4 gap-1">
                        {SHAPE_TYPE_OPTIONS.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() =>
                              updateFloatingShape(selectedShapePageIdx, shape.id, {
                                shapeType: opt.id,
                              })
                            }
                            className={`py-1 px-1 rounded text-[9.5px] font-medium transition text-center truncate ${
                              (shape.shapeType || 'octagon') === opt.id
                                ? 'bg-brand-gold/30 text-brand-goldLight border border-brand-gold'
                                : 'bg-black/40 text-gray-400 hover:text-white border border-white/5'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Size Slider */}
                    <div>
                      <div className="control-label">
                        <span className="text-[10px] text-gray-300">🔍 حجم الشكل (Size):</span>
                        <span className="font-mono text-brand-gold text-[10px]">{shape.size || 90}px</span>
                      </div>
                      <input
                        type="range"
                        min="45"
                        max="220"
                        step="5"
                        className="control-slider"
                        value={shape.size || 90}
                        onChange={(e) =>
                          updateFloatingShape(selectedShapePageIdx, shape.id, {
                            size: Number(e.target.value),
                          })
                        }
                      />
                    </div>

                    {/* Position X */}
                    <div>
                      <div className="control-label">
                        <span className="text-[10px] text-gray-300">↔️ الموضع الأفقي X (يسار / يمين):</span>
                        <span className="font-mono text-brand-gold text-[10px]">{Math.round(shape.posX || 50)}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="95"
                        step="1"
                        className="control-slider"
                        value={shape.posX || 50}
                        onChange={(e) =>
                          updateFloatingShape(selectedShapePageIdx, shape.id, {
                            posX: Number(e.target.value),
                          })
                        }
                      />
                    </div>

                    {/* Position Y */}
                    <div>
                      <div className="control-label">
                        <span className="text-[10px] text-gray-300">↕️ الموضع الرأسي Y (أعلى / أسفل):</span>
                        <span className="font-mono text-brand-gold text-[10px]">{Math.round(shape.posY || 50)}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="95"
                        step="1"
                        className="control-slider"
                        value={shape.posY || 50}
                        onChange={(e) =>
                          updateFloatingShape(selectedShapePageIdx, shape.id, {
                            posY: Number(e.target.value),
                          })
                        }
                      />
                    </div>

                    {/* Rotation */}
                    <div>
                      <div className="control-label">
                        <span className="text-[10px] text-gray-300">🔄 زاوية التدوير (Rotation):</span>
                        <span className="font-mono text-brand-gold text-[10px]">{shape.rotation || 0}°</span>
                      </div>
                      <input
                        type="range"
                        min="-180"
                        max="180"
                        step="5"
                        className="control-slider"
                        value={shape.rotation || 0}
                        onChange={(e) =>
                          updateFloatingShape(selectedShapePageIdx, shape.id, {
                            rotation: Number(e.target.value),
                          })
                        }
                      />
                    </div>

                    {/* Text inputs */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <label className="text-[9.5px] text-gray-400 block mb-0.5">النص الرئيسي (Badge):</label>
                        <input
                          type="text"
                          className="cms-input text-[10.5px] py-1"
                          value={shape.badgeText || ''}
                          onChange={(e) =>
                            updateFloatingShape(selectedShapePageIdx, shape.id, {
                              badgeText: e.target.value,
                            })
                          }
                          placeholder="مثال: 👑 CHEF TIPP"
                        />
                      </div>
                      <div>
                        <label className="text-[9.5px] text-gray-400 block mb-0.5">النص الفرعي (Subtext):</label>
                        <input
                          type="text"
                          className="cms-input text-[10.5px] py-1"
                          value={shape.subText || ''}
                          onChange={(e) =>
                            updateFloatingShape(selectedShapePageIdx, shape.id, {
                              subText: e.target.value,
                            })
                          }
                          placeholder="مثال: 100% Halal"
                        />
                      </div>
                    </div>

                    {/* Image upload inside shape */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[9.5px] text-gray-300">صورة داخل الشكل:</span>
                      <div className="flex items-center gap-1">
                        {shape.image && (
                          <button
                            type="button"
                            onClick={() =>
                              updateFloatingShape(selectedShapePageIdx, shape.id, {
                                image: '',
                                contentType: 'icon',
                              })
                            }
                            className="px-2 py-0.5 bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white rounded text-[9px] transition"
                          >
                            إزالة
                          </button>
                        )}
                        <label className="px-2.5 py-1 bg-brand-gold hover:bg-brand-goldLight text-black rounded text-[9.5px] font-bold cursor-pointer transition shadow-sm flex items-center gap-1">
                          <Camera className="w-3 h-3" />
                          <span>{shape.image ? 'تغيير صورة' : '📷 رفع صورة طبق'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (file) {
                                try {
                                  const opt = await optimizeImageFile(file, 800, 800, 0.95);
                                  updateFloatingShape(selectedShapePageIdx, shape.id, {
                                    image: opt,
                                    contentType: 'image',
                                  });
                                } catch {
                                  const r = new FileReader();
                                  r.onload = (ev) =>
                                    updateFloatingShape(selectedShapePageIdx, shape.id, {
                                      image: ev.target.result,
                                      contentType: 'image',
                                    });
                                  r.readAsDataURL(file);
                                }
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })()}
    </div>
  );
};

export default FloatingShapesSettings;
