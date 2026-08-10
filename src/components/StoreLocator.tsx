import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Mail, Globe, Sparkles, Navigation, Calendar, ChevronRight, Check } from 'lucide-react';
import { StoreLocation, JewelryProduct } from '../types';
import { STORES } from '../data/stores';

interface StoreLocatorProps {
  onBookAppointment: (store: StoreLocation, product?: JewelryProduct) => void;
}

export const StoreLocator: React.FC<StoreLocatorProps> = ({ onBookAppointment }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeStore, setActiveStore] = useState<StoreLocation>(STORES[0]);

  // Filter stores
  const filteredStores = STORES.filter(store => {
    const matchesRegion = selectedRegion === 'All' || store.region === selectedRegion;
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  // Calculate live store local time string
  const getStoreLocalTime = (timeZone: string) => {
    try {
      return new Date().toLocaleTimeString('en-US', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return '10:00 AM Local';
    }
  };

  return (
    <section id="store-locator" className="py-20 bg-[#fdfbf7] text-stone-900 border-t border-[#e6dfd5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-serif uppercase tracking-[0.25em] text-amber-800 font-bold block mb-2">
            Haute Joaillerie Salons
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-medium">
            Global Flagship Boutiques
          </h2>
          <p className="text-stone-600 text-sm mt-3 leading-relaxed">
            Experience our high jewelry creations in person. Enjoy private VIP salon suites, champagne hospitality, and bespoke gemological appraisals.
          </p>
        </div>

        {/* Region Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 pb-6 border-b border-[#e6dfd5]">
          <div className="flex flex-wrap gap-2">
            {['All', 'Europe', 'Americas', 'Asia-Pacific', 'Middle East'].map(reg => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-4 py-2 rounded-full text-xs font-serif tracking-wider uppercase transition-all ${
                  selectedRegion === reg
                    ? 'bg-stone-900 text-amber-300 font-bold shadow-md'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-[#e6dfd5]'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72 relative">
            <input
              type="text"
              placeholder="Search by city or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#e6dfd5] rounded-full pl-4 pr-10 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            />
            <MapPin className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Interactive Map & Store Cards Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Store List */}
          <div className="lg:col-span-5 space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {filteredStores.map(store => (
              <div
                key={store.id}
                onClick={() => setActiveStore(store)}
                className={`p-5 rounded-2xl transition-all cursor-pointer border ${
                  activeStore.id === store.id
                    ? 'bg-amber-50/70 border-amber-600/80 shadow-md ring-1 ring-amber-500/30'
                    : 'bg-white border-[#e6dfd5] hover:border-amber-400'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      {store.isFlagship && (
                        <span className="px-2 py-0.5 bg-amber-400 text-stone-950 text-[10px] font-bold rounded-full uppercase font-serif tracking-widest">
                          Flagship
                        </span>
                      )}
                      <span className="text-xs text-stone-500 font-serif font-semibold">{store.country}</span>
                    </div>
                    <h3 className="font-serif text-lg font-medium text-stone-900 mt-1">
                      {store.name}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-medium text-amber-800 bg-amber-100/60 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {getStoreLocalTime(store.timezone)}
                  </span>
                </div>

                <p className="text-xs text-stone-600 mt-2 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  {store.address}
                </p>

                <div className="mt-4 pt-3 border-t border-[#e6dfd5]/80 flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-serif italic">
                    {store.phone}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookAppointment(store);
                    }}
                    className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-amber-300 rounded-full text-xs font-serif font-medium transition-all flex items-center gap-1"
                  >
                    <Calendar className="w-3 h-3" /> Book Visit <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Active Store Map & Details */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#e6dfd5] overflow-hidden shadow-lg p-6">
            
            {/* Visual Interactive Custom World Map Graphic */}
            <div className="relative w-full h-[320px] bg-stone-900 rounded-xl overflow-hidden mb-6 flex items-center justify-center border border-stone-800">
              {/* Map background image */}
              <img
                src={activeStore.image}
                alt={activeStore.name}
                className="w-full h-full object-cover opacity-40 hover:opacity-50 transition-opacity"
              />

              {/* Map Pin Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-amber-300 text-xs font-serif rounded-full border border-amber-500/30">
                    🌍 Global Coordinates: {activeStore.coordinates.lat.toFixed(2)}°N, {activeStore.coordinates.lng.toFixed(2)}°E
                  </span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeStore.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-xs rounded-full flex items-center gap-1 backdrop-blur-md transition-all"
                  >
                    <Navigation className="w-3 h-3" /> Open in Google Maps
                  </a>
                </div>

                <div className="text-white">
                  <span className="text-amber-400 font-serif text-xs uppercase tracking-widest block font-bold">
                    {activeStore.city}, {activeStore.country}
                  </span>
                  <h3 className="font-serif text-2xl font-bold mt-0.5">
                    {activeStore.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Active Store Details & Specialties */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80">
                  <span className="font-serif text-stone-500 uppercase tracking-widest text-[10px] block font-bold mb-1">
                    Boutique Hours
                  </span>
                  <span className="font-medium text-stone-800">{activeStore.hours}</span>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80">
                  <span className="font-serif text-stone-500 uppercase tracking-widest text-[10px] block font-bold mb-1">
                    Direct VIP Concierge Phone
                  </span>
                  <span className="font-medium text-stone-800">{activeStore.phone}</span>
                </div>
              </div>

              {/* Specialties */}
              <div>
                <span className="font-serif text-xs uppercase tracking-widest text-amber-900 font-bold block mb-2">
                  Salon Privileges & Services
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeStore.specialties.map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-amber-50 text-amber-950 rounded-full text-xs font-serif border border-amber-200 flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-amber-600" /> {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-3 flex gap-3">
                <button
                  onClick={() => onBookAppointment(activeStore)}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif text-sm font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Book VIP Consultation at {activeStore.city} Branch
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
