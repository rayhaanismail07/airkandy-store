import React from 'react';
import {
  ShieldCheck,
  Truck,
  RefreshCw,
  Headphones,
  MessageCircle,
  Mail,
  MapPin,
  Share2,
  Globe,
  AtSign,
  ArrowRight,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, params?: { category?: string; slug?: string }) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const usps = [
    {
      icon: <Truck className="w-7 h-7" />,
      title: 'Free Nationwide Shipping',
      sub: 'On all orders over R850',
    },
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      title: 'HPLC Lab Tested',
      sub: '100% pure, 0 PPM residuals',
    },
    {
      icon: <RefreshCw className="w-7 h-7" />,
      title: 'Hassle-Free Returns',
      sub: '7-day return policy',
    },
    {
      icon: <Headphones className="w-7 h-7" />,
      title: 'WhatsApp Concierge',
      sub: '24/7 product support',
    },
  ];

  const shopLinks = [
    { label: 'Infused Edibles',          action: () => onNavigate('shop', { category: 'edibles' }) },
    { label: 'Craft Herbs & Flower',     action: () => onNavigate('shop', { category: 'herbs' }) },
    { label: 'Solventless Concentrates', action: () => onNavigate('shop', { category: 'extraction' }) },
    { label: 'Glass & Smoking Gear',     action: () => onNavigate('shop', { category: 'smoking-gear' }) },
    { label: 'Grow Tech & Nutrients',    action: () => onNavigate('shop', { category: 'grow-tech' }) },
  ];

  const infoLinks = [
    { label: 'About AirKandy',  action: () => onNavigate('about') },
    { label: 'Grow Guide',      action: () => onNavigate('grow-guide') },
    { label: 'Contact Us',      action: () => onNavigate('contact') },
    { label: 'Shipping Policy', action: () => {} },
    { label: 'Privacy Policy',  action: () => {} },
    { label: 'Terms of Service',action: () => {} },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">

      {/* ── USP STRIP ────────────────────────────────────── */}
      <div className="border-b border-gray-100 bg-ak-warm">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-gray-200">
            {usps.map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-6 px-4 lg:px-6">
                <div className="flex-shrink-0 text-ak-teal">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-wd-gray900">{item.title}</p>
                  <p className="text-xs text-wd-gray600 mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── NEWSLETTER STRIP ─────────────────────────────── */}
      <div className="bg-ak-teal text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-ak-gold mb-1">
              Join the Confectionery Circle
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Unlock Private Drops & Member Deals
            </h3>
            <p className="text-sm text-white/70 mt-1">
              Get early access to new Lifted Snacks flavours, rosin batches & seasonal specials.
            </p>
          </div>
          <div className="flex w-full lg:w-auto items-stretch gap-0">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 lg:w-72 px-4 py-3 text-sm text-wd-gray900 bg-white placeholder-wd-gray400 focus:outline-none"
              style={{ borderRadius: '2px 0 0 2px' }}
            />
            <button
              className="px-5 bg-ak-gold text-wd-gray900 font-bold text-sm uppercase tracking-wide hover:bg-ak-gold-dark transition-colors flex items-center gap-2 flex-shrink-0"
              style={{ borderRadius: '0 2px 2px 0' }}
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER GRID ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1: Brand */}
          <div className="lg:col-span-1 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-ak-teal flex items-center justify-center text-white font-bold text-sm">
                AK
              </div>
              <span className="text-lg font-bold text-wd-gray900">
                Air<span className="text-ak-teal">Kandy</span>
              </span>
            </button>

            <p className="text-sm text-wd-gray600 leading-relaxed">
              South Africa's premier adult confectionery and smoke boutique. Gourmet Lifted Snacks,
              craft flower, solventless concentrates, and grow systems — all lab-tested, all delivered discreetly.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {[
                { icon: <Share2 className="w-4 h-4" />, href: '#' },
                { icon: <Globe className="w-4 h-4" />, href: '#' },
                { icon: <AtSign className="w-4 h-4" />, href: '#' },
                { icon: <MessageCircle className="w-4 h-4" />, href: '#' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-8 h-8 bg-ak-warm border border-gray-200 flex items-center justify-center text-wd-gray600 hover:bg-ak-teal hover:text-white hover:border-ak-teal transition-all"
                  style={{ borderRadius: 2 }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Shop */}
          <div>
            <h4 className="text-sm font-bold text-wd-gray900 uppercase tracking-wider mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="text-sm text-wd-gray600 hover:text-ak-teal transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Information */}
          <div>
            <h4 className="text-sm font-bold text-wd-gray900 uppercase tracking-wider mb-5">
              Information
            </h4>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="text-sm text-wd-gray600 hover:text-ak-teal transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-sm font-bold text-wd-gray900 uppercase tracking-wider mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-wd-gray600">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-ak-teal mt-0.5 flex-shrink-0" />
                <span>South Africa — Nationwide Delivery<br />Gauteng · Western Cape · KZN & more</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-ak-teal flex-shrink-0" />
                <a href="https://wa.me/27000000000" className="hover:text-ak-teal transition-colors">
                  WhatsApp Concierge
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-ak-teal flex-shrink-0" />
                <a href="mailto:hello@airkandy.co.za" className="hover:text-ak-teal transition-colors">
                  hello@airkandy.co.za
                </a>
              </li>
            </ul>

            {/* 18+ Badge */}
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-2 bg-ak-warm border border-gray-200 text-xs font-bold text-wd-gray700" style={{ borderRadius: 2 }}>
              🔞 Adults 18+ only · South Africa
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ───────────────────────────────────── */}
      <div className="border-t border-gray-100 bg-ak-warm">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-wd-gray500">
          <p>© {new Date().getFullYear()} AirKandy. All rights reserved.</p>
          <p>Designed for adults 18+. Please consume responsibly.</p>
        </div>
      </div>
    </footer>
  );
};
