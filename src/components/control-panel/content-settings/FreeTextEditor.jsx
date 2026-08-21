import React from 'react';
import { useMenu } from '../../../context/MenuContext';
import { Type } from 'lucide-react';

const FreeTextEditor = ({ pageIdx, page }) => {
  const { updatePage } = useMenu();

  const handleChange = (e) => {
    updatePage(pageIdx, { ...page, freeTextContent: e.target.value });
  };

  return (
    <div className="bg-black/50 border border-white/10 rounded-xl p-3 space-y-3">
      <div className="flex items-center gap-1.5 mb-2">
        <Type className="w-4 h-4 text-brand-gold" />
        <h3 className="text-xs font-bold text-white">محرر النصوص الحرة (HTML مدعوم)</h3>
      </div>
      <p className="text-[10px] text-gray-400 leading-relaxed">
        اكتب ما تشاء هنا. يمكنك استخدام وسوم HTML مثل <code>&lt;b&gt;</code> عريض، <code>&lt;i&gt;</code> مائل، <code>&lt;br&gt;</code> سطر جديد، <code>&lt;span style="color: red;"&gt;</code> ملون، وغيرها لتنسيق النص.
      </p>
      <textarea
        className="w-full h-64 bg-black/70 border border-brand-gold/40 rounded-lg p-3 text-[11px] text-white focus:outline-none focus:border-brand-gold font-mono"
        value={page.freeTextContent || ''}
        onChange={handleChange}
        placeholder="اكتب النص هنا..."
        dir="rtl"
      />
    </div>
  );
};

export default FreeTextEditor;
