import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAgeGateStore } from '../../store/useAgeGateStore';
import { Button } from '../ui/Button';
import confetti from 'canvas-confetti';
import { ShieldAlert, CheckCircle2, Lock } from 'lucide-react';

export const AgeGate: React.FC = () => {
  const { isVerified, isOpen, verifyAge } = useAgeGateStore();

  if (isVerified || !isOpen) return null;

  const handleEnter = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#275C53', '#E2BB53', '#317569', '#F5F0EA'],
    });
    verifyAge();
  };

  const handleLeave = () => {
    window.location.href = 'https://google.com';
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-ak-teal/95 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="relative w-full max-w-md bg-white text-center shadow-2xl overflow-hidden"
          style={{ borderRadius: 2 }}
        >
          {/* Teal top accent bar */}
          <div className="h-1 bg-ak-gold w-full" />

          <div className="p-8 sm:p-10 space-y-6">
            {/* Logo area */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-ak-teal flex items-center justify-center text-white font-bold text-xl shadow-ak-teal" style={{ borderRadius: 2 }}>
                AK
              </div>
              <div>
                <p className="text-xl font-bold text-wd-gray900">
                  Air<span className="text-ak-teal">Kandy</span>
                </p>
                <p className="text-xs text-wd-gray500 tracking-wide mt-0.5">For Your Smoking Pleasure</p>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-wd-gray900">
                Are you <span className="text-ak-teal">18 years</span> or older?
              </h2>
              <p className="text-sm text-wd-gray600 leading-relaxed max-w-sm mx-auto">
                Welcome to AirKandy South Africa. This website contains botanical cannabis products,
                infused Lifted Snacks, and adult items strictly intended for individuals 18+.
              </p>
            </div>

            {/* Compliance checklist */}
            <div
              className="bg-ak-warm border border-gray-200 p-4 text-left space-y-2"
              style={{ borderRadius: 2 }}
            >
              <div className="flex items-center gap-2 text-sm text-wd-gray700">
                <CheckCircle2 className="w-4 h-4 text-ak-teal flex-shrink-0" />
                <span>I am 18+ years of age</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-wd-gray700">
                <Lock className="w-4 h-4 text-ak-teal flex-shrink-0" />
                <span>This is a private adult platform</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Button
                variant="outline"
                size="lg"
                fullWidth
                onClick={handleLeave}
                className="order-2 sm:order-1"
              >
                I'm Under 18 — Exit
              </Button>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleEnter}
                className="order-1 sm:order-2"
              >
                Enter — I'm 18+
              </Button>
            </div>

            {/* Disclaimer */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-wd-gray400">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Use responsibly. South African adult laws apply.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
