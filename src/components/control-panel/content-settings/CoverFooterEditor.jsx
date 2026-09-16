import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Truck,
  Eye,
  EyeOff,
  RotateCcw,
  Palette,
  Sparkles,
  Sliders,
  Type,
  Layout,
  Move,
  Check,
  Circle,
  Square,
  Maximize2,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { useMenu } from '../../../context/MenuContext';

export const FOOTER_PRESETS = [
  {
    id: 'emerald',
    name: '🌿 زمردي الصافي (كلاسيك)',
    desc: 'خلفية زجاجية خضراء مع إطار زمردي وعناوين خضراء ناصعة',
    settings: {
      coverFooterBgColor: '#0e1d14',
      coverFooterBgOpacity: 90,
      coverFooterBlur: 12,
      coverFooterBorderColor: '#8dc63f',
      coverFooterBorderWidth: 2,
      coverFooterBorderOpacity: 60,
      coverFooterBorderRadius: 16,
      coverFooterShadow: 'strong',
      coverFooterTitleColor: '#8dc63f',
      coverFooterValueColor: '#ffffff',
      coverFooterDeliveryColor: '#a6e247',
      coverFooterShowIcons: true,
      coverFooterIconShape: 'circle',
      coverFooterIconBgColor: 'rgba(141, 198, 63, 0.25)',
      coverFooterIconBorderColor: 'rgba(141, 198, 63, 0.60)',
      coverFooterIconColor: '#8dc63f',
    },
  },
  {
    id: 'gold',
    name: '⚜️ ذهبي ملكي فاخر',
    desc: 'خلفية سوداء عميقة مع إطار ذهبي لامع وعناوين ذهبية',
    settings: {
      coverFooterBgColor: '#050505',
      coverFooterBgOpacity: 95,
      coverFooterBlur: 14,
      coverFooterBorderColor: '#d4af37',
      coverFooterBorderWidth: 2,
      coverFooterBorderOpacity: 75,
      coverFooterBorderRadius: 16,
      coverFooterShadow: 'gold-glow',
      coverFooterTitleColor: '#d4af37',
      coverFooterValueColor: '#ffffff',
      coverFooterDeliveryColor: '#f5e3a9',
      coverFooterShowIcons: true,
      coverFooterIconShape: 'circle',
      coverFooterIconBgColor: 'rgba(212, 175, 55, 0.25)',
      coverFooterIconBorderColor: 'rgba(212, 175, 55, 0.65)',
      coverFooterIconColor: '#d4af37',
    },
  },
  {
    id: 'frosted',
    name: '💎 زجاج شفاف معاصر',
    desc: 'شفافية عالية وضبابية زجاجية فائقة وإطار ناعم',
    settings: {
      coverFooterBgColor: '#0c1611',
      coverFooterBgOpacity: 65,
      coverFooterBlur: 20,
      coverFooterBorderColor: '#a6e247',
      coverFooterBorderWidth: 1.5,
      coverFooterBorderOpacity: 40,
      coverFooterBorderRadius: 20,
      coverFooterShadow: 'soft',
      coverFooterTitleColor: '#a6e247',
      coverFooterValueColor: '#ffffff',
      coverFooterDeliveryColor: '#ffffff',
      coverFooterShowIcons: true,
      coverFooterIconShape: 'circle',
      coverFooterIconBgColor: 'rgba(255, 255, 255, 0.15)',
      coverFooterIconBorderColor: 'rgba(255, 255, 255, 0.35)',
      coverFooterIconColor: '#ffffff',
    },
  },
  {
    id: 'dark',
    name: '🖤 أسود ملكي مقتضب',
    desc: 'تصميم معتم داكن وأنيق بدون بهرجة زائدة',
    settings: {
      coverFooterBgColor: '#000000',
      coverFooterBgOpacity: 88,
      coverFooterBlur: 10,
      coverFooterBorderColor: '#2b3b30',
      coverFooterBorderWidth: 1,
      coverFooterBorderOpacity: 50,
      coverFooterBorderRadius: 12,
      coverFooterShadow: 'soft',
      coverFooterTitleColor: '#8dc63f',
      coverFooterValueColor: '#e2e8f0',
      coverFooterDeliveryColor: '#8dc63f',
      coverFooterShowIcons: true,
      coverFooterIconShape: 'circle',
      coverFooterIconBgColor: 'rgba(0, 0, 0, 0.6)',
      coverFooterIconBorderColor: 'rgba(141, 198, 63, 0.35)',
      coverFooterIconColor: '#8dc63f',
    },
  },
  {
    id: 'pill',
    name: '⚪ كبسولة دائرية كاملة',
    desc: 'شريط دائري الحواف بالكامل بنمط كبسولة عصري',
    settings: {
      coverFooterBgColor: '#0a1a10',
      coverFooterBgOpacity: 92,
      coverFooterBlur: 16,
      coverFooterBorderColor: '#8dc63f',
      coverFooterBorderWidth: 2,
      coverFooterBorderOpacity: 70,
      coverFooterBorderRadius: 40,
      coverFooterShadow: 'strong',
      coverFooterTitleColor: '#8dc63f',
      coverFooterValueColor: '#ffffff',
      coverFooterDeliveryColor: '#a6e247',
      coverFooterShowIcons: true,
      coverFooterIconShape: 'circle',
      coverFooterIconBgColor: 'rgba(141, 198, 63, 0.25)',
      coverFooterIconBorderColor: 'rgba(141, 198, 63, 0.60)',
      coverFooterIconColor: '#8dc63f',
    },
  },
];

