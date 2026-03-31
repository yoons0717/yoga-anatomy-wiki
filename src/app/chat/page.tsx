'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send, Loader2 } from 'lucide-react';
import { allMuscles } from '@/data/muscles';
import { asanas } from '@/data/asanas';
import { stripChatLinks } from '@/utils/parseChatLinks';
import PageWrapper from '@/components/PageWrapper';
import PageHeader from '@/components/PageHeader';

const EXAMPLE_QUERIES = [
  '어깨 외회전이 잘 안 돼요',
  '햄스트링이 항상 당겨요',
  '요통 완화에 좋은 자세는?',
  '고관절 유연성을 높이려면?',
  '목이 자주 뭉치는데 도움이 될 자세가 있을까요?',
];

export default function ChatPage() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [relatedMuscleIds, setRelatedMuscleIds] = useState<string[]>([]);
  const [relatedAsanaIds, setRelatedAsanaIds] = useState<string[]>([]);
  const [hasResponse, setHasResponse] = useState(false);

  const muscleMap = Object.fromEntries(allMuscles.map((m) => [m.id, m]));
  const asanaMap = Object.fromEntries(asanas.map((a) => [a.id, a]));

  async function handleSubmit(q: string) {
    if (!q.trim() || isLoading) return;

    setIsLoading(true);
    setAnswer('');
    setRelatedMuscleIds([]);
    setRelatedAsanaIds([]);
    setHasResponse(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });

      if (!res.ok || !res.body) throw new Error('API 오류');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      outer: while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = decoder.decode(value).split('\n');
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6);
          if (data === '[DONE]') break outer;

          try {
            const parsed = JSON.parse(data);
            if (parsed.type === 'text') {
              setAnswer((prev) => prev + parsed.content);
            } else if (parsed.type === 'links') {
              setRelatedMuscleIds(parsed.muscles ?? []);
              setRelatedAsanaIds(parsed.asanas ?? []);
            } else if (parsed.type === 'error') {
              setAnswer(parsed.message);
            }
          } catch {}
        }
      }
    } catch {
      setAnswer('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }

  const displayAnswer = stripChatLinks(answer);

  return (
    <PageWrapper>
      <PageHeader title="Ask" subtitle="요가 해부학 AI 상담 — 증상이나 궁금한 점을 자유롭게 질문하세요." />

      <div className="mb-8 flex flex-wrap gap-2 sm:mb-10">
        {EXAMPLE_QUERIES.map((q) => (
          <button
            key={q}
            onClick={() => {
              setQuery(q);
              handleSubmit(q);
            }}
            disabled={isLoading}
            className="rounded-full border border-stone-200 px-4 py-1.5 text-[12px] font-medium text-stone-500 transition-all hover:border-stone-400 hover:text-stone-700 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="relative mb-12 sm:mb-16">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(query);
            }
          }}
          placeholder="궁금한 증상이나 질문을 입력하세요..."
          rows={3}
          className="w-full resize-none rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 pr-14 text-[15px] text-stone-900 outline-none transition-all placeholder:text-stone-300 focus:border-stone-400 focus:bg-white sm:text-base"
        />
        <button
          onClick={() => handleSubmit(query)}
          disabled={isLoading || !query.trim()}
          className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-xl bg-stone-800 text-white transition-all hover:bg-stone-900 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-300 focus-visible:ring-offset-2"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>

      {hasResponse && (
        <div className="space-y-12 border-t border-stone-100 pt-10">
          {isLoading && !displayAnswer && (
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 animate-bounce rounded-full bg-stone-300 [animation-delay:0ms]" />
              <div className="h-2 w-2 animate-bounce rounded-full bg-stone-300 [animation-delay:150ms]" />
              <div className="h-2 w-2 animate-bounce rounded-full bg-stone-300 [animation-delay:300ms]" />
            </div>
          )}

          {displayAnswer && (
            <p className="whitespace-pre-wrap text-[15px] leading-[1.85] text-stone-700 sm:text-base">
              {displayAnswer}
            </p>
          )}

          {relatedMuscleIds.length > 0 && (
            <section>
              <p className="mb-6 text-[10px] font-black tracking-[0.25em] text-stone-400 uppercase">
                관련 근육
              </p>
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedMuscleIds.map((id) => {
                  const m = muscleMap[id];
                  if (!m) return null;
                  return (
                    <Link
                      key={id}
                      href={`/muscles/${id}`}
                      className="group flex flex-col justify-between rounded-[2rem] border border-stone-100 bg-stone-50/50 p-7 transition-all active:scale-[0.98] sm:p-9 sm:hover:-translate-y-1 sm:hover:bg-white sm:hover:shadow-xl sm:hover:shadow-stone-200/40"
                    >
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold tracking-tight text-stone-800 sm:group-hover:text-black">
                          {m.name_ko}
                        </h3>
                        <p className="text-[11px] font-bold tracking-widest text-stone-400 uppercase sm:group-hover:text-stone-500">
                          {m.name_en}
                        </p>
                      </div>
                      <div className="mt-8 flex items-center gap-2 opacity-40 transition-all sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                        <span className="text-[10px] font-black tracking-tighter text-stone-800 uppercase">
                          View Details
                        </span>
                        <div className="h-px w-4 bg-stone-800" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {relatedAsanaIds.length > 0 && (
            <section>
              <p className="mb-6 text-[10px] font-black tracking-[0.25em] text-stone-400 uppercase">
                관련 아사나
              </p>
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedAsanaIds.map((id) => {
                  const a = asanaMap[id];
                  if (!a) return null;
                  return (
                    <Link
                      key={id}
                      href={`/asanas/${id}`}
                      className="group flex flex-col justify-between rounded-[2rem] border border-stone-100 bg-stone-50/50 p-7 transition-all active:scale-[0.98] sm:p-9 sm:hover:-translate-y-1 sm:hover:bg-white sm:hover:shadow-xl sm:hover:shadow-stone-200/40"
                    >
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold tracking-tight text-stone-800 sm:group-hover:text-black">
                          {a.name_ko}
                        </h3>
                        <div className="space-y-1">
                          <p className="font-serif text-[10px] text-stone-500 italic sm:text-[11px] sm:group-hover:text-stone-700">
                            {a.name_sanskrit}
                          </p>
                          <p className="text-[9px] font-bold tracking-widest text-stone-400 uppercase sm:text-[10px]">
                            {a.name_en}
                          </p>
                        </div>
                      </div>
                      <div className="mt-8 flex items-center gap-2 opacity-40 transition-all sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                        <span className="text-[10px] font-black tracking-tighter text-stone-800 uppercase">
                          Practice Guide
                        </span>
                        <div className="h-px w-4 bg-stone-800" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      )}
    </PageWrapper>
  );
}
