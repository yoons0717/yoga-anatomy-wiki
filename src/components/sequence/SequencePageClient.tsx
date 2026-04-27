'use client';

import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import { BookMarked } from 'lucide-react';
import { useSequence } from './SequenceProvider';
import LibraryPanel from './LibraryPanel';
import SequencePanel from './SequencePanel';
import SavedSequenceList from './SavedSequenceList';
import DragOverlayCard from './DragOverlayCard';

type LibraryDragData = { type: 'library'; asanaId: string };
type SequenceDragData = { type: 'sequence'; index: number };

function isLibraryData(data: LibraryDragData | SequenceDragData): data is LibraryDragData {
  return data.type === 'library';
}

export default function SequencePageClient() {
  const { save, newSequence, saved, addItem, reorder, current } = useSequence();
  const [showSaved, setShowSaved] = useState(false);
  const [activeAsanaId, setActiveAsanaId] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  function handleSave() {
    save();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1500);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  function handleDragStart(event: DragStartEvent) {
    const data = event.active.data.current as LibraryDragData | SequenceDragData | undefined;
    if (data && isLibraryData(data)) {
      setActiveAsanaId(data.asanaId);
    } else if (data) {
      const sequenceData = data as SequenceDragData;
      const item = current.items[sequenceData.index];
      if (item) setActiveAsanaId(item.asanaId);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveAsanaId(null);
    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current as LibraryDragData | SequenceDragData | undefined;
    if (!activeData) return;

    if (isLibraryData(activeData)) {
      // 라이브러리 → 시퀀스 드롭
      const isDropZone = over.id === 'sequence-drop-zone';
      const isSequenceItem = current.items.some((i) => i.uid === over.id);
      if (isDropZone || isSequenceItem) {
        addItem(activeData.asanaId);
      }
    } else {
      // 시퀀스 내 재정렬
      if (active.id !== over.id) {
        const oldIndex = current.items.findIndex((i) => i.uid === active.id);
        const newIndex = current.items.findIndex((i) => i.uid === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          reorder(oldIndex, newIndex);
        }
      }
    }
  }

  return (
    <DndContext id="sequence-dnd" sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} autoScroll={false}>
      <div className="flex h-[calc(100vh-12rem)] flex-col">
        {/* 상단 헤더 */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-stone-900 sm:text-3xl">Sequence Builder</h2>
            <p className="mt-0.5 text-[12px] text-stone-400">아사나를 선택해 나만의 수련 시퀀스를 구성하세요.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSaved((v) => !v)}
              className="relative flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-2 text-[12px] font-bold text-stone-600 transition-all hover:border-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500"
            >
              <BookMarked className="h-3.5 w-3.5" />
              저장된 시퀀스
              {saved.length > 0 && (
                <span className="ml-0.5 rounded-full bg-stone-800 px-1.5 py-0.5 text-[9px] font-black text-white">
                  {saved.length}
                </span>
              )}
            </button>
            <button
              onClick={newSequence}
              className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-[12px] font-bold text-stone-600 transition-all hover:border-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500"
            >
              새 시퀀스
            </button>
            <button
              onClick={handleSave}
              disabled={isSaved}
              className={`rounded-xl px-4 py-2 text-[12px] font-bold text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 ${
                isSaved ? 'bg-stone-400 cursor-default' : 'bg-stone-900 hover:bg-stone-700'
              }`}
            >
              {isSaved ? '저장됨 ✓' : '저장'}
            </button>
          </div>
        </div>

        {/* 저장된 시퀀스 패널 */}
        {showSaved && (
          <div className="mb-4">
            <SavedSequenceList onClose={() => setShowSaved(false)} />
          </div>
        )}

        {/* 메인 2-패널 레이아웃 */}
        <div className="grid min-h-0 flex-1 grid-cols-[340px_1fr] gap-4">
          <div className="overflow-hidden rounded-2xl border border-stone-100 bg-white p-4">
            <LibraryPanel />
          </div>
          <div className="overflow-hidden rounded-2xl border border-stone-100 bg-white p-4">
            <SequencePanel />
          </div>
        </div>
      </div>

      {/* 드래그 중 ghost 카드 */}
      <DragOverlay dropAnimation={null}>
        {activeAsanaId && <DragOverlayCard asanaId={activeAsanaId} />}
      </DragOverlay>
    </DndContext>
  );
}
