import React from 'react';

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
}) => {
  if (!showBorder && (!borderTop && !borderBottom && !borderLeft && !borderRight)) {
    return null;
  }

  const opacity = borderOpacity / 100;
  const inset = borderInset;
  const w = 794;
  const h = 1123;

  const x1 = inset;
  const y1 = inset;
  const x2 = w - inset;
  const y2 = h - inset;

  const cornerSize = cornerStyle === 'royal' ? 32 : 18;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        style={{ opacity }}
      >
        <defs>
          {/* Subtle Gold Gradient */}
          <linearGradient id="goldFrameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c9aa58" />
            <stop offset="50%" stopColor="#e6cd85" />
            <stop offset="100%" stopColor="#9a7b2c" />
          </linearGradient>
          <linearGradient id="emeraldFrameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e6cd85" />
            <stop offset="50%" stopColor="#c9aa58" />
            <stop offset="100%" stopColor="#a38942" />
          </linearGradient>
        </defs>

        {/* 1. Primary Gold Border Lines (with gaps for corners if active) */}
        {borderTop && (
          <line
            x1={cornerStyle !== 'none' ? x1 + cornerSize : x1}
            y1={y1}
            x2={cornerStyle !== 'none' ? x2 - cornerSize : x2}
            y2={y1}
            stroke="url(#goldFrameGrad)"
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
            stroke="url(#goldFrameGrad)"
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
            stroke="url(#goldFrameGrad)"
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
            stroke="url(#goldFrameGrad)"
            strokeWidth={borderWidth}
            strokeLinecap="round"
          />
        )}

        {/* 2. Secondary Inner Emerald Pinstripe (Thin Luxury Accent) */}
        {borderTop && (
          <line
            x1={cornerStyle !== 'none' ? x1 + cornerSize + 8 : x1 + 6}
            y1={y1 + 4}
            x2={cornerStyle !== 'none' ? x2 - cornerSize - 8 : x2 - 6}
            y2={y1 + 4}
            stroke="url(#emeraldFrameGrad)"
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
            stroke="url(#emeraldFrameGrad)"
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
            stroke="url(#emeraldFrameGrad)"
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
            stroke="url(#emeraldFrameGrad)"
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
                  stroke="url(#goldFrameGrad)"
                  strokeWidth={borderWidth}
                />
                <path
                  d="M 6,6 L 6,24 C 6,12 12,6 24,6 Z"
                  fill="rgba(201, 170, 88, 0.15)"
                  stroke="url(#emeraldFrameGrad)"
                  strokeWidth="1"
                />
                <circle cx="10" cy="10" r="2.5" fill="#e6cd85" />
                <path d="M 0,14 C 7,14 14,7 14,0" fill="none" stroke="#c9aa58" strokeWidth="1" />
              </g>
            )}

            {/* Top-Right Corner */}
            {(borderTop || borderRight) && (
              <g transform={`translate(${x2}, ${y1}) scale(-1, 1)`}>
                <path
                  d="M 0,0 L 0,32 C 0,16 16,0 32,0 L 0,0 Z"
                  fill="none"
                  stroke="url(#goldFrameGrad)"
                  strokeWidth={borderWidth}
                />
                <path
                  d="M 6,6 L 6,24 C 6,12 12,6 24,6 Z"
                  fill="rgba(201, 170, 88, 0.15)"
                  stroke="url(#emeraldFrameGrad)"
                  strokeWidth="1"
                />
                <circle cx="10" cy="10" r="2.5" fill="#e6cd85" />
                <path d="M 0,14 C 7,14 14,7 14,0" fill="none" stroke="#c9aa58" strokeWidth="1" />
              </g>
            )}

            {/* Bottom-Left Corner */}
            {(borderBottom || borderLeft) && (
              <g transform={`translate(${x1}, ${y2}) scale(1, -1)`}>
                <path
                  d="M 0,0 L 0,32 C 0,16 16,0 32,0 L 0,0 Z"
                  fill="none"
                  stroke="url(#goldFrameGrad)"
                  strokeWidth={borderWidth}
                />
                <path
                  d="M 6,6 L 6,24 C 6,12 12,6 24,6 Z"
                  fill="rgba(201, 170, 88, 0.15)"
                  stroke="url(#emeraldFrameGrad)"
                  strokeWidth="1"
                />
                <circle cx="10" cy="10" r="2.5" fill="#e6cd85" />
                <path d="M 0,14 C 7,14 14,7 14,0" fill="none" stroke="#c9aa58" strokeWidth="1" />
              </g>
            )}

            {/* Bottom-Right Corner */}
            {(borderBottom || borderRight) && (
              <g transform={`translate(${x2}, ${y2}) scale(-1, -1)`}>
                <path
                  d="M 0,0 L 0,32 C 0,16 16,0 32,0 L 0,0 Z"
                  fill="none"
                  stroke="url(#goldFrameGrad)"
                  strokeWidth={borderWidth}
                />
                <path
                  d="M 6,6 L 6,24 C 6,12 12,6 24,6 Z"
                  fill="rgba(201, 170, 88, 0.15)"
                  stroke="url(#emeraldFrameGrad)"
                  strokeWidth="1"
                />
                <circle cx="10" cy="10" r="2.5" fill="#e6cd85" />
                <path d="M 0,14 C 7,14 14,7 14,0" fill="none" stroke="#c9aa58" strokeWidth="1" />
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
                  stroke="url(#goldFrameGrad)"
                  strokeWidth={borderWidth * 1.3}
                />
                <polyline
                  points="4,14 4,4 14,4"
                  fill="none"
                  stroke="url(#emeraldFrameGrad)"
                  strokeWidth="1"
                />
                <circle cx="7" cy="7" r="1.5" fill="#e6cd85" />
              </g>
            )}

            {(borderTop || borderRight) && (
              <g transform={`translate(${x2}, ${y1}) scale(-1, 1)`}>
                <polyline
                  points="0,18 0,0 18,0"
                  fill="none"
                  stroke="url(#goldFrameGrad)"
                  strokeWidth={borderWidth * 1.3}
                />
                <polyline
                  points="4,14 4,4 14,4"
                  fill="none"
                  stroke="url(#emeraldFrameGrad)"
                  strokeWidth="1"
                />
                <circle cx="7" cy="7" r="1.5" fill="#e6cd85" />
              </g>
            )}

            {(borderBottom || borderLeft) && (
              <g transform={`translate(${x1}, ${y2}) scale(1, -1)`}>
                <polyline
                  points="0,18 0,0 18,0"
                  fill="none"
                  stroke="url(#goldFrameGrad)"
                  strokeWidth={borderWidth * 1.3}
                />
                <polyline
                  points="4,14 4,4 14,4"
                  fill="none"
                  stroke="url(#emeraldFrameGrad)"
                  strokeWidth="1"
                />
                <circle cx="7" cy="7" r="1.5" fill="#e6cd85" />
              </g>
            )}

            {(borderBottom || borderRight) && (
              <g transform={`translate(${x2}, ${y2}) scale(-1, -1)`}>
                <polyline
                  points="0,18 0,0 18,0"
                  fill="none"
                  stroke="url(#goldFrameGrad)"
                  strokeWidth={borderWidth * 1.3}
                />
                <polyline
                  points="4,14 4,4 14,4"
                  fill="none"
                  stroke="url(#emeraldFrameGrad)"
                  strokeWidth="1"
                />
                <circle cx="7" cy="7" r="1.5" fill="#e6cd85" />
              </g>
            )}
          </>
        )}
      </svg>
    </div>
  );
};

export default PageDecorativeBorder;
