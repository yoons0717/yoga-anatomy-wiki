'use client';

import { Muscle } from '@/types/anatomy';
import { useState } from 'react';
import Image from 'next/image';

export default function MuscleExplorer({ muscles }: { muscles: Muscle[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="flex gap-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      {/* 1. 이미지 영역 */}

      <div className="relative aspect-3/4 w-125">
        <Image
          src="/images/muscles/trunk.png"
          alt="Anatomy"
          fill // 부모 크기를 꽉 채움
          className="object-contain" // 이미지 비율 유지
          priority // 해부학 지도는 중요하므로 우선 로딩
        />

        {muscles.map((m) => (
          <div
            key={m.id}
            onClick={() => setSelectedId(m.id)}
            className={`absolute z-10 cursor-pointer transition-all duration-300 ease-in-out ${
              selectedId === m.id
                ? 'bg-indigo-500/40 ring-2 ring-indigo-400'
                : 'hover:bg-indigo-400/20'
            }`}
            style={m.area}
          />
        ))}
      </div>

      {/* 2. 부드러운 아코디언 리스트 영역 */}
      <div className="w-80 space-y-3">
        <h2 className="mb-6 text-2xl font-bold text-slate-800">근육 탐색기</h2>
        {muscles.map((m) => (
          <div
            key={m.id}
            className="overflow-hidden rounded-xl border border-slate-200 transition-all duration-300"
          >
            <button
              onClick={() => setSelectedId(selectedId === m.id ? null : m.id)}
              className={`flex w-full items-center justify-between p-5 text-left font-bold transition-colors duration-300 ${
                selectedId === m.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {m.name_en} ({m.name_ko})
              <span
                className={`transform transition-transform duration-300 ${selectedId === m.id ? 'rotate-180' : ''}`}
              >
                ▼
              </span>
            </button>

            {/* 높이 변화를 이용한 부드러운 아코디언 */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${selectedId === m.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <p className="bg-slate-50 p-5 text-sm leading-relaxed text-slate-600">
                  {m.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
