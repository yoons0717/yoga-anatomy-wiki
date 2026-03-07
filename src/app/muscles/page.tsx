'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { upperBodyMuscles } from '@/data/muscles';

export default function MuscleListPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMuscles = upperBodyMuscles.filter(
    (muscle) =>
      muscle.name_ko.includes(searchTerm) ||
      muscle.name_en.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Muscle Archive</h1>
          <p className="mt-2 font-medium text-slate-500">해부학적 원리로 이해하는 요가 정렬</p>

          <div className="mt-10">
            {/* 검색창: 배경색을 흰색으로 고정하고 테두리를 더 진하게 설정하여 시인성 확보 */}
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="근육 명칭 또는 영문명 검색..."
                className="w-full rounded-2xl border-2 border-slate-200 bg-white p-4 text-slate-900 placeholder-slate-400 shadow-sm transition-all outline-none focus:border-slate-900 focus:ring-0"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* 그리드 리스트: sub_category 영역만 삭제하고 기존 레이아웃 유지 */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMuscles.map((muscle) => (
            <Link href={`/muscles/${muscle.id}`} key={muscle.id} className="group">
              <div className="flex h-full flex-col justify-between rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div>
                  {/* sub_category 영역 삭제됨 */}
                  <h2 className="text-2xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                    {muscle.name_ko}
                  </h2>
                  <p className="mt-1 mb-6 text-sm text-slate-400 italic">{muscle.name_en}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {muscle.action.slice(0, 2).map((act, i) => (
                    <span
                      key={i}
                      className="rounded bg-slate-50 px-2 py-1 text-[12px] font-medium text-slate-600"
                    >
                      # {act}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}

          {filteredMuscles.length === 0 && (
            <div className="col-span-full py-20 text-center text-slate-400">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
