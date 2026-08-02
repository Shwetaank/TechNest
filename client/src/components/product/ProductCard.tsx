import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { useCart } from '@/store/cartStore';
import { useWishlist } from '@/store/wishlistStore';
import { Heart, Star, ShoppingBag, Eye, Check, Sparkles, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: `wish-${product.id}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        rating: product.rating,
        image: product.image,
        inStock: product.inStock,
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: `cart-${product.id}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      inStock: product.inStock,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card/80 backdrop-blur-xl p-4 shadow-sm hover:shadow-2xl hover:border-primary/40 transition-all duration-300 overflow-hidden"
    >
      {/* Top Badges & Wishlist Trigger */}
      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1 items-start">
          {product.isNew && (
            <Badge variant="accent" className="shadow-md text-[10px]">
              <Sparkles className="w-3 h-3 mr-1" />
              NEW
            </Badge>
          )}
          {product.isBestseller && (
            <Badge variant="warning" className="shadow-xs text-[10px]">
              BESTSELLER
            </Badge>
          )}
          {product.discountPercentage && (
            <Badge variant="success" className="text-[10px]">
              -{product.discountPercentage}% OFF
            </Badge>
          )}
        </div>

        <button
          onClick={handleWishlistClick}
          className={cn(
            'pointer-events-auto p-2.5 rounded-full backdrop-blur-md transition-all shadow-md',
            inWishlist
              ? 'bg-rose-500 text-white shadow-rose-500/30'
              : 'bg-background/80 text-muted-foreground hover:text-rose-500 hover:bg-background border border-border/60'
          )}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={cn('w-4 h-4', inWishlist && 'fill-white')} />
        </button>
      </div>

      {/* Image Gallery Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted/40 mb-4 flex items-center justify-center">
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Quick Hover Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="p-3 rounded-xl bg-white text-slate-900 font-semibold text-xs flex items-center gap-1.5 shadow-xl hover:scale-105 transition-transform"
            >
              <Eye className="w-4 h-4" />
              <span>Quick View</span>
            </button>
          )}
        </div>
      </div>

      {/* Content Details */}
      <div className="flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span className="font-semibold text-primary">{product.category}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-foreground">{product.rating}</span>
              <span>({product.reviewCount})</span>
            </div>
          </div>

          <a href={`/product/${product.id}`} className="block">
            <h3 className="text-base font-bold text-foreground line-clamp-2 hover:text-primary transition-colors leading-snug">
              {product.name}
            </h3>
          </a>

          <div className="flex flex-wrap gap-1 mt-2.5">
            {product.specs.slice(0, 3).map((spec, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium bg-muted/80 text-muted-foreground px-2 py-0.5 rounded-md border border-border/40"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Add to Cart Footer */}
        <div className="pt-3 border-t border-border/50 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-foreground">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {product.emiStartingAt && (
              <span className="text-[10px] font-semibold text-indigo-400 flex items-center gap-1">
                <CreditCard className="w-3 h-3" />
                EMI from ₹{product.emiStartingAt.toLocaleString('en-IN')}/mo
              </span>
            )}
          </div>

          <Button
            size="sm"
            variant={added ? 'gradient' : 'default'}
            onClick={handleAddToCart}
            className="rounded-xl px-3.5"
          >
            {added ? (
              <>
                <Check className="w-4 h-4 mr-1 text-white" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 mr-1" />
                <span>Add</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
