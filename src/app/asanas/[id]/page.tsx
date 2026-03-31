import { asanas } from '@/data/asanas';
import { allMuscles } from '@/data/muscles';
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

  const activatedMuscles = allMuscles.filter((m) => asana.activated_muscles.includes(m.id));
  const stretchedMuscles = allMuscles.filter((m) => asana.stretched_muscles.includes(m.id));

  return (
    <PageWrapper>
      <PageHeader title={asana.name_ko} subtitle={asana.name_sanskrit} />

      {asana.imageUrl && (
        <div className="mb-12 flex justify-center sm:mb-20">
          <Image
            src={asana.imageUrl}
            alt={asana.name_ko}
            className="h-auto w-full max-w-xs rounded-3xl border border-stone-100 shadow-lg sm:max-w-sm"
            width={400}
            height={400}
          />
        </div>
      )}

      <div className="space-y-16 border-t border-stone-100 pt-12 pb-20 sm:pt-16">
        {activatedMuscles.length > 0 && (
          <section>
            <SectionHeading>수축 근육</SectionHeading>
            <p className="mt-2 text-sm text-stone-400">자세를 유지하기 위해 활성화되는 근육</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activatedMuscles.map((m) => (
                <MuscleCard key={m.id} id={m.id} nameKo={m.name_ko} nameEn={m.name_en} />
              ))}
            </div>
          </section>
        )}

        {stretchedMuscles.length > 0 && (
          <section>
            <SectionHeading>이완 근육</SectionHeading>
            <p className="mt-2 text-sm text-stone-400">자세를 통해 스트레칭되는 근육</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stretchedMuscles.map((m) => (
                <MuscleCard key={m.id} id={m.id} nameKo={m.name_ko} nameEn={m.name_en} />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageWrapper>
  );
}

function MuscleCard({ id, nameKo, nameEn }: { id: string; nameKo: string; nameEn: string }) {
  return (
    <Link
      href={`/muscles/${id}`}
      className="group flex flex-col justify-between rounded-[2rem] border border-stone-100 bg-stone-50/50 p-7 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2 sm:p-9 sm:hover:-translate-y-1 sm:hover:bg-white sm:hover:shadow-xl sm:hover:shadow-stone-200/40"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-bold tracking-tight text-stone-800 sm:group-hover:text-black">
          {nameKo}
        </h3>
        <p className="text-[11px] font-bold tracking-widest text-stone-400 uppercase sm:group-hover:text-stone-500">
          {nameEn}
        </p>
      </div>
      <div className="mt-8 flex items-center gap-2 opacity-40 transition-all sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
        <span className="text-[10px] font-black tracking-tighter text-stone-800 uppercase">
          View Details
        </span>
        <div className="h-px w-4 bg-stone-800" />
      </div>
    </Link>
  );
}
