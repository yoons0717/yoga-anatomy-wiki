'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { allMuscles } from '@/data/muscles';
import PageWrapper from '@/components/PageWrapper';
import PageHeader from '@/components/PageHeader';

export default function MuscleListPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = allMuscles.filter(
    (m) =>
      m.name_ko.includes(searchTerm) || m.name_en.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <PageWrapper>
      <PageHeader
        title="Muscle Map"
        subtitle="Exploring anatomical structures through mindful observation."
      />

      <div className="relative mb-10 max-w-md sm:mb-16">
        <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-stone-300" />
        <input
          className="w-full border-b border-stone-200 bg-transparent pb-3 pl-10 text-[15px] text-stone-900 transition-all outline-none placeholder:text-stone-300 focus:border-stone-500 sm:pb-4 sm:text-base"
          placeholder="Search muscles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m) => (
          <Link
            href={`/muscles/${m.id}`}
            key={m.id}
            className="group flex flex-col justify-between rounded-4xl border border-stone-100 bg-stone-50/50 p-7 transition-all active:scale-[0.98] sm:rounded-4xl sm:p-9 sm:hover:-translate-y-1 sm:hover:bg-white sm:hover:shadow-xl sm:hover:shadow-stone-200/40"
          >
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="h-1 w-4 bg-stone-200 transition-all duration-500 group-hover:bg-stone-800" />
                <div className="h-1 w-1 rounded-full bg-stone-200 group-hover:bg-stone-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight text-stone-800 group-hover:text-black">
                  {m.name_ko}
                </h3>
                <p className="text-[11px] font-bold tracking-widest text-stone-400 uppercase group-hover:text-stone-500">
                  {m.name_en}
                </p>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-2 opacity-40 transition-all sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
              <span className="text-[10px] font-black tracking-tighter text-stone-800 uppercase">
                View Details
              </span>
              <div className="h-px w-4 bg-stone-800" />
            </div>
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
}
