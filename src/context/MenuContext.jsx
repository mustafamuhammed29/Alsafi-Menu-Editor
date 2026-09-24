import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PAGES, DEFAULT_COVER_PAGE } from '../data/initialPages';
import { DEFAULT_FLYER_DATA } from '../data/initialFlyer';
import { DEFAULT_BIFOLD_FLYER } from '../data/initialBifoldFlyer';
import { DEFAULT_SETTINGS, DEFAULT_PAGE_OVERRIDES } from '../data/defaultSettings';

const MenuContext = createContext(null);

export const normalizeImage = (img, idx = 0) => {
  if (!img) return { url: '', scale: 1.0, posX: 50, posY: idx === 0 ? 68 : 30, flipX: false, flipY: false, brightness: 100, contrast: 100 };
  if (typeof img === 'string') {
    return { url: img, scale: 1.0, posX: 50, posY: idx === 0 ? 68 : 30, flipX: false, flipY: false, brightness: 100, contrast: 100 };
  }
  return {
    url: img.url || '',
    scale: typeof img.scale === 'number' ? img.scale : 1.0,
    posX: typeof img.posX === 'number' ? img.posX : 50,
    posY: typeof img.posY === 'number' ? img.posY : (idx === 0 ? 68 : 30),
    flipX: Boolean(img.flipX),
    flipY: Boolean(img.flipY),
    brightness: typeof img.brightness === 'number' ? img.brightness : 100,
    contrast: typeof img.contrast === 'number' ? img.contrast : 100,
  };
};

export const DATA_VERSION = '2026_09_24_ALSAFI_PERFECTED_V35';

// Global cache sync check: auto-heal settings and logo cache while preserving user-edited pages
try {
  const currentVersion = localStorage.getItem('alsafi_menu_version');
  if (currentVersion !== DATA_VERSION) {
    localStorage.removeItem('alsafi_menu_settings');
    localStorage.removeItem('alsafi_menu_overrides');
    localStorage.setItem('alsafi_menu_version', DATA_VERSION);
  }
} catch (e) {
  console.warn('Storage sync error:', e);
}

