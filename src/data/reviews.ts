import { Review, SpecialCollection } from '../types';

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Sardar Balwinder Singh',
    location: 'Model Town, Phagwara',
    rating: 5,
    date: 'August 10, 2026',
    title: 'Finest Handcrafted Solid Punjabi Kada in Phagwara!',
    comment: 'I ordered a 24.5-gram pure 22K solid gold kada for my son’s wedding. The goldsmiths at Shri Guru Kirpa in Bansawala Bazar completed the custom engraving in just 3 days! Accurate weighing on digital scale, BIS 916 laser hallmark stamping, and reasonable making charges. Best goldsmith in Phagwara.',
    productName: 'Pure 22K Royal Punjabi Gold Kada',
    productId: 'gold-royal-punjabi-kada',
    verifiedBuyer: true,
    customerPhoto: 'https://images.unsplash.com/photo-1611591475196-8579d46e31cb?auto=format&fit=crop&q=80&w=800',
    helpfulCount: 52,
    tags: ['Punjabi Kada', 'BIS 916 Hallmark', 'Phagwara Sarafan Bazar', 'Custom Karigari']
  },
  {
    id: 'rev-2',
    author: 'Harpreet Kaur & Family',
    location: 'Purani Tehsil, Phagwara',
    rating: 5,
    date: 'July 29, 2026',
    title: 'Bridal Rani Haar customized according to our budget & weight',
    comment: 'We visited their shop on Sarafan Bazar Road for my daughter’s bridal set. The master goldsmith explained the exact gold weight, stone deduction, and showed us design previews. The 3-tier rani haar turned out magnificent. Very honest, courteous, and prompt local jeweller.',
    productName: 'Maharani 22K Gold Bridal Rani Haar Set',
    productId: 'necklace-bridal-rani-haar',
    verifiedBuyer: true,
    customerPhoto: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
    helpfulCount: 46,
    tags: ['Bridal Jewellery', 'Transparent Gold Rate', 'Sarafan Bazar Phagwara']
  },
  {
    id: 'rev-3',
    author: 'Gurpreet Sandhu (NRI)',
    location: 'Birmingham, UK / Phagwara',
    rating: 5,
    date: 'July 14, 2026',
    title: '24K Gold Plating & Polishing made old family gold look brand new!',
    comment: 'Brought 4 antique silver bangles and an old gold necklace for 24K gold plating and ultrasonic polish before returning to the UK. In 24 hours, Shri Guru Kirpa Gold Platters gave them an unbelievable showroom mirror shine! Fast turnaround, exceptional goldsmith skill.',
    productName: '24K Micron Gold Plating & Ultrasonic Polishing Service',
    productId: 'gold-plating-polishing-service',
    verifiedBuyer: true,
    helpfulCount: 39,
    tags: ['Gold Plating Specialist', 'Jewellery Polishing', 'Fast Turnaround', 'NRI Trusted']
  },
  {
    id: 'rev-4',
    author: 'Manjit Dhillon',
    location: 'Hadiabad, Phagwara',
    rating: 5,
    date: 'June 22, 2026',
    title: 'Authentic 916 Hallmark & Personalised Goldsmith Attention',
    comment: 'Have been buying from Shri Guru Kirpa for years. Whether it is small gold earrings or heavy wedding jewellery, they provide proper bills, certified hallmark, and direct interaction with the craftsman. The virtual try-on on their new website is a great touch!',
    productName: 'Amritsari Royal 22K Gold Jhumkas',
    productId: 'earrings-traditional-punjabi-jhumka',
    verifiedBuyer: true,
    customerPhoto: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800',
    helpfulCount: 33,
    tags: ['Traditional Jhumkas', 'Hallmarked 916', 'Trusted Local Jeweller']
  }
];

export const SPECIAL_COLLECTIONS: SpecialCollection[] = [
  {
    id: 'heritage-punjabi-gold',
    title: 'Heritage Punjabi Gold Collection',
    subtitle: 'Pure 22K Hallmarked Gold, Master Karigar Hand-Engraving',
    tagline: 'Solid Punjabi Kadas, heavy men’s rings, daily hallmarked chains, and traditional gold bangles.',
    description: 'Handcrafted in our Phagwara workshop using 91.6% pure BIS hallmarked gold. Each piece is chiseled with time-honored Punjabi motifs and finished with supreme durability for daily pride and festive grandeur.',
    heroImage: 'https://images.unsplash.com/photo-1611591475196-8579d46e31cb?auto=format&fit=crop&q=80&w=1600',
    accentColor: '#D4AF37',
    featuredProductIds: ['gold-royal-punjabi-kada', 'ring-mens-royal-punjabi-gold', 'gold-chain-mens-hallmarked-rope']
  },
  {
    id: 'royal-bridal-heritage',
    title: 'Royal Indian Bridal Heritage',
    subtitle: 'Grand Rani Haars, Chokers, Auspicious Mangalsutras & Jhumkas',
    tagline: 'Heirloom bridal sets customized directly to your required gold weight, budget, and family traditions.',
    description: 'Direct goldsmith consultation for brides and families. From multi-tier bridal haar to auspicious black-bead mangalsutras, crafted with genuine 22K gold and certified hallmark purity.',
    heroImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1600',
    accentColor: '#B8860B',
    featuredProductIds: ['necklace-bridal-rani-haar', 'necklace-gold-mangalsutra-pendant', 'earrings-traditional-punjabi-jhumka']
  },
  {
    id: 'goldsmith-plating-services',
    title: 'Specialised Goldsmith & Gold Plating Workshop',
    subtitle: 'Expert 24K Gold Electro-Plating, Polishing & Custom Jewellery Orders',
    tagline: 'Restore old heirlooms, electro-plate silver into gleaming 24K gold, and custom repair.',
    description: 'Phagwara’s renowned gold platter and repair destination. We offer fast 24 to 48-hour turnarounds for gold dip polish, laser soldering, resizing, and custom goldsmith fabrication.',
    heroImage: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=1600',
    accentColor: '#C5A059',
    featuredProductIds: ['gold-plating-polishing-service']
  }
];

