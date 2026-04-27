import Image from 'next/image';
import { Wind } from 'lucide-react';
import { asanas } from '@/data/asanas';

const asanasMap = Object.fromEntries(asanas.map((a) => [a.id, a]));

interface DragOverlayCardProps {
  asanaId: string;
}

export default function DragOverlayCard({ asanaId }: DragOverlayCardProps) {
  const asana = asanasMap[asanaId];
  if (!asana) return null;

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-3 py-3 shadow-xl shadow-stone-200/60 ring-1 ring-stone-100">
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-stone-100">
        {asana.imageUrl ? (
          <Image src={asana.imageUrl} alt={asana.name_ko} fill className="object-contain p-1" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Wind className="h-4 w-4 text-stone-300" />
          </div>
        )}
      </div>
      <div className="min-w-0">
        <p className="truncate text-[13px] font-bold text-stone-800">{asana.name_ko}</p>
        <p className="truncate font-serif text-[10px] text-stone-400 italic">{asana.name_sanskrit}</p>
      </div>
    </div>
  );
}
