interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="mb-14 space-y-2">
      <h1 className="text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase">Archive</h1>
      <h2 className="text-4xl font-black tracking-tighter text-stone-900">{title}</h2>
      {subtitle && (
        <p className="text-sm leading-relaxed font-medium text-stone-500 italic">{subtitle}</p>
      )}
    </header>
  );
}
