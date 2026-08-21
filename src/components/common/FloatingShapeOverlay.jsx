import React, { useState, useRef } from 'react';
import { Move, Trash2, Camera, RotateCw, ZoomIn, Sparkles, X, Crown, Smile } from 'lucide-react';
import { useMenu } from '../../context/MenuContext';
import { optimizeImageFile } from '../../utils/imageOptimizer';

// Clip paths and polygon definitions for luxury geometric shapes
export const SHAPE_DEFS = {
  free: {
    name: 'صورة حرة بدون قص (Free Image)',
    icon: '🖼️',
    clipPath: 'none',
    svgBorder: (size, color, stroke) => null,
  },
  circle: {
    name: 'دائرة ملكية (Circle)',
    icon: '⭕',
    clipPath: 'circle(48% at 50% 50%)',
    svgBorder: (size, color, stroke) => (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="47" fill="none" stroke={color} strokeWidth={stroke * 1.5} />
        <circle cx="50" cy="50" r="43" fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="3,3" opacity="0.8" />
      </svg>
    ),
  },
  octagon: {
    name: 'مثمن أندلسي (Islamic Octagon)',
    icon: '❖',
    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
    svgBorder: (size, color, stroke) => (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
        <polygon
          points="30,2 70,2 98,30 98,70 70,98 30,98 2,70 2,30"
          fill="none"
          stroke={color}
          strokeWidth={stroke * 1.5}
        />
        <polygon
          points="31,6 69,6 94,31 94,69 69,94 31,94 6,69 6,31"
          fill="none"
          stroke={color}
          strokeWidth="0.8"
          strokeDasharray="2,2"
          opacity="0.8"
        />
      </svg>
    ),
  },
  diamond: {
    name: 'معين ذهبي (Diamond Rhombus)',
    icon: '🔶',
    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    svgBorder: (size, color, stroke) => (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
        <polygon points="50,2 98,50 50,98 2,50" fill="none" stroke={color} strokeWidth={stroke * 1.5} />
        <polygon points="50,6 94,50 50,94 6,50" fill="none" stroke={color} strokeWidth="0.8" opacity="0.8" strokeDasharray="3,3" />
      </svg>
    ),
  },
  shield: {
    name: 'درع شرفي (Royal Crest Shield)',
    icon: '🛡️',
    clipPath: 'polygon(50% 0%, 100% 15%, 100% 65%, 50% 100%, 0% 65%, 0% 15%)',
    svgBorder: (size, color, stroke) => (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
        <polygon points="50,2 98,16 98,64 50,98 2,64 2,16" fill="none" stroke={color} strokeWidth={stroke * 1.5} />
        <polygon points="50,6 94,19 94,62 50,94 6,62 6,19" fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="2,2" opacity="0.8" />
      </svg>
    ),
  },
  hexagon: {
    name: 'سداسي هندسي (Hexagon)',
    icon: '⬡',
    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
    svgBorder: (size, color, stroke) => (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
        <polygon points="25,2 75,2 98,50 75,98 25,98 2,50" fill="none" stroke={color} strokeWidth={stroke * 1.5} />
        <polygon points="26,6 74,6 94,50 74,94 26,94 6,50" fill="none" stroke={color} strokeWidth="0.8" opacity="0.8" />
      </svg>
    ),
  },
  stamp: {
    name: 'ختم ذهبي مميز (Gourmet Seal Stamp)',
    icon: '🏵️',
    clipPath: 'circle(48% at 50% 50%)',
    svgBorder: (size, color, stroke) => (
      <svg className="absolute inset-0 w-full h-full pointer-events-none animate-spin-slow" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="4,2" />
        <circle cx="50" cy="50" r="44" fill="none" stroke={color} strokeWidth="1" />
        <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="2,2" />
      </svg>
    ),
  },
  alsafi: {
    name: 'وسام الصافي الملكي (Alsafi Royal Medallion)',
    icon: '⚜️',
    clipPath: 'circle(48% at 50% 50%)',
    svgBorder: (size, color, stroke) => (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="none" stroke={color} strokeWidth={stroke * 1.6} />
        <circle cx="50" cy="50" r="44" fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="3,2" opacity="0.9" />
        <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="0.6" opacity="0.6" />
        <polygon points="50,1 53,5 47,5" fill={color} />
        <polygon points="50,99 53,95 47,95" fill={color} />
        <polygon points="1,50 5,53 5,47" fill={color} />
        <polygon points="99,50 95,53 95,47" fill={color} />
      </svg>
    ),
  },
  starBadge: {
    name: 'نجمة ملكية ثمانية (8-Point Star)',
    icon: '🌟',
    clipPath: 'polygon(50% 0%, 63% 15%, 85% 15%, 85% 37%, 100% 50%, 85% 63%, 85% 85%, 63% 85%, 50% 100%, 37% 85%, 15% 85%, 15% 63%, 0% 50%, 15% 37%, 15% 15%, 37% 15%)',
    svgBorder: (size, color, stroke) => (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
        <polygon
          points="50,1 63,15 85,15 85,37 99,50 85,63 85,85 63,85 50,99 37,85 15,85 15,63 1,50 15,37 15,15 37,15"
          fill="none"
          stroke={color}
          strokeWidth={stroke * 1.4}
        />
        <circle cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="2,2" opacity="0.8" />
      </svg>
    ),
  },
};

