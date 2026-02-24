import { HOOKS_CONTENT } from '@/content/hooks';
import { PROBLEMS_CONTENT } from '@/content/problems';
import { PITCHES_CONTENT } from '@/content/pitches';

export function getHooks(): string {
  return HOOKS_CONTENT;
}

export function getProblems(): string {
  return PROBLEMS_CONTENT;
}

export function getPitches(): string {
  return PITCHES_CONTENT;
}
