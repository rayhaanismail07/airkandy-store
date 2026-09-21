import React from 'react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Heart,
  Truck,
  Leaf,
  MessageCircle,
  ArrowRight,
  Flame,
  CheckCircle2,
  Camera,
} from 'lucide-react';

interface AboutPageProps {
  onNavigateToShop: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToShop }) => {
  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* HERO: The AirKandy Origin & Philosophy */}
      <div
        className="relative overflow-hidden bg-ak-teal text-wd-gray900 p-8 sm:p-14"
        style={{ borderRadius: 2 }}
      >
        <div className="max-w-3xl space-y-5 relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-wd-gray900/70 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-ak-gold" />
            The AirKandy Story
          </p>

          <h1 className="text-4xl sm:text-6xl font-bold text-wd-gray900 leading-[1.1]">
            Redefining Cannabis Into <br />
            <span className="text-ak-gold">Artisanal Confectionery</span>
          </h1>

          <p className="text-base sm:text-lg text-wd-gray900/80 leading-relaxed font-medium">
            AirKandy was born out of a simple revelation in South Africa: cannabis dispensaries
            didn&apos;t have to feel like sterile hospital pharmacies or dated smoke dens.
            We created an euphoric, vibrant sanctuary that marries high-potency distillate science
            with gourmet candy confectionery.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              variant="cyan"
              size="lg"
              onClick={onNavigateToShop}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Explore The Sweet Catalog
            </Button>
            <a
              href="https://wa.me/27820000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-wd-gray900 border border-white/30 hover:border-ak-gold hover:text-ak-gold font-bold text-sm transition-all"
              style={{ borderRadius: 2 }}
            >
              <MessageCircle className="w-4 h-4 text-ak-gold" />
              <span>Chat With Our Curators</span>
            </a>
          </div>
        </div>
      </div>

      {/* THE 3 PILLARS OF BOTANICAL EXCELLENCE */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ak-teal">Our Standard</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-wd-gray900">
            The Three AirKandy Pillars
          </h2>
          <p className="text-xs sm:text-sm text-wd-gray600">
            Precision dosing, pure solventless extractions, and uncompromising private adult discretion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div
            className="p-6 sm:p-8 bg-white border border-gray-200 hover:border-ak-teal transition-colors space-y-4 flex flex-col justify-between"
            style={{ borderRadius: 2 }}
          >
            <div className="space-y-3">
              <div
                className="w-14 h-14 bg-ak-warm text-ak-teal flex items-center justify-center border border-ak-teal/20"
                style={{ borderRadius: 2 }}
              >
                <Sparkles className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-bold text-wd-gray900">
                1. Gourmet Flavor Chemistry
              </h3>
              <p className="text-xs sm:text-sm text-wd-gray600 leading-relaxed">
                We believe edibles should taste nostalgic and delicious without bitter weedy aftertastes.
                Our Lifted Snacks range utilizes nano-emulsified active cannabinoids infused evenly
                into tart sugar belts, fruit pectin hearts, and artisan baked cookies.
              </p>
            </div>
            <span className="text-[11px] font-mono text-ak-teal font-bold">100% Pectin &amp; Sugar-Free Options</span>
          </div>

          {/* Pillar 2 */}
          <div
            className="p-6 sm:p-8 bg-white border border-gray-200 hover:border-ak-teal transition-colors space-y-4 flex flex-col justify-between"
            style={{ borderRadius: 2 }}
          >
            <div className="space-y-3">
              <div
                className="w-14 h-14 bg-ak-warm text-ak-teal flex items-center justify-center border border-ak-teal/20"
                style={{ borderRadius: 2 }}
              >
                <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-bold text-wd-gray900">
                2. HPLC Chromatography Testing
              </h3>
              <p className="text-xs sm:text-sm text-wd-gray600 leading-relaxed">
                Consistency is non-negotiable. Every batch undergoes third-party chromatography verification
                to ensure precise milligram calibration (e.g. 40mg per Heart Stopper, 30mg per Buzz Pop)
                with 0 PPM residual hydrocarbons, heavy metals, or pesticides.
              </p>
            </div>
            <span className="text-[11px] font-mono text-ak-gold font-bold">Certified Third-Party Verification</span>
          </div>

          {/* Pillar 3 */}
          <div
            className="p-6 sm:p-8 bg-white border border-gray-200 hover:border-ak-teal transition-colors space-y-4 flex flex-col justify-between"
            style={{ borderRadius: 2 }}
          >
            <div className="space-y-3">
              <div
                className="w-14 h-14 bg-ak-warm text-ak-teal flex items-center justify-center border border-ak-teal/20"
                style={{ borderRadius: 2 }}
              >
                <Truck className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-bold text-wd-gray900">
                3. Private Stealth Logistics
              </h3>
              <p className="text-xs sm:text-sm text-wd-gray600 leading-relaxed">
                Your privacy is paramount. Every parcel is triple-sealed in odor-barrier vacuum packaging
                and dispatched in unbranded express satchels with live courier SMS tracking across
                Johannesburg, Cape Town, Durban, and all South African towns.
              </p>
            </div>
            <span className="text-[11px] font-mono text-ak-teal font-bold">Double Vacuum Barrier Guarantee</span>
          </div>
        </div>
      </div>

      {/* GRAPHIC SPOTLIGHT: Photographic Story Gallery */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-ak-teal" />
          <h3 className="text-lg font-bold text-wd-gray900">
            Scenes From The Confectionery Movement
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="overflow-hidden border border-gray-200 aspect-[4/3] bg-ak-warm group" style={{ borderRadius: 2 }}>
            <img
              src="/assets/branding/Cannabis culture in south africa.jpg"
              alt="South African Culture"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="overflow-hidden border border-gray-200 aspect-[4/3] bg-ak-warm group" style={{ borderRadius: 2 }}>
            <img
              src="/assets/branding/Get Legal Pharmaceutical Medical Grade Cannabis in South Africa.jpg"
              alt="Pharmaceutical Grade"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="overflow-hidden border border-gray-200 aspect-[4/3] bg-ak-warm group" style={{ borderRadius: 2 }}>
            <img
              src="/assets/branding/consumers to benifit from cannabis.jpg"
              alt="Confectionery Benefits"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* SCENIC SPOTLIGHT: The Lifted Snacks & High Sweety Collaboration */}
      <div
        className="p-8 sm:p-12 bg-ak-warm border border-gray-200"
        style={{ borderRadius: 2 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ak-teal">Exclusive Partnership</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-wd-gray900">
              Fueled By Lifted Snacks
            </h2>
            <p className="text-xs sm:text-sm text-wd-gray600 leading-relaxed">
              AirKandy is proud to be the official master distributor for <strong>Lifted Snacks</strong> and
              the <strong>High Sweety Distillate</strong> series in South Africa. From festival-ready
              Buzz Pops to evening Heart Stoppers, our collaboration delivers the gold standard in
              tactile adult confectionery.
            </p>
            <div className="space-y-2 pt-2 text-xs text-wd-gray700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-ak-teal" />
                <span>Double-distilled 99% pure cannabinoid isolate infusions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-ak-teal" />
                <span>Vegan pectin &amp; sugar-free formulas for health-conscious connoisseurs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-ak-teal" />
                <span>Fresh micro-batches produced weekly in South Africa</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div
              className="w-full max-w-sm overflow-hidden border border-gray-200 shadow-sm"
              style={{ borderRadius: 2 }}
            >
              <img
                src="/assets/posters/lifted_snacks_poster.jpg"
                alt="Lifted Snacks at AirKandy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div className="text-center py-8 space-y-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-wd-gray900">
          Ready to Experience The Sweet Life?
        </h3>
        <p className="text-xs sm:text-sm text-wd-gray600 max-w-md mx-auto">
          Explore our collection of Lifted Snacks, craft AAA flower, solventless diamonds, and grow gear.
        </p>
        <Button
          variant="cyan"
          size="xl"
          onClick={onNavigateToShop}
          rightIcon={<Sparkles className="w-5 h-5" />}
        >
          Enter The Sweet Shop (18+)
        </Button>
      </div>
    </div>
  );
};

