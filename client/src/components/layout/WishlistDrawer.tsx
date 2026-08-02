import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '@/store/wishlistStore';
import { useCart } from '@/store/cartStore';
import { X, Heart, Trash2, ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function WishlistDrawer() {
  const { wishlistItems, isOpen, closeWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeWishlist}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-card border-l border-border shadow-2xl flex flex-col justify-between"
          >
            <div className="p-6 border-b border-border/80 flex items-center justify-between bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
                  <Heart className="w-5 h-5 fill-rose-500/20" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Saved Wishlist</h2>
                  <p className="text-xs text-muted-foreground">
                    {wishlistItems.length} saved {wishlistItems.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeWishlist}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlistItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="p-4 rounded-full bg-muted/60 text-muted-foreground mb-4">
                    <Heart className="w-10 h-10 stroke-[1.5]" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-1">Your wishlist is empty</h3>
                  <p className="text-xs text-muted-foreground max-w-xs mb-6">
                    Save hardware specs and items you want to keep an eye on.
                  </p>
                  <Button onClick={closeWishlist} variant="default" size="sm">
                    Explore Hardware
                  </Button>
                </div>
              ) : (
                wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 rounded-2xl border border-border/60 bg-muted/10 hover:bg-muted/20 transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl border border-border shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-foreground line-clamp-1">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromWishlist(item.productId)}
                            className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5 mt-1 text-xs">
                          <div className="flex items-center text-amber-400">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span className="ml-1 font-bold text-foreground">{item.rating}</span>
                          </div>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-emerald-500 font-semibold">In Stock</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm font-extrabold text-foreground">
                          ${item.price.toLocaleString()}
                        </span>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            addToCart({
                              id: item.id,
                              productId: item.productId,
                              name: item.name,
                              price: item.price,
                              originalPrice: item.originalPrice,
                              image: item.image,
                              inStock: item.inStock,
                            });
                            removeFromWishlist(item.productId);
                          }}
                          leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
                        >
                          Move to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {wishlistItems.length > 0 && (
              <div className="p-6 border-t border-border bg-muted/20">
                <a href="/wishlist" onClick={closeWishlist} className="block w-full">
                  <Button variant="outline" size="lg" className="w-full font-bold">
                    View Full Wishlist Page
                  </Button>
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
