'use client';

import { AsanaPosition } from '@/types/anatomy';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Wind } from 'lucide-react';
import { asanas } from '@/data/asanas';
import PageWrapper from '@/components/PageWrapper';
import PageHeader from '@/components/PageHeader';

const POSITION_LABELS: Record<AsanaPosition, string> = {
  standing: '선 자세',
  seated: '앉은 자세',
  prone: '엎드린 자세',
  supine: '누운 자세',
};

const POSITIONS: AsanaPosition[] = ['standing', 'seated', 'prone', 'supine'];

export default function AsanaListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activePosition, setActivePosition] = useState<AsanaPosition | null>(null);

  const filtered = asanas.filter((a) => {
    const matchesSearch =
      a.name_ko.includes(searchTerm) ||
      a.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.name_sanskrit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = activePosition === null || a.position === activePosition;
    return matchesSearch && matchesPosition;
  });

  return (
    <PageWrapper>
      <PageHeader
        title="Asana Index"
        subtitle="The sacred geometry of the human body in stillness and flow."
      />
      <div className="relative mb-8 max-w-md sm:mb-10">
        <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-stone-300" />
        <input
          className="w-full border-b border-stone-200 bg-transparent pb-3 pl-10 text-[15px] text-stone-900 transition-all outline-none placeholder:text-stone-300 focus:border-stone-500 sm:pb-4 sm:text-base"
          placeholder="Search asanas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-10 flex flex-wrap gap-2 sm:mb-16">
        <button
          onClick={() => setActivePosition(null)}
          className={`rounded-full border px-4 py-1.5 text-[12px] font-bold tracking-wide transition-all ${
            activePosition === null
              ? 'border-stone-800 bg-stone-800 text-white'
              : 'border-stone-200 text-stone-400 hover:border-stone-400 hover:text-stone-600'
          }`}
        >
          전체
        </button>
        {POSITIONS.map((pos) => (
          <button
            key={pos}
            onClick={() => setActivePosition(activePosition === pos ? null : pos)}
            className={`rounded-full border px-4 py-1.5 text-[12px] font-bold tracking-wide transition-all ${
              activePosition === pos
                ? 'border-stone-800 bg-stone-800 text-white'
                : 'border-stone-200 text-stone-400 hover:border-stone-400 hover:text-stone-600'
            }`}
          >
            {POSITION_LABELS[pos]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <Link
            href={`/asanas/${a.id}`}
            key={a.id}
            className="group flex flex-col overflow-hidden rounded-4xl border border-stone-100 bg-stone-50/50 transition-all active:scale-[0.98] sm:rounded-4xl sm:hover:-translate-y-1 sm:hover:bg-white sm:hover:shadow-xl sm:hover:shadow-stone-200/40"
          >
            <div className="relative h-44 overflow-hidden bg-white">
              {a.imageUrl ? (
                <Image
                  src={a.imageUrl}
                  alt={a.name_ko}
                  fill
                  className="object-contain p-3 transition-transform duration-500 sm:group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-stone-100">
                  <Wind className="h-6 w-6 text-stone-200 transition-all duration-500 group-hover:rotate-180 group-hover:text-stone-400" />
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between p-7 sm:p-9">
              <div className="space-y-2">
                <h3 className="text-lg font-bold tracking-tight text-stone-800 sm:text-xl sm:group-hover:text-black">
                  {a.name_ko}
                </h3>
                <div className="space-y-1">
                  <p className="font-serif text-[10px] text-stone-500 italic sm:text-[11px] sm:group-hover:text-stone-700">
                    {a.name_sanskrit}
                  </p>
                  <p className="text-[9px] font-bold tracking-widest text-stone-400 uppercase sm:text-[10px]">
                    {a.name_en}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-2 opacity-60 transition-all sm:mt-10 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                <span className="text-[9px] font-black tracking-tighter text-stone-800 uppercase">
                  Practice Guide
                </span>
                <div className="h-px w-4 bg-stone-800" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
}
