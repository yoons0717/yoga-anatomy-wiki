'use client';

import { BodyPart } from '@/types/anatomy';
import { useState } from 'react';

const CATEGORIES: BodyPart[] = ['상체', '하체', '척추', '복부 및 호흡'];

export default function MapperPage() {
  const [activeCategory, setActiveCategory] = useState<BodyPart>('상체');

  return (
    <div className="min-h-screen bg-stone-100 p-8">
      <h1 className="mb-6 text-2xl font-black text-stone-900">Muscle Mapper</h1>

      <div className="mb-4 flex items-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full border px-4 py-1.5 text-[12px] font-bold transition-all ${
              activeCategory === cat
                ? 'border-stone-800 bg-stone-800 text-white'
                : 'border-stone-200 text-stone-400 hover:border-stone-400 hover:text-stone-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-4 text-sm text-stone-400">
          이미지 영역 (다음 단계)
        </div>
        <div className="w-72 rounded-2xl border border-stone-200 bg-white p-4 text-sm text-stone-400">
          출력 패널 (다음 단계)
        </div>
      </div>
    </div>
  );
}
