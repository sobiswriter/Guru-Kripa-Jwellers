import React, { useState } from 'react';
import { Eye, ZoomIn, Star, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { JewelryProduct, MetalType } from '../types';

interface ProductCardProps {
  product: JewelryProduct;
  onOpenTryOn: (product: JewelryProduct) => void;
  onOpenLoupe: (product: JewelryProduct) => void;
  onAddToCart: (product: JewelryProduct, metal: MetalType, size: string) => void;
  onSelectProduct: (product: JewelryProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenTryOn,
  onOpenLoupe,
  onAddToCart,
  onSelectProduct
}) => {
  const [selectedMetal, setSelectedMetal] = useState<MetalType>(
    product.metalsAvailable[0]?.type || 'platinum'
  );
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const secondImage = product.galleryImages?.[1] || product.mainImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setJustAdded(true);
    onAddToCart(product, selectedMetal, product.sizesAvailable?.[0] || 'Standard');
    setTimeout(() => setJustAdded(false), 800);
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-2xl border border-[#e6dfd5] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Image Container */}
        <div className="relative h-72 bg-stone-100 overflow-hidden">
          <img
            src={isHovered ? secondImage : product.mainImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isBestSeller && (
              <span className="px-2.5 py-1 bg-stone-900 text-amber-300 text-[10px] font-serif uppercase tracking-widest font-bold rounded-full shadow">
                Best Seller
              </span>
            )}
            {product.isNewArrival && (
              <span className="px-2.5 py-1 bg-amber-500 text-stone-950 text-[10px] font-serif uppercase tracking-widest font-bold rounded-full shadow">
                New Arrival
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
                className="p-2 bg-stone-900/90 hover:bg-stone-900 text-amber-300 rounded-full shadow-lg border border-amber-500/30 transition-transform hover:scale-110"
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
              className="p-2 bg-white/90 hover:bg-white text-stone-900 rounded-full shadow-lg border border-[#e6dfd5] transition-transform hover:scale-110"
              title="10x High-Res Diamond Loupe"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Gemstone Tag overlay */}
          <div className="absolute bottom-3 left-3 right-3 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#e6dfd5] text-[11px] text-stone-800 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span>{product.gemstoneSpec.carat}ct {product.gemstoneSpec.cut}</span>
            <span className="text-amber-800 font-bold">{product.gemstoneSpec.clarity}</span>
          </div>
        </div>

        {/* Details Content */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-serif uppercase tracking-widest text-amber-800 font-bold">
              {product.collection}
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-stone-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-serif text-base font-semibold text-stone-900 leading-snug group-hover:text-amber-800 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 mt-1 line-clamp-1 font-serif">
            {product.subtitle}
          </p>

          {/* Metal Finish Dots Selector */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
              {product.metalsAvailable.map(metal => (
                <button
                  key={metal.type}
                  onClick={() => setSelectedMetal(metal.type)}
                  title={metal.label}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    selectedMetal === metal.type ? 'ring-2 ring-amber-600 scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: metal.hexColor }}
                />
              ))}
            </div>

            <div className="text-right">
              <span className="font-serif text-base font-bold text-stone-900">
                ${product.price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 pb-5 pt-1">
        <button
          onClick={handleQuickAdd}
          disabled={justAdded}
          className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-amber-200 text-xs font-serif font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
        >
          {justAdded ? (
            <span className="flex items-center gap-1 text-emerald-300"><Check className="w-3.5 h-3.5" /> Added to Bag</span>
          ) : (
            <span className="flex items-center gap-1"><ShoppingBag className="w-3.5 h-3.5 text-amber-400" /> Add to Shopping Bag</span>
          )}
        </button>
      </div>

    </div>
  );
};
