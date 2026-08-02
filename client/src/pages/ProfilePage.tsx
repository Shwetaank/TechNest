import { useState } from 'react';
import { Package, MapPin, Building2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'gst' | 'security'>('orders');

  return (
    <div className="py-12 bg-background border-b border-border/60 min-h-screen">
      <div className="container-custom max-w-5xl mx-auto space-y-8">
        <div className="p-6 rounded-3xl border border-border bg-card flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
              alt="Aarav Sharma"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-primary"
            />
            <div>
              <h2 className="text-xl font-extrabold text-foreground">Aarav Sharma</h2>
              <p className="text-xs text-muted-foreground">aarav.sharma@neuralcompute.in • +91 98765 43210</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-md">
                  ENTERPRISE VIP BUYER
                </span>
                <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-md">
                  GST VERIFIED
                </span>
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm">
            Edit Profile
          </Button>
        </div>

        <div className="flex items-center gap-2 border-b border-border pb-3 overflow-x-auto">
          {[
            { id: 'orders', label: 'Order History', icon: Package },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
            { id: 'gst', label: 'GSTIN Business Details', icon: Building2 },
            { id: 'security', label: 'Security & Password', icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl border border-border bg-card space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-border pb-3 text-xs">
                <div>
                  <span className="font-bold text-foreground block">Order #TN-IN-982341</span>
                  <span className="text-muted-foreground">Aug 2, 2026</span>
                </div>
                <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  Dispatched via BlueDart
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-foreground">Apex Beast Ultra RTX 5090 Desktop</h4>
                  <span className="text-muted-foreground">Qty: 1 • Paid via UPI</span>
                </div>
                <span className="text-sm font-extrabold text-foreground">₹3,29,990</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl border border-primary bg-primary/5 space-y-2 text-xs relative">
              <span className="text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-md">
                DEFAULT WORK ADDRESS
              </span>
              <h4 className="font-bold text-foreground">Aarav Sharma</h4>
              <p className="text-muted-foreground">
                100 Feet Road, Indiranagar, Bengaluru, Karnataka - 560001
              </p>
              <p className="text-muted-foreground">Phone: +91 98765 43210</p>
            </div>
          </div>
        )}

        {activeTab === 'gst' && (
          <div className="p-6 rounded-3xl border border-border bg-card space-y-4 text-xs">
            <h3 className="text-base font-bold text-foreground">Saved Business GSTIN Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground block">Company Name</span>
                <span className="font-bold text-foreground">NeuralCompute Labs Pvt Ltd</span>
              </div>
              <div>
                <span className="text-muted-foreground block">GSTIN</span>
                <span className="font-mono font-bold text-primary">29AAAAA0000A1Z5</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
