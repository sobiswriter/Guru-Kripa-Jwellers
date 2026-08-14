export type JewelryCategory = 'rings' | 'necklaces' | 'earrings' | 'bracelets' | 'watches' | 'kadas' | 'polishing-services';

export type MetalType = '22k-yellow-gold' | '24k-pure-gold' | '18k-gold' | 'antique-gold' | 'rose-gold' | 'white-gold';

export interface GemstoneSpec {
  type: string; // e.g., "BIS 916 Hallmarked Gold", "Kundan & Polki", "South Sea Pearl", "Navratna Stones"
  carat?: number;
  weightGrams?: number;
  purity?: string; // e.g., "22 Karat (91.6% Pure)", "24 Karat (99.9% Pure)"
  cut?: string;
  clarity?: string;
  color?: string;
  origin?: string; // e.g., "Phagwara In-House Goldsmith Atelier", "Kundan Karigari"
}

export interface JewelryProduct {
  id: string;
  name: string;
  subtitle: string;
  category: JewelryCategory;
  collection: string;
  price: number; // in INR ₹
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
  goldWeight?: string; // e.g., "24.50 grams (2.1 tola)"
  purity?: string; // e.g., "22K BIS Hallmarked"
  makingCharges?: string; // e.g., "Transparent 8% Karigar Making"
  metalsAvailable: {
    type: MetalType;
    label: string;
    hexColor: string;
  }[];
  sizesAvailable?: string[]; // e.g., ["2.4 (Small)", "2.6 (Medium)", "2.8 (Large)"] or ["16 inch", "18 inch", "20 inch (Bridal)"]
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
  region: 'Punjab & North India' | 'NRI Consultations' | 'Worldwide Delivery';
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
  googleMapsUrl?: string;
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
