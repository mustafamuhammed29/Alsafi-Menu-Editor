import React, { useState } from 'react';
import { RefreshCw, LayoutTemplate } from 'lucide-react';
import { useMenu } from '../../context/MenuContext';

// Import child components
import LogoSettings from './design-settings/LogoSettings';
import BackgroundSettings from './design-settings/BackgroundSettings';
import ArchSettings from './design-settings/ArchSettings';
import TypographySettings from './design-settings/TypographySettings';
import FloatingShapesSettings from './design-settings/FloatingShapesSettings';

export const DesignTab = () => {
  const { resetScope } = useMenu();
  const [targetScope, setTargetScope] = useState('global');
  
  // Shared states for image controls
  const [selectedImagePageIdx, setSelectedImagePageIdx] = useState(0);
  const [selectedImageSlot, setSelectedImageSlot] = useState(0);

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12 animate-fade-in text-right" dir="rtl">
      
      {/* Tab Header */}
      <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center">
          <LayoutTemplate className="w-5 h-5 text-brand-gold" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">إعدادات التصميم والهوية</h2>
          <p className="text-xs text-gray-400 mt-0.5">تحكم بالشعار، الألوان، الزخارف، الخطوط والأبعاد</p>
        </div>
      </div>

      <LogoSettings targetScope={targetScope} setTargetScope={setTargetScope} />
      
      <BackgroundSettings targetScope={targetScope} />
      
      <ArchSettings 
        targetScope={targetScope} 
        selectedImagePageIdx={selectedImagePageIdx}
        setSelectedImagePageIdx={setSelectedImagePageIdx}
        selectedImageSlot={selectedImageSlot}
        setSelectedImageSlot={setSelectedImageSlot}
      />
      
      <TypographySettings 
        targetScope={targetScope}
        setTargetScope={setTargetScope}
        selectedImagePageIdx={selectedImagePageIdx}
        setSelectedImagePageIdx={setSelectedImagePageIdx}
        selectedImageSlot={selectedImageSlot}
        setSelectedImageSlot={setSelectedImageSlot}
      />
      
      <FloatingShapesSettings />

      {/* Reset Action */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => resetScope(targetScope)}
          className="w-full py-2 bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 rounded-lg text-xs text-red-300 transition flex items-center justify-center gap-1.5 shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>إعادة ضبط هذا النطاق للافتراضي</span>
        </button>
      </div>

    </div>
  );
};

export default DesignTab;
