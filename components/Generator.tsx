'use client';

import { useState } from 'react';
import { contentTypes } from '@/lib/angles';
import { ContentType, CtaMode } from '@/lib/types';

interface GeneratorProps {
  onGenerate: (contentType: ContentType, count: number, problemsPerScript: number, ctaMode: CtaMode, customCta: string) => void;
  isLoading: boolean;
  hasApiKey: boolean;
  onSettingsClick: () => void;
}

const countOptions = [1, 2, 3, 4];
const problemsOptions = [1, 2, 3];

export default function Generator({
  onGenerate,
  isLoading,
  hasApiKey,
  onSettingsClick,
}: GeneratorProps) {
  const [selectedType, setSelectedType] = useState<ContentType | null>(null);
  const [count, setCount] = useState(1);
  const [problemsPerScript, setProblemsPerScript] = useState(1);
  const [ctaMode, setCtaMode] = useState<CtaMode>('riven');
  const [customCta, setCustomCta] = useState('');

  const canGenerate = selectedType && hasApiKey && !isLoading && (ctaMode === 'riven' || customCta.trim().length > 0);

  const handleGenerate = () => {
    if (canGenerate) {
      onGenerate(selectedType, count, problemsPerScript, ctaMode, customCta.trim());
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Content Type Selector */}
      <div>
        <label className="text-xs font-medium text-muted uppercase tracking-wider">
          What are you creating?
        </label>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {contentTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`text-left p-4 rounded-xl border-2 transition-all ${
                selectedType === type.id
                  ? 'border-accent bg-accent-dim text-foreground scale-[1.02]'
                  : 'border-border bg-surface hover:border-border-hover hover:bg-surface-hover text-muted hover:text-foreground'
              }`}
            >
              <span className="text-2xl block mb-1">{type.icon}</span>
              <span className="text-sm font-semibold block">{type.label}</span>
              <span className="text-xs text-muted block mt-0.5">{type.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Count Selector */}
      <div>
        <label className="text-xs font-medium text-muted uppercase tracking-wider">
          How many scripts?
        </label>
        <div className="flex gap-2 mt-3">
          {countOptions.map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                count === n
                  ? 'border-accent bg-accent-dim text-foreground'
                  : 'border-border bg-surface hover:border-border-hover hover:bg-surface-hover text-muted hover:text-foreground'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Problems Per Script Selector */}
      <div>
        <label className="text-xs font-medium text-muted uppercase tracking-wider">
          Problems per script
        </label>
        <div className="flex gap-2 mt-3">
          {problemsOptions.map((n) => (
            <button
              key={n}
              onClick={() => setProblemsPerScript(n)}
              className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                problemsPerScript === n
                  ? 'border-accent bg-accent-dim text-foreground'
                  : 'border-border bg-surface hover:border-border-hover hover:bg-surface-hover text-muted hover:text-foreground'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted mt-1.5">
          {problemsPerScript === 1 && 'One focused problem per script'}
          {problemsPerScript === 2 && 'Two related problems woven together'}
          {problemsPerScript === 3 && 'Three problems addressed in one script'}
        </p>
      </div>

      {/* CTA Selector */}
      <div>
        <label className="text-xs font-medium text-muted uppercase tracking-wider">
          Call to Action
        </label>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setCtaMode('riven')}
            className={`flex-1 p-3 rounded-xl border-2 text-left transition-all ${
              ctaMode === 'riven'
                ? 'border-accent bg-accent-dim text-foreground'
                : 'border-border bg-surface hover:border-border-hover hover:bg-surface-hover text-muted hover:text-foreground'
            }`}
          >
            <span className="text-sm font-semibold block">RIVEN CTA</span>
            <span className="text-xs text-muted block mt-0.5">Free guide offer</span>
          </button>
          <button
            onClick={() => setCtaMode('custom')}
            className={`flex-1 p-3 rounded-xl border-2 text-left transition-all ${
              ctaMode === 'custom'
                ? 'border-accent bg-accent-dim text-foreground'
                : 'border-border bg-surface hover:border-border-hover hover:bg-surface-hover text-muted hover:text-foreground'
            }`}
          >
            <span className="text-sm font-semibold block">Custom CTA</span>
            <span className="text-xs text-muted block mt-0.5">Paste your own</span>
          </button>
        </div>

        {/* RIVEN CTA Preview */}
        {ctaMode === 'riven' && (
          <div className="mt-3 p-3 rounded-lg bg-surface border border-border text-xs text-muted leading-relaxed">
            Variations of: &ldquo;I have a free guide that&apos;ll help you with this — it breaks down exactly what to do step by step. Drop RIVEN in the comments for it.&rdquo;
          </div>
        )}

        {/* Custom CTA Input */}
        {ctaMode === 'custom' && (
          <textarea
            value={customCta}
            onChange={(e) => setCustomCta(e.target.value)}
            placeholder="Paste your CTA here... e.g. 'Link in bio to book your free consultation' or 'Use code RIVEN20 for 20% off'"
            className="w-full mt-3 px-4 py-3 bg-surface border border-border rounded-lg text-sm text-foreground placeholder:text-muted/50 focus:border-accent transition-colors resize-none h-24"
          />
        )}
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!canGenerate}
        className={`w-full py-4 rounded-xl font-semibold text-base transition-all ${
          canGenerate
            ? 'bg-accent hover:bg-accent-hover text-white cursor-pointer shadow-lg shadow-accent/20'
            : 'bg-surface border-2 border-border text-muted cursor-not-allowed'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Generating {count} script{count > 1 ? 's' : ''}...
          </span>
        ) : (
          `Generate ${count} Script${count > 1 ? 's' : ''}`
        )}
      </button>

      {/* Status Messages */}
      {!hasApiKey && (
        <p className="text-xs text-center text-muted">
          <button onClick={onSettingsClick} className="text-accent hover:underline">
            Add your API key
          </button>{' '}
          to start generating
        </p>
      )}
    </div>
  );
}
