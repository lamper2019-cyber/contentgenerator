'use client';

import { useState, useRef } from 'react';
import { drivers, pillars } from '@/lib/angles';
import { Driver, Pillar, Delivery } from '@/lib/types';

interface GeneratorProps {
  onGenerate: (driver: Driver, pillar: Pillar | null, delivery: Delivery | null, count: number, promoDescription?: string) => void;
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
  const [promoDescription, setPromoDescription] = useState('');
  const [pillarMode, setPillarMode] = useState<'auto' | 'choose'>('auto');
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);
  const [deliveryMode, setDeliveryMode] = useState<'auto' | 'choose'>('auto');
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [count, setCount] = useState(1);
  const [btnAnimating, setBtnAnimating] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const canGenerate =
    selectedDriver &&
    hasApiKey &&
    !isLoading &&
    (pillarMode === 'auto' || selectedPillar) &&
    (deliveryMode === 'auto' || selectedDelivery) &&
    (selectedDriver !== 'promo' || promoDescription.trim().length > 0);

  const handleGenerate = () => {
    if (canGenerate) {
      setBtnAnimating(true);
      setTimeout(() => setBtnAnimating(false), 600);
      onGenerate(
        selectedDriver,
        pillarMode === 'auto' ? null : selectedPillar,
        deliveryMode === 'auto' ? null : selectedDelivery,
        count,
        selectedDriver === 'promo' ? promoDescription.trim() : undefined
      );
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Driver Selector — always required */}
      <div className="animate-fade-in">
        <label className="text-xs font-medium text-muted uppercase tracking-wider">
          Driver — What&apos;s the goal?
        </label>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {drivers.map((d) => (
            <button
              key={d.id}
              onClick={() => {
                setSelectedDriver(d.id);
                if (d.id !== 'promo') setPromoDescription('');
              }}
              className={`text-left p-4 rounded-xl border-2 transition-all duration-200 hover-lift press-scale ${
                selectedDriver === d.id
                  ? 'border-accent bg-accent-dim text-foreground'
                  : 'border-border bg-surface hover:border-border-hover hover:bg-surface-hover text-muted hover:text-foreground'
              }`}
            >
              <span className="text-2xl block mb-1">{d.icon}</span>
              <span className="text-sm font-semibold block">{d.label}</span>
              <span className="text-xs text-muted block mt-0.5">{d.description}</span>
            </button>
          ))}
        </div>

        {/* Promo Description Input — only shows when Promo driver is selected */}
        {selectedDriver === 'promo' && (
          <div className="mt-4 animate-fade-in">
            <label className="text-xs font-medium text-muted uppercase tracking-wider block mb-2">
              What are you promoting?
            </label>
            <input
              type="text"
              value={promoDescription}
              onChange={(e) => setPromoDescription(e.target.value)}
              placeholder="e.g. BluBlock sunglasses collab, my 12-week coaching program, a friend's meal prep brand..."
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted/50 focus:border-accent transition-colors"
            />
            <p className="text-xs text-muted mt-1.5">This gets woven into the script organically — not a hard sell</p>
          </div>
        )}
      </div>

      {/* Pillar — toggleable */}
      <div className="animate-fade-in-delay-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-muted uppercase tracking-wider">
            Pillar — What&apos;s it about?
          </label>
          <button
            onClick={() => {
              setPillarMode(pillarMode === 'auto' ? 'choose' : 'auto');
              if (pillarMode === 'choose') setSelectedPillar(null);
            }}
            className="flex items-center gap-1.5 text-xs font-medium transition-colors press-scale"
          >
            <div className={`relative w-8 h-4.5 rounded-full transition-colors duration-200 ${pillarMode === 'choose' ? 'bg-accent' : 'bg-border'}`}>
              <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-all duration-200 ${pillarMode === 'choose' ? 'left-4' : 'left-0.5'}`} />
            </div>
            <span className={`transition-colors duration-200 ${pillarMode === 'choose' ? 'text-accent' : 'text-muted'}`}>
              {pillarMode === 'choose' ? 'Choose' : 'Auto'}
            </span>
          </button>
        </div>
        {pillarMode === 'choose' ? (
          <div className="grid grid-cols-2 gap-3 mt-3 animate-fade-in">
            {pillars.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPillar(p.id)}
                className={`text-left p-4 rounded-xl border-2 transition-all duration-200 hover-lift press-scale ${
                  selectedPillar === p.id
                    ? 'border-accent bg-accent-dim text-foreground'
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
          <p className="text-xs text-muted mt-2 animate-fade-in">AI will pick the best pillar for each script</p>
        )}
      </div>

      {/* Delivery — toggleable */}
      <div className="animate-fade-in-delay-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-muted uppercase tracking-wider">
            Delivery — How&apos;s it filmed?
          </label>
          <button
            onClick={() => {
              setDeliveryMode(deliveryMode === 'auto' ? 'choose' : 'auto');
              if (deliveryMode === 'choose') setSelectedDelivery(null);
            }}
            className="flex items-center gap-1.5 text-xs font-medium transition-colors press-scale"
          >
            <div className={`relative w-8 h-4.5 rounded-full transition-colors duration-200 ${deliveryMode === 'choose' ? 'bg-accent' : 'bg-border'}`}>
              <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-all duration-200 ${deliveryMode === 'choose' ? 'left-4' : 'left-0.5'}`} />
            </div>
            <span className={`transition-colors duration-200 ${deliveryMode === 'choose' ? 'text-accent' : 'text-muted'}`}>
              {deliveryMode === 'choose' ? 'Choose' : 'Auto'}
            </span>
          </button>
        </div>
        {deliveryMode === 'choose' ? (
          <div className="grid grid-cols-2 gap-3 mt-3 animate-fade-in">
            {deliveryOptions.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDelivery(d.id)}
                className={`text-left p-3 rounded-xl border-2 transition-all duration-200 hover-lift press-scale ${
                  selectedDelivery === d.id
                    ? 'border-accent bg-accent-dim text-foreground'
                    : 'border-border bg-surface hover:border-border-hover hover:bg-surface-hover text-muted hover:text-foreground'
                }`}
              >
                <span className="text-xl block mb-1">{d.icon}</span>
                <span className="text-sm font-semibold block">{d.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted mt-2 animate-fade-in">AI will pick the best delivery for each script</p>
        )}
      </div>

      {/* Count Selector */}
      <div className="animate-fade-in-delay-3">
        <label className="text-xs font-medium text-muted uppercase tracking-wider">
          How many scripts?
        </label>
        <div className="flex gap-2 mt-3">
          {countOptions.map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 press-scale ${
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
      <div className="animate-fade-in-delay-4">
        <button
          ref={btnRef}
          onClick={handleGenerate}
          disabled={!canGenerate}
          className={`w-full py-4 rounded-xl font-semibold text-base transition-all duration-200 ${
            btnAnimating ? 'animate-btn-press animate-gold-pulse' : ''
          } ${
            canGenerate
              ? 'bg-accent hover:bg-accent-hover text-background cursor-pointer shadow-lg shadow-accent/20 press-scale'
              : 'bg-surface border-2 border-border text-muted cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              Crafting {count} script{count > 1 ? 's' : ''}...
            </span>
          ) : (
            `Generate ${count} Script${count > 1 ? 's' : ''}`
          )}
        </button>
      </div>

      {/* Status Messages */}
      {!hasApiKey && (
        <p className="text-xs text-center text-muted animate-fade-in">
          <button onClick={onSettingsClick} className="text-accent hover:underline">
            Add your API key
          </button>{' '}
          to start generating
        </p>
      )}
    </div>
  );
}
