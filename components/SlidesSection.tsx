'use client';

import { useState } from 'react';

export default function SlidesSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setOutput(null);

    try {
      const response = await fetch('/api/slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Generation failed');
        return;
      }

      setOutput(data.content);
    } catch {
      setError('Network error. Check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    const clean = output.replace(/\*\*([^*]+)\*\*/g, '$1');
    await navigator.clipboard.writeText(clean);
    setCopied(true);
    setShowToast(true);
    setTimeout(() => setCopied(false), 2000);
    setTimeout(() => setShowToast(false), 1800);
  };

  function renderContent(text: string) {
    let lineIndex = 0;

    return text.split('\n').map((line, i) => {
      const trimmed = line.trim();

      if (trimmed === '---') {
        lineIndex++;
        return <hr key={i} className="my-3 border-border animate-line-appear" style={{ animationDelay: `${lineIndex * 30}ms` }} />;
      }

      if (trimmed === '') {
        return <div key={i} className="h-2" />;
      }

      lineIndex++;
      const delay = lineIndex * 30;

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
      <div className="animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-lg font-bold tracking-tight text-foreground">Slides</span>
          <span className="text-xs text-muted">Random problem, full presentation</span>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 bg-surface border border-border text-foreground hover:border-accent/50 hover:text-accent disabled:opacity-50 press-scale"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              Generating slides...
            </span>
          ) : (
            'Generate Slide Deck'
          )}
        </button>

        {error && (
          <div className="mt-4 p-4 rounded-xl border border-danger/30 bg-danger/10 text-sm text-danger animate-fade-in">
            {error}
          </div>
        )}

        {output && (
          <div className="mt-4 border border-border rounded-xl bg-surface overflow-hidden animate-fade-in">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-xs px-2 py-0.5 rounded bg-accent-dim text-accent font-medium">
                Slides
              </span>
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
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md text-muted hover:text-foreground hover:bg-surface-hover transition-all duration-200 disabled:opacity-50 hover-lift press-scale"
                >
                  <svg className={isLoading ? 'animate-spin' : ''} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
                  Regenerate
                </button>
              </div>
            </div>
            <div className="p-5 text-sm">
              {renderContent(output)}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="mt-4 animate-fade-in">
            <div className="border border-border rounded-xl bg-surface overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <div className="h-5 w-16 rounded animate-shimmer" />
              </div>
              <div className="p-5 space-y-3">
                <div className="h-4 w-full rounded animate-shimmer" />
                <div className="h-4 w-5/6 rounded animate-shimmer" />
                <div className="h-4 w-full rounded animate-shimmer" />
                <div className="h-4 w-4/6 rounded animate-shimmer" />
                <div className="h-4 w-full rounded animate-shimmer" />
                <div className="h-4 w-3/6 rounded animate-shimmer" />
              </div>
            </div>
            <p className="text-sm text-muted text-center mt-4">Building your slide deck...</p>
          </div>
        )}
      </div>

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
