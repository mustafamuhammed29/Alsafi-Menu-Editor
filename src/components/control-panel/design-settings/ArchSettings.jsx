import React, { useState } from 'react';
import { Move, Camera, RotateCcw, Globe, FlipHorizontal, FlipVertical, Sun, Sparkles } from 'lucide-react';
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
                <span>الخط الليموني الخارجي:</span>
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
            const curScale = typeof norm.scale === 'number' ? Math.min(4.0, Math.max(0.2, norm.scale)) : 1.0;

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
                              transform: `scale(${slotNorm.scale || 1}) ${slotNorm.flipX ? 'scaleX(-1)' : ''} ${slotNorm.flipY ? 'scaleY(-1)' : ''}`,
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

                {/* Frame Size Controls (Height, Width & Presets for the 2 Arched Images) */}
                {(() => {
                  const selectedScope = `page${selectedImagePageIdx + 1}`;
                  const activeScope = targetScope !== 'global' ? targetScope : selectedScope;
                  const activeScopeSettings = { ...globalSettings, ...(pageOverrides[activeScope] || {}) };
                  const currentHeight = activeScopeSettings.twoColumnImageHeight || 245;
                  const currentWidth = activeScopeSettings.twoColumnImageWidth !== undefined ? activeScopeSettings.twoColumnImageWidth : 100;

                  return (
                    <div className="bg-gradient-to-r from-black/90 via-brand-gold/15 to-black/90 p-3 rounded-xl border border-brand-gold/50 shadow-md space-y-2.5">
                      <div className="flex justify-between items-center text-[11.5px] text-brand-goldLight font-bold">
                        <span className="flex items-center gap-1.5">
                          <span>📐</span>
                          <span>أبعاد وحجم إطاري الصورتين (Frame Size):</span>
                        </span>
                        <span className="text-[10px] text-brand-gold font-mono font-bold bg-black/80 px-2 py-0.5 rounded border border-brand-gold/40">
                          صفحة {selectedImagePageIdx + 1}
                        </span>
                      </div>

                      {/* Frame Height */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[10.5px] text-gray-200 font-semibold">
                          <span>طول الإطار (ارتفاع الصورتين):</span>
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              min="80"
                              max="450"
                              step="5"
                              className="w-16 bg-black border border-brand-gold/70 text-brand-gold text-center text-[11px] font-mono font-bold rounded py-0.5 outline-none focus:ring-1 focus:ring-brand-gold"
                              value={currentHeight}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                updateSetting(activeScope, 'twoColumnImageHeight', val);
                                if (targetScope === 'global') updateSetting('global', 'twoColumnImageHeight', val);
                              }}
                            />
                            <span className="text-[10px] text-gray-400 font-bold">px</span>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="80"
                          max="450"
                          step="5"
                          className="control-slider w-full"
                          value={currentHeight}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            updateSetting(activeScope, 'twoColumnImageHeight', val);
                            if (targetScope === 'global') updateSetting('global', 'twoColumnImageHeight', val);
                          }}
                        />
                        {/* Quick Presets for Height */}
                        <div className="grid grid-cols-4 gap-1 pt-0.5">
                          {[
                            { label: 'عادي (200px)', val: 200 },
                            { label: 'متوسط (245px)', val: 245 },
                            { label: 'كبير (300px)', val: 300 },
                            { label: 'كبير جداً (360px)', val: 360 },
                          ].map((preset) => (
                            <button
                              key={preset.val}
                              type="button"
                              onClick={() => {
                                updateSetting(activeScope, 'twoColumnImageHeight', preset.val);
                                if (targetScope === 'global') updateSetting('global', 'twoColumnImageHeight', preset.val);
                              }}
                              className={`py-1 text-[9.5px] font-bold rounded transition border ${
                                currentHeight === preset.val
                                  ? 'bg-brand-gold text-black border-brand-gold shadow'
                                  : 'bg-black/70 text-gray-300 border-white/10 hover:bg-white/10'
                              }`}
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Frame Width */}
                      <div className="space-y-1 pt-1.5 border-t border-white/10">
                        <div className="flex justify-between items-center text-[10.5px] text-gray-200 font-semibold">
                          <span>عرض إطار الصورتين:</span>
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              min="50"
                              max="100"
                              step="1"
                              className="w-14 bg-black border border-brand-gold/70 text-brand-gold text-center text-[11px] font-mono font-bold rounded py-0.5 outline-none focus:ring-1 focus:ring-brand-gold"
                              value={currentWidth}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                updateSetting(activeScope, 'twoColumnImageWidth', val);
                                if (targetScope === 'global') updateSetting('global', 'twoColumnImageWidth', val);
                              }}
                            />
                            <span className="text-[10px] text-gray-400 font-bold">%</span>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="100"
                          step="1"
                          className="control-slider w-full"
                          value={currentWidth}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            updateSetting(activeScope, 'twoColumnImageWidth', val);
                            if (targetScope === 'global') updateSetting('global', 'twoColumnImageWidth', val);
                          }}
                        />
                      </div>
                    </div>
                  );
                })()}

                {/* Adjustment Sliders for Selected Photo */}
                <div className="bg-black/80 p-3 rounded-xl border border-brand-gold/30 space-y-3">
                  {/* Zoom / Scale Section */}
                  <div className="space-y-1.5 bg-black/60 p-2.5 rounded-lg border border-brand-gold/30">
                    <div className="flex justify-between items-center text-[11px] text-gray-200 font-semibold">
                      <span className="flex items-center gap-1">
                        <span>🔍</span>
                        <span>مستوى التكبير والتصغير (Zoom & Scale):</span>
                      </span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="20"
                          max="400"
                          step="5"
                          className="w-14 bg-black border border-brand-gold/70 text-brand-gold text-center text-[11px] font-mono font-bold rounded py-0.5 outline-none focus:ring-1 focus:ring-brand-gold"
                          value={Math.round(curScale * 100)}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (!isNaN(val)) {
                              updateImageTransform(selectedImagePageIdx, selectedImageSlot, {
                                scale: Math.min(4.0, Math.max(0.2, val / 100)),
                              });
                            }
                          }}
                        />
                        <span className="text-[10px] text-gray-400 font-bold">%</span>
                      </div>
                    </div>

                    {/* Quick Presets */}
                    <div className="grid grid-cols-6 gap-1 pt-0.5">
                      {[
                        { label: '50%', val: 0.5 },
                        { label: '75%', val: 0.75 },
                        { label: '100%', val: 1.0 },
                        { label: '125%', val: 1.25 },
                        { label: '150%', val: 1.5 },
                        { label: '200%', val: 2.0 },
                      ].map((chip) => (
                        <button
                          key={chip.label}
                          type="button"
                          onClick={() =>
                            updateImageTransform(selectedImagePageIdx, selectedImageSlot, {
                              scale: chip.val,
                            })
                          }
                          className={`py-0.5 text-[9.5px] font-mono font-bold rounded transition border ${
                            Math.abs(curScale - chip.val) < 0.04
                              ? 'bg-brand-gold text-black border-brand-gold shadow-sm'
                              : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/15'
                          }`}
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>

                    {/* Slider with - / + buttons */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() =>
                          updateImageTransform(selectedImagePageIdx, selectedImageSlot, {
                            scale: Math.min(4.0, Math.max(0.2, parseFloat((curScale - 0.1).toFixed(2)))),
                          })
                        }
                        className="w-6 h-6 rounded bg-black/80 hover:bg-brand-gold hover:text-black border border-brand-gold/40 flex items-center justify-center text-xs text-brand-goldLight transition shadow-sm font-bold shrink-0"
                        title="تصغير (-10%)"
                      >
                        -
                      </button>
                      <input
                        type="range"
                        min="0.2"
                        max="4.0"
                        step="0.02"
                        className="control-slider flex-1"
                        value={curScale}
                        onChange={(e) => updateImageTransform(selectedImagePageIdx, selectedImageSlot, { scale: Number(e.target.value) })}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateImageTransform(selectedImagePageIdx, selectedImageSlot, {
                            scale: Math.min(4.0, Math.max(0.2, parseFloat((curScale + 0.1).toFixed(2)))),
                          })
                        }
                        className="w-6 h-6 rounded bg-black/80 hover:bg-brand-gold hover:text-black border border-brand-gold/40 flex items-center justify-center text-xs text-brand-goldLight transition shadow-sm font-bold shrink-0"
                        title="تكبير (+10%)"
                      >
                        +
                      </button>
                    </div>

                    {/* Fit / Cover Quick Modes */}
                    <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() =>
                          updateImageTransform(selectedImagePageIdx, selectedImageSlot, {
                            scale: 0.75,
                            posX: 50,
                            posY: 50,
                          })
                        }
                        className="py-1 px-1.5 bg-white/10 hover:bg-brand-gold hover:text-black text-brand-goldLight rounded text-[10px] font-bold transition border border-white/10 flex items-center justify-center gap-1"
                        title="احتواء كامل الصحن"
                      >
                        <span>🍽️ احتواء كامل (75%)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateImageTransform(selectedImagePageIdx, selectedImageSlot, {
                            scale: 1.25,
                            posX: 50,
                            posY: selectedImageSlot === 0 ? 68 : 30,
                          })
                        }
                        className="py-1 px-1.5 bg-white/10 hover:bg-brand-gold hover:text-black text-brand-goldLight rounded text-[10px] font-bold transition border border-white/10 flex items-center justify-center gap-1"
                        title="تعبئة الإطار"
                      >
                        <span>🖼️ تعبئة الإطار (125%)</span>
                      </button>
                    </div>
                  </div>

                  {/* Flips Options (Horizontal & Vertical) */}
                  <div className="grid grid-cols-2 gap-2 bg-black/60 p-2.5 rounded-lg border border-white/10 text-[11px] text-gray-200">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold flex items-center gap-1">
                        <FlipHorizontal className="w-3.5 h-3.5 text-brand-gold" />
                        <span>أفقي:</span>
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateImageTransform(selectedImagePageIdx, selectedImageSlot, {
                            flipX: !norm.flipX,
                          })
                        }
                        className={`px-2 py-1 rounded text-[9.5px] font-bold transition border flex items-center gap-1 ${
                          norm.flipX
                            ? 'bg-brand-gold text-black border-brand-gold shadow'
                            : 'bg-white/10 text-brand-goldLight border-white/20 hover:bg-white/20'
                        }`}
                      >
                        <FlipHorizontal className="w-3 h-3" />
                        <span>{norm.flipX ? 'مقلوب' : 'عادي'}</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold flex items-center gap-1">
                        <FlipVertical className="w-3.5 h-3.5 text-brand-gold" />
                        <span>رأسي:</span>
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateImageTransform(selectedImagePageIdx, selectedImageSlot, {
                            flipY: !norm.flipY,
                          })
                        }
                        className={`px-2 py-1 rounded text-[9.5px] font-bold transition border flex items-center gap-1 ${
                          norm.flipY
                            ? 'bg-brand-gold text-black border-brand-gold shadow'
                            : 'bg-white/10 text-brand-goldLight border-white/20 hover:bg-white/20'
                        }`}
                      >
                        <FlipVertical className="w-3 h-3" />
                        <span>{norm.flipY ? 'مقلوب' : 'عادي'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Vertical Y */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] text-gray-200 font-semibold">
                      <span>↕️ الموضع الرأسي (أعلى / أسفل):</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="1"
                          className="w-12 bg-black border border-white/20 text-brand-gold text-center text-[10px] font-mono font-bold rounded py-0.5"
                          value={curPosY}
                          onChange={(e) => updateImageTransform(selectedImagePageIdx, selectedImageSlot, { posY: Number(e.target.value) })}
                        />
                        <span className="text-[9px] text-gray-400 font-bold">%</span>
                      </div>
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

                  {/* Horizontal X */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] text-gray-200 font-semibold">
                      <span>↔️ الموضع الأفقي (يمين / يسار):</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="1"
                          className="w-12 bg-black border border-white/20 text-brand-gold text-center text-[10px] font-mono font-bold rounded py-0.5"
                          value={curPosX}
                          onChange={(e) => updateImageTransform(selectedImagePageIdx, selectedImageSlot, { posX: Number(e.target.value) })}
                        />
                        <span className="text-[9px] text-gray-400 font-bold">%</span>
                      </div>
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

                  {/* Filter Removal & Clarity Notification Badge */}
                  <div className="bg-brand-green/20 border border-brand-accent/40 rounded-xl p-2 flex items-center gap-2 text-[10.5px] text-slate-200 shadow-sm">
                    <Sparkles className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>تم إزالة أي تظليل داكن أو فلتر من فوق مكان الصور لتعرض الصور بأعلى دقة ونقاء 100%.</span>
                  </div>

                  {/* Photo Brightness & Lighting Boost Section */}
                  <div className="bg-gradient-to-b from-black/80 to-black/60 p-3 rounded-xl border border-brand-gold/40 space-y-2.5 shadow-inner">
                    <div className="flex justify-between items-center text-[11px] text-gray-200 font-bold">
                      <span className="flex items-center gap-1.5 text-brand-goldLight">
                        <Sun className="w-4 h-4 text-yellow-400 animate-pulse" />
                        <span>💡 رفع وتعديل إضاءة هذه الصورة (Brightness):</span>
                      </span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="50"
                          max="200"
                          step="5"
                          className="w-14 bg-black border border-brand-gold/70 text-brand-gold text-center text-[11px] font-mono font-bold rounded py-0.5 outline-none focus:ring-1 focus:ring-brand-gold"
                          value={norm.brightness !== undefined ? norm.brightness : 100}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (!isNaN(val)) {
                              updateImageTransform(selectedImagePageIdx, selectedImageSlot, {
                                brightness: Math.min(200, Math.max(50, val)),
                              });
                            }
                          }}
                        />
                        <span className="text-[10px] text-gray-400 font-bold">%</span>
                      </div>
                    </div>

                    {/* Quick Brightness Chips */}
                    <div className="grid grid-cols-5 gap-1">
                      {[
                        { label: '100% عادي', val: 100 },
                        { label: '115% طباعة', val: 115 },
                        { label: '130% ساطع', val: 130 },
                        { label: '150% قوي ✨', val: 150 },
                        { label: '175% أقصى ⚡', val: 175 },
                      ].map((chip) => (
                        <button
                          key={chip.val}
                          type="button"
                          onClick={() =>
                            updateImageTransform(selectedImagePageIdx, selectedImageSlot, {
                              brightness: chip.val,
                            })
                          }
                          className={`py-1 text-[9px] font-mono font-bold rounded transition border ${
                            (norm.brightness !== undefined ? norm.brightness : 100) === chip.val
                              ? 'bg-brand-gold text-black border-brand-gold shadow-sm'
                              : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/15'
                          }`}
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>

                    <input
                      type="range"
                      min="50"
                      max="200"
                      step="5"
                      className="control-slider w-full"
                      value={norm.brightness !== undefined ? norm.brightness : 100}
                      onChange={(e) =>
                        updateImageTransform(selectedImagePageIdx, selectedImageSlot, {
                          brightness: Number(e.target.value),
                        })
                      }
                    />

                    {/* Contrast Control Slider */}
                    <div className="pt-2 border-t border-white/10 space-y-1.5">
                      <div className="flex justify-between items-center text-[10.5px] text-gray-300 font-semibold">
                        <span>🌓 تباين ووضوح الصورة (Contrast):</span>
                        <span className="text-[10px] text-brand-gold font-mono font-bold bg-black px-1.5 py-0.5 rounded border border-brand-gold/30">
                          {norm.contrast !== undefined ? norm.contrast : 100}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="60"
                        max="180"
                        step="5"
                        className="control-slider w-full"
                        value={norm.contrast !== undefined ? norm.contrast : 100}
                        onChange={(e) =>
                          updateImageTransform(selectedImagePageIdx, selectedImageSlot, {
                            contrast: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Quick Upload & Reset */}
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
                      title="إعادة ضبط الموضع والتكبير (100%)"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-brand-gold" />
                      <span>إعادة ضبط (100%)</span>
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
