'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { AnimatePresence } from 'framer-motion';
import { Wind } from 'lucide-react';
import { useSequence } from './SequenceProvider';
import SortableSequenceItem from './SortableSequenceItem';

export default function SequencePanel() {
  const { current, rename } = useSequence();
  const itemIds = current.items.map((i) => i.uid);

  const { setNodeRef, isOver } = useDroppable({ id: 'sequence-drop-zone' });

  return (
    <div className="flex h-full flex-col">
      {/* 헤더: 이름 + 카운트 */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <input
          value={current.name}
          onChange={(e) => rename(e.target.value)}
          className="min-w-0 flex-1 border-b border-transparent bg-transparent text-lg font-bold text-stone-800 outline-none transition-colors hover:border-stone-200 focus:border-stone-400"
          aria-label="시퀀스 이름"
        />
        <span className="flex-shrink-0 text-[11px] font-bold text-stone-400">
          {current.items.length} poses
        </span>
      </div>

      {/* 시퀀스 아이템 목록 */}
      <div className="flex-1 overflow-y-auto">
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          {current.items.length === 0 ? (
            <div
              ref={setNodeRef}
              className={`flex h-full flex-col items-center justify-center rounded-2xl border-2 border-dashed py-16 text-center transition-colors ${
                isOver ? 'border-stone-400 bg-stone-50' : 'border-stone-200'
              }`}
            >
              <Wind className={`mb-3 h-8 w-8 transition-colors ${isOver ? 'text-stone-400' : 'text-stone-200'}`} />
              <p className="text-[13px] text-stone-300">
                {isOver ? '여기에 놓으세요' : '왼쪽에서 아사나를 추가하세요'}
              </p>
            </div>
          ) : (
            <ol className="space-y-2 pr-1">
              <AnimatePresence initial={false}>
                {current.items.map((item, index) => (
                  <SortableSequenceItem key={item.uid} item={item} index={index} />
                ))}
              </AnimatePresence>
              {/* 아이템이 있을 때도 하단에 드롭존 */}
              <div
                ref={setNodeRef}
                className={`rounded-xl py-3 text-center text-[11px] transition-colors ${
                  isOver ? 'bg-stone-100 text-stone-500' : 'text-stone-200'
                }`}
              >
                {isOver ? '여기에 놓으세요' : '+ 더 추가하기'}
              </div>
            </ol>
          )}
        </SortableContext>
      </div>
    </div>
  );
}
