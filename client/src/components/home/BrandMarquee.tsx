import { BRANDS } from '@/constants/products';

export function BrandMarquee() {
  return (
    <section className="py-12 bg-muted/20 border-b border-border/60 overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Official Authorized Partner & Global Reseller
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 hover:opacity-100 transition-opacity">
          {BRANDS.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card/60 border border-border/40 text-sm font-bold text-foreground grayscale hover:grayscale-0 transition-all cursor-pointer"
            >
              <span>{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
