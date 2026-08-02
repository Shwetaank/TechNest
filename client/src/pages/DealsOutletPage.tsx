import { useState } from 'react';
import { Sparkles, Clock, Copy, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/cartStore';

const DEAL_PRODUCTS = [
  {
    id: 'deal-1',
    name: 'Apex Beast Ultra RTX 5090 Liquid Cooled Desktop',
    discount: '10% OFF',
    dealPrice: 329990,
    originalPrice: 359990,
    savings: '₹30,000',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=600&auto=format&fit=crop',
    code: 'INDIA2026',
    endsIn: '14h 22m 08s',
  },
  {
    id: 'deal-2',
    name: 'Horizon 49" QD-OLED 240Hz Curved Display',
    discount: '15% OFF',
    dealPrice: 109990,
    originalPrice: 129990,
    savings: '₹20,000',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop',
    code: 'OLED2026',
    endsIn: '08h 45m 12s',
  },
  {
    id: 'deal-3',
    name: 'TechNest Titan Pro M4 Max (64GB RAM, 2TB SSD)',
    discount: '11% OFF',
    dealPrice: 249990,
    originalPrice: 279990,
    savings: '₹30,000',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop',
    code: 'TITANM4',
    endsIn: '22h 10m 45s',
  },
  {
    id: 'deal-4',
    name: 'CyberBlade Pro 8K Rapid Trigger Keyboard',
    discount: '10% OFF',
    dealPrice: 17990,
    originalPrice: 19990,
    savings: '₹2,000',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop',
    code: 'CYBER8K',
    endsIn: '05h 12m 30s',
  },
];

export function DealsOutletPage() {
  const { addToCart } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="py-10 bg-background border-b border-border/60 min-h-screen">
      <div className="container-custom space-y-12 max-w-7xl mx-auto">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold text-primary uppercase tracking-wider bg-primary/10 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FESTIVE MONSOON SALE & OUTLET</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-foreground font-heading">
            Exclusive Deals & Hardware Discounts
          </h1>
          <p className="text-xs text-muted-foreground">
            Factory-sealed workstation desktops, OLED displays, and laptops with instant coupon savings.
          </p>
        </div>

        {/* Promo Coupon Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary/15 via-card to-card border border-primary/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-extrabold text-primary uppercase tracking-widest block">
              GLOBAL PROMO CODE
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-foreground font-heading">
              Extra 40% OFF + Free BlueDart Air Shipping
            </h3>
            <p className="text-xs text-muted-foreground">
              Apply coupon code <strong className="text-foreground font-mono">INDIA2026</strong> at checkout on all orders above ₹10,000.
            </p>
          </div>

          <button
            onClick={() => handleCopyCode('INDIA2026')}
            className="px-5 py-3 rounded-2xl bg-primary text-primary-foreground font-mono font-bold text-sm flex items-center gap-2 shadow-lg hover:scale-105 transition-transform cursor-pointer shrink-0"
          >
            {copiedCode === 'INDIA2026' ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Code Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>INDIA2026</span>
              </>
            )}
          </button>
        </div>

        {/* Deals Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEAL_PRODUCTS.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-3xl border border-border bg-card space-y-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-rose-500 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow-md">
                    {item.discount}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Ends in {item.endsIn}</span>
                </div>

                <h3 className="text-sm font-bold text-foreground line-clamp-2">{item.name}</h3>

                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-black text-foreground font-heading">
                    ₹{item.dealPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    ₹{item.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <Button
                variant="gradient"
                size="sm"
                onClick={() =>
                  addToCart({
                    id: item.id,
                    productId: item.id,
                    name: item.name,
                    price: item.dealPrice,
                    image: item.image,
                    inStock: true,
                  })
                }
                className="w-full font-bold text-xs rounded-xl py-3 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 mr-1.5" />
                <span>Claim Deal & Add to Bag</span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
