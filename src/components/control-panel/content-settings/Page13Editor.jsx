import React, { useState } from 'react';
import { Info, Phone, Mail, MapPin, Clock, Truck, QrCode, Sparkles, Sliders, Type, Palette, Utensils, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { useMenu } from '../../../context/MenuContext';
import { RESTAURANT_INFO } from '../../../data/legendData';
import { DEFAULT_SETTINGS } from '../../../data/defaultSettings';

export const Page13Editor = ({ pageIdx = 12, page }) => {
  const { updateHeader, updateSetting, getEffectiveSettingsForPage } = useMenu();

  const pageSettings = getEffectiveSettingsForPage(pageIdx);
  const p = pageSettings;
  const pageScope = `page${pageIdx + 1}`;

  const [activeCateringTab, setActiveCateringTab] = useState('items'); // 'items' | 'badge' | 'quote' | 'style'
  const [cateringSectionOpen, setCateringSectionOpen] = useState(true);

  const qrList = (p.qrCodes && p.qrCodes.length > 0) ? p.qrCodes : (DEFAULT_SETTINGS.qrCodes || []);

  const handleUpdateQr = (qIdx, field, val) => {
    const copy = [...qrList];
    copy[qIdx] = { ...(copy[qIdx] || {}), [field]: val };
    updateSetting('global', 'qrCodes', copy);
    updateSetting(pageScope, 'qrCodes', copy);
  };

  const handleResetCatering = () => {
    if (window.confirm('هل تريد استعادة النصوص والتنسيقات الافتراضية لقسم الكيترنج؟')) {
      const keys = [
        'showCateringCard', 'cateringBadgeNum', 'cateringBadgeTitle', 'cateringBadgeNumSize', 'cateringBadgeTitleSize',
        'cateringQuote', 'cateringQuoteSize', 'cateringQuoteColor',
        'cateringDesc', 'cateringDescSize', 'cateringDescColor',
        'showCateringPhone', 'cateringPhoneIcon', 'cateringPhoneLabel', 'cateringPhoneVal',
        'showCateringEmail', 'cateringEmailIcon', 'cateringEmailLabel', 'cateringEmailVal',
        'showCateringAddress', 'cateringAddressIcon', 'cateringAddressLabel', 'cateringAddressVal',
        'showCateringDeliveryServices', 'cateringDeliveryServicesIcon', 'cateringDeliveryServicesLabel', 'cateringDeliveryServicesVal',
        'showCateringHours', 'cateringHoursIcon', 'cateringHoursLabel', 'cateringHoursVal',
        'showCateringDeliveryTimes', 'cateringDeliveryTimesIcon', 'cateringDeliveryTimesLabel', 'cateringDeliveryTimesVal',
        'cateringItemLabelSize', 'cateringItemLabelColor', 'cateringItemValSize', 'cateringItemValColor',
      ];
      keys.forEach((k) => updateSetting(pageScope, k, undefined));
    }
  };

  return (
    <div className="space-y-4 animate-fade-in text-right" dir="rtl">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0c2417] to-[#06140d] border border-brand-gold/50 rounded-xl p-3 shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-brand-gold flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-yellow-400" />
            <span>لوحة تحكم صفحة 13 — Catering &amp; Legenden</span>
          </span>
          <p className="text-[10px] text-gray-300 mt-0.5">
            تحكم كامل في نصوص الكيترنج، بيانات التواصل، رموز QR، ودليل الحساسية
          </p>
        </div>
        <span className="px-2 py-0.5 bg-black/60 border border-brand-gold/40 text-brand-goldLight text-[10px] font-mono font-bold rounded">
          صفحة 13
        </span>
      </div>

      {/* 1. Header & Title Section */}
      <div className="bg-black/60 border border-white/10 rounded-xl p-3 space-y-2.5 shadow-sm">
        <span className="text-[11px] font-bold text-brand-goldLight flex items-center gap-1">
          <Type className="w-3 h-3 text-brand-gold" />
          <span>عناوين الترويسة الرئيسية:</span>
        </span>

        <div>
          <label className="text-[10px] text-gray-300 mb-0.5 block">العنوان الفرعي العلوي (Subtitle):</label>
          <input
            type="text"
            className="cms-input text-xs"
            value={page.header?.subtitle || ''}
            onChange={(e) => updateHeader(pageIdx, 'subtitle', e.target.value)}
            placeholder="18 · CATERING & INFOS"
          />
        </div>

        <div>
          <label className="text-[10px] text-gray-300 mb-0.5 block">العنوان الرئيسي (Title):</label>
          <input
            type="text"
            className="cms-input text-xs font-bold"
            value={page.header?.title || ''}
            onChange={(e) => updateHeader(pageIdx, 'title', e.target.value)}
            placeholder="Catering, Infos & Legenden"
          />
        </div>

        <div>
          <label className="text-[10px] text-gray-300 mb-0.5 block">الشعار اللفظي (Tagline):</label>
          <input
            type="text"
            className="cms-input text-xs italic"
            value={page.header?.tagline || ''}
            onChange={(e) => updateHeader(pageIdx, 'tagline', e.target.value)}
            placeholder="hilfreich · komplett · transparent"
          />
        </div>
      </div>

      {/* 2. Catering, Delivery & Services Controller (قسم خدمات الكيترنج والتواصل والتوصيل) */}
      <div className="bg-black/60 border border-brand-gold/40 rounded-xl p-3 space-y-3 shadow-md">
        <div className="flex items-center justify-between border-b border-brand-gold/30 pb-2">
          <div className="flex items-center gap-1.5 cursor-pointer select-none" onClick={() => setCateringSectionOpen(!cateringSectionOpen)}>
            <Utensils className="w-4 h-4 text-brand-gold" />
            <div>
              <span className="text-xs font-bold text-brand-gold block">
                قسم خدمات الكيترنج والتواصل (Catering &amp; Services)
              </span>
              <span className="text-[9px] text-gray-400 block">
                تحكم كامل في نصوص الشارة 18، العبارة، الوصف، والبيانات الـ 6
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 text-[10px] text-gray-200 cursor-pointer bg-black/60 px-2 py-1 rounded border border-white/10">
              <input
                type="checkbox"
                checked={p.showCateringCard !== false}
                onChange={(e) => updateSetting(pageScope, 'showCateringCard', e.target.checked)}
                className="rounded"
              />
              <span className="font-semibold">{p.showCateringCard !== false ? 'القسم ظاهر' : 'القسم مخفي'}</span>
            </label>
            <button
              type="button"
              onClick={() => setCateringSectionOpen(!cateringSectionOpen)}
              className="text-gray-400 hover:text-brand-gold transition p-0.5"
              title={cateringSectionOpen ? 'طي القسم' : 'توسيع القسم'}
            >
              {cateringSectionOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {p.showCateringCard !== false && cateringSectionOpen && (
          <div className="space-y-3 pt-1">
            {/* Sub-tabs Navigation */}
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 gap-1 overflow-x-auto">
              <div className="flex items-center gap-1">
                {[
                  { id: 'items', label: '📞 بيانات التواصل (6)', icon: Phone },
                  { id: 'badge', label: '🏷️ الشارة والعنوان', icon: Type },
                  { id: 'quote', label: '💬 العبارة والوصف', icon: Sparkles },
                  { id: 'style', label: '🎨 الخطوط والألوان', icon: Palette },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCateringTab(tab.id)}
                    className={`px-2 py-1 rounded text-[9.5px] font-bold transition flex items-center gap-1 ${
                      activeCateringTab === tab.id
                        ? 'bg-brand-gold text-black shadow-sm'
                        : 'bg-black/50 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleResetCatering}
                className="text-[9px] text-gray-400 hover:text-red-400 transition flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10 hover:border-red-400/40 bg-black/40 shrink-0"
                title="استعادة القيم الافتراضية"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>استعادة</span>
              </button>
            </div>

            {/* TAB 1: 6 CONTACT & SERVICE ITEMS */}
            {activeCateringTab === 'items' && (
              <div className="space-y-2.5">
                <span className="text-[10px] text-gray-300 font-semibold block">
                  تعديل الأيقونة، العنوان، والقيمة لكل بند من بنود التواصل:
                </span>

                {[
                  {
                    title: '1. الهاتف والواتساب (Telefon & WhatsApp)',
                    iconKey: 'cateringPhoneIcon',
                    labelKey: 'cateringPhoneLabel',
                    valKey: 'cateringPhoneVal',
                    showKey: 'showCateringPhone',
                    defaultIcon: '📞',
                    defaultLabel: 'Telefon & WhatsApp:',
                    defaultVal: RESTAURANT_INFO.phone || '06221 72 59 000',
                  },
                  {
                    title: '2. إيميل الكيترنج والاستفسارات (Catering & Anfragen)',
                    iconKey: 'cateringEmailIcon',
                    labelKey: 'cateringEmailLabel',
                    valKey: 'cateringEmailVal',
                    showKey: 'showCateringEmail',
                    defaultIcon: '@',
                    defaultLabel: 'Catering & Anfragen:',
                    defaultVal: RESTAURANT_INFO.email || 'info@alsafi-heidelberg.de',
                  },
                  {
                    title: '3. عنوان المطعم (Adresse)',
                    iconKey: 'cateringAddressIcon',
                    labelKey: 'cateringAddressLabel',
                    valKey: 'cateringAddressVal',
                    showKey: 'showCateringAddress',
                    defaultIcon: '📍',
                    defaultLabel: 'Adresse:',
                    defaultVal: RESTAURANT_INFO.address || 'Hertzstraße 1, 69126 Heidelberg – Kaufland',
                  },
                  {
                    title: '4. منصات وتطبيقات الطلب (Bestellung auch über)',
                    iconKey: 'cateringDeliveryServicesIcon',
                    labelKey: 'cateringDeliveryServicesLabel',
                    valKey: 'cateringDeliveryServicesVal',
                    showKey: 'showCateringDeliveryServices',
                    defaultIcon: '📱',
                    defaultLabel: 'Bestellung auch über:',
                    defaultVal: RESTAURANT_INFO.deliveryServices || 'Lieferando · Uber Eats · Wolt',
                  },
                  {
                    title: '5. أوقات الدوام والافتتاح (Öffnungszeiten)',
                    iconKey: 'cateringHoursIcon',
                    labelKey: 'cateringHoursLabel',
                    valKey: 'cateringHoursVal',
                    showKey: 'showCateringHours',
                    defaultIcon: '🕒',
                    defaultLabel: 'Öffnungszeiten:',
                    defaultVal: 'Montag–Samstag 11:00–22:00 Uhr | Sonntag & Feiertage 12:00–22:00 Uhr',
                  },
                  {
                    title: '6. أوقات خدمة التوصيل (Lieferzeiten)',
                    iconKey: 'cateringDeliveryTimesIcon',
                    labelKey: 'cateringDeliveryTimesLabel',
                    valKey: 'cateringDeliveryTimesVal',
                    showKey: 'showCateringDeliveryTimes',
                    defaultIcon: '🚚',
                    defaultLabel: 'Lieferzeiten:',
                    defaultVal: 'Montag–Samstag 14:00–21:00 Uhr | Sonntag & Feiertage 12:00–21:00 Uhr',
                  },
                ].map((item, idx) => {
                  const isVisible = p[item.showKey] !== false;
                  return (
                    <div
                      key={item.labelKey}
                      className={`bg-black/80 border rounded-xl p-2.5 space-y-2 transition ${
                        isVisible ? 'border-brand-gold/30' : 'border-white/10 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-white/10 pb-1">
                        <span className="text-[10.5px] font-bold text-brand-goldLight flex items-center gap-1">
                          <span>{item.title}</span>
                        </span>
                        <label className="flex items-center gap-1.5 text-[9.5px] text-gray-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isVisible}
                            onChange={(e) => updateSetting(pageScope, item.showKey, e.target.checked)}
                            className="rounded"
                          />
                          <span>{isVisible ? 'مفعّل' : 'معطّل'}</span>
                        </label>
                      </div>

                      {isVisible && (
                        <div className="space-y-1.5">
                          <div className="grid grid-cols-4 gap-2">
                            <div className="col-span-1">
                              <label className="text-[9px] text-gray-400 mb-0.5 block">الأيقونة / الرمز:</label>
                              <input
                                type="text"
                                className="cms-input text-xs text-center font-mono"
                                value={p[item.iconKey] !== undefined ? p[item.iconKey] : item.defaultIcon}
                                onChange={(e) => updateSetting(pageScope, item.iconKey, e.target.value)}
                                placeholder={item.defaultIcon}
                              />
                            </div>
                            <div className="col-span-3">
                              <label className="text-[9px] text-gray-400 mb-0.5 block">التسمية (Label):</label>
                              <input
                                type="text"
                                className="cms-input text-xs font-semibold"
                                value={p[item.labelKey] !== undefined ? p[item.labelKey] : item.defaultLabel}
                                onChange={(e) => updateSetting(pageScope, item.labelKey, e.target.value)}
                                placeholder={item.defaultLabel}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[9px] text-gray-400 mb-0.5 block">القيمة / النص التفصيلي (Value):</label>
                            {item.valKey === 'cateringHoursVal' || item.valKey === 'cateringDeliveryTimesVal' || item.valKey === 'cateringAddressVal' ? (
                              <textarea
                                rows={2}
                                className="cms-input text-[10.5px] leading-relaxed"
                                value={p[item.valKey] !== undefined ? p[item.valKey] : item.defaultVal}
                                onChange={(e) => updateSetting(pageScope, item.valKey, e.target.value)}
                                placeholder={item.defaultVal}
                              />
                            ) : (
                              <input
                                type="text"
                                className="cms-input text-xs"
                                value={p[item.valKey] !== undefined ? p[item.valKey] : item.defaultVal}
                                onChange={(e) => updateSetting(pageScope, item.valKey, e.target.value)}
                                placeholder={item.defaultVal}
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB 2: BADGE & SECTION TITLE */}
            {activeCateringTab === 'badge' && (
              <div className="bg-black/80 border border-brand-gold/30 rounded-xl p-3 space-y-3">
                <span className="text-[10.5px] text-brand-gold font-bold block">
                  شارة ورقم القسم (Category Pill &amp; Number):
                </span>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <label className="text-[9.5px] text-gray-300 mb-0.5 block">رقم القسم:</label>
                    <input
                      type="text"
                      className="cms-input text-xs text-center font-bold font-mono"
                      value={p.cateringBadgeNum || '18'}
                      onChange={(e) => updateSetting(pageScope, 'cateringBadgeNum', e.target.value)}
                      placeholder="18"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[9.5px] text-gray-300 mb-0.5 block">عنوان الشارة الكامل:</label>
                    <input
                      type="text"
                      className="cms-input text-xs font-bold"
                      value={p.cateringBadgeTitle || '18. CATERING · LIEFERUNG · ABHOLUNG'}
                      onChange={(e) => updateSetting(pageScope, 'cateringBadgeTitle', e.target.value)}
                      placeholder="18. CATERING · LIEFERUNG · ABHOLUNG"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                  <div>
                    <div className="flex justify-between text-[9.5px] text-gray-300 mb-1">
                      <span>حجم رقم الشارة:</span>
                      <span className="text-brand-gold font-mono">{p.cateringBadgeNumSize || 13}px</span>
                    </div>
                    <input
                      type="range"
                      min="9"
                      max="22"
                      step="0.5"
                      className="control-slider"
                      value={p.cateringBadgeNumSize || 13}
                      onChange={(e) => updateSetting(pageScope, 'cateringBadgeNumSize', parseFloat(e.target.value))}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[9.5px] text-gray-300 mb-1">
                      <span>حجم خط عنوان الشارة:</span>
                      <span className="text-brand-gold font-mono">{p.cateringBadgeTitleSize || 13.5}px</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="24"
                      step="0.5"
                      className="control-slider"
                      value={p.cateringBadgeTitleSize || 13.5}
                      onChange={(e) => updateSetting(pageScope, 'cateringBadgeTitleSize', parseFloat(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: QUOTE & DESCRIPTION */}
            {activeCateringTab === 'quote' && (
              <div className="space-y-3">
                {/* Quote Box */}
                <div className="bg-black/80 border border-brand-gold/30 rounded-xl p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10.5px] text-brand-gold font-bold">العبارة المميزة (Quote):</span>
                    <span className="text-[9.5px] text-brand-gold font-mono">{p.cateringQuoteSize !== undefined ? p.cateringQuoteSize : 13}px</span>
                  </div>
                  <input
                    type="text"
                    className="cms-input text-xs italic"
                    value={p.cateringQuote !== undefined ? p.cateringQuote : '„Du feierst. Wir kümmern uns um den Rest.“'}
                    onChange={(e) => updateSetting(pageScope, 'cateringQuote', e.target.value)}
                    placeholder="„Du feierst. Wir kümmern uns um den Rest.“"
                  />

                  <div className="pt-1">
                    <div className="flex justify-between text-[9px] text-gray-300 mb-1">
                      <span>حجم خط العبارة:</span>
                      <span className="text-brand-gold font-mono">{p.cateringQuoteSize !== undefined ? p.cateringQuoteSize : 13}px</span>
                    </div>
                    <input
                      type="range"
                      min="9"
                      max="24"
                      step="0.5"
                      className="control-slider"
                      value={p.cateringQuoteSize !== undefined ? p.cateringQuoteSize : 13}
                      onChange={(e) => updateSetting(pageScope, 'cateringQuoteSize', parseFloat(e.target.value))}
                    />
                  </div>

                  {/* Quote Color */}
                  <div className="pt-1 border-t border-white/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9.5px] text-gray-300">لون خط العبارة:</span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={p.cateringQuoteColor || '#8A6A1A'}
                          onChange={(e) => updateSetting(pageScope, 'cateringQuoteColor', e.target.value)}
                          className="w-5 h-5 rounded border border-white/30 cursor-pointer bg-transparent"
                        />
                        <span className="text-[9px] font-mono text-gray-300">{p.cateringQuoteColor || '#8A6A1A'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-wrap pt-0.5">
                      {[
                        { label: 'ذهبي أصلي', color: '#8A6A1A' },
                        { label: 'ذهبي فاتح', color: '#C9AA58' },
                        { label: 'أخضر الصافي', color: '#8dc63f' },
                        { label: 'أبيض ناصع', color: '#ffffff' },
                        { label: 'داكن كحلي', color: '#1a1a1a' },
                      ].map((c) => (
                        <button
                          key={c.color}
                          type="button"
                          onClick={() => updateSetting(pageScope, 'cateringQuoteColor', c.color)}
                          className="px-1.5 py-0.5 rounded text-[8.5px] border bg-black/60 text-gray-300 hover:text-white flex items-center gap-1"
                          style={{ borderColor: (p.cateringQuoteColor || '#8A6A1A') === c.color ? '#8dc63f' : 'rgba(255,255,255,0.15)' }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                          <span>{c.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description Box */}
                <div className="bg-black/80 border border-brand-gold/30 rounded-xl p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10.5px] text-brand-gold font-bold">النص الوصفي (Description):</span>
                    <span className="text-[9.5px] text-brand-gold font-mono">{p.cateringDescSize !== undefined ? p.cateringDescSize : 11}px</span>
                  </div>
                  <textarea
                    rows={3}
                    className="cms-input text-[11px] leading-relaxed"
                    value={p.cateringDesc !== undefined ? p.cateringDesc : 'Ob Geburtstag, Hochzeit, Firmenfeier oder Familienfest - wir bringen Alsafi auf euren Tisch. Frisch zubereitet, individuell abgestimmt und mit Liebe gemacht.'}
                    onChange={(e) => updateSetting(pageScope, 'cateringDesc', e.target.value)}
                    placeholder="Ob Geburtstag, Hochzeit, Firmenfeier oder Familienfest..."
                  />

                  <div className="pt-1">
                    <div className="flex justify-between text-[9px] text-gray-300 mb-1">
                      <span>حجم خط الوصف:</span>
                      <span className="text-brand-gold font-mono">{p.cateringDescSize !== undefined ? p.cateringDescSize : 11}px</span>
                    </div>
                    <input
                      type="range"
                      min="8"
                      max="18"
                      step="0.5"
                      className="control-slider"
                      value={p.cateringDescSize !== undefined ? p.cateringDescSize : 11}
                      onChange={(e) => updateSetting(pageScope, 'cateringDescSize', parseFloat(e.target.value))}
                    />
                  </div>

                  {/* Description Color */}
                  <div className="pt-1 border-t border-white/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9.5px] text-gray-300">لون خط الوصف:</span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={p.cateringDescColor || '#44443E'}
                          onChange={(e) => updateSetting(pageScope, 'cateringDescColor', e.target.value)}
                          className="w-5 h-5 rounded border border-white/30 cursor-pointer bg-transparent"
                        />
                        <span className="text-[9px] font-mono text-gray-300">{p.cateringDescColor || '#44443E'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-wrap pt-0.5">
                      {[
                        { label: 'كريمي داكن', color: '#44443E' },
                        { label: 'أسود كحلي', color: '#161616' },
                        { label: 'رمادي فاتح', color: '#cbd5e1' },
                        { label: 'ذهبي معتدل', color: '#B88A2A' },
                        { label: 'أبيض ناصع', color: '#ffffff' },
                      ].map((c) => (
                        <button
                          key={c.color}
                          type="button"
                          onClick={() => updateSetting(pageScope, 'cateringDescColor', c.color)}
                          className="px-1.5 py-0.5 rounded text-[8.5px] border bg-black/60 text-gray-300 hover:text-white flex items-center gap-1"
                          style={{ borderColor: (p.cateringDescColor || '#44443E') === c.color ? '#8dc63f' : 'rgba(255,255,255,0.15)' }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                          <span>{c.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: TYPOGRAPHY & COLORS FOR ITEMS */}
            {activeCateringTab === 'style' && (
              <div className="bg-black/80 border border-brand-gold/30 rounded-xl p-3 space-y-3">
                <span className="text-[10.5px] text-brand-gold font-bold block">
                  أحجام وألوان خطوط بنود التواصل (Labels &amp; Values Typography):
                </span>

                {/* 1. Labels styling */}
                <div className="space-y-1.5 bg-black/50 p-2 rounded-lg border border-white/10">
                  <div className="flex justify-between items-center text-[9.5px] text-gray-300">
                    <span className="font-semibold">حجم خط عناوين البنود (Labels):</span>
                    <span className="text-brand-gold font-mono">{p.cateringItemLabelSize !== undefined ? p.cateringItemLabelSize : 11}px</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="18"
                    step="0.5"
                    className="control-slider"
                    value={p.cateringItemLabelSize !== undefined ? p.cateringItemLabelSize : 11}
                    onChange={(e) => updateSetting(pageScope, 'cateringItemLabelSize', parseFloat(e.target.value))}
                  />

                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <span className="text-[9px] text-gray-400">لون عناوين البنود:</span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={p.cateringItemLabelColor || '#2e6b22'}
                        onChange={(e) => updateSetting(pageScope, 'cateringItemLabelColor', e.target.value)}
                        className="w-5 h-5 rounded border border-white/30 cursor-pointer bg-transparent"
                      />
                      <span className="text-[9px] font-mono text-gray-300">{p.cateringItemLabelColor || '#2e6b22'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap pt-0.5">
                    {[
                      { label: 'أخضر غامق', color: '#2e6b22' },
                      { label: 'أخضر الصافي', color: '#8dc63f' },
                      { label: 'ذهبي', color: '#B88A2A' },
                      { label: 'أسود', color: '#111111' },
                      { label: 'أبيض', color: '#ffffff' },
                    ].map((c) => (
                      <button
                        key={c.color}
                        type="button"
                        onClick={() => updateSetting(pageScope, 'cateringItemLabelColor', c.color)}
                        className="px-1.5 py-0.5 rounded text-[8.5px] border bg-black/60 text-gray-300 hover:text-white flex items-center gap-1"
                        style={{ borderColor: (p.cateringItemLabelColor || '#2e6b22') === c.color ? '#8dc63f' : 'rgba(255,255,255,0.15)' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                        <span>{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Values styling */}
                <div className="space-y-1.5 bg-black/50 p-2 rounded-lg border border-white/10">
                  <div className="flex justify-between items-center text-[9.5px] text-gray-300">
                    <span className="font-semibold">حجم خط نصوص وتفاصيل البنود (Values):</span>
                    <span className="text-brand-gold font-mono">{p.cateringItemValSize !== undefined ? p.cateringItemValSize : 11}px</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="18"
                    step="0.5"
                    className="control-slider"
                    value={p.cateringItemValSize !== undefined ? p.cateringItemValSize : 11}
                    onChange={(e) => updateSetting(pageScope, 'cateringItemValSize', parseFloat(e.target.value))}
                  />

                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <span className="text-[9px] text-gray-400">لون نصوص وتفاصيل البنود:</span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={p.cateringItemValColor || '#333330'}
                        onChange={(e) => updateSetting(pageScope, 'cateringItemValColor', e.target.value)}
                        className="w-5 h-5 rounded border border-white/30 cursor-pointer bg-transparent"
                      />
                      <span className="text-[9px] font-mono text-gray-300">{p.cateringItemValColor || '#333330'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap pt-0.5">
                    {[
                      { label: 'كريمي داكن', color: '#333330' },
                      { label: 'أسود فحمي', color: '#0f0f0f' },
                      { label: 'رمادي فاتح', color: '#e2e8f0' },
                      { label: 'ذهبي فاتح', color: '#C9AA58' },
                      { label: 'أبيض ناصع', color: '#ffffff' },
                    ].map((c) => (
                      <button
                        key={c.color}
                        type="button"
                        onClick={() => updateSetting(pageScope, 'cateringItemValColor', c.color)}
                        className="px-1.5 py-0.5 rounded text-[8.5px] border bg-black/60 text-gray-300 hover:text-white flex items-center gap-1"
                        style={{ borderColor: (p.cateringItemValColor || '#333330') === c.color ? '#8dc63f' : 'rgba(255,255,255,0.15)' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                        <span>{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Interactive QR Codes & Subtitle Typography Controller */}
      <div className="bg-black/60 border border-brand-gold/40 rounded-xl p-3 space-y-3 shadow-md">
        <div className="flex items-center justify-between border-b border-brand-gold/30 pb-2">
          <div className="flex items-center gap-1.5">
            <QrCode className="w-4 h-4 text-brand-gold" />
            <div>
              <span className="text-xs font-bold text-brand-gold block">
                رموز QR ونصوصها التوضيحية (صفحة 14 / Info)
              </span>
              <span className="text-[9px] text-gray-400 block">
                تعديل الكتابة، الروابط، الأحجام، والألوان للوضوح التام
              </span>
            </div>
          </div>
          <label className="flex items-center gap-1.5 text-[10px] text-gray-200 cursor-pointer bg-black/60 px-2 py-1 rounded border border-white/10">
            <input
              type="checkbox"
              checked={p.showQrCodes !== false}
              onChange={(e) => updateSetting(pageScope, 'showQrCodes', e.target.checked)}
              className="rounded"
            />
            <span className="font-semibold">{p.showQrCodes !== false ? 'الرموز ظاهرة' : 'الرموز مخفية'}</span>
          </label>
        </div>

        {p.showQrCodes !== false && (
          <>
            {/* 1. Edit texts for each QR code */}
            <div className="space-y-2">
              <span className="text-[10px] text-gray-300 font-semibold block">
                تعديل العناوين والنصوص المكتوبة أسفل كل رمز:
              </span>
              {qrList.map((qr, qIdx) => {
                const qrIcons = ['🌐', '⭐', '💬'];
                const qrDefaultNames = ['1. الموقع والمنيو الإلكتروني', '2. تقييم جوجل', '3. الواتساب والطلبات'];
                const defaultSubtitles = ['Online Speisekarte', 'Bewerten Sie uns', 'Reservierung & Chat'];
                return (
                  <div key={qr.id || qIdx} className="bg-black/80 border border-brand-gold/30 rounded-xl p-2.5 space-y-2">
                    <div className="flex items-center justify-between border-b border-white/10 pb-1">
                      <span className="text-[10.5px] font-bold text-brand-gold flex items-center gap-1">
                        <span>{qrIcons[qIdx] || '📱'}</span>
                        <span>{qrDefaultNames[qIdx] || `رمز QR ${qIdx + 1}`}</span>
                      </span>
                      <span className="text-[9px] text-gray-400 font-mono">
                        {qr.id || `qr-${qIdx + 1}`}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {/* Subtitle - The small text the user mentioned */}
                      <div className="bg-brand-gold/10 border border-brand-gold/40 p-1.5 rounded-lg">
                        <label className="text-[10px] text-brand-goldLight font-bold flex items-center justify-between mb-0.5">
                          <span>✍️ الكتابة التوضيحية أسفل الباركود (Subtitle):</span>
                          <span className="text-[8.5px] text-yellow-300 font-normal">النص المطلوب تعديله</span>
                        </label>
                        <input
                          type="text"
                          className="cms-input text-[11px] font-bold text-white bg-black/80"
                          value={qr.subtitle !== undefined ? qr.subtitle : (defaultSubtitles[qIdx] || '')}
                          onChange={(e) => handleUpdateQr(qIdx, 'subtitle', e.target.value)}
                          placeholder={defaultSubtitles[qIdx] || 'اكتب النص هنا...'}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[9.5px] text-gray-400 block mb-0.5 font-semibold">
                            العنوان الرئيسي العلوي:
                          </label>
                          <input
                            type="text"
                            className="cms-input text-[11px] text-brand-gold"
                            value={qr.title || ''}
                            onChange={(e) => handleUpdateQr(qIdx, 'title', e.target.value)}
                            placeholder="العنوان العلوي"
                          />
                        </div>
                        <div>
                          <label className="text-[9.5px] text-gray-400 block mb-0.5 font-semibold">
                            رابط الباركود:
                          </label>
                          <input
                            type="text"
                            className="cms-input text-[11px] font-mono text-left"
                            dir="ltr"
                            value={qr.url || ''}
                            onChange={(e) => handleUpdateQr(qIdx, 'url', e.target.value)}
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 2. Subtitle Typography & Color Controls (حل مشكلة اللون غير الواضح وحجم الخط) */}
            <div className="bg-black/80 border border-brand-gold/30 rounded-xl p-2.5 space-y-2.5 pt-2">
              <span className="text-[10.5px] font-bold text-brand-gold flex items-center gap-1 border-b border-white/10 pb-1">
                <Palette className="w-3.5 h-3.5 text-brand-gold" />
                <span>تحكم ألوان وحجم الخطوط (للوضوح التام على الورق):</span>
              </span>

              {/* Subtitle Font Size */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] text-gray-200 font-semibold">
                  <span>حجم الكتابة التوضيحية السفلية (Subtitle Size):</span>
                  <span className="text-brand-gold font-mono font-bold bg-black px-1.5 py-0.5 rounded border border-brand-gold/40">
                    {p.qrSubtitleSize !== undefined ? p.qrSubtitleSize : 11.5}px
                  </span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="22"
                  step="0.5"
                  className="control-slider"
                  value={p.qrSubtitleSize !== undefined ? p.qrSubtitleSize : 11.5}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    updateSetting(pageScope, 'qrSubtitleSize', val);
                    updateSetting('global', 'qrSubtitleSize', val);
                  }}
                />
              </div>

              {/* Subtitle Color Picker & Presets */}
              <div className="space-y-1.5 pt-1 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-200 font-semibold">
                    لون الكتابة السفلية (حل مشكلة اللون الباهت):
                  </span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={p.qrSubtitleColor || '#162a1c'}
                      onChange={(e) => {
                        updateSetting(pageScope, 'qrSubtitleColor', e.target.value);
                        updateSetting('global', 'qrSubtitleColor', e.target.value);
                      }}
                      className="w-6 h-6 rounded border border-white/30 cursor-pointer bg-transparent"
                    />
                    <span className="text-[10px] font-mono text-gray-300">
                      {p.qrSubtitleColor || '#162a1c'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-wrap pt-0.5">
                  {[
                    { label: 'أخضر داكن ناصع (مثالي)', color: '#162a1c' },
                    { label: 'أسود كحلي', color: '#0a0a0a' },
                    { label: 'ذهبي غامق', color: '#8A6A1A' },
                    { label: 'أخضر الصافي', color: '#8dc63f' },
                    { label: 'أبيض لؤلؤي', color: '#ffffff' },
                  ].map((preset) => (
                    <button
                      key={preset.color}
                      type="button"
                      onClick={() => {
                        updateSetting(pageScope, 'qrSubtitleColor', preset.color);
                        updateSetting('global', 'qrSubtitleColor', preset.color);
                      }}
                      className="px-2 py-0.5 rounded text-[9px] border transition flex items-center gap-1 bg-black/60 text-gray-300 hover:text-white"
                      style={{
                        borderColor: (p.qrSubtitleColor || '#162a1c') === preset.color ? '#8dc63f' : 'rgba(255,255,255,0.15)',
                      }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: preset.color }} />
                      <span>{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title Size & Color */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[9.5px] text-gray-300 font-semibold">
                    <span>حجم العناوين العلوية:</span>
                    <span className="text-brand-gold font-mono">{p.qrTitleSize || 10.5}px</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="18"
                    step="0.5"
                    className="control-slider"
                    value={p.qrTitleSize || 10.5}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      updateSetting(pageScope, 'qrTitleSize', val);
                      updateSetting('global', 'qrTitleSize', val);
                    }}
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[9.5px] text-gray-300 font-semibold">
                    <span>حجم رمز الباركود:</span>
                    <span className="text-brand-gold font-mono">{p.qrCodeSize || 60}px</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="110"
                    step="2"
                    className="control-slider"
                    value={p.qrCodeSize || 60}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      updateSetting(pageScope, 'qrCodeSize', val);
                      updateSetting('global', 'qrCodeSize', val);
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 3. Legends & Notes Options */}
      <div className="bg-black/60 border border-white/10 rounded-xl p-3 space-y-2.5 shadow-sm">
        <span className="text-[11px] font-bold text-brand-goldLight flex items-center gap-1">
          <Sliders className="w-3 h-3 text-brand-gold" />
          <span>خيارات جداول الدليل والملاحظات (Legenden):</span>
        </span>

        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs text-gray-200 cursor-pointer">
            <input
              type="checkbox"
              checked={p.showHinweiseCard !== false}
              onChange={(e) => updateSetting(pageScope, 'showHinweiseCard', e.target.checked)}
              className="rounded"
            />
            <span>إظهار بطاقة الملاحظات والرموز (Hinweise &amp; Symbole)</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-gray-200 cursor-pointer">
            <input
              type="checkbox"
              checked={p.showAllergenLegend !== false}
              onChange={(e) => updateSetting(pageScope, 'showAllergenLegend', e.target.checked)}
              className="rounded"
            />
            <span>إظهار دليل الحساسية والمواد المضافة (Allergen &amp; Zusatzstoffe)</span>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
          <div>
            <div className="flex justify-between text-[10px] text-gray-300 mb-1">
              <span>حجم خط العناوين:</span>
              <span className="text-brand-gold font-mono">{p.legendTitleSize || 10}px</span>
            </div>
            <input
              type="range"
              min="8"
              max="16"
              step="0.5"
              className="control-slider"
              value={p.legendTitleSize || 10}
              onChange={(e) => updateSetting(pageScope, 'legendTitleSize', parseFloat(e.target.value))}
            />
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-gray-300 mb-1">
              <span>حجم خط القوائم:</span>
              <span className="text-brand-gold font-mono">{p.legendTextSize || 8}px</span>
            </div>
            <input
              type="range"
              min="6.5"
              max="12"
              step="0.5"
              className="control-slider"
              value={p.legendTextSize || 8}
              onChange={(e) => updateSetting(pageScope, 'legendTextSize', parseFloat(e.target.value))}
            />
          </div>
        </div>

        {/* Dynamic Symbol Notice Control */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          <div>
            <label className="text-[10px] text-gray-300 mb-0.5 block font-semibold">
              نص ملاحظة الرموز السفلية (Standardzubereitung Notice):
            </label>
            <textarea
              rows={2}
              className="cms-input text-[10.5px] leading-relaxed text-gray-200"
              value={p.hinweiseNoticeText !== undefined ? p.hinweiseNoticeText : 'Die Symbole beziehen sich auf die Standardzubereitung. Gerichte mit 🌶️ sind pikant; 🌶️🌶️ kennzeichnet die extra scharfe Variante.'}
              onChange={(e) => updateSetting(pageScope, 'hinweiseNoticeText', e.target.value)}
            />
          </div>

          <div className="bg-black/50 p-2 rounded-lg border border-white/10">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-gray-300 font-semibold">حجم خط ملاحظة الرموز (Notice Font Size):</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="6"
                  max="16"
                  step="0.5"
                  className="w-14 bg-black border border-brand-gold/60 text-brand-gold text-center text-[10px] font-mono font-bold rounded py-0.5"
                  value={p.hinweiseNoticeSize !== undefined ? p.hinweiseNoticeSize : 8.5}
                  onChange={(e) => updateSetting(pageScope, 'hinweiseNoticeSize', parseFloat(e.target.value))}
                />
                <span className="text-[9px] text-gray-400">px</span>
              </div>
            </div>
            <input
              type="range"
              min="6"
              max="16"
              step="0.5"
              className="control-slider"
              value={p.hinweiseNoticeSize !== undefined ? p.hinweiseNoticeSize : 8.5}
              onChange={(e) => updateSetting(pageScope, 'hinweiseNoticeSize', parseFloat(e.target.value))}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
          <div>
            <div className="flex justify-between text-[10px] text-gray-300 mb-1">
              <span>إزاحة أفقية (X):</span>
              <span className="text-brand-gold font-mono">{p.legendOffsetX || 0}px</span>
            </div>
            <input
              type="range"
              min="-30"
              max="30"
              step="1"
              className="control-slider"
              value={p.legendOffsetX || 0}
              onChange={(e) => updateSetting(pageScope, 'legendOffsetX', parseFloat(e.target.value))}
            />
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-gray-300 mb-1">
              <span>إزاحة عمودية (Y):</span>
              <span className="text-brand-gold font-mono">{p.legendOffsetY || 0}px</span>
            </div>
            <input
              type="range"
              min="-30"
              max="30"
              step="1"
              className="control-slider"
              value={p.legendOffsetY || 0}
              onChange={(e) => updateSetting(pageScope, 'legendOffsetY', parseFloat(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* 4. Page 13 Whole Block Position & Card Border Controls (إطارات وتحريك كروت صفحة 13) */}
      <div className="bg-gradient-to-r from-[#0c2417] to-[#06140d] border border-brand-gold/60 rounded-xl p-3 space-y-3 shadow-md">
        <span className="text-[11px] font-bold text-brand-gold flex items-center gap-1">
          <Sliders className="w-3.5 h-3.5 text-yellow-400" />
          <span>تحكّم كُتلة وإطارات صناديق صفحة 13 (ككتلة أو كإطار):</span>
        </span>

        {/* 1. Whole Block Position & Scale */}
        <div className="space-y-2 bg-black/60 p-2.5 rounded-lg border border-white/10">
          <span className="text-[10px] font-bold text-brand-goldLight block">1. تحريك وتكبير محتوى صفحة 13 ككتلة كاملة:</span>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-gray-300 font-semibold">إزاحة الكتلة عمودياً (رفع للأعلى / تنزيل):</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="-250"
                  max="250"
                  step="2"
                  className="w-14 bg-black border border-brand-gold/60 text-brand-gold text-center text-[10px] font-mono font-bold rounded py-0.5"
                  value={p.page13OffsetY || 0}
                  onChange={(e) => updateSetting(pageScope, 'page13OffsetY', parseFloat(e.target.value) || 0)}
                />
                <span className="text-[9px] text-gray-400">px</span>
              </div>
            </div>
            <input
              type="range"
              min="-250"
              max="250"
              step="2"
              className="control-slider"
              value={p.page13OffsetY || 0}
              onChange={(e) => updateSetting(pageScope, 'page13OffsetY', parseFloat(e.target.value))}
            />

            {/* Quick Raise Presets */}
            <div className="flex items-center justify-between pt-1 gap-1">
              <span className="text-[9px] text-gray-400">اختصارات الرفع السريع:</span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => updateSetting(pageScope, 'page13OffsetY', -40)}
                  className="px-2 py-0.5 bg-brand-gold/20 hover:bg-brand-gold hover:text-black border border-brand-gold/60 rounded text-[9px] font-bold text-brand-goldLight transition"
                >
                  🚀 رفع للأعلى (-40px)
                </button>
                <button
                  type="button"
                  onClick={() => updateSetting(pageScope, 'page13OffsetY', -80)}
                  className="px-2 py-0.5 bg-yellow-500/20 hover:bg-yellow-500 hover:text-black border border-yellow-500/60 rounded text-[9px] font-bold text-yellow-300 transition"
                >
                  ⬆️ رفع أكثر (-80px)
                </button>
                <button
                  type="button"
                  onClick={() => updateSetting(pageScope, 'page13OffsetY', 0)}
                  className="px-1.5 py-0.5 bg-black/60 hover:bg-white/10 border border-white/10 rounded text-[9px] text-gray-400 transition"
                >
                  📍 مركز (0)
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-gray-300">إزاحة الكتلة أفقياً (X Left/Right):</span>
              <span className="text-[10px] text-brand-gold font-mono font-bold">{p.page13OffsetX || 0}px</span>
            </div>
            <input
              type="range"
              min="-100"
              max="100"
              step="2"
              className="control-slider"
              value={p.page13OffsetX || 0}
              onChange={(e) => updateSetting(pageScope, 'page13OffsetX', parseFloat(e.target.value))}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-gray-300">تكبير وتصغير محتوى صفحة 13 (Content Scale %):</span>
              <span className="text-[10px] text-yellow-300 font-mono font-bold">{p.page13ContentScale || 100}%</span>
            </div>
            <input
              type="range"
              min="60"
              max="140"
              step="1"
              className="control-slider"
              value={p.page13ContentScale || 100}
              onChange={(e) => updateSetting(pageScope, 'page13ContentScale', parseFloat(e.target.value))}
            />
          </div>
        </div>

        {/* 2. Card Borders & Spacing Controls */}
        <div className="space-y-2 bg-black/60 p-2.5 rounded-lg border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-brand-goldLight">2. التنسيق إطار إطار لكل صندوق:</span>
            <button
              type="button"
              onClick={() => updateSetting(pageScope, 'showPage13CardBorders', p.showPage13CardBorders === false ? true : false)}
              className={`px-2 py-0.5 rounded text-[9.5px] font-bold border transition ${
                p.showPage13CardBorders !== false
                  ? 'bg-brand-gold/20 text-brand-gold border-brand-gold/60'
                  : 'bg-black/40 text-gray-400 border-white/10'
              }`}
            >
              {p.showPage13CardBorders !== false ? '✓ الإطارات مفعّلة' : 'الإطارات مخفية'}
            </button>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-gray-300">سماكة إطارات الصناديق (Border Width):</span>
              <span className="text-[10px] text-brand-gold font-mono font-bold">{p.page13BorderWidth !== undefined ? p.page13BorderWidth : 1.5}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="6"
              step="0.5"
              className="control-slider"
              value={p.page13BorderWidth !== undefined ? p.page13BorderWidth : 1.5}
              onChange={(e) => updateSetting(pageScope, 'page13BorderWidth', parseFloat(e.target.value))}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-gray-300">شفافية الإطارات الذهبية (Border Opacity):</span>
              <span className="text-[10px] text-brand-gold font-mono font-bold">{p.page13BorderOpacity !== undefined ? p.page13BorderOpacity : 50}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              className="control-slider"
              value={p.page13BorderOpacity !== undefined ? p.page13BorderOpacity : 50}
              onChange={(e) => updateSetting(pageScope, 'page13BorderOpacity', parseFloat(e.target.value))}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-gray-300">التباعد الفاصل بين الصناديق (Card Gap):</span>
              <span className="text-[10px] text-brand-gold font-mono font-bold">{p.page13CardGap !== undefined ? p.page13CardGap : 8}px</span>
            </div>
            <input
              type="range"
              min="2"
              max="24"
              step="1"
              className="control-slider"
              value={p.page13CardGap !== undefined ? p.page13CardGap : 8}
              onChange={(e) => updateSetting(pageScope, 'page13CardGap', parseFloat(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* 4. Logo Size for Page 13 */}
      <div className="bg-black/60 border border-white/10 rounded-xl p-3 space-y-2.5 shadow-sm">
        <span className="text-[11px] font-bold text-brand-goldLight flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-brand-gold" />
          <span>حجم شعار المطعم في صفحة 13:</span>
        </span>

        <div>
          <div className="flex justify-between text-[10px] text-gray-300 mb-1">
            <span>حجم الشعار:</span>
            <span className="text-brand-gold font-mono">{p.page13LogoSize || 54}px</span>
          </div>
          <input
            type="range"
            min="30"
            max="100"
            step="2"
            className="control-slider"
            value={p.page13LogoSize || 54}
            onChange={(e) => updateSetting(pageScope, 'page13LogoSize', parseFloat(e.target.value))}
          />
        </div>
      </div>

      {/* 5. Footer & Page Number Controls for Page 13 */}
      <div className="bg-black/60 border border-white/10 rounded-xl p-3 space-y-2.5 shadow-sm">
        <span className="text-[11px] font-bold text-brand-goldLight flex items-center gap-1">
          <Type className="w-3 h-3 text-brand-gold" />
          <span>تذييل الصفحة ورقم الصفحة (Footer &amp; Page Number):</span>
        </span>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="flex justify-between text-[10px] text-gray-300 mb-1">
              <span>حجم نص التذييل:</span>
              <span className="text-brand-gold font-mono">{p.footerTextSize !== undefined ? p.footerTextSize : 10}px</span>
            </div>
            <input
              type="range" min="6" max="20" step="0.5" className="control-slider"
              value={p.footerTextSize !== undefined ? p.footerTextSize : 10}
              onChange={(e) => updateSetting(pageScope, 'footerTextSize', parseFloat(e.target.value))}
            />
          </div>
          <div>
            <div className="flex justify-between text-[10px] text-gray-300 mb-1">
              <span>إزاحة عمودية (نص):</span>
              <span className="text-brand-accent font-mono">{p.footerTextOffsetY || 0}px</span>
            </div>
            <input
              type="range" min="-200" max="200" step="1" className="control-slider"
              value={p.footerTextOffsetY || 0}
              onChange={(e) => updateSetting(pageScope, 'footerTextOffsetY', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-2">
            <div className="flex justify-between text-[10px] text-gray-300 mb-1">
              <span>إزاحة أفقية (نص التذييل):</span>
              <span className="text-brand-accent font-mono">{p.footerTextOffsetX || 0}px</span>
            </div>
            <input
              type="range" min="-200" max="200" step="1" className="control-slider"
              value={p.footerTextOffsetX || 0}
              onChange={(e) => updateSetting(pageScope, 'footerTextOffsetX', parseFloat(e.target.value))}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
          <div>
            <div className="flex justify-between text-[10px] text-gray-300 mb-1">
              <span>حجم رقم الصفحة:</span>
              <span className="text-brand-gold font-mono">{p.pageNumberSize !== undefined ? p.pageNumberSize : 14}px</span>
            </div>
            <input
              type="range" min="8" max="28" step="0.5" className="control-slider"
              value={p.pageNumberSize !== undefined ? p.pageNumberSize : 14}
              onChange={(e) => updateSetting(pageScope, 'pageNumberSize', parseFloat(e.target.value))}
            />
          </div>
          <div>
            <div className="flex justify-between text-[10px] text-gray-300 mb-1">
              <span>إزاحة عمودية (رقم):</span>
              <span className="text-brand-accent font-mono">{p.pageNumberOffsetY || 0}px</span>
            </div>
            <input
              type="range" min="-200" max="200" step="1" className="control-slider"
              value={p.pageNumberOffsetY || 0}
              onChange={(e) => updateSetting(pageScope, 'pageNumberOffsetY', parseFloat(e.target.value))}
            />
          </div>
          <div className="col-span-2">
            <div className="flex justify-between text-[10px] text-gray-300 mb-1">
              <span>إزاحة أفقية (رقم الصفحة):</span>
              <span className="text-brand-accent font-mono">{p.pageNumberOffsetX || 0}px</span>
            </div>
            <input
              type="range" min="-200" max="200" step="1" className="control-slider"
              value={p.pageNumberOffsetX || 0}
              onChange={(e) => updateSetting(pageScope, 'pageNumberOffsetX', parseFloat(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page13Editor;
