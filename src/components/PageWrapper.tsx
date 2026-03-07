export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-4xl py-12">{children}</div>;
}
