import { asanas } from '@/data/asanas';
import { upperBodyMuscles } from '@/data/muscles';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageWrapper from '@/components/PageWrapper';
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';
import Image from 'next/image';

export default async function AsanaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const asana = asanas.find((a) => a.id === id);

  if (!asana) notFound();

  const muscles = upperBodyMuscles.filter((m) => asana.target_muscles.includes(m.id));

  return (
    <PageWrapper>
      <PageHeader title={asana.name_ko} subtitle={asana.name_sanskrit} />

      {/* 아사나 도해 이미지 */}
      <div className="mb-12 sm:mb-20">
        <Image
          src={asana.imageUrl || '/images/asanas/default.jpg'}
          alt={asana.name_ko}
          className="h-auto w-full rounded-3xl border border-stone-100 shadow-lg"
          width={600}
          height={400}
        />
      </div>

      <section className="border-t border-stone-100 pt-12 pb-20 sm:pt-16">
        <SectionHeading>사용되는 근육들</SectionHeading>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {muscles.map((m) => (
            <Link
              href={`/muscles/${m.id}`}
              key={m.id}
              className="group flex flex-col justify-between rounded-[2rem] border border-stone-100 bg-stone-50/50 p-7 transition-all active:scale-[0.98] sm:p-9 sm:hover:-translate-y-1 sm:hover:bg-white sm:hover:shadow-xl sm:hover:shadow-stone-200/40"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-bold tracking-tight text-stone-800 sm:group-hover:text-black">
                  {m.name_ko}
                </h3>
                <p className="text-[11px] font-bold tracking-widest text-stone-400 uppercase sm:group-hover:text-stone-500">
                  {m.name_en}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 opacity-40 transition-all sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                <span className="text-[10px] font-black tracking-tighter text-stone-800 uppercase">
                  View Details
                </span>
                <div className="h-px w-4 bg-stone-800" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
