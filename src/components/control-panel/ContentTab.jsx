import React, { useState } from 'react';
import { Layers, Utensils, Sliders, RotateCcw, Type, Square, AlignCenter, AlignLeft, AlignRight, Sparkles, Hash } from 'lucide-react';
import { useMenu } from '../../context/MenuContext';

// Import child components
import PageImageControls from './content-settings/PageImageControls';
import CategoryItemEditor from './content-settings/CategoryItemEditor';
import CalloutCardEditor from './content-settings/CalloutCardEditor';
import FreeTextEditor from './content-settings/FreeTextEditor';
import Page13Editor from './content-settings/Page13Editor';

export const ContentTab = () => {
  const { pages, resetToOfficialPdfData, updatePage, updateSetting, getEffectiveSettingsForPage } = useMenu();
  const [editPageIdx, setEditPageIdx] = useState(0);
  const [editCatIdx, setEditCatIdx] = useState(0);

  const currentPage = pages[editPageIdx] || pages[0];
  const categories = currentPage?.categories || [];
  const currentCat = categories[editCatIdx] || categories[0];
  const pageImages = currentPage?.images || [];
  
  // الإعدادات الفعلية للصفحة الحالية
  const effectiveSettings = getEffectiveSettingsForPage(editPageIdx);
  const pageScope = `page${editPageIdx + 1}`;

  const categoryBadgeStyle = effectiveSettings.categoryBadgeStyle || 'pill';
  const categoryPillOffsetX = effectiveSettings.categoryPillOffsetX ?? 0;
  const categoryPillOffsetY = effectiveSettings.categoryPillOffsetY ?? 0;
  const categoryPillPaddingX = effectiveSettings.categoryPillPaddingX !== undefined ? effectiveSettings.categoryPillPaddingX : 12;
  const categoryPillPaddingLeft = effectiveSettings.categoryPillPaddingLeft !== undefined ? effectiveSettings.categoryPillPaddingLeft : categoryPillPaddingX;
  const categoryPillPaddingRight = effectiveSettings.categoryPillPaddingRight !== undefined ? effectiveSettings.categoryPillPaddingRight : categoryPillPaddingX;
  const categoryPillPaddingY = effectiveSettings.categoryPillPaddingY !== undefined ? effectiveSettings.categoryPillPaddingY : 4;
  const categoryPillRadius = effectiveSettings.categoryPillRadius !== undefined ? effectiveSettings.categoryPillRadius : 6;
  const categoryPillBorderWidth = effectiveSettings.categoryPillBorderWidth !== undefined ? effectiveSettings.categoryPillBorderWidth : 1;
  const categoryPillBgOpacity = effectiveSettings.categoryPillBgOpacity !== undefined ? effectiveSettings.categoryPillBgOpacity : 96;
  const showCategoryCode = effectiveSettings.showCategoryCode !== false;
  const categoryCodePosition = effectiveSettings.categoryCodePosition || 'left';
  const categoryCodeSize = effectiveSettings.categoryCodeSize || 22;
  const catTitleSize = effectiveSettings.catTitleSize !== undefined ? effectiveSettings.catTitleSize : 16;
  const categoryLetterSpacing = effectiveSettings.categoryLetterSpacing !== undefined ? effectiveSettings.categoryLetterSpacing : 0.12;
  const categoryPillNoWrap = effectiveSettings.categoryPillNoWrap !== false;
  const categoryTextColor = effectiveSettings.categoryTextColor || 'gold-light';
  const categoryAlign = effectiveSettings.categoryAlign || 'center';

  return (
    <div className="space-y-4 animate-fade-in text-right" dir="rtl">
      {/* Sync with Official PDF Data */}
      <div className="bg-black/50 border border-brand-gold/30 rounded-xl p-2.5 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-white block">مزامنة محتوى المنيو الرسمي (PDF)</span>
          <span className="text-[9.5px] text-brand-goldLight block">تحديث جميع النصوص والأسعار والأقسام من ملف الـ PDF المعتمد</span>
        </div>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('هل تريد إعادة تعيين ومزامنة جميع النصوص والأسعار مع ملف الـ PDF المعتمد؟ (سيتم الاحتفاظ بالصور المرفوعة)')) {
              resetToOfficialPdfData();
            }
          }}
          className="px-2.5 py-1.5 bg-brand-gold/20 hover:bg-brand-gold text-brand-goldLight hover:text-black border border-brand-gold/50 rounded-lg text-[10px] font-bold transition shadow-sm"
        >
          🔄 مزامنة من PDF
        </button>
      </div>

      {/* Page and Category Selectors */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="cms-label flex items-center gap-1 mb-1">
            <Layers className="w-3 h-3 text-brand-gold" />
            اختر الصفحة:
          </label>
          <select
            className="cms-input font-medium"
            value={editPageIdx}
            onChange={(e) => {
              setEditPageIdx(Number(e.target.value));
              setEditCatIdx(0);
            }}
          >
            {pages.map((p, idx) => (
              <option key={p.id} value={idx}>
                {p.pageNumber} · {p.header?.title ? p.header.title.split('\n')[0] : `صفحة ${idx + 1}`}
              </option>
            ))}
          </select>
        </div>

        {categories.length > 0 && (
          <div>
            <label className="cms-label flex items-center gap-1 mb-1">
              <Utensils className="w-3 h-3 text-brand-gold" />
              اختر القسم:
            </label>
            <select
              className="cms-input font-medium"
              value={editCatIdx}
              onChange={(e) => setEditCatIdx(Number(e.target.value))}
            >
              {categories.map((c, idx) => (
                <option key={c.id} value={idx}>
                  {c.code}. {c.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* If Page 13 (Info & Legend Page) */}
      {(currentPage.layout === 'info' || currentPage.id === 'page13' || editPageIdx === 12) ? (
        <Page13Editor pageIdx={editPageIdx} page={currentPage} />
      ) : (
        <>
          {/* Page Food Photos Quick Control Card */}
          <PageImageControls editPageIdx={editPageIdx} pageImages={pageImages} />

          {/* Page Mode Toggle */}
          <div className="bg-black/40 border border-white/5 rounded-xl p-2.5">
            <label className="text-[11px] text-gray-300 font-bold mb-2 block">نموذج الصفحة (Page Mode):</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => updatePage(editPageIdx, { ...currentPage, pageMode: 'menu' })}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition ${(!currentPage.pageMode || currentPage.pageMode === 'menu') ? 'bg-brand-gold text-black' : 'bg-black/60 text-gray-400 border border-white/10 hover:text-white'}`}
              >
                قائمة عمود واحد
              </button>
              <button
                type="button"
                onClick={() => updatePage(editPageIdx, { ...currentPage, pageMode: 'two-columns' })}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition ${currentPage.pageMode === 'two-columns' ? 'bg-brand-gold text-black' : 'bg-black/60 text-gray-400 border border-white/10 hover:text-white'}`}
              >
                قائمة عمودين + صورة بالأسفل
              </button>
              <button
                type="button"
                onClick={() => updatePage(editPageIdx, { ...currentPage, pageMode: 'free-text' })}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition ${currentPage.pageMode === 'free-text' ? 'bg-brand-gold text-black' : 'bg-black/60 text-gray-400 border border-white/10 hover:text-white'}`}
              >
                محرر نصوص حر
              </button>
            </div>
          </div>

          {/* Comprehensive Category Header & Rectangle Controls Card */}
          {categories.length > 0 && (
            <div className="bg-gradient-to-b from-[#0a1710] to-black/60 border border-brand-gold/30 rounded-xl p-3.5 space-y-4 shadow-xl">
              
              {/* Card Header & Reset */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-brand-gold/20 flex items-center justify-center border border-brand-gold/40">
                    <Sliders className="w-3.5 h-3.5 text-brand-gold" />
                  </div>
                  <div>
                    <span className="text-[12px] text-white font-bold block">تحكم شامل في شارة ومستطيل القسم</span>
                    <span className="text-[9.5px] text-brand-goldLight block">تخصيص كامل للمستطيل والكتابة والرقم</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateSetting(pageScope, 'categoryBadgeStyle', 'pill');
                    updateSetting(pageScope, 'categoryPillOffsetX', 0);
                    updateSetting(pageScope, 'categoryPillOffsetY', 0);
                    updateSetting(pageScope, 'categoryPillPaddingX', 12);
                    updateSetting(pageScope, 'categoryPillPaddingY', 4);
                    updateSetting(pageScope, 'categoryPillRadius', 6);
                    updateSetting(pageScope, 'categoryPillBorderWidth', 1);
                    updateSetting(pageScope, 'categoryPillBgOpacity', 96);
                    updateSetting(pageScope, 'categoryLetterSpacing', 0.12);
                    updateSetting(pageScope, 'categoryPillNoWrap', true);
                    updateSetting(pageScope, 'categoryCodeSize', 22);
                    updateSetting(pageScope, 'categoryCodePosition', 'left');
                    updateSetting(pageScope, 'categoryTextColor', 'gold-light');
                    updateSetting(pageScope, 'categoryAlign', 'center');
                  }}
                  className="text-[9.5px] text-brand-gold hover:text-white bg-brand-gold/10 hover:bg-brand-gold/20 border border-brand-gold/30 rounded-lg px-2 py-1 flex items-center gap-1 transition cursor-pointer"
                  title="استعادة الإعدادات الافتراضية للشارة"
                >
                  <RotateCcw className="w-3 h-3" />
                  إعادة ضبط
                </button>
              </div>

              {/* 1. Badge Design Presets */}
              <div>
                <label className="text-[10.5px] font-bold text-gray-300 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-brand-gold" />
                  شكل وتصميم الشارة:
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[
                    { id: 'pill', name: 'أخضر ملكي', icon: '🟩' },
                    { id: 'outline', name: 'إطار مفرغ', icon: '🔲' },
                    { id: 'gold', name: 'ذهبي لامع', icon: '👑' },
                    { id: 'art-deco', name: 'Art Deco', icon: '⚜️' },
                    { id: 'minimal', name: 'نص نقي', icon: '✨' },
                  ].map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => updateSetting(pageScope, 'categoryBadgeStyle', style.id)}
                      className={`py-1.5 px-1 rounded-lg text-[9.5px] font-bold transition flex flex-col items-center gap-0.5 border ${
                        categoryBadgeStyle === style.id
                          ? 'bg-brand-gold text-black border-brand-gold shadow-md'
                          : 'bg-black/40 text-gray-300 border-white/10 hover:bg-black/60 hover:text-white'
                      }`}
                    >
                      <span className="text-xs">{style.icon}</span>
                      <span>{style.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Rectangle Dimensions & Box Styling (Shown if box styles active) */}
              {categoryBadgeStyle !== 'minimal' && categoryBadgeStyle !== 'art-deco' && (
                <div className="bg-black/30 border border-white/5 rounded-xl p-2.5 space-y-3">
                  <span className="text-[10.5px] font-bold text-brand-goldLight flex items-center gap-1">
                    <Square className="w-3 h-3 text-brand-gold" />
                    أبعاد وخصائص المستطيل (Box Geometry):
                  </span>

                  {/* Padding X (Length) & Padding Y (Height) */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-gray-300">طول المستطيل الإجمالي:</span>
                        <span className="text-[10px] text-brand-gold font-mono font-bold">{categoryPillPaddingX}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="80"
                        step="1"
                        value={categoryPillPaddingX}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          updateSetting(pageScope, 'categoryPillPaddingX', val);
                          updateSetting(pageScope, 'categoryPillPaddingLeft', val);
                          updateSetting(pageScope, 'categoryPillPaddingRight', val);
                        }}
                        className="w-full h-1.5 accent-yellow-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-gray-300">ارتفاع المستطيل (Padding Y):</span>
                        <span className="text-[10px] text-brand-gold font-mono font-bold">{categoryPillPaddingY}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="35"
                        step="1"
                        value={categoryPillPaddingY}
                        onChange={(e) => updateSetting(pageScope, 'categoryPillPaddingY', Number(e.target.value))}
                        className="w-full h-1.5 accent-yellow-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Independent Left and Right Edge Trimming */}
                  <div className="grid grid-cols-2 gap-2 bg-black/40 p-2 rounded-lg border border-white/5">
                    <div>
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-[9px] text-gray-400">طرف اليمين:</span>
                        <span className="text-[9px] text-brand-gold font-mono font-bold">{categoryPillPaddingRight}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="80"
                        step="1"
                        value={categoryPillPaddingRight}
                        onChange={(e) => updateSetting(pageScope, 'categoryPillPaddingRight', Number(e.target.value))}
                        className="w-full h-1.5 accent-yellow-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-[9px] text-gray-400">طرف اليسار:</span>
                        <span className="text-[9px] text-brand-gold font-mono font-bold">{categoryPillPaddingLeft}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="80"
                        step="1"
                        value={categoryPillPaddingLeft}
                        onChange={(e) => updateSetting(pageScope, 'categoryPillPaddingLeft', Number(e.target.value))}
                        className="w-full h-1.5 accent-yellow-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Border Radius & Background Opacity */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-gray-300">انحناء الحواف (Radius):</span>
                        <span className="text-[10px] text-brand-gold font-mono font-bold">{categoryPillRadius}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="35"
                        step="1"
                        value={categoryPillRadius}
                        onChange={(e) => updateSetting(pageScope, 'categoryPillRadius', Number(e.target.value))}
                        className="w-full h-1.5 accent-yellow-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-gray-300">عتامة الخلفية (Opacity):</span>
                        <span className="text-[10px] text-brand-gold font-mono font-bold">{categoryPillBgOpacity}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        value={categoryPillBgOpacity}
                        onChange={(e) => updateSetting(pageScope, 'categoryPillBgOpacity', Number(e.target.value))}
                        className="w-full h-1.5 accent-yellow-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Border Width */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-gray-300">سمك الإطار الذهبي:</span>
                      <span className="text-[10px] text-brand-gold font-mono font-bold">{categoryPillBorderWidth}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="3"
                      step="0.5"
                      value={categoryPillBorderWidth}
                      onChange={(e) => updateSetting(pageScope, 'categoryPillBorderWidth', Number(e.target.value))}
                      className="w-full h-1.5 accent-yellow-500 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* 3. Text & Typography Controls */}
              <div className="bg-black/30 border border-white/5 rounded-xl p-2.5 space-y-3">
                <span className="text-[10.5px] font-bold text-brand-goldLight flex items-center gap-1">
                  <Type className="w-3 h-3 text-brand-gold" />
                  تحكم النصوص والكتابة (Typography):
                </span>

                <div className="grid grid-cols-2 gap-3">
                  {/* Font Size */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-gray-300">حجم خط العنوان:</span>
                      <span className="text-[10px] text-brand-gold font-mono font-bold">{catTitleSize}px</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="30"
                      step="0.5"
                      value={catTitleSize}
                      onChange={(e) => updateSetting(pageScope, 'catTitleSize', Number(e.target.value))}
                      className="w-full h-1.5 accent-yellow-500 cursor-pointer"
                    />
                  </div>

                  {/* Letter Spacing */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-gray-300">تباعد الأحرف (Spacing):</span>
                      <span className="text-[10px] text-brand-gold font-mono font-bold">{categoryLetterSpacing}em</span>
                    </div>
                    <input
                      type="range"
                      min="0.02"
                      max="0.35"
                      step="0.01"
                      value={categoryLetterSpacing}
                      onChange={(e) => updateSetting(pageScope, 'categoryLetterSpacing', Number(e.target.value))}
                      className="w-full h-1.5 accent-yellow-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Single-Line NoWrap Toggle */}
                <div className="flex items-center justify-between pt-1 border-t border-white/5">
                  <div>
                    <span className="text-[10.5px] text-white font-bold block">سطر واحد فقط (منع الانقسام)</span>
                    <span className="text-[9px] text-gray-400 block">إبقاء النص في سطر واحد لتناسق المستطيل</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateSetting(pageScope, 'categoryPillNoWrap', !categoryPillNoWrap)}
                    className={`relative w-9 h-5 rounded-full border transition-all duration-200 flex-shrink-0 cursor-pointer ${
                      categoryPillNoWrap ? 'bg-brand-gold border-brand-gold' : 'bg-gray-700 border-gray-600'
                    }`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
                      categoryPillNoWrap ? 'left-4' : 'left-0.5'
                    }`} />
                  </button>
                </div>

                {/* Text Color Presets */}
                <div>
                  <label className="text-[10px] text-gray-300 block mb-1">لون وتأثير النص:</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'gold-light', label: 'ذهبي كلاسيك' },
                      { id: 'gold-gradient', label: 'تدرج ذهبي لامع' },
                      { id: 'white', label: 'أبيض ناصع' },
                    ].map((col) => (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => updateSetting(pageScope, 'categoryTextColor', col.id)}
                        className={`py-1 px-1.5 rounded-lg text-[9.5px] font-bold border transition ${
                          categoryTextColor === col.id
                            ? 'bg-brand-gold text-black border-brand-gold'
                            : 'bg-black/40 text-gray-300 border-white/10 hover:text-white'
                        }`}
                      >
                        {col.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Category Number (# Code) Controls */}
              <div className="bg-black/30 border border-white/5 rounded-xl p-2.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-bold text-brand-goldLight flex items-center gap-1">
                    <Hash className="w-3 h-3 text-brand-gold" />
                    رقم القسم داخل الشارة (#):
                  </span>
                  <button
                    type="button"
                    onClick={() => updateSetting(pageScope, 'showCategoryCode', !showCategoryCode)}
                    className={`relative w-9 h-5 rounded-full border transition-all duration-200 flex-shrink-0 cursor-pointer ${
                      showCategoryCode ? 'bg-brand-gold border-brand-gold' : 'bg-gray-700 border-gray-600'
                    }`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
                      showCategoryCode ? 'left-4' : 'left-0.5'
                    }`} />
                  </button>
                </div>

                {showCategoryCode && (
                  <div className="grid grid-cols-2 gap-3 pt-1 border-t border-white/5">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-gray-300">حجم مربع الرقم:</span>
                        <span className="text-[10px] text-brand-gold font-mono font-bold">{categoryCodeSize}px</span>
                      </div>
                      <input
                        type="range"
                        min="14"
                        max="40"
                        step="1"
                        value={categoryCodeSize}
                        onChange={(e) => updateSetting(pageScope, 'categoryCodeSize', Number(e.target.value))}
                        className="w-full h-1.5 accent-yellow-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-300 block mb-1">موضع الرقم:</span>
                      <div className="grid grid-cols-2 gap-1">
                        <button
                          type="button"
                          onClick={() => updateSetting(pageScope, 'categoryCodePosition', 'left')}
                          className={`py-1 rounded text-[9.5px] font-bold border transition ${
                            categoryCodePosition === 'left' ? 'bg-brand-gold text-black border-brand-gold' : 'bg-black/40 text-gray-300 border-white/10'
                          }`}
                        >
                          يسار
                        </button>
                        <button
                          type="button"
                          onClick={() => updateSetting(pageScope, 'categoryCodePosition', 'right')}
                          className={`py-1 rounded text-[9.5px] font-bold border transition ${
                            categoryCodePosition === 'right' ? 'bg-brand-gold text-black border-brand-gold' : 'bg-black/40 text-gray-300 border-white/10'
                          }`}
                        >
                          يمين
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Positioning Offsets (X / Y) & Alignment */}
              <div className="bg-black/30 border border-white/5 rounded-xl p-2.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-bold text-brand-goldLight">الموضع والمحاذاة:</span>
                  <div className="flex items-center gap-1">
                    {[
                      { id: 'center', icon: AlignCenter, label: 'توسيط' },
                      { id: 'left', icon: AlignLeft, label: 'يسار' },
                      { id: 'right', icon: AlignRight, label: 'يمين' },
                    ].map((al) => {
                      const Icon = al.icon;
                      return (
                        <button
                          key={al.id}
                          type="button"
                          onClick={() => updateSetting(pageScope, 'categoryAlign', al.id)}
                          className={`p-1 rounded text-[9.5px] border transition ${
                            categoryAlign === al.id ? 'bg-brand-gold text-black border-brand-gold' : 'bg-black/40 text-gray-400 border-white/10'
                          }`}
                          title={al.label}
                        >
                          <Icon className="w-3 h-3" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-gray-300">إزاحة أفقية X:</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="-350"
                          max="350"
                          step="1"
                          value={categoryPillOffsetX || 0}
                          onChange={(e) => updateSetting(pageScope, 'categoryPillOffsetX', parseFloat(e.target.value) || 0)}
                          className="w-12 text-center text-[9px] text-brand-gold font-mono font-bold bg-black/80 px-1 py-0.5 rounded border border-brand-gold/30"
                        />
                        <span className="text-[8px] text-gray-400">px</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="-350"
                      max="350"
                      step="1"
                      value={categoryPillOffsetX}
                      onChange={(e) => updateSetting(pageScope, 'categoryPillOffsetX', Number(e.target.value))}
                      className="w-full h-1.5 accent-yellow-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-gray-300">إزاحة عمودية Y:</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="-100"
                          max="100"
                          step="1"
                          value={categoryPillOffsetY || 0}
                          onChange={(e) => updateSetting(pageScope, 'categoryPillOffsetY', parseFloat(e.target.value) || 0)}
                          className="w-12 text-center text-[9px] text-brand-gold font-mono font-bold bg-black/80 px-1 py-0.5 rounded border border-brand-gold/30"
                        />
                        <span className="text-[8px] text-gray-400">px</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      step="1"
                      value={categoryPillOffsetY}
                      onChange={(e) => updateSetting(pageScope, 'categoryPillOffsetY', Number(e.target.value))}
                      className="w-full h-1.5 accent-yellow-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Content Editor */}
          {currentPage.pageMode === 'free-text' ? (
            <FreeTextEditor pageIdx={editPageIdx} page={currentPage} />
          ) : (!categories || categories.length === 0) ? (
            <div className="text-center text-slate-400 text-xs py-6 px-4 border border-white/10 rounded-lg bg-black/30">
              ℹ️ هذه صفحة معلومات وعناصر ثابتة. يمكنك تعديل نصوصها مباشرة بالنقر عليها في الصفحة نفسها.
            </div>
          ) : (
            <CategoryItemEditor 
              editPageIdx={editPageIdx} 
              editCatIdx={editCatIdx} 
              currentCat={currentCat} 
            />
          )}

          {/* Callout Card Editor */}
          <CalloutCardEditor pageIdx={editPageIdx} page={currentPage} />
        </>
      )}
    </div>
  );
};

export default ContentTab;

