import { ShieldCheck, Cpu, HeartHandshake } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="py-12 bg-background border-b border-border/60 min-h-screen">
      <div className="container-custom max-w-5xl mx-auto space-y-16">
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-extrabold text-primary uppercase tracking-wider bg-primary/10 px-3.5 py-1 rounded-full">
            OUR MISSION & STANDARDS
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-foreground font-heading tracking-tight">
            Engineering Enterprise Hardware Excellence
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            TechNest Store was founded with a singular mission: to provide creators, engineers, game developers, and AI researchers with factory-sealed, liquid-cooled, high-performance hardware.
          </p>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl border border-border bg-card space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Flagship Performance</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every system is benchmarked for stress tolerance, thermals, and memory stability before dispatch.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-border bg-card space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Factory Sealed Integrity</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Zero open-box or refurbished inventory. 100% brand-new components with manufacturer warranties.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-border bg-card space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Engineer Support</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Direct access to hardware specialists for system configuration, BIOS optimization, and compatibility guidance.
            </p>
          </div>
        </div>

        {/* Stats & Trust Numbers */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-primary/10 via-card to-card border border-border/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="text-3xl sm:text-5xl font-black text-foreground font-heading">50,000+</span>
            <span className="text-xs text-muted-foreground font-semibold block mt-1">Systems Shipped</span>
          </div>
          <div>
            <span className="text-3xl sm:text-5xl font-black text-foreground font-heading">99.99%</span>
            <span className="text-xs text-muted-foreground font-semibold block mt-1">Hardware Reliability</span>
          </div>
          <div>
            <span className="text-3xl sm:text-5xl font-black text-foreground font-heading">&lt; 24h</span>
            <span className="text-xs text-muted-foreground font-semibold block mt-1">Express Dispatch</span>
          </div>
          <div>
            <span className="text-3xl sm:text-5xl font-black text-foreground font-heading">4.95 / 5</span>
            <span className="text-xs text-muted-foreground font-semibold block mt-1">Customer Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
}
