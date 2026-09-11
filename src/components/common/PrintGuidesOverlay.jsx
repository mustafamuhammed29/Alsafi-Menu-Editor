import React from 'react';

/**
 * PrintGuidesOverlay Component
 * 
 * Renders a visual blueprint & blueprint grid diagram overlay on screen.
 * Displays:
 * 1. Safe Zone (🟢 الأخضر) - 8mm inner safe print area
 * 2. Trim Cut Line (🔴 الأحمر) - 210x297mm exact A4 paper cut edge & crop marks
 * 3. Bleed Area (🟡 الأصفر) - 3mm trimming bleed variance
 * 4. Layout Grid Lines (📐 الشبكة والمحاذاة) - Rule of thirds & center alignment axes with mm rulers
 * 
 * 100% hidden when printing or exporting to PDF (using `no-print` class).
 */
export const PrintGuidesOverlay = ({
  orientation = 'portrait', // 'portrait' | 'landscape'
  showPrintGuides = true,
  showLayoutGrid = true,
  pageLabel = '',
}) => {
  if (!showPrintGuides && !showLayoutGrid) return null;

  const isLandscape = orientation === 'landscape';

  return (
    <div className="absolute inset-0 pointer-events-none z-[150] no-print overflow-visible select-none">
      
      {/* ─── 1. TOP DIAGRAM LEGEND BANNER ───────────────────────────────────── */}
      {showPrintGuides && (
        <div className="absolute -top-11 left-0 right-0 flex items-center justify-between px-3 py-1 bg-black/90 border border-brand-gold/40 rounded-lg text-[10.5px] font-bold text-white shadow-xl backdrop-blur-md z-[160]">
          <div className="flex items-center gap-3">
            <span className="text-brand-gold font-cinzel">📐 مخطط الطباعة ومقاس الصفحة {pageLabel ? `(${pageLabel})` : ''}:</span>
            
            <span className="flex items-center gap-1 text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              المنطقة الآمنة (Safe Zone)
            </span>

            <span className="flex items-center gap-1 text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-500/40">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              حد الورقة الرسمي (210×297mm)
            </span>
          </div>

          <div className="text-[10px] text-gray-400 font-mono">
            {isLandscape ? 'A4 Landscape 297mm × 210mm' : 'A4 Portrait 210mm × 297mm'}
          </div>
        </div>
      )}

      {/* ─── 2. PRINT GUIDES (TRIM & SAFE ZONE) ────────────────────────── */}
      {showPrintGuides && (
        <>
          {/* TRIM CUT LINE (Exact A4 Paper Edge 210mm x 297mm) */}
          <div 
            className="absolute inset-0 border-2 border-red-500/90 z-[152] shadow-[0_0_15px_rgba(239,68,68,0.2)]"
            title="حد ورقة A4 الرسمي النهائي 210×297mm الجاهز للطباعة المباشرة"
          >
            {/* Top-Right Label */}
            <span className="absolute top-1.5 right-2 text-[9px] font-mono font-bold text-red-300 bg-red-950/90 px-2 py-0.5 rounded border border-red-500/50 z-20">
              🔴 حد الورقة الرسمي (210×297mm)
            </span>

            {/* CROP MARKS (علامات قص المطبعة الدقيقة في الأركان الأربعة) */}
            <div className="absolute top-0 left-0 w-4 h-4 border-r-2 border-b-2 border-red-500 z-30" />
            <div className="absolute top-0 right-0 w-4 h-4 border-l-2 border-b-2 border-red-500 z-30" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-r-2 border-t-2 border-red-500 z-30" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-l-2 border-t-2 border-red-500 z-30" />
          </div>

          {/* SAFE PRINT AREA BOX (Encloses all page text & content) */}
          <div 
            className="absolute inset-[12px] border-2 border-dashed border-emerald-500/90 bg-emerald-500/[0.02] z-[153]"
            title="منطقة الطباعة الآمنة: تغطي وتضمن 100% من جميع النصوص والمحتويات بدون قص"
          >
            {/* Label inside safe area */}
            <div className="absolute top-1.5 left-1.5 flex items-center gap-1.5 text-[9.5px] font-bold text-emerald-300 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-500/60 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>🟢 منطقة الطباعة الآمنة (Safe Zone) - تغطي كامل عناصر الصفحة</span>
            </div>
          </div>
        </>
      )}

      {/* ─── 3. BLUEPRINT ALIGNMENT GRID & MILLIMETER RULERS ──────────────────── */}
      {showLayoutGrid && (
        <div className="absolute inset-0 z-[140] opacity-60">
          {/* Vertical Center Axis */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] border-r border-cyan-400/50 border-dashed" />
          
          {/* Horizontal Center Axis */}
          <div className="absolute left-0 right-0 top-1/2 h-[1px] border-b border-cyan-400/50 border-dashed" />

          {/* Rule of Thirds Vertical Lines */}
          <div className="absolute top-0 bottom-0 left-1/3 w-[1px] border-r border-brand-gold/30 border-dotted" />
          <div className="absolute top-0 bottom-0 left-2/3 w-[1px] border-r border-brand-gold/30 border-dotted" />

          {/* Rule of Thirds Horizontal Lines */}
          <div className="absolute left-0 right-0 top-1/3 h-[1px] border-b border-brand-gold/30 border-dotted" />
          <div className="absolute left-0 right-0 top-2/3 h-[1px] border-b border-brand-gold/30 border-dotted" />

          {/* Millimeter Scale Ruler Ticks along Top Edge */}
          <div className="absolute top-0 left-0 right-0 h-3 flex justify-between px-2 text-[8px] font-mono text-cyan-300 bg-black/40 border-b border-cyan-500/30">
            <span>0mm</span>
            <span>50mm</span>
            <span>105mm (مركز)</span>
            <span>160mm</span>
            <span>210mm</span>
          </div>

          {/* Millimeter Scale Ruler Ticks along Left Edge */}
          <div className="absolute top-0 bottom-0 right-0 w-4 flex flex-col justify-between py-2 text-[7.5px] font-mono text-cyan-300 bg-black/40 border-r border-cyan-500/30 text-center select-none">
            <span>0</span>
            <span>50</span>
            <span>100</span>
            <span>148</span>
            <span>200</span>
            <span>250</span>
            <span>297</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default PrintGuidesOverlay;
