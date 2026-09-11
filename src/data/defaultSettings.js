import { DEFAULT_ALSAFI_BG } from './defaultBgImage';

export const DEFAULT_SETTINGS = {
  // Geometry, Arch & Dividing Line
  archWidth: 280,             // 120px to 420px (Width of the photo arch)
  archCurveDepth: 110,        // 0px (completely straight) to 200px (deep waist curve)
  archWaistY: 560,            // 200px to 900px (vertical height/position of curve center)
  archBottomOffset: 10,       // -100px to +100px (bottom spread / angle)
  archStyle: 'classic',       // 'classic' | 'subtle' | 'straight' | 'wave'
  archBorderWidth: 1.5,       // 0px to 6px
  archInnerBorderWidth: 3,    // 0px to 8px
  archBorderColor: '#8dc63f', // Brand Lime Green outer line
  archInnerColor: '#162a1c',  // Deep Forest Green inner line
  showArchBorder: true,       // Toggle dividing line
  logoImage: 'logo.jpg',
  logoSize: 36,
  page13LogoSize: 54, // Separate & independent logo size for Page 13 (Info & Legend)

  // Custom Page Background Image & Watermark (Alsafi Neon Sign Wall)
  bgStyle: 'solid-green',     // 'true-black' | 'solid-green' | 'gradient'
  bgPatternType: 'logoLetter',// 'stars' | 'cutlery' | 'diamonds' | 'dots' | 'logoLetter'
  bgPatternOpacity: 3,        // 0 to 100 (opacity of the background ornament pattern)
  bgPatternScale: 100,        // 50 to 300 (scale percentage of the pattern)
  bgPatternColor: '#8dc63f',  // default AlsaFi brand lime green for the pattern
  customBgImage: DEFAULT_ALSAFI_BG,
  bgOpacity: 45,              // 0% to 100%
  bgBlur: 0,                  // 0px to 20px
  bgDarkness: 15,             // 0% to 90%
  bgFit: 'cover',             // 'cover' | 'contain' | 'center'
  bgScale: 100,               // 20% to 300%
  bgPosX: 68,                 // 68% = perfectly centered in menu text column
  bgPosY: 50,                 // 50% = perfectly centered Y

  // QR Codes Configuration (Page 13 & Contact)
  showQrCodes: true,
  qrCodeSize: 68,
  qrCodes: [
    {
      id: 'website',
      title: 'WEBSITE & SPEISEKARTE',
      url: 'https://alsafi-restaurant.de',
      customImage: '',
      subtitle: 'Online Speisekarte',
    },
    {
      id: 'google',
      title: 'GOOGLE BEWERTUNG',
      url: 'https://g.page/r/alsafi-restaurant/review',
      customImage: '',
      subtitle: 'Bewerten Sie uns',
    },
    {
      id: 'whatsapp',
      title: 'WHATSAPP BESTELLUNG',
      url: 'https://wa.me/4962217259000',
      customImage: '',
      subtitle: 'Reservierung & Chat',
    },
  ],

  // Content Block Positioning (Nudge / Offset & Edge Margins)
  contentOffsetX: 0,
  contentOffsetY: 0,
  contentScale: 100,            // 50% to 120% — scale entire content block as one unit
  contentPaddingRight: 34,
  contentPaddingLeft: 32,
  printBleedScale: 100,       // 100% to 108% for full overscan bleed

  // Page 13 Legend & Allergens Section Positioning & Typography
  legendOffsetX: 0,
  legendOffsetY: 0,
  legendScale: 100,
  legendPaddingBottom: 4,
  legendTextSize: 9.5,        // Font size for Allergen & Additives list items (legible print size)
  legendTitleSize: 11,        // Font size for Legend box titles
  hinweiseNoticeSize: 8.5,    // Font size for standard preparation & spicy symbol notice
  hinweiseNoticeText: 'Die Symbole beziehen sich auf die Standardzubereitung. Gerichte mit 🌶️ sind pikant; 🌶️🌶️ kennzeichnet die extra scharfe Variante.',
  showHinweiseCard: true,     // Toggle for Hinweise & Symbole card
  showAllergenLegend: true,   // Toggle for Allergen & Additives tables

  // Page 13 Block Position & Card Border Controls (Whole Block & Card by Card)
  page13OffsetY: 0,
  page13OffsetX: 0,
  page13ContentScale: 100,
  page13CardGap: 8,
  page13BorderWidth: 1.5,
  page13BorderOpacity: 50,
  showPage13CardBorders: true,

  // Dish Allergens Display
  showDishAllergens: true,    // Toggle for dish-level allergen tags
  allergenSize: 8,            // 6px to 16px

  // Decorative Page Frame & Borders
  showBorder: true,
  borderTop: true,
  borderBottom: true,
  borderLeft: true,
  borderRight: true,
  borderCornerStyle: 'royal', // 'royal' | 'geometric' | 'none'
  borderInset: 32,             // 32px places frame & royal corners safely inside printable safe area
  borderWidth: 1.5,           // 0.5px to 4px
  borderOpacity: 85,          // 20% to 100%

  // Photo Blend & Transition
  photoBlend: 'smooth',       // 'smooth' | 'vignette' | 'sharp'
  photoFeather: 60,

  // Global Page & Photo Lighting (Print Brightness Optimization)
  pageBrightness: 100,        // 80% to 160% (whole page brightness)
  pageContrast: 100,          // 80% to 140% (whole page contrast)
  imageBrightness: 100,       // 80% to 180% (food photos brightness boost)
  imageContrast: 100,         // 80% to 140% (food photos contrast)
  coverHeroBrightness: 100,   // 80% to 180% (cover photo brightness)
  coverHeroVignette: 35,      // 0% to 100% (cover vignette shadow intensity)

  // Whitespace Optimization & Luxury Ornaments
  autoFitPageSpacing: true,   // Dynamically distributes item gaps based on page density
  bottomOrnamentStyle: 'none', // Default is none to maximize food space
  showCalloutCards: true,     // Shows Chef Recommendation callout cards on spare-space pages
  twoColumnImageHeight: 245,  // Enlarged height for two-column decorative images (80px - 450px)
  twoColumnImageWidth: 100,   // Width % for two-column decorative images (50% - 100%)
  twoColumnImageBorder: 3,    // Border width in px

  // Spacing
  itemGap: 8,
  categoryGap: 18,

  // Header Typography
  titleSize: 28,
  subtitleSize: 11.5,
  taglineSize: 13.5,
  dietaryBarSize: 8.5,

  // Category Typography
  catTitleSize: 16,
  catSubtitleSize: 11,

  // Dish / Item Typography
  itemTitleSize: 14,
  priceSize: 13.5,
  descSize: 10,
  allergenSize: 8,
  itemNumSize: 12,

  // Footer & Page Numbers (100% Unified Across All Pages)
  footerText: 'ALSAFI RESTAURANT · HEIDELBERG',
  footerTextSize: 10,
  footerTextLetterSpacing: 0.25,
  footerTextColor: 'muted',
  footerTextOffsetX: 0,
  footerTextOffsetY: 0,
  pageNumberSize: 15,
  pageNumberWeight: 'bold',
  pageNumberColor: 'gold',
  pageNumberOffsetX: 0,
  pageNumberOffsetY: 0,
  footerBottomOffset: 36,
  footerPaddingRight: 34,
  footerPaddingLeft: 34,
  footerDividerWidth: 1,
  footerDividerOpacity: 30,
  showFooterDivider: true,
  showFooterText: true,
  showPageNumber: true,
};
