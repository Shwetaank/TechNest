import { Wrench, CheckCircle, ArrowRight, Cpu, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CustomRigShowcase() {
  return (
    <section className="py-16 bg-background border-b border-border/60">
      <div className="container-custom">
        <div className="relative rounded-3xl overflow-hidden border border-border bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-8 lg:p-14 text-white shadow-2xl">
          {/* Background image overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-25 lg:opacity-60 pointer-events-none mix-blend-luminosity">
            <img
              src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1200&auto=format&fit=crop"
              alt="Custom Liquid Cooled Rig"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider">
              <Wrench className="w-4 h-4 text-indigo-400" />
              <span>CUSTOM HARDWARE CONFIGURATOR</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white leading-tight">
              Build Your Dream Liquid-Cooled Rig
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Select your exact GPU, processor, custom tubing colors, and cable combs. Assembled and stress-tested for 48 hours by master PC engineers.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>48-Hour Burn-In Stress Test</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span>Custom Hardline & AIO Loops</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>2-Year Full Hardware Coverage</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Zero Restocking Return Policy</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <a href="/categories/custom-pcs">
                <Button variant="gradient" size="lg" className="font-bold shadow-xl" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Start Custom PC Build
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
