'use client';

import { useState } from 'react';
import { drivers, pillars } from '@/lib/angles';
import { Driver, Pillar, Delivery } from '@/lib/types';

interface GeneratorProps {
  onGenerate: (driver: Driver, pillar: Pillar | null, delivery: Delivery | null, count: number) => void;
  isLoading: boolean;
  hasApiKey: boolean;
  onSettingsClick: () => void;
}

const countOptions = [1, 2, 3, 4];

const deliveryOptions: { id: Delivery; label: string; icon: string }[] = [
  { id: 'face-to-camera', label: 'Face to Camera', icon: '🎥' },
  { id: 'montage', label: 'Montage', icon: '🎬' },
  { id: 'day-in-the-life', label: 'Day in the Life', icon: '🚶' },
  { id: 'reaction', label: 'Reaction', icon: '💬' },
];

export default function Generator({
  onGenerate,
  isLoading,
  hasApiKey,
  onSettingsClick,
}: GeneratorProps) {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [pillarMode, setPillarMode] = useState<'auto' | 'choose'>('auto');
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);
  const [deliveryMode, setDeliveryMode] = useState<'auto' | 'choose'>('auto');
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [count, setCount] = useState(1);

  const canGenerate =
    selectedDriver &&
    hasApiKey &&
    !isLoading &&
    (pillarMode === 'auto' || selectedPillar) &&
    (deliveryMode === 'auto' || selectedDelivery);

  const handleGenerate = () => {
    if (canGenerate) {
      onGenerate(
        selectedDriver,
        pillarMode === 'auto' ? null : selectedPillar,
        deliveryMode === 'auto' ? null : selectedDelivery,
        count
      );
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Driver Selector — always required */}
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

      {/* Pillar — toggleable */}
      <div>
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-muted uppercase tracking-wider">
            Pillar — What&apos;s it about?
          </label>
          <button
            onClick={() => {
              setPillarMode(pillarMode === 'auto' ? 'choose' : 'auto');
              if (pillarMode === 'choose') setSelectedPillar(null);
            }}
            className="flex items-center gap-1.5 text-xs font-medium transition-colors"
          >
            <div className={`relative w-8 h-4.5 rounded-full transition-colors ${pillarMode === 'choose' ? 'bg-accent' : 'bg-border'}`}>
              <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-all ${pillarMode === 'choose' ? 'left-4' : 'left-0.5'}`} />
            </div>
            <span className={pillarMode === 'choose' ? 'text-accent' : 'text-muted'}>
              {pillarMode === 'choose' ? 'Choose' : 'Auto'}
            </span>
          </button>
        </div>
        {pillarMode === 'choose' ? (
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
        ) : (
          <p className="text-xs text-muted mt-2">AI will pick the best pillar for each script</p>
        )}
      </div>

      {/* Delivery — toggleable */}
      <div>
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-muted uppercase tracking-wider">
            Delivery — How&apos;s it filmed?
          </label>
          <button
            onClick={() => {
              setDeliveryMode(deliveryMode === 'auto' ? 'choose' : 'auto');
              if (deliveryMode === 'choose') setSelectedDelivery(null);
            }}
            className="flex items-center gap-1.5 text-xs font-medium transition-colors"
          >
            <div className={`relative w-8 h-4.5 rounded-full transition-colors ${deliveryMode === 'choose' ? 'bg-accent' : 'bg-border'}`}>
              <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-all ${deliveryMode === 'choose' ? 'left-4' : 'left-0.5'}`} />
            </div>
            <span className={deliveryMode === 'choose' ? 'text-accent' : 'text-muted'}>
              {deliveryMode === 'choose' ? 'Choose' : 'Auto'}
            </span>
          </button>
        </div>
        {deliveryMode === 'choose' ? (
          <div className="grid grid-cols-2 gap-3 mt-3">
            {deliveryOptions.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDelivery(d.id)}
                className={`text-left p-3 rounded-xl border-2 transition-all ${
                  selectedDelivery === d.id
                    ? 'border-accent bg-accent-dim text-foreground scale-[1.02]'
                    : 'border-border bg-surface hover:border-border-hover hover:bg-surface-hover text-muted hover:text-foreground'
                }`}
              >
                <span className="text-xl block mb-1">{d.icon}</span>
                <span className="text-sm font-semibold block">{d.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted mt-2">AI will pick the best delivery for each script</p>
        )}
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
