import { TrendingUp, ShoppingBag, Users, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AdminDashboardPage() {
  const stats = [
    { title: 'Total Revenue (FY 2026)', value: '₹1.48 Crore', change: '+24.5%', icon: TrendingUp, color: 'text-emerald-500' },
    { title: 'Total Orders Shipped', value: '1,842', change: '+18.2%', icon: ShoppingBag, color: 'text-primary' },
    { title: 'Active Indian Customers', value: '12,490', change: '+12.8%', icon: Users, color: 'text-amber-500' },
    { title: 'Inventory In Stock', value: '384 Rigs', change: 'Optimal', icon: Package, color: 'text-purple-500' },
  ];

  const recentOrders = [
    { id: 'TN-IN-982341', customer: 'Aarav Sharma (Bengaluru)', product: 'Apex Beast Ultra RTX 5090', amount: '₹3,29,990', status: 'Dispatched', date: 'Aug 2, 2026' },
    { id: 'TN-IN-982340', customer: 'Priya Nair (Mumbai)', product: 'Horizon 49" QD-OLED 240Hz', amount: '₹1,09,990', status: 'Delivered', date: 'Aug 2, 2026' },
    { id: 'TN-IN-982339', customer: 'Vikramaditya Roy (Gurugram)', product: 'Titan Pro M4 Max Laptop', amount: '₹2,49,990', status: 'Processing', date: 'Aug 1, 2026' },
  ];

  return (
    <div className="py-10 bg-background border-b border-border/60 min-h-screen">
      <div className="container-custom space-y-8">
        <div className="flex items-center justify-between pb-6 border-b border-border">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground font-heading">
              Admin Enterprise Analytics
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live store metrics, GST invoices & inventory management for TechNest India.
            </p>
          </div>

          <Button variant="gradient" size="sm">
            Export GST Report
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="p-6 rounded-3xl border border-border bg-card space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground">{s.title}</span>
                  <div className={`p-2 rounded-xl bg-muted ${s.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-foreground font-heading">
                  {s.value}
                </div>
                <span className="text-[11px] font-bold text-emerald-500">{s.change} vs last month</span>
              </div>
            );
          })}
        </div>

        <div className="p-6 rounded-3xl border border-border bg-card space-y-4 shadow-sm">
          <h3 className="text-base font-bold text-foreground">Recent Enterprise Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border text-muted-foreground uppercase font-bold text-[10px]">
                <tr>
                  <th className="py-3 px-2">Order ID</th>
                  <th className="py-3 px-2">Customer & City</th>
                  <th className="py-3 px-2">Hardware Product</th>
                  <th className="py-3 px-2">Amount</th>
                  <th className="py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-muted/40 transition-colors">
                    <td className="py-3 px-2 font-mono font-bold text-primary">{o.id}</td>
                    <td className="py-3 px-2 font-semibold text-foreground">{o.customer}</td>
                    <td className="py-3 px-2 text-muted-foreground">{o.product}</td>
                    <td className="py-3 px-2 font-extrabold text-foreground">{o.amount}</td>
                    <td className="py-3 px-2">
                      <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
