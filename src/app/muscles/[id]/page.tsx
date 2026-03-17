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

      {/* 탐색기 영역: 여백 최적화 */}
      <div className="mb-20 rounded-[3rem] border border-stone-100 bg-stone-50/30 shadow-sm">
        <MuscleExplorer muscles={upperBodyMuscles} />
      </div>

      {/* 근육 정보 섹션 */}
      <div className="space-y-16">
        {/* Description: 텍스트 농도 조절 (stone-600) */}
        <div className="max-w-3xl space-y-4 px-2">
          <h3 className="text-[10px] font-black tracking-[0.2em] text-stone-400 uppercase">
            Functional Overview
          </h3>
          <p className="text-xl leading-relaxed font-medium break-keep text-stone-600 italic">
            &quot;{muscle.description}&quot;
          </p>
        </div>

        {/* 상세 정보 카드: divide 및 패딩 수정 */}
        <div className="overflow-hidden rounded-[2.5rem] border border-stone-100 bg-white">
          <div className="grid grid-cols-1 divide-y divide-stone-100">
            {/* 1. Origin & 2. Insertion: 텍스트 컬러 stone-800 및 간격 최적화 */}
            <div className="grid grid-cols-1 divide-y divide-stone-100 md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="space-y-3 p-10 md:p-12">
                <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                  Origin
                </span>
                <p className="max-w-[40ch] text-[15px] leading-relaxed font-bold break-keep text-stone-800">
                  {muscle.origin}
                </p>
              </div>

              <div className="space-y-3 p-10 md:p-12">
                <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                  Insertion
                </span>
                <p className="max-w-[40ch] text-[15px] leading-relaxed font-bold break-keep text-stone-800">
                  {muscle.insertion}
                </p>
              </div>
            </div>

            {/* 3. Action: 배경색(stone-50/50)과 그리드 간격 수정 */}
            <div className="space-y-10 bg-stone-50/50 p-10 md:p-12">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">
                  Actions & Function
                </span>
                <div className="h-px flex-1 bg-stone-100" />
              </div>

              <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                {muscle.action.map((act, index) => {
                  const hasDivider = act.includes(' - ');
                  const [title, content] = hasDivider ? act.split(' - ') : [null, act];

                  return (
                    <div key={index} className="group">
                      {hasDivider ? (
                        <div className="space-y-3">
                          <div className="inline-block border-b border-stone-900 pb-0.5">
                            <span className="text-[11px] font-black tracking-tighter text-stone-900 uppercase">
                              {title}
                            </span>
                          </div>
                          <p className="text-[14px] leading-snug font-bold break-keep text-stone-700">
                            {content}
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-start gap-3">
                          <div className="mt-2 h-1 w-1 shrink-0 rounded-full bg-stone-300 transition-colors group-hover:bg-stone-900" />
                          <p className="text-[14px] leading-snug font-bold break-keep text-stone-700 transition-colors group-hover:text-stone-900">
                            {content}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 아사나: SectionHeading 디자인에 맞춘 간격 */}
      <section className="mt-24 border-t border-stone-100 px-2 pt-16 pb-20">
        <SectionHeading>관련 아사나</SectionHeading>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {related.map((a) => (
            <Link
              href={`/asanas/${a.id}`}
              key={a.id}
              className="group rounded-[2rem] border border-stone-100 bg-white p-8 transition-all hover:-translate-y-1 hover:bg-stone-900 hover:shadow-xl hover:shadow-stone-200/50"
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
