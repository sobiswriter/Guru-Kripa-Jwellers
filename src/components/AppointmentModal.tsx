import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Check, Sparkles, User, Mail, Phone, FileText, QrCode } from 'lucide-react';
import { StoreLocation, JewelryProduct, AppointmentBooking } from '../types';
import { STORES } from '../data/stores';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStore?: StoreLocation;
  initialProduct?: JewelryProduct;
}

const CONSULTATION_TYPES = [
  {
    id: 'engagement-bridal',
    title: 'Engagement & Wedding Ring Bespoke Session',
    desc: 'Private diamond selection, custom setting design, and AR hand fitting with champagne.',
    icon: '💍'
  },
  {
    id: 'haute-joaillerie',
    title: 'Haute Joaillerie & Emerald Viewing',
    desc: 'Exclusive access to unreleased masterworks and rare colored diamond vaults.',
    icon: '👑'
  },
  {
    id: 'custom-appraisal',
    title: 'GIA Diamond & Gemstone Appraisal',
    desc: 'Certified appraisal, laser inscription check, and estate jewelry valuation.',
    icon: '📜'
  },
  {
    id: 'watchmaking',
    title: 'High Watchmaking & Master Servicing',
    desc: 'Inspection, watch complication tuning, and bespoke strap fitting.',
    icon: '⌚'
  }
];

