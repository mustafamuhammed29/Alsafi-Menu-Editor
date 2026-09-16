export const DEFAULT_COVER_PAGE = {
  "id": "page0",
  "pageNumber": "00",
  "layout": "cover",
  "isCover": true,
  "coverStyle": "luxury-story",
  "header": {
    "badge": "ORIENTALISCHE GASTRONOMIE SEIT 2024 · HEIDELBERG",
    "title": "HERZLICH WILLKOMMEN",
    "subtitle": "✦ EINE KULINARISCHE REISE DES ORIENTS ✦",
    "tagline": "SCHAWARMA  · MEZZE · WRAPS"
  },
  "story": {
    "arabicTitle": "قصة مطعم الصافي",
    "germanTitle": "UNSERE GESCHICHTE",
    "text": "Bei Alsafi schlägt das Herz der orientalischen Kochkunst mitten in Heidelberg. Gegründet aus purer Leidenschaft für authentische Aromen, bringen wir die Wärme und Gastfreundschaft des Orients auf Ihren Teller. Jedes Gericht wird nach traditioneller Familienart mit erlesenen Gewürzen, feinstem Fleisch und viel Liebe zubereitet. Für uns ist Essen nicht nur Nahrung – es ist eine Einladung, gemeinsam Momente des Glücks zu teilen.",
    "quote": "„Gekocht wie für die eigene Familie – mit Herz, Ehre und Leidenschaft.“",
    "signature": "~ Familie Alsafi & Team ~"
  },
  "galleryCards": [
    {
      "id": "g1",
      "title": "🔥 HOLZKOHLEGRILL",
      "subtitle": "Saftig & rauchig mariniert",
      "imageUrl": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      "scale": 1.1,
      "posX": 50,
      "posY": 50
    },
    {
      "id": "g2",
      "title": "👑 ORIGINAL SCHAWARMA",
      "subtitle": "Frisch vom Spieß nach Hausrezept",
      "imageUrl": "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=800&q=80",
      "scale": 1.15,
      "posX": 50,
      "posY": 50
    },
    {
      "id": "g3",
      "title": "🌱 HAUSGEMACHTE MEZZE",
      "subtitle": "Täglich frisch mit bestem Olivenöl",
      "imageUrl": "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80",
      "scale": 1.1,
      "posX": 50,
      "posY": 50
    }
  ],
  "coverBottomHeroImage": "/dishes/menu/cover_bottom_hero.jpg",
  "coverBottomHeroScale": 1,
  "coverBottomHeroPosX": 50,
  "coverBottomHeroPosY": 50,
  "coverBottomHeroHeight": 220,
  "storyPadding": 12,
  "storyTextSize": 9.8,
  "storyQuoteSize": 9.5,
  "storyTitleSize": 10.5,
  "showGalleryCards": true,
  "galleryCardsHeight": 110,
  "pillars": [
    {
      "title": "100% Halal",
      "desc": "Zertifiziert & rein"
    },
    {
      "title": "Holzkohlegrill",
      "desc": "Echtes Raucharoma"
    },
    {
      "title": "Täglich frisch",
      "desc": "Hausgemachte Dips"
    },
    {
      "title": "Gastfreundschaft",
      "desc": "Ahlan Wa Sahlan"
    }
  ],
  "categories": [],
  "coverHeroImage": "/dishes/menu/cover_hero.jpg",
  "coverHeroScale": 1,
  "coverHeroDarkness": 0,
  "coverHeroPosX": 50,
  "coverHeroPosY": 50,
  "coverBadgeSize": 12,
  "coverTitleSize": 35,
  "coverSubtitleSize": 14.5,
  "coverTaglineSize": 12.5,
  "coverLogoSize": 108,
  "coverFooterTitleSize": 10.5,
  "coverFooterValueSize": 9.5,
  "coverHeroFit": "cover",
  "coverHeroVignette": 100
};

