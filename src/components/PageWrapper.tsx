export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-5xl px-6 py-12">{children}</div>;
}
