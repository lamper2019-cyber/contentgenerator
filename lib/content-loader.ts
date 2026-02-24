import fs from 'fs';
import path from 'path';

let hooksCache: string | null = null;
let problemsCache: string | null = null;

export function getHooks(): string {
  if (hooksCache) return hooksCache;
  const filePath = path.join(process.cwd(), 'content', 'hooks.txt');
  hooksCache = fs.readFileSync(filePath, 'utf-8');
  return hooksCache;
}

export function getProblems(): string {
  if (problemsCache) return problemsCache;
  const filePath = path.join(process.cwd(), 'content', 'problems.txt');
  problemsCache = fs.readFileSync(filePath, 'utf-8');
  return problemsCache;
}
