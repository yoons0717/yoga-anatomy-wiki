'use client';

import { BodyPart } from '@/types/anatomy';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { CATEGORY_IMAGES } from '@/data/muscles';

const CATEGORIES: BodyPart[] = ['상체', '하체', '척추', '복부 및 호흡'];

export default function MapperPage() {
  const [activeCategory, setActiveCategory] = useState<BodyPart>('상체');
  const [hoverCoords, setHoverCoords] = useState<{ x: string; y: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getCoords = (e: React.MouseEvent) => {
    const rect = containerRef.current!.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + '%';
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + '%';
    return { x, y };
  };

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
        <div className="relative w-full max-w-md shrink-0">
          <div
            ref={containerRef}
            className="relative aspect-[460/550] w-full cursor-crosshair overflow-hidden rounded-2xl border border-stone-200 bg-white"
            onMouseMove={(e) => setHoverCoords(getCoords(e))}
            onMouseLeave={() => setHoverCoords(null)}
          >
            <Image
              src={CATEGORY_IMAGES[activeCategory]}
              alt={activeCategory}
              fill
              className="object-contain"
            />
            {hoverCoords && (
              <div className="pointer-events-none absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 font-mono text-[11px] text-white">
                top: {hoverCoords.y} / left: {hoverCoords.x}
              </div>
            )}
          </div>
        </div>
        <div className="w-72 rounded-2xl border border-stone-200 bg-white p-4 text-sm text-stone-400">
          출력 패널 (다음 단계)
        </div>
      </div>
    </div>
  );
}
