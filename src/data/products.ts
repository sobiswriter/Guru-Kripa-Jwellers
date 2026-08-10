import { JewelryProduct } from '../types';

export const PRODUCTS: JewelryProduct[] = [
  {
    id: 'ring-solitaire-elysian',
    name: 'Elysian Radiant Oval Solitaire',
    subtitle: '2.5 Carat D-Flawless Oval Diamond on Pavé Band',
    category: 'rings',
    collection: 'The Celestial Solitaire Collection',
    price: 18500,
    originalPrice: 21000,
    rating: 4.95,
    reviewCount: 128,
    mainImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=1600'
    ],
    highResZoomImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=2400',
    tryOnType: 'ring',
    tryOnOverlayImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
    tryOnScaleDefault: 0.35,
    description: 'An ethereal masterwork featuring a 2.50ct oval brilliant diamond crowned in a custom platinum hidden halo. Hand-set micro-pavé diamonds line the whisper-thin band to maximize light dispersion.',
    gemstoneSpec: {
      type: 'Natural Diamond',
      carat: 2.50,
      cut: 'Oval Super Brilliant',
      clarity: 'FL (Flawless)',
      color: 'D (Exceptional White+)',
      origin: 'Ethically Sourced Kimberley Certified, Botswana'
    },
    metalsAvailable: [
      { type: 'platinum', label: 'Platinum 950', hexColor: '#E5E4E2' },
      { type: '18k-yellow-gold', label: '18K Yellow Gold', hexColor: '#D4AF37' },
      { type: 'rose-gold', label: '18K Rose Gold', hexColor: '#E8A798' }
    ],
    sizesAvailable: ['US 4.5', 'US 5.0', 'US 5.5', 'US 6.0', 'US 6.5', 'US 7.0', 'US 7.5', 'US 8.0'],
    isBestSeller: true,
    isSpecialCollection: true,
    inStock: true,
    engravingSupported: true
  },
  {
    id: 'necklace-emerald-royale',
    name: 'Sovereign Colombian Emerald & Diamond Drop',
    subtitle: '4.8 Carat Royal Emerald with Pear Cut Diamond Halo',
    category: 'necklaces',
    collection: 'Elysian Emerald & Royal Sapphire Series',
    price: 34200,
    originalPrice: 38000,
    rating: 4.98,
    reviewCount: 86,
    mainImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1611591475196-8579d46e31cb?auto=format&fit=crop&q=80&w=1600'
    ],
    highResZoomImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=2400',
    tryOnType: 'necklace',
    tryOnOverlayImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
    tryOnScaleDefault: 0.5,
    description: 'An iconic heritage pendant suspending a rare 4.80ct Muzo Colombian emerald of vibrant green saturation, framed by a tier of marquise and pear-shaped diamonds in 18k yellow gold.',
    gemstoneSpec: {
      type: 'Muzo Emerald',
      carat: 4.80,
      cut: 'Emerald Cut',
      clarity: 'VVS (Vivid Green Insignia)',
      color: 'Deep Muzo Green',
      origin: 'Muzo Mine, Colombia'
    },
    metalsAvailable: [
      { type: '18k-yellow-gold', label: '18K Yellow Gold', hexColor: '#D4AF37' },
      { type: 'platinum', label: 'Platinum 950', hexColor: '#E5E4E2' }
    ],
    sizesAvailable: ['16 inch (Choker)', '18 inch (Princess)', '20 inch (Matinee)'],
    isBestSeller: true,
    isSpecialCollection: true,
    inStock: true,
    engravingSupported: true
  },
  {
    id: 'ring-sapphire-artdeco',
    name: 'Art Déco Royal Ceylon Sapphire Ring',
    subtitle: '3.2 Carat Unheated Blue Sapphire with Baguette Wings',
    category: 'rings',
    collection: 'Art Déco Diamond Masterpieces',
    price: 22600,
    rating: 4.91,
    reviewCount: 64,
    mainImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1600'
    ],
    highResZoomImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=2400',
    tryOnType: 'ring',
    tryOnOverlayImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800',
    tryOnScaleDefault: 0.38,
    description: 'Inspired by 1920s Parisian high architecture, this showpiece presents an unheated 3.20ct Royal Velvet Blue Ceylon sapphire anchored between architectural diamond baguettes.',
    gemstoneSpec: {
      type: 'Royal Blue Sapphire',
      carat: 3.20,
      cut: 'Cushion Antique Cut',
      clarity: 'VVS1 (Unheated Natural)',
      color: 'Royal Velvet Blue',
      origin: 'Sri Lanka (Ceylon)'
    },
    metalsAvailable: [
      { type: 'platinum', label: 'Platinum 950', hexColor: '#E5E4E2' },
      { type: '18k-yellow-gold', label: '18K Yellow Gold', hexColor: '#D4AF37' }
    ],
    sizesAvailable: ['US 5.0', 'US 6.0', 'US 7.0', 'US 8.0'],
    isNewArrival: true,
    isSpecialCollection: true,
    inStock: true,
    engravingSupported: true
  },
  {
    id: 'necklace-lumiere-diamond',
    name: 'Lumière Diamond Riviera Collar',
    subtitle: '15.5 Carat Total Weight Graduated Diamond Necklace',
    category: 'necklaces',
    collection: 'Lumière Vintage Heritage Collection',
    price: 58000,
    originalPrice: 65000,
    rating: 5.0,
    reviewCount: 42,
    mainImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1600'
    ],
    highResZoomImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=2400',
    tryOnType: 'necklace',
    tryOnOverlayImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
    tryOnScaleDefault: 0.55,
    description: 'A seamless cascade of 72 hand-matched round brilliant diamonds graduating gracefully toward a central 1.5ct focal stone. Articulated in custom platinum three-prong settings.',
    gemstoneSpec: {
      type: 'Natural Diamond Ensemble',
      carat: 15.50,
      cut: 'Triple Excellent Cut',
      clarity: 'VVS1 - VVS2',
      color: 'E-F Colorless',
      origin: 'Ethically Mined, Canada & Botswana'
    },
    metalsAvailable: [
      { type: 'platinum', label: 'Platinum 950', hexColor: '#E5E4E2' },
      { type: '18k-yellow-gold', label: '18K Yellow Gold', hexColor: '#D4AF37' }
    ],
    sizesAvailable: ['16 inch (Classic Riviera)', '18 inch (Extended Collar)'],
    isBestSeller: true,
    isSpecialCollection: true,
    inStock: true,
    engravingSupported: false
  },
  {
    id: 'ring-eternity-baguette',
    name: 'Celestial Baguette Eternity Band',
    subtitle: '4.5 Carat Platinum Channel-Set Diamond Band',
    category: 'rings',
    collection: 'The Celestial Solitaire Collection',
    price: 9800,
    rating: 4.93,
    reviewCount: 210,
    mainImage: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=1600'
    ],
    highResZoomImage: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=2400',
    tryOnType: 'ring',
    tryOnOverlayImage: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=800',
    tryOnScaleDefault: 0.32,
    description: 'Crisp, geometric elegance featuring endless step-cut baguette diamonds hand-selected for uniform clarity and fire. Smooth inner comfort-fit silhouette.',
    gemstoneSpec: {
      type: 'Baguette Cut Diamonds',
      carat: 4.50,
      cut: 'Step Cut Precision',
      clarity: 'VVS1',
      color: 'F Colorless',
      origin: 'GIA Certified Conflict-Free'
    },
    metalsAvailable: [
      { type: 'platinum', label: 'Platinum 950', hexColor: '#E5E4E2' },
      { type: '18k-yellow-gold', label: '18K Yellow Gold', hexColor: '#D4AF37' },
      { type: 'rose-gold', label: '18K Rose Gold', hexColor: '#E8A798' }
    ],
    sizesAvailable: ['US 5.0', 'US 6.0', 'US 7.0', 'US 8.0'],
    isBestSeller: true,
    inStock: true,
    engravingSupported: true
  },
  {
    id: 'earrings-diamond-chandelier',
    name: 'Palais De Versailles Diamond Drop Earrings',
    subtitle: '6.2 Carat Diamond Cascade Earrings in Platinum',
    category: 'earrings',
    collection: 'Lumière Vintage Heritage Collection',
    price: 19400,
    rating: 4.89,
    reviewCount: 38,
    mainImage: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=1600'
    ],
    highResZoomImage: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=2400',
    description: 'Capturing the dancing candelabra reflections of French royal palaces, these statement drops feature marquise, pear, and round brilliant diamonds that catch light with every movement.',
    gemstoneSpec: {
      type: 'Natural Diamonds',
      carat: 6.20,
      cut: 'Mixed Brilliant & Marquise',
      clarity: 'VVS2',
      color: 'E Colorless',
      origin: 'Kimberley Certified'
    },
    metalsAvailable: [
      { type: 'platinum', label: 'Platinum 950', hexColor: '#E5E4E2' },
      { type: '18k-yellow-gold', label: '18K Yellow Gold', hexColor: '#D4AF37' }
    ],
    isNewArrival: true,
    inStock: true,
    engravingSupported: false
  },
  {
    id: 'bracelet-tennis-aura',
    name: 'Aura Classic 10 Carat Diamond Tennis Bracelet',
    subtitle: 'Four-Prong Platinum Diamond Line Bracelet',
    category: 'bracelets',
    collection: 'The Celestial Solitaire Collection',
    price: 16500,
    rating: 4.97,
    reviewCount: 156,
    mainImage: 'https://images.unsplash.com/photo-1611591475196-8579d46e31cb?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1611591475196-8579d46e31cb?auto=format&fit=crop&q=80&w=1600'
    ],
    highResZoomImage: 'https://images.unsplash.com/photo-1611591475196-8579d46e31cb?auto=format&fit=crop&q=80&w=2400',
    description: 'The quintessential staple of fine jewelry. 42 perfectly proportioned round brilliant diamonds set in custom hand-cast platinum links with a double safety clasp mechanism.',
    gemstoneSpec: {
      type: 'Round Brilliant Diamonds',
      carat: 10.00,
      cut: 'Ideal Cut',
      clarity: 'VVS2',
      color: 'F Colorless',
      origin: 'Conflict-Free Canada'
    },
    metalsAvailable: [
      { type: 'platinum', label: 'Platinum 950', hexColor: '#E5E4E2' },
      { type: '18k-yellow-gold', label: '18K Yellow Gold', hexColor: '#D4AF37' },
      { type: 'rose-gold', label: '18K Rose Gold', hexColor: '#E8A798' }
    ],
    sizesAvailable: ['6.5 inch', '7.0 inch', '7.5 inch'],
    isBestSeller: true,
    inStock: true,
    engravingSupported: true
  },
  {
    id: 'watch-lumiere-pavarium',
    name: 'Lumière Pavarium Diamond Timepiece',
    subtitle: 'Swiss Automatic Watch with Snow-Paved Diamond Dial',
    category: 'watches',
    collection: 'High Watchmaking',
    price: 46800,
    rating: 4.96,
    reviewCount: 29,
    mainImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1600'
    ],
    highResZoomImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=2400',
    description: 'An exceptional high-watchmaking creation featuring a Swiss Calibre 1200 automatic movement. The 34mm white gold case and dial are fully snow-paved with 480 brilliant-cut diamonds.',
    gemstoneSpec: {
      type: 'Snow-Paved Diamond Setting',
      carat: 5.40,
      cut: 'Brilliant Cut Micro-Set',
      clarity: 'IF - VVS1',
      color: 'D-E Colorless',
      origin: 'Swiss Craftsmanship'
    },
    metalsAvailable: [
      { type: 'white-gold', label: '18K White Gold', hexColor: '#F0F0F0' },
      { type: '18k-yellow-gold', label: '18K Yellow Gold', hexColor: '#D4AF37' }
    ],
    isSpecialCollection: true,
    inStock: true,
    engravingSupported: true
  }
];
