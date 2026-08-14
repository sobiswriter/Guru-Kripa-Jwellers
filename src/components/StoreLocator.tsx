import React, { useState } from 'react';
import { MapPin, Phone, Clock, MessageCircle, Navigation, Calendar, ChevronRight, Sparkles, Star } from 'lucide-react';
import { StoreLocation, JewelryProduct } from '../types';
import { STORES } from '../data/stores';

interface StoreLocatorProps {
  onBookAppointment: (store: StoreLocation, product?: JewelryProduct) => void;
}

export const StoreLocator: React.FC<StoreLocatorProps> = ({ onBookAppointment }) => {
  const [activeStore, setActiveStore] = useState<StoreLocation>(STORES[0]);

  return (
    <section id="store-locator" className="py-16 bg-[#FAF8F5] text-[#2D2926] border-t border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-serif uppercase tracking-widest text-[#9D825E] font-bold block mb-2">
            Visit Our Phagwara Store & Karigar Workshop
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#2D2926] font-medium">
            Shri Guru Kirpa Gold Platters And Jewellers
          </h2>
          <p className="text-[#665E55] text-sm mt-2.5 leading-relaxed font-sans">
            Located in the heart of Sarafan Bazar, Phagwara. Walk in for custom gold jewellery orders, direct goldsmith consultation, hallmark verification, or 24K gold plating and ultrasonic polish.
          </p>
        </div>

        {/* Store Detail & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Store Locations / Desks */}
          <div className="lg:col-span-5 space-y-4">
            {STORES.map(store => (
              <div
                key={store.id}
                onClick={() => setActiveStore(store)}
                className={`p-5 rounded-2xl transition-all cursor-pointer border text-left ${
                  activeStore.id === store.id
                    ? 'bg-[#FAF3E0] border-[#9D825E] shadow-md ring-1 ring-[#9D825E]/40'
                    : 'bg-white border-[#E8E1D5] hover:border-[#9D825E]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      {store.isFlagship && (
                        <span className="px-2.5 py-0.5 bg-[#2D2926] text-[#D4AF37] text-[10px] font-bold rounded-full font-serif">
                          Main Store & Workshop
                        </span>
                      )}
                      <span className="text-xs text-[#9D825E] font-serif font-semibold">{store.city}, Punjab</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#2D2926] mt-1">
                      {store.name}
                    </h3>
                  </div>
                  <span className="text-xs font-serif text-[#5C4524] bg-[#F4EFE6] px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold">
                    <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" /> 4.9★
                  </span>
                </div>

                <p className="text-xs text-[#665E55] mt-2 flex items-start gap-1.5 font-sans">
                  <MapPin className="w-4 h-4 text-[#9D825E] shrink-0 mt-0.5" />
                  {store.address}
                </p>

                <div className="mt-4 pt-3 border-t border-[#E8E1D5] flex items-center justify-between">
                  <a
                    href="tel:+917508500417"
                    className="text-xs text-[#9D825E] font-medium hover:underline flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Phone className="w-3 h-3" /> +91 75085 00417
                  </a>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookAppointment(store);
                    }}
                    className="px-3.5 py-1.5 bg-[#2D2926] hover:bg-[#1A1817] text-[#D4AF37] rounded-full text-xs font-serif font-medium transition-all flex items-center gap-1 shadow-sm"
                  >
                    <Calendar className="w-3 h-3" /> Book Visit <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}

            {/* Direct WhatsApp Box */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-left flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-emerald-950 font-serif">Quick WhatsApp Inquiry</h4>
                <p className="text-[11px] text-emerald-800 font-sans">Send jewellery photos for custom order estimate</p>
              </div>
              <a
                href="https://wa.me/917508500417?text=Hello%20Shri%20Guru%20Kirpa%20Jewellers,%20I%20am%20inquiring%20about%20a%20custom%20jewellery%20order."
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-serif font-bold transition-all shadow-sm flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Chat
              </a>
            </div>
          </div>

          {/* Right Column: Active Store Map & Details */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E8E1D5] overflow-hidden shadow-md p-6 text-left">
            
            {/* Visual Map Graphic */}
            <div className="relative w-full h-[280px] bg-stone-900 rounded-xl overflow-hidden mb-6 flex items-center justify-center border border-stone-800">
              <img
                src={activeStore.image}
                alt={activeStore.name}
                className="w-full h-full object-cover opacity-50"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1817] via-[#1A1817]/40 to-transparent p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-[#D4AF37] text-xs font-serif rounded-full border border-[#D4AF37]/40">
                    📍 Sarafan Bazar Road, Phagwara
                  </span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Shri+Guru+Kirpa+Gold+Platters+And+Jewellers+Shop+No+15+Bansawala+Bazar+Phagwara+Punjab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-[#D4AF37] hover:bg-[#C5A059] text-stone-950 font-bold text-xs rounded-full flex items-center gap-1 shadow-md transition-all font-sans"
                  >
                    <Navigation className="w-3 h-3" /> Get Directions
                  </a>
                </div>

                <div className="text-white">
                  <span className="text-[#D4AF37] font-serif text-xs uppercase tracking-widest block font-bold">
                    Shop No. 15, Bansawala Bazar, Phagwara
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold mt-0.5 text-white">
                    {activeStore.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Active Store Details & Specialties */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E8E1D5]">
                  <span className="font-serif text-[#665E55] uppercase tracking-wider text-[10px] block font-bold mb-1">
                    Store Timings
                  </span>
                  <span className="font-medium text-[#2D2926] font-sans">{activeStore.hours}</span>
                </div>
                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E8E1D5]">
                  <span className="font-serif text-[#665E55] uppercase tracking-wider text-[10px] block font-bold mb-1">
                    Store Contact Phone
                  </span>
                  <a href="tel:+917508500417" className="font-bold text-[#9D825E] font-sans hover:underline">
                    {activeStore.phone}
                  </a>
                </div>
              </div>

              {/* Services & Highlights */}
              <div>
                <span className="font-serif text-xs uppercase tracking-wider text-[#2D2926] font-bold block mb-2">
                  Specialised In-Store Services
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeStore.specialties.map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#FAF3E0] text-[#5C4524] rounded-full text-xs font-serif border border-[#D9C49A] flex items-center gap-1 font-medium"
                    >
                      <Sparkles className="w-3 h-3 text-[#9D825E]" /> {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onBookAppointment(activeStore)}
                  className="flex-1 py-3 bg-[#9D825E] hover:bg-[#886F4E] text-white font-serif text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Book Consultation with Goldsmith
                </button>
                <a
                  href="tel:+917508500417"
                  className="px-5 py-3 bg-[#2D2926] hover:bg-[#1A1817] text-[#D4AF37] font-serif text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" /> Call: +91 75085 00417
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

