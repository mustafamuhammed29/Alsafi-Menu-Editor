import React, { useState } from 'react';
import { Move, Camera, RotateCcw, Globe } from 'lucide-react';
import { useMenu, normalizeImage } from '../../../context/MenuContext';
import { optimizeImageFile } from '../../../utils/imageOptimizer';

const ArchSettings = ({ targetScope }) => {
  const { pages, globalSettings, pageOverrides, updateSetting, updateImageTransform, resetImageTransform, updatePageImage } = useMenu();
  const [selectedImagePageIdx, setSelectedImagePageIdx] = useState(0);
  const [selectedImageSlot, setSelectedImageSlot] = useState(0);

  const currentSettings =
    targetScope === 'global'
      ? globalSettings
      : { ...globalSettings, ...(pageOverrides[targetScope] || {}) };

  return (
    <div className="space-y-4">
      {/* 2.5. Flexible Arch & Dividing Line Controls */}
      <div className="control-group bg-black/40 p-3 rounded-xl border border-white/5 space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
          <h3 className="text-xs font-bold text-brand-goldLight flex items-center gap-1.5">
            <Move className="w-3.5 h-3.5 text-brand-gold" />
            <span>التحكم بالخط الفاصل وقوس الصور الجانبي</span>
          </h3>
          <span className="text-[10px] text-brand-accent font-semibold bg-brand-green/30 border border-brand-accent/30 px-2 py-0.5 rounded-full">
            {targetScope === 'global' ? '🌐 عام (كل الصفحات)' : `📄 صفحة ${targetScope.replace('page', '')} فقط`}
          </span>
        </div>

        <p className="text-[10.5px] text-slate-300 leading-relaxed">
          تحكم بمرونة كاملة في شكل وانحناءة وعرض الخط الفاصل الجانبي لفسح أكبر مساحة ممكنة لنصوص وأسعار الأطباق على الجانب الآخر عند التكبير.
        </p>

        {/* Arch Style Presets */}
        <div className="space-y-1.5">
          <label className="text-[10.5px] text-gray-300 font-semibold block">
            تصميم وشكل الخط الفاصل الجاهز:
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: 'classic', label: '⚜️ انحناءة ملكية (كلاسيك)', desc: 'تقوس الصافي الانسيابي الفاخر', depth: 110, width: 280 },
              { id: 'subtle', label: '🌿 انحناءة خفيفة (مساحة واسعة)', desc: 'تقوس خفيف لفسح المجال للنصوص', depth: 45, width: 240 },
              { id: 'straight', label: '📏 خط مستقيم حديث', desc: 'فاصل رأسي مستقيم وأنيق', depth: 0, width: 230 },
              { id: 'wave', label: '🌊 موجة انسيابية مزدوجة', desc: 'تقوس عصري متعرج', depth: 95, width: 260 },
            ].map((preset) => {
              const isSelected = (currentSettings.archStyle || 'classic') === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    updateSetting(targetScope, 'archStyle', preset.id);
                    updateSetting(targetScope, 'archCurveDepth', preset.depth);
                    updateSetting(targetScope, 'archWidth', preset.width);
                  }}
                  className={`p-2 rounded-lg border text-right transition flex flex-col gap-0.5 ${
                    isSelected
                      ? 'bg-brand-gold/20 border-brand-gold text-white shadow-md'
                      : 'bg-black/60 border-white/10 hover:border-brand-gold/40 text-slate-300'
                  }`}
                >
                  <span className={`text-[11px] font-bold ${isSelected ? 'text-brand-gold' : 'text-slate-200'}`}>
                    {preset.label}
                  </span>
                  <span className="text-[9px] text-slate-400">
                    {preset.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Arch Total Width Slider */}
        <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-gray-200 font-semibold flex items-center gap-1">
              <span>↔️</span>
              <span>عرض عمود الصور (Arch Width):</span>
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/80 px-1.5 py-0.5 rounded border border-brand-gold/40">
                {currentSettings.archWidth !== undefined ? currentSettings.archWidth : 280}px
              </span>
            </div>
          </div>
          <input
            type="range"
            min="120"
            max="420"
            step="5"
            className="control-slider"
            value={currentSettings.archWidth !== undefined ? currentSettings.archWidth : 280}
            onChange={(e) => updateSetting(targetScope, 'archWidth', Number(e.target.value))}
          />
        </div>

        {/* Arch Curve Inward Depth Slider */}
        <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-gray-200 font-semibold flex items-center gap-1">
              <span>🌀</span>
              <span>عمق التقوس الداخلي:</span>
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/80 px-1.5 py-0.5 rounded border border-brand-gold/40">
                {currentSettings.archCurveDepth !== undefined ? currentSettings.archCurveDepth : 110}px
              </span>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="200"
            step="5"
            className="control-slider"
            value={currentSettings.archCurveDepth !== undefined ? currentSettings.archCurveDepth : 110}
            onChange={(e) => updateSetting(targetScope, 'archCurveDepth', Number(e.target.value))}
          />
        </div>

        {/* Arch Waist Vertical Height Y Slider */}
        <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-gray-200 font-semibold flex items-center gap-1">
              <span>↕️</span>
              <span>موضع خصر التقوس الرأسي:</span>
            </span>
            <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/80 px-1.5 py-0.5 rounded border border-brand-gold/40">
              {currentSettings.archWaistY !== undefined ? currentSettings.archWaistY : 560}px
            </span>
          </div>
          <input
            type="range"
            min="200"
            max="900"
            step="10"
            className="control-slider"
            value={currentSettings.archWaistY !== undefined ? currentSettings.archWaistY : 560}
            onChange={(e) => updateSetting(targetScope, 'archWaistY', Number(e.target.value))}
          />
        </div>

        {/* Arch Bottom Spread Offset Slider */}
        <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-gray-200 font-semibold flex items-center gap-1">
              <span>📐</span>
              <span>اتساع القوس في الأسفل:</span>
            </span>
            <span className="text-[11px] text-brand-gold font-mono font-bold bg-black/80 px-1.5 py-0.5 rounded border border-brand-gold/40">
              {currentSettings.archBottomOffset !== undefined ? currentSettings.archBottomOffset : 10}px
            </span>
          </div>
          <input
            type="range"
            min="-100"
            max="100"
            step="5"
            className="control-slider"
            value={currentSettings.archBottomOffset !== undefined ? currentSettings.archBottomOffset : 10}
            onChange={(e) => updateSetting(targetScope, 'archBottomOffset', Number(e.target.value))}
          />
        </div>

        {/* Stroke Width & Styling */}
        <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-gray-200 font-semibold">سماكة الخط الفاصل:</span>
            <label className="text-[10px] text-gray-300 flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={currentSettings.showArchBorder !== false}
                onChange={(e) => updateSetting(targetScope, 'showArchBorder', e.target.checked)}
                className="rounded border-brand-gold/50 text-brand-gold focus:ring-0"
              />
              <span>إظهار الخط الفاصل</span>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between text-[10px] text-gray-300 mb-1">
                <span>الخط الذهبي الخارجي:</span>
                <span className="font-mono text-brand-gold font-bold">
                  {currentSettings.archBorderWidth !== undefined ? currentSettings.archBorderWidth : 1.5}px
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                step="0.5"
                className="control-slider"
                value={currentSettings.archBorderWidth !== undefined ? currentSettings.archBorderWidth : 1.5}
                onChange={(e) => updateSetting(targetScope, 'archBorderWidth', Number(e.target.value))}
              />
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-gray-300 mb-1">
                <span>الخط الأخضر الداخلي:</span>
                <span className="font-mono text-green-400 font-bold">
                  {currentSettings.archInnerBorderWidth !== undefined ? currentSettings.archInnerBorderWidth : 3}px
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="0.5"
                className="control-slider"
                value={currentSettings.archInnerBorderWidth !== undefined ? currentSettings.archInnerBorderWidth : 3}
                onChange={(e) => updateSetting(targetScope, 'archInnerBorderWidth', Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Photo Blend Mode */}
        <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-1.5">
          <label className="text-[11px] text-gray-200 font-semibold block">
            طريقة اتصال ودمج الصورتين (Photo Blend Mode):
          </label>
          <div className="grid grid-cols-3 gap-1">
            {[
              { id: 'smooth', label: '🌟 انسيابي' },
              { id: 'sharp', label: '✂️ حد فاصل' },
              { id: 'vignette', label: '🌫️ تدرج ناعم' },
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => updateSetting(targetScope, 'photoBlend', mode.id)}
                className={`py-1 px-1 rounded text-[9.5px] font-semibold transition text-center truncate ${
                  (currentSettings.photoBlend || 'smooth') === mode.id
                    ? 'bg-brand-gold text-black font-bold'
                    : 'bg-black/80 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Button for Arch */}
        <button
          type="button"
          onClick={() => {
            updateSetting(targetScope, 'archWidth', 280);
            updateSetting(targetScope, 'archCurveDepth', 110);
            updateSetting(targetScope, 'archWaistY', 560);
            updateSetting(targetScope, 'archBottomOffset', 10);
            updateSetting(targetScope, 'archStyle', 'classic');
            updateSetting(targetScope, 'archBorderWidth', 1.5);
            updateSetting(targetScope, 'archInnerBorderWidth', 3);
            updateSetting(targetScope, 'showArchBorder', true);
          }}
          className="w-full py-1.5 bg-black/60 hover:bg-white/10 border border-white/10 rounded-lg text-[10.5px] font-semibold text-gray-300 hover:text-white transition flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3 h-3 text-brand-gold" />
          <span>استرجاع شكل القوس الافتراضي</span>
        </button>
      </div>

      {/* 2.6. Food Photos Position, Zoom & Transform Controls */}
      <div className="control-group bg-black/40 p-3 rounded-xl border border-white/5 space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
          <h3 className="text-xs font-bold text-brand-goldLight flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-brand-gold" />
            <span>التحكم بموضع وتكبير صور الأطباق</span>
          </h3>
          <span className="text-[10px] text-brand-accent font-semibold bg-brand-green/30 border border-brand-accent/30 px-2 py-0.5 rounded-full">
            📄 صفحة {selectedImagePageIdx + 1}
          </span>
        </div>

        {/* Page Selector */}
        <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label className="text-[11px] text-gray-200 font-bold flex items-center gap-1 shrink-0">
              <Globe className="w-3.5 h-3.5 text-brand-gold" />
              <span>اختر الصفحة:</span>
            </label>
            <select
              className="bg-black/80 border border-white/15 rounded-lg px-2 py-1 text-xs text-white focus:border-brand-gold outline-none flex-1 max-w-[220px]"
              value={selectedImagePageIdx}
              onChange={(e) => setSelectedImagePageIdx(Number(e.target.value))}
            >
              {pages.map((p, idx) => (
                <option key={p.id} value={idx}>
                  {p.pageNumber} · {p.header?.title ? p.header.title.split('\n')[0] : `صفحة ${idx + 1}`}
                </option>
              ))}
            </select>
          </div>

          {/* Photo Slot Selector */}
          {(() => {
            const pageObj = pages[selectedImagePageIdx] || pages[0];
            const pageImages = pageObj?.images || [];
            if (pageImages.length === 0) {
              return (
                <p className="text-center text-xs text-slate-400 py-3">
                  لا توجد صور جانبية في هذه الصفحة.
                </p>
              );
            }

            const currentImg = pageImages[selectedImageSlot] || pageImages[0];
            const norm = normalizeImage(currentImg, selectedImageSlot);
            const curPosY = norm.posY !== undefined ? norm.posY : (selectedImageSlot === 0 ? 68 : 30);
            const curPosX = norm.posX !== undefined ? norm.posX : 50;
            const curScale = norm.scale !== undefined ? norm.scale : 1.25;

            return (
              <div className="space-y-3 pt-2">
                {/* Slot Tabs */}
                <div className="grid grid-cols-2 gap-2">
                  {pageImages.map((img, slotIdx) => {
                    const slotNorm = normalizeImage(img, slotIdx);
                    const isSelected = selectedImageSlot === slotIdx;
                    return (
                      <button
                        key={slotIdx}
                        type="button"
                        onClick={() => setSelectedImageSlot(slotIdx)}
                        className={`p-2 rounded-xl border text-right transition flex items-center gap-2 ${
                          isSelected
                            ? 'bg-brand-gold/20 border-brand-gold text-white shadow-md'
                            : 'bg-black/70 border-white/10 hover:border-brand-gold/40 text-slate-300'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/20 bg-black shrink-0">
                          <img
                            src={slotNorm.url}
                            alt=""
                            className="w-full h-full object-cover"
                            style={{
                              objectPosition: `${slotNorm.posX || 50}% ${slotNorm.posY || 50}%`,
                              transform: `scale(${slotNorm.scale || 1})`,
                            }}
                          />
                        </div>
                        <div className="overflow-hidden">
                          <span className={`text-[11px] font-bold block ${isSelected ? 'text-brand-gold' : 'text-slate-200'}`}>
                            {slotIdx === 0 ? '🍲 العلوية (1)' : '🥗 السفلية (2)'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Adjustment Sliders for Selected Photo */}
                <div className="bg-black/80 p-3 rounded-xl border border-brand-gold/30 space-y-3">
                  <div>
                    <div className="flex justify-between text-[11px] text-gray-200 font-semibold mb-1">
                      <span>↕️ الموضع الرأسي (أعلى / أسفل):</span>
                      <span className="font-mono text-brand-gold font-bold">{curPosY}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      className="control-slider"
                      value={curPosY}
                      onChange={(e) => updateImageTransform(selectedImagePageIdx, selectedImageSlot, { posY: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-gray-200 font-semibold mb-1">
                      <span>↔️ الموضع الأفقي (يمين / يسار):</span>
                      <span className="font-mono text-brand-gold font-bold">{curPosX}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      className="control-slider"
                      value={curPosX}
                      onChange={(e) => updateImageTransform(selectedImagePageIdx, selectedImageSlot, { posX: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-gray-200 font-semibold mb-1">
                      <span>🔍 مستوى التكبير والزووم:</span>
                      <span className="font-mono text-brand-gold font-bold">{curScale.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min="1.0"
                      max="3.0"
                      step="0.05"
                      className="control-slider"
                      value={curScale}
                      onChange={(e) => updateImageTransform(selectedImagePageIdx, selectedImageSlot, { scale: Number(e.target.value) })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10">
                    <label className="py-1.5 px-2 bg-brand-gold hover:bg-brand-goldLight text-black rounded-lg text-[10.5px] font-bold transition flex items-center justify-center gap-1 cursor-pointer shadow-sm">
                      <Camera className="w-3.5 h-3.5" />
                      <span>رفع صورة جديدة</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (file) {
                            try {
                              const opt = await optimizeImageFile(file, 1200, 1600, 0.88);
                              updatePageImage(selectedImagePageIdx, selectedImageSlot, opt);
                            } catch {
                              const r = new FileReader();
                              r.onload = (ev) => updatePageImage(selectedImagePageIdx, selectedImageSlot, ev.target.result);
                              r.readAsDataURL(file);
                            }
                          }
                        }}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => resetImageTransform(selectedImagePageIdx, selectedImageSlot)}
                      className="py-1.5 px-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[10.5px] font-semibold transition flex items-center justify-center gap-1 border border-white/15"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-brand-gold" />
                      <span>إعادة ضبط המوضع</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default ArchSettings;
