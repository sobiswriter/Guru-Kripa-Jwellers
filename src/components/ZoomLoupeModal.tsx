import React, { useState, useRef } from 'react';
import { X, ZoomIn, RotateCcw, ShieldCheck, Calendar, Eye, Feather, MessageCircle, Phone } from 'lucide-react';
import { JewelryProduct, MetalType } from '../types';

interface ZoomLoupeModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: JewelryProduct | null;
  onOpenAppointment: (product: JewelryProduct) => void;
  onOpenTryOn: (product: JewelryProduct) => void;
}

export const ZoomLoupeModal: React.FC<ZoomLoupeModalProps> = ({
  isOpen,
  onClose,
  product,
  onOpenAppointment,
  onOpenTryOn
}) => {
  if (!isOpen || !product) return null;

  // Active view tab: 'loupe' | 'rotation' | 'certificate'
  const [activeTab, setActiveTab] = useState<'loupe' | 'rotation' | 'certificate'>('loupe');

  // Loupe position state
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50, show: false });
  const [zoomFactor, setZoomFactor] = useState<number>(3); // 2x to 8x loupe

  // 360 Rotation state
  const [rotationAngle, setRotationAngle] = useState<number>(0); // 0 to 360
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);

  // Custom Metal & Engraving
  const [selectedMetal, setSelectedMetal] = useState<MetalType>(
    product.metalsAvailable[0]?.type || '22k-yellow-gold'
  );
  const [engravingText, setEngravingText] = useState<string>('');

  const fallbackImg = 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=1200';

  // Handle loupe mouse move over image
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLoupePos({ x, y, show: true });
  };

  const handleMouseLeave = () => {
    setLoupePos(prev => ({ ...prev, show: false }));
  };

  // 360 Drag rotation handlers
  const handleMouseDown360 = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
  };

  const handleMouseMove360 = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    setRotationAngle(prev => (prev + deltaX * 0.8) % 360);
    startXRef.current = e.clientX;
  };

  const handleMouseUp360 = () => {
    isDraggingRef.current = false;
  };

  const whatsappInquiryText = `Hello Shri Guru Kirpa Jewellers, I am interested in viewing "${product.name}" (${product.purity || '22K Gold'}, ₹${product.price.toLocaleString('en-IN')})${engravingText ? ` with custom engraving: "${engravingText}"` : ''}. Can I book an appointment to see it in person?`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 md:p-6 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#fdfbf7] rounded-2xl shadow-2xl overflow-hidden border border-[#e6dfd5] flex flex-col lg:flex-row max-h-[92vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-[#1a1817] rounded-full shadow-md transition-all border border-[#e6dfd5]"
          title="Close Loupe Inspector"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Side: High-Res Loupe Lens & 360 Inspector */}
        <div className="lg:w-2/3 bg-stone-950 relative flex flex-col items-center justify-center p-6 min-h-[420px] lg:min-h-[600px] select-none">
          
          {/* Top Bar Tab Switchers */}
          <div className="absolute top-4 left-4 z-10 flex gap-2 items-center flex-wrap">
            <span className="px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-serif tracking-widest uppercase border border-amber-500/30 flex items-center gap-1.5">
              <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
              Gemological Loupe Studio
            </span>

            <div className="flex bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/15">
              <button
                onClick={() => setActiveTab('loupe')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeTab === 'loupe' ? 'bg-amber-400 text-stone-950 font-semibold' : 'text-stone-300 hover:text-white'
                }`}
              >
                🔍 10x Macro Loupe
              </button>
              <button
                onClick={() => setActiveTab('rotation')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeTab === 'rotation' ? 'bg-amber-400 text-stone-950 font-semibold' : 'text-stone-300 hover:text-white'
                }`}
              >
                🔄 360° Spin View
              </button>
              <button
                onClick={() => setActiveTab('certificate')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeTab === 'certificate' ? 'bg-amber-400 text-stone-950 font-semibold' : 'text-stone-300 hover:text-white'
                }`}
              >
                📜 BIS Hallmark & Purity
              </button>
            </div>
          </div>

          {/* TAB 1: 10X MACRO LOUPE MAGNIFIER */}
          {activeTab === 'loupe' && (
            <div className="relative w-full h-full flex items-center justify-center max-w-xl">
              <div
                className="relative cursor-crosshair overflow-hidden rounded-xl shadow-2xl border border-stone-800"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={product.highResZoomImage || product.mainImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackImg;
                  }}
                  className="w-full max-h-[520px] object-contain"
                />

                {/* Loupe Glass Lens Circle */}
                {loupePos.show && (
                  <div
                    className="absolute pointer-events-none rounded-full border-4 border-amber-400/80 shadow-2xl overflow-hidden z-20 transition-transform duration-75"
                    style={{
                      width: '200px',
                      height: '200px',
                      left: `calc(${loupePos.x}% - 100px)`,
                      top: `calc(${loupePos.y}% - 100px)`,
                      backgroundImage: `url(${product.highResZoomImage || product.mainImage})`,
                      backgroundPosition: `${loupePos.x}% ${loupePos.y}%`,
                      backgroundSize: `${zoomFactor * 100}%`,
                      boxShadow: '0 0 35px rgba(212, 175, 55, 0.4), inset 0 0 15px rgba(0,0,0,0.6)'
                    }}
                  >
                    <div className="absolute inset-0 rounded-full border border-white/40 pointer-events-none" />
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded-full">
                      {zoomFactor}x Macro Loupe
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Loupe Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs text-stone-300">
                <span>Hover over image to inspect gold polish & filigree craftsmanship</span>
                <span className="text-stone-500">|</span>
                <span>Zoom Level:</span>
                {[2, 3, 5, 8].map(zf => (
                  <button
                    key={zf}
                    onClick={() => setZoomFactor(zf)}
                    className={`px-2 py-0.5 rounded ${
                      zoomFactor === zf ? 'bg-amber-400 text-stone-950 font-bold' : 'hover:text-white'
                    }`}
                  >
                    {zf}x
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: 360 DEGREE ROTATION VIEW */}
          {activeTab === 'rotation' && (
            <div
              className="relative w-full h-full flex flex-col items-center justify-center cursor-grab active:cursor-grabbing max-w-xl"
              onMouseDown={handleMouseDown360}
              onMouseMove={handleMouseMove360}
              onMouseUp={handleMouseUp360}
            >
              <div
                className="relative transition-transform ease-out duration-75"
                style={{ transform: `rotateY(${rotationAngle}deg)` }}
              >
                <img
                  src={product.mainImage}
                  alt="360 view"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackImg;
                  }}
                  className="max-h-[460px] object-contain drop-shadow-[0_20px_50px_rgba(212,175,55,0.2)]"
                />
              </div>

              <div className="mt-4 text-center bg-black/60 px-4 py-2 rounded-full text-xs text-amber-200 border border-amber-500/20">
                <RotateCcw className="w-3.5 h-3.5 inline mr-1.5 animate-spin" />
                Click & Drag horizontally to rotate 360° ({Math.round(((rotationAngle % 360) + 360) % 360)}°)
              </div>
            </div>
          )}

          {/* TAB 3: BIS HALLMARK & PURITY CERTIFICATE */}
          {activeTab === 'certificate' && (
            <div className="w-full max-w-lg bg-[#FAF8F5] text-stone-900 rounded-2xl p-6 border-2 border-amber-600/40 shadow-2xl relative">
              <div className="flex justify-between items-start border-b border-amber-800/20 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-amber-700" />
                    <h3 className="font-serif text-xl font-bold text-amber-950">BIS Hallmark & Purity Guarantee</h3>
                  </div>
                  <p className="text-xs text-stone-500 font-serif italic mt-0.5">Bureau of Indian Standards & Shri Guru Kirpa Authenticity Certificate</p>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full font-mono text-xs font-bold border border-amber-300">
                  HUID # SGK-916-2026
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs mb-6 font-sans">
                <div className="p-3 bg-white rounded-xl border border-stone-200">
                  <span className="text-stone-500 uppercase font-serif text-[10px] block">Gold Purity</span>
                  <span className="font-bold text-base text-stone-900">{product.purity || '22K (916 Hallmarked)'}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-stone-200">
                  <span className="text-stone-500 uppercase font-serif text-[10px] block">Gold Weight</span>
                  <span className="font-bold text-base text-stone-900">{product.goldWeight || '24.50 grams'}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-stone-200">
                  <span className="text-stone-500 uppercase font-serif text-[10px] block">Goldsmith Workshop</span>
                  <span className="font-bold text-base text-stone-900">Phagwara, Punjab</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-stone-200">
                  <span className="text-stone-500 uppercase font-serif text-[10px] block">Gemstone / Setting</span>
                  <span className="font-bold text-base text-stone-900">{product.gemstoneSpec.type}</span>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200/80 text-xs text-amber-950 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-amber-900">
                  <ShieldCheck className="w-4 h-4 text-amber-700" /> 100% Genuine Certified & Tested
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed font-sans">
                  Crafted by master goldsmiths in Phagwara with lifetime buy-back and exchange guarantee at current market gold value.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Product Information, Engraving & Actions */}
        <div className="lg:w-1/3 p-6 flex flex-col justify-between overflow-y-auto bg-[#fdfbf7]">
          <div>
            <div className="mb-4">
              <span className="text-[10px] font-serif uppercase tracking-widest text-[#9D825E] font-bold">
                {product.collection} • {product.purity}
              </span>
              <h2 className="font-serif text-2xl text-stone-900 font-bold leading-snug mt-1">
                {product.name}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xl font-serif text-[#2D2926] font-bold">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed mb-5 font-sans">
              {product.description}
            </p>

            {/* Metal Finish Selector */}
            <div className="mb-5">
              <label className="block text-xs font-serif uppercase tracking-widest text-stone-700 mb-2 font-semibold">
                Select Gold Polish / Finish
              </label>
              <div className="grid grid-cols-2 gap-2">
                {product.metalsAvailable.map(metal => (
                  <button
                    key={metal.type}
                    onClick={() => setSelectedMetal(metal.type)}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                      selectedMetal === metal.type
                        ? 'border-amber-600 bg-amber-100/50 text-amber-950 shadow-sm font-semibold'
                        : 'border-[#e6dfd5] bg-white text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-stone-300"
                      style={{ backgroundColor: metal.hexColor }}
                    />
                    {metal.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Engraving Live Preview */}
            {product.engravingSupported && (
              <div className="mb-6 p-4 bg-amber-50/60 rounded-xl border border-amber-200/80">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-serif uppercase tracking-widest text-amber-900 font-bold flex items-center gap-1.5">
                    <Feather className="w-3.5 h-3.5 text-amber-700" /> Complimentary Gurmukhi / English Engraving
                  </label>
                  <span className="text-[10px] text-stone-500 font-mono">Max 25 chars</span>
                </div>
                <input
                  type="text"
                  maxLength={25}
                  placeholder="e.g. ਨਿਰਭਉ ਨਿਰਵੈਰ or Gurkirpa 2026"
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  className="w-full bg-white border border-[#e6dfd5] rounded-lg px-3 py-2 text-stone-800 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />

                {engravingText && (
                  <div className="mt-3 p-2.5 bg-stone-900 text-amber-300 rounded-lg text-center font-serif italic text-xs tracking-widest border border-amber-500/30">
                    &ldquo;{engravingText}&rdquo;
                    <span className="block text-[9px] text-stone-400 non-italic uppercase font-sans mt-0.5">Hand-carved / laser engraved on jewelry</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions Footer - Book In-Store Visit & Contact */}
          <div className="space-y-2.5 pt-4 border-t border-[#e6dfd5]">
            <button
              onClick={() => {
                onClose();
                onOpenAppointment(product);
              }}
              className="w-full py-3.5 bg-[#9D825E] hover:bg-[#886F4E] text-white rounded-xl font-serif text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Calendar className="w-4 h-4" /> Book In-Store Visit to View This Piece
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`https://wa.me/917508500417?text=${encodeURIComponent(whatsappInquiryText)}`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl font-serif text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm text-center"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Us
              </a>

              <a
                href="tel:+917508500417"
                className="py-2.5 bg-[#2D2926] hover:bg-stone-800 text-[#E8DCC4] rounded-xl font-serif text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm text-center"
              >
                <Phone className="w-3.5 h-3.5" /> Call Store
              </a>
            </div>

            {product.tryOnType && (
              <button
                onClick={() => {
                  onClose();
                  onOpenTryOn(product);
                }}
                className="w-full py-2.5 bg-stone-200/70 hover:bg-stone-200 text-[#2D2926] rounded-xl font-serif text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-[#9D825E]" /> AR Virtual Try-On
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