export const INITIAL_PAGES = [
  {
    "id": "page1",
    "pageNumber": "01",
    "layout": "menu",
    "images": [
      {
        "url": "/dishes/menu/page1_img0.jpg",
        "scale": 1.26,
        "posX": 0,
        "posY": 69,
        "flipX": false,
        "flipY": false
      },
      {
        "url": "/dishes/menu/page1_img1.jpg",
        "scale": 1.02,
        "posX": 0,
        "posY": 28.8,
        "flipX": false,
        "flipY": false
      }
    ],
    "header": {
      "subtitle": "01 · FRÜHSTÜCK",
      "title": "Morgens bei Alsafi",
      "tagline": "frisch · halal · hausgemacht",
      "showDietaryBar": true
    },
    "categories": [
      {
        "id": "c1",
        "code": "1",
        "title": "FRÜHSTÜCK",
        "subtitle": "„Frühstück wie bei Familie – nur ohne Abwasch.“",
        "items": [
          {
            "num": "1",
            "name": "Shakshuka 🥬",
            "badge": "★ BELIEBT",
            "allergens": "Allergene: C, I",
            "desc": "Rührei in aromatischer Tomatensoße mit Zwiebeln, Paprika, Knoblauch und frischer Petersilie.",
            "price": "10,90 €"
          },
          {
            "num": "2",
            "name": "Makhlama",
            "allergens": "Allergene: C, I",
            "desc": "Rührei mit gebratenem Kalb- und Lammhackfleisch, Zwiebeln, Tomaten, Paprika und frischer Petersilie.",
            "price": "10,90 €"
          },
          {
            "num": "3",
            "name": "Omelette 🥬",
            "allergens": "Allergene: C, G",
            "desc": "Omelette mit Champignons und Gouda.",
            "price": "8,90 €"
          },
          {
            "num": "4",
            "name": "Ful bil Laben 🥬",
            "allergens": "Allergene: G, K",
            "desc": "Gekochte Bohnen mit Joghurt, Knoblauch und Sesampaste, verfeinert mit Olivenöl, Zitrone, Tomaten und frischer Petersilie.",
            "price": "10,90 €"
          },
          {
            "num": "5",
            "name": "Ful-Bowl 🌱",
            "allergens": "Allergene: I, K",
            "desc": "Gekochte Bohnen mit Tomaten, Paprika, Zwiebeln, Knoblauch und Sesampaste, verfeinert mit Olivenöl und frischer Petersilie.",
            "price": "10,90 €"
          },
          {
            "num": "6",
            "name": "Alsafi Frühstücksplatte 🥬",
            "allergens": "Allergene: A, G, I, K",
            "desc": "Falafeln, gegrillter Halloumi, Fetakäse, Rakak bil Jibin, Hummus, Rote-Bete-Creme, arabischer Frischkäse, Tomaten, Gurken, Oliven und frische Minze.",
            "price": "14,90 €"
          }
        ]
      }
    ],
    "bottomCallout": {
      "show": true,
      "badge": "✨ ALSAFI FRÜHSTÜCKS-TIPP",
      "text": "Zu jedem Frühstück servieren wir ofenfrisches arabisches Fladenbrot, hausgemachte Dips und frische Minze.",
      "icon": "🍳"
    },
    "floatingShapes": [
      {
        "id": "shape_1787821517331_21pt",
        "shapeType": "alsafi",
        "posX": 83.1,
        "posY": 84.9,
        "size": 220,
        "rotation": 0,
        "borderWidth": 2,
        "borderColor": "#c9aa58",
        "showGlow": true,
        "icon": "⚜️",
        "badgeText": "Omelette",
        "subText": "RESTAURANT",
        "contentType": "image",
        "imageScale": 1.75,
        "image": "/dishes/menu/shape_p1_s0.jpg"
      },
      {
        "id": "shape_1787821862315_038a",
        "shapeType": "circle",
        "posX": 48,
        "posY": 85.3,
        "size": 220,
        "rotation": 0,
        "borderWidth": 2,
        "borderColor": "#c9aa58",
        "showGlow": true,
        "icon": "⭕",
        "badgeText": "Alsafi Frühstücksplatte",
        "subText": "Gourmet Selection",
        "contentType": "image",
        "imageScale": 1.3,
        "imageFit": "contain",
        "image": "/dishes/menu/shape_p1_s1.jpg"
      }
    ]
  },
  {
    "id": "page2",
    "pageNumber": "02",
    "layout": "menu",
    "images": [
      {
        "url": "/dishes/menu/page2_img0.jpg",
        "scale": 1.24,
        "posX": 0,
        "posY": 50.5,
        "flipX": false,
        "flipY": false
      },
      {
        "url": "/dishes/menu/page2_img1.jpg",
        "scale": 1.08,
        "posX": 0,
        "posY": 24.1,
        "flipX": false,
        "flipY": false
      }
    ],
    "header": {
      "subtitle": "02 · MEZZE & VORSPEISEN",
      "title": "Teilen macht glücklich",
      "tagline": "frisch · aromatisch · orientalisch",
      "showDietaryBar": true
    },
    "categories": [
      {
        "id": "c2",
        "code": "2",
        "title": "MEZZE & DIPS",
        "subtitle": "„In die Mitte, alle ran – Habibi, Teilen gehört zum Plan.“",
        "items": [
          {
            "num": "10",
            "name": "Hummus 🌱",
            "allergens": "Allergene: K",
            "desc": "Cremiges Kichererbsenpüree mit Sesampaste, Zitronensaft, Knoblauch und Olivenöl.",
            "price": "5,90 €"
          },
          {
            "num": "11",
            "name": "Baba Ghanoush 🌱",
            "allergens": "Allergene: K",
            "desc": "Cremiges Püree aus gegrillter Aubergine mit Sesampaste, Knoblauch und Olivenöl.",
            "price": "6,90 €"
          },
          {
            "num": "12",
            "name": "Muhammara🌶️ 🌱",
            "allergens": "Allergene: A, H, K",
            "desc": "Würzige Paprika-Creme mit Zwiebeln, Sesam und Olivenöl, garniert mit Walnüssen.",
            "price": "5,90 €"
          },
          {
            "num": "13",
            "name": "Rote-Bete-Creme 🌱",
            "allergens": "Allergene: K",
            "desc": "Cremige Rote Bete mit Sesampaste und Olivenöl, verfeinert mit Kürbis- und Sonnenblumenkernen.",
            "price": "5,90 €"
          },
          {
            "num": "14",
            "name": "Toum – Knoblauchpaste 🥬",
            "allergens": "Allergene: C",
            "desc": "Hausgemachte, cremige Knoblauchpaste nach Alsafi-Art.",
            "price": "3,50 €",
            "badge": ""
          },
          {
            "num": "15",
            "name": "Hummus bil Lahm",
            "badge": "★ BELIEBT",
            "allergens": "Allergene: H, K",
            "desc": "Cremiger Hummus mit gegrilltem Kalbfleisch, Olivenöl und gerösteten Nüssen.",
            "price": "12,90 €"
          },
          {
            "num": "16",
            "name": "Alsafi Mezze Teller 🥬",
            "allergens": "Allergene: A, C, K, L",
            "desc": "Hummus, Toum, Baba Ghanoush, Muhammara und Rote-Bete-Creme, dazu cremiger Weißkohlsalat, eingelegte Gurken und weiße Rüben.",
            "price": "14,90 €"
          }
        ]
      },
      {
        "id": "c3",
        "code": "3",
        "title": "VORSPEISEN MIT FLEISCH",
        "subtitle": "„Orientalische Klassiker zum Genießen und Teilen.“",
        "items": [
          {
            "num": "20",
            "name": "Kufta bil Khuboz",
            "badge": "★ BELIEBT",
            "allergens": "Allergene: A, K",
            "desc": "Würziges Kalb- und Lammhackfleisch mit Zwiebeln, Petersilie und Sumach im arabischen Fladenbrot, knusprig gebacken und mit Hummus serviert.",
            "price": "8,90 €"
          },
          {
            "num": "21",
            "name": "Kubbe, 2 Stück",
            "allergens": "Allergene: A, H, K, L",
            "desc": "Knusprig frittierte Bulgur-Teigtaschen mit würziger Fleischfüllung, Nüssen und Berberitzen, dazu Sesampaste.",
            "price": "8,90 €"
          },
          {
            "num": "22",
            "name": "Sambusa bil Lahm, 3 Stück",
            "allergens": "Allergene: A, H, K, L",
            "desc": "Knusprig frittierte Teigröllchen mit würziger Fleischfüllung, Nüssen und Berberitzen, dazu Sesampaste.",
            "price": "6,90 €"
          }
        ]
      }
    ]
  },
  {
    "id": "page3",
    "pageNumber": "03",
    "layout": "menu",
    "images": [
      {
        "url": "/dishes/menu/page3_img0.jpg",
        "scale": 1.24,
        "posX": 10.8,
        "posY": 52.8,
        "flipX": false,
        "flipY": false
      },
      {
        "url": "/dishes/menu/page3_img1.jpg",
        "scale": 1.18,
        "posX": 12.6,
        "posY": 30.4,
        "flipX": true,
        "flipY": false
      }
    ],
    "header": {
      "subtitle": "03 · VEGGIE VORSPEISEN",
      "title": "Vegetarisch & Vegan",
      "tagline": "knusprig · leicht · Alsafi Style",
      "showDietaryBar": true
    },
    "categories": [
      {
        "id": "c4",
        "code": "4",
        "title": "VEGETARISCHE & VEGANE VORSPEISEN",
        "subtitle": "„Ganz ohne Fleisch. Voller Geschmack.“",
        "items": [
          {
            "num": "30",
            "name": "Adas – Linsensuppe 🌱",
            "allergens": "Allergene: A, I",
            "desc": "Hausgemachte Linsensuppe nach Mamas Art, serviert mit knusprigen Brotstückchen.",
            "price": "6,90 €"
          },
          {
            "num": "31",
            "name": "Falafel, 3 Stück 🌱",
            "badge": "★ BELIEBT",
            "allergens": "Allergene: I, K",
            "desc": "Hausgemachte Falafeln aus Kichererbsen, frischen Kräutern und Gewürzen, dazu Hummus und Sesampaste.",
            "price": "4,90 €"
          },
          {
            "num": "32",
            "name": "Batata Harra 🌱🌶️",
            "allergens": "Allergene: L",
            "desc": "Knusprige Kartoffelwürfel, würzig mariniert und mit frischem Koriander verfeinert.",
            "price": "6,90 €"
          },
          {
            "num": "33",
            "name": "Warak Inab, 5 Stück 🌱",
            "allergens": "Allergene: keine",
            "desc": "Weinblätter mit einer aromatischen Füllung aus Reis, Petersilie und Minze.",
            "price": "6,90 €"
          },
          {
            "num": "34",
            "name": "Halloumi bil Khuboz 🥬",
            "allergens": "Allergene: A, G, K",
            "desc": "Halloumi mit cremigem Frischkäse und Minze im arabischen Fladenbrot, knusprig gebacken und mit Hummus serviert.",
            "price": "6,90 €"
          },
          {
            "num": "35",
            "name": "Vegane Rakak, 3 Stück 🌱",
            "allergens": "Allergene: A, K, L",
            "desc": "Knusprig frittierte Teigröllchen mit Kartoffel-Gemüse-Füllung, dazu Sesampaste.",
            "price": "6,90 €"
          },
          {
            "num": "36",
            "name": "Rakak bil Jibin, 3 Stück 🥬",
            "allergens": "Allergene: A, G, K",
            "desc": "Knusprig frittierte Teigröllchen mit Edamer, Fetakäse, Mozzarella und Petersilie.",
            "price": "6,90 €"
          },
          {
            "num": "37",
            "name": "Hausgemachte Batata Chips 🌱",
            "allergens": "Allergene: keine",
            "desc": "Fein geschnittene Kartoffelchips, hausgemacht und knusprig frittiert, mit Gewürzen und Zitrone verfeinert.",
            "price": "5,90 €"
          }
        ]
      }
    ],
    "floatingShapes": [
      {
        "id": "shape_1787827237496_c6za",
        "shapeType": "circle",
        "posX": 47.8,
        "posY": 85.8,
        "size": 215,
        "rotation": 0,
        "borderWidth": 2,
        "borderColor": "#c9aa58",
        "showGlow": true,
        "icon": "⭕",
        "badgeText": "Warak Inab",
        "subText": "Gourmet Selection",
        "contentType": "image",
        "image": "/dishes/menu/shape_p3_s0.jpg"
      },
      {
        "id": "shape_1787827237941_pg2w",
        "shapeType": "circle",
        "posX": 81.5,
        "posY": 85.9,
        "size": 215,
        "rotation": 0,
        "borderWidth": 2,
        "borderColor": "#c9aa58",
        "showGlow": true,
        "icon": "⭕",
        "badgeText": "Falafel",
        "subText": "Gourmet Selection",
        "contentType": "image",
        "imageScale": 1,
        "image": "/dishes/menu/shape_p3_s1.jpg"
      }
    ]
  },
  {
    "id": "page4",
    "pageNumber": "04",
    "layout": "menu",
    "images": [
      {
        "url": "/dishes/menu/page4_img0.jpg",
        "scale": 0.96,
        "posX": 0,
        "posY": 62,
        "flipX": true,
        "flipY": false
      },
      {
        "url": "/dishes/menu/page4_img1.jpg",
        "scale": 1.12,
        "posX": 0,
        "posY": 28.6,
        "flipX": false,
        "flipY": false
      }
    ],
    "header": {
      "subtitle": "04 · SALATE",
      "title": "Frische Salate",
      "tagline": "knackig · bunt · gesund",
      "showDietaryBar": true
    },
    "categories": [
      {
        "id": "c5",
        "code": "5",
        "title": "SALATE",
        "subtitle": "„Frisch, bunt und mit Liebe gemacht.“",
        "items": [
          {
            "num": "40",
            "name": "Fattoush 🌱",
            "allergens": "Allergene: A, I, L",
            "desc": "Gemischter Salat mit Tomaten, Gurken, Paprika, Radieschen, Lauchzwiebeln, Minze und Petersilie, verfeinert mit Sumach, knusprigen Brotstückchen, Zitronensaft, Granatapfelsirup und Olivenöl.",
            "price": "9,90 €"
          },
          {
            "num": "41",
            "name": "Tabbouleh 🌱",
            "allergens": "Allergene: A, I",
            "desc": "Fein gehackte Petersilie mit Bulgur, Tomaten, Zwiebeln und Minze, verfeinert mit Zitronensaft und Olivenöl.",
            "price": "9,90 €"
          },
          {
            "num": "42",
            "name": "Falafel Salat 🥬",
            "allergens": "Allergene: G, I, K, L",
            "desc": "Gemischter Salat mit hausgemachten Falafeln, Tomaten, eingelegten Gurken, Radieschen, weißen Rüben und Kräutern, dazu Joghurt-Sesam-Dressing.",
            "price": "10,90 €"
          },
          {
            "num": "43",
            "name": "Halloumi Salat 🥬",
            "allergens": "Allergene: G, I, L",
            "desc": "Gemischter Salat mit gegrilltem Halloumi, Rotkraut, Tomaten, eingelegten Gurken, Paprika, Radieschen und weißen Rüben, dazu Joghurtdressing.",
            "price": "10,90 €"
          },
          {
            "num": "44",
            "name": "Maqali Salat 🥬",
            "allergens": "Allergene: G, I, L",
            "desc": "Gemischter Salat mit gegrillter Aubergine und Zucchini, frittiertem Blumenkohl, Rotkraut, Tomaten, eingelegten Gurken, Radieschen und weißen Rüben, dazu Joghurtdressing.",
            "price": "10,90 €"
          },
          {
            "num": "45",
            "name": "Alsafi Salat",
            "badge": "★ BELIEBT",
            "allergens": "Allergene: G, I, L",
            "desc": "Gemischter Salat mit gegrilltem Kalbfleisch, Tomaten, eingelegten Gurken, Paprika, Zwiebeln und Mais, dazu Joghurtdressing.",
            "price": "13,90 €"
          },
          {
            "num": "46",
            "name": "Dejaj Salat",
            "allergens": "Allergene: G, I, L",
            "desc": "Gemischter Salat mit gegrillter Hähnchenbrust, Tomaten, eingelegten Gurken, Paprika, Zwiebeln und Mais, dazu Joghurtdressing.",
            "price": "12,90 €"
          },
          {
            "num": "47",
            "name": "Gemischter Salat 🥬",
            "allergens": "Allergene: G, I, L",
            "desc": "Knackiger gemischter Salat mit Tomaten, Paprika, Radieschen, Zwiebeln und hausgemachtem Dressing.",
            "price": "7,90 €"
          }
        ]
      }
    ],
    "floatingShapes": [
      {
        "id": "shape_1787834353827_694t",
        "shapeType": "circle",
        "posX": 89.8,
        "posY": 90.3,
        "size": 110,
        "rotation": 0,
        "borderWidth": 2,
        "borderColor": "#c9aa58",
        "showGlow": true,
        "icon": "⭕",
        "badgeText": "Tabbouleh",
        "subText": "Gourmet Selection",
        "contentType": "image",
        "image": "/dishes/menu/shape_p4_s0.jpg"
      },
      {
        "id": "shape_1787834405681_srq8",
        "shapeType": "circle",
        "posX": 42.7,
        "posY": 90.4,
        "size": 110,
        "rotation": 0,
        "borderWidth": 2,
        "borderColor": "#c9aa58",
        "showGlow": true,
        "icon": "⭕",
        "badgeText": "Falafel Salat",
        "subText": "Gourmet Selection",
        "contentType": "image",
        "image": "/dishes/menu/shape_p4_s1.jpg"
      },
      {
        "id": "shape_1787834463394_vftz",
        "shapeType": "circle",
        "posX": 65.7,
        "posY": 90.3,
        "size": 110,
        "rotation": 0,
        "borderWidth": 2,
        "borderColor": "#c9aa58",
        "showGlow": true,
        "icon": "⭕",
        "badgeText": "Maqali Salat",
        "subText": "Gourmet Selection",
        "contentType": "image",
        "image": "/dishes/menu/shape_p4_s2.jpg"
      }
    ]
  },
  {
    "id": "page5",
    "pageNumber": "05",
    "layout": "menu",
    "images": [
      {
        "url": "/dishes/menu/page5_img0.jpg",
        "scale": 0.9,
        "posX": 0,
        "posY": 60.5,
        "flipX": true,
        "flipY": false
      },
      {
        "url": "/dishes/menu/page5_img1.jpg",
        "scale": 1.34,
        "posX": 0,
        "posY": 37.3,
        "flipX": true,
        "flipY": false,
        "brightness": 100,
        "contrast": 100
      }
    ],
    "header": {
      "subtitle": "05 · BOXEN",
      "title": "Boxen zum Genießen",
      "tagline": "praktisch · lecker · beliebt",
      "showDietaryBar": true
    },
    "categories": [
      {
        "id": "c6",
        "code": "6",
        "title": "BOXEN",
        "subtitle": "„Alles drin, was glücklich macht.“",
        "items": [
          {
            "num": "50",
            "name": "Schawarma Box",
            "allergens": "Allergene: A, C, G, K, L",
            "desc": "Hähnchen-Schawarma vom Drehspieß mit Tomaten, Zwiebeln, eingelegten Gurken, Hummus, Toum und hausgemachter Soße, wahlweise mit Pommes oder gemischtem Salat.",
            "price": "8,90 €"
          },
          {
            "num": "51",
            "name": "Qas Box",
            "allergens": "Allergene: A, C, G, K, L",
            "desc": "Gegrilltes Kalbfleisch mit Tomaten, Zwiebeln, eingelegten Gurken, Hummus, Toum und hausgemachter Soße, wahlweise mit Pommes oder gemischtem Salat.",
            "price": "9,50 €"
          },
          {
            "num": "52",
            "name": "Falafel Box 🥬",
            "allergens": "Allergene: A, C, G, I, K, L",
            "desc": "Hausgemachte Falafeln mit Tomaten, eingelegten Gurken, weißen Rüben, Hummus und hausgemachter Soße, wahlweise mit Pommes oder gemischtem Salat.",
            "price": "8,50 €"
          },
          {
            "num": "53",
            "name": "Maqali Box 🥬🌶️",
            "allergens": "Allergene: A, C, G, K, L",
            "desc": "Gegrillte Aubergine und Zucchini, frittierter Blumenkohl und Batata Harra mit Tomaten, Zwiebeln, eingelegten Gurken, weißen Rüben, Hummus, Toum und hausgemachter Soße, wahlweise mit Pommes oder gemischtem Salat.",
            "price": "8,90 €"
          },
          {
            "num": "54",
            "name": "Falumi Box 🥬",
            "allergens": "Allergene: A, C, G, I, K, L",
            "desc": "Hausgemachte Falafeln und gegrillter Halloumi mit Tomaten, eingelegten Gurken, weißen Rüben, Hummus und hausgemachter Soße, wahlweise mit Pommes oder gemischtem Salat.",
            "price": "9,50 €"
          },
          {
            "num": "55",
            "name": "Yamir Box",
            "badge": "★ BELIEBT",
            "allergens": "Allergene: A, C, G, K, L",
            "desc": "Klein geschnittene, knusprig panierte Hähnchenbruststreifen mit cremigem Weißkohlsalat, Tomaten, eingelegten Gurken, Toum und hausgemachter Soße, wahlweise mit Pommes oder gemischtem Salat.",
            "price": "9,50 €"
          }
        ]
      }
    ],
    "bottomCallout": {
      "show": true,
      "badge": "🍟 BEILAGE NACH WAHL",
      "text": "Alle Boxen werden wahlweise mit knusprigen Pommes oder frischem gemischten Salat zubereitet.",
      "icon": "🎁"
    },
    "floatingShapes": [
      {
        "id": "shape_1787830537503_zlyv",
        "shapeType": "circle",
        "posX": 81.5,
        "posY": 81.3,
        "size": 220,
        "rotation": 0,
        "borderWidth": 2,
        "borderColor": "#c9aa58",
        "showGlow": true,
        "icon": "👑",
        "badgeText": "Falafel Box",
        "subText": "Premium Quality",
        "contentType": "image",
        "image": "/dishes/menu/shape_p5_s0.jpg",
        "imageScale": 0.85
      },
      {
        "id": "shape_1787830552763_1b55",
        "shapeType": "circle",
        "posX": 49.2,
        "posY": 81.6,
        "size": 220,
        "rotation": 0,
        "borderWidth": 2,
        "borderColor": "#c9aa58",
        "showGlow": true,
        "icon": "🔥",
        "badgeText": "Qas Box",
        "subText": "Premium Quality",
        "contentType": "image",
        "image": "/dishes/menu/shape_p5_s1.jpg",
        "imageScale": 0.85
      }
    ]
  },
  {
    "id": "page6",
    "pageNumber": "06",
    "layout": "menu",
    "images": [
      {
        "url": "/dishes/menu/page6_img0.jpg",
        "scale": 1.1,
        "posX": 29.5,
        "posY": 63.3,
        "flipX": true,
        "flipY": false
      },
      {
        "url": "/dishes/menu/page6_img1.jpg",
        "scale": 0.96,
        "posX": 0,
        "posY": 33.3,
        "flipX": false,
        "flipY": false
      }
    ],
    "header": {
      "subtitle": "06 · WRAPS MIT FLEISCH",
      "title": "Wraps & Sandwiches",
      "tagline": "gerollt · würzig · hausgemacht",
      "showDietaryBar": true
    },
    "categories": [
      {
        "id": "c7_1",
        "code": "7",
        "title": "WRAPS MIT FLEISCH",
        "subtitle": "„Frisch gerollt. Mit Liebe gefüllt.“",
        "items": [
          {
            "num": "60",
            "name": "Qas Arabi",
            "allergens": "Allergene: A, C",
            "desc": "Gegrilltes Kalbfleisch mit Pommes, eingelegten Gurken und Toum im arabischen Fladenbrot, knusprig gegrillt und mit Granatapfelsirup verfeinert.",
            "price": "8,90 €"
          },
          {
            "num": "61",
            "name": "Schawarma Arabi",
            "allergens": "Allergene: A, C",
            "desc": "Hähnchen-Schawarma vom Drehspieß mit Pommes, eingelegten Gurken und Toum im arabischen Fladenbrot, knusprig gegrillt und mit Granatapfelsirup verfeinert.",
            "price": "8,50 €"
          },
          {
            "num": "62",
            "name": "Qas Wrap",
            "allergens": "Allergene: A, C, G, K, L",
            "desc": "Gegrilltes Kalbfleisch mit Salat, Tomaten, Zwiebeln und eingelegten Gurken, dazu Hummus, Toum und hausgemachte Soße im Wrap.",
            "price": "8,90 €"
          },
          {
            "num": "63",
            "name": "Schawarma Wrap",
            "allergens": "Allergene: A, C, G, K, L",
            "desc": "Hähnchen-Schawarma vom Drehspieß mit Salat, Tomaten, Zwiebeln und eingelegten Gurken, dazu Hummus, Toum und hausgemachte Soße im Wrap.",
            "price": "8,50 €"
          },
          {
            "num": "64",
            "name": "Nawar Wrap 🌶️",
            "allergens": "Allergene: A, C, G, K, L",
            "desc": "Würziges Kalb- und Lammhackfleisch mit Salat, Tomaten, Zwiebeln und eingelegten Gurken, dazu Toum, scharfe Soße und hausgemachte Soße im Wrap.",
            "price": "8,90 €"
          },
          {
            "num": "65",
            "name": "Kufta Wrap",
            "allergens": "Allergene: A, C, G, K, L",
            "desc": "Gegrillter Hackfleischspieß aus Kalb und Lamm mit Salat, Tomaten, Zwiebeln und eingelegten Gurken, dazu Hummus, Toum und hausgemachte Soße im Wrap.",
            "price": "8,90 €"
          },
          {
            "num": "66",
            "name": "Tawuk Wrap",
            "allergens": "Allergene: A, C, G, K, L",
            "desc": "Marinierter und gegrillter Hähnchenbrustspieß mit Salat, Tomaten, Zwiebeln und eingelegten Gurken, dazu Hummus, Toum und hausgemachte Soße im Wrap.",
            "price": "8,90 €"
          },
          {
            "num": "67",
            "name": "Lahem Wrap",
            "allergens": "Allergene: A, C, G, K, L",
            "desc": "Gegrillter Kalbspieß mit Salat, Tomaten, Zwiebeln und eingelegten Gurken, dazu Hummus, Toum und hausgemachte Soße im Wrap.",
            "price": "8,90 €"
          },
          {
            "num": "68",
            "name": "Mehdi Crispy",
            "badge": "★ BELIEBT",
            "allergens": "Allergene: A, C, G, K, L",
            "desc": "Knusprig panierte Hähnchenbruststreifen mit Salat, cremigem Weißkohlsalat und eingelegten Gurken, dazu Toum und hausgemachte Soße im Baguette.",
            "price": "8,90 €"
          },
          {
            "num": "69",
            "name": "Nawfal XXL Wrap 🌶️",
            "allergens": "Allergene: A, C, G, K, L",
            "desc": "Extra großer Wrap mit zwei pikant gewürzten Hackfleischspießen aus Kalb und Lamm, gegrillter Aubergine, Batata Harra, Tomaten, Zwiebeln und eingelegten Gurken, dazu Toum, scharfe Soße und hausgemachte Soße. Auf Wunsch extra scharf 🌶️🌶️. „Nawfal sagt: Wenn’s noch zugeht, passt noch was rein.“",
            "price": "14,90 €"
          }
        ]
      }
    ]
  },
  {
    "id": "page7",
    "pageNumber": "07",
    "layout": "menu",
    "images": [
      {
        "url": "/dishes/menu/page7_img0.jpg",
        "scale": 1,
        "posX": 31,
        "posY": 64,
        "flipX": true,
        "flipY": false
      },
      {
        "url": "/dishes/menu/page7_img1.jpg",
        "scale": 1,
        "posX": 26.5,
        "posY": 37.5,
        "flipX": true,
        "flipY": false
      }
    ],
    "header": {
      "subtitle": "07 · VEGETARISCHE WRAPS",
      "title": "Grün gerollt",
      "tagline": "vegan · vegetarisch · knusprig",
      "showDietaryBar": true
    },
    "categories": [
      {
        "id": "c7_2",
        "code": "8",
        "title": "VEGETARISCHE WRAPS",
        "subtitle": "„Grün gefüllt. Ernst gemeint.“",
        "items": [
          {
            "num": "70",
            "name": "Maqali Wrap 🥬🌶️",
            "allergens": "Allergene: A, C, G, K, L",
            "desc": "Gegrillte Aubergine und Zucchini, frittierter Blumenkohl und Batata Harra mit Salat, Tomaten, Zwiebeln, eingelegten Gurken, weißen Rüben, Hummus, Toum und hausgemachter Soße im Wrap.",
            "price": "8,50 €"
          },
          {
            "num": "71",
            "name": "Falafel Wrap 🥬",
            "allergens": "Allergene: A, C, G, I, K, L",
            "desc": "Hausgemachte Falafeln mit Salat, Tomaten, eingelegten Gurken, weißen Rüben und Hummus, dazu hausgemachte Soße im Wrap.",
            "price": "7,90 €"
          },
          {
            "num": "72",
            "name": "Falfouli Wrap 🥬",
            "badge": "★ BELIEBT",
            "allergens": "Allergene: A, C, G, I, K, L",
            "desc": "Hausgemachte Falafeln mit gegrillter Aubergine, Pommes, Tomaten, eingelegten Gurken, weißen Rüben und Hummus, dazu hausgemachte Soße im Wrap.",
            "price": "8,90 €"
          },
          {
            "num": "73",
            "name": "Falumi Wrap 🥬",
            "allergens": "Allergene: A, C, G, I, K, L",
            "desc": "Hausgemachte Falafeln und gegrillter Halloumi mit Salat, Tomaten, eingelegten Gurken, weißen Rüben und Hummus, dazu hausgemachte Soße im Wrap.",
            "price": "8,90 €"
          },
          {
            "num": "74",
            "name": "Halloumi Wrap 🥬",
            "allergens": "Allergene: A, C, G, K, L",
            "desc": "Gegrillter Halloumi mit Salat, Rotkraut, Tomaten, eingelegten Gurken, weißen Rüben und Hummus, dazu hausgemachte Soße im Wrap.",
            "price": "8,50 €"
          },
          {
            "num": "75",
            "name": "Veggie Wrap 🥬",
            "allergens": "Allergene: A, C, G, K, L",
            "desc": "Fetakäse mit Salat, Rotkraut, Tomaten, Zwiebeln, eingelegten Gurken, weißen Rüben, Mais und Paprika, dazu Hummus, Toum und hausgemachte Soße im Wrap.",
            "price": "7,50 €"
          },
          {
            "num": "76",
            "name": "Batata Wrap 🥬🌶️",
            "allergens": "Allergene: A, C, G, K, L",
            "desc": "Batata Harra mit eingelegten Gurken, Hummus, Toum und Muhammara, verfeinert mit Granatapfelsirup und hausgemachter Soße im Wrap.",
            "price": "7,50 €"
          }
        ]
      }
    ],
    "floatingShapes": [
      {
        "id": "shape_1787830663617_rdq3",
        "shapeType": "circle",
        "posX": 50.3,
        "posY": 85.8,
        "size": 215,
        "rotation": 0,
        "borderWidth": 2,
        "borderColor": "#c9aa58",
        "showGlow": true,
        "icon": "⭕",
        "badgeText": "Falfouli Wrap",
        "subText": "Gourmet Selection",
        "contentType": "image",
        "image": "/dishes/menu/shape_p7_s0.jpg",
        "imageScale": 1
      },
      {
        "id": "shape_1787830664031_wy6r",
        "shapeType": "circle",
        "posX": 81.4,
        "posY": 85.5,
        "size": 215,
        "rotation": 0,
        "borderWidth": 2,
        "borderColor": "#c9aa58",
        "showGlow": true,
        "icon": "⭕",
        "badgeText": "Veggie Wrap",
        "subText": "Gourmet Selection",
        "contentType": "image",
        "image": "/dishes/menu/shape_p7_s1.jpg",
        "imageFit": "contain",
        "imageScale": 1.45
      }
    ]
  },
  {
    "id": "page8",
    "pageNumber": "08",
    "layout": "menu",
    "images": [
      {
        "url": "/dishes/menu/page8_img0.jpg",
        "scale": 1.1,
        "posX": 53.5,
        "posY": 60.3,
        "flipX": false,
        "flipY": false
      },
      {
        "url": "/dishes/menu/page8_img1.jpg",
        "scale": 1,
        "posX": 0,
        "posY": 27.5,
        "flipX": false,
        "flipY": false
      }
    ],
    "header": {
      "subtitle": "08 · BURGER & VEG. HAUPTGERICHTE",
      "title": "Burger & Veggie",
      "tagline": "saftig · frisch · hausgemacht",
      "showDietaryBar": true
    },
    "categories": [
      {
        "id": "c8",
        "code": "9",
        "title": "BURGER",
        "subtitle": "„Zwei Hände. Null Benehmen.“",
        "items": [
          {
            "num": "90",
            "name": "Klassik Burger",
            "allergens": "Allergene: A, C, G, J",
            "desc": "160-g-Rindfleisch-Patty mit Cheddar, Tomaten, eingelegten Gurken und Burgersoße, dazu Pommes, gemischter Salat und cremiger Weißkohlsalat.",
            "price": "15,90 €"
          },
          {
            "num": "91",
            "name": "Alsafi Burger",
            "allergens": "Allergene: A, C, G, J",
            "desc": "Knusprig panierte Hähnchenbrust mit Cheddar, Salat, Tomaten und eingelegten Gurken, dazu Toum und Burgersoße. Serviert mit Pommes, gemischtem Salat und cremigem Weißkohlsalat.",
            "price": "15,90 €"
          },
          {
            "num": "92",
            "name": "Orient Burger 🌶️",
            "badge": "★ BELIEBT",
            "allergens": "Allergene: A, C, G, J",
            "desc": "160-g-Patty aus würzigem Kalb- und Lammhackfleisch mit Cheddar, Salat, Tomaten, Zwiebeln und eingelegten Gurken, dazu Toum und Burgersoße. Serviert mit Pommes, gemischtem Salat und cremigem Weißkohlsalat.",
            "price": "15,90 €"
          },
          {
            "num": "93",
            "name": "Schawarma Burger",
            "allergens": "Allergene: A, C, G, J",
            "desc": "Hähnchen-Schawarma vom Drehspieß mit Cheddar, Salat, Tomaten, Zwiebeln und eingelegten Gurken, dazu Toum und Burgersoße. Serviert mit Pommes, gemischtem Salat und cremigem Weißkohlsalat.",
            "price": "14,90 €"
          },
          {
            "num": "94",
            "name": "Falafel Burger 🥬",
            "allergens": "Allergene: A, C, I, K, L",
            "desc": "Hausgemachte Falafeln mit Salat, Tomaten, eingelegten Gurken, weißen Rüben, Hummus und Sesampaste. Serviert mit Pommes, gemischtem Salat und cremigem Weißkohlsalat.",
            "price": "13,90 €"
          }
        ]
      },
      {
        "id": "c9",
        "code": "10",
        "title": "VEGETARISCHE HAUPTGERICHTE",
        "subtitle": "„Ohne Fleisch. Mit allem, was zählt.“",
        "items": [
          {
            "num": "100",
            "name": "Maqali Teller 🥬🌶️",
            "allergens": "Allergene: G, I, K, L",
            "desc": "Gegrillte Aubergine und Zucchini mit frittiertem Blumenkohl und Batata Harra, dazu gemischter Salat, Hummus und Sesampaste.",
            "price": "11,90 €"
          },
          {
            "num": "101",
            "name": "Falafel Teller, 5 Stück 🥬",
            "allergens": "Allergene: G, I, K, L",
            "desc": "Hausgemachte Falafeln mit gemischtem Salat, Hummus und Sesampaste.",
            "price": "9,90 €"
          },
          {
            "num": "102",
            "name": "Fatteh 🥬",
            "allergens": "Allergene: A, G, H, K, L",
            "desc": "Knusprig frittiertes Brot mit Kichererbsen, Knoblauch und Sesampaste, verfeinert mit Butter, gerösteten Nüssen und frischer Petersilie.",
            "price": "10,90 €"
          },
          {
            "num": "103",
            "name": "Falafel Arabi 🥬",
            "allergens": "Allergene: A, C, I, K, L",
            "desc": "Hausgemachte Falafeln im arabischen Fladenbrot mit Tomaten, eingelegten Gurken, weißen Rüben, Hummus und Sesampaste, in Stücke geschnitten und mit Pommes, gemischtem Salat und cremigem Weißkohlsalat serviert.",
            "price": "11,90 €"
          },
          {
            "num": "104",
            "name": "Veggie-Mix-Platte 🥬🌶️",
            "badge": "★ BELIEBT",
            "allergens": "Allergene: A, C, G, I, K, L",
            "desc": "Hummus, Toum, Baba Ghanoush, Muhammara, Rote-Bete-Creme, Rakak, hausgemachte Falafeln, gegrillte Aubergine und Zucchini, frittierter Blumenkohl, Batata Harra und gefüllte Weinblätter, dazu Sesampaste und ein kleiner gemischter Salat.",
            "price": "17,90 €"
          }
        ]
      }
    ]
  },
  {
    "id": "page9",
    "pageNumber": "09",
    "layout": "menu",
    "images": [
      {
        "url": "/dishes/menu/page9_img0.jpg",
        "scale": 0.94,
        "posX": 22.3,
        "posY": 62.5,
        "flipX": false,
        "flipY": false
      },
      {
        "url": "/dishes/menu/page9_img1.jpg",
        "scale": 0.96,
        "posX": 0,
        "posY": 34,
        "flipX": true,
        "flipY": false
      }
    ],
    "header": {
      "subtitle": "09 · ALSAFI SPEZIALITÄTEN",
      "title": "Unsere Handschrift",
      "tagline": "einzigartig · reichhaltig · meisterhaft",
      "showDietaryBar": true
    },
    "categories": [
      {
        "id": "c10",
        "code": "11",
        "title": "ALSAFI SPEZIALITÄTEN",
        "subtitle": "„Unsere Küche. Unsere Handschrift.“",
        "items": [
          {
            "num": "110",
            "name": "Qas Arabi Teller",
            "badge": "★ BELIEBT",
            "allergens": "Allergene: A, C, G, K, L",
            "desc": "Gegrilltes Kalbfleisch mit Pommes, eingelegten Gurken und Toum im arabischen Fladenbrot, knusprig gegrillt und mit Granatapfelsirup verfeinert, in Stücke geschnitten und mit Pommes, gemischtem Salat, cremigem Weißkohlsalat, Hummus und Toum serviert.",
            "price": "14,90 €"
          },
          {
            "num": "111",
            "name": "Schawarma Arabi Teller",
            "badge": "★ BELIEBT",
            "allergens": "Allergene: A, C, G, K, L",
            "desc": "Hähnchen-Schawarma vom Drehspieß mit Pommes, eingelegten Gurken und Toum im arabischen Fladenbrot, knusprig gegrillt und mit Granatapfelsirup verfeinert, in Stücke geschnitten und mit Pommes, gemischtem Salat, cremigem Weißkohlsalat, Hummus und Toum serviert.",
            "price": "13,90 €"
          },
          {
            "num": "112",
            "name": "Schawarma Teller",
            "allergens": "Allergene: A, C, I, K, L",
            "desc": "Hähnchen-Schawarma vom Drehspieß, wahlweise mit Reis oder Pommes, dazu gemischter Salat, Hummus, Toum, Muhammara und Rote-Bete-Creme.",
            "price": "15,90 €"
          },
          {
            "num": "113",
            "name": "Qas Teller",
            "allergens": "Allergene: A, C, I, K, L",
            "desc": "Gegrilltes Kalbfleisch, wahlweise mit Reis oder Pommes, dazu gemischter Salat, Hummus, Toum, Muhammara und Rote-Bete-Creme.",
            "price": "17,90 €"
          },
          {
            "num": "114",
            "name": "Tajin Teller 🌶️",
            "allergens": "Allergene: H, I, L",
            "desc": "Zwei gegrillte Hackfleischspieße aus Kalb und Lamm in einer leicht pikanten orientalischen Tomatensoße mit Zwiebeln und Oliven, serviert mit Reis, gerösteten Nüssen, Berberitzen und gemischtem Salat.",
            "price": "20,90 €"
          },
          {
            "num": "115",
            "name": "Mehdi Crispy Teller",
            "allergens": "Allergene: A, C, G, I, J, L",
            "desc": "Knusprig panierte Hähnchenbruststreifen, serviert mit Pommes, gemischtem Salat, cremigem Weißkohlsalat, Cocktailsoße und Toum.",
            "price": "15,90 €"
          },
          {
            "num": "116",
            "name": "Fatteh bil Lahm",
            "allergens": "Allergene: A, G, H, K, L",
            "desc": "Knusprig frittiertes Brot mit Kichererbsen, Knoblauch und Sesampaste, verfeinert mit gebratenem Kalbfleisch, Butter, gerösteten Nüssen und frischer Petersilie.",
            "price": "13,90 €"
          },
          {
            "num": "117",
            "name": "Mamas Teller",
            "badge": "★ BELIEBT",
            "allergens": "Allergene: A, C, G, H, I, K, L",
            "desc": "Gegrillte Hähnchenbrust, serviert mit orientalisch gewürztem Reis, gerösteten Nüssen, Berberitzen und frischer Petersilie, dazu gemischter Salat, Hummus, Toum, Muhammara und Rote-Bete-Creme.",
            "price": "18,90 €"
          }
        ]
      }
    ],
    "floatingShapes": [
      {
        "id": "shape_1787830698606_v40s",
        "shapeType": "circle",
        "posX": 78.6,
        "posY": 91.1,
        "size": 90,
        "rotation": 0,
        "borderWidth": 2,
        "borderColor": "#c9aa58",
        "showGlow": true,
        "icon": "🍗",
        "badgeText": "",
        "subText": "",
        "contentType": "icon",
        "imageScale": 0.7
      },
      {
        "id": "shape_1787830707858_eqni",
        "shapeType": "circle",
        "posX": 65.4,
        "posY": 88.3,
        "size": 90,
        "rotation": 0,
        "borderWidth": 2,
        "borderColor": "#c9aa58",
        "showGlow": true,
        "icon": "🥩",
        "badgeText": "",
        "subText": "",
        "contentType": "icon"
      },
      {
        "id": "shape_1787830713642_qifl",
        "shapeType": "circle",
        "posX": 40.1,
        "posY": 88.2,
        "size": 90,
        "rotation": 0,
        "borderWidth": 2,
        "borderColor": "#c9aa58",
        "showGlow": true,
        "icon": "🍟",
        "badgeText": "",
        "subText": "",
        "contentType": "icon"
      },
      {
        "id": "shape_1787830727074_0g4j",
        "shapeType": "circle",
        "posX": 52.5,
        "posY": 91.3,
        "size": 90,
        "rotation": 0,
        "borderWidth": 2,
        "borderColor": "#c9aa58",
        "showGlow": true,
        "icon": "🧆",
        "badgeText": "",
        "subText": "",
        "contentType": "icon"
      },
      {
        "id": "shape_1787830784945_broc",
        "shapeType": "stamp",
        "posX": 90.8,
        "posY": 87.3,
        "size": 95,
        "rotation": 0,
        "borderWidth": 2,
        "borderColor": "#c9aa58",
        "showGlow": true,
        "icon": "🔥",
        "badgeText": "EXTRA SCHARF",
        "subText": "Spicy Hot",
        "contentType": "icon"
      }
    ]
  },
  {
    "id": "page10",
    "pageNumber": "10",
    "layout": "menu",
    "images": [
      {
        "url": "/dishes/menu/page10_img0.jpg",
        "scale": 0.9,
        "posX": 0,
        "posY": 60.8,
        "flipX": false,
        "flipY": false
      },
      {
        "url": "/dishes/menu/page10_img1.jpg",
        "scale": 1,
        "posX": 0.6,
        "posY": 31.9,
        "flipX": false,
        "flipY": false
      }
    ],
    "header": {
      "subtitle": "10 · GRILLGERICHTE & KINDER",
      "title": "Meister am Grill & Kleine Helden",
      "tagline": "heiß · deftig · authentisch",
      "showDietaryBar": true
    },
    "categories": [
      {
        "id": "c11",
        "code": "12",
        "title": "GRILLGERICHTE",
        "subtitle": "„Der Grill macht keine leeren Versprechen.“",
        "items": [
          {
            "num": "130",
            "name": "Kufta Teller",
            "allergens": "Allergene: A, C, I, K, L",
            "desc": "Zwei gegrillte Hackfleischspieße aus Kalb und Lamm, wahlweise mit Reis oder Pommes, dazu gemischter Salat, Hummus, Toum, Muhammara und Rote-Bete-Creme.",
            "price": "17,90 €"
          },
          {
            "num": "131",
            "name": "Nawar Teller 🌶️",
            "badge": "★ BELIEBT",
            "allergens": "Allergene: A, C, I, K, L",
            "desc": "Zwei pikant gewürzte Hackfleischspieße aus Kalb und Lamm, wahlweise mit Reis oder Pommes, dazu gemischter Salat, Hummus, Toum, Muhammara und Rote-Bete-Creme.",
            "price": "18,90 €"
          },
          {
            "num": "132",
            "name": "Tawuk Teller",
            "allergens": "Allergene: A, C, I, K, L",
            "desc": "Zwei marinierte und gegrillte Hähnchenbrustspieße, wahlweise mit Reis oder Pommes, dazu gemischter Salat, Hummus, Toum, Muhammara und Rote-Bete-Creme.",
            "price": "18,90 €"
          },
          {
            "num": "133",
            "name": "Lahem Teller",
            "allergens": "Allergene: A, C, I, K, L",
            "desc": "Zwei gegrillte Kalbspieße, wahlweise mit Reis oder Pommes, dazu gemischter Salat, Hummus, Toum, Muhammara und Rote-Bete-Creme.",
            "price": "19,90 €"
          },
          {
            "num": "134",
            "name": "Chicken Wings",
            "allergens": "Allergene: A, C, I, K, L",
            "desc": "Gegrillte Chicken Wings, wahlweise mit Reis oder Pommes, dazu gemischter Salat, Hummus, Toum, Muhammara und Rote-Bete-Creme.",
            "price": "18,90 €"
          },
          {
            "num": "135",
            "name": "Alsafi Mix Teller",
            "allergens": "Allergene: A, C, I, K, L",
            "desc": "Ein gegrillter Kalbspieß, ein marinierter Hähnchenbrustspieß, ein Hackfleischspieß aus Kalb und Lamm und Hähnchen-Schawarma vom Drehspieß, wahlweise mit Reis oder Pommes, dazu gemischter Salat, Hummus, Toum, Muhammara und Rote-Bete-Creme.",
            "price": "24,90 €"
          },
          {
            "num": "136",
            "name": "Alsafi Mix Platte für 2 Personen",
            "allergens": "Allergene: A, C, I, K, L",
            "desc": "Zwei gegrillte Kalbspieße, zwei marinierte Hähnchenbrustspieße, zwei Hackfleischspieße aus Kalb und Lamm und Hähnchen-Schawarma vom Drehspieß, serviert mit Reis und Pommes, wahlweise Fattoush oder Tabbouleh, dazu Hummus, Toum, Muhammara und Rote-Bete-Creme.",
            "price": "49,90 €"
          }
        ]
      },
      {
        "id": "c13",
        "code": "13",
        "title": "KINDERGERICHTE",
        "subtitle": "„Kleiner Hunger. Große Helden.“",
        "items": [
          {
            "num": "150",
            "name": "Nilia Teller",
            "allergens": "Allergene: A, C, I, K, L",
            "desc": "Hähnchen-Schawarma vom Drehspieß, serviert mit Pommes, Hummus, Toum und gemischtem Salat.",
            "price": "9,90 €"
          },
          {
            "num": "151",
            "name": "Isa Teller",
            "allergens": "Allergene: A, C, J | Zusatzstoffe: 16",
            "desc": "Fünf knusprige Chicken Nuggets, serviert mit Pommes, Cocktailsoße und Mayonnaise.",
            "price": "8,90 €"
          }
        ]
      }
    ]
  },
  {
    "id": "page11",
    "pageNumber": "11",
    "layout": "menu",
    "images": [
      {
        "url": "/dishes/menu/page11_img0.jpg",
        "scale": 1.04,
        "posX": 0,
        "posY": 52.5,
        "flipX": false,
        "flipY": false
      },
      {
        "url": "/dishes/menu/page11_img1.jpg",
        "scale": 1.04,
        "posX": 0,
        "posY": 37,
        "flipX": true,
        "flipY": false
      }
    ],
    "header": {
      "subtitle": "11 · BEILAGEN & DESSERTS",
      "title": "Das perfekte Finale",
      "tagline": "ergänzend · süß · köstlich",
      "showDietaryBar": true
    },
    "categories": [
      {
        "id": "c13",
        "code": "14",
        "title": "BEILAGEN",
        "subtitle": "„Nur Beilage? Sag das mal den Pommes.“",
        "items": [
          {
            "num": "160",
            "name": "Qarnabit 🌱",
            "allergens": "Allergene: K",
            "desc": "Frittierter Blumenkohl mit Sesampaste.",
            "price": "6,90 €"
          },
          {
            "num": "161",
            "name": "Betenjan 🌱",
            "allergens": "Allergene: K",
            "desc": "Gegrillte Aubergine mit Sesampaste.",
            "price": "6,90 €"
          },
          {
            "num": "162",
            "name": "Schijer 🌱",
            "allergens": "Allergene: K",
            "desc": "Gegrillte Zucchini mit Sesampaste.",
            "price": "6,90 €"
          },
          {
            "num": "163",
            "name": "Portion Pommes 🌱",
            "allergens": "Allergene: A",
            "desc": "",
            "price": "4,50 €"
          },
          {
            "num": "164",
            "name": "Portion Reis 🌱",
            "allergens": "Allergene: keine",
            "desc": "",
            "price": "4,50 €"
          }
        ]
      },
      {
        "id": "c14",
        "code": "15",
        "title": "DESSERTS",
        "subtitle": "„Satt ist nur eine Meinung.“",
        "items": [
          {
            "num": "170",
            "name": "Baklava",
            "allergens": "Allergene: A, G, H",
            "desc": "Orientalische Süßspeise aus feinem Blätterteig mit Nüssen und aromatischem Zuckersirup.",
            "price": "3,90 €"
          },
          {
            "num": "171",
            "name": "Kunafe",
            "badge": "★ BELIEBT",
            "allergens": "Allergene: A, G, H",
            "desc": "Orientalische Süßspeise aus feinem Fadenteig mit geschmolzenem Mozzarella, aromatischem Zuckersirup und Pistazien.",
            "price": "6,90 €"
          }
        ]
      }
    ],
    "bottomCallout": {
      "show": true,
      "badge": "☕ DIE PERFEKTE KOMBINATION",
      "text": "Genießen Sie zu unserer ofenfrischen Kunafe & Baklava einen traditionellen arabischen Kardamom-Tee oder Mokka.",
      "icon": "🫖"
    },
    "floatingShapes": [
      {
        "id": "shape_1787830947276_64up",
        "shapeType": "starBadge",
        "posX": 81.2,
        "posY": 84.7,
        "size": 220,
        "rotation": 0,
        "borderWidth": 2,
        "borderColor": "#c9aa58",
        "showGlow": true,
        "icon": "🌟",
        "badgeText": "🌟 Betenjan",
        "subText": "",
        "contentType": "image",
        "image": "/dishes/menu/shape_p11_s0.jpg"
      },
      {
        "id": "shape_1787830962318_b8w4",
        "shapeType": "circle",
        "posX": 50,
        "posY": 84.6,
        "size": 220,
        "rotation": 0,
        "borderWidth": 2,
        "borderColor": "#c9aa58",
        "showGlow": true,
        "icon": "⭐",
        "badgeText": "⭐Baklava",
        "subText": "Top Empfehlung",
        "contentType": "image",
        "image": "/dishes/menu/shape_p11_s1.jpg"
      }
    ]
  },
  {
    "id": "page12",
    "pageNumber": "12",
    "layout": "menu",
    "images": [
      {
        "url": "/dishes/menu/page12_img0.jpg",
        "scale": 1,
        "posX": 50,
        "posY": 68,
        "flipX": false,
        "flipY": false,
        "brightness": 115,
        "contrast": 100
      },
      {
        "url": "/dishes/menu/page12_img1.jpg",
        "scale": 1,
        "posX": 50,
        "posY": 50,
        "flipX": false,
        "flipY": false,
        "brightness": 115,
        "contrast": 100
      }
    ],
    "header": {
      "subtitle": "12 · GETRÄNKE",
      "title": "Erfrischend & Heiß",
      "tagline": "durststillend · belebend",
      "showDietaryBar": false
    },
    "categories": [
      {
        "id": "c15",
        "code": "16",
        "title": "KALTE GETRÄNKE",
        "subtitle": "„Zu scharf? Wir haben was Kaltes.“",
        "items": [
          {
            "num": "",
            "name": "Wasser still, 0,5 l",
            "allergens": "",
            "desc": "",
            "price": "2,20 €"
          },
          {
            "num": "",
            "name": "Mineralwasser, 0,5 l",
            "allergens": "",
            "desc": "",
            "price": "2,20 €"
          },
          {
            "num": "",
            "name": "Cola, 0,33 l",
            "allergens": "Zusatzstoffe: 1, 11",
            "desc": "",
            "price": "3,10 €"
          },
          {
            "num": "",
            "name": "Cola Zero, 0,33 l",
            "allergens": "Zusatzstoffe: 1, 9, 10, 11, 14",
            "desc": "",
            "price": "3,10 €"
          },
          {
            "num": "",
            "name": "Fanta, 0,33 l",
            "allergens": "Zusatzstoffe: 1, 3",
            "desc": "",
            "price": "3,10 €"
          },
          {
            "num": "",
            "name": "Sprite, 0,33 l",
            "allergens": "Zusatzstoffe: 3",
            "desc": "",
            "price": "3,10 €"
          },
          {
            "num": "",
            "name": "Mezzo Mix, 0,33 l",
            "allergens": "Zusatzstoffe: 1, 3, 11",
            "desc": "",
            "price": "3,10 €"
          },
          {
            "num": "",
            "name": "Eistee Pfirsich, 0,3 l",
            "allergens": "Zusatzstoffe: 2, 14, 15",
            "desc": "",
            "price": "3,10 €"
          },
          {
            "num": "",
            "name": "Eistee Zitrone, 0,3 l",
            "allergens": "Zusatzstoffe: 2, 14, 15",
            "desc": "",
            "price": "3,10 €"
          },
          {
            "num": "",
            "name": "Ayran, 0,25 l",
            "allergens": "Allergene: G",
            "desc": "",
            "price": "2,50 €"
          },
          {
            "num": "",
            "name": "Apfelsaftschorle, 0,33 l",
            "allergens": "Zusatzstoffe: 3",
            "desc": "",
            "price": "3,10 €"
          },
          {
            "num": "",
            "name": "Uludag, 0,33 l",
            "allergens": "Zusatzstoffe: 1, 3",
            "desc": "",
            "price": "3,10 €"
          },
          {
            "num": "",
            "name": "Red Bull, 0,25 l",
            "allergens": "Zusatzstoffe: 12, 13",
            "desc": "",
            "price": "4,10 €"
          },
          {
            "num": "",
            "name": "Red Bull Light, 0,25 l",
            "allergens": "Zusatzstoffe: 9, 12, 13",
            "desc": "",
            "price": "4,10 €"
          },
          {
            "num": "",
            "name": "Radler alkoholfrei, 0,33 l",
            "allergens": "Allergene: A",
            "desc": "",
            "price": "3,80 €"
          },
          {
            "num": "",
            "name": "Bier alkoholfrei, 0,33 l",
            "allergens": "Allergene: A",
            "desc": "",
            "price": "3,80 €"
          },
          {
            "num": "",
            "name": "Capri-Sun, 0,2 l",
            "allergens": "Zusatzstoffe: 3",
            "desc": "",
            "price": "2,30 €"
          }
        ]
      },
      {
        "id": "c16",
        "code": "17",
        "title": "HEISSE GETRÄNKE",
        "subtitle": "„Heiß, stark und besser als Smalltalk.“",
        "items": [
          {
            "num": "",
            "name": "Schwarzer Tee mit Kardamom",
            "allergens": "Zusatzstoffe: 12",
            "desc": "",
            "price": "2,00 €"
          },
          {
            "num": "",
            "name": "Espresso",
            "allergens": "Zusatzstoffe: 12",
            "desc": "",
            "price": "2,10 €"
          },
          {
            "num": "",
            "name": "Café Crème",
            "allergens": "Zusatzstoffe: 12",
            "desc": "",
            "price": "3,10 €"
          },
          {
            "num": "",
            "name": "Cappuccino",
            "allergens": "Allergene: G | Zusatzstoffe: 12",
            "desc": "",
            "price": "3,50 €"
          },
          {
            "num": "",
            "name": "Latte Macchiato",
            "allergens": "Allergene: G | Zusatzstoffe: 12",
            "desc": "",
            "price": "3,80 €"
          },
          {
            "num": "",
            "name": "Heiße Schokolade",
            "allergens": "Allergene: G",
            "desc": "",
            "price": "3,30 €"
          }
        ]
      }
    ]
  },
  {
    "id": "page13",
    "pageNumber": "13",
    "layout": "info",
    "images": [
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=85"
    ],
    "header": {
      "subtitle": "18 · CATERING & INFOS",
      "title": "Catering, Infos & Legenden",
      "tagline": "hilfreich · komplett · transparent"
    },
    "categories": []
  }
];
