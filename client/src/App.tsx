import { ThemeProvider } from '@/providers/ThemeProvider';
import { AuthProvider } from '@/store/authStore';
import { CartProvider } from '@/store/cartStore';
import { WishlistProvider } from '@/store/wishlistStore';
import { AppRoutes } from '@/routes';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppRoutes />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
