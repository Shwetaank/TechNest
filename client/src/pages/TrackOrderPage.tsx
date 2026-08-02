import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TrackOrderPage() {
  const [trackingId, setTrackingId] = useState('TN-IN-982341');

  const milestones = [
    { title: 'Order Placed & Payment Verified via UPI', date: 'Aug 2, 2026 - 05:15 PM', done: true },
    { title: 'Factory QC Inspection & Seal Approved', date: 'Aug 2, 2026 - 05:45 PM', done: true },
    { title: 'Handed to BlueDart Air Hub (Bengaluru)', date: 'Aug 2, 2026 - 07:00 PM', done: true },
    { title: 'Out for Express Delivery', date: 'Aug 3, 2026 - Expected 02:00 PM', done: false },
    { title: 'Delivered with Signature OTP Verification', date: 'Pending', done: false },
  ];

  return (
    <div className="py-12 bg-background border-b border-border/60 min-h-screen">
      <div className="container-custom max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-foreground font-heading">
            Live Order Tracking
          </h1>
          <p className="text-xs text-muted-foreground">
            Track your high-performance hardware shipment via BlueDart / Delhivery Air.
          </p>
        </div>

        <div className="p-4 rounded-3xl border border-border bg-card shadow-sm flex gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter Order ID (e.g. TN-IN-982341)"
              className="w-full bg-muted text-foreground text-xs pl-10 pr-4 py-2.5 rounded-xl border border-border focus:outline-none font-mono"
            />
          </div>
          <Button variant="gradient" size="sm">
            Track Order
          </Button>
        </div>

        <div className="p-6 rounded-3xl border border-border bg-card space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-border pb-4 text-xs">
            <div>
              <span className="text-muted-foreground block">Waybill / Airbill ID</span>
              <span className="font-extrabold text-foreground font-mono text-sm">BD-AIR-892314-IN</span>
            </div>
            <div className="text-right">
              <span className="text-emerald-500 font-bold block">Status: In Transit</span>
              <span className="text-muted-foreground">Courier: BlueDart Express</span>
            </div>
          </div>

          <div className="space-y-6 relative pl-6 border-l-2 border-primary/30">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative space-y-1">
                <div
                  className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 border-background ${
                    m.done ? 'bg-emerald-500' : 'bg-muted'
                  }`}
                />
                <h4 className={`text-xs font-bold ${m.done ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {m.title}
                </h4>
                <p className="text-[11px] text-muted-foreground font-mono">{m.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
