import { asanas } from '@/data/asanas';
import { upperBodyMuscles } from '@/data/muscles';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageWrapper from '@/components/PageWrapper';
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';

export default async function AsanaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const asana = asanas.find((a) => a.id === id);

  if (!asana) notFound();

  // 해당 아사나에 타겟팅된 근육만 필터링
  const muscles = upperBodyMuscles.filter((m) => asana.target_muscles.includes(m.id));

  return (
    <PageWrapper>
      <PageHeader title={asana.name_ko} subtitle={asana.name_sanskrit} />

      {/* 아사나 도해 이미지 */}
      <div className="mb-12">
        <img
          src={asana.imageUrl || '/images/asanas/default.jpg'}
          alt={asana.name_ko}
          className="h-auto w-full rounded-3xl border border-slate-100 shadow-lg"
        />
      </div>
      <SectionHeading>사용되는 근육들</SectionHeading>

      <div className="grid grid-cols-2 gap-4">
        {muscles.map((m) => (
          <Link
            href={`/muscles/${m.id}`}
            key={m.id}
            className="rounded-xl border p-4 hover:bg-slate-50"
          >
            {m.name_ko}
          </Link>
        ))}

        <Link
          href={`/muscles/${id}`}
          className="block rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:border-black hover:shadow-sm"
        >
          <span className="font-bold text-slate-900">{123}</span>
        </Link>
      </div>
    </PageWrapper>
  );
}
