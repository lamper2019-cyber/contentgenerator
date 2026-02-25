export type ContentType = 'reel' | 'carousel' | 'story' | 'tiktok';

export type CtaMode = 'riven' | 'custom';

export type ToneMode = 'tactical' | 'emotional';

export interface ContentTypeOption {
  id: ContentType;
  label: string;
  description: string;
  icon: string;
}

export interface GenerateRequest {
  contentType: ContentType;
  count: number;
  problemsPerScript: number;
  toneMode: ToneMode;
  ctaMode: CtaMode;
  customCta: string;
  apiKey: string;
}

export interface GenerateResponse {
  content: string;
  error?: string;
}
