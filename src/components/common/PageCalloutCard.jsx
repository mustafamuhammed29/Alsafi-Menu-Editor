import React from 'react';
import { Sparkles } from 'lucide-react';
import EditableText from './EditableText';

/**
 * Luxury Recommendation & Special Note Callout Card
 * Rendered at the bottom of pages with spare whitespace (e.g. Breakfast, Sides/Dessert, Boxes).
 */
export const PageCalloutCard = ({
  callout,
  pageIndex,
  onUpdateCallout,
  className = '',
}) => {
  if (!callout || callout.show === false) return null;

  const styleMode = callout.style || 'royal';

  let containerClass = "w-full p-2.5 px-3.5 my-1.5 relative group ";
  let glow = null;

  if (styleMode === 'royal') {
    containerClass += "bg-gradient-to-r from-[#0e2719]/90 via-[#07160e]/95 to-[#0e2719]/90 border border-brand-gold/45 rounded-xl shadow-lg";
    glow = <div className="absolute -top-6 -right-6 w-16 h-16 bg-brand-gold/15 rounded-full blur-lg pointer-events-none"></div>;
  } else if (styleMode === 'solid') {
    containerClass += "bg-[#0e2719] border border-brand-gold/20 rounded-xl shadow-lg";
  } else if (styleMode === 'minimal') {
    containerClass += "border border-brand-gold/30 bg-black/40 rounded-xl shadow-md";
  } else if (styleMode === 'none') {
    containerClass += "bg-transparent border-none";
  }

  return (
    <div
      className={`${containerClass} ${className}`}
    >
      {glow}

      <div className="flex items-center gap-2.5 relative z-10">
        {/* Callout Icon */}
        <div className="w-7 h-7 rounded-lg bg-black/60 border border-brand-gold/50 flex items-center justify-center text-sm shrink-0 shadow-inner">
          {callout.icon || '✨'}
        </div>

        {/* Callout Text & Badge */}
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center gap-2 mb-0.5">
            <EditableText
              value={callout.badge || '✨ ALSAFI TIPP'}
              onChange={(v) => onUpdateCallout && onUpdateCallout(pageIndex, 'badge', v)}
              className="font-cinzel text-[9.5px] font-bold text-brand-gold tracking-widest uppercase block"
            />
          </div>

          <EditableText
            value={callout.text || ''}
            onChange={(v) => onUpdateCallout && onUpdateCallout(pageIndex, 'text', v)}
            className="text-[10px] text-slate-200 font-sans leading-relaxed block"
          />
        </div>
      </div>
    </div>
  );
};

export default PageCalloutCard;
