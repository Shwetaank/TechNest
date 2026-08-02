export type Theme = 'dark' | 'light' | 'system';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  brand: string;
  price: number; // In INR (₹)
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  secondaryImage?: string;
  specs: string[];
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  discountPercentage?: number;
  description: string;
  emiStartingAt?: number; // Starting EMI in ₹/month
  warrantyYears?: number;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  itemCount: number;
  image?: string;
  featuredProduct?: {
    id: string;
    title: string;
    image: string;
    price: number;
    tag: string;
  };
  subcategories: {
    name: string;
    slug: string;
    badge?: string;
  }[];
}

export interface NavigationLink {
  label: string;
  href: string;
  badge?: string;
  isMega?: boolean;
}

export interface AnnouncementItem {
  id: string;
  text: string;
  code?: string;
  linkText?: string;
  linkUrl?: string;
  badge?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  variant?: {
    color?: string;
    storage?: string;
    ram?: string;
  };
  inStock: boolean;
}

export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  inStock: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'customer' | 'admin';
  gstin?: string;
  companyName?: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
  type: 'Home' | 'Work' | 'Office';
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  gstAmount: number; // 18% GST in India
  shippingFee: number;
  discountAmount: number;
  total: number;
  status: 'Processing' | 'Dispatched' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  paymentMethod: 'UPI' | 'Credit Card / Debit Card' | 'No-Cost EMI' | 'Net Banking' | 'Cash on Delivery';
  trackingNumber: string;
  courierPartner: 'BlueDart Express' | 'Delhivery Air' | 'DTDC Premium';
  deliveryAddress: Address;
  gstin?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  city: string;
  avatar: string;
  content: string;
  rating: number;
  verified: boolean;
  productBought: string;
}
