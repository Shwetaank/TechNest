import { MEGA_CATEGORIES } from '@/constants/navigation';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export function FeaturedCategories() {
  const categoriesWithImages = [
    {
      ...MEGA_CATEGORIES[0],
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
    },
    {
      ...MEGA_CATEGORIES[1],
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=800&auto=format&fit=crop',
    },
    {
      ...MEGA_CATEGORIES[2],
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop',
    },
    {
      ...MEGA_CATEGORIES[3],
      image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=800&auto=format&fit=crop',
    },
    {
      ...MEGA_CATEGORIES[4],
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    },
    {
      ...MEGA_CATEGORIES[5],
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <section className="py-16 bg-background border-b border-border/60">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Hardware Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-heading">
              Explore Featured Categories
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Engineered for high-throughput computing, esports, studio mixing, and extreme multi-monitor productivity setups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesWithImages.map((cat) => (
            <a
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group relative h-80 rounded-3xl overflow-hidden border border-border bg-card p-6 flex flex-col justify-between shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Background */}
              <div className="absolute inset-0 z-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              </div>

              {/* Header Badges */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-bold bg-white/10 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full">
                  {cat.itemCount} Models Available
                </span>
                <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 space-y-1">
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
