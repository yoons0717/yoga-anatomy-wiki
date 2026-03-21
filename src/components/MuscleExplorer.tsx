'use client';

import { Muscle } from '@/types/anatomy';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export default function MuscleExplorer({
  muscles,
  muscleId,
}: {
  muscles: Muscle[];
  muscleId: string;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(muscleId);

  return (
    <div className="flex flex-col gap-8 rounded-[2.5rem] border border-stone-100 bg-white p-6 shadow-sm sm:gap-10 sm:rounded-[3.3rem] sm:p-10 lg:flex-row">
      <div className="relative mx-auto w-full max-w-105 shrink-0 lg:mx-0 lg:max-w-115">
        <Image
          src="/images/muscles/upper.png"
          alt="Anatomy"
          width={460}
          height={550}
          className="h-auto w-full object-contain opacity-90"
          priority
        />

        {muscles.map((m) => (
          <div
            key={m.id}
            onClick={() => setSelectedId(m.id)}
            className={`absolute z-10 cursor-pointer rounded-full transition-all duration-300 ${
              selectedId === m.id
                ? 'scale-110 bg-sky-500/20 shadow-lg ring-2 ring-sky-400/30'
                : 'bg-stone-900/10 hover:bg-sky-500/10'
            }`}
            style={m.area}
          />
        ))}
      </div>

      {/* 리스트 영역: 모바일에서 가독성을 위해 간격 및 폰트 사이즈 조정 */}
      <div className="w-full flex-1 space-y-2">
        <h2 className="mb-4 text-[10px] font-black tracking-[0.3em] text-stone-400 uppercase sm:mb-6">
          Muscle Explorer
        </h2>
        <div className="custom-scrollbar max-h-[350px] overflow-y-auto pr-1 sm:max-h-[450px]">
          {muscles.map((m) => (
            <div
              key={m.id}
              className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                selectedId === m.id ? 'border-stone-200 bg-stone-50/50' : 'border-transparent'
              }`}
            >
              <button
                onClick={() => setSelectedId(selectedId === m.id ? null : m.id)}
                className={`flex w-full items-center justify-between p-4 text-left transition-all sm:p-5 ${
                  selectedId === m.id ? 'text-stone-900' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <span className="text-[13px] font-bold tracking-tight sm:text-sm">
                  {m.name_en}{' '}
                  <span className="ml-1 text-[10px] font-medium opacity-50 sm:text-[11px]">
                    ({m.name_ko})
                  </span>
                </span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform sm:h-4 sm:w-4 ${selectedId === m.id ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  selectedId === m.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-4 pb-5 text-[12px] leading-relaxed break-keep text-stone-500 sm:px-5 sm:text-[13px]">
                    {m.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
