export const DEFAULT_FLYER_DATA = {
  id: 'flyer_alsafi',
  version: '2026_08_24_FLYER_V1',
  
  // ─── FACE A: FRONT SIDE (الوجه الأمامي الترويجي الجذاب) ─────────────────────────
  front: {
    badge: 'ORIENTALISCHE GASTRONOMIE SEIT 2018 · HEIDELBERG',
    title: 'ALSAFI RESTAURANT',
    subtitle: '✦ FEINSTE ORIENTALISCHE SPEZIALITÄTEN ✦',
    tagline: 'SCHAWARMA · HOLZKOHLEGRILL · MEZZE · WRAPS',
    
    // Typography Sizing
    badgeSize: 9.5,
    titleSize: 36,
    subtitleSize: 12,
    taglineSize: 9.5,
    logoSize: 72,

    // Hero Image
    heroImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1800&q=88',
    heroScale: 1.05,
    heroPosX: 50,
    heroPosY: 50,
    heroDarkness: 20,

    // Special Offer Highlight Badge
    showOfferBadge: true,
    offerBadgeTitle: '🔥 10% RABATT',
    offerBadgeSubtitle: 'BEI ABHOLUNG & BARZAHLUNG',

    // 3 Feature Highlight Badges
    features: [
      {
        icon: 'Flame',
        title: 'HOLZKOHLEGRILL',
        desc: 'Echtes Raucharoma & frische Spieße',
      },
      {
        icon: 'Crown',
        title: 'ORIGINAL SCHAWARMA',
        desc: 'Täglich frisch gesteckt nach Hausrezept',
      },
      {
        icon: 'Sparkles',
        title: '100% HAUSGEMACHT',
        desc: 'Knusprige Falafel & feine Mezze Dips',
      },
    ],

    // Quick Contact & QR for Front Side
    showQr: true,
    qrTitle: 'ONLINE SPEISEKARTE',
    qrUrl: 'https://alsafi-restaurant.de',
    phone: '06221 72 59 000',
    address: 'Hertzstraße 1, 69126 Heidelberg (Kaufland)',
  },

  // ─── FACE B: BACK SIDE (الوجه الخلفي - المنيو المصغر وأشهر الأطباق) ───────────
  back: {
    header: {
      badge: 'UNSERE BELIEBTESTEN SPEZIALITÄTEN',
      title: 'AUSZUG AUS UNSERER SPEISEKARTE',
      subtitle: '✦ TÄGLICH FRISCH ZUBEREITET · 100% HALAL ✦',
    },

    // Mini Menu Categories & Items
    categories: [
      {
        id: 'cat_schawarma',
        title: '👑 SCHAWARMA SPEZIALITÄTEN',
        items: [
          { nr: '60', name: 'Qas Arabi', desc: 'Gegrilltes Kalbfleisch mit Pommes, eingelegten Gurken & Toum im Fladenbrot', price: '8,90 €' },
          { nr: '61', name: 'Schawarma Arabi', desc: 'Hähnchen-Schawarma vom Drehspieß mit Pommes, Toum & Fladenbrot', price: '8,50 €' },
          { nr: '111', name: 'Schawarma Arabi Teller ★', desc: 'In Stücke geschnitten mit Pommes, Salat, Hummus & Toum', price: '13,90 €' },
          { nr: '50', name: 'Schawarma Box', desc: 'Hähnchen-Schawarma mit Hummus, Toum, wahlweise Pommes oder Salat', price: '8,90 €' },
        ],
      },
      {
        id: 'cat_grill',
        title: '🔥 VOM HOLZKOHLEGRILL',
        items: [
          { nr: '130', name: 'Kufta Teller', desc: 'Zwei Hackfleischspieße aus Kalb & Lamm mit Reis/Pommes, Salat & 4 Dips', price: '17,90 €' },
          { nr: '131', name: 'Nawar Teller 🌶️ ★', desc: 'Zwei pikante Hackfleischspieße mit Reis/Pommes, Salat & 4 Dips', price: '18,90 €' },
          { nr: '132', name: 'Tawuk Teller', desc: 'Zwei marinierte Hähnchenbrustspieße mit Reis/Pommes, Salat & 4 Dips', price: '18,90 €' },
          { nr: '135', name: 'Alsafi Mix Teller', desc: 'Kalbspieß, Tawuk, Kufta & Schawarma mit Reis/Pommes & 4 Dips', price: '24,90 €' },
        ],
      },
      {
        id: 'cat_veggie',
        title: '🌱 VEGETARISCH & MEZZE',
        items: [
          { nr: '31', name: 'Falafel, 3 Stück 🌱 ★', desc: 'Hausgemachte Falafeln mit Hummus & Sesampaste', price: '4,90 €' },
          { nr: '71', name: 'Falafel Wrap 🥬', desc: 'Falafeln mit Salat, Tomaten, Gurken, Rüben, Hummus & Soße', price: '7,90 €' },
          { nr: '10', name: 'Hummus 🌱', desc: 'Cremiges Kichererbsenpüree mit Sesampaste, Zitrone & Olivenöl', price: '5,90 €' },
          { nr: '40', name: 'Fattoush 🌱', desc: 'Gemischter Salat mit Sumach, Brotstückchen & Granatapfelsirup', price: '9,90 €' },
        ],
      },
    ],

    // Grand Combo Special Box
    specialCombo: {
      show: true,
      title: '👑 ALSAFI MIX PLATTE FÜR 2 PERSONEN',
      subtitle: 'Nr. 136 · Das ultimative Grillerlebnis',
      desc: 'Zwei gegrillte Kalbspieße, zwei Tawuk, zwei Kufta & Schawarma vom Drehspieß, serviert mit Reis und Pommes, wahlweise Fattoush oder Tabbouleh, dazu Hummus, Toum, Muhammara & Rote-Bete-Creme.',
      price: '49,90 €',
    },

    // Comprehensive Contact, QR & Info
    contact: {
      phone: '06221 72 59 000',
      whatsapp: '0176 12345678',
      address: 'Hertzstraße 1, 69126 Heidelberg (Im Kaufland)',
      hours: 'Mo-Sa: 11:00 - 22:00 Uhr | So & Feiertage: 12:00 - 22:00 Uhr',
      delivery: 'Lieferando · Uber Eats · Wolt',
      website: 'www.alsafi-restaurant.de',
    },

    // 3 QR Codes
    qrCodes: [
      { id: 'menu', title: 'SPEISEKARTE', subtitle: 'Online ansehen', url: 'https://alsafi-restaurant.de' },
      { id: 'google', title: 'GOOGLE MAPS', subtitle: 'Route & Bewertung', url: 'https://g.page/r/alsafi-heidelberg' },
      { id: 'whatsapp', title: 'WHATSAPP', subtitle: 'Direkt bestellen', url: 'https://wa.me/4962217259000' },
    ],
  },
};
