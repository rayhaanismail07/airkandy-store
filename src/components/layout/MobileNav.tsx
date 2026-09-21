import React from 'react';
import { Home, ShoppingBag, Grid3x3, Info, Phone } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { clsx } from 'clsx';

interface MobileNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentPage, onNavigate }) => {
  const totalItems = useCartStore((s) => s.getTotalItems());
  const toggleCart = useCartStore((s) => s.toggleCart);

  const items = [
    { icon: <Home className="w-5 h-5" />,        label: 'Home',    page: 'home'    },
    { icon: <Grid3x3 className="w-5 h-5" />,     label: 'Shop',    page: 'shop'    },
    { icon: <Info className="w-5 h-5" />,         label: 'About',   page: 'about'   },
    { icon: <Phone className="w-5 h-5" />,        label: 'Contact', page: 'contact' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[380] lg:hidden bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
      <div className="flex items-stretch">
        {items.map((item) => (
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className={clsx(
              'flex-1 flex flex-col items-center justify-center py-3 gap-1 text-[10px] font-semibold uppercase tracking-wide transition-colors',
              currentPage === item.page
                ? 'text-ak-teal bg-ak-warm'
                : 'text-wd-gray500 hover:text-ak-teal',
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}

        {/* Cart */}
        <button
          onClick={toggleCart}
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1 text-[10px] font-semibold uppercase tracking-wide transition-colors text-white bg-ak-teal relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-ak-gold text-wd-gray900 text-[9px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>
      </div>
    </div>
  );
};
