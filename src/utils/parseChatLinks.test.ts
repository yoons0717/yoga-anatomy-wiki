// parseChatLinks / stripChatLinks: LLM 응답 텍스트에 포함된 <links> 태그 처리
//
// LLM은 응답 끝에 아래 형태로 관련 ID를 붙여서 반환함:
//   "...설명 텍스트...\n<links>{"muscles":["um1"],"asanas":["a2"]}</links>"
//
// parseChatLinks: <links> 안의 JSON을 파싱해 { muscles, asanas } 반환
// stripChatLinks: <links> 태그 이하를 잘라내 화면에 표시할 텍스트만 남김
import { describe, it, expect } from 'vitest';
import { parseChatLinks, stripChatLinks } from './parseChatLinks';

describe('parseChatLinks', () => {
  it('정상적인 <links> 태그에서 근육/아사나 ID를 파싱한다', () => {
    const text = '설명 텍스트입니다.\n<links>{"muscles":["um1","um3"],"asanas":["a2","a7"]}</links>';
    expect(parseChatLinks(text)).toEqual({ muscles: ['um1', 'um3'], asanas: ['a2', 'a7'] });
  });

  it('<links> 태그가 없으면 빈 배열을 반환한다', () => {
    expect(parseChatLinks('링크 없는 응답')).toEqual({ muscles: [], asanas: [] });
  });

  // 에러 처리 — LLM이 잘못된 JSON을 생성해도 앱이 터지지 않아야 함
  it('JSON이 깨진 경우 빈 배열을 반환한다', () => {
    expect(parseChatLinks('<links>invalid json</links>')).toEqual({ muscles: [], asanas: [] });
  });

  // 부분 필드 — LLM이 한쪽 필드를 생략해도 기본값으로 보정
  it('muscles 필드만 있는 경우 asanas는 빈 배열로 반환한다', () => {
    const text = '<links>{"muscles":["um1"]}</links>';
    expect(parseChatLinks(text)).toEqual({ muscles: ['um1'], asanas: [] });
  });

  it('빈 배열인 경우도 정상 파싱한다', () => {
    const text = '<links>{"muscles":[],"asanas":[]}</links>';
    expect(parseChatLinks(text)).toEqual({ muscles: [], asanas: [] });
  });

  it('빈 JSON 객체인 경우 빈 배열을 반환한다', () => {
    expect(parseChatLinks('<links>{}</links>')).toEqual({ muscles: [], asanas: [] });
  });

  // LLM이 <links> 태그명을 한국어 '링크'로 번역하는 케이스 처리
  it('링크{ 형식으로 온 경우도 파싱한다', () => {
    const text = '설명 텍스트입니다.\n링크{"muscles":["um1","um3"],"asanas":["a2"]}</links>';
    expect(parseChatLinks(text)).toEqual({ muscles: ['um1', 'um3'], asanas: ['a2'] });
  });
});

describe('stripChatLinks', () => {
  it('<links> 태그와 이후 텍스트를 제거한다', () => {
    const text = '설명 텍스트입니다.\n<links>{"muscles":["um1"],"asanas":[]}</links>';
    expect(stripChatLinks(text)).toBe('설명 텍스트입니다.');
  });

  it('<links> 태그가 없으면 원본 텍스트를 반환한다', () => {
    expect(stripChatLinks('일반 텍스트')).toBe('일반 텍스트');
  });

  it('링크{ 형식도 제거한다', () => {
    const text = '설명 텍스트입니다.\n링크{"muscles":["um1"],"asanas":[]}</links>';
    expect(stripChatLinks(text)).toBe('설명 텍스트입니다.');
  });

  it('<links> 앞에 대시 prefix가 있어도 제거한다', () => {
    const text = '설명 텍스트입니다.\n- <links>{"muscles":["um1"],"asanas":[]}</links>';
    expect(stripChatLinks(text)).toBe('설명 텍스트입니다.');
  });
});
