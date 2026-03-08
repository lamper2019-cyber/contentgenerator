'use client';

export default function Header() {
  return (
    <header className="px-6 py-5 animate-fade-in">
      <div className="max-w-xl mx-auto flex items-center gap-4">
        {/* Brand icon with gold gradient glow */}
        <div
          className="w-[46px] h-[46px] rounded-2xl grid place-items-center font-extrabold text-lg text-background shrink-0"
          style={{
            background: 'linear-gradient(135deg, #C9A84C, #a8893a)',
            boxShadow: '0 10px 40px rgba(201, 168, 76, 0.35)',
          }}
        >
          R
        </div>
        <div>
          <h1 className="text-[17px] font-bold tracking-tight leading-tight">
            <span className="text-accent">RIVEN</span>
          </h1>
          <p className="text-xs text-muted mt-0.5">Content Generator</p>
        </div>
      </div>
    </header>
  );
}
