import Groq from 'groq-sdk';
import { allMuscles } from '@/data/muscles';
import { asanas } from '@/data/asanas';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const musclesData = allMuscles.map(({ id, name_ko, name_en, category, action, description }) => ({
  id,
  name_ko,
  name_en,
  category,
  action,
  description,
}));

const asanasData = asanas.map(
  ({ id, name_ko, name_en, name_sanskrit, description, position, activated_muscles, stretched_muscles }) => ({
    id,
    name_ko,
    name_en,
    name_sanskrit,
    description,
    position,
    activated_muscles,
    stretched_muscles,
  }),
);

const SYSTEM_PROMPT = `당신은 요가 해부학 전문가입니다. 사용자의 몸 상태나 요가 관련 질문에 한국어로 친절하고 구체적으로 답변합니다.

[근육 데이터]
${JSON.stringify(musclesData)}

[아사나 데이터]
${JSON.stringify(asanasData)}

답변 규칙:
1. 2~4 문단으로 해부학적 근거를 포함한 실용적인 설명을 제공하세요.
2. 답변 마지막에 반드시 아래 형식으로 관련 근육과 아사나 ID를 포함하세요.
3. 관련 없는 경우 빈 배열로 두세요.
<links>{"muscles":["id1","id2"],"asanas":["id1","id2"]}</links>`;

export async function POST(req: Request) {
  const { query } = await req.json();

  if (!query?.trim()) {
    return Response.json({ error: '질문을 입력해주세요.' }, { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        let fullText = '';

        const chatStream = await groq.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: query },
          ],
          stream: true,
          max_tokens: 4096,
        });

        for await (const chunk of chatStream) {
          const text = chunk.choices[0]?.delta?.content ?? '';
          if (text) {
            fullText += text;
            const payload = JSON.stringify({ type: 'text', content: text });
            controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
          }
        }

        const match = fullText.match(/<links>([\s\S]*?)<\/links>/);
        if (match) {
          try {
            const links = JSON.parse(match[1]);
            const linksPayload = JSON.stringify({
              type: 'links',
              muscles: links.muscles ?? [],
              asanas: links.asanas ?? [],
            });
            controller.enqueue(encoder.encode(`data: ${linksPayload}\n\n`));
          } catch {}
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      } catch (error) {
        console.error('[chat] error:', error);
        const errPayload = JSON.stringify({ type: 'error', message: '답변 생성 중 오류가 발생했습니다.' });
        controller.enqueue(encoder.encode(`data: ${errPayload}\n\n`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
