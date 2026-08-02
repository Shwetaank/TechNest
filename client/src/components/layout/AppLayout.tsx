import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnnouncementBar } from './AnnouncementBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { SearchModal } from './SearchModal';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WishlistDrawer } from './WishlistDrawer';
import { BackToTop } from './BackToTop';
import { FloatingSupportButton } from './FloatingSupportButton';
import { Breadcrumbs } from './Breadcrumbs';
import type { BreadcrumbItem } from './Breadcrumbs';

interface AppLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <AnnouncementBar />

      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} />
      )}

      <main className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <CartDrawer />
      <WishlistDrawer />
      <BackToTop />
      <FloatingSupportButton />
    </div>
  );
}
