import { useState } from 'react';
import {
  Sparkles,
  Send,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Headphones,
  CreditCard,
  Building2,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      {/* Top Enterprise Guarantee Value Cards */}
      <div className="container-custom pb-12 mb-12 border-b border-slate-800/60">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-all">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">BlueDart Express Air</h4>
              <p className="text-xs text-slate-400">Free delivery on orders over ₹1,999</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 transition-all">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">18% GST Business Invoice</h4>
              <p className="text-xs text-slate-400">Claim B2B input credit with GSTIN</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">2-Year Enterprise Warranty</h4>
              <p className="text-xs text-slate-400">Doorstep repair & hardware replacement</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 transition-all">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">24/7 Engineer Support</h4>
              <p className="text-xs text-slate-400">Live chat with hardware specialists</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <a href="/" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white shadow-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight font-heading">
                Tech<span className="text-indigo-400">Nest</span>
              </span>
            </a>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              TechNest Store is India's enterprise hardware storefront delivering factory-sealed liquid-cooled gaming PCs, flagship laptops, custom mechanical keyboards, and 240Hz OLED displays.
            </p>

            {/* Newsletter & System Status */}
            <div className="pt-2 space-y-3">
              <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Subscribe to Hardware Launch Alerts
              </h5>
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email address"
                  className="w-full bg-slate-900 border border-slate-800 text-slate-100 placeholder:text-slate-500 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <Button type="submit" variant="gradient" size="sm" className="shrink-0">
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </form>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscribed! You will receive early hardware alerts.</span>
                </div>
              )}

              {/* Real-time System Status Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>All Systems Operational • 99.99% Uptime</span>
              </div>
            </div>
          </div>

          {/* Column 1: Computers & Workstations */}
          <div>
            <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Computers & Rigs
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="/categories/laptops" className="hover:text-indigo-400 transition-colors">RTX 5090 Laptops</a></li>
              <li><a href="/categories/laptops/macbooks" className="hover:text-indigo-400 transition-colors">MacBook Pro & Air M4</a></li>
              <li><a href="/categories/gaming-pcs" className="hover:text-indigo-400 transition-colors">Liquid-Cooled Desktop Rigs</a></li>
              <li><a href="/categories/gaming-pcs/ai-workstations" className="hover:text-indigo-400 transition-colors">AI & Deep Learning Servers</a></li>
              <li><a href="/categories/gaming-pcs/mini-itx-pcs" className="hover:text-indigo-400 transition-colors">Mini-ITX Small Form Factor</a></li>
            </ul>
          </div>

          {/* Column 2: Displays & Audio */}
          <div>
            <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Peripherals & Audio
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="/categories/monitors" className="hover:text-indigo-400 transition-colors">4K 240Hz OLED Displays</a></li>
              <li><a href="/categories/peripherals/mechanical-keyboards" className="hover:text-indigo-400 transition-colors">Magnetic Rapid-Trigger Keyboards</a></li>
              <li><a href="/categories/peripherals/gaming-mouse" className="hover:text-indigo-400 transition-colors">8000Hz Ultra-Light Mice</a></li>
              <li><a href="/categories/audio/headphones" className="hover:text-indigo-400 transition-colors">Planar Magnetic Headsets</a></li>
              <li><a href="/categories/accessories/storage" className="hover:text-indigo-400 transition-colors">PCIe 5.0 NVMe SSDs</a></li>
            </ul>
          </div>

          {/* Column 3: Enterprise & Support */}
          <div>
            <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Enterprise & Support
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="/about" className="hover:text-indigo-400 transition-colors">About TechNest India</a></li>
              <li><a href="/track-order" className="hover:text-indigo-400 transition-colors">Track Order (BlueDart Air)</a></li>
              <li><a href="/profile" className="hover:text-indigo-400 transition-colors">Customer Portal & GSTIN</a></li>
              <li><a href="/admin/dashboard" className="hover:text-indigo-400 transition-colors">Admin Dashboard</a></li>
              <li><a href="/settings" className="hover:text-indigo-400 transition-colors">Privacy Policy & Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <p>© 2026 TechNest Store Inc. All rights reserved.</p>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-semibold cursor-pointer">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>🇮🇳 INR (₹) • English</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <CreditCard className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-slate-300">
              UPI • PhonePe • Google Pay • No-Cost EMI • Visa • Mastercard • RuPay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
