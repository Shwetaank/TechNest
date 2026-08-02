import { CheckCircle2, FileText, ArrowRight, Truck, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function OrderSuccessPage() {
  return (
    <div className="py-16 bg-background border-b border-border/60 min-h-screen">
      <div className="container-custom max-w-2xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto shadow-xl">
          <CheckCircle2 className="w-10 h-10 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-extrabold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-wider">
            ORDER CONFIRMED & QC SEALED
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground font-heading">
            Thank You for Your Order!
          </h1>
          <p className="text-sm text-muted-foreground">
            Order Tracking Reference: <strong className="text-foreground font-mono">TN-IN-982341</strong>
          </p>
        </div>

        {/* Delivery Box */}
        <div className="p-6 rounded-3xl border border-border bg-card shadow-sm text-left space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3 text-xs">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary" />
              <span className="font-bold text-foreground">BlueDart Express Air</span>
            </div>
            <span className="text-emerald-500 font-bold">Estimated Delivery: Tomorrow 5 PM</span>
          </div>

          <div className="flex items-start gap-3 text-xs">
            <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-foreground block">Shipping Address</span>
              <span className="text-muted-foreground">
                Aarav Sharma • 100 Feet Road, Indiranagar, Bengaluru, Karnataka - 560001
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a href="/track-order">
            <Button variant="gradient" size="lg" className="font-bold" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Track Order Live
            </Button>
          </a>

          <Button variant="outline" size="lg" className="font-bold" leftIcon={<FileText className="w-4 h-4" />}>
            Download 18% GST Tax Invoice
          </Button>
        </div>
      </div>
    </div>
  );
}
