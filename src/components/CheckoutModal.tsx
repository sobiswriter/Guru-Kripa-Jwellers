import React, { useState } from 'react';
import { X, ShoppingBag, ShieldCheck, Truck, Lock, Check, Trash2, ArrowRight, Gift, Award, Sparkles } from 'lucide-react';
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
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('United States');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wire' | 'applepay'>('card');
  const [giftBoxChoice, setGiftBoxChoice] = useState<'midnight-velvet' | 'champagne-silk'>('midnight-velvet');
  const [orderNumber, setOrderNumber] = useState<string>('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrder = `AC-HAUTE-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrder);
    setCheckoutStep('confirmation');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 md:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#fdfbf7] rounded-2xl shadow-2xl overflow-hidden border border-[#e6dfd5] flex flex-col max-h-[92vh]">
        
        {/* Top Bar */}
        <div className="p-5 bg-white border-b border-[#e6dfd5] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-700" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              {checkoutStep === 'cart' && 'Your Shopping Bag'}
              {checkoutStep === 'shipping' && 'White-Glove Shipping & Delivery'}
              {checkoutStep === 'payment' && 'Secure Insured Payment'}
              {checkoutStep === 'confirmation' && 'Order Acquisition Confirmed'}
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
                  <ShoppingBag className="w-12 h-12 text-amber-800/40 mx-auto mb-3" />
                  <p className="font-serif text-lg text-stone-800">Your shopping bag is currently empty</p>
                  <p className="text-xs text-stone-500 mt-1">Explore our fine jewelry collections or launch the AR Virtual Try-On Studio.</p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2.5 bg-stone-900 text-amber-300 rounded-full font-serif text-xs font-semibold uppercase tracking-wider"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="divide-y divide-[#e6dfd5]">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="py-4 flex gap-4 items-center">
                        <img
                          src={item.product.mainImage}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-xl border border-[#e6dfd5] shrink-0"
                        />
                        <div className="flex-1">
                          <span className="text-[10px] font-serif uppercase tracking-widest text-amber-800 font-bold block">
                            {item.product.collection}
                          </span>
                          <h4 className="font-serif text-base font-semibold text-stone-900">{item.product.name}</h4>
                          <div className="text-xs text-stone-600 mt-0.5 space-y-0.5">
                            <p>Setting: <span className="font-semibold text-stone-800 capitalize">{item.selectedMetal.replace('-', ' ')}</span></p>
                            {item.selectedSize && <p>Size/Length: <span className="font-semibold text-stone-800">{item.selectedSize}</span></p>}
                            {item.engravingText && (
                              <p className="text-amber-800 font-serif italic">
                                Engraved: &ldquo;{item.engravingText}&rdquo;
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-serif text-base font-bold text-stone-900 block">
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </span>
                          <div className="flex items-center justify-end gap-2 mt-2">
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-xs text-rose-700 hover:text-rose-900 flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Complimentary Perks Banner */}
                  <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200/80 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-amber-800 shrink-0" />
                      <span>Complimentary Insured Courier Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-amber-800 shrink-0" />
                      <span>Handmade Velvet Gift Box Included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-800 shrink-0" />
                      <span>GIA Certificate & Lifetime Warranty</span>
                    </div>
                  </div>

                  {/* Summary & Proceed */}
                  <div className="pt-4 border-t border-[#e6dfd5] flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                      <span className="text-xs text-stone-500 font-serif uppercase tracking-widest block">Subtotal</span>
                      <span className="text-2xl font-serif text-stone-900 font-bold">${subtotal.toLocaleString()} USD</span>
                    </div>
                    <button
                      onClick={() => setCheckoutStep('shipping')}
                      className="w-full md:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      Proceed to Secure Checkout <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: SHIPPING */}
          {checkoutStep === 'shipping' && (
            <div className="space-y-5">
              <h4 className="font-serif text-base font-semibold text-stone-900 border-b border-[#e6dfd5] pb-2">
                Recipient & Delivery Address
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-serif mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lady Genevieve Vance"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full bg-white border border-[#e6dfd5] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-serif mb-1">Email Address for Tracking *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. vance@estate.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#e6dfd5] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-stone-700 font-serif mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 12 Kensington Palace Gardens"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full bg-white border border-[#e6dfd5] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-serif mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. London / New York"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full bg-white border border-[#e6dfd5] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-serif mb-1">Country *</label>
                  <select
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="w-full bg-white border border-[#e6dfd5] rounded-xl px-3 py-2 text-xs font-semibold"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="France">France</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Japan">Japan</option>
                    <option value="Singapore">Singapore</option>
                  </select>
                </div>
              </div>

              {/* Gift Box Customization */}
              <div className="p-4 bg-stone-100/70 rounded-xl border border-stone-200">
                <label className="block text-xs font-serif uppercase tracking-widest text-stone-800 font-semibold mb-2">
                  Complimentary Presentation Box Choice
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setGiftBoxChoice('midnight-velvet')}
                    className={`p-3 rounded-xl border transition-all text-left ${
                      giftBoxChoice === 'midnight-velvet'
                        ? 'bg-stone-900 text-amber-300 border-stone-900 font-semibold'
                        : 'bg-white text-stone-800 border-[#e6dfd5]'
                    }`}
                  >
                    🖤 Midnight Black Velvet Box with Gold Crest
                  </button>
                  <button
                    type="button"
                    onClick={() => setGiftBoxChoice('champagne-silk')}
                    className={`p-3 rounded-xl border transition-all text-left ${
                      giftBoxChoice === 'champagne-silk'
                        ? 'bg-amber-100 text-amber-950 border-amber-500 font-semibold'
                        : 'bg-white text-stone-800 border-[#e6dfd5]'
                    }`}
                  >
                    ✨ Champagne Silk Keepsake Case
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-[#e6dfd5] flex justify-between">
                <button
                  onClick={() => setCheckoutStep('cart')}
                  className="px-5 py-2.5 text-xs text-stone-600 font-serif"
                >
                  Back to Bag
                </button>
                <button
                  onClick={() => setCheckoutStep('payment')}
                  disabled={!fullName || !email || !address}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif font-semibold text-xs rounded-xl disabled:opacity-50"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT */}
          {checkoutStep === 'payment' && (
            <form onSubmit={handlePlaceOrder} className="space-y-5">
              <h4 className="font-serif text-base font-semibold text-stone-900 border-b border-[#e6dfd5] pb-2">
                Insured Payment Method
              </h4>

              <div className="space-y-3">
                {[
                  { id: 'card', title: 'Credit Card / Platinum Express (256-Bit SSL Encrypted)', desc: 'Visa, Mastercard, American Express' },
                  { id: 'applepay', title: 'Apple Pay / Digital Wallet', desc: 'Instant 1-Click Authentication' },
                  { id: 'wire', title: 'Concierge Bank Wire Transfer (1.5% Insured Discount)', desc: 'Bank wire instructions dispatched upon completion' }
                ].map((pm) => (
                  <div
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === pm.id
                        ? 'bg-amber-50 border-amber-600 shadow-sm ring-1 ring-amber-500/20'
                        : 'bg-white border-[#e6dfd5]'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-serif font-bold text-stone-900">
                      <Lock className="w-3.5 h-3.5 text-amber-700" /> {pm.title}
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">{pm.desc}</p>
                  </div>
                ))}
              </div>

              {/* Order Final Summary */}
              <div className="p-4 bg-stone-900 text-amber-100 rounded-xl border border-amber-500/30 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items):</span>
                  <span>${subtotal.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between">
                  <span>Armored Courier Insured Shipping:</span>
                  <span className="text-emerald-400 font-semibold">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-amber-500/30 text-sm font-bold text-amber-300">
                  <span>Total Amount:</span>
                  <span>${subtotal.toLocaleString()} USD</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#e6dfd5] flex justify-between">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('shipping')}
                  className="px-5 py-2.5 text-xs text-stone-600 font-serif"
                >
                  Back to Shipping
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-serif font-bold text-sm rounded-xl shadow-lg flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" /> Authorize & Complete Acquisition
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: CONFIRMATION */}
          {checkoutStep === 'confirmation' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-300">
                <Check className="w-8 h-8" />
              </div>

              <span className="text-xs font-serif uppercase tracking-[0.2em] text-amber-800 font-bold block mb-1">
                Acquisition Confirmed
              </span>
              <h3 className="text-2xl font-serif text-stone-900 font-bold">Thank You For Choosing Aura & Carat</h3>
              <p className="text-xs text-stone-600 mt-2">
                Order Reference: <span className="font-mono font-bold text-amber-900">{orderNumber}</span>
              </p>

              <div className="my-6 p-5 bg-white rounded-xl border border-[#e6dfd5] text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-[#e6dfd5] pb-2">
                  <span className="text-stone-500">Insured Recipient:</span>
                  <span className="font-semibold text-stone-800">{fullName || 'Valued Patron'}</span>
                </div>
                <div className="flex justify-between border-b border-[#e6dfd5] pb-2">
                  <span className="text-stone-500">Estimated Armored Arrival:</span>
                  <span className="font-semibold text-stone-800">Within 3-5 Business Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">GIA Passport & Certificate:</span>
                  <span className="font-semibold text-emerald-700">Enclosed in Box</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClearCart();
                  onClose();
                  setCheckoutStep('cart');
                }}
                className="px-8 py-3 bg-stone-900 hover:bg-stone-800 text-amber-300 font-serif font-semibold text-xs rounded-full shadow-md"
              >
                Return to Boutique
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
