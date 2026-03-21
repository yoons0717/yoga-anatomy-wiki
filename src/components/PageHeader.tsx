interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="mb-10 space-y-2 sm:mb-14">
      <h1 className="text-[9px] font-bold tracking-[0.3em] text-stone-400 uppercase sm:text-[10px]">
        Archive
      </h1>
      <h2 className="text-3xl leading-tight font-black tracking-tighter text-stone-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[13px] leading-relaxed font-medium break-keep text-stone-500 italic sm:text-sm">
          {subtitle}
        </p>
      )}
    </header>
  );
}
