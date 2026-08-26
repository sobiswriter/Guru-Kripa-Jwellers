import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, RotateCw, ZoomIn, ZoomOut, Move, Download, Calendar, MessageCircle, Phone, X, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { JewelryProduct, MetalType } from '../types';
import { PRODUCTS } from '../data/products';

interface VirtualTryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: JewelryProduct;
  onBookAppointment: (product?: JewelryProduct) => void;
}

// Sample background models for quick try-on without camera
const SAMPLE_HANDS = [
  { id: 'hand-1', name: 'Olive Skin tone (Ring Pose)', url: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=1000' },
  { id: 'hand-2', name: 'Fair Skin tone (Manicured Hand)', url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1000' },
  { id: 'hand-3', name: 'Rich Deep Skin tone', url: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=1000' }
];

const SAMPLE_NECKS = [
  { id: 'neck-1', name: 'Elegance Portrait (Silk Dress)', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000' },
  { id: 'neck-2', name: 'Evening Gown Neckline', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1000' },
  { id: 'neck-3', name: 'Minimalist Portrait', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1000' }
];

export const VirtualTryOnModal: React.FC<VirtualTryOnModalProps> = ({
  isOpen,
  onClose,
  initialProduct,
  onBookAppointment
}) => {
  if (!isOpen) return null;

  // Filter ring and necklace products for try-on
  const tryOnProducts = PRODUCTS.filter(p => p.tryOnType === 'ring' || p.tryOnType === 'necklace');
  const [selectedProduct, setSelectedProduct] = useState<JewelryProduct>(
    initialProduct && initialProduct.tryOnType ? initialProduct : tryOnProducts[0]
  );

  const [mode, setMode] = useState<'ring' | 'necklace'>(
    selectedProduct.tryOnType || 'ring'
  );

  // Metal selection
  const [selectedMetal, setSelectedMetal] = useState<MetalType>(
    selectedProduct.metalsAvailable[0]?.type || '22k-yellow-gold'
  );

  // Size selection
  const [selectedSize, setSelectedSize] = useState<string>(
    selectedProduct.sizesAvailable ? selectedProduct.sizesAvailable[2] || selectedProduct.sizesAvailable[0] : 'Standard'
  );

  // Camera vs Image Source
  const [sourceType, setSourceType] = useState<'sample' | 'camera' | 'upload'>('sample');
  const [sampleIndex, setSampleIndex] = useState<number>(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Overlay Transformations
  const [posX, setPosX] = useState<number>(50); // percentage 0 - 100
  const [posY, setPosY] = useState<number>(50); // percentage 0 - 100
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(100);

  // Camera stream ref
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Canvas composite ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  // Change mode when product changes
  useEffect(() => {
    if (selectedProduct.tryOnType) {
      setMode(selectedProduct.tryOnType);
      // Reset default positions
      setPosX(50);
      setPosY(selectedProduct.tryOnType === 'ring' ? 52 : 42);
      setScale(selectedProduct.tryOnScaleDefault || 1);
      setRotation(0);
    }
  }, [selectedProduct]);

  // Handle Camera activation
  useEffect(() => {
    if (sourceType === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [sourceType]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError('Unable to access camera. Please allow camera permissions or try uploading a photo.');
      setSourceType('sample');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          setUploadedImage(evt.target.result as string);
          setSourceType('upload');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Get current active background image URL
  const getBackgroundImage = () => {
    if (sourceType === 'upload' && uploadedImage) return uploadedImage;
    if (mode === 'ring') {
      return SAMPLE_HANDS[sampleIndex % SAMPLE_HANDS.length].url;
    }
    return SAMPLE_NECKS[sampleIndex % SAMPLE_NECKS.length].url;
  };

  // Capture canvas composite image
  const captureComposite = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;

    const bgImg = new Image();
    bgImg.crossOrigin = 'anonymous';

    const renderComposite = (bgSource: HTMLImageElement | HTMLVideoElement) => {
      ctx.drawImage(bgSource, 0, 0, canvas.width, canvas.height);

      // Draw overlay jewelry
      const jewelryImg = new Image();
      jewelryImg.crossOrigin = 'anonymous';
      jewelryImg.onload = () => {
        ctx.save();
        const targetX = (posX / 100) * canvas.width;
        const targetY = (posY / 100) * canvas.height;
        ctx.translate(targetX, targetY);
        ctx.rotate((rotation * Math.PI) / 180);

        const baseWidth = mode === 'ring' ? 220 : 320;
        const width = baseWidth * scale;
        const height = width * (jewelryImg.height / jewelryImg.width);

        // Apply metal tint filter if needed
        if (selectedMetal === '22k-yellow-gold') {
          ctx.filter = 'sepia(0.6) saturate(1.8) hue-rotate(5deg)';
        } else if (selectedMetal === 'rose-gold') {
          ctx.filter = 'sepia(0.5) saturate(1.5) hue-rotate(320deg)';
        } else {
          ctx.filter = 'brightness(1.1) contrast(1.1)';
        }

        ctx.drawImage(jewelryImg, -width / 2, -height / 2, width, height);
        ctx.restore();

        // Add brand watermark
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(20, canvas.height - 60, 320, 42);
        ctx.font = 'bold 15px Georgia, serif';
        ctx.fillStyle = '#2D2926';
        ctx.fillText('Shri Guru Kirpa Jewellers • Phagwara', 30, canvas.height - 34);

        const dataUrl = canvas.toDataURL('image/png');
        setCapturedPhoto(dataUrl);
      };
      jewelryImg.src = selectedProduct.tryOnOverlayImage || selectedProduct.mainImage;
    };

    if (sourceType === 'camera' && videoRef.current) {
      renderComposite(videoRef.current);
    } else {
      bgImg.onload = () => renderComposite(bgImg);
      bgImg.src = getBackgroundImage();
    }
  };

  const downloadPhoto = () => {
    if (!capturedPhoto) return;
    const link = document.createElement('a');
    link.download = `GuruKirpa_TryOn_${selectedProduct.name.replace(/\s+/g, '_')}.png`;
    link.href = capturedPhoto;
    link.click();
  };

  const whatsappInquiryText = `Hello Shri Guru Kirpa Jewellers, I tried the virtual AR fitting for "${selectedProduct.name}" (${selectedProduct.purity || '22K Gold'}, ₹${selectedProduct.price.toLocaleString('en-IN')}). I would like to visit the Phagwara store to try it in person.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 md:p-6 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#fdfbf7] rounded-2xl shadow-2xl overflow-hidden border border-[#e6dfd5] flex flex-col lg:flex-row max-h-[92vh]">
        
        {/* Header Bar Mobile Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-[#1a1817] rounded-full shadow-md transition-all border border-[#e6dfd5]"
          title="Close Virtual Try-On"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Side: Interactive Canvas / Camera Display */}
        <div className="lg:w-2/3 bg-stone-900 relative flex items-center justify-center overflow-hidden min-h-[380px] lg:min-h-[600px] select-none">
          
          {/* Top Bar Overlay inside Canvas */}
          <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2 items-center">
            <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md text-amber-300 rounded-full text-xs font-serif tracking-widest uppercase flex items-center gap-1.5 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              Live AR Fitting Studio
            </span>

            {/* Mode Switcher Pills */}
            <div className="flex bg-black/60 backdrop-blur-md rounded-full p-1 border border-white/20">
              <button
                onClick={() => {
                  setMode('ring');
                  const ringP = tryOnProducts.find(p => p.tryOnType === 'ring');
                  if (ringP) setSelectedProduct(ringP);
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  mode === 'ring' ? 'bg-amber-400 text-stone-950 font-semibold shadow' : 'text-stone-300 hover:text-white'
                }`}
              >
                💍 Ring Try-On
              </button>
              <button
                onClick={() => {
                  setMode('necklace');
                  const neckP = tryOnProducts.find(p => p.tryOnType === 'necklace');
                  if (neckP) setSelectedProduct(neckP);
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  mode === 'necklace' ? 'bg-amber-400 text-stone-950 font-semibold shadow' : 'text-stone-300 hover:text-white'
                }`}
              >
                📿 Necklace Try-On
              </button>
            </div>
          </div>

          {/* Source Toggle Controls (Sample / Camera / Upload) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-2 rounded-full border border-white/20 shadow-xl max-w-[90%] overflow-x-auto">
            <button
              onClick={() => setSourceType('sample')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                sourceType === 'sample' ? 'bg-amber-400 text-stone-950 font-semibold' : 'text-stone-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Sample Models
            </button>
            <button
              onClick={() => setSourceType('camera')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                sourceType === 'camera' ? 'bg-amber-400 text-stone-950 font-semibold' : 'text-stone-300 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" /> Live Camera
            </button>
            <label className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-all ${
              sourceType === 'upload' ? 'bg-amber-400 text-stone-950 font-semibold' : 'text-stone-300 hover:text-white'
            }`}>
              <Upload className="w-3.5 h-3.5" /> Upload Photo
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>

            {sourceType === 'sample' && (
              <button
                onClick={() => setSampleIndex(prev => prev + 1)}
                className="ml-2 px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs flex items-center gap-1"
                title="Next model skin tone"
              >
                <RefreshCw className="w-3 h-3" /> Skin Tone
              </button>
            )}
          </div>

          {/* Camera Video Stream OR Image Background */}
          {sourceType === 'camera' ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                ref={videoRef}
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
              {cameraError && (
                <div className="absolute inset-0 bg-stone-950/80 flex items-center justify-center p-6 text-center text-rose-300 text-sm">
                  {cameraError}
                </div>
              )}
            </div>
          ) : (
            <img
              src={getBackgroundImage()}
              alt="Model Hand or Neckline background for AR fitting"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=1000';
              }}
              className="w-full h-full object-cover max-h-[600px] pointer-events-none"
            />
          )}

          {/* Alignment Target Guide Overlay */}
          <div className="absolute inset-0 pointer-events-none border-[1.5px] border-amber-400/20 m-6 rounded-xl flex items-center justify-center">
            <div className="text-center bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full text-[11px] text-amber-200/80 border border-amber-400/20">
              <Move className="w-3 h-3 inline mr-1" />
              {mode === 'ring' ? 'Position ring onto ring finger' : 'Align necklace collar around neck line'}
            </div>
          </div>

          {/* The Dragable & Scalable AR Jewelry Item Overlay */}
          <div
            className="absolute cursor-move transition-transform ease-out"
            style={{
              left: `${posX}%`,
              top: `${posY}%`,
              transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
              filter: selectedMetal === '22k-yellow-gold'
                ? `sepia(0.5) saturate(2) hue-rotate(10deg) brightness(${brightness}%)`
                : selectedMetal === 'rose-gold'
                ? `sepia(0.4) saturate(1.8) hue-rotate(325deg) brightness(${brightness}%)`
                : `brightness(${brightness}%) contrast(1.1)`
            }}
          >
            <img
              src={selectedProduct.tryOnOverlayImage || selectedProduct.mainImage}
              alt={selectedProduct.name}
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=800';
              }}
              className={`object-contain drop-shadow-2xl ${
                mode === 'ring' ? 'w-48 h-48 md:w-56 md:h-56' : 'w-72 h-72 md:w-96 md:h-96'
              }`}
            />
          </div>

          {/* Hidden Canvas element for screenshots */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Captured Snapshot Modal Preview */}
          {capturedPhoto && (
            <div className="absolute inset-0 z-30 bg-stone-950/90 backdrop-blur-md p-6 flex flex-col items-center justify-center">
              <h4 className="text-amber-200 font-serif text-lg mb-3">Your Personalized Fitting Photo</h4>
              <img src={capturedPhoto} alt="Captured fitting" className="max-h-[340px] rounded-lg shadow-2xl border border-amber-500/30 mb-4" />
              <div className="flex gap-3">
                <button
                  onClick={downloadPhoto}
                  className="px-5 py-2.5 bg-amber-400 text-stone-950 rounded-full font-serif font-medium text-sm hover:bg-amber-300 transition-all flex items-center gap-2 shadow-lg"
                >
                  <Download className="w-4 h-4" /> Save fitting photo
                </button>
                <button
                  onClick={() => setCapturedPhoto(null)}
                  className="px-5 py-2.5 bg-white/10 text-stone-300 hover:text-white rounded-full text-sm transition-all"
                >
                  Close preview
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Product Details & Positioning Fine-Tuning Controls */}
        <div className="lg:w-1/3 p-6 flex flex-col justify-between overflow-y-auto bg-[#fdfbf7]">
          
          <div>
            {/* Jewelry Selection Dropdown */}
            <div className="mb-5">
              <label className="block text-xs font-serif uppercase tracking-widest text-amber-900/70 mb-2 font-semibold">
                Select Piece to Try On
              </label>
              <select
                value={selectedProduct.id}
                onChange={(e) => {
                  const p = PRODUCTS.find(prod => prod.id === e.target.value);
                  if (p) setSelectedProduct(p);
                }}
                className="w-full bg-white border border-[#e6dfd5] rounded-xl px-3.5 py-2.5 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 shadow-sm font-medium"
              >
                {tryOnProducts.map(prod => (
                  <option key={prod.id} value={prod.id}>
                    {prod.name} — ₹{prod.price.toLocaleString('en-IN')}
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Product Card Header */}
            <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/60 mb-5">
              <span className="text-[10px] uppercase font-serif tracking-widest text-amber-800 font-semibold">
                {selectedProduct.collection}
              </span>
              <h3 className="font-serif text-lg text-stone-900 font-medium leading-tight mt-0.5">
                {selectedProduct.name}
              </h3>
              <p className="text-amber-900 font-semibold text-lg mt-1 font-serif">
                ₹{selectedProduct.price.toLocaleString('en-IN')}
              </p>
              <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                {selectedProduct.goldWeight || selectedProduct.weight} • {selectedProduct.purity} • {selectedProduct.gemstoneSpec.type}
              </p>
            </div>

            {/* Metal Selection Toggles */}
            <div className="mb-5">
              <label className="block text-xs font-serif uppercase tracking-widest text-stone-600 mb-2">
                Choose Gold Finish
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {selectedProduct.metalsAvailable.map((metal) => (
                  <button
                    key={metal.type}
                    onClick={() => setSelectedMetal(metal.type)}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                      selectedMetal === metal.type
                        ? 'border-amber-600 bg-amber-100/50 text-amber-950 font-semibold shadow-sm'
                        : 'border-[#e6dfd5] bg-white text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-stone-300 shadow-inner"
                      style={{ backgroundColor: metal.hexColor }}
                    />
                    {metal.label.replace('22K ', '').replace('18K ', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            {selectedProduct.sizesAvailable && (
              <div className="mb-5">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-serif uppercase tracking-widest text-stone-600">
                    {mode === 'ring' ? 'Select Ring Size' : 'Select Length'}
                  </label>
                  <span className="text-xs text-amber-800 font-medium">Size Guide</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.sizesAvailable.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 rounded-lg text-xs transition-all border ${
                        selectedSize === sz
                          ? 'bg-stone-900 text-amber-300 border-stone-900 font-semibold shadow-sm'
                          : 'bg-white text-stone-700 border-[#e6dfd5] hover:border-stone-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Fitting Fine-Tuning Controls */}
            <div className="p-4 bg-stone-100/70 rounded-xl border border-stone-200 mb-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-serif uppercase tracking-widest text-stone-800 font-semibold">
                  Fitting Fine-Tuning
                </span>
                <button
                  onClick={() => {
                    setPosX(50);
                    setPosY(mode === 'ring' ? 52 : 42);
                    setScale(selectedProduct.tryOnScaleDefault || 1);
                    setRotation(0);
                  }}
                  className="text-[11px] text-amber-800 hover:text-amber-950 flex items-center gap-1 font-medium"
                >
                  <RotateCw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* Horizontal Position */}
              <div>
                <div className="flex justify-between text-xs text-stone-600 mb-1">
                  <span>Horizontal Position</span>
                  <span>{posX}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={posX}
                  onChange={(e) => setPosX(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              {/* Vertical Position */}
              <div>
                <div className="flex justify-between text-xs text-stone-600 mb-1">
                  <span>Vertical Position</span>
                  <span>{posY}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={posY}
                  onChange={(e) => setPosY(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              {/* Scale / Size */}
              <div>
                <div className="flex justify-between text-xs text-stone-600 mb-1">
                  <span className="flex items-center gap-1"><ZoomIn className="w-3 h-3" /> Scale Size</span>
                  <span>{Math.round(scale * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.5"
                  step="0.02"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              {/* Angle Rotation */}
              <div>
                <div className="flex justify-between text-xs text-stone-600 mb-1">
                  <span>Rotation Angle</span>
                  <span>{rotation}°</span>
                </div>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>
            </div>

          </div>

          {/* Action Buttons: Book Visit & Contact */}
          <div className="space-y-2.5 pt-3 border-t border-[#e6dfd5]">
            <button
              onClick={captureComposite}
              className="w-full py-2.5 bg-stone-900 text-amber-200 rounded-xl font-serif text-sm font-medium hover:bg-stone-800 transition-all flex items-center justify-center gap-2 shadow"
            >
              <Camera className="w-4 h-4 text-amber-400" /> Snap & Save Fitting Photo
            </button>

            <button
              onClick={() => {
                onClose();
                onBookAppointment(selectedProduct);
              }}
              className="w-full py-3.5 bg-[#9D825E] hover:bg-[#886F4E] text-white rounded-xl font-serif text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Calendar className="w-4 h-4" /> Book In-Store Visit for this Design
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`https://wa.me/917508500417?text=${encodeURIComponent(whatsappInquiryText)}`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl font-serif text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm text-center"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Inquire
              </a>

              <a
                href="tel:+917508500417"
                className="py-2.5 bg-[#2D2926] hover:bg-stone-800 text-[#E8DCC4] rounded-xl font-serif text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm text-center"
              >
                <Phone className="w-3.5 h-3.5" /> Call Store
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
