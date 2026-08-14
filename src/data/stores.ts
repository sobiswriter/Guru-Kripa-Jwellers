import { StoreLocation } from '../types';

export const STORES: StoreLocation[] = [
  {
    id: 'store-phagwara-main',
    name: 'Shri Guru Kirpa Gold Platters And Jewellers — Main Atelier',
    city: 'Phagwara, Punjab',
    country: 'India',
    region: 'Punjab & North India',
    address: 'Shop No. 15, Bansawala Bazar, Purani Tehsil, Sarafan Bazar Road, Phagwara, Punjab 144401, India',
    phone: '+91 75085 00417',
    email: 'info@shrigurukirpajewellers.com',
    hours: 'Monday – Saturday: 10:00 AM – 8:00 PM (Sunday: By Appointment)',
    timezone: 'Asia/Kolkata',
    coordinates: { lat: 31.2240, lng: 75.7708 },
    image: 'https://images.unsplash.com/photo-1611591475196-8579d46e31cb?auto=format&fit=crop&q=80&w=1000',
    isFlagship: true,
    specialties: [
      '22K / 24K BIS Hallmarked Gold Jewellery',
      'In-House Goldsmith & Custom Jewellery Design',
      'High-Shine Electro Gold Plating & Traditional Dip Polishing',
      'Custom Bridal Punjabi Jewellery & Heavy Kadas',
      'Transparent Gold Weighing & Direct Karigar Making'
    ],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Shop+No.+15,+Bansawala+Bazar,+Purani+Tehsil,+Sarafan+Bazar+Road,+Phagwara,+Punjab+144401'
  },
  {
    id: 'store-custom-orders-nri',
    name: 'NRI & Bespoke Custom Order Consultation Desk',
    city: 'Phagwara / Worldwide NRI Services',
    country: 'India',
    region: 'NRI Consultations',
    address: 'Shop No. 15, Bansawala Bazar, Sarafan Bazar Road, Phagwara, Punjab 144401',
    phone: '+91 75085 00417',
    email: 'custom@shrigurukirpajewellers.com',
    hours: 'Monday – Saturday: 10:00 AM – 8:00 PM IST (WhatsApp Video Consultation available)',
    timezone: 'Asia/Kolkata',
    coordinates: { lat: 31.2240, lng: 75.7708 },
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1000',
    isFlagship: false,
    specialties: [
      'NRI Wedding Orders (UK, Canada, USA, Australia)',
      'Custom Weight & Budget Design Consultations',
      'Express 48-Hour Gold Jewellery Polishing Service',
      'Fast Turnaround Hallmarked Custom Crafting'
    ],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Shop+No.+15,+Bansawala+Bazar,+Purani+Tehsil,+Sarafan+Bazar+Road,+Phagwara,+Punjab+144401'
  }
];