export const CoverFooterEditor = ({ page }) => {
  const { coverPageData, updateCoverPage, updateSetting } = useMenu();
  const currentCover = page || coverPageData || {};

  const [activeSubTab, setActiveSubTab] = useState('presets'); // 'presets' | 'content' | 'layout' | 'glass' | 'icons' | 'typography'

  // Extract contact values with defaults
  const contact = currentCover.contactInfo || {
    phone: '06221 72 59 000',
    address: 'Hertzstraße 1, 69126 Heidelberg - Kaufland',
    hours: 'Mo-Sa 11:00-22:00 | So & Feiertage 12:00-22:00',
    delivery: 'Lieferando · Uber Eats · Wolt',
  };

  // Extract contact labels with defaults
  const labels = currentCover.contactLabels || {
    phone: 'Telefon & WhatsApp',
    address: 'Adresse',
    hours: 'Öffnungszeiten',
    delivery: 'Bestellung über',
  };

  // Extract visibility settings
  const showFooter = currentCover.showCoverFooter !== false;
  const showPhone = currentCover.coverFooterPhoneVisible !== false;
  const showAddress = currentCover.coverFooterAddressVisible !== false;
  const showHours = currentCover.coverFooterHoursVisible !== false;
  const showDelivery = currentCover.coverFooterDeliveryVisible !== false;

  // Layout settings
  const columns = currentCover.coverFooterColumns || '4';
  const marginBottom = currentCover.coverFooterMarginBottom !== undefined ? currentCover.coverFooterMarginBottom : 20;
  const marginSide = currentCover.coverFooterMarginSide !== undefined ? currentCover.coverFooterMarginSide : 28;
  const padding = currentCover.coverFooterPadding !== undefined ? currentCover.coverFooterPadding : 12;
  const gap = currentCover.coverFooterGap !== undefined ? currentCover.coverFooterGap : 12;
  const radius = currentCover.coverFooterBorderRadius !== undefined ? currentCover.coverFooterBorderRadius : 16;
  const wrap = currentCover.coverFooterWrap !== undefined ? currentCover.coverFooterWrap : true;

  // Glass & Appearance settings
  const bgColor = currentCover.coverFooterBgColor || '#0e1d14';
  const bgOpacity = currentCover.coverFooterBgOpacity !== undefined ? currentCover.coverFooterBgOpacity : 90;
  const blur = currentCover.coverFooterBlur !== undefined ? currentCover.coverFooterBlur : 12;
  const borderColor = currentCover.coverFooterBorderColor || '#8dc63f';
  const borderWidth = currentCover.coverFooterBorderWidth !== undefined ? currentCover.coverFooterBorderWidth : 2;
  const borderOpacity = currentCover.coverFooterBorderOpacity !== undefined ? currentCover.coverFooterBorderOpacity : 60;
  const shadowStyle = currentCover.coverFooterShadow || 'strong';

  // Icons settings
  const showIcons = currentCover.coverFooterShowIcons !== false;
  const iconSize = currentCover.coverFooterIconSize !== undefined ? currentCover.coverFooterIconSize : 14;
  const iconCircleSize = currentCover.coverFooterIconCircleSize !== undefined ? currentCover.coverFooterIconCircleSize : 28;
  const iconShape = currentCover.coverFooterIconShape || 'circle';
  const iconColor = currentCover.coverFooterIconColor || '#8dc63f';
  const iconBgColor = currentCover.coverFooterIconBgColor || 'rgba(141, 198, 63, 0.25)';
  const iconBorderColor = currentCover.coverFooterIconBorderColor || 'rgba(141, 198, 63, 0.60)';

  // Typography settings
  const titleSize = currentCover.coverFooterTitleSize !== undefined ? currentCover.coverFooterTitleSize : 8;
  const valueSize = currentCover.coverFooterValueSize !== undefined ? currentCover.coverFooterValueSize : 9.5;
  const titleColor = currentCover.coverFooterTitleColor || '#8dc63f';
  const valueColor = currentCover.coverFooterValueColor || '#ffffff';
  const deliveryColor = currentCover.coverFooterDeliveryColor || '#a6e247';

  const handleUpdateContact = (field, val) => {
    updateCoverPage({
      contactInfo: {
        ...contact,
        [field]: val,
      },
    });
  };

  const handleUpdateLabel = (field, val) => {
    updateCoverPage({
      contactLabels: {
        ...labels,
        [field]: val,
      },
    });
  };

  const handleApplyPreset = (preset) => {
    updateCoverPage({
      ...preset.settings,
    });
  };

  const handleResetFooter = () => {
    if (window.confirm('هل تريد إعادة تعيين شريط الفوتر ومعلومات التواصل بالكامل إلى حالته الافتراضية؟')) {
      updateCoverPage({
        showCoverFooter: true,
        coverFooterPhoneVisible: true,
        coverFooterAddressVisible: true,
        coverFooterHoursVisible: true,
        coverFooterDeliveryVisible: true,
        coverFooterColumns: '4',
        coverFooterGap: 12,
        coverFooterPadding: 12,
        coverFooterMarginBottom: 20,
        coverFooterMarginSide: 28,
        coverFooterBorderRadius: 16,
        coverFooterBgColor: '#0e1d14',
        coverFooterBgOpacity: 90,
        coverFooterBlur: 12,
        coverFooterBorderColor: '#8dc63f',
        coverFooterBorderWidth: 2,
        coverFooterBorderOpacity: 60,
        coverFooterShadow: 'strong',
        coverFooterShowIcons: true,
        coverFooterIconSize: 14,
        coverFooterIconCircleSize: 28,
        coverFooterIconShape: 'circle',
        coverFooterIconBgColor: 'rgba(141, 198, 63, 0.25)',
        coverFooterIconBorderColor: 'rgba(141, 198, 63, 0.60)',
        coverFooterIconColor: '#8dc63f',
        coverFooterTitleSize: 8,
        coverFooterValueSize: 9.5,
        coverFooterTitleColor: '#8dc63f',
        coverFooterValueColor: '#ffffff',
        coverFooterDeliveryColor: '#a6e247',
        coverFooterWrap: true,
      });
      updateSetting('page1', 'coverFooterTitleSize', 8);
      updateSetting('page1', 'coverFooterValueSize', 9.5);
    }
  };

  return (
    <div className="bg-black/50 border-2 border-brand-gold/40 rounded-2xl p-3.5 space-y-3.5 shadow-2xl text-right animate-fade-in" dir="rtl">
      
      {/* ─── Header: Section Title & Global Visibility Toggle ─── */}
      <div className="flex items-center justify-between border-b border-brand-gold/30 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold shadow">
            <Phone className="w-4 h-4 text-brand-gold" />
          </div>
          <div>
            <span className="text-xs font-bold text-brand-gold block flex items-center gap-1.5">
              <span>شريط معلومات الفوتر والتواصل</span>
              <span className="text-[9px] bg-brand-gold/20 text-brand-goldLight border border-brand-gold/30 px-1.5 py-0.2 rounded-full">
                تحكم شامل
              </span>
            </span>
            <span className="text-[9.5px] text-gray-400 block">
              تحكم ببيانات المطعم، الأيقونات، الأبعاد، الزجاجية، والألوان
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => updateCoverPage({ showCoverFooter: !showFooter })}
            className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold border transition flex items-center gap-1.5 shadow ${
              showFooter
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                : 'bg-red-950/80 text-red-300 border-red-500/50'
            }`}
            title="إظهار أو إخفاء شريط الفوتر بالكامل"
          >
            {showFooter ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{showFooter ? 'الشريط ظاهر' : 'الشريط مخفي'}</span>
          </button>

          <button
            type="button"
            onClick={handleResetFooter}
            className="p-1.5 bg-black/60 hover:bg-black/90 text-gray-400 hover:text-brand-gold border border-white/10 rounded-lg text-xs transition shadow"
            title="إعادة ضبط إعدادات شريط الفوتر إلى الافتراضي"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ─── Subtabs Navigation Bar ─── */}
      <div className="grid grid-cols-6 gap-1 bg-black/70 p-1 rounded-xl border border-white/10 text-[10px] font-bold">
        {[
          { id: 'presets', label: 'القوالب', icon: Palette },
          { id: 'content', label: 'المحتوى', icon: Type },
          { id: 'layout', label: 'الأبعاد', icon: Move },
          { id: 'glass', label: 'الزجاجية', icon: Layers },
          { id: 'icons', label: 'الأيقونات', icon: Circle },
          { id: 'typography', label: 'الخطوط', icon: Sliders },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSubTab(tab.id)}
              className={`py-1.5 px-1 rounded-lg transition flex flex-col items-center justify-center gap-1 ${
                isActive
                  ? 'bg-gradient-to-r from-brand-gold via-yellow-400 to-brand-gold text-black shadow font-black'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span className="leading-none">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ─── 1. PRESETS SUBTAB ─── */}
      {activeSubTab === 'presets' && (
        <div className="space-y-2 animate-fade-in">
          <div className="flex items-center justify-between text-[10.5px] text-gray-300 font-semibold mb-1">
            <span>اختر نمطاً جاهزاً بلمسة واحدة:</span>
            <span className="text-[9px] text-brand-gold">5 أنماط فاخرة</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {FOOTER_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className="group p-2.5 rounded-xl border border-white/10 hover:border-brand-gold/60 bg-black/60 hover:bg-black/80 transition flex items-center justify-between text-right shadow-md"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-white group-hover:text-brand-gold transition">
                      {preset.name}
                    </span>
                  </div>
                  <p className="text-[9.5px] text-gray-400 mt-0.5 leading-relaxed">
                    {preset.desc}
                  </p>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-brand-gold/10 group-hover:bg-brand-gold text-brand-gold group-hover:text-black border border-brand-gold/40 text-[10px] font-bold transition shrink-0 mr-2">
                  تطبيق
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── 2. CONTENT & LABELS SUBTAB ─── */}
      {activeSubTab === 'content' && (
        <div className="space-y-3 animate-fade-in">
          <div className="text-[10px] text-gray-300 font-semibold mb-1">
            تعديل نصوص وعناوين كل عنصر مع إمكانية إظهاره أو إخفائه:
          </div>

          {/* 1. Phone & WhatsApp Card */}
          <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-gold">
                <Phone className="w-3.5 h-3.5" />
                <span>1. الهاتف والواتساب</span>
              </div>
              <button
                type="button"
                onClick={() => updateCoverPage({ coverFooterPhoneVisible: !showPhone })}
                className={`px-2 py-0.5 rounded text-[9.5px] font-bold border transition ${
                  showPhone
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                    : 'bg-red-950/80 text-red-300 border-red-500/40'
                }`}
              >
                {showPhone ? '✓ ظاهر' : '✗ مخفي'}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[9.5px] text-gray-400 block mb-0.5">العنوان التوضيحي (Label):</label>
                <input
                  type="text"
                  className="cms-input text-[11px] text-brand-accent font-semibold"
                  value={labels.phone}
                  onChange={(e) => handleUpdateLabel('phone', e.target.value)}
                />
              </div>
              <div>
                <label className="text-[9.5px] text-gray-400 block mb-0.5">رقم الهاتف (Value):</label>
                <input
                  type="text"
                  className="cms-input text-[11px] font-mono font-bold text-white"
                  value={contact.phone}
                  onChange={(e) => handleUpdateContact('phone', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 2. Address Card */}
          <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-gold">
                <MapPin className="w-3.5 h-3.5" />
                <span>2. العنوان والموقع</span>
              </div>
              <button
                type="button"
                onClick={() => updateCoverPage({ coverFooterAddressVisible: !showAddress })}
                className={`px-2 py-0.5 rounded text-[9.5px] font-bold border transition ${
                  showAddress
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                    : 'bg-red-950/80 text-red-300 border-red-500/40'
                }`}
              >
                {showAddress ? '✓ ظاهر' : '✗ مخفي'}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[9.5px] text-gray-400 block mb-0.5">العنوان التوضيحي (Label):</label>
                <input
                  type="text"
                  className="cms-input text-[11px] text-brand-accent font-semibold"
                  value={labels.address}
                  onChange={(e) => handleUpdateLabel('address', e.target.value)}
                />
              </div>
              <div>
                <label className="text-[9.5px] text-gray-400 block mb-0.5">تفاصيل العنوان (Value):</label>
                <input
                  type="text"
                  className="cms-input text-[11px] font-semibold text-white"
                  value={contact.address}
                  onChange={(e) => handleUpdateContact('address', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 3. Opening Hours Card */}
          <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-gold">
                <Clock className="w-3.5 h-3.5" />
                <span>3. أوقات وساعات العمل</span>
              </div>
              <button
                type="button"
                onClick={() => updateCoverPage({ coverFooterHoursVisible: !showHours })}
                className={`px-2 py-0.5 rounded text-[9.5px] font-bold border transition ${
                  showHours
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                    : 'bg-red-950/80 text-red-300 border-red-500/40'
                }`}
              >
                {showHours ? '✓ ظاهر' : '✗ مخفي'}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[9.5px] text-gray-400 block mb-0.5">العنوان التوضيحي (Label):</label>
                <input
                  type="text"
                  className="cms-input text-[11px] text-brand-accent font-semibold"
                  value={labels.hours}
                  onChange={(e) => handleUpdateLabel('hours', e.target.value)}
                />
              </div>
              <div>
                <label className="text-[9.5px] text-gray-400 block mb-0.5">مواعيد الدوام (Value):</label>
                <input
                  type="text"
                  className="cms-input text-[11px] font-semibold text-white"
                  value={contact.hours}
                  onChange={(e) => handleUpdateContact('hours', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 4. Delivery Services Card */}
          <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-gold">
                <Truck className="w-3.5 h-3.5" />
                <span>4. منصات وخدمات التوصيل</span>
              </div>
              <button
                type="button"
                onClick={() => updateCoverPage({ coverFooterDeliveryVisible: !showDelivery })}
                className={`px-2 py-0.5 rounded text-[9.5px] font-bold border transition ${
                  showDelivery
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                    : 'bg-red-950/80 text-red-300 border-red-500/40'
                }`}
              >
                {showDelivery ? '✓ ظاهر' : '✗ مخفي'}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[9.5px] text-gray-400 block mb-0.5">العنوان التوضيحي (Label):</label>
                <input
                  type="text"
                  className="cms-input text-[11px] text-brand-accent font-semibold"
                  value={labels.delivery}
                  onChange={(e) => handleUpdateLabel('delivery', e.target.value)}
                />
              </div>
              <div>
                <label className="text-[9.5px] text-gray-400 block mb-0.5">شركاء التوصيل (Value):</label>
                <input
                  type="text"
                  className="cms-input text-[11px] font-bold text-brand-goldLight"
                  value={contact.delivery}
                  onChange={(e) => handleUpdateContact('delivery', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── 3. LAYOUT & SPACING SUBTAB ─── */}
      {activeSubTab === 'layout' && (
        <div className="space-y-3 animate-fade-in">
          {/* Columns Selector */}
          <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-1.5">
            <label className="text-[10px] text-gray-300 font-semibold block">تخطيط وتوزيع الأعمدة:</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: '4', label: '4 أعمدة أفقية', desc: 'شريط أفقي متوازن' },
                { id: '2', label: 'عمودان (2x2)', desc: 'شبكة مزدوجة' },
                { id: 'flex', label: 'مرن تلقائي', desc: 'توزيع حر متجاوب' },
              ].map((col) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => updateCoverPage({ coverFooterColumns: col.id })}
                  className={`p-2 rounded-lg border text-center transition ${
                    columns === col.id
                      ? 'bg-brand-gold text-black font-black border-brand-gold shadow'
                      : 'bg-black/80 border-white/10 text-gray-300 hover:text-white'
                  }`}
                >
                  <div className="text-[10.5px]">{col.label}</div>
                  <div className={`text-[8px] ${columns === col.id ? 'text-black/70' : 'text-gray-400'}`}>
                    {col.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Margin Slider */}
          <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-200 font-semibold flex items-center gap-1">
                <span>الارتفاع عن أسفل الغلاف (Bottom Margin):</span>
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-brand-gold font-mono font-bold bg-black/80 px-1.5 py-0.5 rounded border border-brand-gold/40">
                  {marginBottom}px
                </span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="70"
              step="1"
              className="control-slider"
              value={marginBottom}
              onChange={(e) => updateCoverPage({ coverFooterMarginBottom: Number(e.target.value) })}
            />
          </div>

          {/* Side Margin Slider */}
          <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-200 font-semibold flex items-center gap-1">
                <span>الهامش الجانبي للشريط (Side Margins):</span>
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-brand-gold font-mono font-bold bg-black/80 px-1.5 py-0.5 rounded border border-brand-gold/40">
                  {marginSide}px
                </span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="2"
              className="control-slider"
              value={marginSide}
              onChange={(e) => updateCoverPage({ coverFooterMarginSide: Number(e.target.value) })}
            />
          </div>

          {/* Padding & Gap Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Internal Padding */}
            <div className="bg-black/60 p-2 rounded-xl border border-white/10 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[9.5px] text-gray-300 font-semibold">الحشوة الداخلية (Padding):</span>
                <span className="text-[9.5px] text-brand-gold font-mono font-bold">{padding}px</span>
              </div>
              <input
                type="range"
                min="4"
                max="28"
                step="1"
                className="control-slider"
                value={padding}
                onChange={(e) => updateCoverPage({ coverFooterPadding: Number(e.target.value) })}
              />
            </div>

            {/* Gap between columns */}
            <div className="bg-black/60 p-2 rounded-xl border border-white/10 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[9.5px] text-gray-300 font-semibold">المسافة بين العناصر (Gap):</span>
                <span className="text-[9.5px] text-brand-gold font-mono font-bold">{gap}px</span>
              </div>
              <input
                type="range"
                min="4"
                max="28"
                step="1"
                className="control-slider"
                value={gap}
                onChange={(e) => updateCoverPage({ coverFooterGap: Number(e.target.value) })}
              />
            </div>
          </div>

          {/* Border Radius */}
          <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-200 font-semibold">استدارة الحواف (Border Radius):</span>
              <span className="text-[10px] text-brand-gold font-mono font-bold bg-black/80 px-1.5 py-0.5 rounded border border-brand-gold/40">
                {radius}px
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="2"
              className="control-slider"
              value={radius}
              onChange={(e) => updateCoverPage({ coverFooterBorderRadius: Number(e.target.value) })}
            />
            <div className="flex justify-between text-[8px] text-gray-400 pt-0.5">
              <span>0px حاد</span>
              <span>16px مستدير ناعم</span>
              <span>40px كبسولة دائرية</span>
            </div>
          </div>
        </div>
      )}

      {/* ─── 4. GLASS & BORDERS SUBTAB ─── */}
      {activeSubTab === 'glass' && (
        <div className="space-y-3 animate-fade-in">
          {/* Background Color & Opacity */}
          <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-200 font-semibold">لون خلفية الشريط:</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => updateCoverPage({ coverFooterBgColor: e.target.value })}
                  className="w-6 h-6 rounded border border-white/30 cursor-pointer bg-transparent"
                />
                <span className="text-[10px] font-mono text-gray-300 uppercase">{bgColor}</span>
              </div>
            </div>

            {/* Background Color Presets */}
            <div className="flex items-center gap-1.5 pt-1">
              {[
                { label: 'أخضر داكن', color: '#0e1d14' },
                { label: 'أسود فاحم', color: '#000000' },
                { label: 'أخضر الصافي', color: '#092113' },
                { label: 'كحلي ليلي', color: '#08141d' },
                { label: 'بني شوكولاتة', color: '#1a120c' },
              ].map((p) => (
                <button
                  key={p.color}
                  type="button"
                  onClick={() => updateCoverPage({ coverFooterBgColor: p.color })}
                  className="px-2 py-0.5 rounded text-[9px] border transition flex items-center gap-1 bg-black/60 text-gray-300 hover:text-white"
                  style={{ borderColor: bgColor === p.color ? '#8dc63f' : 'rgba(255,255,255,0.15)' }}
                >
                  <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: p.color }} />
                  <span>{p.label}</span>
                </button>
              ))}
            </div>

            {/* Background Opacity Slider */}
            <div className="pt-2 border-t border-white/10 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[9.5px] text-gray-300 font-semibold">شفافية الخلفية (Opacity):</span>
                <span className="text-[9.5px] text-brand-gold font-mono font-bold">{bgOpacity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                className="control-slider"
                value={bgOpacity}
                onChange={(e) => updateCoverPage({ coverFooterBgOpacity: Number(e.target.value) })}
              />
            </div>

            {/* Backdrop Blur Slider */}
            <div className="pt-1 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[9.5px] text-gray-300 font-semibold">قوة الضبابية الزجاجية (Backdrop Blur):</span>
                <span className="text-[9.5px] text-brand-gold font-mono font-bold">{blur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="2"
                className="control-slider"
                value={blur}
                onChange={(e) => updateCoverPage({ coverFooterBlur: Number(e.target.value) })}
              />
            </div>
          </div>

          {/* Border Customization */}
          <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-200 font-semibold">لون الإطار الخارجي:</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={borderColor}
                  onChange={(e) => updateCoverPage({ coverFooterBorderColor: e.target.value })}
                  className="w-6 h-6 rounded border border-white/30 cursor-pointer bg-transparent"
                />
                <span className="text-[10px] font-mono text-gray-300 uppercase">{borderColor}</span>
              </div>
            </div>

            {/* Border Presets */}
            <div className="flex items-center gap-1.5 pt-1">
              {[
                { label: 'أخضر زمردي', color: '#8dc63f' },
                { label: 'ذهبي ملكي', color: '#d4af37' },
                { label: 'أبيض لؤلؤي', color: '#ffffff' },
                { label: 'أصفر فاقع', color: '#facc15' },
              ].map((b) => (
                <button
                  key={b.color}
                  type="button"
                  onClick={() => updateCoverPage({ coverFooterBorderColor: b.color })}
                  className="px-2 py-0.5 rounded text-[9px] border transition flex items-center gap-1 bg-black/60 text-gray-300 hover:text-white"
                  style={{ borderColor: borderColor === b.color ? '#8dc63f' : 'rgba(255,255,255,0.15)' }}
                >
                  <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: b.color }} />
                  <span>{b.label}</span>
                </button>
              ))}
            </div>

            {/* Border Width & Opacity */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[9.5px] text-gray-300 font-semibold">سمك الإطار:</span>
                  <span className="text-[9.5px] text-brand-gold font-mono font-bold">{borderWidth}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  step="0.5"
                  className="control-slider"
                  value={borderWidth}
                  onChange={(e) => updateCoverPage({ coverFooterBorderWidth: Number(e.target.value) })}
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[9.5px] text-gray-300 font-semibold">شفافية الإطار:</span>
                  <span className="text-[9.5px] text-brand-gold font-mono font-bold">{borderOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  className="control-slider"
                  value={borderOpacity}
                  onChange={(e) => updateCoverPage({ coverFooterBorderOpacity: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>

          {/* Shadow & Glow Style */}
          <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-1.5">
            <span className="text-[10px] text-gray-200 font-semibold block">تأثير الظل والتوهج الخارجي:</span>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'none', label: 'بدون ظل' },
                { id: 'soft', label: 'ظل ناعم' },
                { id: 'strong', label: 'ظل عميق 3D' },
                { id: 'gold-glow', label: 'توهج ذهبي' },
                { id: 'green-glow', label: 'توهج أخضر' },
              ].map((sh) => (
                <button
                  key={sh.id}
                  type="button"
                  onClick={() => updateCoverPage({ coverFooterShadow: sh.id })}
                  className={`p-1.5 rounded-lg border text-center text-[10px] transition ${
                    shadowStyle === sh.id
                      ? 'bg-brand-gold text-black font-bold border-brand-gold shadow'
                      : 'bg-black/80 border-white/10 text-gray-300 hover:text-white'
                  }`}
                >
                  {sh.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── 5. ICONS CUSTOMIZATION SUBTAB ─── */}
      {activeSubTab === 'icons' && (
        <div className="space-y-3 animate-fade-in">
          {/* Show/Hide All Icons Toggle */}
          <div className="flex items-center justify-between bg-black/60 p-2.5 rounded-xl border border-white/10">
            <div>
              <span className="text-[10.5px] text-gray-200 font-semibold block">إظهار الأيقونات الدائرية:</span>
              <span className="text-[9px] text-gray-400 block">عرض أيقونات الهاتف والعنوان والوقت والشاحنة</span>
            </div>
            <button
              type="button"
              onClick={() => updateCoverPage({ coverFooterShowIcons: !showIcons })}
              className={`px-3 py-1 rounded-lg text-[10.5px] font-bold border transition ${
                showIcons
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                  : 'bg-red-950/80 text-red-300 border-red-500/40'
              }`}
            >
              {showIcons ? '✓ مفعلة' : '✗ مخفية'}
            </button>
          </div>

          {/* Icon Shape */}
          <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-1.5">
            <span className="text-[10px] text-gray-200 font-semibold block">شكل حاوية الأيقونة:</span>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'circle', label: 'دائري (Circle)', icon: Circle },
                { id: 'rounded', label: 'مربع منحني', icon: Square },
                { id: 'none', label: 'بدون دائرة خلفية', icon: EyeOff },
              ].map((shp) => {
                const Icon = shp.icon;
                return (
                  <button
                    key={shp.id}
                    type="button"
                    onClick={() => updateCoverPage({ coverFooterIconShape: shp.id })}
                    className={`p-1.5 rounded-lg border text-center text-[10px] transition flex items-center justify-center gap-1 ${
                      iconShape === shp.id
                        ? 'bg-brand-gold text-black font-bold border-brand-gold shadow'
                        : 'bg-black/80 border-white/10 text-gray-300 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{shp.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Icon Sizes Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Icon SVG Size */}
            <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[9.5px] text-gray-300 font-semibold">حجم رمز الأيقونة:</span>
                <span className="text-[9.5px] text-brand-gold font-mono font-bold">{iconSize}px</span>
              </div>
              <input
                type="range"
                min="10"
                max="26"
                step="1"
                className="control-slider"
                value={iconSize}
                onChange={(e) => updateCoverPage({ coverFooterIconSize: Number(e.target.value) })}
              />
            </div>

            {/* Circle Diameter */}
            <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[9.5px] text-gray-300 font-semibold">قطر دائرة الأيقونة:</span>
                <span className="text-[9.5px] text-brand-gold font-mono font-bold">{iconCircleSize}px</span>
              </div>
              <input
                type="range"
                min="18"
                max="44"
                step="2"
                className="control-slider"
                value={iconCircleSize}
                onChange={(e) => updateCoverPage({ coverFooterIconCircleSize: Number(e.target.value) })}
              />
            </div>
          </div>

          {/* Icon Colors */}
          <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-2">
            <span className="text-[10px] text-gray-200 font-semibold block">ألوان الأيقونة والحاوية:</span>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[9.5px] text-gray-400 block mb-1">لون رمز الأيقونة:</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={iconColor.startsWith('#') ? iconColor : '#8dc63f'}
                    onChange={(e) => updateCoverPage({ coverFooterIconColor: e.target.value })}
                    className="w-6 h-6 rounded border border-white/30 cursor-pointer bg-transparent"
                  />
                  <span className="text-[10px] font-mono text-gray-300">{iconColor}</span>
                </div>
              </div>

              <div>
                <label className="text-[9.5px] text-gray-400 block mb-1">لون إطار الدائرة:</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={borderColor}
                    onChange={(e) => updateCoverPage({ coverFooterIconBorderColor: e.target.value })}
                    className="w-6 h-6 rounded border border-white/30 cursor-pointer bg-transparent"
                  />
                  <span className="text-[10px] font-mono text-gray-300">مطابق للإطار</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── 6. TYPOGRAPHY & COLORS SUBTAB ─── */}
      {activeSubTab === 'typography' && (
        <div className="space-y-3 animate-fade-in">
          {/* Text Wrap Toggle */}
          <div className="flex items-center justify-between bg-black/60 p-2.5 rounded-xl border border-white/10">
            <div>
              <span className="text-[10.5px] text-gray-200 font-semibold block">التفاف النصوص تلقائياً (Text Wrap):</span>
              <span className="text-[9px] text-gray-400 block">نزول السطر تلقائياً بدلاً من قطع النصوص الطويلة بالنواقص (...)</span>
            </div>
            <button
              type="button"
              onClick={() => updateCoverPage({ coverFooterWrap: !wrap })}
              className={`px-3 py-1 rounded-lg text-[10.5px] font-bold border transition ${
                wrap
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                  : 'bg-yellow-950/80 text-yellow-300 border-yellow-500/40'
              }`}
            >
              {wrap ? '✓ ملتف (مكتمل)' : '✂ مقصوص (...)'}
            </button>
          </div>

          {/* Font Sizes Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Title Size */}
            <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[9.5px] text-gray-300 font-semibold">حجم العناوين (Labels):</span>
                <span className="text-[9.5px] text-brand-gold font-mono font-bold">{titleSize}px</span>
              </div>
              <input
                type="range"
                min="6"
                max="18"
                step="0.5"
                className="control-slider"
                value={titleSize}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  updateCoverPage({ coverFooterTitleSize: val });
                  updateSetting('page1', 'coverFooterTitleSize', val);
                }}
              />
            </div>

            {/* Value Size */}
            <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[9.5px] text-gray-300 font-semibold">حجم النصوص (Values):</span>
                <span className="text-[9.5px] text-brand-gold font-mono font-bold">{valueSize}px</span>
              </div>
              <input
                type="range"
                min="6"
                max="22"
                step="0.5"
                className="control-slider"
                value={valueSize}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  updateCoverPage({ coverFooterValueSize: val });
                  updateSetting('page1', 'coverFooterValueSize', val);
                }}
              />
            </div>
          </div>

          {/* Text Colors Grid */}
          <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 space-y-2">
            <span className="text-[10px] text-gray-200 font-semibold block">ألوان نصوص العناوين والقيم:</span>
            
            <div className="grid grid-cols-3 gap-2">
              {/* Title Color */}
              <div>
                <label className="text-[9px] text-gray-400 block mb-1">لون العناوين:</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={titleColor.startsWith('#') ? titleColor : '#8dc63f'}
                    onChange={(e) => updateCoverPage({ coverFooterTitleColor: e.target.value })}
                    className="w-6 h-6 rounded border border-white/30 cursor-pointer bg-transparent"
                  />
                  <span className="text-[9.5px] font-mono text-gray-300">{titleColor}</span>
                </div>
              </div>

              {/* Value Color */}
              <div>
                <label className="text-[9px] text-gray-400 block mb-1">لون نصوص القيم:</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={valueColor.startsWith('#') ? valueColor : '#ffffff'}
                    onChange={(e) => updateCoverPage({ coverFooterValueColor: e.target.value })}
                    className="w-6 h-6 rounded border border-white/30 cursor-pointer bg-transparent"
                  />
                  <span className="text-[9.5px] font-mono text-gray-300">{valueColor}</span>
                </div>
              </div>

              {/* Delivery Text Color */}
              <div>
                <label className="text-[9px] text-gray-400 block mb-1">لون نص التوصيل:</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={deliveryColor.startsWith('#') ? deliveryColor : '#a6e247'}
                    onChange={(e) => updateCoverPage({ coverFooterDeliveryColor: e.target.value })}
                    className="w-6 h-6 rounded border border-white/30 cursor-pointer bg-transparent"
                  />
                  <span className="text-[9.5px] font-mono text-gray-300">{deliveryColor}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CoverFooterEditor;
