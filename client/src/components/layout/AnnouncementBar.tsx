import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ANNOUNCEMENTS } from '@/constants/navigation';
import { ChevronLeft, ChevronRight, Copy, Check, X, Tag } from 'lucide-react';

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const currentAnnouncement = ANNOUNCEMENTS[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (code?: string) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? ANNOUNCEMENTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  if (!isVisible) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-slate-100 text-xs font-medium py-2 px-4 border-b border-indigo-500/20 shadow-sm">
      <div className="container-custom flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          className="hidden md:flex items-center justify-center p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex-1 flex items-center justify-center text-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAnnouncement.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center flex-wrap gap-2 text-xs sm:text-sm"
            >
              {currentAnnouncement.badge && (
                <span className="inline-flex items-center gap-1 bg-gradient-to-r from-primary to-accent text-white px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase shadow-sm">
                  <Tag className="w-3 h-3" />
                  {currentAnnouncement.badge}
                </span>
              )}

              <span className="font-medium text-slate-200">
                {currentAnnouncement.text}
              </span>

              {currentAnnouncement.code && (
                <button
                  onClick={() => handleCopy(currentAnnouncement.code)}
                  className="inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 border border-white/15 px-2 py-0.5 rounded text-[11px] text-indigo-200 hover:text-white transition-colors font-mono"
                  title="Click to copy promo code"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-indigo-300" />
                      <span>{currentAnnouncement.code}</span>
                    </>
                  )}
                </button>
              )}

              {currentAnnouncement.linkUrl && (
                <a
                  href={currentAnnouncement.linkUrl}
                  className="underline underline-offset-2 text-indigo-300 hover:text-white font-semibold transition-colors ml-1"
                >
                  {currentAnnouncement.linkText || 'Shop Now →'}
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleNext}
            className="hidden md:flex items-center justify-center p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Close announcement bar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
