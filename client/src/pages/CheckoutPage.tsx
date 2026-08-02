import { useState, useEffect } from 'react';
import { useCart } from '@/store/cartStore';
import { useAuth } from '@/store/authStore';
import { Building2, CreditCard, CheckCircle2, Truck, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CheckoutPage() {
  const { cartItems, subtotal, gstAmount, total, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [address, setAddress] = useState({
    fullName: user?.fullName || user?.name || 'Shwetank Sharma',
    phone: user?.phone || '9876543210',
    pincode: '560001',
    street: '100 Feet Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
  });

  useEffect(() => {
    if (user) {
      setAddress((prev) => ({
        ...prev,
        fullName: user.fullName || user.name || prev.fullName,
        phone: user.phone || prev.phone,
      }));
    }
  }, [user]);

  const [gstin, setGstin] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'EMI' | 'COD'>('UPI');

  const handlePlaceOrder = () => {
    clearCart();
    window.location.href = '/order-success';
  };

  return (
    <div className="py-10 bg-background border-b border-border/60 min-h-screen">
      <div className="container-custom max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between pb-6 border-b border-border">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground font-heading">
              Secure Indian Checkout
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              256-Bit SSL Encrypted • 18% GST Compliant • BlueDart Air Logistics
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>1</span>
            <div className="w-8 h-0.5 bg-border" />
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>2</span>
            <div className="w-8 h-0.5 bg-border" />
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>3</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            {step === 1 && (
              <div className="p-6 rounded-3xl border border-border bg-card space-y-4 shadow-sm">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  <span>1. Indian Shipping Address</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-extrabold text-foreground uppercase tracking-wider block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="font-extrabold text-foreground uppercase tracking-wider block mb-1">Phone (+91)</label>
                    <input
                      type="text"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="font-extrabold text-foreground uppercase tracking-wider block mb-1">Pincode</label>
                    <input
                      type="text"
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="font-extrabold text-foreground uppercase tracking-wider block mb-1">City</label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-extrabold text-foreground uppercase tracking-wider block mb-1">Street Address</label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <Button variant="default" onClick={() => setStep(2)} className="w-full font-bold">
                  Continue to GST & Business Tax Details
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="p-6 rounded-3xl border border-border bg-card space-y-4 shadow-sm">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  <span>2. Business GSTIN Tax Invoice (Optional)</span>
                </h3>
                <p className="text-xs text-muted-foreground">
                  Claim up to 18% Input Tax Credit on eligible corporate hardware purchases.
                </p>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-extrabold text-foreground uppercase tracking-wider block mb-1">Company Name</label>
                    <input
                      type="text"
                      placeholder="TechNest Enterprise Labs"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="font-extrabold text-foreground uppercase tracking-wider block mb-1">15-Digit GSTIN</label>
                    <input
                      type="text"
                      placeholder="29AAAAA0000A1Z5"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      className="w-full p-3 rounded-xl bg-background border border-border text-foreground font-mono focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="w-1/3">
                    Back
                  </Button>
                  <Button variant="default" onClick={() => setStep(3)} className="w-2/3 font-bold">
                    Proceed to Payment
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="p-6 rounded-3xl border border-border bg-card space-y-4 shadow-sm">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span>3. Indian Payment Option</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {[
                    { id: 'UPI', label: 'UPI / QR', icon: QrCode },
                    { id: 'Card', label: 'Cards', icon: CreditCard },
                    { id: 'EMI', label: 'No-Cost EMI', icon: Building2 },
                    { id: 'COD', label: 'Cash on Delivery', icon: CheckCircle2 },
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 font-bold transition-all ${
                          paymentMethod === m.id
                            ? 'border-primary bg-primary/10 text-primary shadow-xs'
                            : 'border-border bg-background text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                <Button variant="gradient" size="lg" onClick={handlePlaceOrder} className="w-full font-bold text-sm py-4">
                  Pay ₹{total.toLocaleString('en-IN')} & Complete Order
                </Button>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="p-6 rounded-3xl border border-border bg-card space-y-4 shadow-sm sticky top-24">
              <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider border-b border-border pb-3">
                Order Summary ({cartItems.length} items)
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-bold text-foreground">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>18% GST Credit</span>
                  <span className="font-bold text-emerald-500">₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>BlueDart Air Shipping</span>
                  <span className="font-bold text-emerald-500">FREE</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-border text-sm font-extrabold text-foreground">
                  <span>Grand Total</span>
                  <span className="text-primary text-base">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
