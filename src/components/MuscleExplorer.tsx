'use client';

import { Muscle } from '@/types/anatomy';
import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function MuscleExplorer({
  muscles,
  muscleId,
  imageSrc,
  imageAlt = '근육 해부도',
}: {
  muscles: Muscle[];
  muscleId?: string;
  imageSrc: string;
  imageAlt?: string;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(muscleId ?? null);
  const selectedMuscle = muscles.find((m) => m.id === selectedId) ?? null;

  return (
    <div className="overflow-hidden rounded-[2.5rem] border border-stone-100 bg-white shadow-sm sm:rounded-[3.3rem]">
      <div className="relative p-6 sm:p-10">
        <div className="relative mx-auto aspect-[460/550] w-full max-w-105">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain opacity-90"
            priority
          />

          {muscles
            .filter((m) => m.area)
            .map((m) => (
              <div
                key={m.id}
                role="button"
                tabIndex={0}
                aria-label={`${m.name_ko} 영역 선택`}
                aria-pressed={selectedId === m.id}
                onClick={() => setSelectedId(selectedId === m.id ? null : m.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedId(selectedId === m.id ? null : m.id);
                  }
                }}
                className={`absolute z-10 cursor-pointer rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-1 ${
                  selectedId === m.id
                    ? 'bg-white/20 shadow-[0_0_16px_4px_rgba(255,255,255,0.35)] ring-2 ring-white/90'
                    : 'bg-stone-900/10 hover:bg-white/15'
                }`}
                style={m.area}
              />
            ))}

          {selectedMuscle?.area && <MuscleTooltip muscle={selectedMuscle} />}
        </div>
      </div>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          selectedMuscle ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          {selectedMuscle && (
            <MuscleDetailPanel
              muscle={selectedMuscle}
              onClose={() => setSelectedId(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function MuscleTooltip({ muscle }: { muscle: Muscle }) {
  const area = muscle.area!;
  const areaTop = parseFloat(area.top);
  const areaLeft = parseFloat(area.left);
  const areaWidth = parseFloat(area.width);

  const isRightEdge = areaLeft + areaWidth / 2 > 75;
  const tooltipLeft = isRightEdge ? areaLeft + areaWidth : areaLeft + areaWidth / 2;
  const transformX = isRightEdge ? '-100%' : '-50%';

  return (
    <div
      className="pointer-events-none absolute z-20 whitespace-nowrap rounded-xl bg-stone-900 px-3 py-2 shadow-lg"
      style={{
        top: `${areaTop}%`,
        left: `${tooltipLeft}%`,
        transform: `translate(${transformX}, calc(-100% - 8px))`,
      }}
    >
      <p className="text-[12px] font-bold text-white">{muscle.name_en}</p>
      <p className="text-[10px] text-stone-400">
        {muscle.name_ko}
        {muscle.action.length > 0 && ` · ${muscle.action[0]}`}
      </p>
    </div>
  );
}

function MuscleDetailPanel({
  muscle,
  onClose,
}: {
  muscle: Muscle;
  onClose: () => void;
}) {
  return (
    <div className="border-t border-stone-100 px-6 py-6 sm:px-10 sm:py-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-bold tracking-tight text-stone-800">
            {muscle.name_en}
            <span className="ml-2 text-xs font-medium text-stone-400">
              {muscle.name_ko}
            </span>
          </h3>
          {muscle.action.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {muscle.action.map((act) => (
                <span
                  key={act}
                  className="rounded-full bg-stone-100 px-3 py-1 text-[11px] font-medium text-stone-600"
                >
                  {act}
                </span>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          aria-label="닫기"
          className="mt-0.5 shrink-0 rounded-full p-1.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-4 break-keep text-[13px] leading-relaxed text-stone-500">
        {muscle.description}
      </p>

      {(muscle.origin || muscle.insertion) && (
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
          {muscle.origin && (
            <p className="text-[11px] text-stone-400">
              <span className="font-semibold text-stone-500">기시</span> {muscle.origin}
            </p>
          )}
          {muscle.insertion && (
            <p className="text-[11px] text-stone-400">
              <span className="font-semibold text-stone-500">정지</span> {muscle.insertion}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
