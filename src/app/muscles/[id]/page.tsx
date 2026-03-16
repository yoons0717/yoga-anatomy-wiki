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
  if (!muscle) return <div>찾을 수 없습니다.</div>;

  const related = asanas.filter((a) => a.target_muscles.includes(muscle.id));

  return (
    <PageWrapper>
      <PageHeader title={muscle.name_ko} subtitle={muscle.name_en} />

      <MuscleExplorer muscles={upperBodyMuscles} />
      <div className="space-y-6 leading-relaxed text-slate-700">
        <p>{muscle.description}</p>
        <div className="rounded-xl bg-slate-50 p-6 font-medium">
          <p>
            <strong>Origin:</strong> {muscle.origin}
          </p>
          <p>
            <strong>Insertion:</strong> {muscle.insertion}
          </p>
        </div>
      </div>

      <section className="mt-16 border-t border-slate-200 pt-12">
        <SectionHeading>관련 아사나</SectionHeading>
        <div className="grid gap-4">
          {related.map((a) => (
            <Link
              href={`/asanas/${a.id}`}
              key={a.id}
              className="rounded-2xl border bg-slate-50 p-6 hover:border-slate-300"
            >
              <h4 className="font-bold">{a.name_ko}</h4>
              <p className="text-sm text-slate-500">{a.name_sanskrit}</p>
            </Link>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
