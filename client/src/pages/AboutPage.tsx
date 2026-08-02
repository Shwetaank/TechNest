import { Sparkles, MapPin, ShieldCheck, Truck } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="py-16 bg-background border-b border-border/60 min-h-screen">
      <div className="container-custom max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>ENGINEERED FOR INDIA</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground font-heading">
            About TechNest Store India
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            TechNest is India's premier enterprise storefront delivering factory-sealed liquid-cooled gaming PCs, flagship laptops, custom mechanical keyboards, and 240Hz OLED displays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl border border-border bg-card space-y-3 shadow-sm">
            <MapPin className="w-8 h-8 text-primary" />
            <h3 className="text-base font-bold text-foreground">Bengaluru R&D & Assembly Hub</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every custom liquid-cooled PC is assembled and 48-hour burn-in stress tested in our Bengaluru hardware laboratory.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-border bg-card space-y-3 shadow-sm">
            <Truck className="w-8 h-8 text-emerald-500" />
            <h3 className="text-base font-bold text-foreground">BlueDart Air Delivery</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Insured express air logistics delivering to over 19,000 Pincodes across all 28 Indian States within 24–48 hours.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-border bg-card space-y-3 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-amber-500" />
            <h3 className="text-base font-bold text-foreground">18% GST Input Invoice</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Full B2B GSTIN Tax Invoice generation for Indian startups and corporations to claim input tax credits effortlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
