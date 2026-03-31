'use client';

import { BodyPart } from '@/types/anatomy';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { CATEGORY_IMAGES } from '@/data/muscles';

const CATEGORIES: BodyPart[] = ['상체', '하체', '척추', '복부 및 호흡'];
const DEFAULT_WIDTH = '12%';
const DEFAULT_HEIGHT = '3%';

export default function MapperPage() {
  const [activeCategory, setActiveCategory] = useState<BodyPart>('상체');
  const [hoverCoords, setHoverCoords] = useState<{ x: string; y: string } | null>(null);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'click' | 'drag'>('click');
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [dragPreview, setDragPreview] = useState<{ top: string; left: string; width: string; height: string } | null>(null);
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

      <div className="mb-6 flex items-center gap-2">
        {(['click', 'drag'] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setDragPreview(null); }}
            className={`rounded-full border px-3 py-1 text-[11px] font-bold transition-all ${
              mode === m
                ? 'border-sky-500 bg-sky-500 text-white'
                : 'border-stone-200 text-stone-400 hover:border-stone-400'
            }`}
          >
            {m === 'click' ? '● 클릭' : '□ 드래그'}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        <div className="relative w-full max-w-md shrink-0">
          <div
            ref={containerRef}
            className="relative aspect-[460/550] w-full cursor-crosshair overflow-hidden rounded-2xl border border-stone-200 bg-white"
            onMouseMove={(e) => {
              setHoverCoords(getCoords(e));
              if (mode === 'drag' && dragStart && containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const curX = e.clientX - rect.left;
                const curY = e.clientY - rect.top;
                setDragPreview({
                  left: (Math.min(dragStart.x, curX) / rect.width * 100).toFixed(1) + '%',
                  top: (Math.min(dragStart.y, curY) / rect.height * 100).toFixed(1) + '%',
                  width: (Math.abs(curX - dragStart.x) / rect.width * 100).toFixed(1) + '%',
                  height: (Math.abs(curY - dragStart.y) / rect.height * 100).toFixed(1) + '%',
                });
              }
            }}
            onMouseLeave={() => { setHoverCoords(null); }}
            onMouseDown={(e) => {
              if (mode !== 'drag' || !containerRef.current) return;
              const rect = containerRef.current.getBoundingClientRect();
              setDragStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              setDragPreview(null);
            }}
            onMouseUp={() => {
              if (mode !== 'drag' || !dragPreview) return;
              setOutput(`{ top: '${dragPreview.top}', left: '${dragPreview.left}', width: '${dragPreview.width}', height: '${dragPreview.height}' }`);
              setCopied(false);
              setDragStart(null);
            }}
            onClick={(e) => {
              if (mode !== 'click') return;
              const { x, y } = getCoords(e);
              setOutput(`{ top: '${y}', left: '${x}', width: '${DEFAULT_WIDTH}', height: '${DEFAULT_HEIGHT}' }`);
              setCopied(false);
            }}
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
            {dragPreview && (
              <div
                className="pointer-events-none absolute border-2 border-sky-400 bg-sky-400/20"
                style={dragPreview}
              />
            )}
          </div>
        </div>
        <div className="flex w-72 shrink-0 flex-col gap-3">
          <h2 className="text-[11px] font-black tracking-widest text-stone-400 uppercase">Output</h2>
          <pre className="min-h-[96px] whitespace-pre-wrap rounded-xl bg-stone-900 p-4 font-mono text-[12px] leading-relaxed text-green-400">
            {output || '이미지를 클릭하세요'}
          </pre>
          <button
            onClick={() => {
              if (!output) return;
              navigator.clipboard.writeText(output);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            disabled={!output}
            className="rounded-xl bg-stone-800 py-2 text-[12px] font-bold text-white transition hover:bg-stone-900 disabled:opacity-40"
          >
            {copied ? '복사됨 ✓' : '복사'}
          </button>
        </div>
      </div>
    </div>
  );
}
