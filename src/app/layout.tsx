import './globals.css';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen bg-white text-slate-950">
        <aside className="w-64 border-r border-slate-200 bg-white p-8">
          <h1 className="mb-10 text-xl font-black tracking-tighter text-black">ANATOMY</h1>
          <nav className="space-y-6 font-bold text-slate-500">
            <a href="/" className="block transition hover:text-black">
              홈
            </a>
            <a href="/muscles" className="block transition hover:text-black">
              근육 사전
            </a>
            <a href="/asanas" className="block transition hover:text-black">
              아사나 사전
            </a>
          </nav>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center border-b border-slate-200 bg-white px-8 text-sm font-semibold text-slate-500">
            YOGA ANATOMY ARCHIVE
          </header>
          <main className="flex-1 bg-white p-12 text-slate-950">{children}</main>
          <footer className="flex h-16 items-center border-t border-slate-200 bg-white px-8 text-xs text-slate-400">
            © 2026 Yoga Anatomy Archive.
          </footer>
        </div>
      </body>
    </html>
  );
}
