import { upperBodyMuscles } from '@/data/muscles';
import Link from 'next/link';

export default function MuscleListPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-slate-800">요가 해부학 사전</h1>
          <p className="mt-2 text-slate-600">상체 (Upper Body) 근육 아카이브</p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upperBodyMuscles.map((muscle) => (
            <div
              key={muscle.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="p-6">
                <div className="mb-4 flex flex-col">
                  <span className="text-xs font-semibold tracking-wider text-blue-500 uppercase">
                    {muscle.sub_category}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">{muscle.name_ko}</h2>
                  <p className="text-sm text-slate-400 italic">{muscle.name_en}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 uppercase">
                      주요 작용 (Action)
                    </h4>
                    <ul className="mt-1 flex flex-wrap gap-1">
                      {muscle.action.map((act, index) => (
                        <li
                          key={index}
                          className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600"
                        >
                          {act}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Link href={`/muscles/${muscle.id}`}>
                  <button className="mt-6 w-full rounded-lg bg-slate-800 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700">
                    상세 정보 보기
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
