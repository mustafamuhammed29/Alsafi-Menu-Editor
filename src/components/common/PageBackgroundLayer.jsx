import React from 'react';

/**
 * 100% Full-Bleed Page Background & Watermark Layer
 * Covers the entire page seamlessly (edge to edge) with objectFit: cover.
 * Optical centering places the Alsafi neon sign right in the center of the menu text column.
 */
export const PageBackgroundLayer = ({
  customBgImage,
  bgOpacity = 45,
  bgBlur = 0,
  bgDarkness = 15,
  bgFit = 'cover',
  bgScale = 100,
  bgPosX = 68,
  bgPosY = 50,
}) => {
  if (!customBgImage) return null;

  const posX = bgPosX !== undefined ? bgPosX : 68;
  const posY = bgPosY !== undefined ? bgPosY : 50;
  const scale = (bgScale !== undefined ? bgScale : 100) / 100;
  const opacity = (bgOpacity !== undefined ? bgOpacity : 45) / 100;
  const darkness = (bgDarkness !== undefined ? bgDarkness : 15) / 100;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 100% Full-Bleed Background Image (Zero black bars, covers entire page) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src={customBgImage}
          alt="Custom Background"
          className="w-full h-full pointer-events-none"
          style={{
            objectFit: bgFit || 'cover',
            objectPosition: `${posX}% ${posY}%`,
            opacity: opacity,
            filter: bgBlur ? `blur(${bgBlur}px)` : 'none',
            transform: `scale(${scale}) ${bgBlur ? 'scale(1.06)' : ''}`,
            transformOrigin: `${posX}% ${posY}%`,
            width: '100%',
            height: '100%',
          }}
          draggable={false}
        />
      </div>

      {/* Dark Contrast Overlay for Crisp Text Readability */}
      {darkness > 0 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${darkness})`,
          }}
        />
      )}
    </div>
  );
};

export default PageBackgroundLayer;
