import React from 'react';
import { Plus, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';
import { useMenu } from '../../../context/MenuContext';

const CategoryItemEditor = ({ editPageIdx, editCatIdx, currentCat }) => {
  const { addItem, moveItem, deleteItem, updateItem, updateCategory, updateSetting, getEffectiveSettingsForPage } = useMenu();
  const pageScope = `page${editPageIdx + 1}`;
  const pageSettings = getEffectiveSettingsForPage ? getEffectiveSettingsForPage(editPageIdx) : {};

  return (
    <div className="space-y-3">
      {/* Section Header Fields (Title, Code, Subtitle) */}
      {currentCat && (
        <div className="bg-black/30 border border-white/10 rounded-xl p-2.5 space-y-2">
          <span className="text-[10.5px] font-bold text-brand-goldLight block">بيانات ونصوص عنوان القسم:</span>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-9">
              <label className="cms-label">عنوان القسم (Title)</label>
              <input
                type="text"
                className="cms-input font-bold"
                dir="ltr"
                value={currentCat.title || ''}
                onChange={(e) => updateCategory(editPageIdx, editCatIdx, 'title', e.target.value)}
                placeholder="VEGETARISCHE & VEGANE VORSPEISEN"
              />
            </div>
            <div className="col-span-3">
              <label className="cms-label">رقم القسم (#)</label>
              <input
                type="text"
                className="cms-input text-center font-bold text-brand-gold"
                dir="ltr"
                value={currentCat.code || ''}
                onChange={(e) => updateCategory(editPageIdx, editCatIdx, 'code', e.target.value)}
                placeholder="4"
              />
            </div>
          </div>
          <div>
            <label className="cms-label">النص الفرعي / الاقتباس (Subtitle)</label>
            <input
              type="text"
              className="cms-input text-[11px] italic text-[#e6cd85]"
              dir="ltr"
              value={currentCat.subtitle || ''}
              onChange={(e) => updateCategory(editPageIdx, editCatIdx, 'subtitle', e.target.value)}
              placeholder="„Ganz ohne Fleisch. Voller Geschmack.“"
            />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => addItem(editPageIdx, editCatIdx)}
        className="w-full py-2.5 bg-gradient-to-r from-brand-green to-brand-greenLight border border-brand-gold/60 rounded-lg text-brand-goldLight text-xs font-bold hover:brightness-110 transition flex items-center justify-center gap-1.5 shadow-md shadow-black/40 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        إضافة طبق جديد في هذا القسم
      </button>

      <div className="max-h-[52vh] overflow-y-auto pr-1 space-y-3">
        {currentCat?.items?.map((item, iIdx) => (
          <div key={iIdx} className="cms-item-card hover:border-brand-gold/30 transition">
            <div className="flex justify-between items-center mb-2.5 pb-2 border-b border-white/10">
              <span className="text-brand-goldLight font-bold text-xs" dir="ltr">
                {item.num ? `#${item.num}` : ''} {item.name.replace(/\s*(🌱|🥬|🌶️|🌶)+/g, '').trim().substring(0, 18)}
                {item.name.length > 18 ? '...' : ''}
              </span>
              
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="action-btn"
                  title="تحريك لأعلى"
                  onClick={() => moveItem(editPageIdx, editCatIdx, iIdx, -1)}
                  disabled={iIdx === 0}
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="action-btn"
                  title="تحريك لأسفل"
                  onClick={() => moveItem(editPageIdx, editCatIdx, iIdx, 1)}
                  disabled={iIdx === currentCat.items.length - 1}
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="action-btn delete"
                  title="حذف الطبق"
                  onClick={() => deleteItem(editPageIdx, editCatIdx, iIdx)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-6">
                <label className="cms-label">اسم الطبق</label>
                <input
                  type="text"
                  className="cms-input"
                  dir="ltr"
                  value={item.name}
                  onChange={(e) => updateItem(editPageIdx, editCatIdx, iIdx, 'name', e.target.value)}
                />
              </div>
              <div className="col-span-3">
                <label className="cms-label">السعر</label>
                <input
                  type="text"
                  className="cms-input text-center font-semibold text-brand-goldLight"
                  dir="ltr"
                  value={item.price || ''}
                  onChange={(e) => updateItem(editPageIdx, editCatIdx, iIdx, 'price', e.target.value)}
                />
              </div>
              <div className="col-span-3">
                <label className="cms-label">الرقم (#)</label>
                <input
                  type="text"
                  className="cms-input text-center font-bold text-brand-gold"
                  dir="ltr"
                  value={item.num || ''}
                  onChange={(e) => updateItem(editPageIdx, editCatIdx, iIdx, 'num', e.target.value)}
                />
              </div>
            </div>

            <div className="mt-2">
              <div className="flex items-center justify-between mb-0.5">
                <label className="cms-label m-0">الحساسية / Zusatzstoffe:</label>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] text-gray-400">حجم الخط:</span>
                  <input
                    type="number"
                    min="6"
                    max="18"
                    step="0.5"
                    className="w-12 bg-black border border-brand-gold/40 text-yellow-300 text-center text-[9px] font-mono font-bold rounded py-0.2"
                    value={pageSettings?.allergenSize !== undefined ? pageSettings.allergenSize : 8.5}
                    onChange={(e) => updateSetting(pageScope, 'allergenSize', parseFloat(e.target.value) || 8.5)}
                    title="تعديل حجم خط (Zusatzstoffe) في هذه الصفحة"
                  />
                  <span className="text-[8.5px] text-gray-400 font-mono">px</span>
                </div>
              </div>
              <input
                type="text"
                className="cms-input text-[11px]"
                dir="ltr"
                value={item.allergens || ''}
                onChange={(e) => updateItem(editPageIdx, editCatIdx, iIdx, 'allergens', e.target.value)}
                placeholder="Zusatzstoffe: 1, 3 أو Allergene: A, G"
              />
            </div>

            <div className="mt-2">
              <label className="cms-label">الوصف والمكونات</label>
              <textarea
                className="cms-input text-[11px] h-14 resize-none leading-relaxed"
                dir="ltr"
                value={item.desc || ''}
                onChange={(e) => updateItem(editPageIdx, editCatIdx, iIdx, 'desc', e.target.value)}
                placeholder="وصف الطبق باللغة الألمانية..."
              ></textarea>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryItemEditor;
