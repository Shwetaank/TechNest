import { useState, useEffect } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { useCart } from '@/store/cartStore';
import { useWishlist } from '@/store/wishlistStore';
import { useAuth } from '@/store/authStore';
import { NAV_LINKS } from '@/constants/navigation';
import { MegaNavigation } from './MegaNavigation';
import {
  Search,
  ShoppingBag,
  Heart,
  Sun,
  Moon,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  ShieldCheck,
  Package,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onOpenSearch: () => void;
}

export function Header({ onOpenSearch }: HeaderProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const { openCart, itemCount: cartCount, subtotal } = useCart();
  const { openWishlist, itemCount: wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  const [activeMegaCategory, setActiveMegaCategory] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryHover = (categoryId: string | null) => {
    setActiveMegaCategory(categoryId);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        isScrolled
          ? 'glass-nav shadow-lg border-b border-border/80 py-2.5'
          : 'bg-background/80 backdrop-blur-md border-b border-border/40 py-3.5'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Main Nav */}
          <div className="flex items-center gap-8">
            <a
              href="/"
              className="flex items-center gap-2.5 text-xl font-black font-heading tracking-tight group"
            >
              <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-md shadow-primary/30 group-hover:scale-105 transition-transform">
                ⚡
              </div>
              <div className="flex flex-col">
                <span className="leading-none text-foreground text-lg font-extrabold tracking-tight">
                  Tech<span className="text-primary font-black">Nest</span>
                </span>
                <span className="text-[9px] font-bold text-muted-foreground tracking-wider uppercase leading-none mt-0.5">
                  Store • Enterprise
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="relative py-2"
                  onMouseEnter={() =>
                    handleCategoryHover(link.isMega ? link.label.toLowerCase() : null)
                  }
                >
                  <a
                    href={link.href}
                    className={cn(
                      'px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5',
                      link.badge
                        ? 'text-primary font-bold bg-primary/10 hover:bg-primary/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                    )}
                  >
                    {link.label}
                    {link.isMega && (
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </a>

                  {link.isMega && activeMegaCategory === link.label.toLowerCase() && (
                    <div
                      onMouseLeave={() => handleCategoryHover(null)}
                      className="absolute top-full left-0 pt-2 animate-in fade-in slide-in-from-top-2 duration-200"
                    >
                      <MegaNavigation
                        activeCategory={activeMegaCategory}
                        onCategoryHover={handleCategoryHover}
                        onClose={() => setActiveMegaCategory(null)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Center Search Trigger */}
          <div className="hidden md:flex flex-1 max-w-sm mx-4">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-muted/60 hover:bg-muted border border-border/60 text-muted-foreground text-xs transition-all shadow-xs group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="group-hover:text-foreground transition-colors">
                  Search laptops, GPUs, monitors...
                </span>
              </div>
              <kbd className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold bg-background border border-border px-1.5 py-0.5 rounded-md text-muted-foreground">
                <span>⌘K</span>
              </kbd>
            </button>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="flex md:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors relative cursor-pointer"
              aria-label="Toggle light/dark theme"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </button>

            <button
              onClick={openWishlist}
              className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors relative cursor-pointer"
              aria-label="Open wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={openCart}
              className="flex items-center gap-2.5 p-2 rounded-xl bg-primary/10 hover:bg-primary/15 border border-primary/20 text-foreground transition-all group cursor-pointer"
              aria-label="Open shopping cart"
            >
              <div className="relative p-1">
                <ShoppingBag className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-primary text-primary-foreground text-[10px] font-black flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left pr-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase leading-none">
                  Cart
                </span>
                <span className="text-xs font-extrabold text-foreground leading-none mt-0.5">
                  ₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 0 })}
                </span>
              </div>
            </button>

            {/* Authenticated User Menu or Login Link */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2.5 rounded-xl bg-card border border-border/80 text-foreground hover:border-primary transition-all cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center uppercase">
                    {(user?.fullName || user?.name || 'U').charAt(0)}
                  </div>
                  <span className="hidden sm:inline-block text-xs font-bold truncate max-w-[100px]">
                    {(user?.fullName || user?.name || 'User').split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                </button>

                {isUserMenuOpen && (
                  <div
                    onMouseLeave={() => setIsUserMenuOpen(false)}
                    className="absolute right-0 top-full mt-2 w-52 bg-card border border-border shadow-2xl rounded-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
                  >
                    <div className="px-3 py-2 border-b border-border/60 mb-1">
                      <p className="text-xs font-bold text-foreground truncate">{user?.fullName || user?.name}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
                    </div>

                    <a
                      href="/profile"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>My Account</span>
                    </a>

                    <a
                      href="/track-order"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <span>Track Orders</span>
                    </a>

                    {user?.role === 'admin' || user?.roles?.includes('ADMIN') || user?.roles?.includes('SUPER_ADMIN') ? (
                      <a
                        href="/admin/dashboard"
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        <span>Admin Dashboard</span>
                      </a>
                    ) : null}

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors mt-1 border-t border-border/40"
                    >
                      <LogOut className="w-4 h-4 text-destructive" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a href="/login" className="hidden sm:block">
                <Button variant="default" size="sm" className="rounded-xl font-bold text-xs px-4">
                  Sign In
                </Button>
              </a>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted lg:hidden"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
