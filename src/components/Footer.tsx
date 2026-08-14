import React from 'react';
import { MapPin, Phone, MessageCircle, ShieldCheck, Award, Clock, Star, Sparkles } from 'lucide-react';

interface FooterProps {
  onScrollToStores: () => void;
  onOpenAppointment: () => void;
  onOpenConcierge: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToStores,
  onOpenAppointment,
  onOpenConcierge
}) => {
  return (
    <footer className="bg-[#1C1A18] text-[#D1C7BA] border-t border-[#3D3730] font-serif">
      
      {/* Guarantees Bar */}
      <div className="border-b border-[#2E2A26] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs">
          <div className="space-y-1">
            <Award className="w-5 h-5 text-[#D4AF37] mx-auto" />
            <h5 className="font-bold text-[#FAF8F5] uppercase tracking-wider text-[11px]">BIS 916 Hallmarked</h5>
            <p className="text-[#A3988C] text-[10px] font-sans">Guaranteed 22K & 24K pure gold</p>
          </div>
          <div className="space-y-1">
            <Star className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37] mx-auto" />
            <h5 className="font-bold text-[#FAF8F5] uppercase tracking-wider text-[11px]">4.9★ Customer Rating</h5>
            <p className="text-[#A3988C] text-[10px] font-sans">Over 140+ verified local reviews</p>
          </div>
          <div className="space-y-1">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37] mx-auto" />
            <h5 className="font-bold text-[#FAF8F5] uppercase tracking-wider text-[11px]">In-House Goldsmith</h5>
            <p className="text-[#A3988C] text-[10px] font-sans">Custom karigari & quick turnaround</p>
          </div>
          <div className="space-y-1">
            <Sparkles className="w-5 h-5 text-[#D4AF37] mx-auto" />
            <h5 className="font-bold text-[#FAF8F5] uppercase tracking-wider text-[11px]">Gold Plating Lab</h5>
            <p className="text-[#A3988C] text-[10px] font-sans">24K electro-plating & ultrasonic polish</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs text-left">
        
        {/* Brand Column */}
        <div className="space-y-3">
          <h4 className="text-lg font-bold tracking-normal text-[#FAF8F5]">
            Shri Guru Kirpa Gold Platters And Jewellers
          </h4>
          <p className="text-[#D4AF37] text-[11px] font-medium">
            Local Jewellery Store & Master Goldsmith • Phagwara, Punjab
          </p>
          <p className="text-[#A3988C] leading-relaxed font-sans text-[11px]">
            Trusted local jeweller known for quality craftsmanship, personalised service, fair transparent gold rates, and quick custom order turnaround.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="px-2.5 py-1 bg-[#332E27] text-[#D4AF37] rounded-md text-[10px] font-bold border border-[#D4AF37]/30">
              4.9★ on Google Maps (140+ Reviews)
            </span>
          </div>
        </div>

        {/* Location & Contact Info */}
        <div className="space-y-2.5">
          <h5 className="text-[#FAF8F5] uppercase tracking-widest text-xs font-bold mb-3 text-[#D4AF37]">
            Store Location
          </h5>
          <div className="flex items-start gap-2 text-[#D1C7BA] font-sans text-[11px]">
            <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <span>
              Shop No. 15, Bansawala Bazar, Purani Tehsil, Sarafan Bazar Road, Phagwara, Punjab 144401, India
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#D1C7BA] font-sans text-[11px]">
            <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <a href="tel:+917508500417" className="hover:text-[#D4AF37] transition-colors font-medium">
              +91 75085 00417
            </a>
          </div>
          <div className="flex items-center gap-2 text-[#D1C7BA] font-sans text-[11px]">
            <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>Monday–Saturday: 10:00 AM – 8:00 PM</span>
          </div>
          <div className="pt-2">
            <a
              href="https://wa.me/917508500417?text=Hello%20Shri%20Guru%20Kirpa%20Jewellers,%20I%20would%20like%20to%20inquire%20about%20jewellery."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-sans font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Goldsmith Services Column */}
        <div className="space-y-2">
          <h5 className="text-[#FAF8F5] uppercase tracking-widest text-xs font-bold mb-3 text-[#D4AF37]">
            Goldsmith Services
          </h5>
          <ul className="space-y-1.5 text-[#A3988C] font-sans text-[11px]">
            <li>• Pure 22K & 24K Gold Jewellery</li>
            <li>• Custom Punjabi Kadas & Hand-Engraving</li>
            <li>• Bridal Rani Haar & Mangalsutra Sets</li>
            <li>• 24K Gold Electro-Plating on Silver & Brass</li>
            <li>• Jewellery Polishing & Ultrasonic Cleaning</li>
            <li>• Ring Resizing & Laser Soldering Repairs</li>
            <li>• Transparent Gold Weighing & Valuation</li>
          </ul>
        </div>

        {/* In-Store Visit & Consultation */}
        <div className="space-y-3">
          <h5 className="text-[#FAF8F5] uppercase tracking-widest text-xs font-bold text-[#D4AF37]">
            Visit or Consultation
          </h5>
          <p className="text-[#A3988C] text-[11px] font-sans">
            Planning a wedding or custom gold design? Book a personalized consultation with our master goldsmith or call directly for daily gold rates.
          </p>
          <div className="space-y-2">
            <button
              onClick={onOpenAppointment}
              className="w-full py-2 bg-[#9D825E] hover:bg-[#886F4E] text-white font-bold rounded-lg text-xs transition-colors"
            >
              Book In-Store Visit
            </button>
            <button
              onClick={onScrollToStores}
              className="w-full py-2 bg-transparent border border-[#3D3730] hover:border-[#9D825E] text-[#D1C7BA] rounded-lg text-xs transition-colors"
            >
              View Phagwara Map & Directions
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-[#2E2A26] py-5 text-center text-[10px] text-[#8C8276] font-sans">
        © 2026 Shri Guru Kirpa Gold Platters And Jewellers. All rights reserved. Shop No. 15, Bansawala Bazar, Phagwara, Punjab.
      </div>

    </footer>
  );
};

