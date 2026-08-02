import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/store/cartStore';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CartDrawer() {
  const {
    cartItems,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    gstAmount,
    shipping,
    total,
    itemCount,
  } = useCart();

  const freeShippingThreshold = 1999;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCart}
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
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Shopping Bag</h2>
                  <p className="text-xs text-muted-foreground">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'} in your bag
                  </p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-3 bg-primary/5 border-b border-primary/10">
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                <span className="flex items-center gap-1.5 text-foreground">
                  <Truck className="w-3.5 h-3.5 text-primary" />
                  {amountToFreeShipping === 0
                    ? '🎉 You unlocked FREE BlueDart Air Delivery!'
                    : `Add ₹${amountToFreeShipping.toLocaleString('en-IN')} more for FREE BlueDart Air`}
                </span>
                <span className="text-primary font-bold">{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-300 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="p-4 rounded-full bg-muted/60 text-muted-foreground mb-4">
                    <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-1">Your bag is empty</h3>
                  <p className="text-xs text-muted-foreground max-w-xs mb-6">
                    Looks like you haven't added any high-performance gear yet.
                  </p>
                  <Button onClick={closeCart} variant="default" size="sm">
                    Explore Store Catalog
                  </Button>
                </div>
              ) : (
                cartItems.map((item) => (
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
                            onClick={() => removeFromCart(item.id)}
                            className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {item.variant && (
                          <div className="flex gap-2 text-[11px] text-muted-foreground mt-0.5">
                            {item.variant.ram && <span>RAM: {item.variant.ram}</span>}
                            {item.variant.storage && <span>Storage: {item.variant.storage}</span>}
                            {item.variant.color && <span>Color: {item.variant.color}</span>}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 bg-muted border border-border rounded-lg p-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-2">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-extrabold text-foreground">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                          {item.originalPrice && (
                            <span className="block text-[10px] text-muted-foreground line-through">
                              ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-border bg-muted/20 space-y-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Item Total (Incl. Taxes)</span>
                    <span className="font-semibold text-foreground">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>18% GST Input Credit Included</span>
                    <span className="font-semibold text-emerald-500">₹{gstAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery (BlueDart Air)</span>
                    <span className="font-semibold text-foreground">
                      {shipping === 0 ? <span className="text-emerald-500 font-bold">FREE</span> : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-foreground pt-2 border-t border-border">
                    <span>Grand Total</span>
                    <span className="text-primary">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <a href="/checkout" onClick={closeCart} className="block w-full">
                  <Button variant="gradient" size="lg" className="w-full font-bold">
                    <span>Checkout via UPI / Card / EMI</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>

                <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>UPI Instant Pay • No-Cost EMI • GST Input Invoice</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
