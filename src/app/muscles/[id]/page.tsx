import { upperBodyMuscles } from '@/data/muscles';
import { asanas } from '@/data/asanas';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageWrapper from '@/components/PageWrapper';
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';
import MuscleExplorer from '@/components/MuscleExplorer';

export default async function MuscleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const muscle = upperBodyMuscles.find((m) => m.id === id);
  if (!muscle) notFound();

  const related = asanas.filter((a) => a.target_muscles.includes(muscle.id));

  return (
    <PageWrapper>
      <PageHeader title={muscle.name_ko} subtitle={muscle.name_en} />

      <div className="mb-12 overflow-hidden sm:mb-20">
        <MuscleExplorer muscles={upperBodyMuscles} muscleId={id} />
      </div>

      <div className="space-y-12 sm:space-y-16">
        <div className="max-w-3xl space-y-4 px-1">
          <h3 className="text-[10px] font-black tracking-[0.2em] text-stone-400 uppercase">
            Functional Overview
          </h3>
          <p className="text-lg leading-relaxed font-medium break-keep text-stone-600 italic sm:text-xl">
            &quot;{muscle.description}&quot;
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-stone-100 bg-white shadow-sm sm:rounded-[2.5rem]">
          <div className="grid grid-cols-1 divide-y divide-stone-100 md:grid-cols-2 md:divide-x md:divide-y-0">
            <div className="space-y-3 p-8 sm:p-10">
              <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                Origin
              </span>
              <p className="max-w-[40ch] text-[14px] leading-relaxed font-bold break-keep text-stone-800 sm:text-[15px]">
                {muscle.origin}
              </p>
            </div>

            <div className="space-y-3 p-8 sm:p-10">
              <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                Insertion
              </span>
              <p className="max-w-[40ch] text-[14px] leading-relaxed font-bold break-keep text-stone-800 sm:text-[15px]">
                {muscle.insertion}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-20 border-t border-stone-100 px-1 pt-12 pb-20 sm:mt-24 sm:pt-16">
        <SectionHeading>관련 아사나</SectionHeading>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {related.map((a) => (
            <Link
              href={`/asanas/${a.id}`}
              key={a.id}
              className="group rounded-[2rem] border border-stone-100 bg-white p-7 transition-all active:scale-95 sm:p-8 sm:hover:-translate-y-1 sm:hover:bg-stone-900 sm:hover:shadow-xl sm:hover:shadow-stone-200/50"
            >
              <h4 className="text-lg font-bold text-stone-800 transition-colors group-hover:text-white">
                {a.name_ko}
              </h4>
              <p className="mt-1 font-serif text-xs text-stone-400 italic transition-colors group-hover:text-stone-300">
                {a.name_sanskrit}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
