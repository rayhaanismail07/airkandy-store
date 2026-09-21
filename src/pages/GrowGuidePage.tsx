import React, { useState } from 'react';
import { GROW_STAGES } from '../data/growData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  Sprout,
  Sun,
  Thermometer,
  Droplets,
  Zap,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { clsx } from 'clsx';

interface GrowGuidePageProps {
  onNavigateToShop: (category?: string) => void;
}

export const GrowGuidePage: React.FC<GrowGuidePageProps> = ({ onNavigateToShop }) => {
  const [activeStageId, setActiveStageId] = useState(GROW_STAGES[0].id);

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Hero Banner for Grow Guide */}
      <div
        className="relative overflow-hidden bg-ak-teal text-wd-gray900 p-8 sm:p-12"
        style={{ borderRadius: 2 }}
      >
        <div className="max-w-3xl space-y-4 relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-wd-gray900/70 flex items-center gap-2">
            <Sprout className="w-3.5 h-3.5 text-ak-gold" />
            AirKandy Cultivation Masterclass
          </p>

          <h1 className="text-3xl sm:text-5xl font-bold text-wd-gray900 leading-tight">
            The Craft Cannabis &amp; Botanical <br />
            <span className="text-ak-gold">Grow Hub Knowledge Base</span>
          </h1>

          <p className="text-sm sm:text-base text-wd-gray900/80 leading-relaxed">
            Cultivate dense, trichome-laden candy colas from home. Complete step-by-step guidance on
            photoperiods, VPD targets, microbial nutrients, training techniques, and terpene curing.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              variant="lime"
              size="md"
              onClick={() => onNavigateToShop('grow-tech')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Shop Apex LEDs &amp; Grow Tents
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Reference Environment Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          className="p-5 bg-white border border-gray-200 space-y-2"
          style={{ borderRadius: 2 }}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-ak-teal uppercase tracking-wider">
            <Sun className="w-4 h-4" />
            <span>PPFD / Light Spectrum</span>
          </div>
          <p className="text-xl font-bold text-wd-gray900">450 - 1000 Âµmol</p>
          <p className="text-xs text-wd-gray600">Full spectrum Samsung LM301H with deep red 660nm.</p>
        </div>

        <div
          className="p-5 bg-white border border-gray-200 space-y-2"
          style={{ borderRadius: 2 }}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-ak-gold uppercase tracking-wider">
            <Thermometer className="w-4 h-4" />
            <span>Day / Night Temps</span>
          </div>
          <p className="text-xl font-bold text-wd-gray900">24Â°C / 19Â°C</p>
          <p className="text-xs text-wd-gray600">Cooler night temps protect volatile monoterpenes.</p>
        </div>

        <div
          className="p-5 bg-white border border-gray-200 space-y-2"
          style={{ borderRadius: 2 }}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-ak-teal uppercase tracking-wider">
            <Droplets className="w-4 h-4" />
            <span>Humidity (VPD)</span>
          </div>
          <p className="text-xl font-bold text-wd-gray900">0.8 - 1.4 kPa</p>
          <p className="text-xs text-wd-gray600">70% RH in seedling down to 40% in late bloom.</p>
        </div>

        <div
          className="p-5 bg-white border border-gray-200 space-y-2"
          style={{ borderRadius: 2 }}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-ak-teal uppercase tracking-wider">
            <Sprout className="w-4 h-4" />
            <span>Substrate pH Range</span>
          </div>
          <p className="text-xl font-bold text-wd-gray900">6.2 - 6.8 Soil</p>
          <p className="text-xs text-wd-gray600">5.8 - 6.2 for Coco Coir and Hydroponic setups.</p>
        </div>
      </div>

      {/* Interactive Growth Stages Deep-Dive */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase font-bold text-ak-teal tracking-[0.2em] block">
              Step-By-Step Playbook
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-wd-gray900">
              The 5 Stages of High-Yield Cultivation
            </h2>
          </div>

          {/* Quick Stage Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {GROW_STAGES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveStageId(s.id)}
                className={clsx(
                  'px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer border',
                  activeStageId === s.id
                    ? 'bg-ak-teal text-wd-gray900 border-ak-teal'
                    : 'bg-white border-gray-200 text-wd-gray600 hover:border-ak-teal hover:text-ak-teal'
                )}
                style={{ borderRadius: 2 }}
              >
                Stage 0{s.step}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Stage Cards */}
        <div className="space-y-6">
          {GROW_STAGES.map((stage) => {
            const isTarget = activeStageId === stage.id;

            return (
              <div
                key={stage.id}
                id={stage.id}
                className={clsx(
                  'p-6 sm:p-8 border transition-all space-y-6',
                  isTarget
                    ? 'border-ak-teal bg-white shadow-sm'
                    : 'border-gray-200 bg-white opacity-80 hover:opacity-100'
                )}
                style={{ borderRadius: 2 }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-10 h-10 bg-ak-teal text-wd-gray900 font-bold text-sm flex items-center justify-center"
                      style={{ borderRadius: 2 }}
                    >
                      0{stage.step}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-wd-gray900">
                        {stage.name}
                      </h3>
                      <span className="text-xs text-ak-teal font-mono font-semibold">
                        Expected Duration: {stage.durationWeeks}
                      </span>
                    </div>
                  </div>

                  <Badge variant={stage.step === 4 ? 'pink' : 'lime'} size="md">
                    {stage.step === 4 ? 'ðŸ”¥ Critical Bloom Phase' : 'Active Growth'}
                  </Badge>
                </div>

                <p className="text-sm sm:text-base text-wd-gray600 leading-relaxed">
                  {stage.summary}
                </p>

                {/* Stage Specs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div
                    className="p-4 bg-ak-warm border border-gray-200 space-y-1"
                    style={{ borderRadius: 2 }}
                  >
                    <span className="text-wd-gray600 font-bold block">Photoperiod &amp; Light</span>
                    <p className="text-wd-gray900 font-medium">{stage.lightSchedule}</p>
                  </div>
                  <div
                    className="p-4 bg-ak-warm border border-gray-200 space-y-1"
                    style={{ borderRadius: 2 }}
                  >
                    <span className="text-wd-gray600 font-bold block">Canopy Temperature</span>
                    <p className="text-wd-gray900 font-medium">{stage.temperature}</p>
                  </div>
                  <div
                    className="p-4 bg-ak-warm border border-gray-200 space-y-1"
                    style={{ borderRadius: 2 }}
                  >
                    <span className="text-wd-gray600 font-bold block">Target Humidity (RH)</span>
                    <p className="text-wd-gray900 font-medium">{stage.humidity}</p>
                  </div>
                  <div
                    className="p-4 bg-ak-warm border border-gray-200 space-y-1"
                    style={{ borderRadius: 2 }}
                  >
                    <span className="text-wd-gray600 font-bold block">Nutrient Ratios</span>
                    <p className="text-wd-gray900 font-medium">{stage.nutrients}</p>
                  </div>
                </div>

                {/* Pro Tip Box */}
                <div
                  className="p-4 bg-ak-warm border border-ak-teal/20 flex items-start gap-3 text-xs text-wd-gray700"
                  style={{ borderRadius: 2 }}
                >
                  <Sparkles className="w-5 h-5 text-ak-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ak-teal font-bold block mb-0.5">
                      Pro Cultivator Tip for Stage {stage.step}:
                    </strong>
                    {stage.proTip}
                  </div>
                </div>

                {/* Recommended Gear */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs font-bold text-wd-gray600 uppercase tracking-wider">
                    Recommended Hardware:
                  </span>
                  {stage.recommendedGear.map((item) => (
                    <button
                      key={item}
                      onClick={() => onNavigateToShop('grow-tech')}
                      className="text-xs px-3 py-1 bg-white hover:bg-ak-warm text-wd-gray700 hover:text-ak-teal border border-gray-200 hover:border-ak-teal transition-colors"
                      style={{ borderRadius: 2 }}
                    >
                      âš¡ {item}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

