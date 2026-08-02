import { ThemeProvider } from '@/providers/ThemeProvider';
import { CartProvider } from '@/store/cartStore';
import { WishlistProvider } from '@/store/wishlistStore';
import { AppRoutes } from '@/routes';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <CartProvider>
        <WishlistProvider>
          <AppRoutes />
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
