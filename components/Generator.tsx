'use client';

import { useState, useRef } from 'react';
import { drivers, pillars } from '@/lib/angles';
import { Driver, Pillar, Delivery } from '@/lib/types';

interface GeneratorProps {
  onGenerate: (driver: Driver, pillar: Pillar | null, delivery: Delivery | null, count: number, promoDescription?: string) => void;
  isLoading: boolean;
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
    <div className="glass-card p-6 flex flex-col gap-7">
      {/* Driver Selector — always required */}
      <div className="animate-fade-in">
        <label className="section-label">
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
              className={`selector-card text-left p-4 press-scale ${
                selectedDriver === d.id ? 'active' : ''
              }`}
            >
              <div className="icon-box mb-3">{d.icon}</div>
              <span className="text-sm font-semibold block text-foreground">{d.label}</span>
              <span className="text-xs text-muted block mt-1 leading-relaxed">{d.description}</span>
            </button>
          ))}
        </div>

        {/* Promo Description Input */}
        {selectedDriver === 'promo' && (
          <div className="mt-4 animate-fade-in">
            <label className="section-label block mb-2">
              What are you promoting?
            </label>
            <input
              type="text"
              value={promoDescription}
              onChange={(e) => setPromoDescription(e.target.value)}
              placeholder="e.g. BluBlock sunglasses collab, my 12-week coaching program..."
              className="glass-input w-full px-4 py-3 text-sm text-foreground placeholder:text-muted/40"
            />
            <p className="text-xs text-muted mt-2">Woven into the script organically — not a hard sell</p>
          </div>
        )}
      </div>

      {/* Pillar — toggleable */}
      <div className="animate-fade-in-delay-1">
        <div className="flex items-center justify-between">
          <label className="section-label">
            Pillar — What&apos;s it about?
          </label>
          <button
            onClick={() => {
              setPillarMode(pillarMode === 'auto' ? 'choose' : 'auto');
              if (pillarMode === 'choose') setSelectedPillar(null);
            }}
            className="flex items-center gap-2 text-xs font-medium transition-colors press-scale"
          >
            <div className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${pillarMode === 'choose' ? 'bg-accent' : 'bg-[rgba(255,255,255,0.12)]'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${pillarMode === 'choose' ? 'left-[18px]' : 'left-0.5'}`} />
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
                className={`selector-card text-left p-4 press-scale ${
                  selectedPillar === p.id ? 'active' : ''
                }`}
              >
                <div className="icon-box mb-3">{p.icon}</div>
                <span className="text-sm font-semibold block text-foreground">{p.label}</span>
                <span className="text-xs text-muted block mt-1 leading-relaxed">{p.description}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted mt-2 animate-fade-in">AI picks the best pillar for each script</p>
        )}
      </div>

      {/* Delivery — toggleable */}
      <div className="animate-fade-in-delay-2">
        <div className="flex items-center justify-between">
          <label className="section-label">
            Delivery — How&apos;s it filmed?
          </label>
          <button
            onClick={() => {
              setDeliveryMode(deliveryMode === 'auto' ? 'choose' : 'auto');
              if (deliveryMode === 'choose') setSelectedDelivery(null);
            }}
            className="flex items-center gap-2 text-xs font-medium transition-colors press-scale"
          >
            <div className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${deliveryMode === 'choose' ? 'bg-accent' : 'bg-[rgba(255,255,255,0.12)]'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${deliveryMode === 'choose' ? 'left-[18px]' : 'left-0.5'}`} />
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
                className={`selector-card text-left p-4 press-scale ${
                  selectedDelivery === d.id ? 'active' : ''
                }`}
              >
                <div className="icon-box mb-2">{d.icon}</div>
                <span className="text-sm font-semibold block text-foreground">{d.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted mt-2 animate-fade-in">AI picks the best delivery for each script</p>
        )}
      </div>

      {/* Count Selector */}
      <div className="animate-fade-in-delay-3">
        <label className="section-label">
          How many scripts?
        </label>
        <div className="flex gap-3 mt-3">
          {countOptions.map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={`flex-1 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 press-scale ${
                count === n
                  ? 'bg-accent-dim text-accent border border-accent/40'
                  : 'glass-card-sm text-muted hover:text-foreground'
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
          className={`btn-gold w-full py-4 text-base press-scale ${
            btnAnimating ? 'animate-btn-press animate-gold-pulse' : ''
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              Crafting {count} script{count > 1 ? 's' : ''}...
            </span>
          ) : (
            `Generate ${count} Script${count > 1 ? 's' : ''}`
          )}
        </button>
      </div>
    </div>
  );
}
