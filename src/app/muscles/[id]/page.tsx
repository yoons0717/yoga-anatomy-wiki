import Link from 'next/link';
import { upperBodyMuscles } from '@/data/muscles';
import { asanas } from '@/data/asanas';
import { notFound } from 'next/navigation';

export default async function MuscleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const muscle = upperBodyMuscles.find((m) => m.id === id);
  const relatedAsanas = asanas.filter((asana) => asana.target_muscles.includes(id));

  if (!muscle) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/muscles"
          className="mb-8 inline-block text-sm text-slate-500 transition hover:text-slate-800"
        >
          ← 리스트로 돌아가기
        </Link>

        <header className="mb-12 border-b pb-8">
          <h1 className="mt-2 text-4xl font-extrabold text-slate-900">{muscle.name_ko}</h1>
          <p className="text-xl text-slate-400 italic">{muscle.name_en}</p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* 해부학 이미지 영역 */}
          <div className="flex items-center justify-center rounded-2xl bg-slate-100 p-4">
            <img
              src={`/images/muscles/${muscle.id}.jpg`}
              alt={muscle.name_ko}
              className="h-auto max-w-full rounded-lg"
            />
          </div>
          {/* 해부학 정보 섹션 */}
          <section className="space-y-8">
            <div>
              <h3 className="mb-3 border-l-4 border-slate-800 pl-3 text-lg font-bold text-slate-800">
                해부학적 특징
              </h3>
              <p className="leading-relaxed text-slate-600">{muscle.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-5">
                <h4 className="mb-2 font-bold text-slate-900">기시 (Origin)</h4>
                <p className="text-sm text-slate-600">{muscle.origin}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-5">
                <h4 className="mb-2 font-bold text-slate-900">정지 (Insertion)</h4>
                <p className="text-sm text-slate-600">{muscle.insertion}</p>
              </div>
            </div>

            <div>
              <h3 className="mb-3 border-l-4 border-slate-800 pl-3 text-lg font-bold text-slate-800">
                주요 작용 (Action)
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {muscle.action.map((act, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-slate-800 px-4 py-2 text-sm text-white"
                  >
                    {act}
                  </span>
                ))}
              </div>
            </div>
          </section>
          {/* 관련 아사나 섹션 */}
          <section className="mt-16 border-t border-slate-100 pt-8">
            <h3 className="mb-6 text-xl font-bold text-slate-900">관련 아사나</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {relatedAsanas.map((asana) => (
                <Link href={`/asanas/${asana.id}`} key={asana.id}>
                  <div className="cursor-pointer rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all hover:border-slate-300">
                    <h4 className="font-bold text-slate-900">{asana.name_ko}</h4>
                    <p className="mb-2 text-sm text-slate-500 italic">{asana.name_sanskrit}</p>
                    <p className="text-sm leading-relaxed text-slate-600">{asana.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
