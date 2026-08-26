import React, { useState } from 'react';
import { Eye, ZoomIn, Star, Calendar, MessageCircle, ShieldCheck } from 'lucide-react';
import { JewelryProduct, MetalType } from '../types';

interface ProductCardProps {
  product: JewelryProduct;
  onOpenTryOn: (product: JewelryProduct) => void;
  onOpenLoupe: (product: JewelryProduct) => void;
  onOpenAppointment: (product: JewelryProduct) => void;
  onSelectProduct: (product: JewelryProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenTryOn,
  onOpenLoupe,
  onOpenAppointment,
  onSelectProduct
}) => {
  const [selectedMetal, setSelectedMetal] = useState<MetalType>(
    product.metalsAvailable[0]?.type || '22k-yellow-gold'
  );
  const [isHovered, setIsHovered] = useState(false);

  const secondImage = product.galleryImages?.[1] || product.mainImage;

  const whatsappUrl = `https://wa.me/917508500417?text=${encodeURIComponent(
    `Hello Shri Guru Kirpa Jewellers, I would like to inquire about "${product.name}" (${product.purity || '22K Gold'}, Approx ₹${product.price.toLocaleString('en-IN')}). Is this piece currently available to view at your Phagwara shop?`
  )}`;

  return (
    <div
      onClick={() => onSelectProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-2xl border border-[#E8E1D5] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer text-left"
    >
      <div>
        {/* Image Container */}
        <div className="relative h-72 bg-[#F4EFE6] overflow-hidden">
          <img
            src={isHovered ? secondImage : product.mainImage}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=1200';
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isBestSeller && (
              <span className="px-2.5 py-1 bg-[#2D2926] text-[#D4AF37] text-[10px] font-serif uppercase tracking-wider font-bold rounded-full shadow">
                Customer Favorite
              </span>
            )}
            {product.isNewArrival && (
              <span className="px-2.5 py-1 bg-[#9D825E] text-white text-[10px] font-serif uppercase tracking-wider font-bold rounded-full shadow">
                New Design
              </span>
            )}
            {product.purity && (
              <span className="px-2 py-0.5 bg-[#FAF8F5]/90 text-[#5C4524] text-[9px] font-serif font-bold rounded-md border border-[#D9C49A]">
                {product.purity}
              </span>
            )}
          </div>

          {/* Quick Action Overlay Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
            {product.tryOnType && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenTryOn(product);
                }}
                className="p-2 bg-[#2D2926]/90 hover:bg-[#2D2926] text-[#D4AF37] rounded-full shadow-lg border border-[#D4AF37]/40 transition-transform hover:scale-110"
                title="Virtual Try-On"
              >
                <Eye className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenLoupe(product);
              }}
              className="p-2 bg-white/95 hover:bg-white text-[#2D2926] rounded-full shadow-lg border border-[#E8E1D5] transition-transform hover:scale-110"
              title="10x Macro Hallmark & Karigari Loupe"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Weight / Spec Tag overlay */}
          <div className="absolute bottom-3 left-3 right-3 bg-[#FAF8F5]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E8E1D5] text-[11px] text-[#2D2926] flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="font-medium">{product.goldWeight || product.gemstoneSpec.type}</span>
            <span className="text-[#9D825E] font-bold">916 Hallmark</span>
          </div>
        </div>

        {/* Details Content */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-serif uppercase tracking-wider text-[#9D825E] font-bold">
              {product.collection}
            </span>
            <div className="flex items-center gap-1 text-xs text-[#D4AF37] font-bold">
              <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
              <span>{product.rating}</span>
              <span className="text-stone-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-serif text-base font-semibold text-[#2D2926] leading-snug group-hover:text-[#9D825E] transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-[#7A7067] mt-1 line-clamp-1 font-sans">
            {product.subtitle}
          </p>

          {/* Metal Finish Dots Selector & Price */}
          <div className="mt-3.5 flex items-center justify-between">
            <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
              {product.metalsAvailable.map(metal => (
                <button
                  key={metal.type}
                  onClick={() => setSelectedMetal(metal.type)}
                  title={metal.label}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    selectedMetal === metal.type ? 'ring-2 ring-[#9D825E] scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: metal.hexColor }}
                />
              ))}
            </div>

            <div className="text-right">
              <span className="font-serif text-base font-bold text-[#2D2926]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer: Visit & Contact buttons */}
      <div className="px-5 pb-5 pt-1 grid grid-cols-2 gap-2" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => onOpenAppointment(product)}
          className="w-full py-2.5 bg-[#9D825E] hover:bg-[#886F4E] text-white text-xs font-serif font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
        >
          <Calendar className="w-3.5 h-3.5" /> Book Visit
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-serif font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 text-center"
        >
          <MessageCircle className="w-3.5 h-3.5" /> Inquire
        </a>
      </div>

    </div>
  );
};

