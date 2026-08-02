import { useCart } from '@/store/cartStore';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    gstAmount,
    shipping,
    total,
    itemCount,
  } = useCart();

  return (
    <div className="py-10 bg-background border-b border-border/60 min-h-screen">
      <div className="container-custom max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground font-heading">
            Shopping Bag
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} ready for checkout via UPI, EMI or GST Invoice.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-3xl p-8 space-y-4">
            <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto" />
            <h3 className="text-lg font-bold text-foreground">Your shopping bag is empty</h3>
            <a href="/products">
              <Button variant="default" size="sm">
                Explore Store Catalog
              </Button>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-3xl border border-border bg-card shadow-xs items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-2xl border border-border shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-base font-bold text-foreground line-clamp-1">
                          {item.name}
                        </h4>
                        {item.variant && (
                          <span className="text-xs text-muted-foreground">
                            {item.variant.ram} • {item.variant.storage}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive p-1 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 bg-muted border border-border rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-muted-foreground hover:text-foreground"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold px-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-muted-foreground hover:text-foreground"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-base font-extrabold text-foreground">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl border border-border bg-card space-y-4 shadow-sm">
                <h3 className="text-base font-bold text-foreground border-b border-border pb-3">
                  Payment Summary
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-semibold text-foreground">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>18% GST Input Credit Included</span>
                    <span className="font-semibold text-emerald-500">
                      ₹{gstAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery (BlueDart Express Air)</span>
                    <span className="font-semibold text-foreground">
                      {shipping === 0 ? <span className="text-emerald-500 font-bold">FREE</span> : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-foreground pt-3 border-t border-border">
                    <span>Grand Total</span>
                    <span className="text-primary">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <a href="/checkout" className="block w-full pt-2">
                  <Button variant="gradient" size="lg" className="w-full font-bold">
                    <span>Proceed to Indian Checkout</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
