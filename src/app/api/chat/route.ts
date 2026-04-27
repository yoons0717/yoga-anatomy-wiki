import Groq from 'groq-sdk';
import { allMuscles } from '@/data/muscles';
import { asanas } from '@/data/asanas';
import { parseChatLinks, findLinksStart } from '@/utils/parseChatLinks';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const musclesData = allMuscles.map(({ id, name_ko, name_en, category, action }) => ({
  id,
  name_ko,
  name_en,
  category,
  action,
}));

const asanasData = asanas.map(
  ({ id, name_ko, name_en, name_sanskrit, position, activated_muscles, stretched_muscles }) => ({
    id,
    name_ko,
    name_en,
    name_sanskrit,
    position,
    activated_muscles,
    stretched_muscles,
  }),
);

const SYSTEM_PROMPT = `당신은 한국어로만 답변하는 요가 해부학 전문가입니다.

## 언어 규칙 (절대적)
- 모든 문장은 순수한 한국어로 작성합니다
- 한자, 영어 단어, 터키어·일본어 등 외국어를 문장 안에 삽입하지 않습니다
- 고유명사는 반드시 "한국어(영어)" 형식으로 씁니다
  - 올바른 예: 발라사나(Balasana), 대퇴사두근(Quadriceps)
  - 잘못된 예: 四頭筋, Quadriceps가 수축, 髋关节 유연성

## 올바른 답변 예시
질문: "고관절 유연성을 높이려면?"
답변: "고관절(Hip Joint) 유연성을 높이려면 고관절 굴곡근과 외회전근을 함께 풀어주는 것이 중요합니다. 비라바드라사나(Virabhadrasana)나 에카 파다 라자카포타사나(Eka Pada Rajakapotasana)가 효과적입니다."

[근육 데이터]
${JSON.stringify(musclesData)}

[아사나 데이터]
${JSON.stringify(asanasData)}

## 답변 형식
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
      temperature: 0.3,
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
