import React, { useState } from 'react';
import { ShoppingBag, Eye, Calendar, MapPin, Sparkles, Phone, MessageCircle, Menu, X, Star, ShieldCheck } from 'lucide-react';
import { JewelryCategory } from '../types';

interface HeaderProps {
  activeCategory: JewelryCategory | 'all' | 'collections';
  onSelectCategory: (cat: JewelryCategory | 'all' | 'collections') => void;
  onOpenTryOn: () => void;
  onOpenAppointment: () => void;
  onOpenConcierge: () => void;
  onScrollToStores: () => void;
  onScrollToReviews: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenTryOn,
  onOpenAppointment,
  onOpenConcierge,
  onScrollToStores,
  onScrollToReviews
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories: Array<{ id: JewelryCategory | 'all' | 'collections'; label: string }> = [
    { id: 'all', label: 'All Jewellery' },
    { id: 'kadas', label: 'Punjabi Kadas' },
    { id: 'necklaces', label: 'Necklaces & Bridal Sets' },
    { id: 'rings', label: 'Gold Rings' },
    { id: 'earrings', label: 'Jhumkas & Tops' },
    { id: 'polishing-services', label: 'Gold Plating & Polish' },
    { id: 'collections', label: 'Heritage Collections' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E1D5] transition-all">
      
      {/* Top Ticker Announcement with Local Details */}
      <div className="bg-[#2D2926] text-[#E8DCC4] text-[11px] py-1.5 px-4 font-serif flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-[#D4AF37] font-semibold">
              <Star className="w-3 h-3 fill-[#D4AF37]" /> 4.9★ (140+ Reviews)
            </span>
            <span className="hidden sm:inline text-stone-400">•</span>
            <span className="hidden sm:inline text-stone-300">
              Shop No. 15, Bansawala Bazar, Sarafan Bazar Road, Phagwara
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-sans">
            <a
              href="tel:+917508500417"
              className="text-[#D4AF37] hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
            >
              <Phone className="w-3 h-3" /> +91 75085 00417
            </a>
            <span className="hidden md:inline text-stone-500">|</span>
            <span className="hidden md:inline text-stone-300 text-[11px]">
              Mon–Sat: 10:00 AM – 8:00 PM
            </span>
          </div>
        </div>
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
              className="group flex flex-col text-left"
            >
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2D2926] group-hover:text-[#9D825E] transition-colors leading-tight">
                Shri Guru Kirpa
              </span>
              <span className="text-[10px] sm:text-[11px] font-serif tracking-widest text-[#9D825E] uppercase font-semibold">
                Gold Platters & Jewellers • Phagwara
              </span>
            </a>
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* WhatsApp Quick Direct Enquiry */}
            <a
              href="https://wa.me/917508500417?text=Hello%20Shri%20Guru%20Kirpa%20Jewellers,%20I%20am%20interested%20in%20your%20gold%20jewellery%20and%20polishing%20services."
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-full text-xs font-serif font-semibold transition-all items-center gap-1.5 shadow-sm"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* AI Goldsmith Concierge */}
            <button
              onClick={onOpenConcierge}
              className="px-3 py-1.5 bg-[#FAF3E0] hover:bg-[#F3E8CB] text-[#5C4524] rounded-full text-xs font-serif font-semibold border border-[#D9C49A] transition-all flex items-center gap-1.5 shadow-sm"
              title="AI Goldsmith Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#9D825E]" />
              <span className="hidden md:inline">Karigar Assistant</span>
            </button>

            {/* Virtual Try-On Launch */}
            <button
              onClick={onOpenTryOn}
              className="px-3.5 py-1.5 bg-[#2D2926] hover:bg-[#1A1817] text-[#D4AF37] rounded-full text-xs font-serif font-semibold transition-all flex items-center gap-1.5 shadow-md"
            >
              <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Live Try-On</span>
            </button>

            {/* Book In-Store Visit */}
            <button
              onClick={onOpenAppointment}
              className="px-4 py-2 bg-[#9D825E] hover:bg-[#886F4E] text-white rounded-full text-xs font-serif font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Visit</span>
            </button>
          </div>

        </div>

        {/* Desktop Category Navigation Bar */}
        <nav className="hidden lg:flex items-center justify-center space-x-7 py-3 border-t border-[#E8E1D5] text-xs font-serif tracking-wider">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`pb-1 transition-all relative ${
                activeCategory === cat.id
                  ? 'text-[#2D2926] font-bold border-b-2 border-[#9D825E]'
                  : 'text-[#665E55] hover:text-[#2D2926]'
              }`}
            >
              {cat.label}
            </button>
          ))}

          <button
            onClick={onScrollToStores}
            className="text-[#665E55] hover:text-[#9D825E] transition-colors flex items-center gap-1"
          >
            <MapPin className="w-3 h-3 text-[#9D825E]" /> Visit Phagwara Shop
          </button>

          <button
            onClick={onScrollToReviews}
            className="text-[#665E55] hover:text-[#9D825E] transition-colors flex items-center gap-1"
          >
            <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" /> Customer Reviews (4.9★)
          </button>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#E8E1D5] space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs font-serif">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-lg text-left ${
                    activeCategory === cat.id
                      ? 'bg-[#F4EFE6] text-[#2D2926] font-bold border border-[#9D825E]'
                      : 'bg-white text-stone-700 border border-[#E8E1D5]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href="tel:+917508500417"
                className="w-full p-2.5 bg-[#9D825E] text-white rounded-lg text-xs font-serif font-bold flex items-center gap-2 justify-center shadow"
              >
                <Phone className="w-4 h-4" /> Call Store: +91 75085 00417
              </a>
              <button
                onClick={() => {
                  onScrollToStores();
                  setMobileMenuOpen(false);
                }}
                className="w-full p-2.5 bg-white border border-[#E8E1D5] rounded-lg text-xs font-serif text-stone-800 flex items-center gap-2 justify-center"
              >
                <MapPin className="w-4 h-4 text-[#9D825E]" /> Shop No. 15, Bansawala Bazar, Phagwara
              </button>
              <button
                onClick={() => {
                  onOpenAppointment();
                  setMobileMenuOpen(false);
                }}
                className="w-full p-2.5 bg-[#2D2926] text-[#D4AF37] rounded-lg text-xs font-serif flex items-center gap-2 justify-center"
              >
                <Calendar className="w-4 h-4" /> Book Goldsmith Consultation
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};

