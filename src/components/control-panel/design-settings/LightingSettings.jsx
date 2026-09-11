import React from 'react';
import { Sun, Sparkles, Printer, RotateCcw, Sliders, Image as ImageIcon, Eye } from 'lucide-react';
import { useMenu } from '../../../context/MenuContext';

export const LightingSettings = ({ targetScope, setTargetScope }) => {
  const { globalSettings, pageOverrides, updateSetting, pages } = useMenu();

  const currentSettings =
    targetScope === 'global'
      ? globalSettings
      : { ...globalSettings, ...(pageOverrides[targetScope] || {}) };

  const pageBrightness = currentSettings.pageBrightness !== undefined ? currentSettings.pageBrightness : 100;
  const pageContrast = currentSettings.pageContrast !== undefined ? currentSettings.pageContrast : 100;
  const imageBrightness = currentSettings.imageBrightness !== undefined ? currentSettings.imageBrightness : 100;
  const imageContrast = currentSettings.imageContrast !== undefined ? currentSettings.imageContrast : 100;

  // 1-Click Print Presets
  const applyPreset = (mode) => {
    if (mode === 'screen') {
      updateSetting(targetScope, 'pageBrightness', 100);
      updateSetting(targetScope, 'pageContrast', 100);
      updateSetting(targetScope, 'imageBrightness', 100);
      updateSetting(targetScope, 'imageContrast', 100);
    } else if (mode === 'print-balanced') {
      updateSetting(targetScope, 'pageBrightness', 115);
      updateSetting(targetScope, 'pageContrast', 105);
      updateSetting(targetScope, 'imageBrightness', 125);
      updateSetting(targetScope, 'imageContrast', 105);
    } else if (mode === 'print-boost') {
      updateSetting(targetScope, 'pageBrightness', 125);
      updateSetting(targetScope, 'pageContrast', 108);
      updateSetting(targetScope, 'imageBrightness', 140);
      updateSetting(targetScope, 'imageContrast', 110);
    }
  };

  return (
    <div className="control-group bg-black/60 p-3.5 rounded-xl border border-brand-gold/40 shadow-xl space-y-3.5 animate-fade-in text-right" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brand-gold/30 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-gold/20 flex items-center justify-center text-brand-gold">
            <Sun className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-black text-white flex items-center gap-1.5">
              <span>💡 إضاءة الصفحات والصور للطباعة</span>
              <span className="text-[9.5px] text-yellow-400 font-normal">(Print Lighting Boost)</span>
            </h3>
            <p className="text-[9.5px] text-gray-300">
              رفع السطوع لتعويض امتصاص الورق والحبر ومنع قتامة الصور والواجهة عند الطباعة
            </p>
          </div>
        </div>

        {/* Scope Pill */}
        <span className="text-[10px] text-brand-gold font-bold bg-brand-gold/15 border border-brand-gold/40 px-2 py-0.5 rounded-full shrink-0">
          {targetScope === 'global' ? '🌐 عام (كل الصفحات)' : `📄 صفحة ${targetScope.replace('page', '')} فقط`}
        </span>
      </div>

      {/* Scope Selector (Optional Quick Switcher) */}
      {setTargetScope && (
        <div className="flex items-center justify-between bg-black/40 p-1.5 rounded-lg border border-white/10 text-xs">
          <span className="text-[10px] text-gray-300 font-semibold">تطبيق التعديل على:</span>
          <div className="flex items-center gap-1 overflow-x-auto max-w-[280px] scrollbar-none">
            <button
              type="button"
              onClick={() => setTargetScope('global')}
              className={`px-2 py-0.5 rounded text-[9.5px] font-bold transition shrink-0 ${
                targetScope === 'global'
                  ? 'bg-brand-gold text-black shadow'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              🌐 كل الصفحات
            </button>
            {pages.map((p, idx) => {
              const scopeKey = `page${idx + 1}`;
              const isSel = targetScope === scopeKey;
              return (
                <button
                  key={scopeKey}
                  type="button"
                  onClick={() => setTargetScope(scopeKey)}
                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition shrink-0 ${
                    isSel
                      ? 'bg-brand-gold text-black shadow'
                      : 'bg-white/10 text-gray-400 hover:bg-white/20'
                  }`}
                >
                  صـ {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 1-Click Print Presets */}
      <div className="space-y-1.5 bg-gradient-to-r from-brand-gold/20 via-black/80 to-brand-gold/20 p-2.5 rounded-xl border border-brand-gold/60 shadow-md">
        <div className="flex justify-between items-center text-[10.5px]">
          <span className="font-bold text-brand-goldLight flex items-center gap-1">
            <Printer className="w-3.5 h-3.5 text-brand-gold" />
            <span>أنماط الطباعة السريعة (بضغطة زر واحدة):</span>
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 pt-1">
          {/* Preset 1: Normal Screen */}
          <button
            type="button"
            onClick={() => applyPreset('screen')}
            className={`p-2 rounded-lg border text-right transition flex flex-col gap-0.5 ${
              pageBrightness === 100 && imageBrightness === 100
                ? 'bg-brand-gold text-black border-brand-gold shadow-md font-bold'
                : 'bg-black/80 border-white/15 text-gray-300 hover:border-brand-gold/40'
            }`}
          >
            <span className="text-[10px] font-bold flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>معاينة الشاشة</span>
            </span>
            <span className="text-[8.5px] opacity-80">100% افتراضي</span>
          </button>

          {/* Preset 2: Print Balanced */}
          <button
            type="button"
            onClick={() => applyPreset('print-balanced')}
            className={`p-2 rounded-lg border text-right transition flex flex-col gap-0.5 ${
              pageBrightness === 115 && imageBrightness === 125
                ? 'bg-brand-gold text-black border-brand-gold shadow-md font-bold'
                : 'bg-black/80 border-white/15 text-gray-300 hover:border-brand-gold/40'
            }`}
          >
            <span className="text-[10px] font-bold flex items-center gap-1">
              <Printer className="w-3 h-3" />
              <span>طباعة متوازنة</span>
            </span>
            <span className="text-[8.5px] opacity-80">+15% صفحة · +25% صور</span>
          </button>

          {/* Preset 3: Print Boost Maximum */}
          <button
            type="button"
            onClick={() => applyPreset('print-boost')}
            className={`p-2 rounded-lg border text-right transition flex flex-col gap-0.5 ${
              pageBrightness === 125 && imageBrightness === 140
                ? 'bg-brand-gold text-black border-brand-gold shadow-md font-bold'
                : 'bg-black/80 border-white/15 text-gray-300 hover:border-brand-gold/40'
            }`}
          >
            <span className="text-[10px] font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>طباعة قوية ☀️</span>
            </span>
            <span className="text-[8.5px] opacity-80">+25% صفحة · +40% صور</span>
          </button>
        </div>
      </div>

      {/* Control 1: Master Whole Page Brightness */}
      <div className="bg-black/70 p-2.5 rounded-xl border border-white/10 space-y-1.5">
        <div className="flex justify-between items-center text-[10.5px]">
          <span className="font-bold text-gray-200 flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-yellow-400" />
            <span>1. إضاءة الصفحة كاملة (Page Brightness):</span>
          </span>
          <span className="text-[10.5px] text-brand-gold font-mono font-bold bg-black/90 px-2 py-0.5 rounded border border-brand-gold/40">
            {pageBrightness}%
          </span>
        </div>
        <p className="text-[8.5px] text-gray-400 leading-normal">
          يفتح كامل عناصر الصفحة (الخلفية، الإطارات، النصوص والصور) لمنع تشبع الورق بالحبر الداكن.
        </p>
        <div className="grid grid-cols-5 gap-1 pt-0.5">
          {[100, 110, 115, 120, 130].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => updateSetting(targetScope, 'pageBrightness', val)}
              className={`py-0.5 text-[9px] font-mono font-bold rounded transition border ${
                pageBrightness === val
                  ? 'bg-brand-gold text-black border-brand-gold'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/15'
              }`}
            >
              {val}%
            </button>
          ))}
        </div>
        <input
          type="range"
          min="80"
          max="160"
          step="1"
          className="control-slider w-full"
          value={pageBrightness}
          onChange={(e) => updateSetting(targetScope, 'pageBrightness', Number(e.target.value))}
        />
      </div>

      {/* Control 2: Master Food Photos Brightness Boost */}
      <div className="bg-black/70 p-2.5 rounded-xl border border-white/10 space-y-1.5">
        <div className="flex justify-between items-center text-[10.5px]">
          <span className="font-bold text-gray-200 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-brand-gold" />
            <span>2. تعزيز إضاءة صور الأطباق والمشويات (Food Photos):</span>
          </span>
          <span className="text-[10.5px] text-brand-gold font-mono font-bold bg-black/90 px-2 py-0.5 rounded border border-brand-gold/40">
            {imageBrightness}%
          </span>
        </div>
        <p className="text-[8.5px] text-gray-400 leading-normal">
          يرفع إضاءة صور المشويات والأطباق في القوس الجانبي وصور المنيو لتخرج ملامح الطعام وتفاصيله مشرقة على الورق.
        </p>
        <div className="grid grid-cols-5 gap-1 pt-0.5">
          {[100, 115, 125, 135, 150].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => updateSetting(targetScope, 'imageBrightness', val)}
              className={`py-0.5 text-[9px] font-mono font-bold rounded transition border ${
                imageBrightness === val
                  ? 'bg-brand-gold text-black border-brand-gold'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/15'
              }`}
            >
              {val}%
            </button>
          ))}
        </div>
        <input
          type="range"
          min="80"
          max="180"
          step="2"
          className="control-slider w-full"
          value={imageBrightness}
          onChange={(e) => updateSetting(targetScope, 'imageBrightness', Number(e.target.value))}
        />
      </div>

      {/* Control 3: Master Contrast */}
      <div className="bg-black/70 p-2.5 rounded-xl border border-white/10 space-y-1.5">
        <div className="flex justify-between items-center text-[10.5px]">
          <span className="font-bold text-gray-200 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-brand-goldLight" />
            <span>3. تباين ونضارة الألوان (Contrast):</span>
          </span>
          <span className="text-[10.5px] text-brand-gold font-mono font-bold bg-black/90 px-2 py-0.5 rounded border border-brand-gold/40">
            {pageContrast}%
          </span>
        </div>
        <p className="text-[8.5px] text-gray-400 leading-normal">
          يحافظ على حمرة الشواء وتشبع ألوان اللحوم والخضروات بعد زيادة الإضاءة حتى لا تبدو باهتة.
        </p>
        <div className="grid grid-cols-4 gap-1 pt-0.5">
          {[100, 105, 110, 120].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => {
                updateSetting(targetScope, 'pageContrast', val);
                updateSetting(targetScope, 'imageContrast', val);
              }}
              className={`py-0.5 text-[9px] font-mono font-bold rounded transition border ${
                pageContrast === val
                  ? 'bg-brand-gold text-black border-brand-gold'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/15'
              }`}
            >
              {val}%
            </button>
          ))}
        </div>
        <input
          type="range"
          min="80"
          max="140"
          step="1"
          className="control-slider w-full"
          value={pageContrast}
          onChange={(e) => {
            const v = Number(e.target.value);
            updateSetting(targetScope, 'pageContrast', v);
            updateSetting(targetScope, 'imageContrast', v);
          }}
        />
      </div>

      {/* Reset Lighting Button */}
      {(pageBrightness !== 100 || imageBrightness !== 100 || pageContrast !== 100) && (
        <button
          type="button"
          onClick={() => applyPreset('screen')}
          className="w-full py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg border border-white/15 text-[10px] font-bold transition flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3 h-3 text-brand-gold" />
          <span>إعادة ضبط الإضاءة للوضع الطبيعي (100%)</span>
        </button>
      )}
    </div>
  );
};

export default LightingSettings;
