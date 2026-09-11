import React, { useState } from 'react';
import { Camera, RotateCcw, FlipHorizontal, FlipVertical } from 'lucide-react';
import { useMenu, normalizeImage } from '../../../context/MenuContext';
import { optimizeImageFile } from '../../../utils/imageOptimizer';

const PageImageControls = ({ editPageIdx, pageImages }) => {
  const { updateImageTransform, resetImageTransform, updatePageImage, pageSettings, updateSetting } = useMenu();
  const [showPhotoControls, setShowPhotoControls] = useState(false);
  const [selectedImgSlot, setSelectedImgSlot] = useState(0);

  const pageScope = `page${editPageIdx + 1}`;
  const curPageSettings = (pageSettings && pageSettings[pageScope]) || {};

  if (!pageImages || pageImages.length === 0) return null;

  return (
    <div className="bg-black/60 border border-brand-gold/40 rounded-xl p-2.5 space-y-2">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setShowPhotoControls(!showPhotoControls)}
          className="flex items-center gap-1.5 text-xs font-bold text-brand-goldLight hover:text-white transition"
        >
          <Camera className="w-3.5 h-3.5 text-brand-gold" />
          <span>🖼️ صور أطباق الصفحة ({pageImages.length}) - موضع وتكبير</span>
        </button>
        <button
          type="button"
          onClick={() => setShowPhotoControls(!showPhotoControls)}
          className="text-[10px] text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/30 hover:bg-brand-gold hover:text-black transition"
        >
          {showPhotoControls ? '▲ إخفاء' : '▼ تحكم بالموضع'}
        </button>
      </div>

      {showPhotoControls && (
        <div className="space-y-2.5 pt-1 border-t border-white/10">
          {/* Photo Slot Selection */}
          <div className="grid grid-cols-2 gap-2">
            {pageImages.map((img, sIdx) => {
              const sNorm = normalizeImage(img, sIdx);
              const isSel = selectedImgSlot === sIdx;
              return (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => setSelectedImgSlot(sIdx)}
                  className={`p-1.5 rounded-lg border text-right transition flex items-center gap-2 ${
                    isSel
                      ? 'bg-brand-gold/20 border-brand-gold text-white shadow-md'
                      : 'bg-black/80 border-white/10 text-slate-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded overflow-hidden border border-white/20 bg-black shrink-0">
                    <img
                      src={sNorm.url}
                      alt=""
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: `${sNorm.posX || 50}% ${sNorm.posY || 50}%`,
                        transform: `scale(${sNorm.scale || 1}) ${sNorm.flipX ? 'scaleX(-1)' : ''} ${sNorm.flipY ? 'scaleY(-1)' : ''}`,
                      }}
                    />
                  </div>
                  <div className="overflow-hidden">
                    <span className={`text-[10px] font-bold block ${isSel ? 'text-brand-gold' : 'text-slate-200'}`}>
                      {sIdx === 0 ? '🍲 الصورة العلوية' : '🥗 الصورة السفلية'}
                    </span>
                    <span className="text-[9px] text-slate-400 block font-mono">
                      Y: {sNorm.posY || 50}% · {(sNorm.scale || 1).toFixed(2)}x
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Photo Sliders */}
          {(() => {
            const curNorm = normalizeImage(pageImages[selectedImgSlot], selectedImgSlot);
            const curPosY = curNorm.posY !== undefined ? curNorm.posY : (selectedImgSlot === 0 ? 68 : 30);
            const curPosX = curNorm.posX !== undefined ? curNorm.posX : 50;
            const curScale = typeof curNorm.scale === 'number' ? Math.min(4.0, Math.max(0.2, curNorm.scale)) : 1.0;

            return (
              <div className="bg-black/80 p-3 rounded-lg border border-white/10 space-y-3 text-xs">
                {/* Zoom / Scale Section */}
                <div className="space-y-1.5 bg-black/60 p-2.5 rounded-lg border border-brand-gold/30">
                  <div className="flex justify-between items-center text-[10.5px] text-gray-200">
                    <span className="font-bold flex items-center gap-1">
                      <span>🔍</span>
                      <span>تكبير / تصغير الصورة (Zoom & Scale):</span>
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
                            updateImageTransform(editPageIdx, selectedImgSlot, {
                              scale: Math.min(4.0, Math.max(0.2, val / 100)),
                            });
                          }
                        }}
                      />
                      <span className="text-[10px] text-gray-400 font-bold">%</span>
                    </div>
                  </div>

                  {/* Quick Scale Presets */}
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
                          updateImageTransform(editPageIdx, selectedImgSlot, {
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
                        updateImageTransform(editPageIdx, selectedImgSlot, {
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
                      onChange={(e) =>
                        updateImageTransform(editPageIdx, selectedImgSlot, {
                          scale: Number(e.target.value),
                        })
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateImageTransform(editPageIdx, selectedImgSlot, {
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
                        updateImageTransform(editPageIdx, selectedImgSlot, {
                          scale: 0.75,
                          posX: 50,
                          posY: 50,
                        })
                      }
                      className="py-1 px-1.5 bg-white/10 hover:bg-brand-gold hover:text-black text-brand-goldLight rounded text-[10px] font-bold transition border border-white/10 flex items-center justify-center gap-1"
                      title="تصغير الطبق لاحتواء كامل الصحن داخل الإطار"
                    >
                      <span>🍽️ احتواء كامل (75%)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        updateImageTransform(editPageIdx, selectedImgSlot, {
                          scale: 1.25,
                          posX: 50,
                          posY: selectedImgSlot === 0 ? 68 : 30,
                        })
                      }
                      className="py-1 px-1.5 bg-white/10 hover:bg-brand-gold hover:text-black text-brand-goldLight rounded text-[10px] font-bold transition border border-white/10 flex items-center justify-center gap-1"
                      title="ملء الإطار بالكامل"
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
                        updateImageTransform(editPageIdx, selectedImgSlot, {
                          flipX: !curNorm.flipX,
                        })
                      }
                      className={`px-2 py-1 rounded text-[9.5px] font-bold transition border flex items-center gap-1 ${
                        curNorm.flipX
                          ? 'bg-brand-gold text-black border-brand-gold shadow'
                          : 'bg-white/10 text-brand-goldLight border-white/20 hover:bg-white/20'
                      }`}
                    >
                      <FlipHorizontal className="w-3 h-3" />
                      <span>{curNorm.flipX ? 'مقلوب' : 'عادي'}</span>
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
                        updateImageTransform(editPageIdx, selectedImgSlot, {
                          flipY: !curNorm.flipY,
                        })
                      }
                      className={`px-2 py-1 rounded text-[9.5px] font-bold transition border flex items-center gap-1 ${
                        curNorm.flipY
                          ? 'bg-brand-gold text-black border-brand-gold shadow'
                          : 'bg-white/10 text-brand-goldLight border-white/20 hover:bg-white/20'
                      }`}
                    >
                      <FlipVertical className="w-3 h-3" />
                      <span>{curNorm.flipY ? 'مقلوب' : 'عادي'}</span>
                    </button>
                  </div>
                </div>

                {/* Vertical Y */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10.5px] text-gray-200">
                    <span className="font-semibold">↕️ الموضع الرأسي (أعلى / أسفل):</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        className="w-12 bg-black border border-white/20 text-brand-gold text-center text-[10px] font-mono font-bold rounded py-0.5"
                        value={curPosY}
                        onChange={(e) =>
                          updateImageTransform(editPageIdx, selectedImgSlot, {
                            posY: Number(e.target.value),
                          })
                        }
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
                    onChange={(e) =>
                      updateImageTransform(editPageIdx, selectedImgSlot, {
                        posY: Number(e.target.value),
                      })
                    }
                  />
                </div>

                {/* Horizontal X */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10.5px] text-gray-200">
                    <span className="font-semibold">↔️ الموضع الأفقي (يمين / يسار):</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        className="w-12 bg-black border border-white/20 text-brand-gold text-center text-[10px] font-mono font-bold rounded py-0.5"
                        value={curPosX}
                        onChange={(e) =>
                          updateImageTransform(editPageIdx, selectedImgSlot, {
                            posX: Number(e.target.value),
                          })
                        }
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
                    onChange={(e) =>
                      updateImageTransform(editPageIdx, selectedImgSlot, {
                        posX: Number(e.target.value),
                      })
                    }
                  />
                </div>

                {/* Photo Brightness & Lighting Boost */}
                <div className="bg-black/60 p-2.5 rounded-lg border border-brand-gold/40 space-y-1.5">
                  <div className="flex justify-between items-center text-[10.5px]">
                    <span className="text-brand-goldLight font-bold flex items-center gap-1">
                      <span>💡</span>
                      <span>إضاءة هذه الصورة (Brightness):</span>
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-brand-gold font-mono font-bold bg-black/80 px-1.5 py-0.5 rounded border border-brand-gold/30">
                        {curNorm.brightness || 100}%
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {[
                      { label: '100% عادي', val: 100 },
                      { label: '115% طباعة', val: 115 },
                      { label: '130% ساطع', val: 130 },
                      { label: '145% قوي', val: 145 },
                    ].map((chip) => (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() =>
                          updateImageTransform(editPageIdx, selectedImgSlot, {
                            brightness: chip.val,
                          })
                        }
                        className={`py-0.5 text-[8.5px] font-mono font-bold rounded transition border ${
                          (curNorm.brightness || 100) === chip.val
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
                    min="60"
                    max="180"
                    step="5"
                    className="control-slider"
                    value={curNorm.brightness || 100}
                    onChange={(e) =>
                      updateImageTransform(editPageIdx, selectedImgSlot, {
                        brightness: Number(e.target.value),
                      })
                    }
                  />
                </div>

                {/* Quick Buttons: Upload & Reset */}
                <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-white/10">
                  <label className="py-1 px-2 bg-brand-gold hover:bg-brand-goldLight text-black rounded text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer shadow">
                    <Camera className="w-3 h-3" />
                    <span>رفع صورة</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          try {
                            const opt = await optimizeImageFile(file, 1200, 1600, 0.88);
                            updatePageImage(editPageIdx, selectedImgSlot, opt);
                          } catch {
                            const r = new FileReader();
                            r.onload = (ev) => updatePageImage(editPageIdx, selectedImgSlot, ev.target.result);
                            r.readAsDataURL(file);
                          }
                        }
                      }}
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => resetImageTransform(editPageIdx, selectedImgSlot)}
                    className="py-1 px-2 bg-white/10 hover:bg-white/20 text-white rounded text-[10px] font-semibold transition flex items-center justify-center gap-1 border border-white/15"
                    title="إعادة ضبط الموضع والتكبير (100%)"
                  >
                    <RotateCcw className="w-3 h-3 text-brand-gold" />
                    <span>إعادة ضبط (100%)</span>
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Overall Two-Column Frame Dimensions */}
          <div className="bg-black/80 p-2.5 rounded-lg border border-brand-gold/30 space-y-2 text-xs">
            <div className="text-[11px] font-bold text-brand-goldLight flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span>📐</span>
                <span>تكبير حجم إطاري الصورتين (Frame Size):</span>
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] text-gray-200">
                <span>طول الإطار (ارتفاع الصورتين):</span>
                <span className="text-brand-gold font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/30">
                  {curPageSettings.twoColumnImageHeight || 245}px
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="450"
                step="5"
                className="control-slider w-full"
                value={curPageSettings.twoColumnImageHeight || 245}
                onChange={(e) => updateSetting(pageScope, 'twoColumnImageHeight', Number(e.target.value))}
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] text-gray-200">
                <span>عرض الإطار:</span>
                <span className="text-brand-gold font-mono font-bold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/30">
                  {curPageSettings.twoColumnImageWidth !== undefined ? curPageSettings.twoColumnImageWidth : 100}%
                </span>
              </div>
              <input
                type="range"
                min="60"
                max="100"
                step="1"
                className="control-slider w-full"
                value={curPageSettings.twoColumnImageWidth !== undefined ? curPageSettings.twoColumnImageWidth : 100}
                onChange={(e) => updateSetting(pageScope, 'twoColumnImageWidth', Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageImageControls;
