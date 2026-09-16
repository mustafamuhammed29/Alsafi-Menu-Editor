import React from 'react';

/**
 * Curated Luxury Color Palettes for the Royal Page Frame & Decorative Borders
 */
export const BORDER_COLOR_PRESETS = [
  {
    id: 'emerald',
    label: 'أخضر زمردي',
    primary: '#8dc63f',
    secondary: '#a6e247',
    dark: '#5d911b',
    glow: 'rgba(141, 198, 63, 0.4)',
    accentBg: 'from-[#8dc63f] to-[#5d911b]',
    icon: '🌿',
  },
  {
    id: 'gold',
    label: 'ذهبي ملكي',
    primary: '#d4af37',
    secondary: '#f5e3a9',
    dark: '#996515',
    glow: 'rgba(212, 175, 55, 0.4)',
    accentBg: 'from-[#f5e3a9] via-[#d4af37] to-[#996515]',
    icon: '⚜️',
  },
  {
    id: 'white',
    label: 'أبيض لؤلؤي',
    primary: '#ffffff',
    secondary: '#e2e8f0',
    dark: '#94a3b8',
    glow: 'rgba(255, 255, 255, 0.4)',
    accentBg: 'from-[#ffffff] to-[#94a3b8]',
    icon: '⚪',
  },
  {
    id: 'ruby',
    label: 'ياقوتي ملكي',
    primary: '#e11d48',
    secondary: '#fda4af',
    dark: '#881337',
    glow: 'rgba(225, 29, 72, 0.4)',
    accentBg: 'from-[#fda4af] via-[#e11d48] to-[#881337]',
    icon: '🍷',
  },
  {
    id: 'sapphire',
    label: 'أزرق لازوردي',
    primary: '#38bdf8',
    secondary: '#bae6fd',
    dark: '#0369a1',
    glow: 'rgba(56, 189, 248, 0.4)',
    accentBg: 'from-[#bae6fd] via-[#38bdf8] to-[#0369a1]',
    icon: '💎',
  },
  {
    id: 'bronze',
    label: 'برونزي نحاسي',
    primary: '#f59e0b',
    secondary: '#fde68a',
    dark: '#92400e',
    glow: 'rgba(245, 158, 11, 0.4)',
    accentBg: 'from-[#fde68a] via-[#f59e0b] to-[#92400e]',
    icon: '🏺',
  },
  {
    id: 'silver',
    label: 'فضي بلاتيني',
    primary: '#cbd5e1',
    secondary: '#f8fafc',
    dark: '#64748b',
    glow: 'rgba(203, 213, 225, 0.4)',
    accentBg: 'from-[#f8fafc] via-[#cbd5e1] to-[#64748b]',
    icon: '🔘',
  },
  {
    id: 'custom',
    label: 'تخصيص حر',
    primary: '#8dc63f',
    secondary: '#a6e247',
    dark: '#5d911b',
    glow: 'rgba(168, 85, 247, 0.4)',
    accentBg: 'from-pink-500 via-purple-500 to-indigo-500',
    icon: '🎨',
  },
];

