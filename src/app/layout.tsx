import Link from 'next/link';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Anatomy Archive | 인체 해부학 도감',
  description: '요가 아사나와 근육을 위한 직관적인 해부학 아카이브',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-stone-100 font-sans text-stone-900 antialiased">
        <header className="sticky top-0 z-50 bg-stone-100/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8 sm:py-5">
            <Link href="/" className="group flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2">
              <div className="h-5 w-5 rounded-full bg-slate-900 transition-colors sm:h-7 sm:w-7" />
              <h1 className="text-xl font-black tracking-tighter text-slate-950 uppercase sm:text-3xl">
                ANATOMY. <span className="font-light text-slate-400 lowercase">archive</span>
              </h1>
            </Link>

            <nav className="flex gap-4 text-[11px] font-black tracking-widest text-slate-500 sm:gap-8 sm:text-sm">
              <Link href="/" className="rounded transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2">
                HOME
              </Link>
              <Link href="/muscles" className="rounded transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2">
                ANATOMY
              </Link>
              <Link href="/asanas" className="rounded transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2">
                ASANAS
              </Link>
              <Link href="/chat" className="rounded transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2">
                ASK
              </Link>
              <Link href="/sequence" className="rounded transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2">
                SEQUENCE
              </Link>
            </nav>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 pt-4 pb-12 sm:px-8 sm:pt-6 sm:pb-16">
          <main className="rounded-[2rem] border border-white/50 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] sm:rounded-[2.5rem] sm:p-16">
            {children}
          </main>

          <footer className="mt-12 px-6 text-center text-[10px] tracking-tighter text-slate-500 sm:text-xs">
            <p>© 2026 Anatomy Archive Project. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
