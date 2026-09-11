import React, { useRef, useState } from 'react';
import { Upload, RefreshCw, Type, Sparkles, Image, Sliders, Eye, EyeOff, Move, Maximize2, Phone, MapPin, Clock, Truck, Sun } from 'lucide-react';
import { useMenu } from '../../../context/MenuContext';
import { DEFAULT_COVER_PAGE } from '../../../data/initialPages';
import { optimizeImageFile } from '../../../utils/imageOptimizer';

export const CoverPageEditor = ({ page }) => {
  const {
    coverPageData,
    showCoverPage,
    setShowCoverPage,
    updateCoverHeader,
    updateCoverPage,
    resetCoverPage,
    updateSetting,
    getEffectiveSettingsForPage,
  } = useMenu();

  const [selectedBlendSlot, setSelectedBlendSlot] = useState(0);
  const currentCover = page || coverPageData;
  const heroImageInputRef = useRef(null);
  const effectiveSettings = getEffectiveSettingsForPage(0);

  const contact = currentCover.contactInfo || {
    phone: '06221 72 59 000',
    address: 'Hertzstraße 1, 69126 Heidelberg - Kaufland',
    hours: 'Mo-Sa 11:00-22:00 | So & Feiertage 12:00-22:00',
    delivery: 'Lieferando · Uber Eats · Wolt',
    email: 'info@alsafi-heidelberg.de',
  };

  const handleHeroImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const optimized = await optimizeImageFile(file, 2000, 1500, 0.94);
      updateCoverPage({ coverHeroImage: optimized, coverBottomHeroImage: optimized });
    } catch {
      const reader = new FileReader();
      reader.onload = (ev) => {
        updateCoverPage({ coverHeroImage: ev.target.result, coverBottomHeroImage: ev.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateContact = (field, val) => {
    updateCoverPage({
      contactInfo: {
        ...contact,
        [field]: val,
      },
    });
  };

  return (
    <div className="space-y-4 text-right animate-fade-in" dir="rtl">
      {/* Cover Page Visibility Toggle & Reset Banner */}
      <div className="bg-gradient-to-r from-black/80 via-[#0d2a1a] to-black/80 border border-brand-gold/40 rounded-xl p-3 shadow-lg flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-brand-gold block">
            👑 صورة خلفية الغلاف الكاملة (Full-Bleed Cover)
          </span>
          <span className="text-[10px] text-gray-300 block mt-0.5">
            صورة طعام تغطي كامل الصفحة من الحافة للحافة مع الشعار بالأعلى والمعلومات بالأسفل
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowCoverPage(!showCoverPage)}
            className={`px-3 py-1 rounded-lg text-[10.5px] font-bold border transition flex items-center gap-1.5 shadow ${
              showCoverPage
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                : 'bg-red-950/80 text-red-300 border-red-500/50'
            }`}
          >
            {showCoverPage ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{showCoverPage ? 'ظاهرة بالمنيو' : 'مخفية مؤقتاً'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('هل تريد إعادة ضبط صفحة الغلاف لبياناتها وتصميمها الأصلي؟')) {
                resetCoverPage();
              }
            }}
            className="p-1.5 bg-black/60 hover:bg-black/90 text-gray-400 hover:text-brand-gold border border-white/10 rounded-lg text-xs transition"
            title="إعادة تعيين صفحة الغلاف"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ─── 1. FULL PAGE COVER PHOTO CONTROLS (صورة الخلفية الكاملة) ───────────────── */}
      <div className="bg-black/40 border border-brand-gold/50 rounded-xl p-3 space-y-3 shadow-2xl">
        <div className="flex items-center justify-between border-b border-brand-gold/30 pb-2">
          <span className="text-xs font-bold text-brand-gold flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-brand-gold" />
            <span>صورة خلفية الغلاف الكاملة (Full Page Photo):</span>
          </span>
          <button
            type="button"
            onClick={() => heroImageInputRef.current?.click()}
            className="px-3.5 py-1 bg-gradient-to-r from-brand-gold via-yellow-400 to-brand-gold text-black rounded-lg text-[10.5px] font-black transition flex items-center gap-1.5 shadow-lg hover:brightness-110"
          >
            <Upload className="w-3.5 h-3.5 text-black" />
            <span>رفع صورة جديدة للغلاف</span>
          </button>
          <input
            ref={heroImageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleHeroImageUpload}
          />
        </div>

        {/* Thumbnail Preview & Fit Mode Selection */}
        <div className="space-y-1.5">
          <div className="w-full h-40 rounded-lg overflow-hidden border border-brand-gold/40 relative shadow-inner bg-black flex items-center justify-center">
            <img
              src={currentCover.coverHeroImage || currentCover.coverBottomHeroImage || '/dishes/dish2-kebab.jpg'}
              alt="Cover Preview"
              className={`w-full h-full ${(currentCover.coverHeroFit || 'cover') === 'contain' ? 'object-contain' : 'object-cover'}`}
            />
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </div>

          {/* Fit Mode Switcher */}
          <div className="flex items-center justify-between bg-black/60 p-1.5 rounded-lg border border-white/10 text-[10px]">
            <span className="text-gray-300 font-semibold">طريقة احتواء وملاءمة الصورة:</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => updateCoverPage({ coverHeroFit: 'cover' })}
                className={`px-2 py-1 rounded font-bold transition ${
                  (currentCover.coverHeroFit || 'cover') === 'cover'
                    ? 'bg-brand-gold text-black shadow font-black'
                    : 'bg-white/5 text-gray-300 hover:text-white'
                }`}
                title="تعبئة الصفحة بالكامل مع الحفاظ على النسبة"
              >
                <span>🖼️ تعبئة ونسبة (Cover)</span>
              </button>
              <button
                type="button"
                onClick={() => updateCoverPage({ coverHeroFit: 'fill', coverHeroScale: 1.0 })}
                className={`px-2 py-1 rounded font-bold transition ${
                  currentCover.coverHeroFit === 'fill'
                    ? 'bg-brand-gold text-black shadow font-black'
                    : 'bg-white/5 text-gray-300 hover:text-white'
                }`}
                title="مطابقة وملاءمة 100% للورقة دون اقتطاع أوراق البقدونس أو الحواف"
              >
                <span>📐 مطابقة 100% (Fill)</span>
              </button>
              <button
                type="button"
                onClick={() => updateCoverPage({ coverHeroFit: 'contain' })}
                className={`px-2 py-1 rounded font-bold transition ${
                  currentCover.coverHeroFit === 'contain'
                    ? 'bg-brand-gold text-black shadow font-black'
                    : 'bg-white/5 text-gray-300 hover:text-white'
                }`}
                title="احتواء داخل الورقة مع حواف"
              >
                <span>📦 احتواء (Contain)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sliders and Numeric Inputs for Background Photo */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {/* Scale / Zoom Slider */}
          <div className="bg-black/50 p-2.5 rounded-lg border border-white/10 space-y-1.5">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9.5px] text-gray-300 font-semibold">🔍 مقياس/تكبير الصورة (Scale):</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="20"
                  max="400"
                  step="5"
                  className="w-14 bg-black border border-brand-gold/60 text-brand-gold text-center text-[10px] font-mono font-bold rounded py-0.5"
                  value={Math.round((currentCover.coverHeroScale || 1.05) * 100)}
                  onChange={(e) => updateCoverPage({ coverHeroScale: Number(e.target.value) / 100 })}
                />
                <span className="text-[9px] text-gray-400">%</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="grid grid-cols-5 gap-1">
              {[
                { label: '50%', val: 0.5 },
                { label: '75%', val: 0.75 },
                { label: '100%', val: 1.0 },
                { label: '125%', val: 1.25 },
                { label: '150%', val: 1.5 },
              ].map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => updateCoverPage({ coverHeroScale: chip.val })}
                  className={`py-0.5 text-[9px] font-mono font-bold rounded transition border ${
                    Math.abs((currentCover.coverHeroScale || 1.05) - chip.val) < 0.04
                      ? 'bg-brand-gold text-black border-brand-gold'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/15'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            <input
              type="range"
              min="0.2"
              max="4.0"
              step="0.02"
              className="control-slider"
              value={currentCover.coverHeroScale || 1.05}
              onChange={(e) => updateCoverPage({ coverHeroScale: parseFloat(e.target.value) })}
            />
          </div>

          {/* Darkness Tint Slider */}
          <div className="bg-black/50 p-2 rounded-lg border border-white/10">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9.5px] text-gray-300 font-semibold">تعتيم الخلفية (Darkness):</span>
              <span className="text-[9.5px] text-brand-gold font-mono font-bold">
                {currentCover.coverHeroDarkness !== undefined ? currentCover.coverHeroDarkness : 10}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              step="5"
              className="control-slider"
              value={currentCover.coverHeroDarkness !== undefined ? currentCover.coverHeroDarkness : 10}
              onChange={(e) => updateCoverPage({ coverHeroDarkness: Number(e.target.value) })}
            />
          </div>

          {/* Cover Photo Brightness Boost Slider */}
          <div className="bg-black/50 p-2 rounded-lg border border-brand-gold/40 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[9.5px] text-brand-goldLight font-bold flex items-center gap-1">
                <span>💡</span>
                <span>إضاءة صورة الواجهة (Brightness):</span>
              </span>
              <span className="text-[9.5px] text-brand-gold font-mono font-bold bg-black/80 px-1.5 py-0.5 rounded border border-brand-gold/40">
                {currentCover.coverHeroBrightness !== undefined ? currentCover.coverHeroBrightness : 100}%
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {[
                { label: '100% عادي', val: 100 },
                { label: '115% طباعة', val: 115 },
                { label: '130% ساطع', val: 130 },
                { label: '145% قوي', val: 145 },
              ].map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => updateCoverPage({ coverHeroBrightness: chip.val })}
                  className={`py-0.5 text-[8.5px] font-mono font-bold rounded transition border ${
                    (currentCover.coverHeroBrightness || 100) === chip.val
                      ? 'bg-brand-gold text-black border-brand-gold'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/15'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
            <input
              type="range"
              min="80"
              max="180"
              step="5"
              className="control-slider"
              value={currentCover.coverHeroBrightness !== undefined ? currentCover.coverHeroBrightness : 100}
              onChange={(e) => updateCoverPage({ coverHeroBrightness: Number(e.target.value) })}
            />
          </div>

          {/* Cover Vignette Intensity Slider */}
          <div className="bg-black/50 p-2 rounded-lg border border-white/10 space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-[9.5px] text-gray-300 font-semibold flex items-center gap-1">
                <span>🎭</span>
                <span>تدرج الظلال السينمائي (Vignette):</span>
              </span>
              <span className="text-[9.5px] text-brand-gold font-mono font-bold">
                {currentCover.coverHeroVignette !== undefined ? currentCover.coverHeroVignette : 35}%
              </span>
            </div>
            <p className="text-[8.5px] text-gray-400">
              تخفيف هذا الشريط يزيل السواد الداكن من أعلى وأسفل الغلاف لطباعة ورقية ناصعة ومشرقة.
            </p>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              className="control-slider"
              value={currentCover.coverHeroVignette !== undefined ? currentCover.coverHeroVignette : 35}
              onChange={(e) => updateCoverPage({ coverHeroVignette: Number(e.target.value) })}
            />
          </div>

          {/* Pos X */}
          <div className="bg-black/50 p-2 rounded-lg border border-white/10">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9.5px] text-gray-300 font-semibold">الموضع الأفقي (X):</span>
              <span className="text-[9.5px] text-brand-gold font-mono font-bold">
                {currentCover.coverHeroPosX !== undefined ? currentCover.coverHeroPosX : 50}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              className="control-slider"
              value={currentCover.coverHeroPosX !== undefined ? currentCover.coverHeroPosX : 50}
              onChange={(e) => updateCoverPage({ coverHeroPosX: Number(e.target.value) })}
            />
          </div>

          {/* Pos Y */}
          <div className="bg-black/50 p-2 rounded-lg border border-white/10">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9.5px] text-gray-300 font-semibold">الموضع الرأسي (Y):</span>
              <span className="text-[9.5px] text-brand-gold font-mono font-bold">
                {currentCover.coverHeroPosY !== undefined ? currentCover.coverHeroPosY : 50}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              className="control-slider"
              value={currentCover.coverHeroPosY !== undefined ? currentCover.coverHeroPosY : 50}
              onChange={(e) => updateCoverPage({ coverHeroPosY: Number(e.target.value) })}
            />
          </div>
        </div>
      </div>

      {/* ─── 2. TOP HEADER & LOGO CONTROLS (الشعار والترويسة بالأعلى) ─────────────────── */}
      <div className="bg-black/40 border border-brand-gold/35 rounded-xl p-3 space-y-3 shadow-lg">
        <span className="text-xs font-bold text-brand-gold flex items-center gap-1.5 border-b border-white/10 pb-1.5">
          <Type className="w-3.5 h-3.5 text-brand-gold" />
          <span>الشعار ونصوص الترويسة وأحجامها (Typography & Sizes):</span>
        </span>

        {/* 1. Badge Text & Size */}
        <div className="bg-black/50 p-2 rounded-lg border border-white/10 space-y-2">
          <div>
            <label className="text-[10px] text-gray-300 block mb-1 font-semibold">الشارة العلوية (Top Badge):</label>
            <input
              type="text"
              className="cms-input font-cinzel text-xs text-brand-gold"
              value={currentCover.header?.badge || 'ORIENTALISCHE GASTRONOMIE SEIT 2018 · HEIDELBERG'}
              onChange={(e) => updateCoverHeader('badge', e.target.value)}
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9.5px] text-gray-300 font-semibold">حجم خط الشارة العلوية (Badge Size):</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="6"
                  max="24"
                  step="0.5"
                  className="w-14 bg-black border border-brand-gold/60 text-brand-gold text-center text-[10px] font-mono font-bold rounded py-0.5"
                  value={currentCover.coverBadgeSize !== undefined ? currentCover.coverBadgeSize : 9.5}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    updateCoverPage({ coverBadgeSize: val });
                    updateSetting('page1', 'coverBadgeSize', val);
                  }}
                />
                <span className="text-[9px] text-gray-400">px</span>
              </div>
            </div>
            <input
              type="range"
              min="6"
              max="24"
              step="0.5"
              className="control-slider"
              value={currentCover.coverBadgeSize !== undefined ? currentCover.coverBadgeSize : 9.5}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                updateCoverPage({ coverBadgeSize: val });
                updateSetting('page1', 'coverBadgeSize', val);
              }}
            />
          </div>
        </div>

        {/* 2. Main Title Text & Size */}
        <div className="bg-black/50 p-2 rounded-lg border border-white/10 space-y-2">
          <div>
            <label className="text-[10px] text-gray-300 block mb-1 font-semibold">اسم المطعم / العنوان الرئيسي:</label>
            <input
              type="text"
              className="cms-input font-cinzel font-bold text-white text-sm"
              value={currentCover.header?.title || 'ALSAFI RESTAURANT'}
              onChange={(e) => updateCoverHeader('title', e.target.value)}
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9.5px] text-gray-300 font-semibold">حجم العنوان الرئيسي (Title Size):</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="20"
                  max="60"
                  step="1"
                  className="w-14 bg-black border border-brand-gold/60 text-brand-gold text-center text-[10px] font-mono font-bold rounded py-0.5"
                  value={currentCover.coverTitleSize !== undefined ? currentCover.coverTitleSize : (effectiveSettings.coverTitleSize || 34)}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    updateCoverPage({ coverTitleSize: val });
                    updateSetting('page1', 'coverTitleSize', val);
                  }}
                />
                <span className="text-[9px] text-gray-400">px</span>
              </div>
            </div>
            <input
              type="range"
              min="20"
              max="60"
              step="1"
              className="control-slider"
              value={currentCover.coverTitleSize !== undefined ? currentCover.coverTitleSize : (effectiveSettings.coverTitleSize || 34)}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                updateCoverPage({ coverTitleSize: val });
                updateSetting('page1', 'coverTitleSize', val);
              }}
            />
          </div>
        </div>

        {/* 3. Subtitle Text & Size */}
        <div className="bg-black/50 p-2 rounded-lg border border-white/10 space-y-2">
          <div>
            <label className="text-[10px] text-gray-300 block mb-1 font-semibold">العنوان الفرعي (Subtitle):</label>
            <input
              type="text"
              className="cms-input font-serif text-xs text-brand-goldLight"
              value={currentCover.header?.subtitle || '✦ SPEISEKARTE · EINE KULINARISCHE REISE DES ORIENTS ✦'}
              onChange={(e) => updateCoverHeader('subtitle', e.target.value)}
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9.5px] text-gray-300 font-semibold">حجم العنوان الفرعي (Subtitle Size):</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="7"
                  max="28"
                  step="0.5"
                  className="w-14 bg-black border border-brand-gold/60 text-brand-gold text-center text-[10px] font-mono font-bold rounded py-0.5"
                  value={currentCover.coverSubtitleSize !== undefined ? currentCover.coverSubtitleSize : (effectiveSettings.coverSubtitleSize || 11.5)}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    updateCoverPage({ coverSubtitleSize: val });
                    updateSetting('page1', 'coverSubtitleSize', val);
                  }}
                />
                <span className="text-[9px] text-gray-400">px</span>
              </div>
            </div>
            <input
              type="range"
              min="7"
              max="28"
              step="0.5"
              className="control-slider"
              value={currentCover.coverSubtitleSize !== undefined ? currentCover.coverSubtitleSize : (effectiveSettings.coverSubtitleSize || 11.5)}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                updateCoverPage({ coverSubtitleSize: val });
                updateSetting('page1', 'coverSubtitleSize', val);
              }}
            />
          </div>
        </div>

        {/* 4. Tagline Text & Size */}
        <div className="bg-black/50 p-2 rounded-lg border border-white/10 space-y-2">
          <div>
            <label className="text-[10px] text-gray-300 block mb-1 font-semibold">الشريط التعريفي (Tagline):</label>
            <input
              type="text"
              className="cms-input font-cinzel text-xs text-brand-gold"
              value={currentCover.header?.tagline || 'SCHAWARMA · HOLZKOHLEGRILL · MEZZE · WRAPS'}
              onChange={(e) => updateCoverHeader('tagline', e.target.value)}
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9.5px] text-gray-300 font-semibold">حجم الشريط التعريفي (Tagline Size):</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="6"
                  max="24"
                  step="0.5"
                  className="w-14 bg-black border border-brand-gold/60 text-brand-gold text-center text-[10px] font-mono font-bold rounded py-0.5"
                  value={currentCover.coverTaglineSize !== undefined ? currentCover.coverTaglineSize : 9}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    updateCoverPage({ coverTaglineSize: val });
                    updateSetting('page1', 'coverTaglineSize', val);
                  }}
                />
                <span className="text-[9px] text-gray-400">px</span>
              </div>
            </div>
            <input
              type="range"
              min="6"
              max="24"
              step="0.5"
              className="control-slider"
              value={currentCover.coverTaglineSize !== undefined ? currentCover.coverTaglineSize : 9}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                updateCoverPage({ coverTaglineSize: val });
                updateSetting('page1', 'coverTaglineSize', val);
              }}
            />
          </div>
        </div>

        {/* 5. Logo Size */}
        <div className="bg-black/50 p-2 rounded-lg border border-white/10">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[9.5px] text-gray-300 font-semibold">حجم الشعار (Logo Size):</span>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min="36"
                max="140"
                step="2"
                className="w-14 bg-black border border-brand-gold/60 text-brand-gold text-center text-[10px] font-mono font-bold rounded py-0.5"
                value={currentCover.coverLogoSize !== undefined ? currentCover.coverLogoSize : (effectiveSettings.coverLogoSize || 68)}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  updateCoverPage({ coverLogoSize: val });
                  updateSetting('page1', 'coverLogoSize', val);
                }}
              />
              <span className="text-[9px] text-gray-400">px</span>
            </div>
          </div>
          <input
            type="range"
            min="36"
            max="140"
            step="2"
            className="control-slider"
            value={currentCover.coverLogoSize !== undefined ? currentCover.coverLogoSize : (effectiveSettings.coverLogoSize || 68)}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              updateCoverPage({ coverLogoSize: val });
              updateSetting('page1', 'coverLogoSize', val);
            }}
          />
        </div>
      </div>

      {/* ─── 3. BOTTOM CONTACT & RESTAURANT INFO (معلومات وبيانات التواصل بالأسفل) ─── */}
      <div className="bg-black/40 border border-brand-gold/35 rounded-xl p-3 space-y-3 shadow-lg">
        <span className="text-xs font-bold text-brand-gold flex items-center gap-1.5 border-b border-white/10 pb-1.5">
          <Phone className="w-3.5 h-3.5 text-brand-gold" />
          <span>معلومات وبيانات التواصل في أسفل الغلاف:</span>
        </span>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-gray-300 block mb-1 font-semibold">رقم الهاتف والواتساب:</label>
            <input
              type="text"
              className="cms-input text-xs font-mono text-white"
              value={contact.phone}
              onChange={(e) => handleUpdateContact('phone', e.target.value)}
            />
          </div>

          <div>
            <label className="text-[10px] text-gray-300 block mb-1 font-semibold">أوقات العمل (Öffnungszeiten):</label>
            <input
              type="text"
              className="cms-input text-xs text-white"
              value={contact.hours}
              onChange={(e) => handleUpdateContact('hours', e.target.value)}
            />
          </div>

          <div>
            <label className="text-[10px] text-gray-300 block mb-1 font-semibold">عنوان الفرع (Adresse):</label>
            <input
              type="text"
              className="cms-input text-xs text-white"
              value={contact.address}
              onChange={(e) => handleUpdateContact('address', e.target.value)}
            />
          </div>

          <div>
            <label className="text-[10px] text-gray-300 block mb-1 font-semibold">خدمات التوصيل (Lieferung):</label>
            <input
              type="text"
              className="cms-input text-xs text-brand-goldLight"
              value={contact.delivery}
              onChange={(e) => handleUpdateContact('delivery', e.target.value)}
            />
          </div>
        </div>

        {/* Footer Bar Font Size & Text Wrap Controls */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          {/* Text Wrap Toggle Button */}
          <div className="flex items-center justify-between bg-black/50 p-2 rounded-lg border border-white/10">
            <div>
              <span className="text-[10px] text-gray-200 font-semibold block">التفاف النص التلقائي (Text Wrap):</span>
              <span className="text-[8.5px] text-gray-400 block">نزول النص للسطر الثاني عند التكبير بدلاً من قصه بالنواقص (...)</span>
            </div>
            <button
              type="button"
              onClick={() => {
                const currentWrap = currentCover.coverFooterWrap !== undefined ? currentCover.coverFooterWrap : true;
                updateCoverPage({ coverFooterWrap: !currentWrap });
              }}
              className={`px-2.5 py-1 rounded text-[10px] font-bold border transition ${
                (currentCover.coverFooterWrap !== undefined ? currentCover.coverFooterWrap : true)
                  ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50'
                  : 'bg-yellow-950/90 text-yellow-300 border-yellow-500/50'
              }`}
            >
              {(currentCover.coverFooterWrap !== undefined ? currentCover.coverFooterWrap : true)
                ? '✓ ملتف (مكتمل)'
                : '✂ مقصوص (...)'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Footer Label Size */}
            <div className="bg-black/50 p-2 rounded-lg border border-white/10">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9.5px] text-gray-300 font-semibold">حجم عناوين الفوتر (Labels):</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="5"
                    max="18"
                    step="0.5"
                    className="w-14 bg-black border border-brand-gold/60 text-brand-gold text-center text-[10px] font-mono font-bold rounded py-0.5"
                    value={currentCover.coverFooterTitleSize !== undefined ? currentCover.coverFooterTitleSize : 8}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      updateCoverPage({ coverFooterTitleSize: val });
                      updateSetting('page1', 'coverFooterTitleSize', val);
                    }}
                  />
                  <span className="text-[9px] text-gray-400">px</span>
                </div>
              </div>
              <input
                type="range"
                min="5"
                max="18"
                step="0.5"
                className="control-slider"
                value={currentCover.coverFooterTitleSize !== undefined ? currentCover.coverFooterTitleSize : 8}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  updateCoverPage({ coverFooterTitleSize: val });
                  updateSetting('page1', 'coverFooterTitleSize', val);
                }}
              />
            </div>

            {/* Footer Value Size */}
            <div className="bg-black/50 p-2 rounded-lg border border-white/10">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9.5px] text-gray-300 font-semibold">حجم نصوص الفوتر (Content):</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="5"
                    max="20"
                    step="0.5"
                    className="w-14 bg-black border border-brand-gold/60 text-brand-gold text-center text-[10px] font-mono font-bold rounded py-0.5"
                    value={currentCover.coverFooterValueSize !== undefined ? currentCover.coverFooterValueSize : 9.5}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      updateCoverPage({ coverFooterValueSize: val });
                      updateSetting('page1', 'coverFooterValueSize', val);
                    }}
                  />
                  <span className="text-[9px] text-gray-400">px</span>
                </div>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                step="0.5"
                className="control-slider"
                value={currentCover.coverFooterValueSize !== undefined ? currentCover.coverFooterValueSize : 9.5}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  updateCoverPage({ coverFooterValueSize: val });
                  updateSetting('page1', 'coverFooterValueSize', val);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverPageEditor;
