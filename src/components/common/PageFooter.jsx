import React from 'react';
import EditableText from './EditableText';

export const PageFooter = ({
  pageData,
  pageIndex,
  pageSettings,
  onUpdateHeader,
  onUpdateFooterText,
}) => {
  const p = pageSettings;

  // Global & Page-specific footer settings
  const footerText = pageData.footerText || p.footerText || 'ALSAFI RESTAURANT · HEIDELBERG';
  const footerTextSize = p.footerTextSize !== undefined ? p.footerTextSize : 10;
  const footerTextLetterSpacing = p.footerTextLetterSpacing !== undefined ? p.footerTextLetterSpacing : 0.25;
  const footerTextColor = p.footerTextColor || 'muted'; // 'muted' | 'gold' | 'gold-gradient' | 'white'
  const footerTextOffsetX = p.footerTextOffsetX || 0;
  const footerTextOffsetY = p.footerTextOffsetY || 0;

  const pageNumber = pageData.pageNumber || String(pageIndex + 1).padStart(2, '0');
  const pageNumberSize = p.pageNumberSize !== undefined ? p.pageNumberSize : 15;
  const pageNumberWeight = p.pageNumberWeight || 'bold';
  const pageNumberColor = p.pageNumberColor || 'gold'; // 'gold' | 'gold-gradient' | 'white'
  const pageNumberOffsetX = p.pageNumberOffsetX || 0;
  const pageNumberOffsetY = p.pageNumberOffsetY || 0;

  const footerBottomOffset = p.footerBottomOffset !== undefined ? p.footerBottomOffset : 36;
  const footerPaddingRight = p.footerPaddingRight !== undefined ? p.footerPaddingRight : (p.contentPaddingRight !== undefined ? p.contentPaddingRight : 34);
  const footerPaddingLeft = p.footerPaddingLeft !== undefined ? p.footerPaddingLeft : (p.contentPaddingLeft !== undefined ? p.contentPaddingLeft : 34);

  const showDivider = p.showFooterDivider !== false;
  const showText = p.showFooterText !== false;
  const showNumber = p.showPageNumber !== false;
  const dividerOpacity = p.footerDividerOpacity !== undefined ? p.footerDividerOpacity / 100 : 0.3;
  const dividerWidth = p.footerDividerWidth !== undefined ? p.footerDividerWidth : 1;

  // Text Color Styling
  let textColorClass = 'text-brand-textMuted';
  if (footerTextColor === 'gold') {
    textColorClass = 'text-brand-gold';
  } else if (footerTextColor === 'gold-gradient') {
    textColorClass = 'bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] via-[#A6E247] to-[#8DC63F]';
  } else if (footerTextColor === 'white') {
    textColorClass = 'text-white';
  }

  // Page Number Color Styling
  let numberColorClass = 'text-brand-gold';
  if (pageNumberColor === 'gold-gradient') {
    numberColorClass = 'bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] via-[#A6E247] to-[#8DC63F]';
  } else if (pageNumberColor === 'white') {
    numberColorClass = 'text-white';
  } else if (pageNumberColor === 'muted') {
    numberColorClass = 'text-brand-textMuted';
  }

  return (
    <footer
      className="absolute flex items-center justify-between font-cinzel select-none z-30 pointer-events-auto"
      style={{
        bottom: `${footerBottomOffset}px`,
        left: `${footerPaddingLeft}px`,
        right: `${footerPaddingRight}px`,
        paddingTop: showDivider ? '4px' : '0px',
        paddingBottom: '2px',
        borderTop: showDivider ? `${dividerWidth}px solid rgba(201, 170, 88, ${dividerOpacity})` : 'none',
        height: '28px',
        boxSizing: 'border-box',
      }}
    >
      {/* Left: Restaurant Insignia Text */}
      <div
        className="flex items-center transition-transform duration-75"
        style={{
          transform: `translate(${footerTextOffsetX}px, ${footerTextOffsetY}px)`,
        }}
      >
        {showText && (
          <EditableText
            value={footerText}
            onChange={(v) => {
              if (onUpdateFooterText) {
                onUpdateFooterText(pageIndex, v);
              } else if (onUpdateHeader) {
                onUpdateHeader(pageIndex, 'footerText', v);
              }
            }}
            className={`font-semibold uppercase tracking-widest block transition-all leading-none ${textColorClass}`}
            style={{
              fontSize: `${footerTextSize}px`,
              letterSpacing: `${footerTextLetterSpacing}em`,
            }}
          />
        )}
      </div>

      {/* Right: Page Number */}
      <div
        className="flex items-center justify-end transition-transform duration-75"
        style={{
          transform: `translate(${pageNumberOffsetX}px, ${pageNumberOffsetY}px)`,
        }}
      >
        {showNumber && (
          <EditableText
            value={pageNumber}
            onChange={(v) => onUpdateHeader && onUpdateHeader(pageIndex, 'pageNumber', v)}
            className={`block leading-none ${numberColorClass}`}
            style={{
              fontSize: `${pageNumberSize}px`,
              fontWeight: pageNumberWeight === 'black' ? 900 : pageNumberWeight === 'normal' ? 500 : 700,
            }}
          />
        )}
      </div>
    </footer>
  );
};

export default PageFooter;
