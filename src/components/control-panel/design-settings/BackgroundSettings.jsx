import React, { useRef } from 'react';
import { Layers, Check, Sparkles, Upload, RefreshCw } from 'lucide-react';
import { useMenu } from '../../../context/MenuContext';
import { optimizeImageFile } from '../../../utils/imageOptimizer';

const BackgroundSettings = () => {
  const { pages, globalSettings, pageOverrides, updateSetting } = useMenu();
  const bgFileInputRef = useRef(null);

  const updateGlobalBackground = (key, value) => {
    updateSetting('global', key, value);
    pages.forEach((_, i) => {
      const pageKey = `page${i + 1}`;
      if (pageOverrides[pageKey] && pageOverrides[pageKey][key] !== undefined) {
        updateSetting(pageKey, key, value);
      }
    });
  };

  const handleBgUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const optimized = await optimizeImageFile(file, 1800, 2400, 0.90);
        updateGlobalBackground('customBgImage', optimized);
      } catch {
        const reader = new FileReader();
        reader.onload = (event) => {
          updateGlobalBackground('customBgImage', event.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleResetBackground = () => {
    updateGlobalBackground('customBgImage', '');
    updateGlobalBackground('bgOpacity', 20);
    updateGlobalBackground('bgBlur', 0);
    updateGlobalBackground('bgDarkness', 30);
    updateGlobalBackground('bgFit', 'cover');
    if (bgFileInputRef.current) bgFileInputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      {/* Base Background Style Selection */}
      <div className="control-group bg-black/40 p-3 rounded-xl border border-white/5 space-y-3">
        <h3 className="text-xs font-bold text-brand-goldLight flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-brand-gold" />
          <span>لون ونمط الخلفية الأساسي</span>
        </h3>
        <p className="text-[10px] text-slate-400">
          اختر النمط الأساسي للخلفية. الأسود الحقيقي هو الأفضل والأكثر أماناً للطباعة بدون بهتان.
        </p>
        <div className="grid grid-cols-1 gap-2 mt-2">
          {[
            { id: 'true-black', label: 'أسود حقيقي 100% (الأفضل والأوضح للطباعة)', color: '#000000' },
            { id: 'solid-green', label: 'أخضر داكن سادة (فخم وهادئ للعين)', color: '#050a07' },
            { id: 'gradient', label: 'تدرج أخضر (النمط الكلاسيكي للشاشات)', color: 'linear-gradient(90deg, #0a1f13, #050a07)' },
          ].map((style) => (
            <button
              key={style.id}
              type="button"
              onClick={() => updateGlobalBackground('bgStyle', style.id)}
              className={`flex items-center gap-3 p-2 rounded-lg border transition ${
                (globalSettings.bgStyle || 'solid-green') === style.id
                  ? 'bg-brand-gold/20 border-brand-gold text-brand-goldLight shadow-sm'
                  : 'bg-black/60 border-white/10 text-gray-300 hover:border-white/30'
              }`}
            >
              <div 
                className="w-6 h-6 rounded-full border border-white/20 shadow-sm shrink-0"
                style={{ background: style.color }}
              />
              <span className="text-[11px] font-semibold">{style.label}</span>
              {(globalSettings.bgStyle || 'solid-green') === style.id && (
                <Check className="w-3.5 h-3.5 ml-auto text-brand-gold" />
              )}
            </button>
          ))}
        </div>

        {/* Background Pattern Slider and Type */}
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10.5px] text-gray-300 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              زخرفة ونمط الخلفية:
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1 mb-3">
            {[
              { id: 'stars', label: 'نجوم', icon: '✨' },
              { id: 'cutlery', label: 'مائدة', icon: '🍴' },
              { id: 'diamonds', label: 'معين', icon: '🔶' },
              { id: 'dots', label: 'نقاط', icon: '•' },
              { id: 'logoLetter', label: 'حرف نصي', icon: 'A' },
              { id: 'custom', label: 'صورة مخصصة', icon: '🖼️' },
            ].map((ptn) => (
              <button
                key={ptn.id}
                type="button"
                onClick={() => updateGlobalBackground('bgPatternType', ptn.id)}
                className={`py-1 px-1 rounded text-[9.5px] font-semibold transition text-center flex flex-col items-center gap-0.5 ${
                  (globalSettings.bgPatternType || 'stars') === ptn.id
                    ? 'bg-brand-gold text-black font-bold shadow-sm'
                    : 'bg-black/60 text-gray-400 hover:text-gray-200 border border-white/5 hover:border-white/20'
                }`}
              >
                <span className="text-xs">{ptn.icon}</span>
                <span>{ptn.label}</span>
              </button>
            ))}
          </div>

          {globalSettings.bgPatternType === 'custom' && (
            <div className="mb-3 p-2 bg-black/50 border border-brand-gold/30 rounded-lg">
              <label className="text-[10px] text-gray-400 block mb-1.5">اختر صورة الشعار (يفضل PNG شفاف):</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => updateGlobalBackground('customPatternImage', ev.target.result);
                        reader.readAsDataURL(file);
                      }
                    };
                    input.click();
                  }}
                  className="flex-1 py-1.5 bg-brand-gold/20 hover:bg-brand-gold/40 border border-brand-gold/50 rounded text-[10px] font-bold text-brand-goldLight transition flex items-center justify-center gap-1.5"
                >
                  <Upload className="w-3 h-3" />
                  رفع صورة الزخرفة
                </button>
                {globalSettings.customPatternImage && (
                  <button
                    type="button"
                    onClick={() => updateGlobalBackground('customPatternImage', '')}
                    className="p-1.5 bg-red-950/50 hover:bg-red-900 border border-red-500/30 rounded text-red-400 hover:text-white transition"
                    title="إزالة الصورة"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] text-gray-400">شفافية الزخرفة ووضوحها:</span>
            <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/30">
              {globalSettings.bgPatternOpacity !== undefined ? globalSettings.bgPatternOpacity : 2}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="15"
            step="1"
            className="control-slider"
            value={globalSettings.bgPatternOpacity !== undefined ? globalSettings.bgPatternOpacity : 2}
            onChange={(e) => updateGlobalBackground('bgPatternOpacity', Number(e.target.value))}
          />

          
          {/* Pattern Scale Slider */}
          <div className="flex justify-between items-center mb-1 mt-3">
            <span className="text-[10px] text-gray-400">حجم الزخرفة (تكبير وتصغير):</span>
            <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/30">
              {globalSettings.bgPatternScale !== undefined ? globalSettings.bgPatternScale : 100}%
            </span>
          </div>
          <input
            type="range"
            min="30"
            max="300"
            step="10"
            className="control-slider"
            value={globalSettings.bgPatternScale !== undefined ? globalSettings.bgPatternScale : 100}
            onChange={(e) => updateGlobalBackground('bgPatternScale', Number(e.target.value))}
          />

          {/* Pattern Color Selector */}
          <div className="mt-3.5 pt-2 border-t border-white/5">
            <span className="text-[10px] text-gray-400 block mb-1.5">لون الزخرفة:</span>
            <div className="flex gap-2">
              {[
                { id: '#c9aa58', label: 'ذهبي كلاسيكي' },
                { id: '#c0c0c0', label: 'فضي أنيق' },
                { id: '#0a1f13', label: 'أخضر داكن' },
                { id: '#000000', label: 'أسود مطفي' },
                { id: '#ffffff', label: 'أبيض ناصع' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  title={c.label}
                  onClick={() => updateGlobalBackground('bgPatternColor', c.id)}
                  className={`w-6 h-6 rounded-full border-2 transition ${
                    (globalSettings.bgPatternColor || '#c9aa58') === c.id
                      ? 'border-brand-gold scale-110 shadow-sm'
                      : 'border-white/20 hover:scale-105'
                  }`}
                  style={{ background: c.id }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Page Background Image & Watermark */}
      <div className="control-group bg-black/40 p-3 rounded-xl border border-white/5 space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
          <h3 className="text-xs font-bold text-brand-goldLight flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-brand-gold" />
            <span>خلفية ورقة المنيو (تطبّق على كل الصفحات)</span>
          </h3>
          {globalSettings.customBgImage ? (
            <span className="text-[10px] text-green-400 font-semibold flex items-center gap-1">
              <Check className="w-3 h-3" />
              <span>مخصصة</span>
            </span>
          ) : (
            <span className="text-[9.5px] text-brand-goldLight/70 font-normal">
              الخلفية الأصلية
            </span>
          )}
        </div>

        <p className="text-[10px] text-slate-400 leading-relaxed">
          ارفع صورة لتصبح خلفية أو علامة مائية شفافة وموحدة ورا قائمة الطعام في كافة صفحات المنيو.
        </p>

        {globalSettings.customBgImage ? (
          <div className="p-2.5 bg-black/70 border border-brand-gold/50 rounded-xl space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-14 h-16 rounded-lg overflow-hidden border border-brand-gold/60 relative bg-black shrink-0 shadow-md">
                <img
                  src={globalSettings.customBgImage}
                  alt="Current Background"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-white block">خلفية مخصصة مفعّلة</span>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => bgFileInputRef.current?.click()}
                    className="px-2.5 py-1 bg-brand-gold/20 hover:bg-brand-gold hover:text-black border border-brand-gold/60 rounded text-[10px] font-bold text-brand-goldLight transition"
                  >
                    تغيير الصورة
                  </button>
                  <button
                    type="button"
                    onClick={handleResetBackground}
                    className="px-2.5 py-1 bg-red-950/50 hover:bg-red-900/80 border border-red-500/40 rounded text-[10px] font-bold text-red-300 hover:text-white transition flex items-center gap-1"
                    title="الرجوع للخلفية الأصلية لجميع الصفحات"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>إعادة ضبط للأصلية</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => bgFileInputRef.current?.click()}
              className="w-full py-2.5 bg-black/60 hover:bg-black/90 border border-dashed border-brand-gold/60 hover:border-brand-gold rounded-xl text-xs text-brand-goldLight transition cursor-pointer flex items-center justify-center gap-2 shadow-inner"
            >
              <Upload className="w-4 h-4 text-brand-gold" />
              <span className="font-bold">رفع صورة خلفية موحدة (PNG / JPG)</span>
            </button>
          </div>
        )}

        <input
          ref={bgFileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onClick={(e) => {
            e.currentTarget.value = '';
          }}
          onChange={handleBgUpload}
        />

        {globalSettings.customBgImage && (
          <div className="space-y-2.5 pt-1">
            {/* Opacity Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10.5px] text-gray-300 font-semibold">درجة الشفافية:</span>
                <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/30">
                  {globalSettings.bgOpacity !== undefined ? globalSettings.bgOpacity : 20}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                className="control-slider"
                value={globalSettings.bgOpacity !== undefined ? globalSettings.bgOpacity : 20}
                onChange={(e) => updateGlobalBackground('bgOpacity', Number(e.target.value))}
              />
            </div>

            {/* Dark Tint Overlay Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10.5px] text-gray-300 font-semibold">تعتيم الخلفية:</span>
                <span className="text-[11px] text-brand-accent font-mono font-bold">
                  {globalSettings.bgDarkness !== undefined ? globalSettings.bgDarkness : 30}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="5"
                className="control-slider"
                value={globalSettings.bgDarkness !== undefined ? globalSettings.bgDarkness : 30}
                onChange={(e) => updateGlobalBackground('bgDarkness', Number(e.target.value))}
              />
            </div>

            {/* Background Blur Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10.5px] text-gray-300 font-semibold">تغبيش الصورة:</span>
                <span className="text-[11px] text-brand-gold font-mono font-bold">
                  {globalSettings.bgBlur || 0}px
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                className="control-slider"
                value={globalSettings.bgBlur || 0}
                onChange={(e) => updateGlobalBackground('bgBlur', Number(e.target.value))}
              />
            </div>

            {/* Background Image Scale Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10.5px] text-gray-300 font-semibold">حجم الصورة:</span>
                <span className="text-[11px] text-brand-gold font-mono font-bold">
                  {globalSettings.bgScale !== undefined ? globalSettings.bgScale : 100}%
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="5"
                className="control-slider"
                value={globalSettings.bgScale !== undefined ? globalSettings.bgScale : 100}
                onChange={(e) => updateGlobalBackground('bgScale', Number(e.target.value))}
              />
            </div>

            {/* Position */}
            <div className="space-y-2">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10.5px] text-gray-300 font-semibold">↔️ الإزاحة الأفقية X:</span>
                  <span className="text-[11px] text-brand-gold font-mono font-bold">
                    {globalSettings.bgPosX !== undefined ? globalSettings.bgPosX : 50}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  className="control-slider"
                  value={globalSettings.bgPosX !== undefined ? globalSettings.bgPosX : 50}
                  onChange={(e) => updateGlobalBackground('bgPosX', Number(e.target.value))}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10.5px] text-gray-300 font-semibold">↕️ الإزاحة الرأسية Y:</span>
                  <span className="text-[11px] text-brand-gold font-mono font-bold">
                    {globalSettings.bgPosY !== undefined ? globalSettings.bgPosY : 50}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  className="control-slider"
                  value={globalSettings.bgPosY !== undefined ? globalSettings.bgPosY : 50}
                  onChange={(e) => updateGlobalBackground('bgPosY', Number(e.target.value))}
                />
              </div>
            </div>

            {/* Placement and Fit */}
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">موضع ظهور الخلفية:</label>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { id: 'content', label: '📝 خلف الكتابة فقط' },
                  { id: 'full', label: '📄 كامل الصفحة' },
                ].map((plc) => (
                  <button
                    key={plc.id}
                    type="button"
                    onClick={() => updateGlobalBackground('bgPlacement', plc.id)}
                    className={`py-1 px-1 rounded text-[9.5px] font-semibold transition text-center truncate ${
                      (globalSettings.bgPlacement || 'content') === plc.id
                        ? 'bg-brand-gold text-black font-bold'
                        : 'bg-black/60 text-gray-300 hover:text-white border border-white/10'
                    }`}
                  >
                    {plc.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] text-gray-400 block mb-1">طريقة الملء:</label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'cover', label: 'تغطية (Cover)' },
                  { id: 'contain', label: 'احتواء (Contain)' },
                  { id: 'center', label: 'توسيط (Center)' },
                ].map((fit) => (
                  <button
                    key={fit.id}
                    type="button"
                    onClick={() => updateGlobalBackground('bgFit', fit.id)}
                    className={`py-1 px-1 rounded text-[9.5px] font-semibold transition text-center truncate ${
                      (globalSettings.bgFit || 'cover') === fit.id
                        ? 'bg-brand-gold text-black font-bold'
                        : 'bg-black/60 text-gray-300 hover:text-white border border-white/10'
                    }`}
                  >
                    {fit.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundSettings;
