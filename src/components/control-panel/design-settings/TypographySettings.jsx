import React, { useState } from 'react';
import { Type, Globe, Move, Shield, Frame, LayoutTemplate, Utensils, Footprints, QrCode, Upload, Trash2, Camera, Sparkles, Sliders, RotateCcw } from 'lucide-react';
import { useMenu } from '../../../context/MenuContext';
import { optimizeImageFile } from '../../../utils/imageOptimizer';

const DEFAULT_SETTINGS = {
  itemTitleSize: 14,
  priceSize: 13.5,
  descSize: 10,
  catTitleSize: 16,
  titleSize: 28,
  qrCodes: [
    { id: 'qr1', title: '', url: '', customImage: '' },
    { id: 'qr2', title: '', url: '', customImage: '' },
    { id: 'qr3', title: '', url: '', customImage: '' },
  ],
};

const TypographySettings = ({
  targetScope,
  setTargetScope,
  selectedImagePageIdx,
  setSelectedImagePageIdx,
  selectedImageSlot,
  setSelectedImageSlot
}) => {
  const { pages, globalSettings, pageOverrides, updateSetting, updateImageTransform, resetImageTransform, updatePageImage } = useMenu();

  const [customPct, setCustomPct] = useState(100);

  const currentSettings =
    targetScope === 'global'
      ? globalSettings
      : { ...globalSettings, ...(pageOverrides[targetScope] || {}) };

  return (
    <div className="space-y-4">
      {/* 3. Typography & Text Scaling */}
      <div className="control-group bg-black/40 p-3 rounded-xl border border-white/5 space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
          <h3 className="text-xs font-bold text-brand-goldLight flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-brand-gold" />
            <span>أحجام الخطوط وتكبير نصوص الأطباق</span>
          </h3>
          <span className="text-[10px] text-brand-accent font-semibold bg-brand-green/30 border border-brand-accent/30 px-2 py-0.5 rounded-full">
            {targetScope === 'global' ? '🌐 عام (كل الصفحات)' : `📄 صفحة ${targetScope.replace('page', '')} فقط`}
          </span>
        </div>

        <div className="bg-black/60 p-2.5 rounded-xl border border-brand-gold/40 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label className="text-[11px] text-gray-200 font-bold flex items-center gap-1 shrink-0">
              <Globe className="w-3.5 h-3.5 text-brand-gold" />
              <span>اختر الصفحة للتعديل:</span>
            </label>
            <select
              className="bg-black text-brand-goldLight border border-brand-gold/60 rounded-lg px-2 py-1 text-xs font-bold focus:outline-none focus:border-brand-gold flex-1 max-w-[200px]"
              value={targetScope}
              onChange={(e) => {
                const val = e.target.value;
                setTargetScope(val);
                if (val !== 'global') {
                  const el = document.getElementById(val);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
            >
              <option value="global">🌐 جميع الصفحات (عام موحّد)</option>
              {pages.map((p, i) => (
                <option key={`page${i + 1}`} value={`page${i + 1}`}>
                  📄 صفحة {i + 1}: {p.header?.title ? p.header.title.split('\n')[0].slice(0, 18) : `صفحة ${i + 1}`}
                </option>
              ))}
            </select>
          </div>

          {targetScope !== 'global' ? (
            <div className="flex items-center justify-between pt-1.5 border-t border-white/10 gap-1.5">
              <span className="text-[9.5px] text-brand-accent font-semibold flex items-center gap-1">
                <span>⚡ تخصيص مستقل لصفحة {targetScope.replace('page', '')}</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    const current = pageOverrides[targetScope] || {};
                    ['itemTitleSize', 'priceSize', 'descSize', 'catTitleSize', 'titleSize'].forEach((k) => {
                      if (current[k] !== undefined) updateSetting('global', k, current[k]);
                    });
                    alert('تم نسخ وتطبيق هذه الأحجام على كافة صفحات المنيو بنجاح!');
                  }}
                  className="px-2 py-0.5 bg-brand-gold/20 hover:bg-brand-gold hover:text-black border border-brand-gold/50 rounded text-[9.5px] font-bold text-brand-goldLight transition"
                >
                  📋 تطبيق للكل
                </button>
                <button
                  type="button"
                  onClick={() => {
                    ['itemTitleSize', 'priceSize', 'descSize', 'catTitleSize', 'titleSize'].forEach((k) => {
                      updateSetting(targetScope, k, globalSettings[k] || DEFAULT_SETTINGS[k]);
                    });
                  }}
                  className="px-2 py-0.5 bg-black/60 hover:bg-white/10 border border-white/10 rounded text-[9.5px] text-gray-300 transition"
                >
                  🔄 استرجاع العام
                </button>
              </div>
            </div>
          ) : (
            <p className="text-[9.5px] text-gray-400">
              💡 التعديلات هنا تطبق كإعداد عام على كافة الصفحات. لتخصيص صفحة محددة، اخترها من القائمة بالأعلى.
            </p>
          )}
        </div>

        {/* ★ PROMINENT CONTENT SCALE (تكبير وتصغير محتوى الصفحة للطباعة) ★ */}
        <div className="bg-gradient-to-r from-[#0c2417] to-[#06140d] p-3 rounded-xl border-2 border-brand-gold/60 space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-brand-gold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-yellow-400" />
                <span>تكبير / تصغير محتوى الصفحة (Content Scale)</span>
              </span>
              <p className="text-[10px] text-gray-300 mt-0.5">
                يتحكم بحجم الخطوط والتباعد المطبوع فعلياً داخل ({targetScope === 'global' ? 'كل الصفحات' : `صفحة ${targetScope.replace('page', '')}`})
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-yellow-400 font-mono font-bold bg-black/80 px-2 py-0.5 rounded border border-yellow-500/40">
                {currentSettings.contentScale !== undefined ? currentSettings.contentScale : 100}%
              </span>
              {(currentSettings.contentScale !== undefined && currentSettings.contentScale !== 100) && (
                <button
                  type="button"
                  onClick={() => updateSetting(targetScope, 'contentScale', 100)}
                  className="px-2 py-0.5 bg-red-950/60 hover:bg-red-800 text-red-200 border border-red-500/40 rounded text-[10px] font-bold transition flex items-center gap-1"
                  title="إعادة الضبط الافتراضي للتحجيم التلقائي الذكي (100%)"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>إعادة ضبط (100%)</span>
                </button>
              )}
            </div>
          </div>

          <input
            type="range"
            min="60"
            max="140"
            step="1"
            className="control-slider"
            value={currentSettings.contentScale !== undefined ? currentSettings.contentScale : 100}
            onChange={(e) => updateSetting(targetScope, 'contentScale', parseFloat(e.target.value))}
          />

          <div className="flex items-center justify-between gap-1 pt-1">
            <span className="text-[9.5px] text-gray-400">نسب سريعة:</span>
            <div className="flex gap-1">
              {[75, 90, 100, 110, 125].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => updateSetting(targetScope, 'contentScale', pct)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                    (currentSettings.contentScale || 100) === pct
                      ? 'bg-brand-gold text-black'
                      : 'bg-black/60 text-gray-300 hover:text-white border border-white/10'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 1. Dish Title Size */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] text-gray-300 font-semibold">حجم اسم الطبق:</span>
            <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/30">
              {currentSettings.itemTitleSize !== undefined ? currentSettings.itemTitleSize : 14}px
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="26"
            step="0.5"
            className="control-slider"
            value={currentSettings.itemTitleSize !== undefined ? currentSettings.itemTitleSize : 14}
            onChange={(e) => updateSetting(targetScope, 'itemTitleSize', parseFloat(e.target.value))}
          />
        </div>

        {/* 2. Price Size */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] text-gray-300 font-semibold">حجم شارة السعر:</span>
            <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/30">
              {currentSettings.priceSize !== undefined ? currentSettings.priceSize : 13.5}px
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="26"
            step="0.5"
            className="control-slider"
            value={currentSettings.priceSize !== undefined ? currentSettings.priceSize : 13.5}
            onChange={(e) => updateSetting(targetScope, 'priceSize', parseFloat(e.target.value))}
          />
        </div>

        {/* 3. Description Size */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] text-gray-300 font-semibold">حجم الوصف والمكونات:</span>
            <span className="text-[11px] text-brand-accent font-mono font-bold bg-brand-green/30 px-1.5 py-0.5 rounded border border-brand-accent/30">
              {currentSettings.descSize !== undefined ? currentSettings.descSize : 10}px
            </span>
          </div>
          <input
            type="range"
            min="8"
            max="18"
            step="0.5"
            className="control-slider"
            value={currentSettings.descSize !== undefined ? currentSettings.descSize : 10}
            onChange={(e) => updateSetting(targetScope, 'descSize', parseFloat(e.target.value))}
          />
        </div>

        {/* 4. Category Title Size */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] text-gray-300 font-semibold">حجم عنوان القسم:</span>
            <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/30">
              {currentSettings.catTitleSize !== undefined ? currentSettings.catTitleSize : 16}px
            </span>
          </div>
          <input
            type="range"
            min="12"
            max="26"
            step="0.5"
            className="control-slider"
            value={currentSettings.catTitleSize !== undefined ? currentSettings.catTitleSize : 16}
            onChange={(e) => updateSetting(targetScope, 'catTitleSize', parseFloat(e.target.value))}
          />
        </div>

        {/* 5. Page Main Title Size */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] text-gray-300 font-semibold">حجم عنوان الصفحة الرئيسي:</span>
            <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/30">
              {currentSettings.titleSize !== undefined ? currentSettings.titleSize : 28}px
            </span>
          </div>
          <input
            type="range"
            min="20"
            max="45"
            step="1"
            className="control-slider"
            value={currentSettings.titleSize !== undefined ? currentSettings.titleSize : 28}
            onChange={(e) => updateSetting(targetScope, 'titleSize', parseFloat(e.target.value))}
          />
        </div>

        {/* 6. Dish Allergen Tags Font Size */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] text-gray-300 font-semibold">حجم رموز الحساسية:</span>
            <span className="text-[11px] text-brand-accent font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-accent/30">
              {currentSettings.allergenSize !== undefined ? currentSettings.allergenSize : 8}px
            </span>
          </div>
          <input
            type="range"
            min="6"
            max="16"
            step="0.5"
            className="control-slider"
            value={currentSettings.allergenSize !== undefined ? currentSettings.allergenSize : 8}
            onChange={(e) => updateSetting(targetScope, 'allergenSize', parseFloat(e.target.value))}
          />
        </div>

        {/* 7. Dish Block Style */}
        <div className="pt-2 border-t border-white/10 mt-2">
          <label className="text-[11px] text-gray-300 font-semibold block mb-1.5">
            تصميم كتلة الأطباق (Dish Style):
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'minimal', label: '🔤 نص فقط (افتراضي)' },
              { id: 'card', label: '🟩 صندوق داكن' },
              { id: 'outline', label: '📏 صندوق بإطار' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => updateSetting(targetScope, 'itemBlockStyle', st.id)}
                className={`py-1.5 px-1 rounded-lg text-[10.5px] font-bold transition flex items-center justify-center text-center ${
                  (currentSettings.itemBlockStyle || 'minimal') === st.id
                    ? 'bg-brand-gold text-black shadow-md'
                    : 'bg-black/60 text-slate-400 border border-white/10 hover:text-white'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Subtitle & Tagline Details */}
        <div className="pt-2 mt-2 border-t border-white/10 space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] text-gray-300 font-semibold">حجم العنوان الفرعي (Subtitle):</span>
              <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/30">
                {currentSettings.subtitleSize !== undefined ? currentSettings.subtitleSize : 14}px
              </span>
            </div>
            <input
              type="range" min="8" max="24" step="0.5" className="control-slider"
              value={currentSettings.subtitleSize !== undefined ? currentSettings.subtitleSize : 14}
              onChange={(e) => updateSetting(targetScope, 'subtitleSize', parseFloat(e.target.value))}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] text-gray-300 font-semibold">حجم الشعار اللفظي (Tagline):</span>
              <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/30">
                {currentSettings.taglineSize !== undefined ? currentSettings.taglineSize : 10}px
              </span>
            </div>
            <input
              type="range" min="6" max="20" step="0.5" className="control-slider"
              value={currentSettings.taglineSize !== undefined ? currentSettings.taglineSize : 10}
              onChange={(e) => updateSetting(targetScope, 'taglineSize', parseFloat(e.target.value))}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] text-gray-300 font-semibold">حجم شريط الحمية (Dietary Bar):</span>
              <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/30">
                {currentSettings.dietaryBarSize !== undefined ? currentSettings.dietaryBarSize : 10}px
              </span>
            </div>
            <input
              type="range" min="6" max="20" step="0.5" className="control-slider"
              value={currentSettings.dietaryBarSize !== undefined ? currentSettings.dietaryBarSize : 10}
              onChange={(e) => updateSetting(targetScope, 'dietaryBarSize', parseFloat(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-gray-300 font-semibold">حجم نص التذييل:</span>
                <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/30">
                  {currentSettings.footerTextSize !== undefined ? currentSettings.footerTextSize : 10}px
                </span>
              </div>
              <input
                type="range" min="6" max="20" step="0.5" className="control-slider"
                value={currentSettings.footerTextSize !== undefined ? currentSettings.footerTextSize : 10}
                onChange={(e) => updateSetting(targetScope, 'footerTextSize', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-gray-300 font-semibold">إزاحة عمودية (لأسفل/لأعلى):</span>
                <span className="text-[11px] text-brand-accent font-mono font-bold">
                  {currentSettings.footerTextOffsetY || 0}px
                </span>
              </div>
              <input
                type="range" min="-200" max="200" step="1" className="control-slider"
                value={currentSettings.footerTextOffsetY || 0}
                onChange={(e) => updateSetting(targetScope, 'footerTextOffsetY', parseFloat(e.target.value))}
              />
            </div>
            <div className="col-span-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-gray-300 font-semibold">إزاحة أفقية (يمين/يسار):</span>
                <span className="text-[11px] text-brand-accent font-mono font-bold">
                  {currentSettings.footerTextOffsetX || 0}px
                </span>
              </div>
              <input
                type="range" min="-200" max="200" step="1" className="control-slider"
                value={currentSettings.footerTextOffsetX || 0}
                onChange={(e) => updateSetting(targetScope, 'footerTextOffsetX', parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-gray-300 font-semibold">حجم رقم الصفحة:</span>
                <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/30">
                  {currentSettings.pageNumberSize !== undefined ? currentSettings.pageNumberSize : 12}px
                </span>
              </div>
              <input
                type="range" min="8" max="24" step="0.5" className="control-slider"
                value={currentSettings.pageNumberSize !== undefined ? currentSettings.pageNumberSize : 12}
                onChange={(e) => updateSetting(targetScope, 'pageNumberSize', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-gray-300 font-semibold">إزاحة عمودية (لأسفل/لأعلى):</span>
                <span className="text-[11px] text-brand-accent font-mono font-bold">
                  {currentSettings.pageNumberOffsetY || 0}px
                </span>
              </div>
              <input
                type="range" min="-200" max="200" step="1" className="control-slider"
                value={currentSettings.pageNumberOffsetY || 0}
                onChange={(e) => updateSetting(targetScope, 'pageNumberOffsetY', parseFloat(e.target.value))}
              />
            </div>
            <div className="col-span-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-gray-300 font-semibold">إزاحة أفقية (يمين/يسار):</span>
                <span className="text-[11px] text-brand-accent font-mono font-bold">
                  {currentSettings.pageNumberOffsetX || 0}px
                </span>
              </div>
              <input
                type="range" min="-200" max="200" step="1" className="control-slider"
                value={currentSettings.pageNumberOffsetX || 0}
                onChange={(e) => updateSetting(targetScope, 'pageNumberOffsetX', parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Spacing & Full A4 Coverage */}
      <div className="control-group bg-black/40 p-3 rounded-xl border border-white/5 space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
          <h3 className="text-xs font-bold text-brand-goldLight flex items-center gap-1.5">
            <Move className="w-3.5 h-3.5 text-brand-gold" />
            <span>تباعد الأطباق وتوزيع ملء الصفحة</span>
          </h3>
          <button
            type="button"
            onClick={() => updateSetting(targetScope, 'autoFitPageSpacing', currentSettings.autoFitPageSpacing === false ? true : false)}
            className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
              currentSettings.autoFitPageSpacing !== false
                ? 'bg-brand-green/70 text-brand-accent border border-brand-accent/40'
                : 'bg-black/60 text-gray-400 border border-white/10'
            }`}
          >
            {currentSettings.autoFitPageSpacing !== false ? '✓ ملء ذكي مفعّل' : 'يدوي'}
          </button>
        </div>

        {/* Margin & Full Bleed Quick Presets */}
        <div className="bg-black/60 p-2 rounded-lg border border-brand-gold/40 space-y-1.5">
          <span className="text-[10px] text-gray-300 font-semibold block">إلغاء الهوامش والتمديد الكامل للورقة:</span>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => {
                updateSetting(targetScope, 'borderInset', 0);
                updateSetting(targetScope, 'contentPaddingRight', 4);
                updateSetting(targetScope, 'contentPaddingLeft', 4);
                updateSetting(targetScope, 'printBleedScale', 104);
              }}
              className="py-1.5 px-2 bg-gradient-to-r from-brand-gold/30 to-yellow-600/30 hover:bg-brand-gold hover:text-black border border-brand-gold/70 rounded-lg text-[10px] text-brand-goldLight font-bold transition text-center shadow-sm"
            >
              ⚡ تمديد كامل بدون هوامش (0mm)
            </button>
            <button
              type="button"
              onClick={() => {
                updateSetting(targetScope, 'borderInset', 4);
                updateSetting(targetScope, 'contentPaddingRight', 14);
                updateSetting(targetScope, 'contentPaddingLeft', 8);
                updateSetting(targetScope, 'printBleedScale', 100);
              }}
              className="py-1.5 px-2 bg-black/70 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] text-gray-200 hover:text-white transition text-center font-medium"
            >
              👑 وضع قياسي متوازن
            </button>
          </div>
        </div>

        {/* 1. Print Bleed Scale % */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] text-gray-300 font-semibold">تمديد وتكبير الورقة للطباعة (Bleed Scale):</span>
            <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/30">
              {currentSettings.printBleedScale || 100}%
            </span>
          </div>
          <input
            type="range"
            min="100"
            max="108"
            step="1"
            className="control-slider"
            value={currentSettings.printBleedScale || 100}
            onChange={(e) => updateSetting(targetScope, 'printBleedScale', Number(e.target.value))}
          />
        </div>

        {/* Custom Image Controls for Two-Column Mode */}
        {targetScope !== 'global' && (
          <div className="bg-brand-gold/10 p-2 rounded-lg border border-brand-gold/30 space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-brand-goldLight font-bold">طول إطار الصورة:</span>
                <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/30">
                  {currentSettings.twoColumnImageHeight || 180}px
                </span>
              </div>
              <input
                type="range"
                min="80"
                max="400"
                step="5"
                className="control-slider"
                value={currentSettings.twoColumnImageHeight || 180}
                onChange={(e) => updateSetting(targetScope, 'twoColumnImageHeight', Number(e.target.value))}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-brand-goldLight font-bold">عرض إطار الصورة:</span>
                <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/30">
                  {currentSettings.twoColumnImageWidth || 90}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                step="1"
                className="control-slider"
                value={currentSettings.twoColumnImageWidth || 90}
                onChange={(e) => updateSetting(targetScope, 'twoColumnImageWidth', Number(e.target.value))}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-brand-goldLight font-bold">سماكة الإطار (Border):</span>
                <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/30">
                  {currentSettings.twoColumnImageBorder || 3}px
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                className="control-slider"
                value={currentSettings.twoColumnImageBorder !== undefined ? currentSettings.twoColumnImageBorder : 3}
                onChange={(e) => updateSetting(targetScope, 'twoColumnImageBorder', Number(e.target.value))}
              />
            </div>
          </div>
        )}

        {/* 2. Content Padding Right */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] text-gray-300 font-semibold">الهامش الأيمن للأطباق:</span>
            <span className="text-[11px] text-brand-accent font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-accent/30">
              {currentSettings.contentPaddingRight !== undefined ? currentSettings.contentPaddingRight : 14}px
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="40"
            step="1"
            className="control-slider"
            value={currentSettings.contentPaddingRight !== undefined ? currentSettings.contentPaddingRight : 14}
            onChange={(e) => updateSetting(targetScope, 'contentPaddingRight', Number(e.target.value))}
          />
        </div>

        {/* 3. Content Padding Left */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] text-gray-300 font-semibold">الهامش الأيسر للأطباق:</span>
            <span className="text-[11px] text-brand-accent font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-accent/30">
              {currentSettings.contentPaddingLeft !== undefined ? currentSettings.contentPaddingLeft : 8}px
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            step="1"
            className="control-slider"
            value={currentSettings.contentPaddingLeft !== undefined ? currentSettings.contentPaddingLeft : 8}
            onChange={(e) => updateSetting(targetScope, 'contentPaddingLeft', Number(e.target.value))}
          />
        </div>

        {/* 4. Item Gap */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] text-gray-300 font-semibold">التباعد بين الأطباق:</span>
            <span className="text-[11px] text-brand-gold font-mono font-bold">
              {currentSettings.itemGap || 8}px
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="35"
            step="1"
            className="control-slider"
            value={currentSettings.itemGap || 8}
            onChange={(e) => updateSetting(targetScope, 'itemGap', e.target.value)}
          />
        </div>

        {/* 5. Category Gap */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] text-gray-300 font-semibold">التباعد بين الأقسام:</span>
            <span className="text-[11px] text-brand-gold font-mono font-bold">
              {currentSettings.categoryGap || 18}px
            </span>
          </div>
          <input
            type="range"
            min="6"
            max="50"
            step="1"
            className="control-slider"
            value={currentSettings.categoryGap || 18}
            onChange={(e) => updateSetting(targetScope, 'categoryGap', e.target.value)}
          />
        </div>

        {/* 6. Vertical Offset (Items) */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] text-gray-300 font-semibold">إزاحة الأطباق عمودياً (لأعلى / لأسفل):</span>
            <span className="text-[11px] text-brand-accent font-mono font-bold">
              {currentSettings.contentOffsetY || 0}px
            </span>
          </div>
          <input
            type="range"
            min="-300"
            max="300"
            step="2"
            className="control-slider"
            value={currentSettings.contentOffsetY || 0}
            onChange={(e) => updateSetting(targetScope, 'contentOffsetY', e.target.value)}
          />
        </div>

        {/* Header Vertical Offset */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] text-gray-300 font-semibold">إزاحة العنوان والشعار عمودياً:</span>
            <span className="text-[11px] text-brand-gold font-mono font-bold">
              {currentSettings.headerOffsetY || 0}px
            </span>
          </div>
          <input
            type="range"
            min="-300"
            max="300"
            step="2"
            className="control-slider"
            value={currentSettings.headerOffsetY || 0}
            onChange={(e) => updateSetting(targetScope, 'headerOffsetY', e.target.value)}
          />
        </div>

        {/* Global Vertical Offset */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] text-gray-300 font-semibold">إزاحة كامل الصفحة عمودياً (العنوان + الأطباق):</span>
            <span className="text-[11px] text-yellow-400 font-mono font-bold">
              {currentSettings.globalOffsetY || 0}px
            </span>
          </div>
          <input
            type="range"
            min="-300"
            max="300"
            step="2"
            className="control-slider"
            value={currentSettings.globalOffsetY || 0}
            onChange={(e) => updateSetting(targetScope, 'globalOffsetY', e.target.value)}
          />
        </div>

        {/* 7. Horizontal Offset */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] text-gray-300 font-semibold">إزاحة المحتوى أفقياً (يمين / يسار):</span>
            <span className="text-[11px] text-brand-accent font-mono font-bold">
              {currentSettings.contentOffsetX || 0}px
            </span>
          </div>
          <input
            type="range"
            min="-50"
            max="50"
            step="2"
            className="control-slider"
            value={currentSettings.contentOffsetX || 0}
            onChange={(e) => updateSetting(targetScope, 'contentOffsetX', e.target.value)}
          />
        </div>
      </div>

      {/* 5. Allergene & Zusatzstoffe Legend */}
      <div className="control-group bg-black/40 p-3 rounded-xl border border-white/5 space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
          <h3 className="text-xs font-bold text-brand-goldLight flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-brand-gold" />
            <span>قسم مسببات الحساسية والمضافات (Allergene)</span>
          </h3>
        </div>

        {/* Toggles Grid */}
        <div className="space-y-1.5 bg-black/60 p-2.5 rounded-xl border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-gray-200 font-semibold">إظهار رموز الحساسية تحت كل طبق:</span>
            <button
              type="button"
              onClick={() => updateSetting(targetScope, 'showDishAllergens', currentSettings.showDishAllergens === false ? true : false)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                currentSettings.showDishAllergens !== false
                  ? 'bg-brand-green/70 text-brand-accent border border-brand-accent/40'
                  : 'bg-black/60 text-gray-400 border border-white/10'
              }`}
            >
              {currentSettings.showDishAllergens !== false ? '✓ مفعّل' : 'مخفي'}
            </button>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 pt-1.5">
            <span className="text-[11px] text-gray-200 font-semibold">إظهار بطاقة الملاحظات والرموز بصفحة 13:</span>
            <button
              type="button"
              onClick={() => updateSetting('global', 'showHinweiseCard', currentSettings.showHinweiseCard === false ? true : false)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                currentSettings.showHinweiseCard !== false
                  ? 'bg-brand-green/70 text-brand-accent border border-brand-accent/40'
                  : 'bg-black/60 text-gray-400 border border-white/10'
              }`}
            >
              {currentSettings.showHinweiseCard !== false ? '✓ مفعّل' : 'مخفي'}
            </button>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 pt-1.5">
            <span className="text-[11px] text-gray-200 font-semibold">إظهار جداول الحساسية والمضافات بصفحة 13:</span>
            <button
              type="button"
              onClick={() => updateSetting('global', 'showAllergenLegend', currentSettings.showAllergenLegend === false ? true : false)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                currentSettings.showAllergenLegend !== false
                  ? 'bg-brand-green/70 text-brand-accent border border-brand-accent/40'
                  : 'bg-black/60 text-gray-400 border border-white/10'
              }`}
            >
              {currentSettings.showAllergenLegend !== false ? '✓ مفعّل' : 'مخفي'}
            </button>
          </div>
        </div>
      </div>

      {/* Callout Cards & Notes */}
      <div className="control-group bg-black/40 p-3 rounded-xl border border-white/5 space-y-3">
        <h3 className="text-xs font-bold text-brand-goldLight flex items-center justify-between border-b border-white/10 pb-1.5">
          <span className="flex items-center gap-1.5">
            <LayoutTemplate className="w-3.5 h-3.5 text-brand-gold" />
            بطاقات التوصية والملاحظات (Callout Cards)
          </span>
          <button
            type="button"
            onClick={() => updateSetting(targetScope, 'showCalloutCards', currentSettings.showCalloutCards === false ? true : false)}
            className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
              currentSettings.showCalloutCards !== false
                ? 'bg-brand-green/70 text-brand-accent border border-brand-accent/40'
                : 'bg-black/60 text-gray-400 border border-white/10'
            }`}
          >
            {currentSettings.showCalloutCards !== false ? '✓ مفعّل' : 'مخفي'}
          </button>
        </h3>
        <p className="text-[10px] text-gray-400">
          تفعيل أو إخفاء بطاقة الملاحظات أسفل الصفحة (مثل: "نصيحة الشيف"، "التوصية"). يمكن التعديل على محتوى البطاقة من تبويب المحتوى.
        </p>

        {/* Bottom Ornament */}
        <div className="pt-2 border-t border-white/10 mt-2">
          <label className="text-[11px] text-gray-300 font-semibold block mb-1.5">
            زخرفة التذييل (Bottom Ornament):
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'royal', label: '✨ أندلسية ملكية' },
              { id: 'classic', label: '📐 كلاسيكية' },
              { id: 'none', label: 'بدون زخرفة' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => updateSetting(targetScope, 'bottomOrnamentStyle', st.id)}
                className={`py-1.5 px-1 rounded-lg text-[10.5px] font-bold transition flex items-center justify-center text-center ${
                  (currentSettings.bottomOrnamentStyle || 'royal') === st.id
                    ? 'bg-brand-gold text-black shadow-md'
                    : 'bg-black/60 text-slate-400 border border-white/10 hover:text-white'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Royal Page Frame & Decorative Borders */}
      <div className="control-group bg-black/40 p-3 rounded-xl border border-white/5 space-y-3">
        <h3 className="text-xs font-bold text-brand-goldLight flex items-center justify-between border-b border-white/10 pb-1.5">
          <span className="flex items-center gap-1.5">
            <Frame className="w-3.5 h-3.5 text-brand-gold" />
            الإطار الملكي وزخرفة حدود الصفحة
          </span>
          <button
            type="button"
            onClick={() => updateSetting(targetScope, 'showBorder', currentSettings.showBorder === false ? true : false)}
            className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
              currentSettings.showBorder !== false
                ? 'bg-brand-green/70 text-brand-accent border border-brand-accent/40'
                : 'bg-black/60 text-gray-400 border border-white/10'
            }`}
          >
            {currentSettings.showBorder !== false ? '✓ مفعّل' : 'معطّل'}
          </button>
        </h3>

        {/* 4-Sided Control Grid */}
        <div>
          <label className="text-[11px] text-gray-300 font-semibold block mb-1.5">
            التحكم بالجهات الأربعة (إخفاء / إبقاء):
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => updateSetting(targetScope, 'borderTop', currentSettings.borderTop === false ? true : false)}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-between ${
                currentSettings.borderTop !== false
                  ? 'bg-brand-gold/20 text-brand-goldLight border border-brand-gold/60 shadow-sm'
                  : 'bg-black/60 text-slate-500 border border-white/5 line-through'
              }`}
            >
              <span>⬆️ الإطار العلوي</span>
            </button>
            <button
              type="button"
              onClick={() => updateSetting(targetScope, 'borderBottom', currentSettings.borderBottom === false ? true : false)}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-between ${
                currentSettings.borderBottom !== false
                  ? 'bg-brand-gold/20 text-brand-goldLight border border-brand-gold/60 shadow-sm'
                  : 'bg-black/60 text-slate-500 border border-white/5 line-through'
              }`}
            >
              <span>⬇️ الإطار السفلي</span>
            </button>
            <button
              type="button"
              onClick={() => updateSetting(targetScope, 'borderLeft', currentSettings.borderLeft === false ? true : false)}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-between ${
                currentSettings.borderLeft !== false
                  ? 'bg-brand-gold/20 text-brand-goldLight border border-brand-gold/60 shadow-sm'
                  : 'bg-black/60 text-slate-500 border border-white/5 line-through'
              }`}
            >
              <span>⬅️ الإطار الأيسر</span>
            </button>
            <button
              type="button"
              onClick={() => updateSetting(targetScope, 'borderRight', currentSettings.borderRight === false ? true : false)}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-between ${
                currentSettings.borderRight !== false
                  ? 'bg-brand-gold/20 text-brand-goldLight border border-brand-gold/60 shadow-sm'
                  : 'bg-black/60 text-slate-500 border border-white/5 line-through'
              }`}
            >
              <span>➡️ الإطار الأيمن</span>
            </button>
          </div>
        </div>

        {/* Corner Style */}
        <div>
          <label className="text-[11px] text-gray-300 font-semibold block mb-1.5">
            زخرفة زوايا الإطار:
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'royal', label: '✨ أندلسية ملكية' },
              { id: 'geometric', label: '📐 هندسية فاخرة' },
              { id: 'none', label: 'خطوط مستقيمة' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => updateSetting(targetScope, 'borderCornerStyle', st.id)}
                className={`py-1.5 px-1 rounded-lg text-[10.5px] font-bold transition flex items-center justify-center text-center ${
                  (currentSettings.borderCornerStyle || 'royal') === st.id
                    ? 'bg-brand-gold text-black shadow-md'
                    : 'bg-black/60 text-slate-400 border border-white/10 hover:text-white'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Border Width & Opacity */}
        <div className="pt-2 border-t border-white/10 space-y-3 mt-2">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] text-gray-300 font-semibold">سماكة الإطار (Border Width):</span>
              <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/30">
                {currentSettings.borderWidth !== undefined ? currentSettings.borderWidth : 1.5}px
              </span>
            </div>
            <input
              type="range" min="0" max="10" step="0.1" className="control-slider"
              value={currentSettings.borderWidth !== undefined ? currentSettings.borderWidth : 1.5}
              onChange={(e) => updateSetting(targetScope, 'borderWidth', parseFloat(e.target.value))}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] text-gray-300 font-semibold">شفافية الإطار (Border Opacity):</span>
              <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/30">
                {currentSettings.borderOpacity !== undefined ? currentSettings.borderOpacity : 85}%
              </span>
            </div>
            <input
              type="range" min="0" max="100" step="1" className="control-slider"
              value={currentSettings.borderOpacity !== undefined ? currentSettings.borderOpacity : 85}
              onChange={(e) => updateSetting(targetScope, 'borderOpacity', parseFloat(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* 8. QR Codes Management Section */}
      <div className="control-group bg-black/40 p-3 rounded-xl border border-white/5 space-y-3">
        <h3 className="text-xs font-bold text-brand-goldLight flex items-center justify-between border-b border-white/10 pb-1.5">
          <span className="flex items-center gap-1.5">
            <QrCode className="w-3.5 h-3.5 text-brand-gold" />
            رموز الباركود (QR Codes)
          </span>
          <button
            type="button"
            onClick={() => updateSetting('global', 'showQrCodes', currentSettings.showQrCodes === false ? true : false)}
            className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
              currentSettings.showQrCodes !== false
                ? 'bg-brand-green/70 text-brand-accent border border-brand-accent/40'
                : 'bg-black/60 text-gray-400 border border-white/10'
            }`}
          >
            {currentSettings.showQrCodes !== false ? '✓ مفعّل' : 'معطّل'}
          </button>
        </h3>

        <div className="space-y-2.5 pt-1">
          {/* Custom QR Code Size and Color Settings */}
          {targetScope === 'global' && (
            <div className="grid grid-cols-2 gap-3 mb-3 p-2 bg-black/60 rounded-lg border border-brand-gold/20">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] text-gray-300 font-semibold">حجم الباركود:</span>
                  <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/30">
                    {currentSettings.qrCodeSize || 68}px
                  </span>
                </div>
                <input
                  type="range" min="40" max="150" step="1" className="control-slider"
                  value={currentSettings.qrCodeSize || 68}
                  onChange={(e) => updateSetting('global', 'qrCodeSize', Number(e.target.value))}
                />
              </div>
              <div>
                <label className="text-[11px] text-gray-300 font-semibold block mb-1">لون الباركود:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentSettings.qrCodeColor || '#050a07'}
                    onChange={(e) => updateSetting('global', 'qrCodeColor', e.target.value)}
                    className="w-8 h-8 cursor-pointer rounded border-0 bg-transparent p-0"
                  />
                  <span className="text-[10px] text-brand-goldLight font-mono uppercase">
                    {currentSettings.qrCodeColor || '#050a07'}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {(currentSettings.qrCodes || DEFAULT_SETTINGS.qrCodes).map((qr, idx) => {
            const icons = ['🌐', '⭐', '💬'];
            const labels = ['الموقع', 'جوجل', 'الواتساب'];

            return (
              <div key={qr.id || idx} className="bg-black/70 p-2.5 rounded-lg border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white flex items-center gap-1">
                    <span>{icons[idx]}</span>
                    <span>{labels[idx]}</span>
                  </span>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 font-semibold block mb-0.5">العنوان:</label>
                  <input
                    type="text"
                    value={qr.title || ''}
                    onChange={(e) => {
                      const updated = [...(currentSettings.qrCodes || DEFAULT_SETTINGS.qrCodes)];
                      updated[idx] = { ...updated[idx], title: e.target.value };
                      updateSetting('global', 'qrCodes', updated);
                    }}
                    className="cms-input text-[11px] py-1 m-0 font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 font-semibold block mb-0.5">الرابط:</label>
                  <input
                    type="url"
                    value={qr.url || ''}
                    onChange={(e) => {
                      const updated = [...(currentSettings.qrCodes || DEFAULT_SETTINGS.qrCodes)];
                      updated[idx] = { ...updated[idx], url: e.target.value };
                      updateSetting('global', 'qrCodes', updated);
                    }}
                    className="cms-input text-[11px] py-1 m-0 font-mono text-brand-goldLight"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TypographySettings;
