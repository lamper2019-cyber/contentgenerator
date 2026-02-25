'use client';

import { useState } from 'react';
import { Driver, Pillar } from '@/lib/types';
import { drivers, pillars } from '@/lib/angles';

interface OutputCardProps {
  content: string;
  driver: Driver;
  pillar: Pillar;
  count: number;
  onRegenerate: () => void;
  isLoading: boolean;
}

export default function OutputCard({
  content,
  driver,
  pillar,
  count,
  onRegenerate,
  isLoading,
}: OutputCardProps) {
  const [copied, setCopied] = useState(false);

  const driverLabel = drivers.find((d) => d.id === driver)?.label ?? '';
  const pillarLabel = pillars.find((p) => p.id === pillar)?.label ?? '';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-border rounded-xl bg-surface overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded bg-accent-dim text-accent font-medium">
            {driverLabel}
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-surface-hover text-muted font-medium">
            {pillarLabel}
          </span>
          <span className="text-xs text-muted">
            {count} script{count > 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Copied
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                Copy All
              </>
            )}
          </button>
          <button
            onClick={onRegenerate}
            disabled={isLoading}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md text-muted hover:text-foreground hover:bg-surface-hover transition-colors disabled:opacity-50"
          >
            <svg className={isLoading ? 'animate-spin' : ''} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
            Regenerate
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 text-sm leading-relaxed whitespace-pre-wrap">
        {content}
      </div>
    </div>
  );
}
