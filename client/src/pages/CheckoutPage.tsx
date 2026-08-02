import { useState } from 'react';
import { useCart } from '@/store/cartStore';
import { Building2, CreditCard, CheckCircle2, Truck, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CheckoutPage() {
  const { cartItems, subtotal, gstAmount, total, clearCart } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [address, setAddress] = useState({
    fullName: 'Aarav Sharma',
    phone: '9876543210',
    pincode: '560001',
    street: '100 Feet Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
  });

  const [gstin, setGstin] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'EMI' | 'COD'>('UPI');
  const [upiVpa, setUpiVpa] = useState('');

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
                    <label className="font-bold text-foreground block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      className="w-full bg-muted border border-border p-2.5 rounded-xl text-foreground"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-foreground block mb-1">Phone (+91)</label>
                    <input
                      type="text"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full bg-muted border border-border p-2.5 rounded-xl text-foreground"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-bold text-foreground block mb-1">Street Address</label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      className="w-full bg-muted border border-border p-2.5 rounded-xl text-foreground"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-foreground block mb-1">6-Digit Pincode</label>
                    <input
                      type="text"
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      className="w-full bg-muted border border-border p-2.5 rounded-xl text-foreground font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-foreground block mb-1">City & State</label>
                    <input
                      type="text"
                      value={`${address.city}, ${address.state}`}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full bg-muted border border-border p-2.5 rounded-xl text-foreground"
                    />
                  </div>
                </div>

                <Button onClick={() => setStep(2)} variant="gradient" size="default" className="w-full font-bold">
                  Continue to GST Details →
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="p-6 rounded-3xl border border-border bg-card space-y-4 shadow-sm">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-indigo-400" />
                  <span>2. Business GST Invoice (Optional)</span>
                </h3>

                <p className="text-xs text-muted-foreground">
                  Claim 18% GST Input Tax Credit on your company purchases.
                </p>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-foreground block mb-1">Company Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. NeuralCompute Labs Pvt Ltd"
                      className="w-full bg-muted border border-border p-2.5 rounded-xl text-foreground"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-foreground block mb-1">15-Digit GSTIN Number</label>
                    <input
                      type="text"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value.toUpperCase())}
                      placeholder="e.g. 29AAAAA0000A1Z5"
                      className="w-full bg-muted border border-border p-2.5 rounded-xl text-foreground font-mono uppercase"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={() => setStep(1)} variant="outline" size="default">
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)} variant="gradient" size="default" className="flex-1 font-bold">
                    Proceed to Payment →
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="p-6 rounded-3xl border border-border bg-card space-y-6 shadow-sm">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-500" />
                  <span>3. Indian Payment Options</span>
                </h3>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-3 rounded-2xl border flex items-center gap-2 font-bold ${paymentMethod === 'UPI' ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-muted'}`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>UPI (Google Pay/PhonePe)</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('EMI')}
                    className={`p-3 rounded-2xl border flex items-center gap-2 font-bold ${paymentMethod === 'EMI' ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-muted'}`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>No-Cost EMI (HDFC/ICICI)</span>
                  </button>
                </div>

                {paymentMethod === 'UPI' && (
                  <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-3 text-xs">
                    <label className="font-bold text-foreground block">Enter VPA / UPI ID</label>
                    <input
                      type="text"
                      value={upiVpa}
                      onChange={(e) => setUpiVpa(e.target.value)}
                      placeholder="e.g. mobile@upi or username@okaxis"
                      className="w-full bg-background border border-border p-2.5 rounded-xl text-foreground font-mono"
                    />
                  </div>
                )}

                <Button onClick={handlePlaceOrder} variant="gradient" size="lg" className="w-full font-bold">
                  <span>Pay ₹{total.toLocaleString('en-IN')} & Place Order</span>
                  <CheckCircle2 className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl border border-border bg-card space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-foreground border-b border-border pb-3">
                Order Summary ({cartItems.length} items)
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs">
                    <div>
                      <span className="font-bold text-foreground block">{item.name}</span>
                      <span className="text-muted-foreground">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-extrabold text-foreground">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs pt-3 border-t border-border">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-semibold text-foreground">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>18% GST Input Claim</span>
                  <span className="font-semibold text-emerald-500">₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-foreground pt-2 border-t border-border">
                  <span>Grand Total</span>
                  <span className="text-primary">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
