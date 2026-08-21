import React, { useRef } from 'react';
import { Sparkles, Trash2, Upload } from 'lucide-react';
import { useMenu } from '../../../context/MenuContext';
import { optimizeImageFile } from '../../../utils/imageOptimizer';

const LogoSettings = ({ targetScope }) => {
  const { pages, globalSettings, pageOverrides, updateSetting } = useMenu();
  const fileInputRef = useRef(null);

  const currentSettings =
    targetScope === 'global'
      ? globalSettings
      : { ...globalSettings, ...(pageOverrides[targetScope] || {}) };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const optimized = await optimizeImageFile(file, 800, 800, 0.95);
        updateSetting(targetScope, 'logoImage', optimized);
        if (targetScope === 'global') {
          pages.forEach((_, i) => {
            const pageKey = `page${i + 1}`;
            if (pageOverrides[pageKey] && pageOverrides[pageKey].logoImage !== undefined) {
              updateSetting(pageKey, 'logoImage', optimized);
            }
          });
        }
      } catch {
        const reader = new FileReader();
        reader.onload = (event) => {
          updateSetting(targetScope, 'logoImage', event.target.result);
          if (targetScope === 'global') {
            pages.forEach((_, i) => {
              const pageKey = `page${i + 1}`;
              if (pageOverrides[pageKey] && pageOverrides[pageKey].logoImage !== undefined) {
                updateSetting(pageKey, 'logoImage', event.target.result);
              }
            });
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRemoveLogo = () => {
    updateSetting(targetScope, 'logoImage', '');
    if (targetScope === 'global') {
      pages.forEach((_, i) => {
        const pageKey = `page${i + 1}`;
        if (pageOverrides[pageKey] && pageOverrides[pageKey].logoImage !== undefined) {
          updateSetting(pageKey, 'logoImage', '');
        }
      });
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const hasCustomLogo =
    currentSettings.logoImage && currentSettings.logoImage.startsWith('data:image');

  return (
    <div className="control-group bg-black/40 p-3 rounded-xl border border-white/5">
      <label className="text-xs text-brand-goldLight mb-2 block font-bold flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          شعار المطعم (اللوجو)
        </span>
        {hasCustomLogo && (
          <span className="text-[10px] text-green-400 font-normal">
            ✓ تم التفعيل
          </span>
        )}
      </label>

      {/* Show Logo Toggles for All Pages */}
      <div className="mb-3 bg-black/60 p-2.5 rounded-lg border border-white/10">
        <label className="text-[11px] text-gray-200 font-bold mb-2 block">إظهار/إخفاء الشعار في صفحات محددة:</label>
        <div className="grid grid-cols-4 gap-1.5">
          {pages.map((p, idx) => {
            const pageKey = `page${idx + 1}`;
            const isShown = pageOverrides[pageKey]?.showLogo !== false;
            return (
              <button
                key={pageKey}
                type="button"
                onClick={() => updateSetting(pageKey, 'showLogo', !isShown)}
                className={`py-1 px-1 rounded text-[9px] font-bold transition text-center ${isShown ? 'bg-brand-gold/20 text-brand-goldLight border border-brand-gold/40' : 'bg-black/80 text-gray-500 border border-red-900/50 line-through'}`}
                title={`صفحة ${idx + 1}`}
              >
                صـ {idx + 1}
              </button>
            );
          })}
        </div>
        <p className="text-[9px] text-gray-400 mt-1.5">
          اضغط على رقم الصفحة لإخفاء الشعار منها (مفيد للصفحات المزدحمة بالأطباق).
        </p>
      </div>

      {hasCustomLogo ? (
        <div className="flex items-center gap-3 p-2 bg-black/60 border border-brand-gold/40 rounded-lg mb-2">
          <img
            src={currentSettings.logoImage}
            alt="Logo Preview"
            className="w-11 h-11 object-contain rounded-lg bg-black/80 p-1 border border-white/10"
          />
          <div className="flex-1">
            <span className="text-xs font-bold text-white block">شعار المطعم مفعّل</span>
            <button
              type="button"
              onClick={handleRemoveLogo}
              className="text-[10.5px] text-red-400 hover:text-red-200 transition flex items-center gap-1 mt-0.5"
            >
              <Trash2 className="w-3 h-3" />
              <span>حذف الشعار واسترجاع الحرف A</span>
            </button>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-2.5 py-1.5 bg-brand-gold/20 hover:bg-brand-gold hover:text-black border border-brand-gold/60 rounded text-[11px] font-bold text-brand-goldLight transition"
          >
            تغيير
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-2 bg-black/60 hover:bg-black/90 border border-brand-gold/50 hover:border-brand-gold rounded-lg text-xs text-brand-goldLight transition cursor-pointer flex items-center justify-center gap-2 shadow-inner"
        >
          <Upload className="w-4 h-4 text-brand-gold" />
          <span className="font-bold">رفع صورة الشعار (PNG/JPG)</span>
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onClick={(e) => {
          e.currentTarget.value = '';
        }}
        onChange={handleLogoUpload}
      />

      {/* Logo Size for Standard Menu Pages (1 - 12) */}
      <div className="mt-3 pt-2.5 border-t border-white/10">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[11px] text-gray-200 font-semibold flex items-center gap-1">
            <span>📄</span>
            <span>حجم الشعار في صفحات المنيو (1 - 12):</span>
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-brand-accent font-mono font-bold bg-brand-green/40 px-1.5 py-0.5 rounded border border-brand-accent/30">
              {Math.round(((currentSettings.logoSize || 36) / 36) * 100)}%
            </span>
            <span className="text-[11px] text-brand-gold font-mono font-bold">
              {currentSettings.logoSize || 36}px
            </span>
          </div>
        </div>

        <input
          type="range"
          min="15"
          max="220"
          step="1"
          className="control-slider"
          value={currentSettings.logoSize || 36}
          onChange={(e) => {
            const val = Number(e.target.value);
            updateSetting(targetScope, 'logoSize', val);
            if (targetScope === 'global') {
              pages.forEach((_, i) => {
                const pageKey = `page${i + 1}`;
                if (pageKey !== 'page13' && pageOverrides[pageKey] && pageOverrides[pageKey].logoSize !== undefined) {
                  updateSetting(pageKey, 'logoSize', val);
                }
              });
            }
          }}
        />

        {/* Quick Percentage Presets for Pages 1-12 */}
        <div className="flex items-center justify-between gap-1 mt-2 pt-1 border-t border-white/5">
          <span className="text-[9.5px] text-gray-400">نسب سريعة:</span>
          <div className="flex gap-1 flex-wrap">
            {[
              { label: '50%', size: 18 },
              { label: '100%', size: 36 },
              { label: '150%', size: 54 },
              { label: '200%', size: 72 },
              { label: '250%', size: 90 },
              { label: '350%', size: 126 },
              { label: '500%', size: 180 },
            ].map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  updateSetting(targetScope, 'logoSize', preset.size);
                  if (targetScope === 'global') {
                    pages.forEach((_, i) => {
                      const pageKey = `page${i + 1}`;
                      if (pageKey !== 'page13' && pageOverrides[pageKey] && pageOverrides[pageKey].logoSize !== undefined) {
                        updateSetting(pageKey, 'logoSize', preset.size);
                      }
                    });
                  }
                }}
                className={`px-1.5 py-0.5 rounded text-[9.5px] font-mono font-semibold transition ${
                  (currentSettings.logoSize || 36) === preset.size
                    ? 'bg-brand-gold text-black font-bold'
                    : 'bg-black/60 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Independent Separate Logo Size for Page 13 */}
      {(() => {
        const page13LogoVal =
          targetScope === 'page13'
            ? (pageOverrides['page13']?.page13LogoSize !== undefined
                ? pageOverrides['page13'].page13LogoSize
                : (globalSettings.page13LogoSize || 54))
            : (globalSettings.page13LogoSize || 54);

        return (
          <div className="mt-3.5 pt-3 border-t border-brand-gold/40 bg-gradient-to-b from-brand-gold/10 to-transparent p-2.5 rounded-xl border border-brand-gold/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11.5px] text-brand-gold font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span>حجم اللوجو في صفحة 13 (منفصل ومستقل):</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('page13');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="px-2 py-0.5 bg-brand-gold/20 hover:bg-brand-gold text-brand-goldLight hover:text-black border border-brand-gold/40 rounded text-[9.5px] font-bold transition flex items-center gap-1"
              >
                <span>عرض صفحة 13 ↗</span>
              </button>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-300 font-medium">القياس المخصص لصفحة المعلومات:</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-brand-accent font-mono font-bold bg-brand-green/40 px-1.5 py-0.5 rounded border border-brand-accent/30">
                  {Math.round((page13LogoVal / 54) * 100)}%
                </span>
                <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/40">
                  {page13LogoVal}px
                </span>
              </div>
            </div>

            <input
              type="range"
              min="20"
              max="300"
              step="2"
              className="control-slider"
              value={page13LogoVal}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (targetScope === 'page13') {
                  updateSetting('page13', 'page13LogoSize', val);
                } else {
                  updateSetting('global', 'page13LogoSize', val);
                  if (pageOverrides['page13']?.page13LogoSize !== undefined) {
                    updateSetting('page13', 'page13LogoSize', val);
                  }
                }
              }}
            />

            {/* Quick Presets for Page 13 Logo */}
            <div className="flex items-center justify-between gap-1 pt-1 border-t border-white/10">
              <span className="text-[9px] text-gray-400">نسب سريعة لصفحة 13:</span>
              <div className="flex gap-1 flex-wrap">
                {[
                  { label: '50%', size: 27 },
                  { label: '75%', size: 40 },
                  { label: '100%', size: 54 },
                  { label: '125%', size: 68 },
                  { label: '150%', size: 81 },
                  { label: '200%', size: 108 },
                  { label: '250%', size: 135 },
                  { label: '300%', size: 162 },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      if (targetScope === 'page13') {
                        updateSetting('page13', 'page13LogoSize', preset.size);
                      } else {
                        updateSetting('global', 'page13LogoSize', preset.size);
                        if (pageOverrides['page13']?.page13LogoSize !== undefined) {
                          updateSetting('page13', 'page13LogoSize', preset.size);
                        }
                      }
                    }}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold transition ${
                      page13LogoVal === preset.size
                        ? 'bg-brand-gold text-black font-bold'
                        : 'bg-black/60 hover:bg-white/10 text-slate-300 border border-white/10'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[9px] text-brand-goldLight/80 leading-relaxed">
              ⚡ تحكم مستقل: تكبير أو تصغير الشعار هنا يطبّق على صفحة 13 فقط دون تغيير حجم الشعار في صفحات المنيو (1 - 12).
            </p>
          </div>
        );
      })()}
    </div>
  );
};

export default LogoSettings;
