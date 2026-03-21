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
    <div className="relative flex min-h-[50vh] flex-col justify-center overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-0 -translate-x-6 -translate-y-6 opacity-[0.03] select-none">
        <h1 className="text-[6rem] leading-none font-black sm:text-[12rem]">YOGA</h1>
      </div>

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="z-10 order-2 space-y-8 sm:space-y-12 lg:order-1 lg:col-span-7">
          <div className="space-y-3 sm:space-y-4">
            <p className="text-[9px] font-bold tracking-[0.4em] text-slate-400 uppercase sm:text-[11px]">
              Yoga Anatomy Archive
            </p>

            <h2 className="text-4xl leading-[1.1] font-black tracking-tighter text-slate-950 sm:text-7xl">
              Precision <br />
              in <span className="font-serif font-light text-slate-300 italic">Motion.</span>
            </h2>
          </div>

          <div className="max-w-md space-y-6">
            <p className="text-[14px] leading-relaxed font-medium break-keep text-slate-600 sm:text-base">
              아사나의 정렬과 신체 구조의 이해를 돕기 위한 직관적인 아카이브입니다. 요가의 움직임
              뒤에 숨겨진 해부학적 원리를 탐구하세요.
            </p>
            <div className="h-px w-12 bg-slate-200" />
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              — Founded by ym
            </p>
          </div>

          <div className="flex flex-row items-center gap-6 pt-4 sm:gap-10">
            <Link
              href="/asanas"
              className="group flex items-center gap-2 text-[12px] font-black tracking-widest text-slate-900 uppercase transition hover:opacity-60"
            >
              Explore
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/muscles"
              className="text-[12px] font-black tracking-widest text-slate-400 uppercase transition hover:text-slate-900"
            >
              Muscle Map
            </Link>
          </div>
        </div>

        <div className="relative order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
          <div className="relative aspect-3/4 w-full max-w-[240px] sm:max-w-[320px]">
            <div className="bg-radial-gradient absolute inset-0 scale-125 rounded-full from-slate-100 to-transparent opacity-40 blur-3xl" />
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

      <div className="mt-20 flex flex-col items-start justify-between gap-8 border-t border-slate-50 pt-10 sm:mt-32 sm:items-end md:flex-row">
        <div className="max-w-xs space-y-2">
          <p className="text-[9px] leading-relaxed font-bold tracking-widest break-keep text-slate-400 uppercase sm:text-[10px]">
            &quot;The body is your temple. Keep it pure and clean for the soul to reside in.&quot;
          </p>
          <p className="text-[9px] text-slate-300">— B.K.S. IYENGAR</p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[9px] font-black tracking-[0.2em] text-slate-300 uppercase">
          <span className="text-slate-400">Safety</span>
          <span>/</span>
          <span className="text-slate-400">Alignment</span>
          <span>/</span>
          <span className="text-slate-400">Science</span>
        </div>
      </div>
    </div>
  );
}