export const MenuProvider = ({ children }) => {
  // 0. App Mode: 'menu' (14 Pages Menu) | 'flyer' (4-Panel Bi-Fold Promotional Flyer)
  const [appMode, setAppMode] = useState(() => {
    try {
      const saved = localStorage.getItem('alsafi_app_mode');
      return saved === 'flyer' ? 'flyer' : 'menu';
    } catch {
      return 'menu';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('alsafi_app_mode', appMode);
    } catch (e) {
      console.warn('Failed to save app mode:', e);
    }
  }, [appMode]);

  // 0.1 Independent 4-Panel Bi-Fold Flyer State (Protected & Isolated)
  const [bifoldFlyerData, setBifoldFlyerData] = useState(() => {
    try {
      const savedVersion = localStorage.getItem('alsafi_menu_version');
      const saved = localStorage.getItem('alsafi_bifold_flyer_data');
      if (savedVersion === DATA_VERSION && saved) {
        return JSON.parse(saved);
      }
      return DEFAULT_BIFOLD_FLYER;
    } catch {
      return DEFAULT_BIFOLD_FLYER;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('alsafi_bifold_flyer_data', JSON.stringify(bifoldFlyerData));
    } catch (e) {
      console.warn('Failed to save bifold flyer data:', e);
    }
  }, [bifoldFlyerData]);

  // 0.2 View Mode for Brochure canvas ('both' | 'outside' | 'inside')
  const [trifoldViewMode, setTrifoldViewMode] = useState('both');

  const updateFlyerPanel1 = (field, val) => {
    setBifoldFlyerData((prev) => ({
      ...prev,
      panel1: {
        ...(prev.panel1 || {}),
        [field]: val,
      },
    }));
  };

  const updateFlyerPanel2 = (field, val) => {
    setBifoldFlyerData((prev) => ({
      ...prev,
      panel2: {
        ...(prev.panel2 || {}),
        [field]: val,
      },
    }));
  };

  const updateFlyerPanel3 = (field, val) => {
    setBifoldFlyerData((prev) => ({
      ...prev,
      panel3: {
        ...(prev.panel3 || {}),
        [field]: val,
      },
    }));
  };

  const updateFlyerPanel4 = (field, val) => {
    setBifoldFlyerData((prev) => ({
      ...prev,
      panel4: {
        ...(prev.panel4 || {}),
        [field]: val,
      },
    }));
  };

  const updateFlyerPanel5 = (field, val) => {
    setBifoldFlyerData((prev) => ({
      ...prev,
      panel5: {
        ...(prev.panel5 || {}),
        [field]: val,
      },
    }));
  };

  const updateFlyerPanel6 = (field, val) => {
    setBifoldFlyerData((prev) => ({
      ...prev,
      panel6: {
        ...(prev.panel6 || {}),
        [field]: val,
      },
    }));
  };

  const updateFlyerFontSizes = (field, val) => {
    setBifoldFlyerData((prev) => ({
      ...prev,
      fontSizeSettings: {
        ...(prev.fontSizeSettings || {
          categoryTitleSize: 12,
          itemNameSize: 10.5,
          itemDescSize: 8.5,
          priceSize: 10.5,
        }),
        [field]: val,
      },
    }));
  };
  const updateFlyerFontSize = updateFlyerFontSizes;

  const resetBifoldFlyer = () => {
    setBifoldFlyerData(DEFAULT_BIFOLD_FLYER);
    localStorage.setItem('alsafi_bifold_flyer_data', JSON.stringify(DEFAULT_BIFOLD_FLYER));
  };

  // 1. Independent Cover Page State (Protected & Isolated)
  const [coverPageData, setCoverPageData] = useState(() => {
    try {
      const savedVersion = localStorage.getItem('alsafi_menu_version');
      const saved = localStorage.getItem('alsafi_cover_page');
      if (savedVersion === DATA_VERSION && saved) {
        return JSON.parse(saved);
      }
      localStorage.setItem('alsafi_menu_version', DATA_VERSION);
      localStorage.setItem('alsafi_cover_page', JSON.stringify(DEFAULT_COVER_PAGE));
      return DEFAULT_COVER_PAGE;
    } catch {
      return DEFAULT_COVER_PAGE;
    }
  });

  const [showCoverPage, setShowCoverPage] = useState(() => {
    try {
      const saved = localStorage.getItem('alsafi_show_cover_page');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // 2. Pure 13 Menu Pages (Pages 1 to 13)
  const [pages, setPages] = useState(() => {
    try {
      const savedVersion = localStorage.getItem('alsafi_menu_version');
      const saved = localStorage.getItem('alsafi_menu_pages');

      if (savedVersion === DATA_VERSION && saved) {
        const parsed = JSON.parse(saved);
        const filtered = parsed.filter((p) => p.id !== 'page0' && p.layout !== 'cover');
        // Self-healing: verify page 5 does not contain category 13
        const hasWrongSection13OnPage5 = filtered.some((p) => p.id === 'page5' && p.categories?.some((c) => c.code === '13' || c.title?.includes('KINDERGERICHTE')));
        if (!hasWrongSection13OnPage5 && filtered.length > 0) {
          return filtered;
        }
      }

      localStorage.setItem('alsafi_menu_version', DATA_VERSION);
      localStorage.setItem('alsafi_menu_pages', JSON.stringify(INITIAL_PAGES));
      localStorage.setItem('alsafi_menu_settings', JSON.stringify(DEFAULT_SETTINGS));
      return INITIAL_PAGES;
    } catch (err) {
      console.warn('Error loading menu pages:', err);
      return INITIAL_PAGES;
    }
  });

  const resetToOfficialPdfData = () => {
    setPages(INITIAL_PAGES);
    setGlobalSettings(DEFAULT_SETTINGS);
    setPageOverrides(DEFAULT_PAGE_OVERRIDES);
    setCoverPageData(DEFAULT_COVER_PAGE);
    localStorage.setItem('alsafi_menu_version', DATA_VERSION);
    localStorage.setItem('alsafi_menu_pages', JSON.stringify(INITIAL_PAGES));
    localStorage.setItem('alsafi_menu_settings', JSON.stringify(DEFAULT_SETTINGS));
    localStorage.setItem('alsafi_menu_overrides', JSON.stringify(DEFAULT_PAGE_OVERRIDES));
    localStorage.setItem('alsafi_cover_page', JSON.stringify(DEFAULT_COVER_PAGE));
  };

  const [globalSettings, setGlobalSettings] = useState(() => {
    try {
      const savedVersion = localStorage.getItem('alsafi_menu_version');
      const saved = localStorage.getItem('alsafi_menu_settings');
      if (savedVersion === DATA_VERSION && saved) {
        const parsed = JSON.parse(saved);
        if (parsed.qrCodes) {
          parsed.qrCodes = parsed.qrCodes.map(q => q.id === 'whatsapp' && (q.url?.includes('49176') || !q.url) ? { ...q, url: 'https://wa.me/4962217259000' } : q);
        }
        if (!parsed.logoImage || parsed.logoImage === 'logo.jpg') {
          parsed.logoImage = DEFAULT_SETTINGS.logoImage;
        }
        return { ...DEFAULT_SETTINGS, ...parsed };
      }
      return DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [pageOverrides, setPageOverrides] = useState(() => {
    try {
      const savedVersion = localStorage.getItem('alsafi_menu_version');
      const saved = localStorage.getItem('alsafi_menu_overrides');
      if (savedVersion === DATA_VERSION && saved) {
        return JSON.parse(saved);
      }
      localStorage.setItem('alsafi_menu_overrides', JSON.stringify(DEFAULT_PAGE_OVERRIDES));
      return DEFAULT_PAGE_OVERRIDES;
    } catch {
      return DEFAULT_PAGE_OVERRIDES;
    }
  });

  // Pure UI Screen Preview Zoom (50% - 150%, does NOT affect print/PDF export)
  const [previewZoom, setPreviewZoom] = useState(() => {
    try {
      const saved = localStorage.getItem('alsafi_preview_zoom');
      return saved ? Number(saved) : 100;
    } catch {
      return 100;
    }
  });

  const zoomInPreview = () => setPreviewZoom((prev) => Math.min(150, prev + 10));
  const zoomOutPreview = () => setPreviewZoom((prev) => Math.max(50, prev - 10));
  const resetPreviewZoom = () => setPreviewZoom(100);

  useEffect(() => {
    try {
      localStorage.setItem('alsafi_preview_zoom', previewZoom.toString());
    } catch (_) {}
  }, [previewZoom]);

  // 📐 Print Blueprint Diagram & Layout Grid State (Screen visual preview overlay)
  const [showPrintGuides, setShowPrintGuides] = useState(() => {
    try {
      const saved = localStorage.getItem('alsafi_show_print_guides');
      return saved !== null ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  // ☀️ Plain Paper & Thermal Lamination Brightness Mode State
  const [isPlainPaperMode, setIsPlainPaperMode] = useState(() => {
    try {
      const saved = localStorage.getItem('alsafi_plain_paper_mode');
      return saved !== null ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const togglePlainPaperMode = () => setIsPlainPaperMode((prev) => !prev);

  useEffect(() => {
    try {
      localStorage.setItem('alsafi_plain_paper_mode', JSON.stringify(isPlainPaperMode));
    } catch (_) {}
  }, [isPlainPaperMode]);

  const [showLayoutGrid, setShowLayoutGrid] = useState(() => {
    try {
      const saved = localStorage.getItem('alsafi_show_layout_grid');
      return saved !== null ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const togglePrintGuides = () => setShowPrintGuides((prev) => !prev);
  const toggleLayoutGrid = () => setShowLayoutGrid((prev) => !prev);

  useEffect(() => {
    try {
      localStorage.setItem('alsafi_show_print_guides', JSON.stringify(showPrintGuides));
    } catch (_) {}
  }, [showPrintGuides]);

  useEffect(() => {
    try {
      localStorage.setItem('alsafi_show_layout_grid', JSON.stringify(showLayoutGrid));
    } catch (_) {}
  }, [showLayoutGrid]);

  // Autosave to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('alsafi_cover_page', JSON.stringify(coverPageData));
    } catch (e) {
      console.warn('Failed to save cover page:', e);
    }
  }, [coverPageData]);

  useEffect(() => {
    try {
      localStorage.setItem('alsafi_show_cover_page', JSON.stringify(showCoverPage));
    } catch (e) {
      console.warn('Failed to save showCoverPage:', e);
    }
  }, [showCoverPage]);

  useEffect(() => {
    try {
      localStorage.setItem('alsafi_menu_pages', JSON.stringify(pages));
    } catch (e) {
      console.warn('LocalStorage full or unavailable for pages', e);
    }
  }, [pages]);

  useEffect(() => {
    try {
      localStorage.setItem('alsafi_menu_settings', JSON.stringify(globalSettings));
    } catch (e) {
      console.warn('LocalStorage save failed for settings', e);
    }
  }, [globalSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('alsafi_menu_overrides', JSON.stringify(pageOverrides));
    } catch (e) {
      console.warn('LocalStorage save failed for overrides', e);
    }
  }, [pageOverrides]);

  // ─── Cover Page Handlers (Independent) ──────────────────────────────────────
  const updateCoverPage = (updates) => {
    setCoverPageData((prev) => ({ ...prev, ...updates }));
  };

  const updateCoverHeader = (field, value) => {
    setCoverPageData((prev) => ({
      ...prev,
      header: {
        ...(prev.header || {}),
        [field]: value,
      },
    }));
  };

  const updateCoverStory = (field, value) => {
    setCoverPageData((prev) => ({
      ...prev,
      story: {
        ...(prev.story || {}),
        [field]: value,
      },
    }));
  };

  const updateCoverBrother = (brotherIdx, field, value) => {
    setCoverPageData((prev) => {
      const brothers = [...(prev.brothers || [])];
      if (brothers[brotherIdx]) {
        brothers[brotherIdx] = {
          ...brothers[brotherIdx],
          [field]: value,
        };
      }
      return {
        ...prev,
        brothers,
      };
    });
  };

  const updateCoverGalleryCard = (cardIdx, field, value) => {
    setCoverPageData((prev) => {
      const cards = [...(prev.galleryCards || [])];
      if (cards[cardIdx]) {
        cards[cardIdx] = {
          ...cards[cardIdx],
          [field]: value,
        };
      }
      return {
        ...prev,
        galleryCards,
      };
    });
  };

  const resetCoverPage = () => {
    setCoverPageData(DEFAULT_COVER_PAGE);
    localStorage.setItem('alsafi_cover_page', JSON.stringify(DEFAULT_COVER_PAGE));
  };

  // ─── Menu Pages 1-13 Handlers ───────────────────────────────────────────────
  const updatePage = (pageIndex, updatedPage) => {
    setPages((prev) => {
      const copy = [...prev];
      copy[pageIndex] = updatedPage;
      return copy;
    });
  };

  const updateHeader = (pageIndex, field, value) => {
    setPages((prev) => {
      const copy = [...prev];
      copy[pageIndex] = {
        ...copy[pageIndex],
        header: {
          ...copy[pageIndex].header,
          [field]: value,
        },
      };
      return copy;
    });
  };

  const updateCategory = (pageIndex, catIndex, field, value) => {
    setPages((prev) => {
      const copy = [...prev];
      const cats = [...copy[pageIndex].categories];
      cats[catIndex] = {
        ...cats[catIndex],
        [field]: value,
      };
      copy[pageIndex] = {
        ...copy[pageIndex],
        categories: cats,
      };
      return copy;
    });
  };

  const updateItem = (pageIdx, catIdx, itemIdx, field, value) => {
    setPages((prev) => {
      const copy = [...prev];
      const page = { ...copy[pageIdx] };
      const cats = [...page.categories];
      const cat = { ...cats[catIdx] };
      const items = [...cat.items];
      items[itemIdx] = {
        ...items[itemIdx],
        [field]: value,
      };
      cat.items = items;
      cats[catIdx] = cat;
      page.categories = cats;
      copy[pageIdx] = page;
      return copy;
    });
  };

  const updateItemBadge = (pageIdx, catIdx, itemIdx, badge) => {
    updateItem(pageIdx, catIdx, itemIdx, 'badge', badge);
  };

  const updatePageCallout = (pageIndex, field, value) => {
    setPages((prev) => {
      const copy = [...prev];
      const page = { ...copy[pageIndex] };
      page.bottomCallout = {
        ...(page.bottomCallout || {}),
        [field]: value,
      };
      copy[pageIndex] = page;
      return copy;
    });
  };

  // Image updates with position & scale
  const updatePageImage = (pageIdx, imgIdx, dataUrl) => {
    setPages((prev) => {
      const copy = [...prev];
      const page = { ...copy[pageIdx] };
      const images = [...page.images];
      const prevNorm = normalizeImage(images[imgIdx]);
      images[imgIdx] = {
        ...prevNorm,
        url: dataUrl,
      };
      page.images = images;
      copy[pageIdx] = page;
      return copy;
    });
  };

  const updateImageTransform = (pageIdx, imgIdx, transformUpdates) => {
    setPages((prev) => {
      const copy = [...prev];
      const page = { ...copy[pageIdx] };
      const images = [...page.images];
      const current = normalizeImage(images[imgIdx]);
      images[imgIdx] = {
        ...current,
        ...transformUpdates,
      };
      page.images = images;
      copy[pageIdx] = page;
      return copy;
    });
  };

  const resetImageTransform = (pageIdx, imgIdx) => {
    updateImageTransform(pageIdx, imgIdx, { scale: 1, posX: 50, posY: 50, flipX: false, flipY: false, brightness: 100, contrast: 100 });
  };

  // Floating Geometric Food Shapes Handlers
  const addFloatingShape = (pageIdx, shapeData) => {
    setPages((prev) => {
      const copy = [...prev];
      const page = { ...copy[pageIdx] };
      const currentShapes = page.floatingShapes || [];
      const newShape = {
        id: `shape_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        shapeType: 'octagon',
        posX: 75,
        posY: 65,
        size: 90,
        rotation: 0,
        borderWidth: 2,
        borderColor: '#8dc63f',
        showGlow: true,
        icon: '✨',
        badgeText: '👑 CHEF TIPP',
        subText: '100% Halal',
        ...shapeData,
      };
      page.floatingShapes = [...currentShapes, newShape];
      copy[pageIdx] = page;
      return copy;
    });
  };

  const updateFloatingShape = (pageIdx, shapeId, updates) => {
    setPages((prev) => {
      const copy = [...prev];
      const page = { ...copy[pageIdx] };
      const currentShapes = page.floatingShapes || [];
      page.floatingShapes = currentShapes.map((s) =>
        s.id === shapeId ? { ...s, ...updates } : s
      );
      copy[pageIdx] = page;
      return copy;
    });
  };

  const deleteFloatingShape = (pageIdx, shapeId) => {
    setPages((prev) => {
      const copy = [...prev];
      const page = { ...copy[pageIdx] };
      const currentShapes = page.floatingShapes || [];
      page.floatingShapes = currentShapes.filter((s) => s.id !== shapeId);
      copy[pageIdx] = page;
      return copy;
    });
  };

  const addItem = (pageIdx, catIdx) => {
    setPages((prev) => {
      const copy = [...prev];
      const page = { ...copy[pageIdx] };
      const cats = [...page.categories];
      const cat = { ...cats[catIdx] };
      const items = [...cat.items];
      
      let nextNum = 1;
      if (items.length > 0) {
        const nums = items.map((i) => parseInt(i.num)).filter((n) => !isNaN(n));
        if (nums.length > 0) nextNum = Math.max(...nums) + 1;
      }

      items.push({
        num: nextNum.toString(),
        name: 'طبق جديد',
        allergens: 'Allergene: A',
        desc: '',
        price: '0,00 €',
      });

      cat.items = items;
      cats[catIdx] = cat;
      page.categories = cats;
      copy[pageIdx] = page;
      return copy;
    });
  };

  const deleteItem = (pageIdx, catIdx, itemIdx) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الطبق نهائياً؟")) {
      setPages((prev) => {
        const copy = [...prev];
        const page = { ...copy[pageIdx] };
        const cats = [...page.categories];
        const cat = { ...cats[catIdx] };
        const items = [...cat.items];
        items.splice(itemIdx, 1);
        cat.items = items;
        cats[catIdx] = cat;
        page.categories = cats;
        copy[pageIdx] = page;
        return copy;
      });
    }
  };

  const moveItem = (pageIdx, catIdx, itemIdx, direction) => {
    setPages((prev) => {
      const copy = [...prev];
      const page = { ...copy[pageIdx] };
      const cats = [...page.categories];
      const cat = { ...cats[catIdx] };
      const items = [...cat.items];
      
      if (direction === -1 && itemIdx > 0) {
        [items[itemIdx - 1], items[itemIdx]] = [items[itemIdx], items[itemIdx - 1]];
      } else if (direction === 1 && itemIdx < items.length - 1) {
        [items[itemIdx + 1], items[itemIdx]] = [items[itemIdx], items[itemIdx + 1]];
      }

      cat.items = items;
      cats[catIdx] = cat;
      page.categories = cats;
      copy[pageIdx] = page;
      return copy;
    });
  };

  // Setting modifications
  const updateSetting = (scope, key, value) => {
    let val = value;
    if (typeof value === 'string' && !isNaN(value) && value.trim() !== '') {
      if (value.length > 1 && value.startsWith('0')) {
        val = value;
      } else {
        val = Number(value);
      }
    }
    if (scope === 'global') {
      setGlobalSettings((prev) => ({ ...prev, [key]: val }));
      // Synchronize to pages that have explicitly overridden this setting
      setPageOverrides((prev) => {
        const copy = { ...prev };
        let hasChanges = false;
        Object.keys(copy).forEach((pageKey) => {
          if (copy[pageKey] && copy[pageKey][key] !== undefined) {
            copy[pageKey] = { ...copy[pageKey], [key]: val };
            hasChanges = true;
          }
        });
        return hasChanges ? copy : prev;
      });
    } else {
      setPageOverrides((prev) => ({
        ...prev,
        [scope]: { ...(prev[scope] || {}), [key]: val },
      }));
    }
  };

  const resetScope = (scope) => {
    if (scope !== 'global') {
      setPageOverrides((prev) => {
        const copy = { ...prev };
        if (DEFAULT_PAGE_OVERRIDES && DEFAULT_PAGE_OVERRIDES[scope]) {
          copy[scope] = { ...DEFAULT_PAGE_OVERRIDES[scope] };
        } else {
          delete copy[scope];
        }
        return copy;
      });
    } else {
      setGlobalSettings(DEFAULT_SETTINGS);
    }
  };

  const getEffectiveSettingsForPage = (pageIndex) => {
    const pageKey = `page${pageIndex + 1}`;
    const base = { ...globalSettings, ...(pageOverrides[pageKey] || {}) };
    if (isPlainPaperMode) {
      return {
        ...base,
        pageBrightness: Math.min(180, (base.pageBrightness || 100) + 20),
        imageBrightness: Math.min(180, (base.imageBrightness || 100) + 25),
        coverHeroBrightness: Math.min(180, (base.coverHeroBrightness || 100) + 25),
      };
    }
    return base;
  };

  // Smart Typography Maximizer: Expands fonts & fills unused page height to the maximum possible readable size!
  const maximizePageTypography = (pageIndex) => {
    const page = pages[pageIndex];
    if (!page) return;
    const pageKey = `page${pageIndex + 1}`;
    
    const totalItems = page.categories
      ? page.categories.reduce((acc, cat) => acc + (cat.items?.length || 0), 0)
      : 0;

    let targetScale = 100;
    if (totalItems <= 6 && totalItems > 0) {
      targetScale = 112;
    } else if (totalItems === 7) {
      targetScale = 108;
    } else if (totalItems === 8) {
      targetScale = 104;
    } else if (totalItems <= 10) {
      targetScale = 102;
    } else {
      targetScale = 100;
    }

    updateSetting(pageKey, 'contentScale', targetScale);
    return targetScale;
  };

  const maximizeAllPagesTypography = () => {
    pages.forEach((_, idx) => {
      maximizePageTypography(idx);
    });
  };

  // Smart Typography & Geometry Unifier: Unifies all typography, category badges, prices, and footer across all pages
  const unifyAllTypography = () => {
    // 1. Remove individual typography & badge size overrides from each page
    setPageOverrides((prev) => {
      const copy = { ...prev };
      Object.keys(copy).forEach((pageKey) => {
        if (copy[pageKey]) {
          const {
            itemTitleSize,
            priceSize,
            descSize,
            catTitleSize,
            allergenSize,
            titleSize,
            subtitleSize,
            taglineSize,
            footerTextSize,
            pageNumberSize,
            categoryPillPaddingX,
            categoryPillPaddingY,
            categoryPillPaddingLeft,
            categoryPillPaddingRight,
            categoryPillRadius,
            categoryBadgeStyle,
            categoryPillNoWrap,
            categoryLetterSpacing,
            contentScale,
            ...rest
          } = copy[pageKey];
          copy[pageKey] = rest;
        }
      });
      return copy;
    });

    // 2. Set global settings to ideal luxury standard sizes
    setGlobalSettings((prev) => ({
      ...prev,
      catTitleSize: 16,
      itemTitleSize: 14.5,
      priceSize: 14,
      descSize: 10,
      allergenSize: 8.5,
      titleSize: 28,
      subtitleSize: 11.5,
      taglineSize: 13.5,
      footerTextSize: 10,
      pageNumberSize: 15,
      footerBottomOffset: 36,
      categoryPillPaddingX: 12,
      categoryPillPaddingY: 4,
      categoryPillRadius: 6,
      categoryPillNoWrap: true,
      categoryBadgeStyle: 'pill',
      categoryLetterSpacing: 0.12,
    }));
  };

  // Safe Margins Enforcer: Instantly shifts frame corners, content padding, and footers strictly inside the 8mm/10mm Safe Print Area
  const enforceSafePrintInsets = () => {
    setPageOverrides((prev) => {
      const copy = { ...prev };
      Object.keys(copy).forEach((pageKey) => {
        if (copy[pageKey]) {
          const {
            footerBottomOffset,
            borderInset,
            contentPaddingRight,
            contentPaddingLeft,
            ...rest
          } = copy[pageKey];
          copy[pageKey] = rest;
        }
      });
      return copy;
    });

    setGlobalSettings((prev) => ({
      ...prev,
      footerBottomOffset: 36,
      borderInset: 32,
      contentPaddingRight: 34,
      contentPaddingLeft: 32,
    }));
  };

  // Export / Import
  const exportBackup = () => {
    const dataStr = JSON.stringify(
      {
        pages,
        globalSettings,
        pageOverrides,
        coverPageData,
        showCoverPage,
      },
      null,
      2
    );
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alsafi_menu_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importBackup = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.pages) {
          // Filter out page0 if previously saved inside pages array
          const cleanPages = data.pages.filter((p) => p.id !== 'page0' && p.layout !== 'cover');
          setPages(cleanPages);
        }
        if (data.globalSettings) setGlobalSettings(data.globalSettings);
        if (data.pageOverrides) setPageOverrides(data.pageOverrides);
        if (data.coverPageData) setCoverPageData(data.coverPageData);
        if (data.showCoverPage !== undefined) setShowCoverPage(data.showCoverPage);
        alert('تم استرجاع النسخة الاحتياطية بنجاح!');
      } catch (error) {
        alert('حدث خطأ أثناء قراءة ملف النسخة الاحتياطية.');
      }
    };
    reader.readAsText(file);
  };

  const restoreFromCode = (payload) => {
    if (payload.gs) setGlobalSettings(payload.gs);
    if (payload.po) setPageOverrides(payload.po);
    if (payload.pg) {
      const cleanPages = payload.pg.filter((p) => p.id !== 'page0' && p.layout !== 'cover');
      setPages(cleanPages);
    }
    if (payload.coverPageData) setCoverPageData(payload.coverPageData);
    if (payload.showCoverPage !== undefined) setShowCoverPage(payload.showCoverPage);
  };

  return (
    <MenuContext.Provider
      value={{
        appMode,
        setAppMode,
        bifoldFlyerData,
        setBifoldFlyerData,
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
        pages,
        setPages,
        coverPageData,
        setCoverPageData,
        showCoverPage,
        setShowCoverPage,
        updateCoverPage,
        updateCoverHeader,
        updateCoverStory,
        updateCoverBrother,
        updateCoverGalleryCard,
        resetCoverPage,
        globalSettings,
        setGlobalSettings,
        pageOverrides,
        setPageOverrides,
        updatePage,
        updateHeader,
        updateCategory,
        updateItem,
        updateItemBadge,
        updatePageCallout,
        updatePageImage,
        updateImageTransform,
        resetImageTransform,
        addItem,
        deleteItem,
        moveItem,
        addFloatingShape,
        updateFloatingShape,
        deleteFloatingShape,
        previewZoom,
        setPreviewZoom,
        zoomInPreview,
        zoomOutPreview,
        resetPreviewZoom,
        showPrintGuides,
        setShowPrintGuides,
        togglePrintGuides,
        showLayoutGrid,
        setShowLayoutGrid,
        toggleLayoutGrid,
        isPlainPaperMode,
        setIsPlainPaperMode,
        togglePlainPaperMode,
        maximizePageTypography,
        maximizeAllPagesTypography,
        unifyAllTypography,
        enforceSafePrintInsets,
        updateSetting,
        resetScope,
        resetToOfficialPdfData,
        getEffectiveSettingsForPage,
        exportBackup,
        importBackup,
        restoreFromCode,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within a MenuProvider');
  return context;
};
