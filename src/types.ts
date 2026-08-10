export type JewelryCategory = 'rings' | 'necklaces' | 'earrings' | 'bracelets' | 'watches';

export type MetalType = '18k-yellow-gold' | 'platinum' | 'rose-gold' | 'white-gold';

export interface GemstoneSpec {
  type: string; // e.g., "Diamond", "Royal Emerald", "Blue Sapphire"
  carat: number;
  cut: string; // e.g., "Ideal Cut", "Oval Brilliant", "Emerald Cut"
  clarity: string; // e.g., "VVS1", "FL (Flawless)"
  color: string; // e.g., "D (Colorless)"
  origin: string; // e.g., "Conflict-Free Botswana Diamond"
}

export interface JewelryProduct {
  id: string;
  name: string;
  subtitle: string;
  category: JewelryCategory;
  collection: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  mainImage: string;
  galleryImages: string[];
  highResZoomImage: string; // High-res macro image for loupe magnifier
  tryOnType?: 'ring' | 'necklace';
  tryOnOverlayImage?: string; // Transparent PNG for AR overlay
  tryOnScaleDefault?: number;
  description: string;
  gemstoneSpec: GemstoneSpec;
  metalsAvailable: {
    type: MetalType;
    label: string;
    hexColor: string;
  }[];
  sizesAvailable?: string[]; // e.g., ["US 5", "US 6", "US 7", "US 8"] or ["16 inch", "18 inch", "20 inch"]
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isSpecialCollection?: boolean;
  inStock: boolean;
  engravingSupported?: boolean;
}

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  region: 'Americas' | 'Europe' | 'Asia-Pacific' | 'Middle East';
  address: string;
  phone: string;
  email: string;
  hours: string;
  timezone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
  isFlagship?: boolean;
  specialties: string[];
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  productName: string;
  productId: string;
  verifiedBuyer: boolean;
  customerPhoto?: string;
  helpfulCount: number;
  tags?: string[];
}

export interface AppointmentBooking {
  id: string;
  storeId: string;
  storeName: string;
  consultationType: string;
  date: string;
  timeSlot: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  notes?: string;
  confirmationCode: string;
  conciergeName: string;
}

export interface CartItem {
  product: JewelryProduct;
  selectedMetal: MetalType;
  selectedSize?: string;
  engravingText?: string;
  quantity: number;
}

export interface SpecialCollection {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  heroImage: string;
  accentColor: string;
  featuredProductIds: string[];
}
