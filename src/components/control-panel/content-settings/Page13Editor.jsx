import React from 'react';
import { Info, Phone, Mail, MapPin, Clock, Truck, QrCode, Sparkles, Sliders, Type } from 'lucide-react';
import { useMenu } from '../../../context/MenuContext';
import { RESTAURANT_INFO } from '../../../data/legendData';

export const Page13Editor = ({ pageIdx = 12, page }) => {
  const { updateHeader, updateSetting, getEffectiveSettingsForPage } = useMenu();

  const pageSettings = getEffectiveSettingsForPage(pageIdx);
  const p = pageSettings;
  const pageScope = `page${pageIdx + 1}`;

  const qrList = p.qrCodes || [];

  const handleUpdateQr = (qIdx, field, val) => {
    const copy = [...qrList];
    copy[qIdx] = { ...(copy[qIdx] || {}), [field]: val };
    updateSetting('global', 'qrCodes', copy);
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
            placeholder="17 · CATERING & INFOS"
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

      {/* 2. Interactive QR Codes */}
      <div className="bg-black/60 border border-white/10 rounded-xl p-3 space-y-2.5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-brand-goldLight flex items-center gap-1">
            <QrCode className="w-3 h-3 text-brand-gold" />
            <span>رموز QR التفاعلية (3 باركودات):</span>
          </span>
          <label className="flex items-center gap-1 text-[10px] text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={p.showQrCodes !== false}
              onChange={(e) => updateSetting(pageScope, 'showQrCodes', e.target.checked)}
              className="rounded"
            />
            <span>إظهار الـ QR</span>
          </label>
        </div>

        {p.showQrCodes !== false && (
          <div className="space-y-2 pt-1">
            {qrList.map((qr, qIdx) => (
              <div key={qr.id || qIdx} className="bg-black/80 border border-brand-gold/30 rounded-lg p-2 space-y-1">
                <span className="text-[10px] font-bold text-brand-gold block">
                  رمز QR رقم {qIdx + 1}:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      type="text"
                      className="cms-input text-[11px]"
                      value={qr.title || ''}
                      onChange={(e) => handleUpdateQr(qIdx, 'title', e.target.value)}
                      placeholder="عنوان الرمز (مثال: الموقع الإلكتروني)"
                    />
                  </div>
                  <div>
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
            ))}
          </div>
        )}

        {p.showQrCodes !== false && (
          <div className="pt-1 border-t border-white/10">
            <div className="flex justify-between text-[10px] text-gray-300 mb-1">
              <span>حجم رمز QR:</span>
              <span className="text-brand-gold font-mono">{p.qrCodeSize || 60}px</span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              step="2"
              className="control-slider"
              value={p.qrCodeSize || 60}
              onChange={(e) => updateSetting(pageScope, 'qrCodeSize', parseFloat(e.target.value))}
            />
          </div>
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
              <span>حجم خط النصوص:</span>
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
