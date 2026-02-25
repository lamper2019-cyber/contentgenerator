export type Driver = 'leads' | 'income' | 'growth' | 'nurture';

export type Pillar = 'protein' | 'the-nos' | 'mindset' | 'myth-busting';

export type Delivery = 'face-to-camera' | 'voiceover-broll' | 'text-on-screen' | 'reaction';

export type Value = 'educational' | 'relatable' | 'inspirational' | 'entertaining';

export type HookType =
  | 'conspiracy-implication'
  | 'immediate-effects'
  | 'relatable-symptoms'
  | 'scientific-explanation'
  | 'common-misconception';

export interface DriverOption {
  id: Driver;
  label: string;
  description: string;
  icon: string;
}

export interface PillarOption {
  id: Pillar;
  label: string;
  description: string;
  icon: string;
}

export interface GenerateRequest {
  driver: Driver;
  pillar: Pillar;
  count: number;
  apiKey: string;
}

export interface GenerateResponse {
  content: string;
  error?: string;
}
