import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { CartDrawer } from './components/layout/CartDrawer';
import { AgeGate } from './components/layout/AgeGate';
import { QuickViewModal } from './components/ui/QuickViewModal';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { GrowGuidePage } from './pages/GrowGuidePage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { useCartStore } from './store/useCartStore';
import { useFilterStore } from './store/useFilterStore';
import { Product } from './types';
import { ShoppingBag } from 'lucide-react';

export function App() {
  const [currentPage, setCurrentPage] = useState<
    'home' | 'shop' | 'product' | 'checkout' | 'grow-guide' | 'contact' | 'about'
  >('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>('heart-stopper-gummies-sugar-free');

  const { toastMessage } = useCartStore();
  const { setSelectedCategory } = useFilterStore();

  const handleNavigate = (page: string, params?: { category?: string; slug?: string }) => {
    if (params?.category) {
      setSelectedCategory(params.category);
    }
    if (params?.slug) {
      setSelectedProductSlug(params.slug);
    }
    setCurrentPage(page as typeof currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProductSlug(product.slug);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-ak-dark selection:bg-ak-teal selection:text-white font-sans relative">
      {/* 18+ Age Verification Modal */}
      <AgeGate />

      {/* Global Slide-Over Cart Drawer */}
      <CartDrawer
        onNavigateToCheckout={() => handleNavigate('checkout')}
        onNavigateToShop={() => handleNavigate('shop')}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        onNavigateToProduct={(slug) => handleNavigate('product', { slug })}
      />

      {/* Sticky Header with Mega Menu */}
      <Header
        currentPage={currentPage}
        onNavigate={(page, params) => handleNavigate(page, params)}
      />

      {/* Main Content Stage with Smooth Fade Transition */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + (currentPage === 'product' ? selectedProductSlug : '')}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {currentPage === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onSelectProduct={handleSelectProduct}
              />
            )}

            {currentPage === 'shop' && (
              <ShopPage onSelectProduct={handleSelectProduct} />
            )}

            {currentPage === 'product' && (
              <ProductDetailPage
                slug={selectedProductSlug}
                onNavigate={handleNavigate}
                onSelectProduct={handleSelectProduct}
              />
            )}

            {currentPage === 'checkout' && (
              <CheckoutPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'grow-guide' && (
              <GrowGuidePage
                onNavigateToShop={(cat) => handleNavigate('shop', { category: cat })}
              />
            )}

            {currentPage === 'about' && (
              <AboutPage onNavigateToShop={() => handleNavigate('shop')} />
            )}

            {currentPage === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Cart Addition Floating Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 md:bottom-8 right-6 z-50 p-4 bg-white border border-gray-200 shadow-wd-hover flex items-center gap-3 text-sm font-semibold text-ak-dark"
            style={{ borderRadius: 4 }}
          >
            <div className="p-2 bg-ak-teal text-white" style={{ borderRadius: 2 }}>
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Bottom Dock Navigation */}
      <MobileNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
