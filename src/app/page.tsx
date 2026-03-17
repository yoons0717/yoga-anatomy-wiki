import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Anatomy Archive',
  description: 'The intersection of yoga and anatomy.',
};

export default function HomePage() {
  return (
    <div className="relative flex min-h-[60vh] flex-col justify-center">
      {/* 연하게 배경에 깔리는 슬로건) */}
      <div className="absolute top-0 left-0 -translate-x-12 -translate-y-12 opacity-[0.02] select-none">
        <h1 className="text-[12rem] leading-none font-black">YOGA</h1>
      </div>

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="z-10 space-y-12 lg:col-span-7">
          <div className="space-y-4">
            <p className="text-[11px] font-bold tracking-[0.4em] text-slate-400 uppercase">
              Yoga Anatomy Archive
            </p>
            <h2 className="text-7xl leading-[1.05] font-black tracking-tighter text-slate-950">
              Precision <br />
              in <span className="font-serif font-light text-slate-300 italic">Motion.</span>
            </h2>
          </div>

          <div className="max-w-md space-y-6">
            <p className="text-base leading-relaxed font-medium text-slate-600">
              &quot;Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a type specimen book.
              It has survived not only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
              release of Letraset sheets containing Lor&quot;
            </p>
            <div className="h-px w-12 bg-slate-200" />
            <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
              — Founded by ym
            </p>
          </div>

          <div className="flex items-center gap-10 pt-4">
            <Link
              href="/asanas"
              className="group flex items-center gap-3 text-sm font-black tracking-widest text-slate-900 uppercase transition hover:opacity-60"
            >
              Explore Asanas
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Link>
            <Link
              href="/muscles"
              className="group text-sm font-black tracking-widest text-slate-400 uppercase transition hover:text-slate-900"
            >
              Muscle Map
            </Link>
          </div>
        </div>

        {/* 오른쪽: 스켈레톤 이미지 (5칸 차지) */}
        <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
          <div className="relative aspect-3/4 w-full max-w-[320px]">
            {/* 이미지 배경에 은은한 원형 광택 효과 */}
            <div className="bg-radial-gradient absolute inset-0 scale-125 rounded-full from-slate-100 to-transparent opacity-50 blur-3xl" />

            <Image
              src="/images/skeleton.png"
              alt="Anatomical Vision"
              fill
              className="object-contain drop-shadow-2xl grayscale-[0.2]"
              priority
            />
          </div>
        </div>
      </div>

      {/* 하단 푸터 느낌의 명언: 아주 작고 정갈하게 배치 */}
      <div className="mt-32 flex flex-col items-end justify-between gap-6 border-t border-slate-50 pt-12 md:flex-row">
        <div className="max-w-xs">
          <p className="text-[10px] leading-relaxed font-bold tracking-widest text-slate-400 uppercase">
            &quot;The body is your temple. Keep it pure and clean for the soul to reside in.&quot;
          </p>
          <p className="mt-2 text-[10px] text-slate-300">— B.K.S. IYENGAR</p>
        </div>

        <div className="flex gap-4 text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
          <span>Safety</span>
          <span className="text-slate-200">/</span>
          <span>Alignment</span>
          <span className="text-slate-200">/</span>
          <span>Science</span>
        </div>
      </div>
    </div>
  );
}