const TIME_SLOTS = [
  '10:30 AM', '11:30 AM', '01:30 PM', '03:00 PM', '04:30 PM', '06:00 PM'
];

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialStore,
  initialProduct
}) => {
  if (!isOpen) return null;

  const [selectedStore, setSelectedStore] = useState<StoreLocation>(
    initialStore || STORES[0]
  );
  const [selectedConsultation, setSelectedConsultation] = useState<string>(
    CONSULTATION_TYPES[0].id
  );
  const [appointmentDate, setAppointmentDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('01:30 PM');

  // Guest details
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>(
    initialProduct ? `Interested in trying on the ${initialProduct.name}.` : ''
  );

  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentBooking | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) return;

    const confCode = `VIP-${selectedStore.city.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: AppointmentBooking = {
      id: `booking-${Date.now()}`,
      storeId: selectedStore.id,
      storeName: selectedStore.name,
      consultationType: CONSULTATION_TYPES.find(c => c.id === selectedConsultation)?.title || 'Private VIP Consultation',
      date: appointmentDate,
      timeSlot: selectedTimeSlot,
      guestName,
      guestEmail,
      guestPhone,
      notes: specialNotes,
      confirmationCode: confCode,
      conciergeName: 'Monsieur Jean-Luc Vance (Master Gemologist)'
    };

    setConfirmedBooking(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 md:p-6 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#fdfbf7] rounded-2xl shadow-2xl overflow-hidden border border-[#e6dfd5]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-[#1a1817] rounded-full shadow-md transition-all border border-[#e6dfd5]"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedBooking ? (
          /* CONFIRMATION PASS VIEW */
          <div className="p-8 md:p-10 text-center">
            <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-300">
              <Check className="w-8 h-8" />
            </div>

            <span className="text-xs font-serif uppercase tracking-[0.25em] text-amber-800 font-bold block mb-1">
              Private Salon Appointment Confirmed
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-stone-900 font-bold">
              We Await Your Arrival
            </h2>
            <p className="text-stone-600 text-xs mt-2 max-w-md mx-auto">
              A digital VIP pass has been issued and dispatched to <span className="font-semibold">{confirmedBooking.guestEmail}</span>.
            </p>

            {/* Pass Ticket Card */}
            <div className="my-6 p-6 bg-stone-900 text-amber-100 rounded-2xl border-2 border-amber-500/40 text-left shadow-2xl max-w-lg mx-auto relative overflow-hidden">
              <div className="flex justify-between items-start border-b border-amber-500/30 pb-4 mb-4">
                <div>
                  <span className="text-[10px] uppercase font-serif tracking-widest text-amber-400 block font-semibold">
                    Aura & Carat VIP Pass
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white">{confirmedBooking.storeName}</h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 uppercase font-mono block">Pass ID</span>
                  <span className="font-mono font-bold text-amber-300 text-sm">{confirmedBooking.confirmationCode}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <div>
                  <span className="text-stone-400 text-[10px] uppercase block">Guest Name</span>
                  <span className="font-medium text-white">{confirmedBooking.guestName}</span>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase block">Consultation Type</span>
                  <span className="font-medium text-white line-clamp-1">{confirmedBooking.consultationType}</span>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase block">Date & Time</span>
                  <span className="font-medium text-amber-300">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase block">Assigned Specialist</span>
                  <span className="font-medium text-white">{confirmedBooking.conciergeName}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-amber-500/30 flex items-center justify-between text-[11px] text-stone-300">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-400" /> Complimentary Valet Parking Included</span>
                <QrCode className="w-8 h-8 text-amber-400 shrink-0" />
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif font-semibold text-sm rounded-full transition-all shadow-md"
              >
                Return to Store
              </button>
            </div>
          </div>
        ) : (
          /* FORM VIEW */
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="mb-6">
              <span className="text-xs font-serif uppercase tracking-widest text-amber-800 font-bold block mb-1">
                Haute Joaillerie Concierge
              </span>
              <h2 className="text-2xl font-serif text-stone-900 font-medium">
                Reserve an In-Store Consultation
              </h2>
            </div>

            <div className="space-y-5">
              {/* Branch Selection */}
              <div>
                <label className="block text-xs font-serif uppercase tracking-widest text-stone-700 mb-2 font-semibold">
                  1. Preferred Boutique Branch
                </label>
                <select
                  value={selectedStore.id}
                  onChange={(e) => {
                    const st = STORES.find(s => s.id === e.target.value);
                    if (st) setSelectedStore(st);
                  }}
                  className="w-full bg-white border border-[#e6dfd5] rounded-xl px-3.5 py-2.5 text-stone-800 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 shadow-sm"
                >
                  {STORES.map(st => (
                    <option key={st.id} value={st.id}>
                      {st.name} ({st.city}, {st.country})
                    </option>
                  ))}
                </select>
              </div>

              {/* Consultation Type Grid */}
              <div>
                <label className="block text-xs font-serif uppercase tracking-widest text-stone-700 mb-2 font-semibold">
                  2. Select Experience Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {CONSULTATION_TYPES.map(ct => (
                    <div
                      key={ct.id}
                      onClick={() => setSelectedConsultation(ct.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedConsultation === ct.id
                          ? 'bg-amber-50 border-amber-600 shadow-sm ring-1 ring-amber-500/20'
                          : 'bg-white border-[#e6dfd5] hover:border-amber-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-serif font-semibold text-xs text-stone-900">
                        <span>{ct.icon}</span> {ct.title}
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1 leading-snug">{ct.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-serif uppercase tracking-widest text-stone-700 mb-1.5 font-semibold">
                    3. Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full bg-white border border-[#e6dfd5] rounded-xl px-3 py-2 text-stone-800 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-widest text-stone-700 mb-1.5 font-semibold">
                    Preferred Time Slot
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {TIME_SLOTS.map(ts => (
                      <button
                        type="button"
                        key={ts}
                        onClick={() => setSelectedTimeSlot(ts)}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-all border ${
                          selectedTimeSlot === ts
                            ? 'bg-stone-900 text-amber-300 border-stone-900 font-semibold'
                            : 'bg-white text-stone-700 border-[#e6dfd5] hover:border-stone-400'
                        }`}
                      >
                        {ts}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-serif uppercase tracking-widest text-stone-700 font-semibold">
                  4. Your Contact Details
                </label>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="bg-white border border-[#e6dfd5] rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="bg-white border border-[#e6dfd5] rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Phone *"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="bg-white border border-[#e6dfd5] rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>

                <textarea
                  rows={2}
                  placeholder="Special requests or specific diamond preferences..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full bg-white border border-[#e6dfd5] rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <div className="mt-6 pt-4 border-t border-[#e6dfd5] flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs text-stone-600 hover:text-stone-900 font-serif"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif font-semibold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Confirm In-Store Appointment
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
