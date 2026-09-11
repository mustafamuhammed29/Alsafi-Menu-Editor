import { INITIAL_PAGES } from './initialPages';

export const DEFAULT_BIFOLD_FLYER = {
  id: 'trifold_flyer_alsafi',
  version: '2026_08_25_TRIFOLD_BROCHURE_V1',
  title: 'Alsafi Tri-Fold Brochure (بروشور مطوي من 3 أجزاء / 6 صفحات)',
  fontSizeSettings: {
    categoryTitleSize: 12,
    itemNameSize: 10.5,
    itemDescSize: 8.5,
    priceSize: 10.5,
    badgeSize: 9,
    logoSize: 64,
  },
  
  // ─── PANEL 1: FRONT COVER (الغلاف الأمامي الرئيسي - الجزء الأيمن في الوجه الخارجي) ────
  panel1: {
    badge: 'ORIENTALISCHE GASTRONOMIE SEIT 2018 · HEIDELBERG',
    title: 'ALSAFI RESTAURANT',
    subtitle: '✦ SPEISEKARTE ZUM MITNEHMEN · سفري ✦',
    heroImage: '/dishes/dish2-kebab.jpg',
    heroScale: 1.05,
    heroPosX: 50,
    heroPosY: 50,
    heroDarkness: 25,
    offerBadge: {
      show: true,
      title: '🔥 10% RABATT',
      subtitle: 'BEI ABHOLUNG & BARZAHLUNG',
    },
    features: [
      { title: 'HOLZKOHLEGRILL', desc: 'Echtes Raucharoma' },
      { title: 'ORIGINAL SCHAWARMA', desc: 'Täglich frisch gesteckt' },
      { title: 'HAUSGEMACHTE MEZZE', desc: '100% vegetarisch & vegan' },
    ],
    phone: '06221 72 59 000',
    address: 'Hertzstraße 1, 69126 Heidelberg (Im Kaufland)',
    qrUrl: 'https://alsafi-restaurant.de',
  },

  // ─── PANEL 2: INSIDE FLAP (المطوية الداخلية - الجزء الأيسر في الوجه الخارجي) ─────────
  panel2: {
    title: 'FRÜHSTÜCK & MEZZE',
    subtitle: 'الأقسام 1 إلى 3 (الإفطار والمازة)',
    categories: [
      INITIAL_PAGES[0]?.categories[0], // 1. FRÜHSTÜCK
      INITIAL_PAGES[1]?.categories[0], // 2. MEZZE & DIPS
      INITIAL_PAGES[1]?.categories[1], // 3. VORSPEISEN MIT FLEISCH
    ].filter(Boolean),
    flapHighlight: {
      show: true,
      title: '✨ 100% HAUSGEMACHT & HALAL',
      desc: 'Alle Gerichte werden täglich frisch nach traditionellen Rezepten zubereitet.',
    },
  },

  // ─── PANEL 3: BACK COVER (الغلاف الخلفي للتواصل - الجزء الأوسط في الوجه الخارجي) ─────
  panel3: {
    title: 'KONTAKT & LIEFERUNG',
    subtitle: 'التواصل والخرائط والباركودات',
    contact: {
      phone: '06221 72 59 000',
      address: 'Hertzstraße 1, 69126 Heidelberg (Im Kaufland)',
      hours: 'Mo-Sa 11:00-22:00 | So & Feiertage 12:00-22:00',
      delivery: 'Lieferando · Uber Eats · Wolt',
      website: 'www.alsafi-restaurant.de',
      email: 'info@alsafi-heidelberg.de',
    },
    qrCodes: [
      { id: 'menu', title: 'SPEISEKARTE', subtitle: 'Online ansehen', url: 'https://alsafi-restaurant.de' },
      { id: 'google', title: 'GOOGLE MAPS', subtitle: 'Route & Bewertung', url: 'https://g.page/r/alsafi-heidelberg' },
      { id: 'whatsapp', title: 'WHATSAPP', subtitle: 'Direkt bestellen', url: 'https://wa.me/4962217259000' },
    ],
  },

  // ─── PANEL 4: INSIDE LEFT COLUMN (الجزء الأيسر في الوجه الداخلي) ──────────────────────
  panel4: {
    title: 'VEG. VORSPEISEN & SALATE & BOXEN',
    subtitle: 'الأقسام 4 إلى 6',
    categories: [
      INITIAL_PAGES[2]?.categories[0], // 4. VEGETARISCHE & VEGANE VORSPEISEN
      INITIAL_PAGES[3]?.categories[0], // 5. SALATE
      INITIAL_PAGES[4]?.categories[0], // 6. BOXEN
    ].filter(Boolean),
  },

  // ─── PANEL 5: INSIDE CENTER COLUMN (الجزء الأوسط في الوجه الداخلي) ────────────────────
  panel5: {
    title: 'WRAPS & BURGER & SPEZIALITÄTEN',
    subtitle: 'الأقسام 7 إلى 11',
    categories: [
      INITIAL_PAGES[5]?.categories[0],  // 7. WRAPS MIT FLEISCH
      INITIAL_PAGES[6]?.categories[0],  // 8. VEGETARISCHE WRAPS
      INITIAL_PAGES[7]?.categories[0],  // 9. BURGER
      INITIAL_PAGES[7]?.categories[1],  // 10. VEGETARISCHE HAUPTGERICHTE
      INITIAL_PAGES[8]?.categories[0],  // 11. ALSAFI SPEZIALITÄTEN
    ].filter(Boolean),
  },

  // ─── PANEL 6: INSIDE RIGHT COLUMN (الجزء الأيمن في الوجه الداخلي) ─────────────────────
  panel6: {
    title: 'GRILLGERICHTE & DESSERTS & GETRÄNKE',
    subtitle: 'الأقسام 12 إلى 17',
    categories: [
      INITIAL_PAGES[9]?.categories[0],  // 12. GRILLGERICHTE
      INITIAL_PAGES[9]?.categories[1],  // 13. KINDERGERICHTE
      INITIAL_PAGES[10]?.categories[0], // 14. BEILAGEN
      INITIAL_PAGES[10]?.categories[1], // 15. DESSERTS
      INITIAL_PAGES[11]?.categories[0], // 16. KALTE GETRÄNKE
      INITIAL_PAGES[11]?.categories[1], // 17. HEISSE GETRÄNKE
    ].filter(Boolean),
    comboHighlight: {
      show: true,
      title: '👑 ALSAFI MIX PLATTE FÜR 2 PERSONEN',
      desc: 'Zwei Kalbspieße, zwei Tawuk, zwei Kufta & Schawarma mit Reis, Pommes, Salat & 4 Dips.',
      price: '49,90 €',
    },
  },
};
