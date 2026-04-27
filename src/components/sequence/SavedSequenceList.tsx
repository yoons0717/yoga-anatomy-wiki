'use client';

import { Trash2, PlayCircle, X } from 'lucide-react';
import { useSequence } from './SequenceProvider';

interface SavedSequenceListProps {
  onClose: () => void;
}

export default function SavedSequenceList({ onClose }: SavedSequenceListProps) {
  const { saved, load, deleteSaved } = useSequence();

  if (saved.length === 0) {
    return (
      <div className="flex items-center justify-between rounded-2xl border border-stone-100 bg-stone-50 p-4">
        <p className="text-[12px] text-stone-400">저장된 시퀀스가 없습니다.</p>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-stone-300 hover:text-stone-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[10px] font-black tracking-widest text-stone-400 uppercase">저장된 시퀀스</p>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-stone-300 hover:text-stone-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {saved.map((seq) => (
          <div
            key={seq.id}
            className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2"
          >
            <span className="text-[12px] font-bold text-stone-700">{seq.name}</span>
            <span className="text-[10px] text-stone-400">{seq.items.length} poses</span>
            <button
              onClick={() => { load(seq); onClose(); }}
              className="rounded p-0.5 text-stone-400 hover:text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500"
              aria-label={`${seq.name} 불러오기`}
            >
              <PlayCircle className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => deleteSaved(seq.id)}
              className="rounded p-0.5 text-stone-300 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500"
              aria-label={`${seq.name} 삭제`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
