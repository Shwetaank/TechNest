import React, { createContext, useContext, useState, useEffect } from 'react';
import type { WishlistItem } from '@/types';

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  isOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: () => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const DUMMY_INITIAL_WISHLIST: WishlistItem[] = [
  {
    id: 'wish-1',
    productId: 'quantum-oled-49',
    name: 'TechNest Horizon 49" QD-OLED 240Hz Display',
    price: 1299,
    originalPrice: 1499,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop',
    inStock: true,
  },
  {
    id: 'wish-2',
    productId: 'studio-pro-wireless',
    name: 'TechNest Studio Master Wireless Headset',
    price: 349,
    originalPrice: 399,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    inStock: true,
  },
];

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('technest_wishlist');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return DUMMY_INITIAL_WISHLIST;
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('technest_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const openWishlist = () => setIsOpen(true);
  const closeWishlist = () => setIsOpen(false);
  const toggleWishlist = () => setIsOpen((prev) => !prev);

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems((prev) => {
      if (prev.some((i) => i.productId === item.productId)) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.productId === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        isOpen,
        openWishlist,
        closeWishlist,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        itemCount: wishlistItems.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
