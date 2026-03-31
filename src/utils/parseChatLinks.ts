export interface ChatLinks {
  muscles: string[];
  asanas: string[];
}

// LLM이 <links>를 한국어 '링크'로 번역하는 경우도 처리
const LINKS_PARSE_REGEX = /(?:<links>|링크)(\{[\s\S]*?\})(?:<\/links>)?/;
const LINKS_STRIP_REGEX = /\s*[-•*]?\s*(?:<links>|링크)[\s\S]*$/;

/** <links> 또는 링크{ 중 먼저 나오는 위치 반환. 없으면 -1 */
export function findLinksStart(text: string): number {
  const i1 = text.indexOf('<links>');
  const i2 = text.indexOf('링크{');
  if (i1 === -1) return i2;
  if (i2 === -1) return i1;
  return Math.min(i1, i2);
}

export function parseChatLinks(text: string): ChatLinks {
  const match = text.match(LINKS_PARSE_REGEX);
  if (!match) return { muscles: [], asanas: [] };

  try {
    const parsed = JSON.parse(match[1]);
    return {
      muscles: parsed.muscles ?? [],
      asanas: parsed.asanas ?? [],
    };
  } catch {
    return { muscles: [], asanas: [] };
  }
}

export function stripChatLinks(text: string): string {
  return text.replace(LINKS_STRIP_REGEX, '').trim();
}
