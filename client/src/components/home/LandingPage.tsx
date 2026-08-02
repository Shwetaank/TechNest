import { useState } from 'react';
import { HeroBanner } from './HeroBanner';
import { FeaturedCategories } from './FeaturedCategories';
import { FlashSale } from './FlashSale';
import { ProductCard } from '@/components/product/ProductCard';
import { FEATURED_PRODUCTS } from '@/constants/products';
import { CustomRigShowcase } from './CustomRigShowcase';
import { BrandMarquee } from './BrandMarquee';
import { Testimonials } from './Testimonials';
import { StoreStats } from './StoreStats';
import { FaqSection } from './FaqSection';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';

export function LandingPage() {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [, setQuickViewProduct] = useState<Product | null>(null);

  const categories = ['All', 'Laptops', 'Gaming PCs', 'Monitors', 'Peripherals', 'Audio', 'Storage'];

  const filteredProducts =
    activeCategoryFilter === 'All'
      ? FEATURED_PRODUCTS
      : FEATURED_PRODUCTS.filter((p) => p.category === activeCategoryFilter);

  return (
    <div className="space-y-0">
      {/* 1. High-Impact Apple/Stripe Hero Banner */}
      <HeroBanner />

      {/* 2. Brand Partner Marquee */}
      <BrandMarquee />

      {/* 3. Interactive Category Grid */}
      <FeaturedCategories />

      {/* 4. Limited Time Flash Deals Section */}
      <FlashSale />

      {/* 5. Trending Enterprise Hardware Catalog Grid with Filter Tabs */}
      <section className="py-16 bg-background border-b border-border/60">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Popular Hardware</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-heading">
                Trending Electronics & Workstations
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeCategoryFilter === cat
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="/products">
              <Button variant="outline" size="lg" className="rounded-2xl font-bold px-8" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore All Products & Specs
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 6. Custom Liquid Cooled Rig Configurator Banner */}
      <CustomRigShowcase />

      {/* 7. Store Statistics & Enterprise Badges */}
      <StoreStats />

      {/* 8. Verified Buyer Reviews */}
      <Testimonials />

      {/* 9. FAQ Accordion */}
      <FaqSection />
    </div>
  );
}
