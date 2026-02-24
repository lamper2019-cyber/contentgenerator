import { ContentTypeOption } from './types';

export const contentTypes: ContentTypeOption[] = [
  {
    id: 'reel',
    label: 'Instagram Reel',
    description: 'Short-form video script (30-60s)',
    icon: '🎬',
  },
  {
    id: 'carousel',
    label: 'Carousel Post',
    description: 'Multi-slide carousel (5-8 slides)',
    icon: '📑',
  },
  {
    id: 'story',
    label: 'Story Sequence',
    description: 'Multi-frame story (4-7 frames)',
    icon: '📱',
  },
  {
    id: 'tiktok',
    label: 'TikTok Script',
    description: 'TikTok video script (15-60s)',
    icon: '🎵',
  },
];
