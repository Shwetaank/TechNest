import { useState } from 'react';
import { useCart } from '@/store/cartStore';
import { Cpu, Zap, ShoppingBag, CheckCircle2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ComponentOption {
  id: string;
  name: string;
  price: number;
  specs: string;
  wattage: number;
  image: string;
}

const PC_COMPONENTS: Record<string, { title: string; icon: string; options: ComponentOption[] }> = {
  processor: {
    title: 'Processor (CPU)',
    icon: '⚡',
    options: [
      { id: 'cpu-1', name: 'Intel Core i9-14900KS (24 Cores, 6.2GHz)', price: 68990, specs: '24 Cores / 32 Threads • 36MB Cache', wattage: 253, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=400&auto=format&fit=crop' },
      { id: 'cpu-2', name: 'AMD Ryzen 9 7950X3D (16 Cores, 3D V-Cache)', price: 62490, specs: '16 Cores / 32 Threads • 128MB L3', wattage: 120, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=400&auto=format&fit=crop' },
      { id: 'cpu-3', name: 'Intel Core i7-14700K (20 Cores, 5.6GHz)', price: 38990, specs: '20 Cores / 28 Threads • 33MB Cache', wattage: 225, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=400&auto=format&fit=crop' },
    ],
  },
  gpu: {
    title: 'Graphics Card (GPU)',
    icon: '🎮',
    options: [
      { id: 'gpu-1', name: 'NVIDIA GeForce RTX 5090 32GB GDDR7', price: 219990, specs: '32GB GDDR7 • 512-bit • DLSS 4.0', wattage: 450, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=400&auto=format&fit=crop' },
      { id: 'gpu-2', name: 'NVIDIA GeForce RTX 4090 24GB GDDR6X', price: 174990, specs: '24GB GDDR6X • DLSS 3.5 • Ray Tracing', wattage: 450, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=400&auto=format&fit=crop' },
      { id: 'gpu-3', name: 'NVIDIA GeForce RTX 4080 Super 16GB', price: 99990, specs: '16GB GDDR6X • 256-bit • DLSS 3.5', wattage: 320, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=400&auto=format&fit=crop' },
    ],
  },
  ram: {
    title: 'System Memory (RAM)',
    icon: '🧠',
    options: [
      { id: 'ram-1', name: 'Corsair Dominator Titanium 64GB (2x32GB) DDR5-7200', price: 28990, specs: 'DDR5 7200MHz • CL34 • RGB', wattage: 15, image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=400&auto=format&fit=crop' },
      { id: 'ram-2', name: 'G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5-6400', price: 14990, specs: 'DDR5 6400MHz • CL32 • Intel XMP 3.0', wattage: 10, image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=400&auto=format&fit=crop' },
    ],
  },
  storage: {
    title: 'Storage (NVMe SSD)',
    icon: '💾',
    options: [
      { id: 'ssd-1', name: 'Samsung 990 PRO 4TB PCIe 4.0 NVMe M.2', price: 34990, specs: '7450 MB/s Read • Heatsink Included', wattage: 10, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=400&auto=format&fit=crop' },
      { id: 'ssd-2', name: 'WD Black SN850X 2TB PCIe 4.0 NVMe M.2', price: 16990, specs: '7300 MB/s Read • Game Mode 2.0', wattage: 8, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=400&auto=format&fit=crop' },
    ],
  },
  power: {
    title: 'Power Supply (PSU)',
    icon: '🔌',
    options: [
      { id: 'psu-1', name: 'ASUS ROG Thor 1200W Platinum II ATX 3.0', price: 31990, specs: '80+ Platinum • OLED Power Display', wattage: 0, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=400&auto=format&fit=crop' },
      { id: 'psu-2', name: 'Corsair RM1000x Shift 1000W 80+ Gold', price: 18990, specs: '80+ Gold • Fully Modular • ATX 3.0', wattage: 0, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=400&auto=format&fit=crop' },
    ],
  },
};

export function CustomPcBuilderPage() {
  const { addToCart } = useCart();
  const [selectedParts, setSelectedParts] = useState<Record<string, ComponentOption>>({
    processor: PC_COMPONENTS.processor.options[0],
    gpu: PC_COMPONENTS.gpu.options[0],
    ram: PC_COMPONENTS.ram.options[0],
    storage: PC_COMPONENTS.storage.options[0],
    power: PC_COMPONENTS.power.options[0],
  });

  const [added, setAdded] = useState(false);

  const totalPrice = Object.values(selectedParts).reduce((sum, item) => sum + item.price, 0);
  const totalWattage = Object.values(selectedParts).reduce((sum, item) => sum + item.wattage, 0);

  const handleSelectPart = (category: string, option: ComponentOption) => {
    setSelectedParts((prev) => ({ ...prev, [category]: option }));
  };

  const handleAddCustomRigToCart = () => {
    addToCart({
      id: `custom-pc-${Date.now()}`,
      productId: 'custom-rig-build',
      name: `Custom PC Rig (${selectedParts.processor.name.split(' ')[0]} + ${selectedParts.gpu.name.split(' ')[0]})`,
      price: totalPrice,
      image: selectedParts.gpu.image,
      inStock: true,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="py-10 bg-background border-b border-border/60 min-h-screen">
      <div className="container-custom max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary uppercase tracking-wider mb-2">
              <Cpu className="w-4 h-4" />
              <span>CUSTOM HARDWARE CONFIGURATOR</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground font-heading">
              3D Custom PC Rig Builder
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Select component parts with real-time wattage compatibility and pricing calculations.
            </p>
          </div>

          <button
            onClick={() =>
              setSelectedParts({
                processor: PC_COMPONENTS.processor.options[0],
                gpu: PC_COMPONENTS.gpu.options[0],
                ram: PC_COMPONENTS.ram.options[0],
                storage: PC_COMPONENTS.storage.options[0],
                power: PC_COMPONENTS.power.options[0],
              })
            }
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Build</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Component Selection List */}
          <div className="lg:col-span-8 space-y-8">
            {Object.entries(PC_COMPONENTS).map(([catKey, category]) => (
              <div key={catKey} className="p-6 rounded-3xl border border-border bg-card space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.title}</span>
                  </h3>
                  <span className="text-xs font-bold text-primary">
                    Selected: {selectedParts[catKey]?.name.split(' ')[0]}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {category.options.map((opt) => {
                    const isSelected = selectedParts[catKey]?.id === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectPart(catKey, opt)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          isSelected
                            ? 'border-primary bg-primary/10 shadow-sm'
                            : 'border-border/80 bg-background hover:border-border'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img src={opt.image} alt={opt.name} className="w-12 h-12 rounded-xl object-cover" />
                          <div>
                            <h4 className="text-xs font-bold text-foreground">{opt.name}</h4>
                            <p className="text-[11px] text-muted-foreground">{opt.specs}</p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-sm font-extrabold text-foreground block">
                            ₹{opt.price.toLocaleString('en-IN')}
                          </span>
                          {opt.wattage > 0 && (
                            <span className="text-[10px] text-amber-500 font-semibold">
                              {opt.wattage}W
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Build Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-3xl border border-border bg-card space-y-6 shadow-sm sticky top-24">
              <h3 className="text-base font-extrabold text-foreground uppercase tracking-wider border-b border-border pb-3">
                Build Configuration
              </h3>

              <div className="space-y-3 text-xs">
                {Object.entries(selectedParts).map(([catKey, part]) => (
                  <div key={catKey} className="flex justify-between items-center pb-2 border-b border-border/40">
                    <div className="max-w-[200px]">
                      <span className="text-[10px] text-muted-foreground uppercase block font-bold">
                        {catKey}
                      </span>
                      <span className="font-bold text-foreground truncate block">{part.name}</span>
                    </div>
                    <span className="font-extrabold text-foreground">₹{part.price.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Zap className="w-4 h-4" />
                  <span>Power Consumption</span>
                </div>
                <p className="text-[11px] text-amber-300">
                  Estimated Peak Load: <strong>{totalWattage} Watts</strong> (1000W+ PSU Recommended)
                </p>
              </div>

              <div className="pt-2 border-t border-border space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-muted-foreground">Total Rig Price</span>
                  <span className="text-2xl font-black text-primary font-heading">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <Button
                  variant={added ? 'gradient' : 'default'}
                  size="lg"
                  onClick={handleAddCustomRigToCart}
                  className="w-full font-bold text-sm py-4 shadow-xl cursor-pointer"
                >
                  {added ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      <span>Custom PC Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      <span>Add Complete Build to Bag</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
