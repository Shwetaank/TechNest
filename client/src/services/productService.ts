import { api } from './api';
import { FEATURED_PRODUCTS } from '@/constants/products';
import type { Product } from '@/types';

export async function fetchProducts(params?: {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
}): Promise<Product[]> {
  try {
    const res: any = await api.get('/products', { params });
    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      return res.data.map((p: any) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        originalPrice: p.originalPrice,
        emiStartingAt: p.emiStartingAt,
        rating: p.rating || 5.0,
        reviewCount: p.reviewCount || 10,
        brand: p.brand?.name || 'TechNest',
        category: p.category?.name || 'Laptops',
        categorySlug: p.category?.slug || 'laptops',
        image: p.images?.[0]?.url || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
        specs: ['Factory Sealed', '18% GST Credit', 'BlueDart Express Air'],
        inStock: true,
        stockCount: 25,
      }));
    }
  } catch (err) {
    console.warn('⚠️ Server offline or empty, falling back to cached catalog:', err);
  }
  return FEATURED_PRODUCTS;
}

export async function fetchProductById(id: string): Promise<Product | undefined> {
  try {
    const res: any = await api.get(`/products/${id}`);
    if (res.success && res.data) {
      const p = res.data;
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        originalPrice: p.originalPrice,
        emiStartingAt: p.emiStartingAt,
        rating: p.rating || 5.0,
        reviewCount: p.reviewCount || 10,
        brand: p.brand?.name || 'TechNest',
        category: p.category?.name || 'Laptops',
        categorySlug: p.category?.slug || 'laptops',
        image: p.images?.[0]?.url || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
        specs: ['Factory Sealed', '18% GST Credit', 'BlueDart Express Air'],
        inStock: true,
        stockCount: 25,
      };
    }
  } catch (err) {
    console.warn('⚠️ Server offline or product not found on server:', err);
  }
  return FEATURED_PRODUCTS.find((p) => p.id === id) || FEATURED_PRODUCTS[0];
}
