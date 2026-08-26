import React, { useState } from 'react';
import { JewelryProduct, JewelryCategory } from '../types';
import { PRODUCTS } from '../data/products';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Calendar, 
  Sparkles, 
  ChevronRight, 
  X, 
  Check, 
  Search, 
  Star,
  Award,
  Layers,
  Info,
  ArrowRight,
  Gift
} from 'lucide-react';

interface MobileSimplifiedViewProps {
  onOpenAppointment?: (product?: JewelryProduct) => void;
}

export const MobileSimplifiedView: React.FC<MobileSimplifiedViewProps> = () => {
  const [activeTab, setActiveTab] = useState<'collection' | 'book' | 'info'>('collection');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<JewelryProduct | null>(null);

  // Booking form state
  const [serviceType, setServiceType] = useState('Punjabi Kada Fitting & Purchase');
  const [bookingDate, setBookingDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [bookingTime, setBookingTime] = useState('11:00 AM - 01:00 PM (Morning)');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [preselectedItem, setPreselectedItem] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Filter products
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCat = 
      selectedCategory === 'all' 
        ? true 
        : selectedCategory === 'kadas' 
          ? p.category === 'kadas' || p.category === 'bracelets'
          : selectedCategory === 'bridal' 
            ? p.category === 'necklaces' || p.isSpecialCollection
            : p.category === selectedCategory;

    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.purity && p.purity.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  const handleStartBookingForProduct = (prod: JewelryProduct) => {
    setPreselectedItem(prod.name);
    setServiceType(`Inquire / Try: ${prod.name}`);
    setSelectedProduct(null);
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;
    setBookingConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D2926] pb-24 font-sans antialiased">
      
      {/* Top Mobile Store Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E1D5] px-4 py-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#9D825E] text-white flex items-center justify-center font-serif font-bold text-xs shadow-xs">
              SGK
            </div>
            <div>
              <h1 className="font-serif font-bold text-sm tracking-wide text-[#2D2926] leading-tight">
                Shri Guru Kirpa Jewellers
              </h1>
              <p className="text-[10px] text-[#665E55] flex items-center gap-1 font-medium">
                <MapPin className="w-2.5 h-2.5 text-[#9D825E]" /> Bansawala Bazar, Phagwara
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:+917508500417"
              className="p-2 rounded-full bg-[#FAF3E0] text-[#9D825E] border border-[#D9C49A] hover:bg-[#9D825E] hover:text-white transition-colors"
              title="Call Store"
              aria-label="Call Store"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/917508500417?text=Hello%20Shri%20Guru%20Kirpa%20Jewellers,%20I%20would%20like%20to%20inquire%20about%20gold%20designs%20and%20rates."
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-600 hover:text-white transition-colors"
              title="WhatsApp"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Verified Trust Strip */}
        <div className="flex items-center justify-between text-[11px] mt-2 pt-2 border-t border-[#F0EBE1] text-[#665E55]">
          <span className="flex items-center gap-1 font-medium">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <strong className="text-[#2D2926]">4.9★</strong> (140+ Google Reviews)
          </span>
          <span className="flex items-center gap-1 text-[#9D825E] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% BIS Hallmarked
          </span>
        </div>
      </header>

      {/* Main Top Tab Switcher */}
      <div className="px-4 pt-3 pb-1 bg-white border-b border-[#E8E1D5]">
        <div className="grid grid-cols-3 p-1 bg-[#FAF3E0] rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('collection')}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'collection'
                ? 'bg-white text-[#2D2926] shadow-xs font-bold'
                : 'text-[#665E55] hover:text-[#2D2926]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#9D825E]" />
            <span>Collection</span>
          </button>

          <button
            onClick={() => setActiveTab('book')}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'book'
                ? 'bg-white text-[#2D2926] shadow-xs font-bold'
                : 'text-[#665E55] hover:text-[#2D2926]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#9D825E]" />
            <span>Book Visit</span>
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'info'
                ? 'bg-white text-[#2D2926] shadow-xs font-bold'
                : 'text-[#665E55] hover:text-[#2D2926]'
            }`}
          >
            <Info className="w-3.5 h-3.5 text-[#9D825E]" />
            <span>Store Info</span>
          </button>
        </div>
      </div>

      {/* TAB 1: COLLECTION BROWSER */}
      {activeTab === 'collection' && (
        <div className="p-4 space-y-4">
          
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Kadas, bridal sets, rings, polishing..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E8E1D5] rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#9D825E]/40"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Chips Scroll */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none text-xs">
            {[
              { id: 'all', label: 'All Designs' },
              { id: 'kadas', label: '👑 Punjabi Kadas' },
              { id: 'bridal', label: '📿 Bridal Sets & Necklaces' },
              { id: 'rings', label: '💍 Gold Rings' },
              { id: 'earrings', label: '✨ Jhumkas' },
              { id: 'polishing-services', label: '🌟 Gold Plating' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#2D2926] text-white shadow-xs'
                    : 'bg-white text-[#665E55] border border-[#E8E1D5] hover:border-[#9D825E]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product Cards List */}
          <div className="space-y-3.5">
            {filteredProducts.map(prod => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-[#E8E1D5] overflow-hidden shadow-xs hover:border-[#9D825E]/60 transition-all flex flex-col"
              >
                <div className="flex p-3 gap-3">
                  {/* Thumbnail Image */}
                  <div 
                    onClick={() => setSelectedProduct(prod)}
                    className="relative w-28 h-28 rounded-xl overflow-hidden bg-stone-100 shrink-0 cursor-pointer border border-[#F0EBE1]"
                  >
                    <img
                      src={prod.mainImage}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=600';
                      }}
                      className="w-full h-full object-cover"
                    />
                    {prod.purity && (
                      <span className="absolute bottom-1 left-1 bg-black/75 text-[#D4AF37] text-[9px] font-bold px-1.5 py-0.5 rounded-md backdrop-blur-xs font-serif">
                        {prod.purity.includes('22K') ? '22K 916' : prod.purity.includes('24K') ? '24K Gold' : 'Gold Plated'}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-[10px] text-[#9D825E] font-bold uppercase tracking-wider font-serif">
                        <span>{prod.category}</span>
                        <span>•</span>
                        <span>{prod.goldWeight || prod.gemstoneSpec.type}</span>
                      </div>
                      
                      <h3 
                        onClick={() => setSelectedProduct(prod)}
                        className="font-serif font-bold text-sm text-[#2D2926] leading-snug line-clamp-2 mt-0.5 cursor-pointer"
                      >
                        {prod.name}
                      </h3>

                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-base font-bold text-[#2D2926] font-serif">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                        {prod.originalPrice && (
                          <span className="text-[11px] text-stone-400 line-through">
                            ₹{prod.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedProduct(prod)}
                      className="text-[11px] text-[#9D825E] font-semibold flex items-center gap-1 hover:underline mt-1"
                    >
                      View Details & Specs <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Quick Action Footer on Card */}
                <div className="grid grid-cols-2 border-t border-[#F0EBE1] bg-[#FAF8F5] p-2 gap-2 text-xs">
                  <button
                    onClick={() => handleStartBookingForProduct(prod)}
                    className="py-2 px-2 bg-[#9D825E] hover:bg-[#886F4E] text-white rounded-xl font-bold flex items-center justify-center gap-1 shadow-xs transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Visit</span>
                  </button>

                  <a
                    href={`https://wa.me/917508500417?text=Hello%20Shri%20Guru%20Kirpa%20Jewellers,%20I%20am%20interested%20in%20${encodeURIComponent(prod.name)}%20(₹${prod.price.toLocaleString('en-IN')}).`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-2 bg-white text-emerald-800 border border-emerald-300 rounded-xl font-semibold flex items-center justify-center gap-1 hover:bg-emerald-50 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-[#E8E1D5] p-6">
                <Search className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                <p className="font-serif font-bold text-base text-[#2D2926]">No jewellery designs found</p>
                <p className="text-xs text-[#665E55] mt-1">Try clearing your search or switching categories.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="mt-4 px-4 py-2 bg-[#2D2926] text-white rounded-xl text-xs font-semibold"
                >
                  View All Designs
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: SIMPLE VISIT BOOKING */}
      {activeTab === 'book' && (
        <div className="p-4 space-y-4">
          
          <div className="bg-white rounded-2xl border border-[#E8E1D5] p-4 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#FAF3E0] text-[#9D825E] flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-base text-[#2D2926]">Book a Store Visit</h2>
                <p className="text-[11px] text-[#665E55]">Meet our master goldsmith at Bansawala Bazar, Phagwara</p>
              </div>
            </div>

            {bookingConfirmed ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
                  <Check className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2D2926]">Store Visit Requested!</h3>
                  <p className="text-xs text-[#665E55] mt-1">
                    Thank you <strong className="text-[#2D2926]">{customerName}</strong>. We look forward to welcoming you on <strong className="text-[#2D2926]">{bookingDate}</strong> ({bookingTime.split(' ')[0]} {bookingTime.split(' ')[1]}).
                  </p>
                </div>

                <div className="p-3.5 bg-[#FAF3E0] rounded-xl border border-[#D9C49A] text-left text-xs space-y-1.5 text-[#5C4524]">
                  <p className="flex justify-between">
                    <span className="text-[#665E55]">Service / Item:</span>
                    <strong className="text-[#2D2926]">{serviceType}</strong>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-[#665E55]">Store Location:</span>
                    <strong className="text-[#2D2926]">Shop No. 15, Bansawala Bazar, Phagwara</strong>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-[#665E55]">Contact:</span>
                    <strong className="text-[#9D825E]">+91 75085 00417</strong>
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={`https://wa.me/917508500417?text=Hello%20Shri%20Guru%20Kirpa%20Jewellers,%20I%20have%20booked%20a%20store%20visit%20for%20${encodeURIComponent(customerName)}%20on%20${bookingDate}%20(${encodeURIComponent(bookingTime)})%20for%20${encodeURIComponent(serviceType)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Booking to WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setBookingConfirmed(false);
                      setCustomerName('');
                      setCustomerPhone('');
                      setPreselectedItem('');
                      setActiveTab('collection');
                    }}
                    className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-[#2D2926] rounded-xl font-semibold text-xs"
                  >
                    Explore More Designs
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-3.5 mt-4 text-xs">
                
                {preselectedItem && (
                  <div className="p-3 bg-[#FAF3E0] rounded-xl border border-[#D9C49A] flex items-center justify-between text-[#5C4524]">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#9D825E] block">Inquiring about</span>
                      <strong className="font-serif text-xs text-[#2D2926]">{preselectedItem}</strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreselectedItem('')}
                      className="text-xs text-stone-500 hover:text-stone-800 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Purpose of Visit */}
                <div>
                  <label className="block font-serif font-bold text-[#2D2926] mb-1">
                    Purpose of Visit *
                  </label>
                  <select
                    value={serviceType}
                    onChange={e => setServiceType(e.target.value)}
                    className="w-full bg-white border border-[#E8E1D5] rounded-xl p-2.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#9D825E]/40"
                  >
                    <option value="Punjabi Kada Fitting & Purchase">👑 Punjabi Kada Fitting & Purchase</option>
                    <option value="Custom Bridal Gold Jewellery Order">📿 Custom Bridal Gold Jewellery Order</option>
                    <option value="Gold / Silver Electroplating & Polishing">🌟 Gold / Silver Electroplating & Polishing</option>
                    <option value="Purity Testing & Old Gold Exchange">⚖️ Purity Testing & Old Gold Exchange</option>
                    <option value="Gold Ring / Engagement Ring Consultation">💍 Gold Ring / Engagement Ring Consultation</option>
                    <option value="General Store Visit & Catalog Viewing">✨ General Store Visit & Catalog Viewing</option>
                  </select>
                </div>

                {/* Preferred Date */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-serif font-bold text-[#2D2926] mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={e => setBookingDate(e.target.value)}
                      className="w-full bg-white border border-[#E8E1D5] rounded-xl p-2.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#9D825E]/40"
                    />
                  </div>

                  <div>
                    <label className="block font-serif font-bold text-[#2D2926] mb-1">
                      Time Slot *
                    </label>
                    <select
                      value={bookingTime}
                      onChange={e => setBookingTime(e.target.value)}
                      className="w-full bg-white border border-[#E8E1D5] rounded-xl p-2.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#9D825E]/40"
                    >
                      <option value="10:30 AM - 01:00 PM (Morning)">10:30 AM - 1:00 PM (Morning)</option>
                      <option value="01:00 PM - 04:00 PM (Afternoon)">1:00 PM - 4:00 PM (Afternoon)</option>
                      <option value="04:00 PM - 07:30 PM (Evening)">4:00 PM - 7:30 PM (Evening)</option>
                    </select>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block font-serif font-bold text-[#2D2926] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gurpreet Singh / Harpreet Kaur"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className="w-full bg-white border border-[#E8E1D5] rounded-xl p-2.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#9D825E]/40"
                  />
                </div>

                {/* Mobile / WhatsApp */}
                <div>
                  <label className="block font-serif font-bold text-[#2D2926] mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    className="w-full bg-white border border-[#E8E1D5] rounded-xl p-2.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#9D825E]/40"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#9D825E] hover:bg-[#886F4E] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Visit Appointment</span>
                  </button>
                  <p className="text-[10px] text-center text-[#665E55] mt-2">
                    Walk-ins are also always welcome at Bansawala Bazar, Phagwara!
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Quick Call Box */}
          <div className="bg-[#FAF3E0] rounded-2xl border border-[#D9C49A] p-4 flex items-center justify-between text-xs text-[#5C4524]">
            <div>
              <strong className="font-serif text-sm text-[#2D2926] block">Need Instant Assistance?</strong>
              <span className="text-[11px] text-[#665E55]">Speak directly with the goldsmith</span>
            </div>
            <a
              href="tel:+917508500417"
              className="px-3.5 py-2 bg-[#9D825E] text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" /> Call Now
            </a>
          </div>

        </div>
      )}

      {/* TAB 3: STORE INFO & CONTACT */}
      {activeTab === 'info' && (
        <div className="p-4 space-y-4">
          
          {/* Location & Timings Card */}
          <div className="bg-white rounded-2xl border border-[#E8E1D5] p-4 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#FAF3E0] text-[#9D825E] flex items-center justify-center font-serif font-bold text-sm shrink-0">
                SGK
              </div>
              <div>
                <h2 className="font-serif font-bold text-base text-[#2D2926]">
                  Shri Guru Kirpa Gold Platters And Jewellers
                </h2>
                <p className="text-xs text-[#9D825E] font-medium">Bansawala Bazar, Phagwara</p>
              </div>
            </div>

            <div className="space-y-3 text-xs divide-y divide-[#F0EBE1]">
              <div className="pt-2 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#9D825E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2D2926] block font-medium">Store Address:</strong>
                  <p className="text-[#665E55] mt-0.5 leading-relaxed">
                    Shop No. 15, Bansawala Bazar, Sarafan Bazar Road, Phagwara, Punjab 144401, India
                  </p>
                  <a
                    href="https://maps.google.com/?q=Shri+Guru+Kirpa+Gold+Platters+And+Jewellers+Bansawala+Bazar+Phagwara+Punjab"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#9D825E] font-bold text-xs mt-1.5 hover:underline"
                  >
                    Open in Google Maps <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="pt-3 flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#9D825E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2D2926] block font-medium">Store Working Hours:</strong>
                  <p className="text-[#665E55] mt-0.5">
                    Monday – Saturday: <strong className="text-[#2D2926]">10:00 AM – 08:00 PM</strong>
                  </p>
                  <p className="text-stone-400 mt-0.5">Sunday: Closed (Available for NRI appointments)</p>
                </div>
              </div>

              <div className="pt-3 flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#9D825E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2D2926] block font-medium">Phone & WhatsApp:</strong>
                  <p className="text-[#665E55] mt-0.5">
                    <a href="tel:+917508500417" className="text-[#9D825E] font-bold hover:underline">
                      +91 75085 00417
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F0EBE1]">
              <a
                href="https://maps.google.com/?q=Shri+Guru+Kirpa+Gold+Platters+And+Jewellers+Bansawala+Bazar+Phagwara+Punjab"
                target="_blank"
                rel="noreferrer"
                className="py-2.5 bg-[#2D2926] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
              >
                <MapPin className="w-3.5 h-3.5" /> Directions
              </a>

              <a
                href="https://wa.me/917508500417?text=Hello%20Shri%20Guru%20Kirpa%20Jewellers,%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noreferrer"
                className="py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Key Services Offered */}
          <div className="bg-white rounded-2xl border border-[#E8E1D5] p-4 shadow-xs space-y-3">
            <h3 className="font-serif font-bold text-sm text-[#2D2926] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#9D825E]" /> In-House Goldsmith Services
            </h3>

            <div className="space-y-2.5 text-xs text-[#665E55]">
              <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#F0EBE1]">
                <strong className="text-[#2D2926] block">100% BIS Hallmarked 22K (916) Gold</strong>
                <p className="text-[11px] text-stone-500 mt-0.5">Authentic certified gold ornaments with zero compromise on purity.</p>
              </div>

              <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#F0EBE1]">
                <strong className="text-[#2D2926] block">Traditional Punjabi Kadas</strong>
                <p className="text-[11px] text-stone-500 mt-0.5">Solid 22K gold kadas or heavy Sarbloh-core kadas with pure gold plating.</p>
              </div>

              <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#F0EBE1]">
                <strong className="text-[#2D2926] block">Gold & Silver Electroplating</strong>
                <p className="text-[11px] text-stone-500 mt-0.5">Premium 24K micron gold plating and micro-polishing for lasting shine.</p>
              </div>

              <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#F0EBE1]">
                <strong className="text-[#2D2926] block">Custom Bridal & Wedding Sets</strong>
                <p className="text-[11px] text-stone-500 mt-0.5">Handcrafted Rani Haars, Chokers, and Jhumkas tailored to your design & weight.</p>
              </div>
            </div>
          </div>

          {/* Customer Reviews Highlight */}
          <div className="bg-[#FAF3E0] rounded-2xl border border-[#D9C49A] p-4 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-xs text-[#2D2926]">Google Customer Rating</span>
              <span className="font-bold text-[#9D825E] flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> 4.9 / 5.0
              </span>
            </div>
            <p className="italic text-[#5C4524] text-[11px] leading-relaxed">
              &ldquo;Best jewellery shop in Phagwara for Punjabi Kadas and pure hallmark gold. Transparent dealing and honest goldsmith work.&rdquo;
            </p>
            <span className="text-[10px] text-stone-500 block text-right">— Jaswinder Singh (Local Patron)</span>
          </div>

        </div>
      )}

      {/* MOBILE PRODUCT DETAIL BOTTOM SHEET MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF8F5] rounded-t-3xl border-t border-[#E8E1D5] max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200">
            
            {/* Header */}
            <div className="p-4 bg-white border-b border-[#E8E1D5] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-serif uppercase tracking-widest text-[#9D825E] font-bold">
                  {selectedProduct.purity || '22K BIS Hallmarked'}
                </span>
                <h3 className="font-serif font-bold text-base text-[#2D2926] line-clamp-1">
                  {selectedProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1.5 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 overflow-y-auto space-y-4 text-xs">
              
              {/* Main Photo */}
              <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-stone-100 border border-[#E8E1D5]">
                <img
                  src={selectedProduct.mainImage}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=800';
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 right-2.5 bg-black/75 text-[#D4AF37] text-[10px] font-bold px-2 py-1 rounded-full font-serif backdrop-blur-xs">
                  {selectedProduct.purity || '22K 916 Hallmark'}
                </div>
              </div>

              {/* Price & Weight Box */}
              <div className="p-3.5 bg-white rounded-2xl border border-[#E8E1D5] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase font-bold block">Estimated Price</span>
                  <span className="text-xl font-bold font-serif text-[#2D2926]">
                    ₹{selectedProduct.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-500 uppercase font-bold block">Gold Weight</span>
                  <span className="font-bold text-xs text-[#9D825E]">
                    {selectedProduct.goldWeight || selectedProduct.gemstoneSpec.type}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white p-3.5 rounded-2xl border border-[#E8E1D5] space-y-2">
                <strong className="font-serif text-xs text-[#2D2926] block">Description & Karigari</strong>
                <p className="text-[#665E55] leading-relaxed text-[11px]">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 bg-white rounded-xl border border-[#E8E1D5]">
                  <span className="text-stone-400 block text-[10px]">Purity Standard</span>
                  <strong className="text-[#2D2926]">{selectedProduct.purity || '22K BIS 916'}</strong>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-[#E8E1D5]">
                  <span className="text-stone-400 block text-[10px]">Making Charges</span>
                  <strong className="text-[#2D2926]">{selectedProduct.makingCharges || 'Karigar Rate'}</strong>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-[#E8E1D5]">
                  <span className="text-stone-400 block text-[10px]">Workshop</span>
                  <strong className="text-[#2D2926]">Phagwara, Punjab</strong>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-[#E8E1D5]">
                  <span className="text-stone-400 block text-[10px]">Engraving</span>
                  <strong className="text-emerald-700">Free Gurmukhi / English</strong>
                </div>
              </div>

              {/* Available Sizes */}
              {selectedProduct.sizesAvailable && selectedProduct.sizesAvailable.length > 0 && (
                <div className="bg-white p-3 rounded-2xl border border-[#E8E1D5] space-y-1.5">
                  <span className="text-[10px] text-stone-500 uppercase font-bold block">Available Sizes:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProduct.sizesAvailable.map((s, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-[#FAF3E0] text-[#5C4524] rounded-lg text-[10px] font-semibold border border-[#D9C49A]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="p-3 bg-white border-t border-[#E8E1D5] grid grid-cols-2 gap-2">
              <button
                onClick={() => handleStartBookingForProduct(selectedProduct)}
                className="py-3 bg-[#9D825E] hover:bg-[#886F4E] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Calendar className="w-4 h-4" /> Book Store Visit
              </button>

              <a
                href={`https://wa.me/917508500417?text=Hello%20Shri%20Guru%20Kirpa%20Jewellers,%20I%20am%20interested%20in%20${encodeURIComponent(selectedProduct.name)}%20(₹${selectedProduct.price.toLocaleString('en-IN')}).`}
                target="_blank"
                rel="noreferrer"
                className="py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Inquire
              </a>
            </div>

          </div>
        </div>
      )}

      {/* STICKY BOTTOM NAVIGATION BAR FOR MOBILE */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E1D5] px-2 py-1.5 shadow-lg">
        <div className="grid grid-cols-4 gap-1 text-[10px] font-medium text-center">
          
          <button
            onClick={() => {
              setActiveTab('collection');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`py-1.5 rounded-xl flex flex-col items-center justify-center transition-colors ${
              activeTab === 'collection' ? 'text-[#9D825E] font-bold' : 'text-[#665E55] hover:text-[#2D2926]'
            }`}
          >
            <Sparkles className="w-4 h-4 mb-0.5" />
            <span>Catalog</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('book');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`py-1.5 rounded-xl flex flex-col items-center justify-center transition-colors ${
              activeTab === 'book' ? 'text-[#9D825E] font-bold' : 'text-[#665E55] hover:text-[#2D2926]'
            }`}
          >
            <Calendar className="w-4 h-4 mb-0.5" />
            <span>Book Visit</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('info');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`py-1.5 rounded-xl flex flex-col items-center justify-center transition-colors ${
              activeTab === 'info' ? 'text-[#9D825E] font-bold' : 'text-[#665E55] hover:text-[#2D2926]'
            }`}
          >
            <Info className="w-4 h-4 mb-0.5" />
            <span>Store Info</span>
          </button>

          <a
            href="https://wa.me/917508500417?text=Hello%20Shri%20Guru%20Kirpa%20Jewellers,%20I%20would%20like%20to%20inquire."
            target="_blank"
            rel="noreferrer"
            className="py-1.5 rounded-xl flex flex-col items-center justify-center text-emerald-700 hover:text-emerald-800 transition-colors font-medium"
          >
            <MessageCircle className="w-4 h-4 mb-0.5" />
            <span>WhatsApp</span>
          </a>

        </div>
      </div>

    </div>
  );
};
