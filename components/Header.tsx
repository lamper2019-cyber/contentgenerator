'use client';

export default function Header() {
  return (
    <header className="flex items-center justify-center px-6 py-4 border-b border-border animate-fade-in">
      <h1 className="text-xl font-bold tracking-tight">
        <span className="text-accent">RIVEN</span>
        <span className="text-muted font-normal ml-2 text-sm">Content Generator</span>
      </h1>
    </header>
  );
}
