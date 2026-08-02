import { useState } from 'react';
import { useAuth } from '@/store/authStore';
import {
  ShoppingBag,
  MapPin,
  Lock,
  Plus,
  Trash2,
  CheckCircle2,
  Truck,
  FileText,
  LogOut,
  X,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProfilePage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'security' | 'gst'>('orders');

  // Address CRUD State
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      name: user?.fullName || 'Shwetank Sharma',
      phone: '+91 98765 43210',
      street: '100 Feet Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
      isDefault: true,
      tag: 'HOME',
    },
  ]);

  const [isAddAddrOpen, setIsAddAddrOpen] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: 'Karnataka',
    pincode: '',
    tag: 'WORK',
  });

  const [pwState, setPwState] = useState({ current: '', next: '', confirm: '' });
  const [msg, setMsg] = useState<string | null>(null);

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      id: `addr-${Date.now()}`,
      ...newAddr,
      isDefault: false,
    };
    setAddresses((prev) => [...prev, created]);
    setIsAddAddrOpen(false);
    setNewAddr({ name: '', phone: '', street: '', city: '', state: 'Karnataka', pincode: '', tag: 'WORK' });
    setMsg('New shipping address saved successfully!');
    setTimeout(() => setMsg(null), 4000);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    setMsg('Address deleted.');
    setTimeout(() => setMsg(null), 4000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwState.next !== pwState.confirm) {
      alert('New passwords do not match!');
      return;
    }
    setMsg('Account password updated securely.');
    setPwState({ current: '', next: '', confirm: '' });
    setTimeout(() => setMsg(null), 4000);
  };

  return (
    <div className="py-10 bg-background border-b border-border/60 min-h-screen">
      <div className="container-custom max-w-6xl mx-auto space-y-8">
        {/* Profile Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-card via-card to-primary/10 border border-border flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-primary/20 text-primary text-2xl font-black flex items-center justify-center border-2 border-primary uppercase">
              {(user?.fullName || user?.name || 'S').charAt(0)}
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">
                {user?.fullName || user?.name || 'Shwetank Sharma'}
              </h1>
              <p className="text-xs text-muted-foreground">{user?.email || 'spmorey87@gmail.com'}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-extrabold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full uppercase border border-primary/20">
                  {user?.role || 'VIP MEMBER'}
                </span>
                <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">
                  VERIFIED ACCOUNT
                </span>
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={logout} className="rounded-xl font-bold text-xs gap-1.5 text-destructive hover:bg-destructive/10 cursor-pointer">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Button>
        </div>

        {msg && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{msg}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-border pb-3 overflow-x-auto">
          {[
            { id: 'orders', label: 'Order History & Invoices', icon: ShoppingBag },
            { id: 'addresses', label: `Saved Addresses (${addresses.length})`, icon: MapPin },
            { id: 'security', label: 'Account Security', icon: Lock },
            { id: 'gst', label: 'Business & GST Details', icon: Building2 },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
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

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <span className="text-[10px] font-mono text-primary font-bold block">ORDER #TN-IN-982341</span>
                  <h3 className="text-base font-bold text-foreground">Apex Beast Ultra RTX 5090 Desktop Rig</h3>
                </div>
                <span className="text-xs font-extrabold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Dispatched via BlueDart
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between text-xs gap-4 pt-2">
                <span className="text-muted-foreground">Placed on Aug 2, 2026 • Amount: <strong className="text-foreground">₹3,29,990</strong></span>

                <div className="flex items-center gap-2">
                  <a href="/track-order">
                    <Button variant="outline" size="sm" className="rounded-xl text-xs font-bold gap-1.5 cursor-pointer">
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track Shipment</span>
                    </Button>
                  </a>
                  <Button variant="default" size="sm" onClick={() => alert('Downloading GST Pro-Forma PDF Invoice...')} className="rounded-xl text-xs font-bold gap-1.5 cursor-pointer">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Download Invoice</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Address CRUD */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">Saved Shipping Locations</h3>
              <Button variant="default" size="sm" onClick={() => setIsAddAddrOpen(true)} className="rounded-xl font-bold text-xs gap-1.5 cursor-pointer">
                <Plus className="w-4 h-4" />
                <span>Add New Address</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((a) => (
                <div key={a.id} className="p-6 rounded-3xl border border-border bg-card space-y-3 shadow-sm relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                      {a.tag}
                    </span>
                    <button onClick={() => handleDeleteAddress(a.id)} className="text-destructive hover:bg-destructive/10 p-1.5 rounded-xl cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-foreground">{a.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{a.street}, {a.city}, {a.state} - {a.pincode}</p>
                    <p className="text-xs font-mono text-muted-foreground mt-1">{a.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Security */}
        {activeTab === 'security' && (
          <div className="p-8 rounded-3xl border border-border bg-card max-w-lg space-y-6 shadow-sm">
            <h3 className="text-base font-bold text-foreground border-b border-border pb-3">Update Security Password</h3>
            <form onSubmit={handlePasswordChange} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-foreground block mb-1">Current Password *</label>
                <input
                  type="password"
                  value={pwState.current}
                  onChange={(e) => setPwState({ ...pwState, current: e.target.value })}
                  required
                  className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">New Password *</label>
                <input
                  type="password"
                  value={pwState.next}
                  onChange={(e) => setPwState({ ...pwState, next: e.target.value })}
                  required
                  className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Confirm New Password *</label>
                <input
                  type="password"
                  value={pwState.confirm}
                  onChange={(e) => setPwState({ ...pwState, confirm: e.target.value })}
                  required
                  className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <Button type="submit" variant="default" className="w-full font-bold text-xs py-3.5 shadow-lg cursor-pointer">
                Save Password Changes
              </Button>
            </form>
          </div>
        )}

        {/* Tab 4: GST Business */}
        {activeTab === 'gst' && (
          <div className="p-8 rounded-3xl border border-border bg-card max-w-lg space-y-6 shadow-sm text-xs">
            <h3 className="text-base font-bold text-foreground border-b border-border pb-3">B2B GSTIN Information</h3>
            <p className="text-muted-foreground">Save your GSTIN number to claim 18% Input Tax Credit on hardware purchases.</p>
          </div>
        )}
      </div>

      {/* Add Address Modal */}
      {isAddAddrOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-card border border-border/80 shadow-2xl rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-lg font-bold text-foreground">Add New Delivery Location</h3>
              <button onClick={() => setIsAddAddrOpen(false)} className="text-muted-foreground hover:text-foreground cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAddress} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-foreground block mb-1">Recipient Name *</label>
                <input
                  type="text"
                  value={newAddr.name}
                  onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                  placeholder="Shwetank Sharma"
                  required
                  className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={newAddr.phone}
                  onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  required
                  className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Street Address *</label>
                <input
                  type="text"
                  value={newAddr.street}
                  onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                  placeholder="100 Feet Road, Indiranagar"
                  required
                  className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-foreground block mb-1">City *</label>
                  <input
                    type="text"
                    value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                    placeholder="Bengaluru"
                    required
                    className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="font-bold text-foreground block mb-1">Pincode *</label>
                  <input
                    type="text"
                    value={newAddr.pincode}
                    onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                    placeholder="560001"
                    required
                    className="w-full p-3 rounded-xl bg-background border border-border text-foreground focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsAddAddrOpen(false)} className="w-1/3">
                  Cancel
                </Button>
                <Button type="submit" variant="default" className="w-2/3 font-bold cursor-pointer">
                  Save Address
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
