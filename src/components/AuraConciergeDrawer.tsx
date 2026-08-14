import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, ArrowRight, MessageCircle } from 'lucide-react';

interface AuraConciergeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProductById: (productId: string) => void;
}

export const AuraConciergeDrawer: React.FC<AuraConciergeDrawerProps> = ({
  isOpen,
  onClose,
  onSelectProductById
}) => {
  if (!isOpen) return null;

  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: 'Sat Sri Akal ji! Welcome to Shri Guru Kirpa Gold Platters & Jewellers. I am your Phagwara goldsmith advisor. Looking for custom Punjabi Kadas, 22K bridal sets, gold polishing, or hallmarking questions?'
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || loading) return;

    const userText = inputPrompt;
    setInputPrompt('');
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai-concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPrompt: userText })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { sender: 'ai', text: data.reply || 'Thank you for your inquiry. Visit us at Shop No. 15, Bansawala Bazar, Phagwara.' }]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: 'Sat Sri Akal! For custom gold jewelry orders, wedding sets, or Kada fittings, please visit our Bansawala Bazar workshop in Phagwara or WhatsApp us at +91 75085 00417.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#E8E1D5]">
        
        {/* Header */}
        <div className="p-4 bg-[#2D2926] text-amber-100 flex justify-between items-center border-b border-[#9D825E]/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#9D825E] text-white flex items-center justify-center font-serif font-bold text-xs shadow">
              SGK
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-white">Guru Kirpa Goldsmith Advisor</h3>
              <p className="text-[10px] text-[#D4AF37] font-sans tracking-wider">Phagwara Gold & Jewellery Help</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 hover:bg-stone-800 text-stone-300 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs font-sans">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-[#FAF3E0] text-[#9D825E] border border-[#D9C49A] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#9D825E]" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#2D2926] text-amber-100 rounded-br-none shadow-sm'
                    : 'bg-white text-stone-800 border border-[#E8E1D5] rounded-bl-none shadow-sm'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 items-center text-[#665E55] text-xs italic font-serif">
              <Sparkles className="w-4 h-4 text-[#9D825E] animate-spin" />
              Checking with master goldsmith guidelines...
            </div>
          )}
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="p-3 bg-[#FAF3E0] border-t border-[#E8E1D5] text-[11px] space-y-1.5 font-sans">
          <span className="text-[#5C4524] font-serif font-bold text-[10px] uppercase tracking-wider block">
            Popular Inquiries:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              'Custom Sarbloh-core Gold Kada weight & price',
              'Bridal jewellery making time & BIS Hallmark',
              'Gold polishing & electroplating charges in Phagwara'
            ].map((q, i) => (
              <button
                key={i}
                onClick={() => setInputPrompt(q)}
                className="px-2.5 py-1 bg-white hover:bg-[#FAF8F5] text-stone-800 border border-[#D9C49A] rounded-full text-[10px] transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="p-3.5 bg-white border-t border-[#E8E1D5] flex gap-2">
          <input
            type="text"
            placeholder="Ask about gold rates, custom designs, polishing..."
            value={inputPrompt}
            onChange={e => setInputPrompt(e.target.value)}
            className="flex-1 bg-stone-50 border border-[#E8E1D5] rounded-xl px-3.5 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#9D825E]/40 font-sans"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[#9D825E] hover:bg-[#886F4E] text-white font-bold rounded-xl text-xs transition-all shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
