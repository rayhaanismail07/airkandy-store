# 🍭 AirKandy (airkandy.co.za) - Full-Site React Redesign

> **The Adult Candy Shop / Botanical Confectionery**  
> High-performance, tactile, and conversion-optimized React e-commerce application for AirKandy South Africa.

---

## 🎨 Aesthetic & Brand System
- **Theme:** Electric Blue Raspberry (`#0066FF`), Neon Cyan Cotton Candy (`#00E5FF`), Midnight Sapphire Liquorice (`#080C16`), and Glossy Bubblegum Pink (`#FF3B94`).
- **Styling Architecture:** Tailwind CSS + Frosted Glassmorphism (`backdrop-blur-md`) + Ambient Radial Glows.
- **Animations:** Framer Motion spring physics (`stiffness: 350, damping: 25`) on buttons, drawers, and floating candy badges.

---

## 🚀 Tech Stack
- **Framework:** React 18 + TypeScript + Vite
- **Icons:** `lucide-react`
- **Animation:** `framer-motion` + `canvas-confetti`
- **State Management:** Zustand (`useCartStore`, `useFilterStore`, `useAgeGateStore`)
- **Localization:** South African Rand (`R` / ZAR) + Free delivery milestone calculation (Threshold: R850).

---

## 📱 Page & Component Directory

### Global Components (`src/components/layout/`)
- `AgeGate.tsx`: 18+ South African compliance modal with confetti unlock and `localStorage` persistence.
- `Header.tsx`: Sticky frosted navbar with live search preview, active neon pills, and bouncy cart badge.
- `CartDrawer.tsx`: Slide-over cart with dynamic free delivery progress bar, quick-add cross-sells, and 1-click checkout trigger.
- `MobileNav.tsx`: One-thumb mobile dock navigation (Home, Shop, Grow Hub, Cart, WhatsApp).
- `Footer.tsx`: South African legal disclaimer (Section 22A compliance), payment gateway badges (Ozow, PayFast), and VIP newsletter.

### UI Primitives (`src/components/ui/`)
- `Button.tsx`: Tactile candy button with glow variants, loading state, and spring tap response.
- `Badge.tsx`: Potency chips (`400mg THC`, `Sugar-Free`, `AAA Grade`, `18+ Only`).
- `PotencyMeter.tsx`: Interactive THC/CBD strength level gauge and dominant terpene radar chart.
- `ProductCard.tsx`: High-conversion product card with ambient backlight glow and instant quick-add.
- `QuickViewModal.tsx`: Instant pack size variant selector without page navigation.

### Pages (`src/pages/`)
1. **Home (`/`)**: Hero banner with floating candy badges, horizontal category rails, Lifted Snacks spotlight, Cannabis Growth Cycle widget, and customer reviews.
2. **Shop (`/shop`)**: Multi-filter sidebar (Category, Strain, Potency slider in mg, ZAR price range, Sugar-Free/Vegan toggles), Grid/List view toggle, and sorting.
3. **Product Detail (`/product/:slug`)**: High-res media gallery, potency gauge, pack size selector, expandable informational accordions, and frequently bought bundles.
4. **Checkout (`/checkout`)**: 1-Page frictionless checkout with South African province selector, Ozow Instant EFT / PayFast gateways, and discount promo code applicator.
5. **Grow Hub (`/grow-guide`)**: Visual cultivation guide with PPFD/temperature/humidity matrix and step-by-step stage instructions.
6. **Contact (`/contact`)**: Gauteng & Cape Town dispatch hub info, store hours, direct 1-click WhatsApp concierge, and customer FAQ accordion.

---

## 🛠️ Getting Started

```bash
# Navigate to the store directory
cd airkandy-store

# Start Vite development server
npm run dev

# Build for production
npm run build
```
