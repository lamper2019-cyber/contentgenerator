import { DriverOption, PillarOption } from './types';

export const drivers: DriverOption[] = [
  {
    id: 'leads',
    label: 'Leads',
    description: 'Get comments & community signups',
    icon: '🧲',
  },
  {
    id: 'promo',
    label: 'Promo',
    description: 'Promote anything — collabs, courses, products, people',
    icon: '📣',
  },
  {
    id: 'growth',
    label: 'Growth',
    description: 'Reach new people who don\'t follow yet',
    icon: '📈',
  },
  {
    id: 'nurture',
    label: 'Nurture',
    description: 'Build trust with current followers',
    icon: '🤝',
  },
];

export const pillars: PillarOption[] = [
  {
    id: 'protein',
    label: 'Protein',
    description: '40g before noon, meal combos, real gram counts',
    icon: '🥩',
  },
  {
    id: 'the-nos',
    label: 'The NOs',
    description: 'Eliminating sugary drinks, fried food, processed carbs',
    icon: '🚫',
  },
  {
    id: 'mindset',
    label: 'Mindset',
    description: 'Identity, self-sabotage, quitting cycles',
    icon: '🧠',
  },
  {
    id: 'myth-busting',
    label: 'Myth-Busting',
    description: 'Debunking common fitness & diet beliefs',
    icon: '💥',
  },
];
