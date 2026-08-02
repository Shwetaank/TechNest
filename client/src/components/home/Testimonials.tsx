import { TESTIMONIALS } from '@/constants/products';
import { Star, CheckCircle, Quote } from 'lucide-react';

export function Testimonials() {
  return (
    <section className="py-16 bg-background border-b border-border/60">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary uppercase tracking-wider">
            <Quote className="w-4 h-4" />
            <span>Verified Customer Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-heading">
            Trusted by 50,000+ Engineers & Pro Gamers
          </h2>
          <p className="text-sm text-muted-foreground">
            Read real feedback from software architects, streamers, and hardware enthusiasts around the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="rounded-3xl border border-border bg-card p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle className="w-3 h-3" />
                      Verified Buyer
                    </span>
                  )}
                </div>

                <p className="text-sm text-foreground/90 italic leading-relaxed">
                  "{review.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-border/50 flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border border-primary/30"
                />
                <div>
                  <h4 className="text-sm font-bold text-foreground leading-none">
                    {review.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {review.role} • {review.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
