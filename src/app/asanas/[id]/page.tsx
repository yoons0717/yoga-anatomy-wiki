import { asanas } from '@/data/asanas';
import { upperBodyMuscles } from '@/data/muscles';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function AsanaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const asana = asanas.find((a) => a.id === id);

  if (!asana) notFound();

  // 해당 아사나에 타겟팅된 근육만 필터링
  const muscles = upperBodyMuscles.filter((m) => asana.target_muscles.includes(m.id));

  return (
    <div className="mx-auto max-w-4xl p-12">
      <h1 className="text-4xl font-black">{asana.name_ko}</h1>
      <p className="mb-8 text-lg text-slate-500 italic">{asana.name_sanskrit}</p>

      {/* 아사나 도해 이미지 */}
      <div className="mb-12">
        <img
          src={asana.imageUrl || '/images/asanas/default.jpg'}
          alt={asana.name_ko}
          className="h-auto w-full rounded-3xl border border-slate-100 shadow-lg"
        />
      </div>

      <h2 className="mb-4 text-xl font-bold">사용되는 근육들</h2>
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
      </div>
    </div>
  );
}
