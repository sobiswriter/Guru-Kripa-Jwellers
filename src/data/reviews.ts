import { Review, SpecialCollection } from '../types';

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Lady Genevieve Vance',
    location: 'London, UK',
    rating: 5,
    date: 'August 2, 2026',
    title: 'The AR Virtual Try-On saved my proposal decision!',
    comment: 'Being in London and ordering the Elysian Oval Solitaire online felt daunting at first. But using the Virtual Try-On with my fiancé’s hand photo gave me complete confidence in the 2.5ct scale and platinum ratio. When the velvet box arrived, it was even more breathtaking in person.',
    productName: 'Elysian Radiant Oval Solitaire',
    productId: 'ring-solitaire-elysian',
    verifiedBuyer: true,
    customerPhoto: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
    helpfulCount: 42,
    tags: ['Virtual Try-On', 'Proposal Ring', 'GIA Certified']
  },
  {
    id: 'rev-2',
    author: 'Sophia & Alexander Thorne',
    location: 'New York, USA',
    rating: 5,
    date: 'July 28, 2026',
    title: 'In-Store Consultation at 5th Ave was regal',
    comment: 'We booked a private consultation at the Fifth Avenue mansion for our 10th anniversary. Concierge Marcus greeted us with vintage champagne and had the Sovereign Emerald ready. The high-res diamond loupe in the showroom revealed details you rarely see in ordinary jewelers.',
    productName: 'Sovereign Colombian Emerald & Diamond Drop',
    productId: 'necklace-emerald-royale',
    verifiedBuyer: true,
    customerPhoto: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
    helpfulCount: 38,
    tags: ['Boutique Visit', 'Custom Engraving', 'Vivid Emerald']
  },
  {
    id: 'rev-3',
    author: 'Dr. Evelyn Chen',
    location: 'Singapore',
    rating: 5,
    date: 'July 15, 2026',
    title: 'Unmatched 10x Macro View & Diamond Fire',
    comment: 'The interactive loupe feature on the site allowed me to inspect the clarity of the Ceylon Sapphire down to every facet line before visiting the Ginza store. The craftsmanship and conflict-free provenance are standard setters in haute joaillerie.',
    productName: 'Art Déco Royal Ceylon Sapphire Ring',
    productId: 'ring-sapphire-artdeco',
    verifiedBuyer: true,
    helpfulCount: 29,
    tags: ['Macro Loupe Inspection', 'Sapphire', 'Art Déco']
  },
  {
    id: 'rev-4',
    author: 'Camille & Henri de Laurent',
    location: 'Paris, France',
    rating: 5,
    date: 'June 30, 2026',
    title: 'An heirloompiece for generations',
    comment: 'Acquired the Lumière Diamond Riviera Collar at Place Vendôme. The graduated drape rests perfectly against the neck line. The virtual try-on mode previewed the 18-inch length accurately.',
    productName: 'Lumière Diamond Riviera Collar',
    productId: 'necklace-lumiere-diamond',
    verifiedBuyer: true,
    customerPhoto: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
    helpfulCount: 54,
    tags: ['Place Vendôme', 'Haute Joaillerie', 'Riviera']
  }
];

export const SPECIAL_COLLECTIONS: SpecialCollection[] = [
  {
    id: 'celestial-solitaire',
    title: 'The Celestial Solitaire Collection',
    subtitle: 'Pure Fire. Infinite Clarity.',
    tagline: 'Precision-cut D-Flawless diamonds set in whisper-thin platinum and 18k gold bands.',
    description: 'Each solitaire diamond in this hallmark series is selected from the top 0.01% of ethically mined diamonds globally, held in high-tension prongs designed to channel maximum ambient light into the stone.',
    heroImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1600',
    accentColor: '#D4AF37',
    featuredProductIds: ['ring-solitaire-elysian', 'ring-eternity-baguette', 'bracelet-tennis-aura']
  },
  {
    id: 'elysian-emerald-sapphire',
    title: 'Elysian Emerald & Royal Sapphire Series',
    subtitle: 'Vibrant Royalty Mined From Earth’s Deepest Wonders',
    tagline: 'Deep Muzo greens and Sri Lankan Royal Velvet blues framed by immaculate diamond halos.',
    description: 'Celebrating colored gemstones with museum-grade saturation, this series brings historical European court majesty into modern architectural silhouettes.',
    heroImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1600',
    accentColor: '#00A86B',
    featuredProductIds: ['necklace-emerald-royale', 'ring-sapphire-artdeco']
  },
  {
    id: 'lumiere-heritage',
    title: 'Lumière Vintage Heritage Collection',
    subtitle: 'Inspired by Paris 1920s Haute Couture & Royal Archives',
    tagline: 'Hand-engraved scrollwork, platinum filigree, and snow-paved diamond drops.',
    description: 'Handcrafted over 120 artisan hours per piece in our Paris Place Vendôme workshop, preserving time-tested French goldsmith techniques.',
    heroImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1600',
    accentColor: '#E5E4E2',
    featuredProductIds: ['necklace-lumiere-diamond', 'earrings-diamond-chandelier', 'watch-lumiere-pavarium']
  }
];
