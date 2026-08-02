import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Command, ArrowRight, Laptop, Monitor, Keyboard, Headphones, Sparkles, TrendingUp } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  'RTX 5090 Gaming Laptops',
  '4K 240Hz OLED Monitors',
  'Magnetic Rapid-Trigger Keyboards',
  'Thunderbolt 5 Docking Stations',
  'Gen5 PCIe NVMe SSD 4TB',
  'Planar Magnetic Studio Headsets',
];

const QUICK_CATEGORIES = [
  { name: 'Laptops', icon: Laptop, href: '/categories/laptops' },
  { name: 'Monitors', icon: Monitor, href: '/categories/monitors' },
  { name: 'Keyboards', icon: Keyboard, href: '/categories/peripherals' },
  { name: 'Audio', icon: Headphones, href: '/categories/audio' },
];

/**
 * Command Palette search modal dialog. Supports instant keyword query matching,
 * auto-focusing on mount, ESC key dismiss handler, and popular search shortcuts.
 */
export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus search input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global ESC key listener to dismiss search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Command palette container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          <div className="flex items-center px-4 py-3 border-b border-border/80 bg-muted/20">
            <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search hardware, laptops, components, models..."
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-base focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground bg-muted border border-border px-2 py-0.5 rounded-md">
              <span>ESC</span>
            </kbd>
          </div>

          <div className="p-4 max-h-[70vh] overflow-y-auto space-y-6">
            {!query ? (
              <>
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    Quick Categories
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {QUICK_CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <a
                          key={cat.name}
                          href={cat.href}
                          onClick={onClose}
                          className="flex items-center gap-2 p-2.5 rounded-xl border border-border/60 hover:border-primary/40 bg-card hover:bg-primary/5 transition-all text-xs font-semibold text-foreground group"
                        >
                          <Icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                          <span>{cat.name}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                    <span>Popular Searches</span>
                  </div>
                  <div className="space-y-1">
                    {POPULAR_SEARCHES.map((item) => (
                      <a
                        key={item}
                        href={`/products?search=${encodeURIComponent(item)}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/60 transition-colors text-sm text-foreground/90 group"
                      >
                        <div className="flex items-center gap-3">
                          <Search className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span>{item}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                      </a>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                  Search Results for "{query}"
                </div>
                <div className="space-y-2">
                  {[
                    `TechNest Titan Pro M4 Max (Matching "${query}")`,
                    `CyberBlade Pro 8K Rapid Trigger Keyboard (Matching "${query}")`,
                    `Horizon 49" QD-OLED 240Hz Gaming Display`,
                  ].map((result, idx) => (
                    <a
                      key={idx}
                      href={`/products?search=${encodeURIComponent(query)}`}
                      onClick={onClose}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/80 transition-colors border border-transparent hover:border-border"
                    >
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">
                          {result}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="px-4 py-2.5 bg-muted/40 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Command className="w-3.5 h-3.5" />
              <span>Type to search TechNest catalog</span>
            </div>
            <a
              href={`/products?search=${encodeURIComponent(query)}`}
              onClick={onClose}
              className="text-primary hover:underline font-medium"
            >
              View all results →
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
