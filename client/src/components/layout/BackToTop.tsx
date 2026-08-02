import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-30 flex items-center justify-center w-11 h-11 rounded-2xl bg-card border border-border text-foreground shadow-xl hover:bg-primary hover:text-primary-foreground transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Back to top"
        >
          {/* Scroll progress ring SVG */}
          <svg className="absolute inset-0 w-full h-full p-0.5 -rotate-90">
            <circle
              cx="20"
              cy="20"
              r="18"
              className="stroke-muted fill-none"
              strokeWidth="2"
            />
            <circle
              cx="20"
              cy="20"
              r="18"
              className="stroke-primary fill-none group-hover:stroke-white transition-all"
              strokeWidth="2"
              strokeDasharray={113}
              strokeDashoffset={113 - (113 * scrollProgress) / 100}
            />
          </svg>

          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
