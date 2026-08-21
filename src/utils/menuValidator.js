/**
 * Menu Pre-Export Validation Utility
 * Validates all pages and dishes to ensure print and export readiness.
 * Blocks export if placeholder dishes (e.g. 'طبق جديد') or 0,00 € prices exist.
 */

export const validateMenuForExport = (pages) => {
  const errors = [];
  const placeholderPatterns = [
    'طبق جديد',
    'new dish',
    'neues gericht',
    'unbenannt',
    'untitled',
  ];

  pages.forEach((page, pIdx) => {
    const pageNum = page.pageNumber || `0${pIdx + 1}`.slice(-2);
    const pageTitle = (page.header?.title || `Page ${pageNum}`).split('\n')[0];

    if (page.categories && Array.isArray(page.categories)) {
      page.categories.forEach((cat) => {
        const catTitle = cat.title || 'Unbenannte Kategorie';

        if (cat.items && Array.isArray(cat.items)) {
          cat.items.forEach((item, iIdx) => {
            const rawName = (item.name || '').trim();
            const cleanName = rawName.replace(/ [🌱🥬🌶️⭐👑🔥✨🥩]+/g, '').trim();
            const lowerName = cleanName.toLowerCase();
            const price = (item.price || '').trim();

            // Check 1: Empty or placeholder dish name
            if (!cleanName) {
              errors.push({
                pageNumber: pageNum,
                pageTitle,
                categoryTitle: catTitle,
                itemNum: item.num || `#${iIdx + 1}`,
                dishName: '(اسم فارغ)',
                reason: 'اسم الطبق فارغ ويجب إدخال اسم حقيقي قبل التصدير.',
              });
            } else if (placeholderPatterns.some((pattern) => lowerName === pattern || lowerName.includes(pattern))) {
              errors.push({
                pageNumber: pageNum,
                pageTitle,
                categoryTitle: catTitle,
                itemNum: item.num || `#${iIdx + 1}`,
                dishName: cleanName,
                reason: 'الطبق يحتوي على اسم افتراضي تجريبي ("طبق جديد") لم يكتمل تحريره.',
              });
            }

            // Check 2: Zero or empty price
            if (!price || price === '0,00 €' || price === '0 €' || price === '0,00' || price === '0.00' || price === '0') {
              errors.push({
                pageNumber: pageNum,
                pageTitle,
                categoryTitle: catTitle,
                itemNum: item.num || `#${iIdx + 1}`,
                dishName: cleanName || '(بدون اسم)',
                reason: `السعر مسجل بـ "${price || 'فارغ'}" ويجب تحديد السعر الفعلي.`,
              });
            }
          });
        }
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};
