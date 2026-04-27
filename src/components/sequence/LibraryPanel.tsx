'use client';

import { AsanaPosition, Asana } from '@/types/anatomy';
import { useState } from 'react';
import Image from 'next/image';
import { Search, Wind, Plus } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { asanas } from '@/data/asanas';
import { filterAsanas } from '@/utils/filterAsanas';
import { useSequence } from './SequenceProvider';

const POSITION_LABELS: Record<AsanaPosition, string> = {
  standing: '선 자세',
  seated: '앉은 자세',
  prone: '엎드린 자세',
  supine: '누운 자세',
};

const POSITIONS: AsanaPosition[] = ['standing', 'seated', 'prone', 'supine'];

export default function LibraryPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activePosition, setActivePosition] = useState<AsanaPosition | null>(null);
  const { addItem } = useSequence();

  const filtered = filterAsanas(asanas, searchTerm, activePosition);

  return (
    <div className="flex h-full flex-col">
      <p className="mb-4 text-[10px] font-black tracking-widest text-stone-400 uppercase">Library</p>

      {/* 검색 */}
      <div className="relative mb-4">
        <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-stone-300" />
        <input
          className="w-full rounded-xl border border-stone-200 bg-stone-50 py-2.5 pl-9 pr-3 text-[13px] text-stone-900 outline-none transition-all placeholder:text-stone-300 focus:border-stone-400 focus:bg-white"
          placeholder="아사나 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 위치 필터 */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        <button
          onClick={() => setActivePosition(null)}
          className={`rounded-full border px-3 py-1 text-[10px] font-bold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-1 ${
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
            className={`rounded-full border px-3 py-1 text-[10px] font-bold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-1 ${
              activePosition === pos
                ? 'border-stone-800 bg-stone-800 text-white'
                : 'border-stone-200 text-stone-400 hover:border-stone-400 hover:text-stone-600'
            }`}
          >
            {POSITION_LABELS[pos]}
          </button>
        ))}
      </div>

      {/* 아사나 목록 */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-[12px] text-stone-300">검색 결과 없음</div>
        ) : (
          <div className="space-y-2 pr-1">
            {filtered.map((asana) => (
              <DraggableAsanaCard key={asana.id} asana={asana} onAdd={addItem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DraggableAsanaCard({ asana, onAdd }: { asana: Asana; onAdd: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `library-${asana.id}`,
    data: { type: 'library', asanaId: asana.id },
  });

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() => onAdd(asana.id)}
      className={`group flex w-full items-center gap-3 rounded-2xl border border-stone-100 bg-white p-3 text-left transition-all hover:border-stone-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-1 ${
        isDragging ? 'opacity-30' : ''
      }`}
    >
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-stone-100">
        {asana.imageUrl ? (
          <Image src={asana.imageUrl} alt={asana.name_ko} fill className="object-contain p-1" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Wind className="h-4 w-4 text-stone-300" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-bold text-stone-800">{asana.name_ko}</p>
        <p className="truncate font-serif text-[10px] text-stone-400 italic">{asana.name_sanskrit}</p>
      </div>

      <Plus className="h-4 w-4 flex-shrink-0 text-stone-300 opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
}
