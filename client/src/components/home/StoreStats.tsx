import { Users, Truck, ShieldCheck, Headphones } from 'lucide-react';

export function StoreStats() {
  const stats = [
    { label: 'Happy Gamers & Pros', value: '50,000+', icon: Users, color: 'text-primary' },
    { label: 'On-Time Express Delivery', value: '99.9%', icon: Truck, color: 'text-emerald-500' },
    { label: 'Enterprise Warranty', value: '2 Years', icon: ShieldCheck, color: 'text-amber-500' },
    { label: 'Engineer Live Chat Support', value: '24/7', icon: Headphones, color: 'text-purple-500' },
  ];

  return (
    <section className="py-16 bg-muted/20 border-b border-border/60">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm flex flex-col items-center space-y-2"
              >
                <div className={`p-3 rounded-2xl bg-muted ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-3xl sm:text-4xl font-extrabold text-foreground font-heading">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
