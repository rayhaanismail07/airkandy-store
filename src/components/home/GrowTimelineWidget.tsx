import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GROW_STAGES } from '../../data/growData';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  Sprout,
  Sun,
  Thermometer,
  Droplets,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Activity,
  Eye,
  Sliders,
} from 'lucide-react';
import { clsx } from 'clsx';

interface GrowTimelineWidgetProps {
  onNavigateToGrowGuide: () => void;
}

export const GrowTimelineWidget: React.FC<GrowTimelineWidgetProps> = ({
  onNavigateToGrowGuide,
}) => {
  const [selectedStageIndex, setSelectedStageIndex] = useState(3); // Default to Bloom
  const [showTrichomeLoupe, setShowTrichomeLoupe] = useState(false);

  const stage = GROW_STAGES[selectedStageIndex];

  // Dynamic Botanical Stage Attributes
  const stageVisuals = [
    {
      plantArt: 'ðŸŒ±',
      plantDesc: 'Delicate taproot & cotyledon leaves emerging from moist germination medium.',
      npk: { n: 10, p: 5, k: 5 },
      spectrumColor: 'from-ak-teal to-ak-gold',
      spectrumLabel: '450nm Cool Blue Veg Spectrum (150 PPFD)',
      trichomeState: 'Non-Existent (Glandular cells forming)',
      vpd: '0.8 kPa (Gentle Transpiration)',
    },
    {
      plantArt: 'ðŸŒ¿',
      plantDesc: 'First 3 sets of serrated fan leaves expanding. Root network multiplying in starter cube.',
      npk: { n: 35, p: 15, k: 20 },
      spectrumColor: 'from-ak-teal to-ak-gold',
      spectrumLabel: '450nm + 5000K Full White (300 PPFD)',
      trichomeState: 'Microscopic stalkless glands',
      vpd: '1.0 kPa (Active Growth)',
    },
    {
      plantArt: 'ðŸª´',
      plantDesc: 'Heavy structural branching, thick woody stem, and massive fan leaf canopy absorbing photons.',
      npk: { n: 80, p: 30, k: 45 },
      spectrumColor: 'from-ak-teal to-ak-gold',
      spectrumLabel: 'Full Spectrum + UV-A Boost (600 PPFD)',
      trichomeState: 'Capitate-stalked trichomes beginning on sugar leaf rims',
      vpd: '1.2 kPa (Max Nutrient Uptake)',
    },
    {
      plantArt: 'ðŸŒº',
      plantDesc: 'Swollen frosty calyxes bursting with sticky terpene resin, sparkling trichome blankets & heavy colas.',
      npk: { n: 25, p: 85, k: 90 },
      spectrumColor: 'from-ak-teal to-ak-gold',
      spectrumLabel: '660nm Deep Red + 730nm Far Red (950 PPFD)',
      trichomeState: '70% Milky Cloudy / 30% Golden Amber Heads (Peak Potency)',
      vpd: '1.4 kPa (Dense Calyx Swelling)',
    },
    {
      plantArt: 'ðŸ¯',
      plantDesc: 'Slow cold-dry at 16Â°C & 60% RH followed by glass curing to lock in candy terpenes.',
      npk: { n: 0, p: 0, k: 0 },
      spectrumColor: 'from-ak-teal to-ak-gold',
      spectrumLabel: 'Total Darkness (Photons Degrade Cannabinoids)',
      trichomeState: 'Preserved Amber Terpene Heads',
      vpd: 'Curing Equilibrium at 62% RH',
    },
  ][selectedStageIndex];

  return (
    <section className="py-16 relative overflow-hidden bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ak-teal flex items-center justify-center gap-2">
            <Sprout className="w-4 h-4" />
            Interactive Cultivation Simulator
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-wd-gray900">
            The Botanical Growth Laboratory
          </h2>
          <p className="text-xs sm:text-base text-wd-gray600">
            Interactive step-by-step simulator. Explore photon spectrums, dynamic nutrient ratios,
            and 60x trichome magnification across all 5 life stages.
          </p>
        </div>

        {/* Stage Timeline Stepper */}
        <div className="relative">
          {/* Progress Connecting Line */}
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-10 right-10 h-1 bg-gray-100 rounded-full z-0">
            <div
              className="h-full bg-gradient-to-r from-ak-teal to-ak-gold transition-all duration-500"
              style={{
                width: `${(selectedStageIndex / (GROW_STAGES.length - 1)) * 100}%`,
              }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 relative z-10">
            {GROW_STAGES.map((s, idx) => {
              const isSelected = selectedStageIndex === idx;
              const isPassed = selectedStageIndex >= idx;

              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedStageIndex(idx)}
                  className={clsx(
                    'p-4 border text-left transition-all cursor-pointer flex flex-col items-center sm:items-start group',
                    isSelected
                      ? 'bg-ak-teal text-wd-gray900 border-ak-teal scale-105'
                      : 'bg-white border-gray-200 hover:border-ak-teal'
                  )}
                  style={{ borderRadius: 2 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={clsx(
                        'w-8 h-8 flex items-center justify-center font-bold text-xs transition-colors',
                        isSelected
                          ? 'bg-white text-ak-teal font-bold'
                          : isPassed
                          ? 'bg-ak-warm text-ak-teal border border-ak-teal'
                          : 'bg-gray-100 text-wd-gray600'
                      )}
                      style={{ borderRadius: 2 }}
                    >
                      0{s.step}
                    </div>
                    <span className={clsx(
                      'text-[10px] font-mono hidden sm:inline',
                      isSelected ? 'text-wd-gray900/80' : 'text-wd-gray600'
                    )}>
                      {s.durationWeeks}
                    </span>
                  </div>

                  <span
                    className={clsx(
                      'text-xs sm:text-sm font-bold text-center sm:text-left line-clamp-1',
                      isSelected ? 'text-wd-gray900' : 'text-wd-gray700 group-hover:text-ak-teal'
                    )}
                  >
                    {s.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Botanical Simulator Stage Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="bg-white p-6 sm:p-10 border border-gray-200 shadow-sm space-y-8"
            style={{ borderRadius: 2 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Stage Specs & Master Cultivator Guidance */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="px-3.5 py-1 text-xs font-bold bg-ak-teal text-wd-gray900"
                    style={{ borderRadius: 2 }}
                  >
                    STAGE 0{stage.step} OF 5
                  </span>
                  <span className="text-xs text-wd-gray600 font-mono">
                    Estimated Time: <strong className="text-wd-gray900">{stage.durationWeeks}</strong>
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-wd-gray900">
                    {stage.name}
                  </h3>
                  <p className="text-sm sm:text-base text-wd-gray600 mt-2 leading-relaxed">
                    {stage.summary}
                  </p>
                </div>

                {/* Botanical Plant State Card */}
                <div
                  className="p-4 bg-ak-warm border border-gray-200 flex items-start gap-4"
                  style={{ borderRadius: 2 }}
                >
                  <span className="text-4xl">{stageVisuals.plantArt}</span>
                  <div>
                    <span className="text-xs font-bold text-ak-teal uppercase tracking-wider block">
                      Biological Canopy Status
                    </span>
                    <p className="text-xs text-wd-gray600 mt-0.5">
                      {stageVisuals.plantDesc}
                    </p>
                  </div>
                </div>

                {/* Pro Grower Tip */}
                <div
                  className="p-4 bg-ak-warm border border-ak-teal/20 flex items-start gap-3 text-xs text-wd-gray700"
                  style={{ borderRadius: 2 }}
                >
                  <Sparkles className="w-5 h-5 text-ak-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ak-teal font-bold block mb-0.5">
                      Master Cultivator Recommendation:
                    </strong>
                    {stage.proTip}
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="cyan"
                    size="lg"
                    onClick={onNavigateToGrowGuide}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Open Complete Grow Hub Guide
                  </Button>
                </div>
              </div>

              {/* Right Column: Live Environment & Spectrum Lab Matrix */}
              <div className="lg:col-span-5 space-y-4">
                {/* 1. Dynamic LED Spectrum Bar */}
                <div
                  className="p-4 bg-white border border-gray-200 space-y-2"
                  style={{ borderRadius: 2 }}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-ak-teal flex items-center gap-1.5">
                      <Sun className="w-4 h-4" /> LED Photon Spectrum
                    </span>
                    <span className="font-mono text-wd-gray600 text-[11px]">{stage.lightSchedule.split(' ')[0]}</span>
                  </div>

                  <div
                    className="h-3 w-full bg-gray-100 border border-gray-200 overflow-hidden"
                    style={{ borderRadius: 2 }}
                  >
                    <div
                      className={`h-full w-full bg-gradient-to-r from-ak-teal to-ak-gold`}
                    />
                  </div>
                  <span className="text-[11px] text-wd-gray600 font-mono block">
                    {stageVisuals.spectrumLabel}
                  </span>
                </div>

                {/* 2. Environmental Targets (Temp & Humidity VPD) */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div
                    className="p-3.5 bg-white border border-gray-200 space-y-1"
                    style={{ borderRadius: 2 }}
                  >
                    <span className="text-ak-gold font-bold flex items-center gap-1">
                      <Thermometer className="w-3.5 h-3.5" /> Temperature
                    </span>
                    <p className="text-wd-gray900 font-mono font-bold text-sm">{stage.temperature}</p>
                    <span className="text-[10px] text-wd-gray600 block">Target leaf temp</span>
                  </div>

                  <div
                    className="p-3.5 bg-white border border-gray-200 space-y-1"
                    style={{ borderRadius: 2 }}
                  >
                    <span className="text-ak-teal font-bold flex items-center gap-1">
                      <Droplets className="w-3.5 h-3.5" /> Relative Humidity
                    </span>
                    <p className="text-wd-gray900 font-mono font-bold text-sm">{stage.humidity}</p>
                    <span className="text-[10px] text-wd-gray600 block">{stageVisuals.vpd}</span>
                  </div>
                </div>

                {/* 3. N-P-K Nutrient Cocktail Mixer */}
                <div
                  className="p-4 bg-white border border-gray-200 space-y-3"
                  style={{ borderRadius: 2 }}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-ak-teal flex items-center gap-1.5">
                      <Activity className="w-4 h-4" /> Nutrient Formula (N-P-K)
                    </span>
                    <span className="text-[10px] text-wd-gray600 font-mono">Stage {stage.step} Ratio</span>
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-wd-gray700">
                      <span>Nitrogen (N) - Vegetative Foliage:</span>
                      <span className="font-mono text-ak-teal font-bold">{stageVisuals.npk.n}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 overflow-hidden" style={{ borderRadius: 2 }}>
                      <div
                        className="bg-ak-teal h-full transition-all duration-500"
                        style={{ width: `${stageVisuals.npk.n}%`, borderRadius: 2 }}
                      />
                    </div>

                    <div className="flex justify-between text-wd-gray700 pt-1">
                      <span>Phosphorus (P) - Bud Density:</span>
                      <span className="font-mono text-ak-gold font-bold">{stageVisuals.npk.p}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 overflow-hidden" style={{ borderRadius: 2 }}>
                      <div
                        className="bg-ak-gold h-full transition-all duration-500"
                        style={{ width: `${stageVisuals.npk.p}%`, borderRadius: 2 }}
                      />
                    </div>

                    <div className="flex justify-between text-wd-gray700 pt-1">
                      <span>Potassium (K) - Terpenes & Sugar:</span>
                      <span className="font-mono text-ak-gold font-bold">{stageVisuals.npk.k}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 overflow-hidden" style={{ borderRadius: 2 }}>
                      <div
                        className="bg-ak-gold h-full transition-all duration-500"
                        style={{ width: `${stageVisuals.npk.k}%`, borderRadius: 2 }}
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Trichome 60x Loupe Magnifier */}
                <div
                  className="p-3.5 bg-white border border-ak-teal/30 flex items-center justify-between text-xs"
                  style={{ borderRadius: 2 }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="p-2 bg-ak-warm text-ak-teal"
                      style={{ borderRadius: 2 }}
                    >
                      <Eye className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-wd-gray600 uppercase font-bold block">
                        60x Trichome Lens
                      </span>
                      <span className="text-wd-gray900 font-bold">{stageVisuals.trichomeState}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

