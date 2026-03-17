import { upperBodyMuscles } from '@/data/muscles';
import { asanas } from '@/data/asanas';
import Link from 'next/link';
import PageWrapper from '@/components/PageWrapper';
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';
import MuscleExplorer from '@/components/MuscleExplorer';

export default async function MuscleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const muscle = upperBodyMuscles.find((m) => m.id === id);
  if (!muscle) return <div className="p-20 text-center text-stone-400">찾을 수 없습니다.</div>;

  const related = asanas.filter((a) => a.target_muscles.includes(muscle.id));

  return (
    <PageWrapper>
      <PageHeader title={muscle.name_ko} subtitle={muscle.name_en} />

      <div className="mb-16">
        <MuscleExplorer muscles={upperBodyMuscles} />
      </div>

      <div className="space-y-8 leading-relaxed text-stone-700">
        <p className="text-lg font-medium text-stone-500 italic">
          &quot;{muscle.description}&quot;
        </p>

        <div className="grid grid-cols-1 gap-4 rounded-4xl border border-stone-100/50 bg-stone-50 p-8 md:grid-cols-2">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
              Origin
            </span>
            <p className="font-bold text-stone-900">{muscle.origin}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
              Insertion
            </span>
            <p className="font-bold text-stone-900">{muscle.insertion}</p>
          </div>
        </div>
      </div>

      <section className="mt-20 border-t border-stone-100 pt-12">
        <SectionHeading>관련 아사나</SectionHeading>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {related.map((a) => (
            <Link
              href={`/asanas/${a.id}`}
              key={a.id}
              className="group rounded-4xl border border-stone-100 bg-white p-8 transition-all hover:bg-stone-900 hover:text-white"
            >
              <h4 className="text-lg font-bold">{a.name_ko}</h4>
              <p className="font-serif text-xs text-stone-400 italic transition-colors group-hover:text-stone-300">
                {a.name_sanskrit}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
