import React from 'react';
import { useMenu } from '../../../context/MenuContext';

const CalloutCardEditor = ({ pageIdx, page }) => {
  const { updatePageCallout } = useMenu();

  const callout = page?.bottomCallout;
  const hasCallout = !!callout;
  const isVisible = hasCallout && callout.show !== false;

  const toggleCallout = () => {
    if (!hasCallout) {
      updatePageCallout(pageIdx, 'show', true);
      updatePageCallout(pageIdx, 'badge', '✨ ALSAFI TIPP');
      updatePageCallout(pageIdx, 'text', 'أضف نصك هنا...');
      updatePageCallout(pageIdx, 'icon', '✨');
    } else {
      updatePageCallout(pageIdx, 'show', !isVisible);
    }
  };

  return (
    <div className="border border-brand-gold/25 rounded-xl overflow-hidden mt-2">
      {/* Header row */}
      <div className="flex items-center justify-between px-3 py-2.5 bg-black/50">
        <div className="flex items-center gap-2">
          <span className="text-base">💬</span>
          <div>
            <span className="text-[11px] font-bold text-white block">بطاقة الملاحظة السفلية</span>
            <span className="text-[9px] text-slate-400">
              {isVisible
                ? '✅ ظاهرة في هذه الصفحة'
                : '⛔ مخفية / غير مفعّلة لهذه الصفحة'}
            </span>
          </div>
        </div>

        {/* Toggle switch */}
        <button
          type="button"
          onClick={toggleCallout}
          className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
            isVisible ? 'bg-brand-gold' : 'bg-white/10 border border-white/20'
          }`}
          title={isVisible ? 'إخفاء البطاقة من هذه الصفحة' : 'إظهار البطاقة في هذه الصفحة'}
        >
          <span
            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${
              isVisible ? 'right-0.5' : 'left-0.5'
            }`}
          />
        </button>
      </div>

      {/* Editable fields — only when visible */}
      {isVisible && (
        <div className="px-3 pb-3 pt-2 space-y-2.5 bg-black/30">
          {/* Icon + Badge row */}
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-3">
              <label className="cms-label">الأيقونة</label>
              <input
                type="text"
                className="cms-input text-center text-lg"
                value={callout.icon || '✨'}
                onChange={(e) => updatePageCallout(pageIdx, 'icon', e.target.value)}
                maxLength={4}
                placeholder="✨"
              />
            </div>
            <div className="col-span-9">
              <label className="cms-label">عنوان البطاقة (Badge)</label>
              <input
                type="text"
                className="cms-input text-[11px] font-bold tracking-wider"
                dir="ltr"
                value={callout.badge || ''}
                onChange={(e) => updatePageCallout(pageIdx, 'badge', e.target.value)}
                placeholder="✨ ALSAFI TIPP"
              />
            </div>
          </div>

          {/* Body text */}
          <div>
            <label className="cms-label">نص البطاقة</label>
            <textarea
              className="cms-input text-[11px] h-16 resize-none leading-relaxed"
              dir="ltr"
              value={callout.text || ''}
              onChange={(e) => updatePageCallout(pageIdx, 'text', e.target.value)}
              placeholder="أدخل نص التوصية أو الملاحظة هنا..."
            />
          </div>

          {/* Block Style */}
          <div>
            <label className="cms-label block mb-1.5">شكل / تصميم الكتلة (Box Style)</label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'royal', label: '✨ ملكي متدرج' },
                { id: 'solid', label: '🟩 لون داكن' },
                { id: 'minimal', label: '📏 إطار خفيف' },
                { id: 'none', label: '🔤 نص فقط (بدون إطار)' },
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => updatePageCallout(pageIdx, 'style', st.id)}
                  className={`py-1.5 px-1 rounded-lg text-[10px] font-bold transition flex items-center justify-center text-center ${
                    (callout.style || 'royal') === st.id
                      ? 'bg-brand-gold text-black shadow-md'
                      : 'bg-black/60 text-slate-400 border border-white/10 hover:text-white'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Live preview */}
          <div className="flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/25 rounded-lg px-2.5 py-1.5">
            <span className="text-base shrink-0">{callout.icon || '✨'}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-bold text-brand-gold uppercase tracking-widest truncate">
                {callout.badge || '✨ ALSAFI TIPP'}
              </p>
              <p className="text-[9px] text-slate-300 truncate">
                {callout.text || '...'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalloutCardEditor;
