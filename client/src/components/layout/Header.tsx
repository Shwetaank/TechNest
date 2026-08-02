import { useState, useEffect } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { useCart } from '@/store/cartStore';
import { useWishlist } from '@/store/wishlistStore';
import { NAV_LINKS, MEGA_CATEGORIES } from '@/constants/navigation';
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
  Sparkles,
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

  const [activeMegaCategory, setActiveMegaCategory] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <div className="flex items-center gap-8">
            <a
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-indigo-600 to-accent text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-foreground flex items-center gap-1 font-heading">
                  Tech<span className="gradient-text">Nest</span>
                </span>
                <span className="text-[9px] font-bold text-muted-foreground tracking-widest uppercase -mt-1">
                  Enterprise Store
                </span>
              </div>
            </a>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                if (link.isMega) {
                  return (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => setActiveMegaCategory(MEGA_CATEGORIES[0].id)}
                    >
                      <button
                        onClick={() =>
                          setActiveMegaCategory((prev) =>
                            prev ? null : MEGA_CATEGORIES[0].id
                          )
                        }
                        className={cn(
                          'flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors',
                          activeMegaCategory
                            ? 'text-primary bg-primary/10'
                            : 'text-foreground/80 hover:text-foreground hover:bg-muted/60'
                        )}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={cn(
                            'w-4 h-4 transition-transform duration-200',
                            activeMegaCategory && 'rotate-180 text-primary'
                          )}
                        />
                      </button>
                    </div>
                  );
                }

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onMouseEnter={() => setActiveMegaCategory(null)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-muted/60 transition-colors"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[10px] font-extrabold bg-primary/15 text-primary px-2 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="hidden md:flex flex-1 max-w-sm mx-4">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-muted/60 hover:bg-muted border border-border/60 text-muted-foreground text-xs transition-all shadow-xs group"
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

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="flex md:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors relative"
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
              className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors relative"
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
              className="flex items-center gap-2.5 p-2 rounded-xl bg-primary/10 hover:bg-primary/15 border border-primary/20 text-foreground transition-all group"
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
                  ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                </span>
              </div>
            </button>

            <a href="/profile" className="hidden sm:block">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <User className="w-5 h-5 text-muted-foreground" />
              </Button>
            </a>

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

      <MegaNavigation
        activeCategory={activeMegaCategory}
        onCategoryHover={handleCategoryHover}
        onClose={() => setActiveMegaCategory(null)}
      />

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border p-4 space-y-4 shadow-xl">
          <div className="space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-muted font-bold text-sm text-foreground"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-md">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-border space-y-2">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-3">
              Hardware Categories
            </div>
            <div className="grid grid-cols-2 gap-2">
              {MEGA_CATEGORIES.map((cat) => (
                <a
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-muted/50 text-xs font-semibold text-foreground flex items-center justify-between"
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-muted-foreground">({cat.itemCount})</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
