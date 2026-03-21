export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">{children}</div>;
}
