import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Laptop, Monitor, Tv, Star, CheckCircle, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/cartStore';

const HERO_SLIDES = [
  {
    id: 'titan-pro-m4',
    tag: 'FLAGSHIP WORKSTATION 2026 • GST INVOICE AVAILABLE',
    title: 'TechNest Titan Pro M4 Max Studio',
    subtitle: '16-Core M4 Max CPU • 64GB RAM • 2TB Gen4 SSD • 120Hz Liquid Retina XDR',
    price: 249990,
    originalPrice: 279990,
    emiStartingAt: 10416,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
    specsPills: ['16-Core M4 Max', '64GB RAM', '2TB Gen4 SSD', '4K 120Hz'],
    icon: Laptop,
  },
  {
    id: 'apex-beast-v2',
    tag: 'ULTRA LIQUID COOLED RIG • 24-MONTH NO-COST EMI',
    title: 'Apex Beast Ultra RTX 5090 Gaming Rig',
    subtitle: 'Core i9 14900KS • NVIDIA RTX 5090 32GB • 64GB DDR5 7200MHz • 360mm AIO',
    price: 329990,
    originalPrice: 369990,
    emiStartingAt: 13749,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1200&auto=format&fit=crop',
    specsPills: ['RTX 5090 32GB', 'i9 14900KS', '360mm Liquid Loop', '7200MHz DDR5'],
    icon: Tv,
  },
  {
    id: 'horizon-49-oled',
    tag: '240Hz CURVED OLED DISPLAY • BLUEDART AIR SHIPPING',
    title: 'Horizon 49" QD-OLED Ultrawide Canvas',
    subtitle: '5120x1440 Dual QHD • 240Hz 0.03ms GTG • Quantum Dot OLED • 90W Type-C',
    price: 109990,
    originalPrice: 129990,
    emiStartingAt: 4583,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1200&auto=format&fit=crop',
    specsPills: ['240Hz 0.03ms', 'QD-OLED', '5120x1440 Dual QHD', '90W Type-C'],
    icon: Monitor,
  },
];

export function HeroBanner() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { addToCart } = useCart();

  const currentSlide = HERO_SLIDES[activeSlideIndex];

  return (
    <section className="relative overflow-hidden py-12 lg:py-20 bg-gradient-to-b from-background via-muted/20 to-background border-b border-border/60">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[300px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {HERO_SLIDES.map((slide, idx) => {
            const Icon = slide.icon;
            const isActive = idx === activeSlideIndex;
            return (
              <button
                key={slide.id}
                onClick={() => setActiveSlideIndex(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105'
                    : 'glass-panel text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{slide.title.split(' ')[0]} {slide.title.split(' ')[1]}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-primary/30 text-xs font-extrabold text-primary shadow-xs">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  <span>{currentSlide.tag}</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground font-heading leading-none">
                  {currentSlide.title}
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {currentSlide.subtitle}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {currentSlide.specsPills.map((spec) => (
                    <span
                      key={spec}
                      className="inline-flex items-center gap-1 text-xs font-semibold bg-muted/80 text-foreground px-3 py-1 rounded-lg border border-border/60"
                    >
                      <Zap className="w-3.5 h-3.5 text-primary" />
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <div>
                    <span className="text-3xl font-black text-foreground">
                      ₹{currentSlide.price.toLocaleString('en-IN')}
                    </span>
                    {currentSlide.originalPrice && (
                      <span className="ml-2 text-sm text-muted-foreground line-through">
                        ₹{currentSlide.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-bold text-emerald-500">
                        ✓ BlueDart Air Delivery & 2-Yr Warranty
                      </span>
                      <span className="text-[11px] font-bold text-indigo-400 flex items-center gap-1">
                        <CreditCard className="w-3 h-3" />
                        No-Cost EMI from ₹{currentSlide.emiStartingAt.toLocaleString('en-IN')}/mo
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="gradient"
                    size="lg"
                    className="font-bold text-base shadow-xl"
                    onClick={() =>
                      addToCart({
                        id: `cart-${currentSlide.id}`,
                        productId: currentSlide.id,
                        name: currentSlide.title,
                        price: currentSlide.price,
                        originalPrice: currentSlide.originalPrice,
                        image: currentSlide.image,
                        inStock: true,
                      })
                    }
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Buy Flagship Now
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="pt-6 border-t border-border/60 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="font-extrabold text-foreground">4.9/5</span>
                <span>(10,000+ Indian Developers & Gamers)</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-500 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>18% GST Input Credit Invoice Included</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-3xl overflow-hidden border border-border shadow-2xl group bg-muted/40 aspect-[4/3]"
              >
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute top-6 left-6 glass-panel px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/20 shadow-xl">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-foreground">
                    Factory Sealed & QC Certified
                  </span>
                </div>

                <div className="absolute bottom-6 right-6 glass-panel px-4 py-2.5 rounded-2xl border border-white/20 shadow-xl text-right">
                  <span className="text-[10px] font-extrabold uppercase text-muted-foreground block">
                    Save Instantly
                  </span>
                  <span className="text-sm font-extrabold text-emerald-400">
                    ₹{(currentSlide.originalPrice! - currentSlide.price).toLocaleString('en-IN')} Off
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
