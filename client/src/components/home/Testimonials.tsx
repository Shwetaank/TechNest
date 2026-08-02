import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: 'Vikramaditya Roy',
    role: 'Lead Game Developer',
    company: 'Unreal Core Studios',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    content: 'The custom liquid-cooled RTX 5090 rig delivered by TechNest runs Unreal Engine 5 compile jobs in less than half the time. BlueDart delivery arrived factory-sealed in 24 hours.',
    rating: 5,
    product: 'Apex Beast Ultra RTX 5090 Desktop',
  },
  {
    id: 2,
    name: 'Ananya Deshmukh',
    role: 'AI Research Scientist',
    company: 'NeuralCompute Labs',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    content: 'TechNest provides the highest standard of enterprise hardware in India. Our studio ordered 8 Titan Pro M4 laptops for remote rendering.',
    rating: 5,
    product: 'Titan Pro M4 Max Studio Laptop',
  },
  {
    id: 3,
    name: 'Rohan Mehta',
    role: '3D VFX Supervisor',
    company: 'RedShift Visuals',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    content: 'The Horizon 49" QD-OLED display is phenomenal. Color accuracy straight out of the box is calibrated perfectly for HDR color grading.',
    rating: 5,
    product: 'Horizon 49" QD-OLED Ultrawide Monitor',
  },
  {
    id: 4,
    name: 'Siddharth Nair',
    role: 'Senior DevOps Architect',
    company: 'CloudMatrix Systems',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    content: 'Extremely impressive build quality and packaging. The CyberBlade 8K Magnetic keyboard feels premium and rapid trigger response is instantaneous.',
    rating: 5,
    product: 'CyberBlade 8K Magnetic Keyboard',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section className="py-20 bg-background border-b border-border/60">
      <div className="container-custom max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
            CUSTOMER REVIEWS & STORIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground font-heading">
            Trusted by Creators & Engineers
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-card border border-border/80 rounded-3xl p-8 sm:p-12 shadow-xl backdrop-blur-xl">
          <Quote className="w-12 h-12 text-primary/20 absolute top-6 right-6" />

          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="text-base sm:text-xl font-medium text-foreground leading-relaxed italic">
              "{current.content}"
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-border/60">
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    <span>{current.name}</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {current.role} at {current.company}
                  </p>
                </div>
              </div>

              <div className="hidden sm:block text-right">
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">
                  Purchased Hardware
                </span>
                <span className="text-xs font-bold text-primary">{current.product}</span>
              </div>
            </div>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-border/40">
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'w-8 bg-primary' : 'w-2 bg-muted hover:bg-muted-foreground'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl border border-border bg-background text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl border border-border bg-background text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
