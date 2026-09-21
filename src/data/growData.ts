import { GrowStage } from '../types';

export const GROW_STAGES: GrowStage[] = [
  {
    id: 'stage-germination',
    step: 1,
    name: 'Germination & Sprouting',
    durationWeeks: 'Days 1 - 7',
    summary: 'Awakening the taproot from dormant seeds using sterile moisture and gentle warmth.',
    lightSchedule: '18h Light / 6h Dark (Low intensity / 150 PPFD)',
    temperature: '22°C - 26°C',
    humidity: '70% - 80% RH',
    nutrients: 'Plain pH-balanced water (pH 6.2 - 6.5). No heavy nutrients.',
    proTip: 'Use a paper towel in a sealed dark zip bag or rockwool cubes with root stimulator.',
    recommendedGear: ['Heat Mat with Thermostat', 'Root Riot Starter Cubes', 'Seedling Dome Humidity Cover']
  },
  {
    id: 'stage-seedling',
    step: 2,
    name: 'Seedling Stage',
    durationWeeks: 'Weeks 1 - 3',
    summary: 'First serrated fan leaves emerge. Developing primary root network and stem structure.',
    lightSchedule: '18h Light / 6h Dark (250 - 350 PPFD)',
    temperature: '23°C - 27°C',
    humidity: '65% - 75% RH',
    nutrients: '1/4 strength vegetative formula + CalMag + Seaweed extract.',
    proTip: 'Ensure oscillating breeze to stimulate thick, sturdy stems that will support heavy colas.',
    recommendedGear: ['Clip-on Canopy Fan', 'CalMag Micronutrient Solution', 'Fabric Starter Pots 1L']
  },
  {
    id: 'stage-vegetative',
    step: 3,
    name: 'Vegetative Growth (Veg)',
    durationWeeks: 'Weeks 3 - 8',
    summary: 'Explosive foliage and branching expansion. Ideal window for LST (Low Stress Training) and topping.',
    lightSchedule: '18h Light / 6h Dark (450 - 650 PPFD)',
    temperature: '24°C - 28°C',
    humidity: '55% - 65% RH',
    nutrients: 'High Nitrogen (N) formula, Silica for cellular strength, and beneficial mycorrhizae.',
    proTip: 'Top the main stem above the 4th node to double primary colas and create a flat, even canopy.',
    recommendedGear: ['Apex 720W Quantum LED', '5-Gallon Breathable Fabric Pots', 'Plant Yo-Yos & Soft Ties']
  },
  {
    id: 'stage-flowering',
    step: 4,
    name: 'Flowering & Budding (Bloom)',
    durationWeeks: 'Weeks 8 - 16',
    summary: 'The 12/12 light flip initiates heavy trichome crystal production and swollen sticky calyxes.',
    lightSchedule: '12h Light / 12h Absolute Darkness (750 - 1000+ PPFD with CO2)',
    temperature: '21°C - 26°C (Cooler nights boost anthocyanin purple colors)',
    humidity: '40% - 50% RH (Drop to 35% in late bloom to prevent bud rot)',
    nutrients: 'High Phosphorus (P) & Potassium (K) Bloom Booster, molasses, and terpenes enhancers.',
    proTip: 'Zero light leaks during the 12h dark period to prevent plant stress and herming.',
    recommendedGear: ['Activated Carbon Odor Scrubber', 'Dehumidifier Pro 20L', 'Terpene Carbohydrate Enhancer']
  },
  {
    id: 'stage-harvest',
    step: 5,
    name: 'Harvest, Dry & Sweet Cure',
    durationWeeks: 'Weeks 17 - 20',
    summary: 'Chop when trichomes are 70% cloudy / 30% amber. Slow dry at 16°C/60% RH followed by glass curing.',
    lightSchedule: 'Total Darkness',
    temperature: '15°C - 18°C (60°F)',
    humidity: '58% - 62% RH',
    nutrients: 'Pure flush with Reverse Osmosis water for final 7-10 days.',
    proTip: 'Slow curing for at least 3-4 weeks transforms chlorophyll into smooth, candy-sweet terpenes.',
    recommendedGear: ['60x Jeweler Trichome Loupe', 'Boveda 62% Terpene Shield Packs', 'Airtight Curing Jars']
  }
];
