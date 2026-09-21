import React from 'react';
import { TerpeneProfile } from '../../types';
import { Zap, ShieldCheck, Sparkles, Activity } from 'lucide-react';
import { clsx } from 'clsx';

interface PotencyMeterProps {
  potency: {
    totalMg: number;
    perServingMg: number;
    thcMg: number;
    cbdMg: number;
    strengthLevel: 'Mild' | 'Moderate' | 'Potent' | 'Ultra Strong';
  };
  terpenes?: TerpeneProfile;
  className?: string;
  showTerpenes?: boolean;
}

export const PotencyMeter: React.FC<PotencyMeterProps> = ({
  potency,
  terpenes,
  className,
  showTerpenes = true,
}) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Mild':
        return 'from-cyan-400 to-blue-500 text-ak-teal';
      case 'Moderate':
        return 'from-blue-500 to-indigo-500 text-blue-400';
      case 'Potent':
        return 'from-pink-500 to-purple-500 text-accent-bubblegum';
      case 'Ultra Strong':
        return 'from-pink-500 via-purple-600 to-cyan-400 text-pink-400';
      default:
        return 'from-cyan-400 to-blue-500 text-ak-teal';
    }
  };

  const getMeterPercentage = () => {
    switch (potency.strengthLevel) {
      case 'Mild':
        return 25;
      case 'Moderate':
        return 50;
      case 'Potent':
        return 75;
      case 'Ultra Strong':
        return 100;
    }
  };

  return (
    <div className={clsx('bg-white border border-gray-200 p-4 sm:p-5  space-y-4 border border-cyan-500/20', className)}>
      {/* Strength Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-ak-teal border border-cyan-500/30">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-wd-gray500 font-semibold block">
              Potency Classification
            </span>
            <span className={clsx('font-bold font-bold text-base capitalize', getLevelColor(potency.strengthLevel))}>
              {potency.strengthLevel} Formula
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xl sm:text-2xl font-bold font-bold text-wd-gray900">
            {potency.totalMg > 0 ? `${potency.totalMg}mg` : 'Flower / AAA'}
          </div>
          {potency.perServingMg > 0 && (
            <span className="text-[11px] text-wd-gray500 font-medium block">
              {potency.perServingMg}mg / serving
            </span>
          )}
        </div>
      </div>

      {/* Strength Gradient Meter Bar */}
      <div className="space-y-1.5">
        <div className="h-2.5 w-full bg-ak-warm/80 rounded-full p-0.5 border border-gray-200/50 overflow-hidden relative">
          <div
            className={clsx(
              'h-full rounded-full transition-all duration-700 bg-gradient-to-r shadow-ak-teal',
              getLevelColor(potency.strengthLevel)
            )}
            style={{ width: `${getMeterPercentage()}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 tracking-wider px-1">
          <span>Mild (5-10mg)</span>
          <span>Moderate (20mg)</span>
          <span>Potent (30mg)</span>
          <span>Ultra (40mg+)</span>
        </div>
      </div>

      {/* Cannabinoid Breakdown Grid */}
      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gray-200/80 text-xs">
        <div className="flex items-center justify-between p-2 rounded-xl bg-ak-warm/50 border border-gray-200">
          <span className="text-wd-gray500 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-ak-teal" /> THC Potency
          </span>
          <span className="font-bold text-slate-200">
            {potency.thcMg > 0 ? `${potency.thcMg}mg` : '28.4%'}
          </span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-xl bg-ak-warm/50 border border-gray-200">
          <span className="text-wd-gray500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent-bubblegum" /> CBD / Terps
          </span>
          <span className="font-bold text-slate-200">
            {potency.cbdMg > 0 ? `${potency.cbdMg}mg` : '<0.5% CBD'}
          </span>
        </div>
      </div>

      {/* Terpene Profile Visualization */}
      {showTerpenes && terpenes && (
        <div className="space-y-2 pt-2 border-t border-gray-200/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-wd-gray600 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-accent-lime" /> Dominant Terpene Profile
            </span>
            <span className="text-[10px] text-ak-teal/80 uppercase font-mono">Verified HPLC Lab</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { name: 'Myrcene (Calm & Chill)', val: terpenes.myrcene, color: 'bg-emerald-400' },
              { name: 'Limonene (Citrus Euphoria)', val: terpenes.limonene, color: 'bg-amber-400' },
              { name: 'Caryophyllene (Spice Relief)', val: terpenes.caryophyllene, color: 'bg-pink-400' },
              { name: 'Pinene (Mental Alertness)', val: terpenes.pinene, color: 'bg-cyan-400' },
              { name: 'Linalool (Sweet Floral)', val: terpenes.linalool, color: 'bg-purple-400' },
            ].map((t) => (
              <div key={t.name} className="p-2 rounded-lg bg-ak-warm/40 border border-gray-200/60">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-wd-gray500 truncate pr-1">{t.name.split(' ')[0]}</span>
                  <span className="font-mono text-slate-200 font-semibold">{t.val}%</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={clsx('h-full rounded-full', t.color)}
                    style={{ width: `${t.val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

