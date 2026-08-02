import { useState, useEffect } from 'react';
import { FEATURED_PRODUCTS } from '@/constants/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Zap, Clock, Flame } from 'lucide-react';

export function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashSaleItems = FEATURED_PRODUCTS.slice(0, 4);

  return (
    <section className="py-16 bg-muted/30 border-b border-border/60">
      <div className="container-custom">
        {/* Header with Live Countdown Timer */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-xl gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Flame className="w-8 h-8 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Zap className="w-4 h-4 fill-amber-400" />
                <span>LIMITED QUANTITY EVENT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Flash Hardware Deals
              </h2>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-300 mr-2 font-medium">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>Ends in:</span>
            </div>

            <div className="flex items-center gap-2 text-center">
              <div className="bg-white/10 border border-white/20 px-3 py-2 rounded-xl min-w-[50px]">
                <span className="text-xl font-black font-mono text-white block">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase">Hours</span>
              </div>
              <span className="text-xl font-bold text-indigo-400">:</span>

              <div className="bg-white/10 border border-white/20 px-3 py-2 rounded-xl min-w-[50px]">
                <span className="text-xl font-black font-mono text-white block">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase">Mins</span>
              </div>
              <span className="text-xl font-bold text-indigo-400">:</span>

              <div className="bg-white/10 border border-white/20 px-3 py-2 rounded-xl min-w-[50px]">
                <span className="text-xl font-black font-mono text-amber-400 block">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase">Secs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deal Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashSaleItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
