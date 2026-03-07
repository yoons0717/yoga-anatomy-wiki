interface SectionHeadingProps {
  children: React.ReactNode;
}

export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-6 border-l-4 border-black pl-4 text-xl font-bold text-black">{children}</h3>
  );
}
