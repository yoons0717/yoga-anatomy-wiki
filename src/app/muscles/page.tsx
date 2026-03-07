'use client';
import { useState } from 'react';
import PageWrapper from '@/components/PageWrapper';
import Link from 'next/link';
import { upperBodyMuscles } from '@/data/muscles';
import PageHeader from '@/components/PageHeader';

export default function MuscleListPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = upperBodyMuscles.filter(
    (m) =>
      m.name_ko.includes(searchTerm) || m.name_en.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <PageWrapper>
      <header className="mb-12">
        <PageHeader title="근육 목록" />

        <input
          className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:ring-2 focus:ring-black"
          placeholder="근육 이름 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((m) => (
          <Link
            href={`/muscles/${m.id}`}
            key={m.id}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-6 transition hover:bg-slate-100"
          >
            <h3 className="font-bold text-black">{m.name_ko}</h3>
            <p className="text-sm text-slate-500">{m.name_en}</p>
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
}
