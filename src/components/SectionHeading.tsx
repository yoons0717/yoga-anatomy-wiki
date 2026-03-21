export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-6 border-l-4 border-stone-900 pl-4 text-xl font-bold text-stone-900">{children}</h3>
  );
}
