import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MEGA_CATEGORIES } from '@/constants/navigation';
import type { CategoryItem } from '@/types';
import {
  Laptop,
  Monitor,
  Tv,
  Keyboard,
  Headphones,
  Cpu,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, React.ElementType> = {
  Laptop,
  Monitor,
  Tv,
  Keyboard,
  Headphones,
  Cpu,
};

interface MegaNavigationProps {
  activeCategory: string | null;
  onCategoryHover?: (categoryId: string | null) => void;
  onClose: () => void;
}

export function MegaNavigation({
  activeCategory,
  onClose,
}: MegaNavigationProps) {
  const [selectedCatId, setSelectedCatId] = useState<string>(
    activeCategory && activeCategory !== 'categories'
      ? activeCategory
      : MEGA_CATEGORIES[0].id
  );

  const activeCategoryData: CategoryItem =
    MEGA_CATEGORIES.find((c) => c.id === selectedCatId) || MEGA_CATEGORIES[0];

  if (!activeCategory) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 4 }}
        transition={{ duration: 0.18 }}
        onMouseLeave={onClose}
        className="absolute top-full left-0 right-0 z-50 bg-background/95 backdrop-blur-2xl border-b border-border shadow-2xl overflow-hidden text-left"
      >
        <div className="container-custom py-8">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3 border-r border-border/60 pr-6 space-y-1">
              <div className="text-[11px] font-bold text-muted-foreground tracking-wider uppercase mb-3 px-3">
                Hardware Categories
              </div>
              {MEGA_CATEGORIES.map((cat) => {
                const IconComponent = cat.icon ? ICON_MAP[cat.icon] : Sparkles;
                const isSelected = activeCategoryData.id === cat.id;

                return (
                  <button
                    key={cat.id}
                    onMouseEnter={() => setSelectedCatId(cat.id)}
                    onClick={onClose}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left group cursor-pointer',
                      isSelected
                        ? 'bg-primary/10 text-primary font-semibold shadow-xs'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'p-2 rounded-lg transition-colors',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground group-hover:text-foreground'
                        )}
                      >
                        {IconComponent && <IconComponent className="w-4 h-4" />}
                      </div>
                      <span>{cat.name}</span>
                    </div>
                    <ChevronRight
                      className={cn(
                        'w-4 h-4 transition-transform',
                        isSelected
                          ? 'text-primary translate-x-0.5'
                          : 'text-muted-foreground opacity-0 group-hover:opacity-100'
                      )}
                    />
                  </button>
                );
              })}
            </div>

            <div className="col-span-5 px-2">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  {activeCategoryData.name}
                  <span className="text-xs text-muted-foreground font-normal bg-muted px-2 py-0.5 rounded-full">
                    {activeCategoryData.itemCount} items
                  </span>
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {activeCategoryData.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {activeCategoryData.subcategories.map((sub) => (
                  <a
                    key={sub.slug}
                    href={`/categories/${activeCategoryData.slug}/${sub.slug}`}
                    onClick={onClose}
                    className="group flex items-center justify-between p-3 rounded-xl hover:bg-muted/60 transition-all border border-transparent hover:border-border/60"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {sub.name}
                      </span>
                      {sub.badge && (
                        <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-md">
                          {sub.badge}
                        </span>
                      )}
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                  </a>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border/50">
                <a
                  href={`/categories/${activeCategoryData.slug}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  View all in {activeCategoryData.name} →
                </a>
              </div>
            </div>

            <div className="col-span-4 pl-4 border-l border-border/60">
              {activeCategoryData.featuredProduct && (
                <div className="relative group overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-card via-card/80 to-muted/40 p-4 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold tracking-wider uppercase bg-gradient-to-r from-primary to-accent text-white px-2.5 py-1 rounded-full shadow-xs">
                      {activeCategoryData.featuredProduct.tag}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      Featured Specs
                    </span>
                  </div>

                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-muted relative">
                    <img
                      src={activeCategoryData.featuredProduct.image}
                      alt={activeCategoryData.featuredProduct.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h4 className="text-sm font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {activeCategoryData.featuredProduct.title}
                  </h4>

                  <div className="flex items-center justify-between">
                    <span className="text-base font-extrabold text-foreground">
                      ₹{activeCategoryData.featuredProduct.price.toLocaleString('en-IN')}
                    </span>
                    <a
                      href={`/product/${activeCategoryData.featuredProduct.id}`}
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-xs font-semibold bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
