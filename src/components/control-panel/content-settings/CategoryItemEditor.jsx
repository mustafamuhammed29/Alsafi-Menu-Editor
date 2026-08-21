import React from 'react';
import { Plus, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';
import { useMenu } from '../../../context/MenuContext';

const CategoryItemEditor = ({ editPageIdx, editCatIdx, currentCat }) => {
  const { addItem, moveItem, deleteItem, updateItem } = useMenu();

  return (
    <div>
      <button
        type="button"
        onClick={() => addItem(editPageIdx, editCatIdx)}
        className="w-full py-2.5 mb-3 bg-gradient-to-r from-brand-green to-brand-greenLight border border-brand-gold/60 rounded-lg text-brand-goldLight text-xs font-bold hover:brightness-110 transition flex items-center justify-center gap-1.5 shadow-md shadow-black/40"
      >
        <Plus className="w-4 h-4" />
        إضافة طبق جديد في هذا القسم
      </button>

      <div className="max-h-[52vh] overflow-y-auto pr-1 space-y-3">
        {currentCat?.items?.map((item, iIdx) => (
          <div key={iIdx} className="cms-item-card hover:border-brand-gold/30 transition">
            <div className="flex justify-between items-center mb-2.5 pb-2 border-b border-white/10">
              <span className="text-brand-goldLight font-bold text-xs" dir="ltr">
                {item.num ? `#${item.num}` : ''} {item.name.replace(/ 🌱| 🥬| 🌶️🌶️| 🌶️/g, '').substring(0, 18)}
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
              <label className="cms-label">الحساسية / Zusatzstoffe</label>
              <input
                type="text"
                className="cms-input text-[11px]"
                dir="ltr"
                value={item.allergens || ''}
                onChange={(e) => updateItem(editPageIdx, editCatIdx, iIdx, 'allergens', e.target.value)}
                placeholder="Allergene: A, G, K"
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
