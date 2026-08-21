import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Camera, Link as LinkIcon, Trash2, QrCode as QrIcon, Upload } from 'lucide-react';
import EditableText from './EditableText';
import { optimizeImageFile } from '../../utils/imageOptimizer';

export const QRCodeDisplay = ({
  qr,
  index,
  size = 68,
  color = '#050a07',
  onUpdateTitle,
  onUpdateSubtitle,
  onUpdateUrl,
  onUpdateImage,
  onRemoveImage,
}) => {
  const [generatedQr, setGeneratedQr] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempUrl, setTempUrl] = useState(qr.url || '');
  const fileInputRef = useRef(null);

  // Generate offline high-res QR code whenever URL changes
  useEffect(() => {
    if (!qr.customImage && qr.url) {
      QRCode.toDataURL(qr.url, {
        width: 350,
        margin: 1,
        color: {
          dark: color,
          light: '#ffffff',
        },
      })
        .then((url) => setGeneratedQr(url))
        .catch((err) => console.error('Failed to generate QR:', err));
    }
  }, [qr.url, qr.customImage, color]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const optimized = await optimizeImageFile(file, 600, 600, 0.95);
        if (onUpdateImage) onUpdateImage(index, optimized);
      } catch {
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (onUpdateImage) onUpdateImage(index, ev.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSaveUrl = () => {
    if (onUpdateUrl) onUpdateUrl(index, tempUrl);
    setIsEditing(false);
  };

  const activeImageSrc = qr.customImage || generatedQr;

  return (
    <div className="flex flex-col items-center text-center group relative">
      {/* Title above QR Code */}
      <EditableText
        value={qr.title}
        onChange={(v) => onUpdateTitle && onUpdateTitle(index, v)}
        className="font-cinzel text-[10.5px] font-bold text-brand-gold tracking-wider uppercase mb-1 block"
      />

      {/* QR Code Container */}
      <div
        className="relative bg-white p-1.5 rounded-lg border-[1.5px] border-brand-gold/70 shadow-lg cursor-pointer transition-transform group-hover:scale-105"
        style={{ width: `${size + 12}px`, height: `${size + 12}px` }}
        onClick={() => setIsEditing(!isEditing)}
        title="انقر لتعديل الرابط أو رفع صورة باركود مخصصة"
      >
        {activeImageSrc ? (
          <img
            src={activeImageSrc}
            alt={qr.title}
            className="w-full h-full object-contain rounded"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400">
            <QrIcon className="w-6 h-6" />
            <span className="text-[8px] mt-0.5">أدخل رابط</span>
          </div>
        )}

        {/* Hover Quick Edit Badge (No-Print) */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity no-print">
          <span className="text-[9.5px] font-bold text-brand-goldLight bg-black/80 px-2 py-1 rounded border border-brand-gold/50">
            تعديل
          </span>
        </div>
      </div>

      {/* Subtitle below QR Code */}
      {qr.subtitle !== undefined && (
        <EditableText
          value={qr.subtitle}
          onChange={(v) => onUpdateSubtitle && onUpdateSubtitle(index, v)}
          className="text-[9px] text-slate-300 font-serif italic mt-1 block"
        />
      )}

      {/* Floating Popover Editor when clicked */}
      {isEditing && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 bg-[#0a0f0c] border border-brand-gold rounded-xl p-3 shadow-2xl z-50 no-print text-right backdrop-blur-md animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
            <span className="text-xs font-bold text-brand-gold flex items-center gap-1">
              <QrIcon className="w-3.5 h-3.5" />
              تعديل الباركود
            </span>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-xs text-gray-400 hover:text-white px-1"
            >
              ✕
            </button>
          </div>

          {/* Option 1: URL Input */}
          <div className="mb-2.5">
            <label className="text-[10px] text-gray-300 font-semibold block mb-1">
              1. رابط الباركود (يتم توليد الباركود تلقائياً):
            </label>
            <div className="flex gap-1">
              <input
                type="url"
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                placeholder="https://..."
                className="cms-input text-[11px] py-1 flex-1 font-mono m-0"
              />
              <button
                type="button"
                onClick={handleSaveUrl}
                className="px-2 py-1 bg-brand-gold text-black rounded text-[10.5px] font-bold"
              >
                حفظ
              </button>
            </div>
          </div>

          {/* Option 2: Upload Custom Image */}
          <div className="pt-2 border-t border-white/10">
            <label className="text-[10px] text-gray-300 font-semibold block mb-1">
              2. أو رفع صورة باركود جاهزة:
            </label>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 py-1.5 bg-black/60 hover:bg-black/90 border border-brand-gold/40 text-brand-goldLight rounded text-[10px] font-bold flex items-center justify-center gap-1 transition"
              >
                <Upload className="w-3 h-3 text-brand-gold" />
                <span>رفع صورة</span>
              </button>

              {qr.customImage && (
                <button
                  type="button"
                  onClick={() => {
                    if (onRemoveImage) onRemoveImage(index);
                  }}
                  className="p-1.5 bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-300 rounded text-[10px] transition"
                  title="حذف الصورة المرفوعة والرجوع للرابط التلقائي"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onClick={(e) => {
                e.currentTarget.value = '';
              }}
              onChange={handleFileUpload}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeDisplay;
