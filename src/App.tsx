/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { JewelryCategory, JewelryProduct, StoreLocation } from './types';
import { PRODUCTS } from './data/products';
import { SPECIAL_COLLECTIONS } from './data/reviews';

import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { VirtualTryOnModal } from './components/VirtualTryOnModal';
import { ZoomLoupeModal } from './components/ZoomLoupeModal';
import { StoreLocator } from './components/StoreLocator';
import { AppointmentModal } from './components/AppointmentModal';
import { ReviewsSection } from './components/ReviewsSection';
import { AuraConciergeDrawer } from './components/AuraConciergeDrawer';
import { Footer } from './components/Footer';
import { MobileSimplifiedView } from './components/MobileSimplifiedView';

import { Sparkles, Filter, ArrowRight } from 'lucide-react';

export default function App() {
  // Navigation & Category state
  const [activeCategory, setActiveCategory] = useState<JewelryCategory | 'all' | 'collections'>('all');
  const [selectedMetalFilter, setSelectedMetalFilter] = useState<string>('all');
  const [selectedStoneFilter, setSelectedStoneFilter] = useState<string>('all');

  // Modals state
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const [tryOnProduct, setTryOnProduct] = useState<JewelryProduct | undefined>(undefined);

  const [isLoupeOpen, setIsLoupeOpen] = useState(false);
  const [loupeProduct, setLoupeProduct] = useState<JewelryProduct | null>(null);

  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentStore, setAppointmentStore] = useState<StoreLocation | undefined>(undefined);
  const [appointmentProduct, setAppointmentProduct] = useState<JewelryProduct | undefined>(undefined);

  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter products
  const filteredProducts = PRODUCTS.filter(p => {
    if (activeCategory === 'collections') {
      if (!p.isSpecialCollection) return false;
    } else if (activeCategory !== 'all') {
      if (p.category !== activeCategory) return false;
    }

    if (selectedMetalFilter !== 'all') {
      const hasMetal = p.metalsAvailable.some(m => m.type === selectedMetalFilter);
      if (!hasMetal) return false;
    }

    if (selectedStoneFilter !== 'all') {
      const stoneName = p.gemstoneSpec.type.toLowerCase();
      if (!stoneName.includes(selectedStoneFilter.toLowerCase())) return false;
    }

    return true;
  });

  // Open Try-On with optional specific product
  const handleOpenTryOnForProduct = (prod?: JewelryProduct) => {
    setTryOnProduct(prod);
    setIsTryOnOpen(true);
  };

  // Open Loupe with specific product
  const handleOpenLoupeForProduct = (prod: JewelryProduct) => {
    setLoupeProduct(prod);
    setIsLoupeOpen(true);
  };

  // Open Appointment modal
  const handleOpenAppointment = (store?: StoreLocation, product?: JewelryProduct) => {
    setAppointmentStore(store);
    setAppointmentProduct(product);
    setIsAppointmentOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D2926] font-sans antialiased selection:bg-[#FAF3E0] selection:text-[#5C4524]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2D2926] text-amber-200 px-5 py-3 rounded-2xl shadow-2xl border border-[#9D825E]/40 font-serif text-xs flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          {toastMessage}
        </div>
      )}

      {/* Mobile Simplified View (Phone screens: clean viewing, fast collection navigation, and quick visit booking) */}
      <div className="block md:hidden">
        <MobileSimplifiedView
          onOpenAppointment={(prod) => handleOpenAppointment(undefined, prod)}
        />
      </div>

      {/* Desktop Rich Boutique Experience (Tablets, Laptops, Desktops) */}
      <div className="hidden md:block">
        {/* Header */}
        <Header
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onOpenTryOn={() => handleOpenTryOnForProduct(PRODUCTS[0])}
          onOpenAppointment={() => handleOpenAppointment()}
          onOpenConcierge={() => setIsConciergeOpen(true)}
          onScrollToStores={() => scrollToSection('store-locator')}
          onScrollToReviews={() => scrollToSection('reviews-section')}
        />

        {/* Hero Banner */}
        <HeroBanner
          onOpenTryOn={() => handleOpenTryOnForProduct(PRODUCTS[0])}
          onOpenAppointment={() => handleOpenAppointment()}
          onOpenLoupe={(prod) => handleOpenLoupeForProduct(prod)}
          heroProduct={PRODUCTS[0]}
        />

        {/* Main Catalog Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Category Header & Filter Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 pb-6 border-b border-[#E8E1D5]">
            <div>
              <span className="text-xs font-serif uppercase tracking-widest text-[#9D825E] font-bold block mb-1">
                Phagwara Workshop Ornaments
              </span>
              <h2 className="text-3xl font-serif text-[#2D2926] font-bold capitalize">
                {activeCategory === 'all' && 'All 22K & 24K Gold Ornaments'}
                {activeCategory === 'rings' && 'Gold & Diamond Engagement Rings'}
                {activeCategory === 'necklaces' && 'Bridal Necklaces, Rani Haars & Chokers'}
                {activeCategory === 'earrings' && 'Traditional Punjabi Jhumkas & Chandbalis'}
                {activeCategory === 'bracelets' && 'Authentic Punjabi Kadas & Gold Bangles'}
                {activeCategory === 'watches' && 'Special Royal Heritage Jewellery'}
                {activeCategory === 'collections' && 'Featured Punjabi Heritage Collections'}
              </h2>
              <p className="text-xs text-[#665E55] mt-1 font-sans">
                Showing {filteredProducts.length} verified pieces • 100% BIS Hallmarked • Custom Weight Orders Available
              </p>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 text-xs font-sans">
              <div className="flex items-center gap-1.5 bg-white border border-[#E8E1D5] px-3 py-1.5 rounded-full shadow-sm">
                <Filter className="w-3.5 h-3.5 text-[#9D825E]" />
                <span className="font-serif text-[#665E55] font-bold">Gold Finish:</span>
                <select
                  value={selectedMetalFilter}
                  onChange={e => setSelectedMetalFilter(e.target.value)}
                  className="bg-transparent text-[#2D2926] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="all">All Finishes</option>
                  <option value="18k-yellow-gold">22K / 24K Yellow Gold</option>
                  <option value="platinum">Platinum / White Gold</option>
                  <option value="rose-gold">Rose Gold</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-white border border-[#E8E1D5] px-3 py-1.5 rounded-full shadow-sm">
                <span className="font-serif text-[#665E55] font-bold">Work / Gem:</span>
                <select
                  value={selectedStoneFilter}
                  onChange={e => setSelectedStoneFilter(e.target.value)}
                  className="bg-transparent text-[#2D2926] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="all">All Styles</option>
                  <option value="gold">Pure Gold / Filigree</option>
                  <option value="kundan">Kundan & Polki</option>
                  <option value="emerald">Emerald / Ruby</option>
                  <option value="diamond">Certified Diamonds</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenTryOn={handleOpenTryOnForProduct}
                onOpenLoupe={handleOpenLoupeForProduct}
                onOpenAppointment={(prod) => handleOpenAppointment(undefined, prod)}
                onSelectProduct={handleOpenLoupeForProduct}
              />
            ))}
          </div>

          {/* Special Collections Showcase Banner */}
          <div className="mt-24 space-y-16">
            {SPECIAL_COLLECTIONS.map((col) => (
              <div
                key={col.id}
                className="bg-[#2D2926] text-white rounded-3xl overflow-hidden border border-[#9D825E]/40 shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-center"
              >
                <div className="lg:col-span-6 p-8 md:p-12 space-y-4">
                  <span className="text-xs font-serif uppercase tracking-[0.25em] text-[#D4AF37] font-bold block">
                    Featured Heritage Collection
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif text-[#FAF3E0] font-medium leading-tight">
                    {col.title}
                  </h3>
                  <p className="text-[#D4AF37]/90 font-serif italic text-sm">{col.subtitle}</p>
                  <p className="text-stone-300 text-xs leading-relaxed font-light">{col.description}</p>
                  <div className="pt-2">
                    <button
                      onClick={() => setActiveCategory('collections')}
                      className="px-6 py-2.5 bg-[#9D825E] hover:bg-[#886F4E] text-white font-serif text-xs font-bold rounded-full transition-all flex items-center gap-2 shadow"
                    >
                      Explore Collection Masterpieces <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 h-80 lg:h-full relative overflow-hidden bg-stone-900">
                  <img
                    src={col.heroImage}
                    alt={col.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

        </main>

        {/* Global Interactive Store Locator Section */}
        <StoreLocator
          onBookAppointment={(store) => handleOpenAppointment(store)}
        />

        {/* Customer Reviews Section */}
        <ReviewsSection />

        {/* Footer */}
        <Footer
          onScrollToStores={() => scrollToSection('store-locator')}
          onOpenAppointment={() => handleOpenAppointment()}
          onOpenConcierge={() => setIsConciergeOpen(true)}
        />
      </div>

      {/* Modals & Drawers */}
      <VirtualTryOnModal
        isOpen={isTryOnOpen}
        onClose={() => setIsTryOnOpen(false)}
        initialProduct={tryOnProduct}
        onBookAppointment={(prod) => handleOpenAppointment(undefined, prod)}
      />

      <ZoomLoupeModal
        isOpen={isLoupeOpen}
        onClose={() => setIsLoupeOpen(false)}
        product={loupeProduct}
        onOpenAppointment={(prod) => handleOpenAppointment(undefined, prod)}
        onOpenTryOn={handleOpenTryOnForProduct}
      />

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        initialStore={appointmentStore}
        initialProduct={appointmentProduct}
      />

      <AuraConciergeDrawer
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        onSelectProductById={(id) => {
          const p = PRODUCTS.find(prod => prod.id === id);
          if (p) handleOpenLoupeForProduct(p);
        }}
      />

    </div>
  );
}
