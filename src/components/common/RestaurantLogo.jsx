import React, { useState } from 'react';

export const RestaurantLogo = ({
  src,
  size = 36,
  className = '',
  multiplier = 1,
  showSubtext = true,
  onClick,
}) => {
  const [hasError, setHasError] = useState(false);
  const effectiveHeight = size * multiplier;

  // If source changed, reset error state so newly uploaded image will render
  const [prevSrc, setPrevSrc] = useState(src);
  if (src !== prevSrc) {
    setPrevSrc(src);
    setHasError(false);
  }

  const isDataUrl = src && src.startsWith('data:image');
  const shouldUseFallback = hasError || !src || (src === 'logo.jpg' && hasError);

  return (
    <div
      className={`flex flex-col items-center cursor-pointer group ${className}`}
      onClick={onClick}
      title="انقر لتغيير صورة الشعار"
    >
      {isDataUrl || (!shouldUseFallback && src) ? (
        <img
          src={src}
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
          className="rounded-full bg-gradient-to-br from-brand-goldLight via-brand-gold to-yellow-800 flex items-center justify-center font-cinzel font-bold text-brand-bg shadow-md transition-transform group-hover:scale-105"
        >
          A
        </div>
      )}

      {showSubtext && (
        <span
          className="text-brand-goldLight tracking-[0.4em] uppercase mt-0.5 block font-semibold"
          style={{ fontSize: multiplier > 1 ? '9px' : '7px' }}
        >
          ✦ Restaurant ✦
        </span>
      )}
    </div>
  );
};

export default RestaurantLogo;
