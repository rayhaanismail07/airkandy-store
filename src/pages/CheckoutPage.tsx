import React, { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  Lock,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Building,
  Tag,
  AlertCircle,
} from 'lucide-react';
import { clsx } from 'clsx';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { items, getSubtotal, getShippingCost, getFinalTotal, clearCart } = useCartStore();

  const subtotal = getSubtotal();
  const shipping = getShippingCost();
  const initialTotal = getFinalTotal();

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    suburb: '',
    city: 'Johannesburg',
    province: 'Gauteng',
    postalCode: '',
    deliveryNotes: '',
    ageConsent: true,
  });

  const [paymentMethod, setPaymentMethod] = useState<'ozow' | 'payfast' | 'eft'>('ozow');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalPayableTotal = Math.max(0, initialTotal - discountAmount);

  const provinces = [
    'Gauteng',
    'Western Cape',
    'KwaZulu-Natal',
    'Eastern Cape',
    'Free State',
    'Mpumalanga',
    'Limpopo',
    'North West',
    'Northern Cape',
  ];

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (couponCode.toUpperCase() === 'SWEET10' || couponCode.toUpperCase() === 'LIFTED10') {
      setDiscountPercent(10);
    } else if (couponCode.toUpperCase() === 'AIRKANDY20') {
      setDiscountPercent(20);
    } else {
      setCouponError('Invalid coupon code. Try SWEET10 for 10% off.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedOrderId = `AK-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedOrderId);
      setOrderComplete(true);
      clearCart();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#00E5FF', '#0066FF', '#FF3B94', '#22C55E'],
      });
    }, 1500);
  };

  if (orderComplete) {
    return (
      <div className="py-16 max-w-2xl mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-glow-lime">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <Badge variant="cyan" size="lg" glow>
            ORDER CONFIRMED #{orderId}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-wd-gray900">
            Thank You for Your Sweet Order!
          </h1>
          <p className="text-sm text-wd-gray600 max-w-md mx-auto">
            We&apos;ve sent an order receipt to <strong className="text-wd-gray900">{formData.email || 'your email'}</strong>.
            Your package will be dispatched via express discreet courier.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white border border-gray-200 p-6  border border-ak-teal500/20 bg-ak-warm/90 text-left space-y-4 text-xs">
          <div className="flex justify-between pb-3 border-b border-gray-100">
            <span className="text-wd-gray500">Payment Gateway:</span>
            <span className="font-bold text-wd-gray900 uppercase">{paymentMethod} Instant Clearance</span>
          </div>
          <div className="flex justify-between pb-3 border-b border-gray-100">
            <span className="text-wd-gray500">Shipping Address:</span>
            <span className="font-bold text-wd-gray900 text-right">
              {formData.address}, {formData.city}, {formData.province}
            </span>
          </div>
          <div className="flex justify-between text-sm font-bold text-wd-gray900">
            <span>Total Paid:</span>
            <span className="text-ak-teal text-base font-black">R{finalPayableTotal}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button
            variant="cyan"
            size="lg"
            onClick={() => onNavigate('shop')}
            rightIcon={<Sparkles className="w-4 h-4" />}
          >
            Continue Shopping
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open('https://wa.me/27820000000', '_blank')}
          >
            Track on WhatsApp
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold text-wd-gray900">Your cart is empty</h2>
        <p className="text-xs text-wd-gray500">
          Add some Lifted Snacks or botanicals before proceeding to checkout.
        </p>
        <Button variant="cyan" onClick={() => onNavigate('shop')}>
          Go to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('shop')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-wd-gray500 hover:text-ak-teal transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Store</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
          <Lock className="w-4 h-4" />
          <span>256-Bit SSL Encrypted 1-Page Checkout</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Customer & Delivery Address */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Customer Contact */}
          <div className="bg-white border border-gray-200 p-6 sm:p-8  border border-ak-teal500/15 bg-ak-warm/80 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
              <span className="w-6 h-6 bg-ak-teal text-wd-gray900 flex items-center justify-center text-xs font-bold font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h2 className="text-base font-bold text-wd-gray900 uppercase tracking-wider">
                Customer & Contact Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-wd-gray600 font-semibold">First Name *</label>
                <input
                  required
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="e.g. John"
                  className="w-full bg-white border border-gray-200 px-3.5 py-2.5 text-wd-gray900 focus:outline-none focus:border-ak-teal400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-wd-gray600 font-semibold">Last Name *</label>
                <input
                  required
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="e.g. Doe"
                  className="w-full bg-white border border-gray-200 px-3.5 py-2.5 text-wd-gray900 focus:outline-none focus:border-ak-teal400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-wd-gray600 font-semibold">Email Address (for tracking) *</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.co.za"
                  className="w-full bg-white border border-gray-200 px-3.5 py-2.5 text-wd-gray900 focus:outline-none focus:border-ak-teal400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-wd-gray600 font-semibold">SA Mobile Number (for Courier SMS) *</label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="082 123 4567"
                  className="w-full bg-white border border-gray-200 px-3.5 py-2.5 text-wd-gray900 focus:outline-none focus:border-ak-teal400"
                />
              </div>
            </div>
          </div>

          {/* Step 2: South African Shipping Address */}
          <div className="bg-white border border-gray-200 p-6 sm:p-8  border border-ak-teal500/15 bg-ak-warm/80 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
              <span className="w-6 h-6 bg-ak-teal text-wd-gray900 flex items-center justify-center text-xs font-bold font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h2 className="text-base font-bold text-wd-gray900 uppercase tracking-wider">
                South African Delivery Address
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-wd-gray600 font-semibold">Street Address / Complex Name *</label>
                <input
                  required
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Unit 12, Rosewood Estate, 45 Main Rd"
                  className="w-full bg-white border border-gray-200 px-3.5 py-2.5 text-wd-gray900 focus:outline-none focus:border-ak-teal400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-wd-gray600 font-semibold">Suburb *</label>
                  <input
                    required
                    type="text"
                    value={formData.suburb}
                    onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                    placeholder="e.g. Sandton / Camps Bay"
                    className="w-full bg-white border border-gray-200 px-3.5 py-2.5 text-wd-gray900 focus:outline-none focus:border-ak-teal400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-wd-gray600 font-semibold">City / Town *</label>
                  <input
                    required
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Johannesburg"
                    className="w-full bg-white border border-gray-200 px-3.5 py-2.5 text-wd-gray900 focus:outline-none focus:border-ak-teal400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-wd-gray600 font-semibold">Province *</label>
                  <select
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full bg-white border border-gray-200 px-3 py-2.5 text-wd-gray900 focus:outline-none focus:border-ak-teal400"
                  >
                    {provinces.map((prov) => (
                      <option key={prov} value={prov}>
                        {prov}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-wd-gray600 font-semibold">Postal Code *</label>
                  <input
                    required
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="e.g. 2196"
                    className="w-full bg-white border border-gray-200 px-3.5 py-2.5 text-wd-gray900 focus:outline-none focus:border-ak-teal400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-wd-gray600 font-semibold">Delivery Instructions (Optional)</label>
                  <input
                    type="text"
                    value={formData.deliveryNotes}
                    onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                    placeholder="e.g. Leave at reception gate"
                    className="w-full bg-white border border-gray-200 px-3.5 py-2.5 text-wd-gray900 focus:outline-none focus:border-ak-teal400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Payment Method Selector */}
          <div className="bg-white border border-gray-200 p-6 sm:p-8  border border-ak-teal500/15 bg-ak-warm/80 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
              <span className="w-6 h-6 bg-ak-teal text-wd-gray900 flex items-center justify-center text-xs font-bold font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h2 className="text-base font-bold text-wd-gray900 uppercase tracking-wider">
                Select Secure Payment Option
              </h2>
            </div>

            <div className="space-y-3">
              {/* Option 1: Ozow Instant EFT */}
              <div
                onClick={() => setPaymentMethod('ozow')}
                className={clsx(
                  'p-4  border cursor-pointer transition-all flex items-start gap-3.5',
                  paymentMethod === 'ozow'
                    ? 'border-ak-teal400 bg-ak-warm/40 shadow-wd-hover/20'
                    : 'border-gray-200 bg-white hover:border-ak-teal'
                )}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'ozow'}
                  onChange={() => setPaymentMethod('ozow')}
                  className="mt-1 accent-cyan-400"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-wd-gray900 text-sm">
                      Ozow Instant EFT (Fastest Clearance)
                    </span>
                    <Badge variant="cyan" size="sm">
                      Recommended
                    </Badge>
                  </div>
                  <p className="text-xs text-wd-gray500 mt-1">
                    Zero fees. Instant verification with Capitec, FNB, Standard Bank, Absa, Nedbank, TymeBank.
                  </p>
                </div>
              </div>

              {/* Option 2: PayFast Card */}
              <div
                onClick={() => setPaymentMethod('payfast')}
                className={clsx(
                  'p-4  border cursor-pointer transition-all flex items-start gap-3.5',
                  paymentMethod === 'payfast'
                    ? 'border-ak-teal400 bg-ak-warm/40 shadow-wd-hover/20'
                    : 'border-gray-200 bg-white hover:border-ak-teal'
                )}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'payfast'}
                  onChange={() => setPaymentMethod('payfast')}
                  className="mt-1 accent-cyan-400"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-wd-gray900 text-sm">
                      PayFast Credit & Debit Card / Apple Pay
                    </span>
                  </div>
                  <p className="text-xs text-wd-gray500 mt-1">
                    Visa, Mastercard with 3D Secure verification.
                  </p>
                </div>
              </div>

              {/* Option 3: Manual EFT */}
              <div
                onClick={() => setPaymentMethod('eft')}
                className={clsx(
                  'p-4  border cursor-pointer transition-all flex items-start gap-3.5',
                  paymentMethod === 'eft'
                    ? 'border-ak-teal400 bg-ak-warm/40 shadow-wd-hover/20'
                    : 'border-gray-200 bg-white hover:border-ak-teal'
                )}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'eft'}
                  onChange={() => setPaymentMethod('eft')}
                  className="mt-1 accent-cyan-400"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-wd-gray900 text-sm">
                      Manual Bank Wire Transfer
                    </span>
                  </div>
                  <p className="text-xs text-wd-gray500 mt-1">
                    Banking details provided upon order placement. Dispatch after proof of payment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Pay Action */}
        <div className="lg:col-span-5 bg-white border border-gray-200 p-6 sm:p-8  border border-ak-teal500/20 bg-ak-warm/90 space-y-6 sticky top-28">
          <h3 className="font-display font-black text-lg text-wd-gray900 pb-3 border-b border-gray-100 flex items-center justify-between">
            <span>Order Summary</span>
            <span className="text-xs font-mono text-ak-400">{items.length} item types</span>
          </h3>

          {/* Items Preview */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedVariant.id}`}
                className="flex items-center gap-3 text-xs"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-12 h-12  bg-white p-1 object-contain border border-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-wd-gray900 truncate">{item.product.name}</h4>
                  <span className="text-wd-gray500 text-[11px]">
                    {item.selectedVariant.label} (x{item.quantity})
                  </span>
                </div>
                <span className="font-bold font-mono text-wd-gray900">
                  R{item.selectedVariant.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Coupon Code Box */}
          <div className="pt-3 border-t border-gray-100 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Discount code (e.g. SWEET10)"
                className="flex-1 bg-white border border-gray-200 px-3 py-2 text-xs text-wd-gray900 uppercase placeholder-slate-500 focus:outline-none focus:border-ak-teal400"
              />
              <Button variant="outline" size="sm" onClick={handleApplyCoupon}>
                Apply
              </Button>
            </div>
            {discountPercent > 0 && (
              <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{discountPercent}% Promo Discount Applied!</span>
              </p>
            )}
            {couponError && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{couponError}</span>
              </p>
            )}
          </div>

          {/* Totals Breakdown */}
          <div className="space-y-2 text-xs pt-3 border-t border-gray-100 text-wd-gray500">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-wd-gray900 font-mono">R{subtotal}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-accent-bubblegum">
                <span>Discount ({discountPercent}%)</span>
                <span className="font-bold font-mono">-R{discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Express Discreet Courier</span>
              <span className="font-semibold text-wd-gray900 font-mono">
                {shipping === 0 ? (
                  <span className="text-emerald-400 font-bold">FREE OVER R850</span>
                ) : (
                  `R${shipping}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold font-display text-wd-gray900 pt-3 border-t border-gray-100">
              <span>Total to Pay (ZAR)</span>
              <span className="text-2xl font-black text-ak-teal font-mono">
                R{finalPayableTotal}
              </span>
            </div>
          </div>

          {/* Age Compliance Checkbox */}
          <div className="p-3  bg-white/60 border border-gray-100">
            <label className="flex items-start gap-2.5 text-[11px] text-wd-gray500 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.ageConsent}
                onChange={(e) => setFormData({ ...formData, ageConsent: e.target.checked })}
                className="mt-0.5 accent-cyan-400 rounded"
              />
              <span>
                I confirm that I am 18 years or older and accept the private adult consumption terms.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <Button
            variant="cyan"
            size="xl"
            fullWidth
            type="submit"
            isLoading={isSubmitting}
            rightIcon={<Sparkles className="w-5 h-5" />}
          >
            Complete Order (R{finalPayableTotal})
          </Button>

          <div className="text-center text-[10px] text-wd-gray400 flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Guaranteed discreet packaging with track & trace SMS.</span>
          </div>
        </div>
      </form>
    </div>
  );
};


