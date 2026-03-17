'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Wind } from 'lucide-react';
import { asanas } from '@/data/asanas';
import PageWrapper from '@/components/PageWrapper';
import PageHeader from '@/components/PageHeader';

export default function AsanaListPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = asanas.filter(
    (a) =>
      a.name_ko.includes(searchTerm) ||
      a.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.name_sanskrit.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <PageWrapper>
      <PageHeader
        title="Asana Index"
        subtitle="The sacred geometry of the human body in stillness and flow."
      />

      <div className="relative mb-16 max-w-md">
        <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-stone-300" />
        <input
          className="w-full border-b border-stone-200 bg-transparent pb-4 pl-10 text-base text-stone-900 transition-all outline-none placeholder:text-stone-300 focus:border-stone-500"
          placeholder="Search asanas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <Link
            href={`/asanas/${a.id}`}
            key={a.id}
            className="group flex flex-col justify-between rounded-4xl border border-stone-100 bg-stone-50/50 p-9 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-stone-200/40"
          >
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <Wind className="h-4 w-4 text-stone-200 transition-all duration-500 group-hover:rotate-180 group-hover:text-stone-800" />
                <div className="h-1 w-1 rounded-full bg-stone-200 group-hover:bg-stone-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight text-stone-800 group-hover:text-black">
                  {a.name_ko}
                </h3>
                <div className="space-y-1">
                  <p className="font-serif text-[11px] text-stone-500 italic group-hover:text-stone-700">
                    {a.name_sanskrit}
                  </p>
                  <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                    {a.name_en}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 flex translate-y-2 items-center gap-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              <span className="text-[10px] font-black tracking-tighter text-stone-800 uppercase">
                Practice Guide
              </span>
              <div className="h-px w-4 bg-stone-800" />
            </div>
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
}
