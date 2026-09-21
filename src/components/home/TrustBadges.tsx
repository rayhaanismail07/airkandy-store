import React from 'react';
import { ShieldCheck, Lock, Zap, Award } from 'lucide-react';

const seals = [
  {
    id: 'hplc',
    icon: <ShieldCheck className="w-6 h-6 text-ak-teal" />,
    badge: 'Certified',
    title: 'HPLC Lab Verified',
    spec: '0 PPM Solvents / 0 Pesticides',
    desc: 'Every batch is independently verified for exact milligram precision and purity.',
  },
  {
    id: 'stealth',
    icon: <Lock className="w-6 h-6 text-ak-teal" />,
    badge: '100% Odorless',
    title: 'Stealth Odor-Lock Dispatch',
    spec: 'Double Vacuum Sealed',
    desc: 'Packed in scent-proof unbranded barrier satchels with discrete courier delivery.',
  },
  {
    id: 'ozow',
    icon: <Zap className="w-6 h-6 text-ak-teal" />,
    badge: 'Instant EFT',
    title: 'Zero-Fee Ozow Payments',
    spec: 'Automated Real-Time EFT',
    desc: 'Instant clearing with all major SA banks — Capitec, FNB, ABSA and more.',
  },
  {
    id: 'terpenes',
    icon: <Award className="w-6 h-6 text-ak-teal" />,
    badge: 'Protected',
    title: 'Boveda 62% Terpene Shield',
    spec: 'Active Humidity Lock',
    desc: 'All craft flowers ship with Boveda active humidity packs for maximum potency.',
  },
];

export const TrustBadges: React.FC = () => (
  <section className="py-14 bg-ak-warm border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 lg:px-6">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ak-teal mb-2">
          Gold Standard Compliance
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-wd-gray900">
          The AirKandy Quality Promise
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {seals.map((seal) => (
          <div
            key={seal.id}
            className="bg-white border border-gray-200 p-6 space-y-4 hover:shadow-wd-card hover:border-ak-teal/30 transition-all group"
            style={{ borderRadius: 2 }}
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 bg-ak-warm border border-ak-teal/20 flex items-center justify-center group-hover:border-ak-teal transition-colors" style={{ borderRadius: 2 }}>
                {seal.icon}
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 bg-ak-teal text-white" style={{ borderRadius: 2 }}>
                {seal.badge}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-wd-gray900 mb-0.5 group-hover:text-ak-teal transition-colors">
                {seal.title}
              </h3>
              <p className="text-[11px] font-semibold text-ak-gold">{seal.spec}</p>
              <p className="text-xs text-wd-gray600 mt-2 leading-relaxed">{seal.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
