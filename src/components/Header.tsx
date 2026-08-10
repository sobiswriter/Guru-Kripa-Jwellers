import React, { useState } from 'react';
import { ShoppingBag, Eye, Calendar, MapPin, Sparkles, Search, Menu, X, Star } from 'lucide-react';
import { JewelryCategory } from '../types';

interface HeaderProps {
  activeCategory: JewelryCategory | 'all' | 'collections';
  onSelectCategory: (cat: JewelryCategory | 'all' | 'collections') => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenTryOn: () => void;
  onOpenAppointment: () => void;
  onOpenConcierge: () => void;
  onScrollToStores: () => void;
  onScrollToReviews: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  onOpenTryOn,
  onOpenAppointment,
  onOpenConcierge,
  onScrollToStores,
  onScrollToReviews
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories: Array<{ id: JewelryCategory | 'all' | 'collections'; label: string }> = [
    { id: 'all', label: 'All Joaillerie' },
    { id: 'rings', label: 'Rings & Solitaires' },
    { id: 'necklaces', label: 'Necklaces & Pendants' },
    { id: 'earrings', label: 'Earrings' },
    { id: 'bracelets', label: 'Bracelets' },
    { id: 'watches', label: 'High Watchmaking' },
    { id: 'collections', label: 'Special Collections' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#fdfbf7]/95 backdrop-blur-md border-b border-[#e6dfd5] transition-all">
      
      {/* Top Ticker Announcement */}
      <div className="bg-stone-900 text-amber-200 text-[11px] py-1.5 px-4 text-center font-serif tracking-widest uppercase flex items-center justify-center gap-4">
        <span>✨ Experience Live AR Virtual Try-On For Rings & Necklaces</span>
        <span className="hidden md:inline text-amber-500">•</span>
        <span className="hidden md:inline">Complimentary Armored Courier Shipping Worldwide</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-800 hover:text-stone-950"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
              }}
              className="group flex flex-col"
            >
              <span className="font-serif text-2xl tracking-[0.25em] text-stone-900 uppercase font-bold group-hover:text-amber-700 transition-colors">
                AURA & CARAT
              </span>
              <span className="text-[9px] font-serif tracking-[0.4em] text-amber-800 uppercase text-center -mt-1 font-semibold">
                Haute Joaillerie Paris
              </span>
            </a>
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* AI Concierge Trigger */}
            <button
              onClick={onOpenConcierge}
              className="px-3.5 py-1.5 bg-amber-100/70 hover:bg-amber-200/80 text-amber-950 rounded-full text-xs font-serif font-semibold border border-amber-300 transition-all flex items-center gap-1.5 shadow-sm"
              title="AI Style Concierge"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
              <span className="hidden sm:inline">Aura Concierge</span>
            </button>

            {/* Virtual Try-On Launch */}
            <button
              onClick={onOpenTryOn}
              className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-amber-300 rounded-full text-xs font-serif font-semibold transition-all flex items-center gap-1.5 shadow-md"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Virtual Try-On</span>
            </button>

            {/* Book Appointment Shortcut */}
            <button
              onClick={onOpenAppointment}
              className="hidden md:flex px-3.5 py-1.5 bg-white border border-[#e6dfd5] text-stone-800 hover:border-amber-400 rounded-full text-xs font-serif font-medium transition-all items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              <span>Book Salon Visit</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-stone-800 hover:text-amber-800 transition-colors"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-amber-500 text-stone-950 rounded-full text-[10px] font-bold flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Desktop Category Navigation Bar */}
        <nav className="hidden lg:flex items-center justify-center space-x-8 py-3 border-t border-[#e6dfd5]/60 text-xs font-serif uppercase tracking-widest">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`pb-1 transition-all relative ${
                activeCategory === cat.id
                  ? 'text-stone-900 font-bold border-b-2 border-amber-600'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}

          <button
            onClick={onScrollToStores}
            className="text-stone-600 hover:text-amber-800 transition-colors flex items-center gap-1"
          >
            <MapPin className="w-3 h-3 text-amber-700" /> Boutique Locator
          </button>

          <button
            onClick={onScrollToReviews}
            className="text-stone-600 hover:text-amber-800 transition-colors flex items-center gap-1"
          >
            <Star className="w-3 h-3 text-amber-500 fill-amber-400" /> Reviews
          </button>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#e6dfd5] space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs font-serif uppercase tracking-wider">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-lg text-left ${
                    activeCategory === cat.id
                      ? 'bg-amber-100 text-amber-950 font-bold'
                      : 'bg-white text-stone-700 border border-[#e6dfd5]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  onScrollToStores();
                  setMobileMenuOpen(false);
                }}
                className="w-full p-2.5 bg-white border border-[#e6dfd5] rounded-lg text-xs font-serif text-stone-800 flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-amber-700" /> Global Store Locator
              </button>
              <button
                onClick={() => {
                  onOpenAppointment();
                  setMobileMenuOpen(false);
                }}
                className="w-full p-2.5 bg-stone-900 text-amber-300 rounded-lg text-xs font-serif flex items-center gap-2 justify-center"
              >
                <Calendar className="w-4 h-4" /> Book VIP Salon Consultation
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
