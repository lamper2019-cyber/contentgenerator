'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Generator from '@/components/Generator';
import OutputCard from '@/components/OutputCard';
import SettingsModal from '@/components/SettingsModal';
import { Driver, Pillar, GenerateResponse } from '@/lib/types';

export default function Home() {
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [lastDriver, setLastDriver] = useState<Driver | null>(null);
  const [lastPillar, setLastPillar] = useState<Pillar | null>(null);
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
    pillar: Pillar,
    count: number
  ) => {
    setIsLoading(true);
    setError(null);
    setLastDriver(driver);
    setLastPillar(pillar);
    setLastCount(count);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driver, pillar, count, apiKey }),
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
    if (lastDriver && lastPillar) {
      handleGenerate(lastDriver, lastPillar, lastCount);
    }
  }, [lastDriver, lastPillar, lastCount, handleGenerate]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header onSettingsClick={() => setShowSettings(true)} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-xl mx-auto py-8 px-4">
          <Generator
            onGenerate={handleGenerate}
            isLoading={isLoading}
            hasApiKey={!!apiKey}
            onSettingsClick={() => setShowSettings(true)}
          />

          {error && (
            <div className="mt-4 p-4 rounded-xl border border-danger/30 bg-danger/10 text-sm text-danger">
              {error}
            </div>
          )}

          {output && lastDriver && lastPillar && (
            <div className="mt-6">
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
            <div className="mt-16 text-center">
              <p className="text-2xl font-bold text-foreground/20 mb-2">RIVEN</p>
              <p className="text-muted text-sm">
                Pick your driver, choose a pillar, and hit generate.
              </p>
              <p className="text-muted/50 text-xs mt-1">
                Delivery, value, problem, and hook are auto-selected for you.
              </p>
            </div>
          )}

          {isLoading && !output && (
            <div className="mt-12 flex flex-col items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" style={{ animationDelay: '0s' }} />
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" style={{ animationDelay: '0.4s' }} />
              </div>
              <p className="text-sm text-muted">Building your scripts...</p>
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
