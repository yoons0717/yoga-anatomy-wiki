interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="mb-12">
      <h1 className="text-4xl font-black text-black">{title}</h1>
      {subtitle && <p className="mt-2 text-lg text-slate-500 italic">{subtitle}</p>}
    </header>
  );
}
