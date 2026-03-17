'use client';

import { Muscle } from '@/types/anatomy';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export default function MuscleExplorer({ muscles }: { muscles: Muscle[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-10 rounded-[3rem] border border-stone-100 bg-white p-10 shadow-sm lg:flex-row">
      <div className="relative mx-auto aspect-3/4 w-full max-w-95 shrink-0">
        <Image
          src="/images/muscles/trunk.png"
          alt="Anatomy"
          fill
          className="object-contain opacity-90 grayscale-[0.2]"
          priority
        />

        {muscles.map((m) => (
          <div
            key={m.id}
            onClick={() => setSelectedId(m.id)}
            className={`absolute z-10 cursor-pointer rounded-full transition-all duration-300 ease-in-out ${
              selectedId === m.id
                ? 'bg-stone-900/10 shadow-lg ring-1 ring-stone-400'
                : 'hover:bg-stone-200/20'
            }`}
            style={m.area}
          />
        ))}
      </div>

      <div className="w-full flex-1 space-y-2">
        <h2 className="mb-6 text-[10px] font-black tracking-[0.3em] text-stone-400 uppercase">
          Muscle Explorer
        </h2>
        <div className="custom-scrollbar max-h-112.5 overflow-y-auto pr-2">
          {muscles.map((m) => (
            <div
              key={m.id}
              className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                selectedId === m.id ? 'border-stone-200 bg-stone-50/50' : 'border-transparent'
              }`}
            >
              <button
                onClick={() => setSelectedId(selectedId === m.id ? null : m.id)}
                className={`flex w-full items-center justify-between p-5 text-left transition-all ${
                  selectedId === m.id ? 'text-stone-900' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <span className="text-sm font-bold tracking-tight">
                  {m.name_en}{' '}
                  <span className="ml-1 text-[11px] font-medium opacity-50">({m.name_ko})</span>
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${selectedId === m.id ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  selectedId === m.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-[13px] leading-relaxed text-stone-500">
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
