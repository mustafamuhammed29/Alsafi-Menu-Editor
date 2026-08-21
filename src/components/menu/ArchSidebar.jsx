import React, { useState, useRef } from 'react';
import { Camera, ZoomIn, ZoomOut, Move, RotateCcw, Sliders } from 'lucide-react';
import { normalizeImage } from '../../context/MenuContext';
import { optimizeImageFile } from '../../utils/imageOptimizer';

export const ArchSidebar = ({
  pageId,
  pageIndex,
  images = [],
  archWidth = 280,
  archCurveDepth = 110,
  archWaistY = 560,
  archBottomOffset = 10,
  archStyle = 'classic',
  archBorderWidth = 1.5,
  archInnerBorderWidth = 3,
  archBorderColor = '#c9aa58',
  archInnerColor = '#0f3d23',
  showArchBorder = true,
  photoBlend = 'smooth',
  photoFeather = 60,
  onImageChange,
  onImageTransform,
  onResetTransform,
}) => {
  const w = Number(archWidth) || 280;
  const bottomX = w + (Number(archBottomOffset) || 10);
  const waistY = Number(archWaistY) || 560;
  const rawDepth = Number(archCurveDepth) !== undefined ? Number(archCurveDepth) : 110;
  const depth = archStyle === 'straight' ? 0 : archStyle === 'subtle' ? Math.min(rawDepth, 45) : rawDepth;
  const waistX = w - depth;

  let stroke1D = '';
  let stroke2D = '';
  let clipPathD = '';

  if (archStyle === 'straight' || depth === 0) {
    stroke1D = `M ${w},0 L ${bottomX},1123`;
    stroke2D = `M ${w + 6},0 L ${bottomX + 6},1123`;
    clipPathD = `M 0,0 L ${w},0 L ${bottomX},1123 L 0,1123 Z`;
  } else if (archStyle === 'wave') {
    const waveY1 = waistY * 0.5;
    const waveY2 = waistY + (1123 - waistY) * 0.5;
    stroke1D = `M ${w},0 C ${w + 20},${waveY1 * 0.5} ${waistX},${waveY1} ${waistX},${waistY} C ${waistX},${waveY2} ${bottomX + 20},${waveY2 + (1123 - waveY2) * 0.5} ${bottomX},1123`;
    stroke2D = `M ${w + 6},0 C ${w + 26},${waveY1 * 0.5} ${waistX + 6},${waveY1} ${waistX + 6},${waistY} C ${waistX + 6},${waveY2} ${bottomX + 26},${waveY2 + (1123 - waveY2) * 0.5} ${bottomX + 6},1123`;
    clipPathD = `M 0,0 L ${w},0 C ${w + 20},${waveY1 * 0.5} ${waistX},${waveY1} ${waistX},${waistY} C ${waistX},${waveY2} ${bottomX + 20},${waveY2 + (1123 - waveY2) * 0.5} ${bottomX},1123 L 0,1123 Z`;
  } else {
    // classic & subtle smooth Bezier curve
    const cp1Y = waistY * 0.39;
    const cp2Y = waistY * 0.68;
    const cp3Y = waistY + (1123 - waistY) * 0.39;
    const cp4Y = waistY + (1123 - waistY) * 0.64;

    stroke1D = `M ${w},0 C ${w},${cp1Y} ${waistX},${cp2Y} ${waistX},${waistY} C ${waistX},${cp3Y} ${bottomX},${cp4Y} ${bottomX},1123`;
    stroke2D = `M ${w + 6},0 C ${w + 6},${cp1Y} ${waistX + 6},${cp2Y} ${waistX + 6},${waistY} C ${waistX + 6},${cp3Y} ${bottomX + 6},${cp4Y} ${bottomX + 6},1123`;
    clipPathD = `M 0,0 L ${w},0 C ${w},${cp1Y} ${waistX},${cp2Y} ${waistX},${waistY} C ${waistX},${cp3Y} ${bottomX},${cp4Y} ${bottomX},1123 L 0,1123 Z`;
  }

  const [activeAdjustIdx, setActiveAdjustIdx] = useState(null);
  const [draggingIdx, setDraggingIdx] = useState(null);
  const dragStartRef = useRef({ x: 0, y: 0, initialPosX: 50, initialPosY: 50 });

  const handleUploadClick = (imgIdx) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        try {
          const optimizedDataUrl = await optimizeImageFile(file, 2400, 3000, 0.95);
          if (onImageChange) {
            onImageChange(imgIdx, optimizedDataUrl);
          }
          if (onImageTransform) {
            onImageTransform(pageIndex, imgIdx, { scale: 1.0, posX: 50, posY: 50 });
          }
        } catch {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (onImageChange) onImageChange(imgIdx, event.target.result);
            if (onImageTransform) {
              onImageTransform(pageIndex, imgIdx, { scale: 1.0, posX: 50, posY: 50 });
            }
          };
          reader.readAsDataURL(file);
        }
      }
    };
    input.click();
  };

  // Natural Focal Point Dragging
  const handleMouseDown = (e, imgIdx, currentNorm) => {
    if (e.button !== 0 || e.target.closest('.no-drag')) return;
    e.preventDefault();
    setDraggingIdx(imgIdx);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialPosX: currentNorm.posX !== undefined ? currentNorm.posX : 50,
      initialPosY: currentNorm.posY !== undefined ? currentNorm.posY : 50,
    };

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - dragStartRef.current.x;
      const deltaY = moveEvent.clientY - dragStartRef.current.y;

      const sensitivity = 0.25;
      const newPosX = Math.min(100, Math.max(0, dragStartRef.current.initialPosX + deltaX * sensitivity));
      const newPosY = Math.min(100, Math.max(0, dragStartRef.current.initialPosY + deltaY * sensitivity));

      if (onImageTransform) {
        onImageTransform(pageIndex, imgIdx, {
          posX: parseFloat(newPosX.toFixed(1)),
          posY: parseFloat(newPosY.toFixed(1)),
        });
      }
    };

    const onMouseUp = () => {
      setDraggingIdx(null);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // Mouse Wheel Zoom Support (1.0x to 3.0x)
  const handleWheel = (e, imgIdx, currentNorm) => {
    if (e.target.closest('.no-drag')) return;
    if (e.cancelable) e.preventDefault();
    const zoomDelta = e.deltaY < 0 ? 0.08 : -0.08;
    const currentScale = currentNorm.scale !== undefined ? currentNorm.scale : 1.0;
    const newScale = Math.min(3.0, Math.max(1.0, currentScale + zoomDelta));
    if (onImageTransform) {
      onImageTransform(pageIndex, imgIdx, { scale: parseFloat(newScale.toFixed(2)) });
    }
  };

  const handleZoomChange = (imgIdx, newScale) => {
    const clamped = Math.min(3.0, Math.max(1.0, parseFloat(newScale)));
    if (onImageTransform) {
      onImageTransform(pageIndex, imgIdx, { scale: parseFloat(clamped.toFixed(2)) });
    }
  };

  const isBlended = photoBlend !== 'sharp' && images.length === 2;
  const clipPathId = `arch-clip-${pageId || pageIndex || 'page'}`;

  return (
    <>
      {/* SVG Decorative Framing and Curves with locked clipPath definition */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-50">
        <svg className="w-full h-full" viewBox="0 0 794 1123" preserveAspectRatio="none">
          <defs>
            <clipPath id={clipPathId} clipPathUnits="userSpaceOnUse">
              <path d={clipPathD} />
            </clipPath>
          </defs>
          {/*
          {showArchBorder && archInnerBorderWidth > 0 && (
            <path
              d={stroke2D}
              fill="none"
              stroke={archInnerColor || '#0f3d23'}
              strokeWidth={archInnerBorderWidth}
            />
          )}
          */}
          {showArchBorder && archBorderWidth > 0 && (
            <path
              d={stroke1D}
              fill="none"
              stroke={archBorderColor || '#c9aa58'}
              strokeWidth={archBorderWidth}
            />
          )}
        </svg>
      </div>

      {/* Clipped Photos Container - Locked 1:1 to the SVG Gold Line */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-auto overflow-hidden z-40"
        style={{
          clipPath: `url(#${clipPathId})`,
          WebkitClipPath: `url(#${clipPathId})`,
        }}
      >
        {images.map((img, idx) => {
          const norm = normalizeImage(img, idx);
          const isAdjusting = activeAdjustIdx === idx;
          const isDragging = draggingIdx === idx;

          // Seamless Photo Layout (Guaranteed 100% solid food coverage, ZERO black gap)
          let containerStyle = {};
          if (images.length === 2) {
            if (photoBlend === 'sharp') {
              if (idx === 0) {
                containerStyle = {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '50.5%',
                  zIndex: 1,
                };
              } else {
                containerStyle = {
                  position: 'absolute',
                  top: '49.5%',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '50.5%',
                  zIndex: 2,
                };
              }
            } else if (photoBlend === 'vignette') {
              if (idx === 0) {
                containerStyle = {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '53%',
                  zIndex: 1,
                };
              } else {
                containerStyle = {
                  position: 'absolute',
                  top: '47%',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '53%',
                  zIndex: 2,
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 100%)',
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 100%)',
                };
              }
            } else {
              // Default: 'smooth' - tight 4% cross-overlap with solid underlay, 0% black gap
              if (idx === 0) {
                containerStyle = {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '53%',
                  zIndex: 1,
                };
              } else {
                containerStyle = {
                  position: 'absolute',
                  top: '47%',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '53%',
                  zIndex: 2,
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 5%, black 10%, black 100%)',
                  maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 5%, black 10%, black 100%)',
                };
              }
            }
          } else {
            containerStyle = {
              width: '100%',
              height: `${100 / Math.max(1, images.length)}%`,
            };
          }

          const curScale = Math.max(1.0, norm.scale !== undefined ? norm.scale : 1.25);
          const curPosX = norm.posX !== undefined ? norm.posX : 50;
          const curPosY = norm.posY !== undefined ? norm.posY : (idx === 0 ? 68 : 30);
          // Calculate responsive translation offsets from center for immediate visual responsiveness
          const transX = (curPosX - 50) * 4;
          const transY = (curPosY - (idx === 0 ? 68 : 30)) * 4;

          return (
            <div
              key={idx}
              className="relative w-full overflow-hidden group select-none"
              style={containerStyle}
              onMouseDown={(e) => handleMouseDown(e, idx, norm)}
              onWheel={(e) => handleWheel(e, idx, norm)}
            >
              {/* Clean Single Main Food Photo */}
              <div className="w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden">
                <img
                  src={norm.url}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover pointer-events-none transition-transform duration-75"
                  style={{
                    objectPosition: `${curPosX}% ${curPosY}%`,
                    transform: `translate(${transX}px, ${transY}px) scale(${curScale})`,
                    transformOrigin: 'center center',
                  }}
                  alt={`Menu Photo ${idx + 1}`}
                  draggable={false}
                />
              </div>

              {/* Floating Quick Action Bar (Top Left) - Always Visible on Hover */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 no-print no-drag z-40 bg-black/85 p-1 rounded-lg border border-brand-gold/60 shadow-2xl backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => handleUploadClick(idx)}
                  className="px-2 py-1 bg-brand-gold hover:bg-brand-goldLight text-black rounded text-[10px] font-bold transition flex items-center gap-1 shadow-sm"
                  title="رفع صورة جديدة"
                >
                  <Camera className="w-3 h-3" />
                  <span>تغيير</span>
                </button>

                {/* Quick Zoom In (+) */}
                <button
                  type="button"
                  onClick={() => handleZoomChange(idx, curScale + 0.15)}
                  className="w-6 h-6 rounded bg-white/10 hover:bg-brand-gold hover:text-black text-brand-goldLight flex items-center justify-center text-xs font-bold transition"
                  title="تكبير الصورة (+)"
                >
                  <ZoomIn className="w-3 h-3" />
                </button>

                {/* Quick Zoom Out (-) */}
                <button
                  type="button"
                  onClick={() => handleZoomChange(idx, curScale - 0.15)}
                  className="w-6 h-6 rounded bg-white/10 hover:bg-brand-gold hover:text-black text-brand-goldLight flex items-center justify-center text-xs font-bold transition"
                  title="تصغير الصورة (-)"
                >
                  <ZoomOut className="w-3 h-3" />
                </button>

                {/* Open Extended Sliders */}
                <button
                  type="button"
                  onClick={() => setActiveAdjustIdx(isAdjusting ? null : idx)}
                  className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold transition ${
                    isAdjusting
                      ? 'bg-brand-gold text-black'
                      : 'bg-white/10 text-brand-goldLight hover:bg-brand-gold hover:text-black'
                  }`}
                  title="لوحة الضبط والتحريك الدقيق"
                >
                  <Sliders className="w-3 h-3" />
                </button>
              </div>

              {/* Drag Prompt Hint Pill */}
              <div className="absolute bottom-2.5 left-2.5 bg-black/85 backdrop-blur-sm border border-brand-gold/40 text-brand-goldLight text-[9px] px-2 py-0.5 rounded-full pointer-events-none opacity-0 group-hover:opacity-90 transition-opacity duration-200 no-print flex items-center gap-1 z-30 shadow-lg">
                <Move className="w-2.5 h-2.5 text-brand-gold" />
                <span>اسحب للتحريك · بكرة الماوس للزووم</span>
              </div>

              {/* Extended Adjustment Popover Bar when 'ضبط' is active */}
              {isAdjusting && (
                <div className="absolute top-12 left-2.5 right-2.5 bg-[#0a0f0c]/95 border border-brand-gold rounded-xl p-3 shadow-2xl z-50 no-print no-drag backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10">
                    <span className="text-[11px] font-bold text-brand-goldLight flex items-center gap-1">
                      <Sliders className="w-3 h-3 text-brand-gold" />
                      التحكم بتكبير وموضع الصورة
                    </span>
                    <button
                      type="button"
                      onClick={() => onResetTransform && onResetTransform(pageIndex, idx)}
                      className="text-[9.5px] text-red-300 hover:text-red-100 flex items-center gap-1 p-0.5 rounded hover:bg-white/5 transition"
                      title="إعادة ضبط الموضع والتكبير"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      إعادة ضبط
                    </button>
                  </div>

                  {/* Zoom Slider with Exact Percentage */}
                  <div className="space-y-1.5 mb-2.5">
                    <div className="flex justify-between text-[10px] text-gray-300">
                      <span className="font-semibold">نسبة التكبير (Zoom):</span>
                      <span className="font-mono text-brand-gold font-bold text-xs">
                        {Math.round(curScale * 100)}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleZoomChange(idx, curScale - 0.1)}
                        className="w-7 h-7 rounded-lg bg-black/80 hover:bg-brand-gold hover:text-black border border-brand-gold/40 flex items-center justify-center text-xs text-brand-goldLight transition shadow-sm font-bold"
                        title="تصغير (-10%)"
                      >
                        -
                      </button>
                      <input
                        type="range"
                        min="1.0"
                        max="3.0"
                        step="0.05"
                        value={curScale}
                        onChange={(e) => handleZoomChange(idx, e.target.value)}
                        className="control-slider flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => handleZoomChange(idx, curScale + 0.1)}
                        className="w-7 h-7 rounded-lg bg-black/80 hover:bg-brand-gold hover:text-black border border-brand-gold/40 flex items-center justify-center text-xs text-brand-goldLight transition shadow-sm font-bold"
                        title="تكبير (+10%)"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* 4-Way Directional Nudge Pad */}
                  <div className="pt-2 border-t border-white/10 flex flex-col items-center gap-1.5">
                    <span className="text-[9.5px] text-gray-400 font-semibold">
                      لوحة تحريك الموضع (Nudge):
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onImageTransform &&
                        onImageTransform(pageIndex, idx, { posY: Math.max(0, curPosY - 6) })
                      }
                      className="px-3 py-0.5 rounded bg-black/70 hover:bg-brand-gold hover:text-black border border-brand-gold/40 text-[10px] text-white font-bold"
                      title="أعلى"
                    >
                      ▲ أعلى
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          onImageTransform &&
                          onImageTransform(pageIndex, idx, { posX: Math.max(0, curPosX - 6) })
                        }
                        className="px-2.5 py-0.5 rounded bg-black/70 hover:bg-brand-gold hover:text-black border border-brand-gold/40 text-[10px] text-white font-bold"
                        title="يسار"
                      >
                        ◀ يسار
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          onImageTransform &&
                          onImageTransform(pageIndex, idx, { posX: 50, posY: 50, scale: 1.0 })
                        }
                        className="px-2 py-0.5 rounded bg-brand-gold/20 hover:bg-brand-gold hover:text-black text-brand-gold text-[9.5px] font-bold"
                        title="توسيط"
                      >
                        توسيط
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          onImageTransform &&
                          onImageTransform(pageIndex, idx, { posX: Math.min(100, curPosX + 6) })
                        }
                        className="px-2.5 py-0.5 rounded bg-black/70 hover:bg-brand-gold hover:text-black border border-brand-gold/40 text-[10px] text-white font-bold"
                        title="يمين"
                      >
                        يمين ▶
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onImageTransform &&
                        onImageTransform(pageIndex, idx, { posY: Math.min(100, curPosY + 6) })
                      }
                      className="px-3 py-0.5 rounded bg-black/70 hover:bg-brand-gold hover:text-black border border-brand-gold/40 text-[10px] text-white font-bold"
                      title="أسفل"
                    >
                      ▼ أسفل
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

      </div>
    </>
  );
};

export default ArchSidebar;
