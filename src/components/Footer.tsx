import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Award, Lock, Sparkles } from 'lucide-react';

interface FooterProps {
  onScrollToStores: () => void;
  onOpenAppointment: () => void;
  onOpenConcierge: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToStores,
  onOpenAppointment,
  onOpenConcierge
}) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-amber-900/30 font-serif">
      
      {/* Guarantees Bar */}
      <div className="border-b border-stone-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs">
          <div className="space-y-1">
            <Award className="w-5 h-5 text-amber-400 mx-auto" />
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">100% GIA Certified</h5>
            <p className="text-stone-400 text-[10px]">Conflict-free ethical diamonds</p>
          </div>
          <div className="space-y-1">
            <ShieldCheck className="w-5 h-5 text-amber-400 mx-auto" />
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Armored Delivery</h5>
            <p className="text-stone-400 text-[10px]">Full value insured global courier</p>
          </div>
          <div className="space-y-1">
            <Lock className="w-5 h-5 text-amber-400 mx-auto" />
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Lifetime Warranty</h5>
            <p className="text-stone-400 text-[10px]">Annual cleaning & ring resizing</p>
          </div>
          <div className="space-y-1">
            <Sparkles className="w-5 h-5 text-amber-400 mx-auto" />
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">AR Virtual Try-On</h5>
            <p className="text-stone-400 text-[10px]">Precision hand & neck fitting</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10 text-xs">
        
        {/* Brand Column */}
        <div className="space-y-3">
          <h4 className="text-xl font-bold tracking-[0.2em] text-white uppercase">AURA & CARAT</h4>
          <p className="text-amber-400 text-[10px] tracking-widest uppercase">Haute Joaillerie Paris • Est. 1894</p>
          <p className="text-stone-400 leading-relaxed font-sans text-[11px]">
            Master goldsmiths crafting heirloom diamond solitaires, Colombian emeralds, and Royal Ceylon sapphires for over a century.
          </p>
        </div>

        {/* Boutiques Column */}
        <div className="space-y-2">
          <h5 className="text-white uppercase tracking-widest text-xs font-bold mb-3 text-amber-300">Global Flagships</h5>
          <ul className="space-y-2 text-stone-400 font-sans text-[11px]">
            <li>12 Place Vendôme, Paris</li>
            <li>711 Fifth Avenue, New York</li>
            <li>165 New Bond Street, London</li>
            <li>6-9-5 Ginza, Chuo-ku, Tokyo</li>
            <li>Fashion Avenue, The Dubai Mall</li>
          </ul>
          <button
            onClick={onScrollToStores}
            className="text-amber-400 hover:text-amber-300 font-serif text-[11px] underline mt-2 block"
          >
            Explore Interactive Store Map →
          </button>
        </div>

        {/* Private Salon Services */}
        <div className="space-y-2">
          <h5 className="text-white uppercase tracking-widest text-xs font-bold mb-3 text-amber-300">Private Salon Privileges</h5>
          <ul className="space-y-2 text-stone-400 font-sans text-[11px]">
            <li>Bespoke Engagement Ring Design</li>
            <li>GIA Gemstone & Diamond Appraisal</li>
            <li>3D Virtual Fitting & AR Studio</li>
            <li>High Watchmaking Complications</li>
          </ul>
          <button
            onClick={onOpenAppointment}
            className="text-amber-400 hover:text-amber-300 font-serif text-[11px] underline mt-2 block"
          >
            Book VIP Salon Consultation →
          </button>
        </div>

        {/* Newsletter & Concierge */}
        <div className="space-y-3">
          <h5 className="text-white uppercase tracking-widest text-xs font-bold text-amber-300">Private Gazette</h5>
          <p className="text-stone-400 text-[11px] font-sans">
            Subscribe for invitations to unreleased high jewelry viewings and private Place Vendôme salon events.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address..."
              className="bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-sans w-full"
            />
            <button className="px-4 py-2 bg-amber-500 text-stone-950 font-bold rounded-lg hover:bg-amber-400 transition-colors">
              Join
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-stone-900 py-6 text-center text-[10px] text-stone-500 font-sans">
        © 2026 Maison Aura & Carat Haute Joaillerie. All rights reserved. GIA Registered. Certified Kimberley Process Compliant.
      </div>

    </footer>
  );
};
