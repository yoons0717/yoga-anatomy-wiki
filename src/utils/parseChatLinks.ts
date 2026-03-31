export interface ChatLinks {
  muscles: string[];
  asanas: string[];
}

const LINKS_PARSE_REGEX = /<links>([\s\S]*?)<\/links>/;
const LINKS_STRIP_REGEX = /<links>[\s\S]*$/;

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
