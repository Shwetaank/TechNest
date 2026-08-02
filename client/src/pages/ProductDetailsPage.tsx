import { useState } from 'react';
import { FEATURED_PRODUCTS } from '@/constants/products';
import { useCart } from '@/store/cartStore';
import { useWishlist } from '@/store/wishlistStore';
import {
  Star,
  ShoppingBag,
  Heart,
  CreditCard,
  Building2,
  CheckCircle,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { ProductCard } from '@/components/product/ProductCard';

export function ProductDetailsPage() {
  const product = FEATURED_PRODUCTS[0]; // Titan Pro M4 Max
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [selectedRam, setSelectedRam] = useState('64GB');
  const [selectedStorage] = useState('2TB SSD');
  const [added, setAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeChecked(true);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: `cart-${product.id}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      variant: { ram: selectedRam, storage: selectedStorage },
      inStock: product.inStock,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="py-10 bg-background border-b border-border/60 min-h-screen">
      <div className="container-custom space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-border bg-muted/30 relative shadow-lg">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <Badge variant="accent" className="absolute top-4 left-4 text-xs font-bold shadow-md">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                FLAGSHIP 2026
              </Badge>
            </div>

            <div className="flex gap-3">
              {[product.image, product.secondaryImage || product.image].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img!)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === img ? 'border-primary scale-105 shadow-md' : 'border-border/60 opacity-75'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold text-primary uppercase tracking-wider mb-2">
                <span>{product.brand}</span>
                <span>•</span>
                <span>{product.category}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground font-heading leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mt-3 text-xs">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1.5 font-bold text-foreground">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{product.reviewCount} Verified Reviews</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-emerald-500 font-bold">✓ Factory Sealed In Stock</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-foreground font-heading">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  Save ₹{(product.originalPrice! - product.price).toLocaleString('en-IN')} (11% OFF)
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold pt-1">
                <CreditCard className="w-4 h-4" />
                <span>No-Cost EMI from ₹{product.emiStartingAt?.toLocaleString('en-IN')}/month on HDFC / ICICI Credit Cards</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-extrabold text-foreground uppercase tracking-wider block">
                Memory Configuration
              </label>
              <div className="flex gap-2">
                {['32GB', '64GB', '128GB'].map((ram) => (
                  <button
                    key={ram}
                    onClick={() => setSelectedRam(ram)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedRam === ram
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-card text-muted-foreground'
                    }`}
                  >
                    {ram} Unified
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Check Delivery & EMI Options for your Pincode</span>
              </div>
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode e.g., 560001"
                  className="bg-muted text-foreground text-xs px-3.5 py-2 rounded-xl border border-border focus:outline-none w-48 font-mono"
                />
                <Button type="submit" variant="outline" size="sm">
                  Check
                </Button>
              </form>

              {pincodeChecked && (
                <div className="text-xs text-emerald-500 font-semibold flex items-center gap-1.5 pt-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>BlueDart Air Express available to {pincode} by tomorrow 5 PM</span>
                </div>
              )}
            </div>

            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-indigo-300 font-semibold">
                <Building2 className="w-4 h-4 text-indigo-400" />
                <span>Claim 18% GST Input Tax Credit (Save ~₹38,000)</span>
              </div>
              <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-md">
                GSTIN Eligible
              </span>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                variant={added ? 'gradient' : 'default'}
                size="lg"
                onClick={handleAddToCart}
                className="flex-1 font-bold text-base shadow-xl"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {added ? 'Added to Shopping Bag' : 'Add to Bag'}
              </Button>

              <button
                onClick={() =>
                  inWishlist
                    ? removeFromWishlist(product.id)
                    : addToWishlist({
                        id: `wish-${product.id}`,
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        rating: product.rating,
                        image: product.image,
                        inStock: product.inStock,
                      })
                }
                className={`p-3.5 rounded-2xl border transition-all ${
                  inWishlist
                    ? 'border-rose-500 bg-rose-500/10 text-rose-500'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist && 'fill-rose-500'}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/60">
          <h3 className="text-xl font-bold text-foreground mb-6 font-heading">
            Technical Specifications & Coverage
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.specs.map((spec, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-card border border-border/80 flex items-center justify-between text-xs font-semibold text-foreground"
              >
                <span>{spec.split(' ')[0]} Feature</span>
                <span className="text-primary font-bold">{spec}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-border/60 space-y-6">
          <h3 className="text-xl font-bold text-foreground font-heading">
            Recommended Hardware Bundles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.slice(1, 5).map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
