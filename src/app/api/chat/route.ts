import Groq from 'groq-sdk';
import { allMuscles } from '@/data/muscles';
import { asanas } from '@/data/asanas';
import { parseChatLinks, findLinksStart } from '@/utils/parseChatLinks';

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
2. 답변 마지막에 반드시 아래 형식을 그대로 사용하세요. 태그 이름(<links>, </links>)은 절대 번역하거나 변경하지 마세요.
3. 관련 없는 경우 빈 배열로 두세요.

<links>{"muscles":["id1","id2"],"asanas":["id1","id2"]}</links>`;

const SSE_HEADERS = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'Connection': 'keep-alive',
};

function sendSSE(controller: ReadableStreamDefaultController, encoder: TextEncoder, data: object) {
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
}

async function streamChatResponse(
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder,
  query: string,
) {
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

    let sentLength = 0;
    let linksIdx = -1;

    for await (const chunk of chatStream) {
      const text = chunk.choices[0]?.delta?.content ?? '';
      if (text) {
        fullText += text;
        if (linksIdx === -1) linksIdx = findLinksStart(fullText);
        // 청크 경계에서 <links> 태그가 분할되지 않도록 마지막 6자 버퍼링
        const safeLength = linksIdx !== -1 ? linksIdx : Math.max(sentLength, fullText.length - 6);
        if (safeLength > sentLength) {
          sendSSE(controller, encoder, { type: 'text', content: fullText.slice(sentLength, safeLength) });
          sentLength = safeLength;
        }
      }
    }

    // 루프 종료 후 버퍼에 남은 텍스트 플러시
    const flushEnd = linksIdx !== -1 ? linksIdx : fullText.length;
    if (flushEnd > sentLength) {
      sendSSE(controller, encoder, { type: 'text', content: fullText.slice(sentLength, flushEnd) });
    }

    const links = parseChatLinks(fullText);
    if (links.muscles.length > 0 || links.asanas.length > 0) {
      sendSSE(controller, encoder, { type: 'links', ...links });
    }

    controller.enqueue(encoder.encode('data: [DONE]\n\n'));
  } catch (error) {
    console.error('[chat] error:', error);
    sendSSE(controller, encoder, { type: 'error', message: '답변 생성 중 오류가 발생했습니다.' });
  } finally {
    controller.close();
  }
}

export async function POST(req: Request) {
  const { query } = await req.json();

  if (!query?.trim()) {
    return Response.json({ error: '질문을 입력해주세요.' }, { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start: (controller) => streamChatResponse(controller, encoder, query),
  });
  return new Response(stream, { headers: SSE_HEADERS });
}
