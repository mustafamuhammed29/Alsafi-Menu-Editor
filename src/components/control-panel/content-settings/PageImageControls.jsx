import React, { useState } from 'react';
import { Camera, RotateCcw } from 'lucide-react';
import { useMenu, normalizeImage } from '../../../context/MenuContext';
import { optimizeImageFile } from '../../../utils/imageOptimizer';

const PageImageControls = ({ editPageIdx, pageImages }) => {
  const { updateImageTransform, resetImageTransform, updatePageImage } = useMenu();
  const [showPhotoControls, setShowPhotoControls] = useState(false);
  const [selectedImgSlot, setSelectedImgSlot] = useState(0);

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
                        transform: `scale(${sNorm.scale || 1})`,
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
            const curScale = curNorm.scale !== undefined ? curNorm.scale : 1.25;

            return (
              <div className="bg-black/80 p-2.5 rounded-lg border border-white/10 space-y-2 text-xs">
                {/* Vertical Y */}
                <div>
                  <div className="flex justify-between text-[10.5px] text-gray-200 mb-0.5">
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
                    onChange={(e) =>
                      updateImageTransform(editPageIdx, selectedImgSlot, {
                        posY: Number(e.target.value),
                      })
                    }
                  />
                </div>

                {/* Horizontal X */}
                <div>
                  <div className="flex justify-between text-[10.5px] text-gray-200 mb-0.5">
                    <span>↔️ الموضع الأفقي:</span>
                    <span className="font-mono text-brand-gold font-bold">{curPosX}%</span>
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

                {/* Zoom / Scale */}
                <div>
                  <div className="flex justify-between text-[10.5px] text-gray-200 mb-0.5">
                    <span>🔍 مستوى الزووم:</span>
                    <span className="font-mono text-brand-gold font-bold">{curScale.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="3.0"
                    step="0.05"
                    className="control-slider"
                    value={curScale}
                    onChange={(e) =>
                      updateImageTransform(editPageIdx, selectedImgSlot, {
                        scale: Number(e.target.value),
                      })
                    }
                  />
                </div>

                {/* Quick Buttons: Upload & Reset */}
                <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-white/10">
                  <label className="py-1 px-2 bg-brand-gold hover:bg-brand-goldLight text-black rounded text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer">
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
                  >
                    <RotateCcw className="w-3 h-3 text-brand-gold" />
                    <span>إعادة ضبط</span>
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default PageImageControls;
