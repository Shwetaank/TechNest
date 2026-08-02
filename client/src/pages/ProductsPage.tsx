import { useState, useEffect, useMemo } from 'react';
import { fetchProducts } from '@/services/productService';
import { ProductCard } from '@/components/product/ProductCard';
import { Search, Filter, Grid, List, SlidersHorizontal, ArrowUpDown, RefreshCw, Sparkles } from 'lucide-react';
import type { Product } from '@/types';

/**
 * Products catalog page featuring live backend API fetching (`/api/v1/products`),
 * fallback catalog cache, search matching, grid/list view toggle, and price/rating sorting.
 */
export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(350000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', 'Laptops', 'Gaming PCs', 'Monitors', 'Peripherals', 'Audio', 'Storage'];
  const brands = ['All', 'TechNest', 'Apex', 'CyberBlade', 'Asus', 'Razer', 'VelocityX'];

  // Fetch live hardware catalog from Express 5 Backend API
  useEffect(() => {
    fetchProducts({
      search: searchQuery,
      category: selectedCategory !== 'All' ? selectedCategory : undefined,
      brand: selectedBrand !== 'All' ? selectedBrand : undefined,
      maxPrice,
      sortBy,
    }).then((data) => setProducts(data));
  }, [searchQuery, selectedCategory, selectedBrand, maxPrice, sortBy]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.specs.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
      const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, searchQuery, selectedCategory, selectedBrand, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedBrand('All');
    setMaxPrice(350000);
    setSortBy('featured');
  };

  return (
    <div className="py-10 bg-background border-b border-border/60 min-h-screen">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-6 border-b border-border/60">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>STORE CATALOG</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground font-heading">
              Hardware & Workstations
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Explore {filteredProducts.length} high-performance electronics connected to live API server.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search RTX 5090, OLED..."
                className="w-full bg-card border border-border text-foreground placeholder:text-muted-foreground text-xs pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <button
              onClick={() => setSelectedCategory('All')}
              className="md:hidden p-2.5 rounded-xl border border-border bg-card text-foreground"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="hidden md:block col-span-3 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary" />
                <span>Filter Hardware</span>
              </h3>
              <button
                onClick={resetFilters}
                className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-extrabold text-foreground uppercase tracking-wider block">
                Category
              </label>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors text-left ${
                      selectedCategory === cat
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-border/60">
              <label className="text-xs font-extrabold text-foreground uppercase tracking-wider block">
                Brand
              </label>
              <div className="space-y-1">
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBrand(b)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedBrand === b
                        ? 'text-primary font-bold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-border/60">
              <div className="flex justify-between items-center text-xs font-extrabold text-foreground">
                <span className="uppercase tracking-wider">Max Price</span>
                <span className="text-primary font-bold">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="350000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>

          <div className="col-span-12 md:col-span-9 space-y-6">
            <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-2xl">
              <span className="text-xs font-semibold text-muted-foreground">
                Showing <strong className="text-foreground">{filteredProducts.length}</strong> products
              </span>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs">
                  <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-foreground font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="featured">Featured First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                <div className="hidden sm:flex items-center gap-1 bg-muted p-1 rounded-xl">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg text-muted-foreground transition-colors ${
                      viewMode === 'grid' && 'bg-background text-foreground shadow-xs'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg text-muted-foreground transition-colors ${
                      viewMode === 'list' && 'bg-background text-foreground shadow-xs'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-card border border-border rounded-3xl p-8 space-y-4">
                <div className="p-4 rounded-full bg-muted w-16 h-16 mx-auto flex items-center justify-center text-muted-foreground">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-foreground">No matching hardware found</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Try adjusting your search query or reset filters to see all products.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-primary-foreground"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'grid grid-cols-1 gap-4'
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
