import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Truck,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface CartDrawerProps {
  onNavigateToCheckout: () => void;
  onNavigateToShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onNavigateToCheckout,
  onNavigateToShop,
}) => {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getSubtotal,
    getShippingCost,
    getFreeShippingProgress,
    freeShippingThreshold,
  } = useCartStore();

  const subtotal     = getSubtotal();
  const shippingCost = getShippingCost();
  const freeProgress = getFreeShippingProgress();

  const handleCheckout = () => { closeCart(); onNavigateToCheckout(); };
  const handleContinue  = () => { closeCart(); onNavigateToShop(); };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[500] overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/40 cursor-pointer"
          />

          {/* Drawer */}
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="w-screen max-w-[420px] bg-white flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-ak-teal" />
                  <div>
                    <h2 className="text-base font-bold text-wd-gray900">Shopping Cart</h2>
                    <span className="text-xs text-wd-gray500">{items.length} item{items.length !== 1 && 's'}</span>
                  </div>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 text-wd-gray500 hover:text-wd-gray900 hover:bg-gray-100 transition-colors"
                  style={{ borderRadius: 2 }}
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress */}
              <div className="px-6 py-3 bg-ak-warm border-b border-gray-100">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-1.5 font-medium text-wd-gray700">
                    <Truck className="w-3.5 h-3.5 text-ak-teal" />
                    {freeProgress.qualified ? (
                      <span className="text-green-600 font-semibold">🎉 Free delivery unlocked!</span>
                    ) : (
                      <span>Add <strong className="text-wd-gray900">R{freeProgress.remaining}</strong> for free delivery</span>
                    )}
                  </span>
                  <span className="text-wd-gray400">{freeProgress.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 overflow-hidden" style={{ borderRadius: 2 }}>
                  <div
                    className="h-full bg-ak-teal transition-all duration-500"
                    style={{ width: `${freeProgress.percentage}%` }}
                  />
                </div>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <ShoppingBag className="w-12 h-12 text-gray-200 mx-auto" />
                    <div>
                      <h3 className="text-base font-bold text-wd-gray900 mb-1">Your cart is empty</h3>
                      <p className="text-sm text-wd-gray500">
                        Browse our collection of Lifted Snacks, craft flower and more.
                      </p>
                    </div>
                    <button
                      onClick={handleContinue}
                      className="btn-primary"
                    >
                      Explore Shop
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedVariant.id}`}
                      className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <div className="w-16 h-16 flex-shrink-0 bg-ak-warm border border-gray-100 overflow-hidden" style={{ borderRadius: 2 }}>
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-wd-gray900 truncate">{item.product.name}</h4>
                        <p className="text-xs text-wd-gray500 mt-0.5">{item.selectedVariant.label}</p>

                        {/* Qty stepper */}
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-gray-200" style={{ borderRadius: 2 }}>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.selectedVariant.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-wd-gray600 hover:text-ak-teal hover:bg-ak-warm transition-colors"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-sm font-semibold text-wd-gray900 min-w-[24px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.selectedVariant.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-wd-gray600 hover:text-ak-teal hover:bg-ak-warm transition-colors"
                              aria-label="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id, item.selectedVariant.id)}
                            className="text-wd-gray400 hover:text-red-500 transition-colors"
                            aria-label="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-sm font-bold text-wd-gray900 flex-shrink-0">
                        R{item.selectedVariant.price * item.quantity}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-gray-100 p-6 space-y-4 bg-white">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-wd-gray600">
                      <span>Subtotal</span>
                      <span className="font-semibold text-wd-gray900">R{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-wd-gray600">
                      <span>Shipping</span>
                      <span className="font-semibold text-wd-gray900">
                        {shippingCost === 0
                          ? <span className="text-green-600">FREE</span>
                          : `R${shippingCost}`}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-base text-wd-gray900 pt-2 border-t border-gray-100">
                      <span>Total</span>
                      <span className="text-ak-teal">R{subtotal + shippingCost}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="btn-primary w-full justify-center text-base gap-2"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleContinue}
                    className="w-full text-center text-sm text-wd-gray500 hover:text-ak-teal transition-colors underline"
                  >
                    Continue Shopping
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-wd-gray400">
                    <ShieldCheck className="w-3.5 h-3.5 text-ak-teal" />
                    <span>Stealth packaging · Secure checkout</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
