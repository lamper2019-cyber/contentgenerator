'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Generator from '@/components/Generator';
import OutputCard from '@/components/OutputCard';
import SettingsModal from '@/components/SettingsModal';
import { Driver, Pillar, Delivery, GenerateResponse } from '@/lib/types';

export default function Home() {
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [lastDriver, setLastDriver] = useState<Driver | null>(null);
  const [lastPillar, setLastPillar] = useState<Pillar | null>(null);
  const [lastDelivery, setLastDelivery] = useState<Delivery | null>(null);
  const [lastCount, setLastCount] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('riven-api-key');
    if (savedKey) setApiKey(savedKey);
    setMounted(true);
    if (!savedKey) setShowSettings(true);
  }, []);

  const handleSaveApiKey = useCallback((key: string) => {
    setApiKey(key);
    localStorage.setItem('riven-api-key', key);
  }, []);

  const handleGenerate = useCallback(async (
    driver: Driver,
    pillar: Pillar | null,
    delivery: Delivery | null,
    count: number,
    promoDescription?: string
  ) => {
    setIsLoading(true);
    setError(null);
    setOutput(null);
    setLastDriver(driver);
    setLastPillar(pillar);
    setLastDelivery(delivery);
    setLastCount(count);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driver, pillar, delivery, count, apiKey, promoDescription }),
      });

      const data: GenerateResponse = await response.json();

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
  }, [apiKey]);

  const handleRegenerate = useCallback(() => {
    if (lastDriver) {
      handleGenerate(lastDriver, lastPillar, lastDelivery, lastCount);
    }
  }, [lastDriver, lastPillar, lastDelivery, lastCount, handleGenerate]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen animate-fade-in">
      <Header onSettingsClick={() => setShowSettings(true)} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-xl mx-auto py-8 px-4">
          <div className="animate-fade-in-delay-1">
            <Generator
              onGenerate={handleGenerate}
              isLoading={isLoading}
              hasApiKey={!!apiKey}
              onSettingsClick={() => setShowSettings(true)}
            />
          </div>

          {error && (
            <div className="mt-4 p-4 rounded-xl border border-danger/30 bg-danger/10 text-sm text-danger animate-fade-in">
              {error}
            </div>
          )}

          {output && lastDriver && (
            <div className="mt-6 animate-fade-in">
              <OutputCard
                content={output}
                driver={lastDriver}
                pillar={lastPillar}
                count={lastCount}
                onRegenerate={handleRegenerate}
                isLoading={isLoading}
              />
            </div>
          )}

          {!output && !isLoading && !error && (
            <div className="mt-16 text-center animate-fade-in-delay-2">
              <p className="text-2xl font-bold text-foreground/20 mb-2">RIVEN</p>
              <p className="text-muted text-sm">
                Pick your driver and hit generate.
              </p>
              <p className="text-muted/50 text-xs mt-1">
                Pillar and delivery can be auto or chosen. Everything else is random.
              </p>
            </div>
          )}

          {isLoading && (
            <div className="mt-8 animate-fade-in">
              {/* Shimmer skeleton loader */}
              <div className="border border-border rounded-xl bg-surface overflow-hidden">
                <div className="px-4 py-3 border-b border-border">
                  <div className="flex gap-2">
                    <div className="h-5 w-16 rounded animate-shimmer" />
                    <div className="h-5 w-12 rounded animate-shimmer" />
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="h-4 w-full rounded animate-shimmer" />
                  <div className="h-4 w-5/6 rounded animate-shimmer" />
                  <div className="h-4 w-full rounded animate-shimmer" />
                  <div className="h-4 w-4/6 rounded animate-shimmer" />
                  <div className="h-4 w-full rounded animate-shimmer" />
                  <div className="h-4 w-3/6 rounded animate-shimmer" />
                  <div className="h-8 w-full rounded animate-shimmer mt-4" />
                  <div className="h-4 w-full rounded animate-shimmer" />
                  <div className="h-4 w-5/6 rounded animate-shimmer" />
                  <div className="h-4 w-4/6 rounded animate-shimmer" />
                </div>
              </div>
              <p className="text-sm text-muted text-center mt-4">Crafting your scripts...</p>
            </div>
          )}
        </div>
      </main>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />
    </div>
  );
}
