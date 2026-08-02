import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem } from '@/types';

interface CartContextType {
  cartItems: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  subtotal: number;
  gstAmount: number;
  shipping: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'cart-1',
    productId: 'titan-pro-m4',
    name: 'TechNest Titan Pro M4 Max Studio Laptop',
    price: 249990,
    originalPrice: 279990,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
    quantity: 1,
    variant: { ram: '64GB', storage: '2TB SSD' },
    inStock: true,
  },
  {
    id: 'cart-2',
    productId: 'cyberblade-8k',
    name: 'CyberBlade Pro 8K Rapid Trigger Keyboard',
    price: 17990,
    originalPrice: 19990,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=800&auto=format&fit=crop',
    quantity: 1,
    variant: { color: 'Matte Obsidian' },
    inStock: true,
  },
];

/**
 * Manages shopping bag items, quantity updates, local storage sync,
 * 18% GST calculation, and express shipping threshold evaluation.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('technest_cart');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return INITIAL_CART_ITEMS;
  });

  const [isOpen, setIsOpen] = useState(false);

  // Sync cart state to browser local storage
  useEffect(() => {
    localStorage.setItem('technest_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  // Add new item or increment existing item quantity in bag
  const addToCart = (item: Omit<CartItem, 'quantity'>, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }
      return [
        ...prev,
        {
          ...item,
          quantity: qty,
          id: item.id || `cart-${Date.now()}`,
        },
      ];
    });
    openCart();
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  // Financial calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // Calculate 18% GST component for B2B invoice preview
  const gstAmount = Math.round(subtotal * 0.18);
  // Free Express Air shipping on orders above ₹1,999
  const shipping = subtotal > 1999 || subtotal === 0 ? 0 : 250;
  const total = subtotal + shipping;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        gstAmount,
        shipping,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
