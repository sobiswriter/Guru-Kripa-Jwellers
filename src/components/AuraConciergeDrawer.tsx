import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, ArrowRight } from 'lucide-react';

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
      text: 'Bonjour! I am Maison Aura Concierge, your personal haute joaillerie advisor. Are you seeking an engagement solitaire, an anniversary gemstone, or advice on matching metal settings to your hand or neckline?'
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
      setMessages(prev => [...prev, { sender: 'ai', text: data.reply || 'Thank you for your inquiry.' }]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: 'For timeless elegance, I highly recommend our 2.5ct Elysian Oval Solitaire in platinum or the Sovereign Colombian Emerald drop pendant.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#fdfbf7] h-full shadow-2xl flex flex-col justify-between border-l border-[#e6dfd5]">
        
        {/* Header */}
        <div className="p-5 bg-stone-900 text-amber-100 flex justify-between items-center border-b border-amber-500/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-serif font-bold text-sm shadow">
              AC
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-white">Maison Aura Concierge</h3>
              <p className="text-[10px] text-amber-300 font-serif tracking-widest uppercase">AI Master Stylist</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 hover:bg-stone-800 text-stone-300 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-stone-900 text-amber-200 rounded-br-none shadow-sm'
                    : 'bg-white text-stone-800 border border-[#e6dfd5] rounded-bl-none shadow-sm font-serif'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 items-center text-stone-500 text-xs italic font-serif">
              <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
              Maison Concierge is formulating gemological recommendation...
            </div>
          )}
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="p-3 bg-amber-50/60 border-t border-[#e6dfd5] text-[11px] space-y-1.5">
          <span className="text-amber-900 font-serif font-bold text-[10px] uppercase tracking-wider block">
            Suggested Style Inquiries:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              'Which ring cut flatters slender fingers?',
              'Explain the 4Cs of the Oval Solitaire',
              'Recommend a necklace for an evening gown'
            ].map((q, i) => (
              <button
                key={i}
                onClick={() => setInputPrompt(q)}
                className="px-2.5 py-1 bg-white hover:bg-amber-100 text-stone-700 border border-amber-200/70 rounded-full text-[10px] transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-[#e6dfd5] flex gap-2">
          <input
            type="text"
            placeholder="Ask our AI Jeweler about diamond cuts, sizing..."
            value={inputPrompt}
            onChange={e => setInputPrompt(e.target.value)}
            className="flex-1 bg-stone-50 border border-[#e6dfd5] rounded-xl px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-xl text-xs transition-all shadow"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
