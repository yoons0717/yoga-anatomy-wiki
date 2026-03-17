import Link from 'next/link';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Anatomy Archive | 인체 해부학 도감',
  description: '요가 아사나와 근육을 위한 직관적인 해부학 아카이브',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="min-h-screen bg-stone-100 font-sans text-stone-900 antialiased">
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-16">
          <header className="mb-10 flex items-center justify-between px-2">
            <Link href="/" className="group flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-slate-900 transition-colors" />
              <h1 className="text-3xl font-black tracking-tighter text-slate-950">
                ANATOMY. <span className="font-light text-slate-400">archive</span>
              </h1>
            </Link>
            <nav className="flex gap-8 text-base font-semibold text-slate-600">
              <Link href="/" className="transition hover:text-slate-950">
                HOME
              </Link>
              <Link href="/muscles" className="transition hover:text-slate-950">
                ANATOMY
              </Link>
              <Link href="/asanas" className="transition hover:text-slate-950">
                ASANAS
              </Link>
            </nav>
          </header>
          <main className="rounded-[2.5rem] border border-slate-50 bg-white p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-16">
            {children}
          </main>
          <footer className="mt-12 px-6 text-center text-sm text-slate-500">
            <p>© 2026 Anatomy Archive Project. All rights reserved.</p>
            <p className="mt-1 text-xs text-slate-400">
              Curated with precision, sourced with care.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
