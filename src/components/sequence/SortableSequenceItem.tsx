import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Wind, X, GripVertical } from 'lucide-react';
import { SequenceItem } from '@/types/anatomy';
import { asanas } from '@/data/asanas';
import { useSequence } from './SequenceProvider';

const asanasMap = Object.fromEntries(asanas.map((a) => [a.id, a]));

interface SortableSequenceItemProps {
  item: SequenceItem;
  index: number;
}

export default function SortableSequenceItem({ item, index }: SortableSequenceItemProps) {
  const { removeItem } = useSequence();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.uid,
    data: { type: 'sequence', index },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const asana = asanasMap[item.asanaId];
  if (!asana) return null;

  return (
    <motion.li
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: isDragging ? 0.3 : 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.15 }}
      className="flex items-center gap-3 rounded-2xl border border-stone-100 bg-white p-3"
    >
      {/* 순서 번호 + 드래그 핸들 */}
      <div className="flex flex-shrink-0 flex-col items-center gap-1">
        <span className="text-[10px] font-black text-stone-300">{index + 1}</span>
        <button
          {...listeners}
          {...attributes}
          className="cursor-grab touch-none text-stone-200 transition-colors hover:text-stone-400 focus-visible:outline-none active:cursor-grabbing"
          aria-label="드래그하여 순서 변경"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </div>

      {/* 썸네일 */}
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-stone-100">
        {asana.imageUrl ? (
          <Image src={asana.imageUrl} alt={asana.name_ko} fill className="object-contain p-1" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Wind className="h-4 w-4 text-stone-300" />
          </div>
        )}
      </div>

      {/* 이름 */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-bold text-stone-800">{asana.name_ko}</p>
        <p className="truncate font-serif text-[10px] text-stone-400 italic">{asana.name_sanskrit}</p>
      </div>

      {/* 제거 버튼 */}
      <button
        onClick={() => removeItem(item.uid)}
        className="flex-shrink-0 rounded-lg p-1 text-stone-300 transition-colors hover:bg-stone-100 hover:text-stone-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500"
        aria-label={`${asana.name_ko} 제거`}
      >
        <X className="h-4 w-4" />
      </button>
    </motion.li>
  );
}
