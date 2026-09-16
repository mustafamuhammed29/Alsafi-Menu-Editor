import React, { useState, useEffect } from 'react';
import { ALSAFI_LOGO_DARK } from '../../data/logoDark';
import { DEFAULT_SETTINGS } from '../../data/defaultSettings';
import { DEFAULT_ALSAFI_LOGO } from '../../data/defaultLogo';

// In-memory cache for dynamically recolored custom logos
const dynamicRecolorCache = new Map();

export const RestaurantLogo = ({
  src,
  size = 36,
  className = '',
  multiplier = 1,
  showSubtext = true,
  theme = 'default',
  isCreme = false,
  onClick,
}) => {
  const isCremeMode = isCreme || theme === 'creme';
  const [hasError, setHasError] = useState(false);
  const effectiveHeight = size * multiplier;

  // Determine effective logo source
  const isDefaultWhiteLogo = !src || src === 'logo.jpg' || src === DEFAULT_SETTINGS?.logoImage || src === DEFAULT_ALSAFI_LOGO;
  const initialBase = isCremeMode && isDefaultWhiteLogo ? ALSAFI_LOGO_DARK : (src || DEFAULT_ALSAFI_LOGO);

  const [activeSrc, setActiveSrc] = useState(initialBase);
  const [prevBase, setPrevBase] = useState(initialBase);

  if (initialBase !== prevBase) {
    setPrevBase(initialBase);
    setActiveSrc(initialBase);
    setHasError(false);
  }

  // If in Creme mode with a custom uploaded logo that is NOT the default, attempt auto-recolor if needed
  useEffect(() => {
    if (!isCremeMode || isDefaultWhiteLogo || !src || !src.startsWith('data:image')) {
      return;
    }
    if (dynamicRecolorCache.has(src)) {
      setActiveSrc(dynamicRecolorCache.get(src));
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;
        for (let i = 0; i < d.length; i += 4) {
          if (d[i + 3] > 10) {
            const isGreenLeaf = (d[i + 1] > d[i] + 20) && (d[i + 1] > d[i + 2] + 20);
            if (!isGreenLeaf) {
              d[i] = 15;     // #0F (Hauptgrün)
              d[i + 1] = 59; // #3B
              d[i + 2] = 46; // #2E
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);
        const recolored = canvas.toDataURL('image/png');
        dynamicRecolorCache.set(src, recolored);
        setActiveSrc(recolored);
      } catch (e) {
        // Fallback to original
      }
    };
    img.src = src;
  }, [isCremeMode, isDefaultWhiteLogo, src]);

  const isDataUrl = activeSrc && activeSrc.startsWith('data:image');
  const shouldUseFallback = hasError || !activeSrc || (activeSrc === 'logo.jpg' && hasError);

  return (
    <div
      className={`flex flex-col items-center cursor-pointer group ${className}`}
      onClick={onClick}
      title="انقر لتغيير صورة الشعار"
    >
      {isDataUrl || (!shouldUseFallback && activeSrc) ? (
        <img
          src={activeSrc}
          alt="Alsafi Logo"
          className="object-contain max-w-full transition-transform group-hover:scale-105"
          style={{ height: `${effectiveHeight}px`, maxHeight: `${effectiveHeight}px` }}
          onError={() => setHasError(true)}
          onLoad={() => setHasError(false)}
        />
      ) : (
        <div
          style={{
            width: `${effectiveHeight}px`,
            height: `${effectiveHeight}px`,
            fontSize: `${Math.max(12, effectiveHeight * 0.45)}px`,
          }}
          className={`rounded-full flex items-center justify-center font-cinzel font-bold shadow-md transition-transform group-hover:scale-105 ${
            isCremeMode
              ? 'bg-[#0F3B2E] text-white'
              : 'bg-gradient-to-br from-[#a6e247] via-[#8dc63f] to-[#162a1c] text-white'
          }`}
        >
          A
        </div>
      )}

      {showSubtext && (
        <span
          className={`tracking-[0.4em] uppercase mt-0.5 block font-semibold ${
            isCremeMode ? 'text-[#B88A2A]' : 'text-brand-goldLight'
          }`}
          style={{ fontSize: multiplier > 1 ? '9px' : '7px' }}
        >
          ✦ Restaurant ✦
        </span>
      )}
    </div>
  );
};

export default RestaurantLogo;

