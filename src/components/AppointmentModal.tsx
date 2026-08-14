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
    id: 'custom-order',
    title: 'Custom Gold Jewellery & Karigar Consultation',
    desc: 'Bring your design or photo. Direct consultation with master goldsmith for weight and making charge estimate.',
    icon: '✨'
  },
  {
    id: 'kada-bridal',
    title: 'Punjabi Kada & Bridal Gold Fitting',
    desc: 'Try sizes, weight calibration, and traditional handmade engraving for bridal sets and heavy kadas.',
    icon: '🪙'
  },
  {
    id: 'plating-polishing',
    title: 'Jewellery Polishing & Gold Plating Service',
    desc: 'Instant high-shine ultrasonic clean or 24K thick gold layer electroplating for your ornaments.',
    icon: '✨'
  },
  {
    id: 'purity-check',
    title: 'Gold Purity & Goldsmith Appraisal',
    desc: 'Accurate carat testing and advice on old gold exchange with transparent valuation.',
    icon: '📜'
  }
];

const TIME_SLOTS = [
  '10:30 AM', '12:00 PM', '02:00 PM', '04:00 PM', '05:30 PM', '07:00 PM'
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
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('02:00 PM');

  // Guest details
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>(
    initialProduct ? `Inquiring about ${initialProduct.name} (${initialProduct.purity}).` : ''
  );

  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentBooking | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) return;

    const confCode = `SGK-PHG-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: AppointmentBooking = {
      id: `booking-${Date.now()}`,
      storeId: selectedStore.id,
      storeName: selectedStore.name,
      consultationType: CONSULTATION_TYPES.find(c => c.id === selectedConsultation)?.title || 'Store Consultation',
      date: appointmentDate,
      timeSlot: selectedTimeSlot,
      guestName,
      guestEmail: guestEmail || 'customer@shrigurukirpa.com',
      guestPhone,
      notes: specialNotes,
      confirmationCode: confCode,
      conciergeName: 'Shri Guru Kirpa Senior Goldsmith'
    };

    setConfirmedBooking(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 md:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl overflow-hidden border border-[#E8E1D5] text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white hover:bg-stone-100 text-[#2D2926] rounded-full shadow-md transition-all border border-[#E8E1D5]"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedBooking ? (
          /* CONFIRMATION PASS VIEW */
          <div className="p-8 md:p-10 text-center">
            <div className="w-14 h-14 bg-[#FAF3E0] text-[#9D825E] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D9C49A]">
              <Check className="w-7 h-7" />
            </div>

            <span className="text-xs font-serif uppercase tracking-widest text-[#9D825E] font-bold block mb-1">
              Store Visit Booking Confirmed
            </span>
            <h2 className="text-2xl font-serif text-[#2D2926] font-bold">
              We Look Forward to Welcoming You
            </h2>
            <p className="text-[#665E55] text-xs mt-1.5 max-w-md mx-auto font-sans">
              Booking confirmed for <span className="font-semibold text-[#2D2926]">{confirmedBooking.guestName}</span>. Direct SMS/WhatsApp reminder sent to <span className="font-semibold text-[#2D2926]">{confirmedBooking.guestPhone}</span>.
            </p>

            {/* Pass Ticket Card */}
            <div className="my-6 p-6 bg-[#2D2926] text-amber-100 rounded-2xl border border-[#9D825E]/60 text-left shadow-xl max-w-md mx-auto relative overflow-hidden">
              <div className="flex justify-between items-start border-b border-[#9D825E]/30 pb-3 mb-3">
                <div>
                  <span className="text-[10px] uppercase font-serif tracking-widest text-[#D4AF37] block font-bold">
                    Shri Guru Kirpa Jewellers • Phagwara
                  </span>
                  <h4 className="font-serif text-base font-bold text-white mt-0.5">{confirmedBooking.storeName}</h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 uppercase font-mono block">Token ID</span>
                  <span className="font-mono font-bold text-[#D4AF37] text-sm">{confirmedBooking.confirmationCode}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs mb-3 font-sans">
                <div>
                  <span className="text-stone-400 text-[10px] uppercase block">Customer Name</span>
                  <span className="font-medium text-white">{confirmedBooking.guestName}</span>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase block">Phone</span>
                  <span className="font-medium text-white">{confirmedBooking.guestPhone}</span>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase block">Date & Time</span>
                  <span className="font-medium text-[#D4AF37]">{confirmedBooking.date} • {confirmedBooking.timeSlot}</span>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase block">Service</span>
                  <span className="font-medium text-white truncate block">{confirmedBooking.consultationType}</span>
                </div>
              </div>

              <div className="pt-2.5 border-t border-[#9D825E]/30 flex items-center justify-between text-[11px] text-stone-300">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Shop No. 15, Bansawala Bazar, Phagwara</span>
                <span className="text-xs font-serif text-[#D4AF37] font-bold">Phone: +91 75085 00417</span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#9D825E] hover:bg-[#886F4E] text-white font-serif font-bold text-xs rounded-full transition-all shadow-md"
              >
                Back to Jewellery Catalog
              </button>
            </div>
          </div>
        ) : (
          /* FORM VIEW */
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="mb-5">
              <span className="text-xs font-serif uppercase tracking-widest text-[#9D825E] font-bold block mb-1">
                Goldsmith Consultation & Visit
              </span>
              <h2 className="text-2xl font-serif text-[#2D2926] font-medium">
                Book an In-Store Consultation
              </h2>
              <p className="text-xs text-[#665E55] mt-1 font-sans">
                Shop No. 15, Bansawala Bazar, Purani Tehsil, Sarafan Bazar Road, Phagwara, Punjab.
              </p>
            </div>

            <div className="space-y-4">
              {/* Consultation Type Grid */}
              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-[#2D2926] mb-2 font-bold">
                  1. Select Service / In-Store Requirement
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CONSULTATION_TYPES.map(ct => (
                    <div
                      key={ct.id}
                      onClick={() => setSelectedConsultation(ct.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedConsultation === ct.id
                          ? 'bg-[#FAF3E0] border-[#9D825E] shadow-sm ring-1 ring-[#9D825E]/40'
                          : 'bg-white border-[#E8E1D5] hover:border-[#9D825E]'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-serif font-bold text-xs text-[#2D2926]">
                        <span>{ct.icon}</span> {ct.title}
                      </div>
                      <p className="text-[11px] text-[#665E55] mt-1 leading-snug font-sans">{ct.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#2D2926] mb-1.5 font-bold">
                    2. Preferred Visit Date
                  </label>
                  <input
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full bg-white border border-[#E8E1D5] rounded-xl px-3 py-2 text-stone-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#9D825E]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#2D2926] mb-1.5 font-bold">
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
                            ? 'bg-[#2D2926] text-[#D4AF37] border-[#2D2926] font-semibold'
                            : 'bg-white text-stone-700 border-[#E8E1D5] hover:border-stone-400'
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
                <label className="block text-xs font-serif uppercase tracking-wider text-[#2D2926] font-bold">
                  3. Contact Information
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="bg-white border border-[#E8E1D5] rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#9D825E]/40"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile / WhatsApp Phone (+91) *"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="bg-white border border-[#E8E1D5] rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#9D825E]/40"
                  />
                </div>

                <textarea
                  rows={2}
                  placeholder="Tell us about the design, gold weight in grams, or requirements (e.g. bride kada, chain, polish)..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full bg-white border border-[#E8E1D5] rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#9D825E]/40"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <div className="mt-6 pt-4 border-t border-[#E8E1D5] flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs text-stone-600 hover:text-stone-900 font-serif"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#9D825E] hover:bg-[#886F4E] text-white font-serif font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Confirm Visit Booking
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

