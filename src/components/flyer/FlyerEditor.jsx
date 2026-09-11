import React, { useRef, useState } from 'react';
import { Upload, RefreshCw, Type, Sparkles, Image, Tag, Phone, MapPin, QrCode, Sliders, Eye, FileText, Printer, Check, BookOpen } from 'lucide-react';
import { useMenu } from '../../context/MenuContext';
import { optimizeImageFile } from '../../utils/imageOptimizer';

export const FlyerEditor = () => {
  const {
    bifoldFlyerData,
    trifoldViewMode,
    setTrifoldViewMode,
    updateFlyerPanel1,
    updateFlyerPanel2,
    updateFlyerPanel3,
    updateFlyerPanel4,
    updateFlyerPanel5,
    updateFlyerPanel6,
    updateFlyerFontSizes,
    resetBifoldFlyer,
  } = useMenu();

  const [activeTab, setActiveTab] = useState('sideA');
  const [flyerBlendSlot, setFlyerBlendSlot] = useState(0);
  const heroImageInputRef = useRef(null);

  const p1 = bifoldFlyerData?.panel1 || {};
  const p2 = bifoldFlyerData?.panel2 || {};
  const p3 = bifoldFlyerData?.panel3 || {};
  const p4 = bifoldFlyerData?.panel4 || {};
  const p5 = bifoldFlyerData?.panel5 || {};
  const p6 = bifoldFlyerData?.panel6 || {};

  const handleHeroImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const optimized = await optimizeImageFile(file, 2000, 1500, 0.94);
      updateFlyerPanel1('heroImage', optimized);
    } catch {
      const reader = new FileReader();
      reader.onload = (ev) => {
        updateFlyerPanel1('heroImage', ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4 text-right animate-fade-in" dir="rtl">
      {/* Tri-Fold Brochure Header Banner */}
      <div className="bg-gradient-to-r from-black/80 via-[#0d2a1a] to-black/80 border border-brand-gold/40 rounded-xl p-3 shadow-lg flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-brand-gold block">
            👑 محرر البروشور المطوي 3 أجزاء (Tri-Fold Brochure)
          </span>
          <span className="text-[10px] text-gray-300 block mt-0.5">
            تصميم عصري مطوي من 3 أجزاء / 6 صفحات مقسمة لصفحتين أفقيتين جاهزة للطباعة
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            if (window.confirm('هل تريد إعادة ضبط بيانات البروشور المطوي للتصميم الأصلي؟')) {
              resetBifoldFlyer();
            }
          }}
          className="p-1.5 bg-black/60 hover:bg-black/90 text-gray-400 hover:text-brand-gold border border-white/10 rounded-lg text-xs transition flex items-center gap-1 shrink-0"
          title="إعادة ضبط البروشور"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="text-[10px]">إعادة ضبط</span>
        </button>
      </div>

      {/* Sheet View Switcher Buttons */}
      <div className="bg-black/60 p-2 rounded-xl border border-brand-gold/30 space-y-1.5">
        <span className="text-[10px] text-gray-300 font-bold block mb-1">
          👁️ معاينة الصفحة المعروضة بالشاشة للطباعة:
        </span>
        <div className="grid grid-cols-3 gap-1 text-center">
          <button
            type="button"
            onClick={() => setTrifoldViewMode('both')}
            className={`py-1.5 px-1 rounded-lg text-[10px] font-bold border transition ${
              trifoldViewMode === 'both'
                ? 'bg-brand-gold text-black border-brand-gold font-black shadow'
                : 'bg-black/40 text-gray-300 border-white/10 hover:text-white'
            }`}
          >
            📄 الوجهين معاً
          </button>
          <button
            type="button"
            onClick={() => setTrifoldViewMode('outside')}
            className={`py-1.5 px-1 rounded-lg text-[10px] font-bold border transition ${
              trifoldViewMode === 'outside'
                ? 'bg-brand-gold text-black border-brand-gold font-black shadow'
                : 'bg-black/40 text-gray-300 border-white/10 hover:text-white'
            }`}
          >
            🖼️ الوجه الخارجي
          </button>
          <button
            type="button"
            onClick={() => setTrifoldViewMode('inside')}
            className={`py-1.5 px-1 rounded-lg text-[10px] font-bold border transition ${
              trifoldViewMode === 'inside'
                ? 'bg-brand-gold text-black border-brand-gold font-black shadow'
                : 'bg-black/40 text-gray-300 border-white/10 hover:text-white'
            }`}
          >
            📝 الوجه الداخلي
          </button>
        </div>
      </div>

      {/* 3 Main Tabs Navigation */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-black/70 border border-brand-gold/30 rounded-xl text-center">
        <button
          type="button"
          onClick={() => setActiveTab('sideA')}
          className={`py-1.5 px-1 rounded-lg text-[10.5px] font-bold transition ${
            activeTab === 'sideA'
              ? 'bg-gradient-to-r from-brand-gold via-yellow-400 to-brand-gold text-black shadow font-black'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          🖼️ الوجه الخارجي (A)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sideB')}
          className={`py-1.5 px-1 rounded-lg text-[10.5px] font-bold transition ${
            activeTab === 'sideB'
              ? 'bg-gradient-to-r from-brand-gold via-yellow-400 to-brand-gold text-black shadow font-black'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          📝 الوجه الداخلي (B)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sizes')}
          className={`py-1.5 px-1 rounded-lg text-[10.5px] font-bold transition ${
            activeTab === 'sizes'
              ? 'bg-gradient-to-r from-brand-gold via-yellow-400 to-brand-gold text-black shadow font-black'
              : 'text-yellow-300 hover:text-white hover:bg-white/5'
          }`}
        >
          🎛️ تكبير الخطوط
        </button>
      </div>

      {/* ─── TAB 1: SIDE A (OUTSIDE SHEET: FRONT COVER, FLAP, BACK COVER) ───────────── */}
      {activeTab === 'sideA' && (
        <div className="space-y-4">
          {/* Front Cover Image Controls */}
          <div className="bg-black/40 border border-brand-gold/40 rounded-xl p-3 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-brand-gold/30 pb-2">
              <span className="text-xs font-bold text-brand-gold flex items-center gap-1.5">
                <Image className="w-3.5 h-3.5 text-brand-gold" />
                <span>صورة غلاف البروشور الرئيسية:</span>
              </span>
              <button
                type="button"
                onClick={() => heroImageInputRef.current?.click()}
                className="px-3 py-1 bg-gradient-to-r from-brand-gold via-yellow-400 to-brand-gold text-black rounded-lg text-[10px] font-black transition flex items-center gap-1.5 shadow"
              >
                <Upload className="w-3 h-3" />
                <span>رفع صورة جديدة</span>
              </button>
              <input
                ref={heroImageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleHeroImageUpload}
              />
            </div>

            <div className="w-full h-32 rounded-lg overflow-hidden border border-brand-gold/40 relative shadow-inner bg-black">
              <img
                src={p1.heroImage || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1800&q=88'}
                alt="Front Hero"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-black/50 p-2.5 rounded-lg border border-white/10 space-y-1.5">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] text-gray-300">🔍 تكبير/مقياس الصورة:</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="20"
                      max="400"
                      step="5"
                      className="w-12 bg-black border border-brand-gold/60 text-brand-gold text-center text-[10px] font-mono font-bold rounded py-0.5"
                      value={Math.round((p1.heroScale || 1.05) * 100)}
                      onChange={(e) => updateFlyerPanel1('heroScale', Number(e.target.value) / 100)}
                    />
                    <span className="text-[9px] text-gray-400 font-bold">%</span>
                  </div>
                </div>

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
                      onClick={() => updateFlyerPanel1('heroScale', chip.val)}
                      className={`py-0.5 text-[9px] font-mono font-bold rounded transition border ${
                        Math.abs((p1.heroScale || 1.05) - chip.val) < 0.04
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
                  value={p1.heroScale || 1.05}
                  onChange={(e) => updateFlyerPanel1('heroScale', parseFloat(e.target.value))}
                />
              </div>

              <div className="bg-black/50 p-2 rounded-lg border border-white/10">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] text-gray-300">تعتيم الصورة (Darkness):</span>
                  <span className="text-[9px] text-brand-gold font-mono font-bold">
                    {p1.heroDarkness !== undefined ? p1.heroDarkness : 25}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  step="5"
                  className="control-slider"
                  value={p1.heroDarkness !== undefined ? p1.heroDarkness : 25}
                  onChange={(e) => updateFlyerPanel1('heroDarkness', Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Offer Badge */}
          <div className="bg-black/40 border border-brand-gold/40 rounded-xl p-3 space-y-2 shadow">
            <span className="text-xs font-bold text-yellow-300 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-yellow-400" />
              <span>شارة الخصم والعروض (الغلاف الأمامي):</span>
            </span>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                className="cms-input text-xs font-bold text-yellow-300 font-cinzel"
                value={p1.offerBadge?.title || '🔥 10% RABATT'}
                onChange={(e) => updateFlyerPanel1('offerBadge', { ...(p1.offerBadge || {}), title: e.target.value })}
              />
              <input
                type="text"
                className="cms-input text-xs text-white"
                value={p1.offerBadge?.subtitle || 'BEI ABHOLUNG & BARZAHLUNG'}
                onChange={(e) => updateFlyerPanel1('offerBadge', { ...(p1.offerBadge || {}), subtitle: e.target.value })}
              />
            </div>
          </div>

          {/* Contact Details (Back Cover) */}
          <div className="bg-black/40 border border-brand-gold/40 rounded-xl p-3 space-y-2 shadow">
            <span className="text-xs font-bold text-brand-gold flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>بيانات التواصل (الغلاف الخلفي):</span>
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[9.5px] text-gray-300 block mb-0.5">الهاتف والواتساب:</label>
                <input
                  type="text"
                  className="cms-input text-xs font-mono"
                  value={p3.contact?.phone || '06221 72 59 000'}
                  onChange={(e) => updateFlyerPanel3('contact', { ...(p3.contact || {}), phone: e.target.value })}
                />
              </div>

              <div>
                <label className="text-[9.5px] text-gray-300 block mb-0.5">العنوان الكامل:</label>
                <input
                  type="text"
                  className="cms-input text-xs text-white"
                  value={p3.contact?.address || 'Hertzstraße 1, 69126 Heidelberg'}
                  onChange={(e) => updateFlyerPanel3('contact', { ...(p3.contact || {}), address: e.target.value })}
                />
              </div>

              <div>
                <label className="text-[9.5px] text-gray-300 block mb-0.5">أوقات العمل:</label>
                <input
                  type="text"
                  className="cms-input text-xs text-white"
                  value={p3.contact?.hours || 'Mo-Sa 11:00-22:00'}
                  onChange={(e) => updateFlyerPanel3('contact', { ...(p3.contact || {}), hours: e.target.value })}
                />
              </div>

              <div>
                <label className="text-[9.5px] text-gray-300 block mb-0.5">التوصيل:</label>
                <input
                  type="text"
                  className="cms-input text-xs text-brand-goldLight"
                  value={p3.contact?.delivery || 'Lieferando · Uber Eats'}
                  onChange={(e) => updateFlyerPanel3('contact', { ...(p3.contact || {}), delivery: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2: SIDE B (INSIDE PANORAMIC MENU COLUMNS) ─────────────────────────── */}
      {activeTab === 'sideB' && (
        <div className="space-y-3">
          {/* Combo Highlight Banner */}
          <div className="bg-black/40 border border-brand-gold/35 rounded-xl p-3 space-y-2">
            <span className="text-xs font-bold text-yellow-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>العرض العائلي الصغير (العمود الأيمن الداخلي):</span>
            </span>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                className="col-span-2 cms-input text-xs font-bold text-yellow-300"
                value={p6.comboHighlight?.title || '👑 ALSAFI MIX PLATTE FÜR 2 PERSONEN'}
                onChange={(e) => updateFlyerPanel6('comboHighlight', { ...(p6.comboHighlight || {}), title: e.target.value })}
              />
              <input
                type="text"
                className="cms-input text-xs font-mono font-bold text-yellow-400 text-center"
                value={p6.comboHighlight?.price || '49,90 €'}
                onChange={(e) => updateFlyerPanel6('comboHighlight', { ...(p6.comboHighlight || {}), price: e.target.value })}
              />
            </div>
          </div>

          <div className="bg-black/40 border border-brand-gold/30 rounded-xl p-3">
            <span className="text-xs font-bold text-brand-gold block mb-2">
              📝 ملخص الأعمدة الداخلية 3 البانورامية:
            </span>
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              <div className="bg-black/60 p-2 rounded-lg border border-white/10">
                <span className="font-bold text-yellow-300 block border-b border-white/10 pb-1 mb-1">
                  👈 العمود الأيسر (Panel 4)
                </span>
                <span className="text-gray-300 block">مقبلات نباتية · سلطات · بوكسات</span>
              </div>

              <div className="bg-black/60 p-2 rounded-lg border border-white/10">
                <span className="font-bold text-yellow-300 block border-b border-white/10 pb-1 mb-1">
                  ↔️ العمود الأوسط (Panel 5)
                </span>
                <span className="text-gray-300 block">ساندوتشات لحم ونباتي · برجر · تخصصات</span>
              </div>

              <div className="bg-black/60 p-2 rounded-lg border border-white/10">
                <span className="font-bold text-yellow-300 block border-b border-white/10 pb-1 mb-1">
                  👉 العمود الأيمن (Panel 6)
                </span>
                <span className="text-gray-300 block">مشاوي · أطفال · حلويات · مشروبات</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 3: TYPOGRAPHY FONT SIZES ──────────────────────────────────────────── */}
      {activeTab === 'sizes' && (
        <div className="space-y-4">
          <div className="bg-black/40 border border-brand-gold/40 rounded-xl p-3 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-yellow-300 flex items-center gap-1.5 border-b border-white/10 pb-1.5">
              <Sliders className="w-3.5 h-3.5 text-yellow-400" />
              <span>التحكم بحجم خطوط البروشور المطوي:</span>
            </span>

            {/* Category Title Size */}
            <div className="bg-black/60 p-2.5 rounded-lg border border-white/10">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-gray-300 font-semibold">حجم عناوين الأقسام (Category Titles):</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="9"
                    max="20"
                    step="0.5"
                    className="w-14 bg-black border border-brand-gold/60 text-brand-gold text-center text-[10px] font-mono font-bold rounded py-0.5"
                    value={bifoldFlyerData?.fontSizeSettings?.categoryTitleSize || 12}
                    onChange={(e) => updateFlyerFontSizes('categoryTitleSize', parseFloat(e.target.value))}
                  />
                  <span className="text-[9px] text-gray-400">px</span>
                </div>
              </div>
              <input
                type="range"
                min="9"
                max="20"
                step="0.5"
                className="control-slider"
                value={bifoldFlyerData?.fontSizeSettings?.categoryTitleSize || 12}
                onChange={(e) => updateFlyerFontSizes('categoryTitleSize', parseFloat(e.target.value))}
              />
            </div>

            {/* Item Name Size */}
            <div className="bg-black/60 p-2.5 rounded-lg border border-white/10">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-gray-300 font-semibold">حجم أسماء الوجبات والأطباق (Dish Names):</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="8"
                    max="16"
                    step="0.5"
                    className="w-14 bg-black border border-brand-gold/60 text-brand-gold text-center text-[10px] font-mono font-bold rounded py-0.5"
                    value={bifoldFlyerData?.fontSizeSettings?.itemNameSize || 10.5}
                    onChange={(e) => updateFlyerFontSizes('itemNameSize', parseFloat(e.target.value))}
                  />
                  <span className="text-[9px] text-gray-400">px</span>
                </div>
              </div>
              <input
                type="range"
                min="8"
                max="16"
                step="0.5"
                className="control-slider"
                value={bifoldFlyerData?.fontSizeSettings?.itemNameSize || 10.5}
                onChange={(e) => updateFlyerFontSizes('itemNameSize', parseFloat(e.target.value))}
              />
            </div>

            {/* Item Price Size */}
            <div className="bg-black/60 p-2.5 rounded-lg border border-white/10">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-gray-300 font-semibold">حجم شارات الأسعار (Prices):</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="8"
                    max="16"
                    step="0.5"
                    className="w-14 bg-black border border-brand-gold/60 text-brand-gold text-center text-[10px] font-mono font-bold rounded py-0.5"
                    value={bifoldFlyerData?.fontSizeSettings?.priceSize || 10.5}
                    onChange={(e) => updateFlyerFontSizes('priceSize', parseFloat(e.target.value))}
                  />
                  <span className="text-[9px] text-gray-400">px</span>
                </div>
              </div>
              <input
                type="range"
                min="8"
                max="16"
                step="0.5"
                className="control-slider"
                value={bifoldFlyerData?.fontSizeSettings?.priceSize || 10.5}
                onChange={(e) => updateFlyerFontSizes('priceSize', parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlyerEditor;
