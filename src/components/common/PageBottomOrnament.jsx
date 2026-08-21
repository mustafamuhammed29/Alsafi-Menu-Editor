import React from 'react';

/**
 * Royal Page Bottom Ornament & Divider
 * Offers selectable styles: 'royal', 'geometric', 'stars', 'classic', 'none'
 */
export const PageBottomOrnament = ({
  style = 'royal',
  color = '#c9aa58',
  opacity = 0.65,
  className = '',
}) => {
  if (!style || style === 'none') return null;

  return (
    <div
      className={`w-full flex items-center justify-center my-1.5 pointer-events-none select-none ${className}`}
      style={{ opacity }}
    >
      {style === 'royal' && (
        <svg
          width="240"
          height="18"
          viewBox="0 0 240 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left Line & Wing */}
          <line x1="10" y1="9" x2="95" y2="9" stroke={color} strokeWidth="0.8" strokeDasharray="3 3" />
          <path d="M75 9 C82 5, 90 4, 98 9" stroke={color} strokeWidth="1" fill="none" />
          <circle cx="98" cy="9" r="1.5" fill={color} />

          {/* Center Rosette / Star */}
          <g transform="translate(120, 9)">
            <path
              d="M0 -6 L1.8 -1.8 L6 0 L1.8 1.8 L0 6 L-1.8 1.8 L-6 0 L-1.8 -1.8 Z"
              fill={color}
            />
            <circle cx="0" cy="0" r="1" fill="#050a07" />
            <circle cx="-12" cy="0" r="1.2" fill={color} />
            <circle cx="12" cy="0" r="1.2" fill={color} />
          </g>

          {/* Right Line & Wing */}
          <circle cx="142" cy="9" r="1.5" fill={color} />
          <path d="M165 9 C158 5, 150 4, 142 9" stroke={color} strokeWidth="1" fill="none" />
          <line x1="145" y1="9" x2="230" y2="9" stroke={color} strokeWidth="0.8" strokeDasharray="3 3" />
        </svg>
      )}

      {style === 'geometric' && (
        <svg
          width="220"
          height="16"
          viewBox="0 0 220 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="15" y1="8" x2="85" y2="8" stroke={color} strokeWidth="0.8" />
          <circle cx="88" cy="8" r="1.5" fill={color} />
          
          {/* Center Geometric Interlace */}
          <rect x="100" y="4" width="8" height="8" transform="rotate(45 104 8)" stroke={color} strokeWidth="1" fill="none" />
          <rect x="112" y="4" width="8" height="8" transform="rotate(45 116 8)" stroke={color} strokeWidth="1" fill="none" />
          <circle cx="110" cy="8" r="2" fill={color} />
          
          <circle cx="132" cy="8" r="1.5" fill={color} />
          <line x1="135" y1="8" x2="205" y2="8" stroke={color} strokeWidth="0.8" />
        </svg>
      )}

      {style === 'stars' && (
        <div className="flex items-center gap-3">
          <div className="h-[0.8px] w-20 bg-gradient-to-r from-transparent via-brand-gold to-brand-gold"></div>
          <div className="flex items-center gap-1.5 text-brand-gold">
            <span className="text-[9px]">✦</span>
            <span className="text-[14px] text-brand-goldLight">★</span>
            <span className="text-[9px]">✦</span>
          </div>
          <div className="h-[0.8px] w-20 bg-gradient-to-l from-transparent via-brand-gold to-brand-gold"></div>
        </div>
      )}

      {style === 'classic' && (
        <div className="flex items-center gap-3 text-brand-gold">
          <div className="h-[0.8px] w-24 bg-gradient-to-r from-transparent to-brand-gold/70"></div>
          <span className="text-[12px] tracking-widest font-serif">❧ ❖ ☙</span>
          <div className="h-[0.8px] w-24 bg-gradient-to-l from-transparent to-brand-gold/70"></div>
        </div>
      )}
    </div>
  );
};

export default PageBottomOrnament;
