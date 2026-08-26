import React from 'react';
import { Eye, ZoomIn, Calendar, Sparkles, ShieldCheck, Award, Phone, MessageCircle, Star, MapPin } from 'lucide-react';
import { JewelryProduct } from '../types';

interface HeroBannerProps {
  onOpenTryOn: () => void;
  onOpenAppointment: () => void;
  onOpenLoupe: (product: JewelryProduct) => void;
  heroProduct: JewelryProduct;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenTryOn,
  onOpenAppointment,
  onOpenLoupe,
  heroProduct
}) => {
  return (
    <section className="relative bg-[#201D1A] text-[#FAF8F5] overflow-hidden py-14 md:py-20 border-b border-[#3D3730]">
      
      {/* Warm Ambient Glow Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#9D825E]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#332E27] border border-[#D4AF37]/40 rounded-full text-[#E8DCC4] text-xs font-serif font-medium shadow-sm">
              <span className="flex items-center text-[#D4AF37] font-bold">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37] mr-1" /> 4.9★
              </span>
              <span className="text-[#9D825E]">•</span>
              <span>140+ Customer Reviews in Phagwara</span>
              <span className="text-[#9D825E]">•</span>
              <span className="text-[#D4AF37] font-semibold">BIS 916 Hallmarked</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-serif font-medium leading-[1.15] text-[#FAF8F5] tracking-tight">
              Timeless Jewellery, <br />
              <span className="italic font-light text-[#D4AF37]">Crafted With Care.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#D1C7BA] text-sm sm:text-base leading-relaxed max-w-xl font-light font-sans">
              Quality 22K gold jewellery, custom bridal designs, and personalised goldsmith services from your trusted local jeweller in Phagwara. Fast custom order turnaround, transparent gold weighing, and 24K gold plating.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="tel:+917508500417"
                className="px-6 py-3.5 bg-[#9D825E] hover:bg-[#886F4E] text-white rounded-full font-serif font-bold text-sm transition-all shadow-lg flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> Call Store: +91 75085 00417
              </a>

              <a
                href="https://wa.me/917508500417?text=Hello%20Shri%20Guru%20Kirpa%20Jewellers,%20I%20would%20like%20to%20inquire%20about%20gold%20designs%20and%20making%20charges."
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-full font-serif font-bold text-sm transition-all shadow-lg flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>

              <button
                onClick={onOpenAppointment}
                className="px-5 py-3.5 bg-[#D4AF37] hover:bg-[#C5A059] text-[#201D1A] rounded-full font-serif text-sm font-bold transition-all flex items-center gap-2 shadow-lg"
              >
                <Calendar className="w-4 h-4 text-[#201D1A]" /> Book In-Store Visit
              </button>

              <button
                onClick={onOpenTryOn}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-[#FAF8F5] border border-white/25 rounded-full font-serif text-sm font-medium transition-all flex items-center gap-2"
              >
                <Eye className="w-4 h-4 text-[#D4AF37]" /> AR Virtual Try-On
              </button>
            </div>

            {/* Business Trust Badges */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#B8AEA2]">
              <div>
                <span className="text-[#D4AF37] font-serif font-bold block text-sm">BIS 916 Hallmark</span>
                <span className="text-[11px]">Guaranteed 22K Gold Purity</span>
              </div>
              <div>
                <span className="text-[#D4AF37] font-serif font-bold block text-sm">In-House Karigar</span>
                <span className="text-[11px]">Custom Jewellery & Resizing</span>
              </div>
              <div>
                <span className="text-[#D4AF37] font-serif font-bold block text-sm">Gold Plating Lab</span>
                <span className="text-[11px]">24K Dip & Mirror Polish</span>
              </div>
              <div>
                <span className="text-[#D4AF37] font-serif font-bold block text-sm">Bansawala Bazar</span>
                <span className="text-[11px]">Shop No. 15, Phagwara</span>
              </div>
            </div>
          </div>

          {/* Right Hero Product Card Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-[#2B2622] rounded-2xl p-6 border border-[#9D825E]/40 shadow-2xl backdrop-blur-md group text-left">
              
              <div className="relative h-72 rounded-xl overflow-hidden mb-4 bg-stone-950 border border-stone-800">
                <img
                  src={heroProduct.mainImage}
                  alt={heroProduct.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=1200';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating AR Try-On & Loupe Badge Overlays */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <button
                    onClick={() => onOpenLoupe(heroProduct)}
                    className="p-2 bg-black/70 hover:bg-black text-[#D4AF37] rounded-full backdrop-blur-md border border-[#D4AF37]/40 shadow-lg transition-transform hover:scale-110"
                    title="10x Macro Hallmark & Karigari Loupe"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#D4AF37]/30 text-[11px] text-[#E8DCC4] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>22K BIS 916 • 24.50 grams</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-serif uppercase tracking-widest text-[#D4AF37] font-bold block">
                    {heroProduct.collection}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-white mt-0.5">
                    {heroProduct.name}
                  </h3>
                  <p className="text-[#D4AF37] font-serif font-bold text-lg mt-1">
                    ₹{heroProduct.price.toLocaleString('en-IN')}
                  </p>
                </div>

                <button
                  onClick={onOpenAppointment}
                  className="px-4 py-2 bg-[#D4AF37] hover:bg-[#C5A059] text-stone-950 font-serif text-xs font-bold rounded-full transition-all shadow flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" /> Book Visit
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

