import React from 'react';
import { Eye, ZoomIn, Calendar, Sparkles, ShieldCheck, Award } from 'lucide-react';
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
    <section className="relative bg-[#1a1817] text-white overflow-hidden py-16 md:py-24 border-b border-amber-900/30">
      
      {/* Soft Glow Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400/15 border border-amber-500/30 rounded-full text-amber-300 text-xs font-serif uppercase tracking-widest font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Maison Haute Joaillerie 2026
            </span>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-serif font-medium leading-[1.15] text-amber-100">
              Timeless Fire. <br />
              <span className="italic font-light text-amber-400">Virtual Precision.</span>
            </h1>

            <p className="text-stone-300 text-sm md:text-base leading-relaxed max-w-xl font-light">
              Discover certified conflict-free solitaire diamonds, Muzo emeralds, and unheated Ceylon sapphires. Try on any ring or necklace on your own hand using our live AR fitting camera.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onOpenTryOn}
                className="px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-full font-serif font-bold text-sm transition-all shadow-xl flex items-center gap-2.5"
              >
                <Eye className="w-4 h-4" /> Launch Live AR Virtual Try-On
              </button>

              <button
                onClick={onOpenAppointment}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-stone-200 border border-white/20 rounded-full font-serif text-sm font-medium transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-400" /> Book Salon Visit
              </button>
            </div>

            {/* Brand Trust Badges */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-xs text-stone-400">
              <div>
                <span className="text-amber-300 font-serif font-bold block text-sm">GIA Certified</span>
                <span className="text-[11px]">D-Flawless Diamonds</span>
              </div>
              <div>
                <span className="text-amber-300 font-serif font-bold block text-sm">AR Fitting</span>
                <span className="text-[11px]">Real-Time Hand & Neck</span>
              </div>
              <div>
                <span className="text-amber-300 font-serif font-bold block text-sm">Armored Delivery</span>
                <span className="text-[11px]">Full Value Insured</span>
              </div>
            </div>
          </div>

          {/* Right Hero Product Card Showcase */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md bg-stone-900/80 rounded-2xl p-6 border border-amber-500/30 shadow-2xl backdrop-blur-md group">
              
              <div className="relative h-80 rounded-xl overflow-hidden mb-4 bg-stone-950 border border-stone-800">
                <img
                  src={heroProduct.mainImage}
                  alt={heroProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating AR Try-On & Loupe Badge Overlays */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <button
                    onClick={() => onOpenLoupe(heroProduct)}
                    className="p-2 bg-black/70 hover:bg-black text-amber-300 rounded-full backdrop-blur-md border border-amber-500/30 shadow-lg transition-transform hover:scale-110"
                    title="10x High-Res Diamond Loupe"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/30 text-[11px] text-amber-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>2.50ct D-Flawless Platinum Ring</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-serif uppercase tracking-widest text-amber-400 font-bold block">
                    {heroProduct.collection}
                  </span>
                  <h3 className="font-serif text-xl font-medium text-white mt-0.5">
                    {heroProduct.name}
                  </h3>
                  <p className="text-amber-300 font-serif font-bold text-lg mt-1">
                    ${heroProduct.price.toLocaleString()} USD
                  </p>
                </div>

                <button
                  onClick={onOpenTryOn}
                  className="px-4 py-2 bg-amber-400 text-stone-950 font-serif text-xs font-bold rounded-full hover:bg-amber-300 transition-all shadow"
                >
                  Try On Now
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
