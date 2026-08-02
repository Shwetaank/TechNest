import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Bot, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FloatingSupportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'bot',
      text: '👋 Hi! I am TechNest AI Advisor. Need help picking the right laptop, GPU, or custom PC setup?',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: String(Date.now()), sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'bot',
          text: 'Great question! For heavy developer workloads and 4K gaming, I recommend checking our RTX 5090 Titan Pro rigs or QD-OLED 240Hz monitors!',
        },
      ]);
    }, 1000);
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-30">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-xl shadow-primary/25 border border-white/20 font-semibold text-xs focus:outline-none"
        >
          <div className="relative">
            <Bot className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <span>Tech Support & AI Advisor</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-20 left-6 z-40 w-80 sm:w-96 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[450px]"
          >
            <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-indigo-500/20">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/10 text-indigo-300">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">TechNest AI Advisor</h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                    <UserCheck className="w-3 h-3" />
                    <span>Hardware Engineers Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-muted/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground font-medium rounded-br-xs'
                        : 'bg-muted text-foreground border border-border/60 rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="p-3 border-t border-border bg-card flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about specs, compatibility..."
                className="flex-1 bg-muted/60 text-foreground text-xs px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary border border-border/50"
              />
              <Button type="submit" size="sm" variant="gradient" className="h-8 px-3">
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
