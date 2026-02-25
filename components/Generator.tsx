'use client';

import { useState } from 'react';
import { drivers, pillars } from '@/lib/angles';
import { Driver, Pillar } from '@/lib/types';

interface GeneratorProps {
  onGenerate: (driver: Driver, pillar: Pillar, count: number) => void;
  isLoading: boolean;
  hasApiKey: boolean;
  onSettingsClick: () => void;
}

const countOptions = [1, 2, 3, 4];

export default function Generator({
  onGenerate,
  isLoading,
  hasApiKey,
  onSettingsClick,
}: GeneratorProps) {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);
  const [count, setCount] = useState(1);

  const canGenerate = selectedDriver && selectedPillar && hasApiKey && !isLoading;

  const handleGenerate = () => {
    if (canGenerate) {
      onGenerate(selectedDriver, selectedPillar, count);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Driver Selector */}
      <div>
        <label className="text-xs font-medium text-muted uppercase tracking-wider">
          Driver — What&apos;s the goal?
        </label>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {drivers.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDriver(d.id)}
              className={`text-left p-4 rounded-xl border-2 transition-all ${
                selectedDriver === d.id
                  ? 'border-accent bg-accent-dim text-foreground scale-[1.02]'
                  : 'border-border bg-surface hover:border-border-hover hover:bg-surface-hover text-muted hover:text-foreground'
              }`}
            >
              <span className="text-2xl block mb-1">{d.icon}</span>
              <span className="text-sm font-semibold block">{d.label}</span>
              <span className="text-xs text-muted block mt-0.5">{d.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pillar Selector */}
      <div>
        <label className="text-xs font-medium text-muted uppercase tracking-wider">
          Pillar — What&apos;s it about?
        </label>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {pillars.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPillar(p.id)}
              className={`text-left p-4 rounded-xl border-2 transition-all ${
                selectedPillar === p.id
                  ? 'border-accent bg-accent-dim text-foreground scale-[1.02]'
                  : 'border-border bg-surface hover:border-border-hover hover:bg-surface-hover text-muted hover:text-foreground'
              }`}
            >
              <span className="text-2xl block mb-1">{p.icon}</span>
              <span className="text-sm font-semibold block">{p.label}</span>
              <span className="text-xs text-muted block mt-0.5">{p.description}</span>
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
