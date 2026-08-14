import React, { useState } from 'react';
import { X, ShoppingBag, ShieldCheck, Truck, Lock, Check, Trash2, ArrowRight, Gift, Award, MessageCircle, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  if (!isOpen) return null;

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'confirmation'>('cart');

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Phagwara');
  const [stateName, setStateName] = useState('Punjab');
  const [pincode, setPincode] = useState('144401');
  const [paymentMethod, setPaymentMethod] = useState<'store-pickup' | 'upi' | 'bank-transfer'>('store-pickup');
  const [boxChoice, setBoxChoice] = useState<'royal-velvet' | 'traditional-wooden'>('royal-velvet');
  const [orderNumber, setOrderNumber] = useState<string>('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrder = `SGK-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrder);
    setCheckoutStep('confirmation');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 md:p-6 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-2xl shadow-2xl overflow-hidden border border-[#E8E1D5] flex flex-col max-h-[92vh] text-left">
        
        {/* Top Bar */}
        <div className="p-5 bg-white border-b border-[#E8E1D5] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#9D825E]" />
            <h3 className="font-serif text-lg font-bold text-[#2D2926]">
              {checkoutStep === 'cart' && 'Selected Jewellery Order'}
              {checkoutStep === 'shipping' && 'Customer Delivery / Store Pickup Details'}
              {checkoutStep === 'payment' && 'Payment & Verification Option'}
              {checkoutStep === 'confirmation' && 'Order Inquiry Confirmed'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-stone-100 rounded-full text-stone-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: CART ITEMS */}
          {checkoutStep === 'cart' && (
            <div>
              {cartItems.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-[#9D825E]/40 mx-auto mb-3" />
                  <p className="font-serif text-lg text-[#2D2926]">Your jewellery selection is currently empty</p>
                  <p className="text-xs text-[#665E55] mt-1 font-sans">Explore our pure gold ornaments, Punjabi Kadas, and bridal collections.</p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2.5 bg-[#2D2926] text-[#D4AF37] rounded-full font-serif text-xs font-bold shadow-sm"
                  >
                    Browse Gold Designs
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="divide-y divide-[#E8E1D5]">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="py-4 flex gap-4 items-center">
                        <img
                          src={item.product.mainImage}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-xl border border-[#E8E1D5] shrink-0"
                        />
                        <div className="flex-1">
                          <span className="text-[10px] font-serif uppercase tracking-wider text-[#9D825E] font-bold block">
                            {item.product.collection} • {item.product.purity}
                          </span>
                          <h4 className="font-serif text-base font-bold text-[#2D2926]">{item.product.name}</h4>
                          <div className="text-xs text-[#665E55] mt-0.5 space-y-0.5 font-sans">
                            <p>Weight / Polish: <span className="font-medium text-[#2D2926]">{item.product.weight} ({item.selectedMetal.replace('-', ' ')})</span></p>
                            {item.selectedSize && <p>Size: <span className="font-medium text-[#2D2926]">{item.selectedSize}</span></p>}
                            {item.engravingText && (
                              <p className="text-[#9D825E] font-serif italic">
                                Custom Gurmukhi/English Engraving: &ldquo;{item.engravingText}&rdquo;
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-serif text-base font-bold text-[#2D2926] block">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-stone-500 block font-sans">Estimated total</span>
                          <div className="flex items-center justify-end gap-2 mt-2">
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-xs text-rose-700 hover:text-rose-900 flex items-center gap-1 font-sans"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Trust Highlights */}
                  <div className="p-4 bg-[#FAF3E0] rounded-xl border border-[#D9C49A] grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-sans">
                    <div className="flex items-center gap-2 text-[#5C4524]">
                      <ShieldCheck className="w-4 h-4 text-[#9D825E] shrink-0" />
                      <span>100% BIS Hallmarked 22K/24K Gold</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#5C4524]">
                      <Gift className="w-4 h-4 text-[#9D825E] shrink-0" />
                      <span>Complimentary Velvet Jewellery Box</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#5C4524]">
                      <Award className="w-4 h-4 text-[#9D825E] shrink-0" />
                      <span>Free Lifetime Cleaning & Polish</span>
                    </div>
                  </div>

                  {/* Summary & Proceed */}
                  <div className="pt-4 border-t border-[#E8E1D5] flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                      <span className="text-xs text-[#665E55] font-serif uppercase tracking-wider block">Estimated Price</span>
                      <span className="text-2xl font-serif text-[#2D2926] font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                      <span className="text-[11px] text-stone-500 block font-sans">(Final billing based on daily live gold rate at store)</span>
                    </div>
                    <button
                      onClick={() => setCheckoutStep('shipping')}
                      className="w-full md:w-auto px-8 py-3 bg-[#9D825E] hover:bg-[#886F4E] text-white font-serif font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      Proceed to Details <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: SHIPPING / CONTACT */}
          {checkoutStep === 'shipping' && (
            <div className="space-y-5 font-sans text-xs">
              <h4 className="font-serif text-base font-bold text-[#2D2926] border-b border-[#E8E1D5] pb-2">
                Customer & Delivery Information
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#2D2926] font-serif font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Manpreet Singh"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full bg-white border border-[#E8E1D5] rounded-xl px-3 py-2 text-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-[#2D2926] font-serif font-semibold mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-white border border-[#E8E1D5] rounded-xl px-3 py-2 text-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-[#2D2926] font-serif font-semibold mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="e.g. name@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#E8E1D5] rounded-xl px-3 py-2 text-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-[#2D2926] font-serif font-semibold mb-1">City / Town *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Phagwara / Jalandhar / Ludhiana"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full bg-white border border-[#E8E1D5] rounded-xl px-3 py-2 text-stone-800"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[#2D2926] font-serif font-semibold mb-1">Street Address / Village / Landmark *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. House No. 42, Model Town / Sarafan Bazar area"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full bg-white border border-[#E8E1D5] rounded-xl px-3 py-2 text-stone-800"
                  />
                </div>
              </div>

              {/* Presentation Box Choice */}
              <div className="p-4 bg-white rounded-xl border border-[#E8E1D5]">
                <label className="block text-xs font-serif uppercase tracking-wider text-[#2D2926] font-bold mb-2">
                  Complimentary Gift Box Presentation
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setBoxChoice('royal-velvet')}
                    className={`p-3 rounded-xl border transition-all text-left ${
                      boxChoice === 'royal-velvet'
                        ? 'bg-[#FAF3E0] text-[#5C4524] border-[#9D825E] font-semibold'
                        : 'bg-white text-stone-800 border-[#E8E1D5]'
                    }`}
                  >
                    👑 Red & Gold Royal Punjabi Velvet Box
                  </button>
                  <button
                    type="button"
                    onClick={() => setBoxChoice('traditional-wooden')}
                    className={`p-3 rounded-xl border transition-all text-left ${
                      boxChoice === 'traditional-wooden'
                        ? 'bg-[#FAF3E0] text-[#5C4524] border-[#9D825E] font-semibold'
                        : 'bg-white text-stone-800 border-[#E8E1D5]'
                    }`}
                  >
                    🪵 Premium Hardwood Keepsake Case
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E1D5] flex justify-between">
                <button
                  onClick={() => setCheckoutStep('cart')}
                  className="px-5 py-2.5 text-xs text-stone-600 font-serif"
                >
                  Back to Bag
                </button>
                <button
                  onClick={() => setCheckoutStep('payment')}
                  disabled={!fullName || !phone || !address}
                  className="px-6 py-2.5 bg-[#9D825E] hover:bg-[#886F4E] text-white font-serif font-bold text-xs rounded-xl disabled:opacity-50"
                >
                  Continue to Order Verification
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT / PICKUP METHOD */}
          {checkoutStep === 'payment' && (
            <form onSubmit={handlePlaceOrder} className="space-y-5 font-sans text-xs">
              <h4 className="font-serif text-base font-bold text-[#2D2926] border-b border-[#E8E1D5] pb-2">
                Order Fulfillment & Payment Preference
              </h4>

              <div className="space-y-3">
                {[
                  { id: 'store-pickup', title: 'Visit Store & Pay upon Hallmark Verification (Recommended)', desc: 'Inspect the ornaments in person at Shop No. 15, Bansawala Bazar, Phagwara.' },
                  { id: 'upi', title: 'UPI / Google Pay / PhonePe / Paytm Advance', desc: 'Secure advance token transfer with instant WhatsApp receipt.' },
                  { id: 'bank-transfer', title: 'NEFT / RTGS Bank Transfer / NRI Account', desc: 'Ideal for overseas Punjabi patrons and wedding orders.' }
                ].map((pm) => (
                  <div
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === pm.id
                        ? 'bg-[#FAF3E0] border-[#9D825E] shadow-sm ring-1 ring-[#9D825E]/40'
                        : 'bg-white border-[#E8E1D5]'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#2D2926]">
                      <Lock className="w-3.5 h-3.5 text-[#9D825E]" /> {pm.title}
                    </div>
                    <p className="text-[11px] text-[#665E55] mt-0.5 font-sans">{pm.desc}</p>
                  </div>
                ))}
              </div>

              {/* Order Final Summary */}
              <div className="p-4 bg-[#2D2926] text-amber-100 rounded-xl border border-[#9D825E]/40 text-xs space-y-1.5 font-sans">
                <div className="flex justify-between">
                  <span>Selected Jewellery ({cartItems.length} items):</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hallmark Certification & Purity Test:</span>
                  <span className="text-emerald-400 font-semibold">INCLUDED</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#9D825E]/30 text-sm font-bold text-[#D4AF37] font-serif">
                  <span>Estimated Total Amount:</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E1D5] flex justify-between">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('shipping')}
                  className="px-5 py-2.5 text-xs text-stone-600 font-serif"
                >
                  Back to Details
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#9D825E] hover:bg-[#886F4E] text-white font-serif font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" /> Confirm Jewellery Order Inquiry
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: CONFIRMATION */}
          {checkoutStep === 'confirmation' && (
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-300">
                <Check className="w-7 h-7" />
              </div>

              <span className="text-xs font-serif uppercase tracking-widest text-[#9D825E] font-bold block mb-1">
                Order Inquiry Received
              </span>
              <h3 className="text-2xl font-serif text-[#2D2926] font-bold">Thank You for Choosing Shri Guru Kirpa Jewellers</h3>
              <p className="text-xs text-[#665E55] mt-1 font-sans">
                Order Reference Code: <span className="font-mono font-bold text-[#9D825E]">{orderNumber}</span>
              </p>

              <div className="my-6 p-5 bg-white rounded-xl border border-[#E8E1D5] text-left text-xs space-y-2 max-w-md mx-auto font-sans">
                <div className="flex justify-between border-b border-[#E8E1D5] pb-2">
                  <span className="text-[#665E55]">Customer Name:</span>
                  <span className="font-semibold text-[#2D2926]">{fullName || 'Valued Customer'}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8E1D5] pb-2">
                  <span className="text-[#665E55]">Store Location:</span>
                  <span className="font-semibold text-[#2D2926]">Shop No. 15, Bansawala Bazar, Phagwara</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#665E55]">Goldsmith Contact:</span>
                  <span className="font-bold text-[#9D825E]">+91 75085 00417</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={`https://wa.me/917508500417?text=Hello%20Shri%20Guru%20Kirpa%20Jewellers,%20I%20have%20submitted%20order%20inquiry%20${orderNumber}%20for%20₹${subtotal.toLocaleString('en-IN')}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-serif font-bold text-xs rounded-full shadow-sm flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" /> Send Order on WhatsApp
                </a>
                <button
                  onClick={() => {
                    onClearCart();
                    onClose();
                    setCheckoutStep('cart');
                  }}
                  className="px-6 py-2.5 bg-[#2D2926] hover:bg-[#1A1817] text-[#D4AF37] font-serif font-bold text-xs rounded-full shadow-sm"
                >
                  Return to Store Catalog
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

