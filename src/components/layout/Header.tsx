import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';
import { useFilterStore } from '../../store/useFilterStore';
import { CATEGORIES } from '../../data/categories';
import { PRODUCTS } from '../../data/products';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ChevronDown,
  Phone,
  MessageCircle,
  MapPin,
  Heart,
  User,
} from 'lucide-react';
import { clsx } from 'clsx';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, params?: { category?: string; slug?: string }) => void;
}

const categoryColors: Record<string, string> = {
  edibles:      'bg-pink-50   text-pink-700   border-pink-200',
  herbs:        'bg-emerald-50 text-emerald-700 border-emerald-200',
  extraction:   'bg-amber-50   text-amber-700   border-amber-200',
  'smoking-gear':'bg-blue-50    text-blue-700    border-blue-200',
  'grow-tech':  'bg-lime-50    text-lime-700    border-lime-200',
};

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen]   = useState(false);
  const [isSearchOpen, setIsSearchOpen]       = useState(false);
  const [searchQuery, setSearchQuery]         = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled]           = useState(false);

  const totalItems        = useCartStore((s) => s.getTotalItems());
  const toggleCart        = useCartStore((s) => s.toggleCart);
  const setSelectedCategory = useFilterStore((s) => s.setSelectedCategory);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()),
      ).slice(0, 5)
    : [];

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current)
      setTimeout(() => searchInputRef.current?.focus(), 50);
  }, [isSearchOpen]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const openMega  = () => { if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current); setIsMegaMenuOpen(true); };
  const closeMega = () => { megaTimeoutRef.current = setTimeout(() => setIsMegaMenuOpen(false), 150); };

  const navTo = (page: string, params?: { category?: string; slug?: string }) => {
    if (params?.category) setSelectedCategory(params.category);
    onNavigate(page, params);
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const navLinks = [
    { label: 'Home',       page: 'home'   },
    { label: 'Shop',       page: 'shop',  hasMega: true },
    { label: 'About Us',   page: 'about'  },
    { label: 'Grow Guide', page: 'grow-guide' },
    { label: 'Contact',    page: 'contact' },
  ];

  return (
    <>
      {/* ── TOP BAR ─────────────────────────────────────────── */}
      <div className="bg-ak-teal text-white text-xs hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-9">
          <div className="flex items-center gap-5">
            <a href="tel:+27000000000" className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
              <Phone className="w-3 h-3" />
              <span>+27 (0) 00 000 0000</span>
            </a>
            <span className="text-white/30">|</span>
            <a href="https://wa.me/27000000000" className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-white/80">🎉 Free delivery on orders over R850</span>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-1.5 text-white/80">
              <MapPin className="w-3 h-3" />
              South Africa Nationwide
            </span>
          </div>
        </div>
      </div>

      {/* ── MAIN HEADER (logo + utilities) ───────────────────── */}
      <header
        className={clsx(
          'sticky top-0 z-[390] bg-white transition-shadow duration-300',
          isScrolled ? 'shadow-wd-header' : 'border-b border-gray-100',
        )}
      >
        {/* Logo row */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-[72px] gap-4">

            {/* Left: mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-1 text-wd-gray700 hover:text-ak-teal transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Center/Left: Logo */}
            <button
              onClick={() => navTo('home')}
              className="flex items-center gap-3 cursor-pointer select-none flex-shrink-0"
              aria-label="AirKandy home"
            >
              {/* Text logo mark */}
              <div className="flex items-center gap-2">
                <div
                  className="w-9 h-9 rounded-lg bg-ak-teal flex items-center justify-center text-white font-bold text-base shadow-ak-teal"
                >
                  AK
                </div>
                <div className="hidden sm:block">
                  <span className="block text-xl font-bold text-wd-gray900 leading-tight tracking-tight">
                    Air<span className="text-ak-teal">Kandy</span>
                  </span>
                  <span className="block text-[10px] font-medium text-wd-gray500 tracking-wide uppercase -mt-0.5">
                    For Your Smoking Pleasure
                  </span>
                </div>
              </div>
            </button>

            {/* Right: utility icons */}
            <div className="flex items-center gap-1">

              {/* Search toggle */}
              <button
                onClick={() => { setIsSearchOpen((v) => !v); setSearchQuery(''); }}
                className="p-2.5 text-wd-gray700 hover:text-ak-teal transition-colors"
                aria-label="Search"
              >
                {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>

              {/* Wishlist (decorative) */}
              <button className="hidden sm:flex p-2.5 text-wd-gray700 hover:text-ak-teal transition-colors" aria-label="Wishlist">
                <Heart className="w-5 h-5" />
              </button>

              {/* Account (decorative) */}
              <button className="hidden md:flex p-2.5 text-wd-gray700 hover:text-ak-teal transition-colors" aria-label="Account">
                <User className="w-5 h-5" />
              </button>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative flex items-center gap-2 pl-3 pr-4 h-10 bg-ak-teal text-white hover:bg-ak-teal-dark transition-colors ml-1"
                style={{ borderRadius: 2 }}
                aria-label="Open cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-semibold">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-ak-gold text-wd-gray900 text-[10px] font-bold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── SEARCH PANEL ────────────────────────────────── */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden border-t border-gray-100 bg-white"
            >
              <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-wd-gray400 pointer-events-none" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search products, brands, categories…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-ak-teal transition-colors"
                    style={{ borderRadius: 2 }}
                  />
                </div>
                {searchResults.length > 0 && (
                  <div className="max-w-2xl mx-auto mt-2 border border-gray-200 bg-white shadow-wd-dropdown" style={{ borderRadius: 2 }}>
                    {searchResults.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => { navTo('product', { slug: p.slug }); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-ak-warm transition-colors border-b border-gray-100 last:border-0"
                      >
                        <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-contain flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-wd-gray900 line-clamp-1">{p.name}</p>
                          <p className="text-xs text-wd-gray600">{p.brand} · R{p.price}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── NAV BAR ─────────────────────────────────────── */}
        <div className="hidden lg:block border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="flex items-center h-11 gap-0">
              {navLinks.map((link) =>
                link.hasMega ? (
                  <div
                    key={link.label}
                    className="relative h-full flex items-center"
                    onMouseEnter={openMega}
                    onMouseLeave={closeMega}
                  >
                    <button
                      onClick={() => navTo('shop')}
                      className={clsx(
                        'flex items-center gap-1 h-full px-5 text-xs font-semibold uppercase tracking-wider transition-colors',
                        currentPage === 'shop' ? 'text-ak-teal border-b-2 border-ak-teal' : 'text-wd-gray800 hover:text-ak-teal',
                      )}
                    >
                      {link.label}
                      <ChevronDown className={clsx('w-3.5 h-3.5 transition-transform duration-200', isMegaMenuOpen && 'rotate-180')} />
                    </button>

                    {/* ── MEGA MENU ─────────────────────────── */}
                    <AnimatePresence>
                      {isMegaMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 12 }}
                          transition={{ duration: 0.22, ease: 'easeOut' }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[720px] bg-white shadow-wd-dropdown border border-gray-100 z-50 p-6"
                          style={{ borderRadius: 2 }}
                          onMouseEnter={openMega}
                          onMouseLeave={closeMega}
                        >
                          <div className="grid grid-cols-5 gap-4">
                            {CATEGORIES.map((cat) => (
                              <button
                                key={cat.id}
                                onClick={() => navTo('shop', { category: cat.slug })}
                                className="group flex flex-col items-center gap-3 p-3 hover:bg-ak-warm transition-colors text-center"
                                style={{ borderRadius: 2 }}
                              >
                                <div
                                  className={clsx(
                                    'w-16 h-16 overflow-hidden flex items-center justify-center border',
                                    categoryColors[cat.slug] ?? 'bg-gray-50 text-gray-700 border-gray-200',
                                  )}
                                  style={{ borderRadius: 2 }}
                                >
                                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-wd-gray900 group-hover:text-ak-teal transition-colors line-clamp-2 leading-snug">
                                    {cat.name}
                                  </p>
                                  <p className="text-[10px] text-wd-gray500 mt-0.5">{cat.itemCount} items</p>
                                </div>
                              </button>
                            ))}
                          </div>

                          {/* Bottom CTA */}
                          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-xs text-wd-gray500">Browse our full collection</span>
                            <button
                              onClick={() => navTo('shop')}
                              className="btn-primary text-xs px-5 py-2"
                            >
                              View All Products
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => navTo(link.page)}
                    className={clsx(
                      'h-full px-5 text-xs font-semibold uppercase tracking-wider transition-colors',
                      currentPage === link.page
                        ? 'text-ak-teal border-b-2 border-ak-teal'
                        : 'text-wd-gray800 hover:text-ak-teal',
                    )}
                  >
                    {link.label}
                  </button>
                ),
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* ── MOBILE OFF-CANVAS MENU ───────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-[480] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-[490] lg:hidden overflow-y-auto shadow-2xl"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between px-5 h-[72px] border-b border-gray-100">
                <span className="text-lg font-bold text-wd-gray900">
                  Air<span className="text-ak-teal">Kandy</span>
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-wd-gray600 hover:text-ak-teal"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <nav className="py-4">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => navTo(link.page)}
                    className={clsx(
                      'w-full text-left px-5 py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors border-b border-gray-50',
                      currentPage === link.page
                        ? 'text-ak-teal bg-ak-warm'
                        : 'text-wd-gray800 hover:text-ak-teal hover:bg-ak-warm',
                    )}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              {/* Mobile Category Links */}
              <div className="px-5 pt-2 pb-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-wd-gray400 mb-3">Shop by Category</p>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => navTo('shop', { category: cat.slug })}
                      className="w-full text-left px-3 py-2.5 text-sm text-wd-gray700 hover:text-ak-teal hover:bg-ak-warm transition-colors flex items-center justify-between"
                      style={{ borderRadius: 2 }}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-wd-gray400">{cat.itemCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Contact Info */}
              <div className="border-t border-gray-100 px-5 py-4 bg-ak-warm">
                <div className="space-y-2 text-xs text-wd-gray600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-ak-teal" />
                    <span>+27 (0) 00 000 0000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-3.5 h-3.5 text-ak-teal" />
                    <span>WhatsApp Concierge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-ak-teal" />
                    <span>South Africa Nationwide</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