export const PageDecorativeBorder = ({
  showBorder = true,
  borderTop = true,
  borderBottom = true,
  borderLeft = true,
  borderRight = true,
  cornerStyle = 'royal', // 'royal' | 'geometric' | 'none'
  borderInset = 12,
  borderWidth = 1.5,
  borderOpacity = 85,
  borderColorScheme = 'default',
  borderColor = null,
  borderSecondaryColor = null,
  theme = 'default',
}) => {
  if (!showBorder && (!borderTop && !borderBottom && !borderLeft && !borderRight)) {
    return null;
  }

  const isCreme = theme === 'creme';

  // 1. Resolve Primary, Secondary, and Dark gradient stop colors
  let primary = borderColor;
  let secondary = borderSecondaryColor;
  let dark = null;

  if (borderColorScheme && borderColorScheme !== 'custom' && borderColorScheme !== 'default') {
    const preset = BORDER_COLOR_PRESETS.find(p => p.id === borderColorScheme);
    if (preset) {
      if (!primary) primary = preset.primary;
      if (!secondary) secondary = preset.secondary;
      dark = preset.dark;
    }
  }

  // Graceful fallbacks if not explicitly provided (preserving original themes)
  if (!primary) {
    primary = isCreme ? '#B88A2A' : '#8dc63f';
  }
  if (!secondary) {
    secondary = isCreme ? '#d6a642' : '#a6e247';
  }
  if (!dark) {
    dark = isCreme ? '#966e1d' : '#5d911b';
  }

  const dotColor = secondary;
  const opacity = borderOpacity / 100;
  const inset = borderInset;
  const w = 794;
  const h = 1123;

  const x1 = inset;
  const y1 = inset;
  const x2 = w - inset;
  const y2 = h - inset;

  const cornerSize = cornerStyle === 'royal' ? 32 : 18;

  // Generate unique gradient IDs to prevent SVG def collisions between multi-page views
  const rawId = React.useId ? React.useId() : '';
  const gradUid = rawId.replace(/[^a-zA-Z0-9]/g, '') || 'border';
  const mainGradId = `goldFrameGrad_${gradUid}`;
  const accentGradId = `emeraldFrameGrad_${gradUid}`;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        style={{ opacity }}
      >
        <defs>
          {/* Main Frame Gradient */}
          <linearGradient id={mainGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primary} />
            <stop offset="50%" stopColor={secondary} />
            <stop offset="100%" stopColor={dark} />
          </linearGradient>

          {/* Secondary Inner Pinstripe Gradient */}
          <linearGradient id={accentGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={secondary} />
            <stop offset="50%" stopColor={primary} />
            <stop offset="100%" stopColor={dark} />
          </linearGradient>
        </defs>

        {/* 1. Primary Outer Border Lines */}
        {borderTop && (
          <line
            x1={cornerStyle !== 'none' ? x1 + cornerSize : x1}
            y1={y1}
            x2={cornerStyle !== 'none' ? x2 - cornerSize : x2}
            y2={y1}
            stroke={`url(#${mainGradId})`}
            strokeWidth={borderWidth}
            strokeLinecap="round"
          />
        )}

        {borderBottom && (
          <line
            x1={cornerStyle !== 'none' ? x1 + cornerSize : x1}
            y1={y2}
            x2={cornerStyle !== 'none' ? x2 - cornerSize : x2}
            y2={y2}
            stroke={`url(#${mainGradId})`}
            strokeWidth={borderWidth}
            strokeLinecap="round"
          />
        )}

        {borderLeft && (
          <line
            x1={x1}
            y1={cornerStyle !== 'none' ? y1 + cornerSize : y1}
            x2={x1}
            y2={cornerStyle !== 'none' ? y2 - cornerSize : y2}
            stroke={`url(#${mainGradId})`}
            strokeWidth={borderWidth}
            strokeLinecap="round"
          />
        )}

        {borderRight && (
          <line
            x1={x2}
            y1={cornerStyle !== 'none' ? y1 + cornerSize : y1}
            x2={x2}
            y2={cornerStyle !== 'none' ? y2 - cornerSize : y2}
            stroke={`url(#${mainGradId})`}
            strokeWidth={borderWidth}
            strokeLinecap="round"
          />
        )}

        {/* 2. Secondary Inner Pinstripe (Thin Luxury Accent) */}
        {borderTop && (
          <line
            x1={cornerStyle !== 'none' ? x1 + cornerSize + 8 : x1 + 6}
            y1={y1 + 4}
            x2={cornerStyle !== 'none' ? x2 - cornerSize - 8 : x2 - 6}
            y2={y1 + 4}
            stroke={`url(#${accentGradId})`}
            strokeWidth={Math.max(0.8, borderWidth * 0.7)}
            opacity="0.85"
          />
        )}
        {borderBottom && (
          <line
            x1={cornerStyle !== 'none' ? x1 + cornerSize + 8 : x1 + 6}
            y1={y2 - 4}
            x2={cornerStyle !== 'none' ? x2 - cornerSize - 8 : x2 - 6}
            y2={y2 - 4}
            stroke={`url(#${accentGradId})`}
            strokeWidth={Math.max(0.8, borderWidth * 0.7)}
            opacity="0.85"
          />
        )}
        {borderLeft && (
          <line
            x1={x1 + 4}
            y1={cornerStyle !== 'none' ? y1 + cornerSize + 8 : y1 + 6}
            x2={x1 + 4}
            y2={cornerStyle !== 'none' ? y2 - cornerSize - 8 : y2 - 6}
            stroke={`url(#${accentGradId})`}
            strokeWidth={Math.max(0.8, borderWidth * 0.7)}
            opacity="0.85"
          />
        )}
        {borderRight && (
          <line
            x1={x2 - 4}
            y1={cornerStyle !== 'none' ? y1 + cornerSize + 8 : y1 + 6}
            x2={x2 - 4}
            y2={cornerStyle !== 'none' ? y2 - cornerSize - 8 : y2 - 6}
            stroke={`url(#${accentGradId})`}
            strokeWidth={Math.max(0.8, borderWidth * 0.7)}
            opacity="0.85"
          />
        )}

        {/* 3. Luxury Royal Corners (Ornate Arabesque / Baroque Filigree) */}
        {cornerStyle === 'royal' && (
          <>
            {/* Top-Left Corner */}
            {(borderTop || borderLeft) && (
              <g transform={`translate(${x1}, ${y1})`}>
                <path
                  d="M 0,0 L 0,32 C 0,16 16,0 32,0 L 0,0 Z"
                  fill="none"
                  stroke={`url(#${mainGradId})`}
                  strokeWidth={borderWidth}
                />
                <path
                  d="M 6,6 L 6,24 C 6,12 12,6 24,6 Z"
                  fill={primary}
                  fillOpacity="0.16"
                  stroke={`url(#${accentGradId})`}
                  strokeWidth="1"
                />
                <circle cx="10" cy="10" r="2.5" fill={secondary} />
                <path d="M 0,14 C 7,14 14,7 14,0" fill="none" stroke={primary} strokeWidth="1" />
              </g>
            )}

            {/* Top-Right Corner */}
            {(borderTop || borderRight) && (
              <g transform={`translate(${x2}, ${y1}) scale(-1, 1)`}>
                <path
                  d="M 0,0 L 0,32 C 0,16 16,0 32,0 L 0,0 Z"
                  fill="none"
                  stroke={`url(#${mainGradId})`}
                  strokeWidth={borderWidth}
                />
                <path
                  d="M 6,6 L 6,24 C 6,12 12,6 24,6 Z"
                  fill={primary}
                  fillOpacity="0.16"
                  stroke={`url(#${accentGradId})`}
                  strokeWidth="1"
                />
                <circle cx="10" cy="10" r="2.5" fill={secondary} />
                <path d="M 0,14 C 7,14 14,7 14,0" fill="none" stroke={primary} strokeWidth="1" />
              </g>
            )}

            {/* Bottom-Left Corner */}
            {(borderBottom || borderLeft) && (
              <g transform={`translate(${x1}, ${y2}) scale(1, -1)`}>
                <path
                  d="M 0,0 L 0,32 C 0,16 16,0 32,0 L 0,0 Z"
                  fill="none"
                  stroke={`url(#${mainGradId})`}
                  strokeWidth={borderWidth}
                />
                <path
                  d="M 6,6 L 6,24 C 6,12 12,6 24,6 Z"
                  fill={primary}
                  fillOpacity="0.16"
                  stroke={`url(#${accentGradId})`}
                  strokeWidth="1"
                />
                <circle cx="10" cy="10" r="2.5" fill={secondary} />
                <path d="M 0,14 C 7,14 14,7 14,0" fill="none" stroke={primary} strokeWidth="1" />
              </g>
            )}

            {/* Bottom-Right Corner */}
            {(borderBottom || borderRight) && (
              <g transform={`translate(${x2}, ${y2}) scale(-1, -1)`}>
                <path
                  d="M 0,0 L 0,32 C 0,16 16,0 32,0 L 0,0 Z"
                  fill="none"
                  stroke={`url(#${mainGradId})`}
                  strokeWidth={borderWidth}
                />
                <path
                  d="M 6,6 L 6,24 C 6,12 12,6 24,6 Z"
                  fill={primary}
                  fillOpacity="0.16"
                  stroke={`url(#${accentGradId})`}
                  strokeWidth="1"
                />
                <circle cx="10" cy="10" r="2.5" fill={secondary} />
                <path d="M 0,14 C 7,14 14,7 14,0" fill="none" stroke={primary} strokeWidth="1" />
              </g>
            )}
          </>
        )}

        {/* 4. Modern Geometric Corners */}
        {cornerStyle === 'geometric' && (
          <>
            {(borderTop || borderLeft) && (
              <g transform={`translate(${x1}, ${y1})`}>
                <polyline
                  points="0,18 0,0 18,0"
                  fill="none"
                  stroke={`url(#${mainGradId})`}
                  strokeWidth={borderWidth * 1.3}
                />
                <polyline
                  points="4,14 4,4 14,4"
                  fill="none"
                  stroke={`url(#${accentGradId})`}
                  strokeWidth="1"
                />
                <circle cx="7" cy="7" r="1.5" fill={dotColor} />
              </g>
            )}

            {(borderTop || borderRight) && (
              <g transform={`translate(${x2}, ${y1}) scale(-1, 1)`}>
                <polyline
                  points="0,18 0,0 18,0"
                  fill="none"
                  stroke={`url(#${mainGradId})`}
                  strokeWidth={borderWidth * 1.3}
                />
                <polyline
                  points="4,14 4,4 14,4"
                  fill="none"
                  stroke={`url(#${accentGradId})`}
                  strokeWidth="1"
                />
                <circle cx="7" cy="7" r="1.5" fill={dotColor} />
              </g>
            )}

            {(borderBottom || borderLeft) && (
              <g transform={`translate(${x1}, ${y2}) scale(1, -1)`}>
                <polyline
                  points="0,18 0,0 18,0"
                  fill="none"
                  stroke={`url(#${mainGradId})`}
                  strokeWidth={borderWidth * 1.3}
                />
                <polyline
                  points="4,14 4,4 14,4"
                  fill="none"
                  stroke={`url(#${accentGradId})`}
                  strokeWidth="1"
                />
                <circle cx="7" cy="7" r="1.5" fill={dotColor} />
              </g>
            )}

            {(borderBottom || borderRight) && (
              <g transform={`translate(${x2}, ${y2}) scale(-1, -1)`}>
                <polyline
                  points="0,18 0,0 18,0"
                  fill="none"
                  stroke={`url(#${mainGradId})`}
                  strokeWidth={borderWidth * 1.3}
                />
                <polyline
                  points="4,14 4,4 14,4"
                  fill="none"
                  stroke={`url(#${accentGradId})`}
                  strokeWidth="1"
                />
                <circle cx="7" cy="7" r="1.5" fill={dotColor} />
              </g>
            )}
          </>
        )}
      </svg>
    </div>
  );
};

export default PageDecorativeBorder;

