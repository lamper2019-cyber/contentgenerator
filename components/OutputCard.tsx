'use client';

import { useState } from 'react';
import { Driver, Pillar } from '@/lib/types';
import { drivers, pillars } from '@/lib/angles';

interface OutputCardProps {
  content: string;
  driver: Driver;
  pillar: Pillar | null;
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
  const [showToast, setShowToast] = useState(false);

  const driverLabel = drivers.find((d) => d.id === driver)?.label ?? '';
  const pillarLabel = pillar ? pillars.find((p) => p.id === pillar)?.label ?? '' : 'Auto';

  const handleCopy = async () => {
    const clean = content.replace(/\*\*([^*]+)\*\*/g, '$1');
    await navigator.clipboard.writeText(clean);
    setCopied(true);
    setShowToast(true);
    setTimeout(() => setCopied(false), 2000);
    setTimeout(() => setShowToast(false), 1800);
  };

  // Simple markdown-to-JSX renderer with line-by-line animation
  function renderContent(text: string) {
    let lineIndex = 0;

    return text.split('\n').map((line, i) => {
      const trimmed = line.trim();

      // === separator between scripts
      if (trimmed === '===') {
        lineIndex++;
        return <hr key={i} className="my-6 border-accent/30 border-t-2 animate-line-appear" style={{ animationDelay: `${lineIndex * 30}ms` }} />;
      }

      // --- separator for metadata block
      if (trimmed === '---') {
        lineIndex++;
        return <hr key={i} className="my-3 border-border animate-line-appear" style={{ animationDelay: `${lineIndex * 30}ms` }} />;
      }

      // Empty line
      if (trimmed === '') {
        return <div key={i} className="h-2" />;
      }

      lineIndex++;
      const delay = lineIndex * 30;

      // Render **bold** inline
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const rendered = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={j} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={j}>{part}</span>;
      });

      return (
        <p key={i} className="leading-relaxed animate-line-appear" style={{ animationDelay: `${delay}ms` }}>
          {rendered}
        </p>
      );
    });
  }

  return (
    <>
      <div className="border border-border rounded-xl bg-surface overflow-hidden animate-fade-in">
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
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md text-muted hover:text-foreground hover:bg-surface-hover transition-all duration-200 hover-lift press-scale"
            >
              {copied ? (
                <>
                  <svg className="animate-check-pop text-accent" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  <span className="text-accent">Copied</span>
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
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md text-muted hover:text-foreground hover:bg-surface-hover transition-all duration-200 disabled:opacity-50 hover-lift press-scale"
            >
              <svg className={isLoading ? 'animate-spin' : ''} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
              Regenerate
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 text-sm">
          {renderContent(content)}
        </div>
      </div>

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-toast">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-accent/30 rounded-xl shadow-lg shadow-black/30">
            <svg className="text-accent" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            <span className="text-sm font-medium text-foreground">Copied to clipboard</span>
          </div>
        </div>
      )}
    </>
  );
}