export const FloatingShapeOverlay = ({
  shapes = [],
  pageIndex,
  onUpdateShape,
  onDeleteShape,
}) => {
  const { globalSettings, pageOverrides } = useMenu();
  const [activeShapeId, setActiveShapeId] = useState(null);
  const [draggingId, setDraggingId] = useState(null);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, startPosX: 0, startPosY: 0 });

  const pageScope = `page${pageIndex + 1}`;
  const currentLogo =
    pageOverrides[pageScope]?.logoImage !== undefined
      ? pageOverrides[pageScope].logoImage
      : globalSettings?.logoImage || 'logo.jpg';
  const hasCustomLogo = currentLogo && currentLogo.startsWith('data:image');

  const handleMouseDown = (e, shape) => {
    if (e.button !== 0 || e.target.closest('.no-drag')) return;
    e.preventDefault();
    e.stopPropagation();
    setActiveShapeId(shape.id);
    setDraggingId(shape.id);

    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startPosX: shape.posX || 50,
      startPosY: shape.posY || 50,
    };

    const onMouseMove = (moveEvent) => {
      // Container width roughly 794px, height 1123px
      const deltaXPercent = ((moveEvent.clientX - dragStartRef.current.mouseX) / 794) * 100;
      const deltaYPercent = ((moveEvent.clientY - dragStartRef.current.mouseY) / 1123) * 100;

      const nextX = Math.min(95, Math.max(5, dragStartRef.current.startPosX + deltaXPercent));
      const nextY = Math.min(95, Math.max(5, dragStartRef.current.startPosY + deltaYPercent));

      if (onUpdateShape) {
        onUpdateShape(pageIndex, shape.id, {
          posX: parseFloat(nextX.toFixed(1)),
          posY: parseFloat(nextY.toFixed(1)),
        });
      }
    };

    const onMouseUp = () => {
      setDraggingId(null);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleUploadImage = (shapeId) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        try {
          const optimized = await optimizeImageFile(file, 800, 800, 0.95);
          if (onUpdateShape) {
            onUpdateShape(pageIndex, shapeId, { image: optimized, contentType: 'image' });
          }
        } catch {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (onUpdateShape) onUpdateShape(pageIndex, shapeId, { image: event.target.result, contentType: 'image' });
          };
          reader.readAsDataURL(file);
        }
      }
    };
    input.click();
  };

  if (!shapes || shapes.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      {shapes.map((shape) => {
        const shapeDef = SHAPE_DEFS[shape.shapeType] || SHAPE_DEFS.circle;
        const size = shape.size || 90;
        const posX = shape.posX !== undefined ? shape.posX : 50;
        const posY = shape.posY !== undefined ? shape.posY : 50;
        const rotation = shape.rotation || 0;
        const borderColor = shape.borderColor || '#c9aa58';
        const borderWidth = shape.borderWidth !== undefined ? shape.borderWidth : 2;
        const isAlsafiLogo = shape.contentType === 'logo' || shape.shapeType === 'alsafi' || shape.isLogo;

        return (
          <div
            key={shape.id}
            className="absolute pointer-events-auto cursor-grab active:cursor-grabbing group select-none transition-shadow"
            style={{
              left: `${posX}%`,
              top: `${posY}%`,
              width: `${size}px`,
              height: shape.shapeType === 'free' ? 'auto' : `${size}px`,
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              transformOrigin: 'center center',
            }}
            onMouseDown={(e) => handleMouseDown(e, shape)}
            onClick={(e) => {
              e.stopPropagation();
              setActiveShapeId(shape.id);
            }}
          >
            {/* Shape Outer Container with Glow and Shadow */}
            <div
              className={`w-full relative rounded-2xl transition-all ${
                shape.shapeType === 'free' ? 'h-auto drop-shadow-none' : 'h-full'
              } ${
                shape.shapeType !== 'free' && shape.showGlow !== false
                  ? 'drop-shadow-[0_8px_18px_rgba(0,0,0,0.88)]'
                  : shape.shapeType !== 'free'
                  ? 'drop-shadow-md'
                  : ''
              }`}
            >
              {/* Layer 1: Clipped Image or Logo or Icon/Text */}
              <div
                className={`w-full relative flex items-center justify-center overflow-hidden ${
                  shape.shapeType === 'free' ? 'h-auto bg-transparent' : 'h-full bg-[#050f09]'
                }`}
                style={{
                  clipPath: shapeDef.clipPath,
                }}
              >
                {shape.image ? (
                  <img
                    src={shape.image}
                    alt="Food Spotlight"
                    className={`w-full pointer-events-none ${
                      shape.shapeType === 'free'
                        ? 'h-auto object-contain'
                        : 'h-full object-cover object-center'
                    }`}
                    draggable={false}
                  />
                ) : isAlsafiLogo ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-gradient-to-b from-[#0f2c1a] to-[#040e08]">
                    {hasCustomLogo ? (
                      <img
                        src={currentLogo}
                        alt="Alsafi Logo"
                        className="w-3/4 h-3/4 object-contain pointer-events-none drop-shadow-md"
                        draggable={false}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <div
                          style={{
                            width: `${Math.max(22, size * 0.38)}px`,
                            height: `${Math.max(22, size * 0.38)}px`,
                          }}
                          className="rounded-full bg-gradient-to-br from-brand-goldLight via-brand-gold to-yellow-800 flex items-center justify-center font-cinzel font-bold text-brand-bg shadow-md"
                        >
                          <span style={{ fontSize: `${Math.max(11, size * 0.2)}px` }}>A</span>
                        </div>
                        <span
                          className="text-brand-goldLight tracking-[0.2em] font-cinzel font-bold uppercase mt-1 leading-none block"
                          style={{ fontSize: `${Math.max(6.5, size * 0.08)}px` }}
                        >
                          AL SAFI
                        </span>
                      </div>
                    )}
                    {shape.badgeText && (
                      <span
                        className="font-bold text-brand-gold uppercase tracking-wider font-cinzel leading-tight block mt-0.5"
                        style={{ fontSize: `${Math.max(6.5, size * 0.08)}px` }}
                      >
                        {shape.badgeText}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-1.5 text-center bg-gradient-to-b from-[#0f2c1a] to-[#040e08]">
                    <span
                      className="select-none leading-none block transition-transform"
                      style={{
                        fontSize:
                          shape.badgeText || shape.subText
                            ? `${Math.max(16, size * 0.28)}px`
                            : `${Math.max(24, size * 0.44)}px`,
                        marginBottom: shape.badgeText || shape.subText ? '2px' : '0px',
                      }}
                    >
                      {shape.icon || '✨'}
                    </span>
                    {shape.badgeText && (
                      <span
                        className="font-bold text-brand-gold uppercase tracking-wider font-cinzel leading-tight block"
                        style={{ fontSize: `${Math.max(6.5, size * 0.085)}px` }}
                      >
                        {shape.badgeText}
                      </span>
                    )}
                    {shape.subText && (
                      <span
                        className="text-slate-300 italic font-serif leading-none mt-0.5 block"
                        style={{ fontSize: `${Math.max(6, size * 0.075)}px` }}
                      >
                        {shape.subText}
                      </span>
                    )}
                  </div>
                )}

              </div>

              {/* Layer 2: Ornate SVG Border Frame */}
              {shapeDef.svgBorder(size, borderColor, borderWidth)}

              {/* Optional Text Overlay Badge on bottom of shape */}
              {shape.image && shape.badgeText && (
                <div className="absolute bottom-1 inset-x-1 flex justify-center pointer-events-none">
                  <span className="bg-black/95 text-brand-gold border border-brand-gold/70 text-[7.5px] font-bold px-1.5 py-0.2 rounded-full shadow-lg font-cinzel tracking-wider uppercase">
                    {shape.badgeText}
                  </span>
                </div>
              )}
              {/* Active State Highlight Border (Hide on Print) */}
              {isActive && (
                <div className="absolute -inset-2 border border-brand-gold border-dashed rounded-xl pointer-events-none z-50 no-print">
                  <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-brand-gold rounded-full" />
                  <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-brand-gold rounded-full" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-brand-gold rounded-full" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-brand-gold rounded-full" />
                </div>
              )}
            </div>

            {/* Floating Action Menu on Hover / Active */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/95 border border-brand-gold/70 rounded-lg py-1 px-1.5 flex items-center gap-1.5 shadow-2xl z-50 no-print no-drag backdrop-blur-md">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateShape(pageIndex, shape.id, {
                    contentType: shape.contentType === 'logo' || shape.shapeType === 'alsafi' ? 'icon' : 'logo',
                    image: '',
                  });
                }}
                className={`p-1 rounded transition text-xs font-cinzel font-bold ${
                  shape.contentType === 'logo' || shape.shapeType === 'alsafi'
                    ? 'bg-brand-gold text-black'
                    : 'text-brand-goldLight hover:bg-brand-gold hover:text-black'
                }`}
                title="تبديل إلى شعار الصافي / أيقونة"
              >
                ⚜️
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUploadImage(shape.id);
                }}
                className="p-1 hover:bg-brand-gold hover:text-black text-brand-goldLight rounded transition"
                title="تغيير / رفع صورة طبق"
              >
                <Camera className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateShape(pageIndex, shape.id, {
                    size: Math.min(220, size + 15),
                  });
                }}
                className="p-1 hover:bg-brand-gold hover:text-black text-brand-goldLight rounded transition font-bold text-[10px]"
                title="تكبير الحجم (+15px)"
              >
                <ZoomIn className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateShape(pageIndex, shape.id, {
                    rotation: (rotation + 45) % 360,
                  });
                }}
                className="p-1 hover:bg-brand-gold hover:text-black text-brand-goldLight rounded transition"
                title="تدوير الشكل (+45°)"
              >
                <RotateCw className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onDeleteShape) onDeleteShape(pageIndex, shape.id);
                }}
                className="p-1 hover:bg-red-600 text-red-400 hover:text-white rounded transition"
                title="حذف هذا الشكل"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FloatingShapeOverlay;

