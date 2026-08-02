import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { LandingPage } from '@/components/home/LandingPage';
import { ProductsPage } from '@/pages/ProductsPage';
import { ProductDetailsPage } from '@/pages/ProductDetailsPage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { OrderSuccessPage } from '@/pages/OrderSuccessPage';
import { TrackOrderPage } from '@/pages/TrackOrderPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { AboutPage } from '@/pages/AboutPage';
import { AdminDashboardPage } from '@/pages/AdminDashboardPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/categories" element={<ProductsPage />} />
          <Route path="/categories/:categorySlug" element={<ProductsPage />} />
          <Route path="/categories/:categorySlug/:subcategorySlug" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/addresses" element={<ProfilePage />} />
          <Route path="/security" element={<ProfilePage />} />
          <Route path="/settings" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/products" element={<AdminDashboardPage />} />
          <Route path="/admin/orders" element={<AdminDashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
