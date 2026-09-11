import React, { useState, useRef } from 'react';
import { Camera, ZoomIn, ZoomOut, Move, RotateCcw, Sliders, FlipHorizontal, FlipVertical } from 'lucide-react';
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
  archBorderColor = '#8dc63f',
  archInnerColor = '#162a1c',
  showArchBorder = true,
  photoBlend = 'smooth',
  photoFeather = 60,
  imageBrightness = 100,
  imageContrast = 100,
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

  // Mouse Wheel Zoom Support (0.2x to 4.0x)
  const handleWheel = (e, imgIdx, currentNorm) => {
    if (e.target.closest('.no-drag')) return;
    if (e.cancelable) e.preventDefault();
    const zoomDelta = e.deltaY < 0 ? 0.06 : -0.06;
    const currentScale = currentNorm.scale !== undefined ? currentNorm.scale : 1.0;
    const newScale = Math.min(4.0, Math.max(0.2, currentScale + zoomDelta));
    if (onImageTransform) {
      onImageTransform(pageIndex, imgIdx, { scale: parseFloat(newScale.toFixed(2)) });
    }
  };

  const handleZoomChange = (imgIdx, newScale) => {
    const clamped = Math.min(4.0, Math.max(0.2, parseFloat(newScale)));
    if (onImageTransform) {
      onImageTransform(pageIndex, imgIdx, { scale: parseFloat(clamped.toFixed(2)) });
    }
  };

  const isBlended = photoBlend !== 'sharp' && images.length === 2;
  const clipPathId = `arch-clip-${pageId || pageIndex || 'page'}`;

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-50">
        <svg className="w-full h-full" viewBox="0 0 794 1123" preserveAspectRatio="none">
          <defs>
            <clipPath id={clipPathId} clipPathUnits="userSpaceOnUse">
              <path d={clipPathD} />
            </clipPath>
          </defs>
          {showArchBorder && archBorderWidth > 0 && (
            <path
              d={stroke1D}
              fill="none"
              stroke={archBorderColor || '#8dc63f'}
              strokeWidth={archBorderWidth}
            />
          )}
        </svg>
      </div>

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

          let containerStyle = {};
          if (images.length === 2) {
            if (photoBlend === 'sharp') {
              if (idx === 0) {
                containerStyle = { position: 'absolute', top: 0, left: 0, width: '100%', height: '50.5%', zIndex: 1 };
              } else {
                containerStyle = { position: 'absolute', top: '49.5%', bottom: 0, left: 0, width: '100%', height: '50.5%', zIndex: 2 };
              }
            } else if (photoBlend === 'vignette') {
              if (idx === 0) {
                containerStyle = { position: 'absolute', top: 0, left: 0, width: '100%', height: '53%', zIndex: 1 };
              } else {
                containerStyle = {
                  position: 'absolute', top: '47%', bottom: 0, left: 0, width: '100%', height: '53%', zIndex: 2,
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 100%)',
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 100%)',
                };
              }
            } else {
              if (idx === 0) {
                containerStyle = { position: 'absolute', top: 0, left: 0, width: '100%', height: '53%', zIndex: 1 };
              } else {
                containerStyle = {
                  position: 'absolute', top: '47%', bottom: 0, left: 0, width: '100%', height: '53%', zIndex: 2,
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 5%, black 10%, black 100%)',
                  maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 5%, black 10%, black 100%)',
                };
              }
            }
          } else {
            containerStyle = { width: '100%', height: `${100 / Math.max(1, images.length)}%` };
          }

          const curScale = typeof norm.scale === 'number' ? Math.min(4.0, Math.max(0.2, norm.scale)) : 1.0;
          const curPosX = norm.posX !== undefined ? norm.posX : 50;
          const curPosY = norm.posY !== undefined ? norm.posY : (idx === 0 ? 68 : 30);
          const transX = (curPosX - 50) * 4;
          const transY = (curPosY - (idx === 0 ? 68 : 30)) * 4;
          
          const dishBrightness = ((norm.brightness || 100) * ((imageBrightness || 100) / 100));
          const dishContrast = ((norm.contrast || 100) * ((imageContrast || 100) / 100));

          return (
            <div
              key={idx}
              className="relative w-full overflow-hidden group select-none bg-[#040d07]"
              style={containerStyle}
              onMouseDown={(e) => handleMouseDown(e, idx, norm)}
              onWheel={(e) => handleWheel(e, idx, norm)}
            >
              <div className="w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden flex items-center justify-center">
                <img
                  src={norm.url}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover pointer-events-none transition-transform duration-75"
                  style={{
                    objectPosition: `${curPosX}% ${curPosY}%`,
                    transform: `translate(${transX}px, ${transY}px) scale(${curScale}) ${norm.flipX ? 'scaleX(-1)' : ''} ${norm.flipY ? 'scaleY(-1)' : ''}`,
                    transformOrigin: 'center center',
                    filter: `brightness(${dishBrightness}%) contrast(${dishContrast}%)`,
                  }}
                  alt={`Menu Photo ${idx + 1}`}
                  draggable={false}
                />
              </div>

              {/* Floating Quick Action Bar (Top Left) - Vertical Pillar Layout */}
              <div className="absolute top-2 left-2 flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 no-print no-drag z-40 bg-black/90 p-1.5 rounded-xl border border-brand-gold/60 shadow-2xl backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => handleUploadClick(idx)}
                  className="w-6.5 h-6.5 bg-brand-gold hover:bg-brand-goldLight text-black rounded-lg font-bold transition flex items-center justify-center shadow-sm shrink-0"
                  title="رفع صورة جديدة (تغيير)"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>

                {/* Quick Zoom Out (-) */}
                <button
                  type="button"
                  onClick={() => handleZoomChange(idx, curScale - 0.1)}
                  className="w-6.5 h-6.5 rounded-lg bg-white/10 hover:bg-brand-gold hover:text-black text-brand-goldLight flex items-center justify-center text-xs font-bold transition shrink-0"
                  title="تصغير الصورة (-10%)"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>

                {/* Current Zoom % Badge */}
                <span className="text-[8.5px] font-mono font-bold text-brand-gold bg-black/80 px-1 py-0.5 rounded border border-brand-gold/30 text-center leading-none shrink-0">
                  {Math.round(curScale * 100)}%
                </span>

                {/* Quick Zoom In (+) */}
                <button
                  type="button"
                  onClick={() => handleZoomChange(idx, curScale + 0.1)}
                  className="w-6.5 h-6.5 rounded-lg bg-white/10 hover:bg-brand-gold hover:text-black text-brand-goldLight flex items-center justify-center text-xs font-bold transition shrink-0"
                  title="تكبير الصورة (+10%)"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>

                {/* Quick Flip Horizontal (Left / Right) */}
                <button
                  type="button"
                  onClick={() => onImageTransform && onImageTransform(pageIndex, idx, { flipX: !norm.flipX })}
                  className={`w-6.5 h-6.5 rounded-lg flex items-center justify-center text-xs font-bold transition shrink-0 ${
                    norm.flipX
                      ? 'bg-brand-gold text-black border border-brand-gold shadow'
                      : 'bg-white/10 text-brand-goldLight hover:bg-brand-gold hover:text-black'
                  }`}
                  title="قلب اتجاه الصورة أفقياً (يمين / يسار)"
                >
                  <FlipHorizontal className="w-3.5 h-3.5" />
                </button>

                {/* Quick Flip Vertical (Top / Bottom - Width to Height) */}
                <button
                  type="button"
                  onClick={() => onImageTransform && onImageTransform(pageIndex, idx, { flipY: !norm.flipY })}
                  className={`w-6.5 h-6.5 rounded-lg flex items-center justify-center text-xs font-bold transition shrink-0 ${
                    norm.flipY
                      ? 'bg-brand-gold text-black border border-brand-gold shadow'
                      : 'bg-white/10 text-brand-goldLight hover:bg-brand-gold hover:text-black'
                  }`}
                  title="قلب اتجاه الصورة رأسيًا (أعلى / أسفل)"
                >
                  <FlipVertical className="w-3.5 h-3.5" />
                </button>

                {/* Open Extended Sliders */}
                <button
                  type="button"
                  onClick={() => setActiveAdjustIdx(isAdjusting ? null : idx)}
                  className={`w-6.5 h-6.5 rounded-lg flex items-center justify-center text-xs font-bold transition shrink-0 ${
                    isAdjusting
                      ? 'bg-brand-gold text-black'
                      : 'bg-white/10 text-brand-goldLight hover:bg-brand-gold hover:text-black'
                  }`}
                  title="لوحة الضبط والتحريك الدقيق"
                >
                  <Sliders className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Drag Prompt Hint Pill */}
              <div className="absolute bottom-2.5 left-2.5 bg-black/85 backdrop-blur-sm border border-brand-gold/40 text-brand-goldLight text-[9px] px-2 py-0.5 rounded-full pointer-events-none opacity-0 group-hover:opacity-90 transition-opacity duration-200 no-print flex items-center gap-1 z-30 shadow-lg">
                <Move className="w-2.5 h-2.5 text-brand-gold" />
                <span>اسحب للتحريك · بكرة الماوس للزووم</span>
              </div>

              {/* Extended Adjustment Popover Bar when 'ضبط' is active */}
              {isAdjusting && (
                <div className="absolute top-2 left-11 right-2 max-h-[92%] overflow-y-auto bg-[#0a0f0c]/98 border-2 border-brand-gold rounded-xl p-3 shadow-2xl z-50 no-print no-drag backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 space-y-2.5">
                  <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-white/10">
                    <span className="text-[11px] font-bold text-brand-goldLight flex items-center gap-1">
                      <Sliders className="w-3 h-3 text-brand-gold" />
                      التحكم بتصغير/تكبير وموضع الصورة
                    </span>
                    <button
                      type="button"
                      onClick={() => onResetTransform && onResetTransform(pageIndex, idx)}
                      className="text-[9.5px] text-red-300 hover:text-red-100 flex items-center gap-1 p-0.5 rounded hover:bg-white/5 transition"
                      title="إعادة ضبط الموضع والتكبير (100%)"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      إعادة ضبط
                    </button>
                  </div>

                  {/* Flips Controls (Horizontal & Vertical) */}
                  <div className="grid grid-cols-2 gap-2 bg-black/70 p-2 rounded-lg border border-white/10 text-[10px] text-gray-300">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold flex items-center gap-1">
                        <FlipHorizontal className="w-3 h-3 text-brand-gold" />
                        <span>أفقي:</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => onImageTransform && onImageTransform(pageIndex, idx, { flipX: !norm.flipX })}
                        className={`px-2 py-0.5 rounded text-[9px] font-bold transition border flex items-center gap-1 ${
                          norm.flipX
                            ? 'bg-brand-gold text-black border-brand-gold shadow'
                            : 'bg-white/10 text-brand-goldLight border-white/20 hover:bg-white/20'
                        }`}
                      >
                        <FlipHorizontal className="w-2.5 h-2.5" />
                        <span>{norm.flipX ? 'مقلوب' : 'عادي'}</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold flex items-center gap-1">
                        <FlipVertical className="w-3 h-3 text-brand-gold" />
                        <span>رأسي:</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => onImageTransform && onImageTransform(pageIndex, idx, { flipY: !norm.flipY })}
                        className={`px-2 py-0.5 rounded text-[9px] font-bold transition border flex items-center gap-1 ${
                          norm.flipY
                            ? 'bg-brand-gold text-black border-brand-gold shadow'
                            : 'bg-white/10 text-brand-goldLight border-white/20 hover:bg-white/20'
                        }`}
                      >
                        <FlipVertical className="w-2.5 h-2.5" />
                        <span>{norm.flipY ? 'مقلوب' : 'عادي'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Zoom Controls: Direct % Input, Quick Chips & Slider */}
                  <div className="space-y-1.5 bg-black/70 p-2 rounded-lg border border-white/10">
                    <div className="flex justify-between items-center text-[10px] text-gray-300">
                      <span className="font-semibold">🔍 مقياس الزووم والتصغير:</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="20"
                          max="400"
                          step="5"
                          className="w-14 bg-black border border-brand-gold/70 text-brand-gold text-center text-[10px] font-mono font-bold rounded py-0.5 outline-none focus:ring-1 focus:ring-brand-gold"
                          value={Math.round(curScale * 100)}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (!isNaN(val)) {
                              handleZoomChange(idx, val / 100);
                            }
                          }}
                        />
                        <span className="text-[9px] text-gray-400 font-bold">%</span>
                      </div>
                    </div>

                    {/* Quick Preset Buttons */}
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
                          onClick={() => handleZoomChange(idx, chip.val)}
                          className={`py-0.5 text-[9px] font-mono font-bold rounded transition border ${
                            Math.abs(curScale - chip.val) < 0.04
                              ? 'bg-brand-gold text-black border-brand-gold'
                              : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/15'
                          }`}
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>

                    {/* Zoom Slider (0.2x to 4.0x) */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleZoomChange(idx, curScale - 0.1)}
                        className="w-6 h-6 rounded bg-black/80 hover:bg-brand-gold hover:text-black border border-brand-gold/40 flex items-center justify-center text-xs text-brand-goldLight transition shadow-sm font-bold"
                        title="تصغير (-10%)"
                      >
                        -
                      </button>
                      <input
                        type="range"
                        min="0.2"
                        max="4.0"
                        step="0.02"
                        value={curScale}
                        onChange={(e) => handleZoomChange(idx, e.target.value)}
                        className="control-slider flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => handleZoomChange(idx, curScale + 0.1)}
                        className="w-6 h-6 rounded bg-black/80 hover:bg-brand-gold hover:text-black border border-brand-gold/40 flex items-center justify-center text-xs text-brand-goldLight transition shadow-sm font-bold"
                        title="تكبير (+10%)"
                      >
                        +
                      </button>
                    </div>

                    {/* Fit / Cover Quick Modes */}
                    <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => {
                          if (onImageTransform) {
                            onImageTransform(pageIndex, idx, { scale: 0.75, posX: 50, posY: 50 });
                          }
                        }}
                        className="py-1 px-1.5 bg-white/10 hover:bg-brand-gold hover:text-black text-brand-goldLight rounded text-[9.5px] font-bold transition border border-white/10 flex items-center justify-center gap-1"
                        title="تصغير الطبق لاحتواء كامل الصحن داخل الإطار"
                      >
                        <span>🍽️ احتواء كامل الصحن (75%)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (onImageTransform) {
                            onImageTransform(pageIndex, idx, { scale: 1.25, posX: 50, posY: idx === 0 ? 68 : 30 });
                          }
                        }}
                        className="py-1 px-1.5 bg-white/10 hover:bg-brand-gold hover:text-black text-brand-goldLight rounded text-[9.5px] font-bold transition border border-white/10 flex items-center justify-center gap-1"
                        title="ملء الإطار بالكامل"
                      >
                        <span>🖼️ تعبئة الإطار (125%)</span>
                      </button>
                    </div>
                  </div>

                  {/* 4-Way Directional Nudge Pad */}
                  <div className="pt-1.5 border-t border-white/10 flex flex-col items-center gap-1 bg-black/50 p-2 rounded-lg">
                    <span className="text-[9.5px] text-gray-300 font-semibold">
                      لوحة تحريك الموضع الدقيق (Nudge):
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onImageTransform &&
                        onImageTransform(pageIndex, idx, { posY: Math.max(0, curPosY - 5) })
                      }
                      className="px-3 py-0.5 rounded bg-black/80 hover:bg-brand-gold hover:text-black border border-brand-gold/40 text-[10px] text-white font-bold"
                      title="أعلى"
                    >
                      ▲ أعلى
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          onImageTransform &&
                          onImageTransform(pageIndex, idx, { posX: Math.max(0, curPosX - 5) })
                        }
                        className="px-2.5 py-0.5 rounded bg-black/80 hover:bg-brand-gold hover:text-black border border-brand-gold/40 text-[10px] text-white font-bold"
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
                        className="px-2 py-0.5 rounded bg-brand-gold/20 hover:bg-brand-gold hover:text-black text-brand-gold text-[9.5px] font-bold border border-brand-gold/40"
                        title="توسيط كامل"
                      >
                        توسيط
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          onImageTransform &&
                          onImageTransform(pageIndex, idx, { posX: Math.min(100, curPosX + 5) })
                        }
                        className="px-2.5 py-0.5 rounded bg-black/80 hover:bg-brand-gold hover:text-black border border-brand-gold/40 text-[10px] text-white font-bold"
                        title="يمين"
                      >
                        يمين ▶
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onImageTransform &&
                        onImageTransform(pageIndex, idx, { posY: Math.min(100, curPosY + 5) })
                      }
                      className="px-3 py-0.5 rounded bg-black/80 hover:bg-brand-gold hover:text-black border border-brand-gold/40 text-[10px] text-white font-bold"
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
