import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-edibles',
    name: 'Infused Edibles',
    slug: 'edibles',
    description: 'Buzz Pops, Rainbow Stripz, Distillate Gummies & Artisan Baked Treats.',
    iconName: 'Candy',
    image: '/assets/posters/lifted_snacks_poster.jpg',
    badge: 'Lifted Snacks Official',
    itemCount: 14,
    gradient: 'from-pink-500/20 to-cyan-500/20 border-pink-500/30'
  },
  {
    id: 'cat-herbs',
    name: 'Craft Herbs & Flower',
    slug: 'herbs',
    description: 'AAA+ Hand-trimmed trichome frosted indoor & greenhouse strains.',
    iconName: 'Sparkles',
    image: '/assets/products/12.png',
    badge: 'AAA+ Diamond Grade',
    itemCount: 18,
    gradient: 'from-emerald-500/20 to-cyan-500/20 border-emerald-500/30'
  },
  {
    id: 'cat-extraction',
    name: 'Solventless Concentrates',
    slug: 'extraction',
    description: 'Cold cured live rosin, terp sauce, diamonds & full-melt hash.',
    iconName: 'Flame',
    image: '/assets/products/14.png',
    badge: '90u Live Rosin',
    itemCount: 9,
    gradient: 'from-purple-500/20 to-blue-500/20 border-purple-500/30'
  },
  {
    id: 'cat-smoking-gear',
    name: 'Glass & Smoking Gear',
    slug: 'smoking-gear',
    description: 'Borosilicate rigs, grinders, quartz bangers, papers & smell-proof bags.',
    iconName: 'Zap',
    image: '/assets/products/18.png',
    badge: 'Heavy Glass',
    itemCount: 22,
    gradient: 'from-cyan-500/20 to-blue-600/20 border-cyan-500/30'
  },
  {
    id: 'cat-grow-tech',
    name: 'Grow Tech & Nutrients',
    slug: 'grow-tech',
    description: 'Quantum board LEDs, grow tents, organic amendments & clone gear.',
    iconName: 'SunMedium',
    image: '/assets/products/16.png',
    badge: 'Pro Harvest',
    itemCount: 16,
    gradient: 'from-lime-500/20 to-emerald-600/20 border-lime-500/30'
  }
];
