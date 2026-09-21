import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

const faqs = [
  {
    q: 'How are AirKandy and Lifted Snacks edibles infused?',
    a: 'Our products utilize 99% pure cannabinoid distillates subjected to high-shear nano-emulsification. This ensures identical milligram potency across every single gummy and pop with rapid absorption and clean taste.',
  },
  {
    q: 'What is the delivery process across South Africa?',
    a: 'All orders are sealed in double-barrier odor-lock vacuum pouches and dispatched in discreet, unbranded express courier packaging. You receive real-time SMS tracking from dispatch to door.',
  },
  {
    q: 'Are your flower strains triple-cured?',
    a: 'Yes. All AAA+ craft flowers undergo a slow 21-day cold-cure at 16°C and 60% relative humidity, sealed with Boveda 62% terpene shield packs to preserve essential aromatic monoterpenes.',
  },
  {
    q: 'How do I pay securely online?',
    a: 'We support instant Ozow Automated EFT, PayFast, and verified bank transfers. Payments clear instantly with zero surcharge fees.',
  },
  {
    q: 'Is there a minimum order amount?',
    a: 'No minimum order! Free nationwide delivery unlocks on orders over R850. All orders under R850 attract a flat courier fee.',
  },
];

export const MarionFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-14 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left: Image */}
          <div className="hidden lg:block relative">
            <div
              className="overflow-hidden aspect-[3/4] bg-ak-warm border border-gray-200"
              style={{ borderRadius: 2 }}
            >
              <img
                src="/assets/branding/Scientific Dispensary Menu_page-1.jpg"
                alt="AirKandy Menu"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative border offset */}
            <div
              className="absolute -bottom-3 -right-3 w-full h-full border-2 border-ak-gold/30 pointer-events-none"
              style={{ borderRadius: 2 }}
            />
          </div>

          {/* Right: FAQ Accordion */}
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ak-teal mb-2">
                Frequently Asked Questions
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-wd-gray900">
                Everything You Need to Know
              </h2>
            </div>

            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className={clsx(
                      'border transition-colors overflow-hidden',
                      isOpen ? 'border-ak-teal' : 'border-gray-200 hover:border-gray-300',
                    )}
                    style={{ borderRadius: 2 }}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className={clsx('text-sm font-semibold', isOpen ? 'text-ak-teal' : 'text-wd-gray900')}>
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={clsx(
                          'w-4 h-4 flex-shrink-0 transition-transform duration-200',
                          isOpen ? 'rotate-180 text-ak-teal' : 'text-wd-gray400',
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-5 pb-5 text-sm text-wd-gray600 leading-relaxed border-t border-gray-100 pt-3">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
