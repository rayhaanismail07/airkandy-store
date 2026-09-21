import React from 'react';
import { Sprout, ShieldCheck, Truck, Headphones } from 'lucide-react';

const features = [
  {
    id: 'f-1',
    icon: <Truck className="w-8 h-8" />,
    title: 'Free Nationwide Delivery',
    desc: 'On all orders over R850 — stealth vacuum packaging.',
  },
  {
    id: 'f-2',
    icon: <ShieldCheck className="w-8 h-8" />,
    title: 'HPLC Lab Tested',
    desc: 'Independent chromatography: 0 PPM residual solvents.',
  },
  {
    id: 'f-3',
    icon: <Sprout className="w-8 h-8" />,
    title: 'Craft Indoor Quality',
    desc: 'Triple-cured AAA+ flowers with full terpene preservation.',
  },
  {
    id: 'f-4',
    icon: <Headphones className="w-8 h-8" />,
    title: 'WhatsApp Concierge',
    desc: 'Personal dosage guidance for adult 18+ customers.',
  },
];

export const MarionFeatures: React.FC = () => (
  <section className="bg-white border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 lg:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-gray-100">
        {features.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-5 py-7 px-5 lg:px-7 group"
          >
            {/* Icon */}
            <div className="flex-shrink-0 text-ak-teal group-hover:text-ak-teal-dark transition-colors">
              {item.icon}
            </div>

            {/* Text */}
            <div>
              <h3 className="text-sm font-bold text-wd-gray900 mb-0.5">{item.title}</h3>
              <p className="text-xs text-wd-gray600 leading-snug">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
