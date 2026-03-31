// 데이터 무결성: muscles.ts / asanas.ts 파일이 올바르게 연결되어 있는지 검증
//
// 아사나는 activated_muscles / stretched_muscles 필드에 근육 ID를 문자열로 직접 참조함.
// 근육 ID를 변경하거나 삭제할 때 아사나 데이터도 같이 수정하지 않으면
// 런타임에서 아무 에러 없이 조용히 null로 렌더링됨.
// 이 테스트가 그 실수를 빌드 전에 잡아줌.
import { describe, it, expect } from 'vitest';
import { allMuscles } from './muscles';
import { asanas } from './asanas';

describe('데이터 무결성', () => {
  it('근육 ID가 모두 유일하다', () => {
    const ids = allMuscles.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('아사나 ID가 모두 유일하다', () => {
    const ids = asanas.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('아사나가 참조하는 모든 근육 ID가 실제 존재한다', () => {
    const muscleIds = new Set(allMuscles.map((m) => m.id));
    for (const asana of asanas) {
      for (const id of [...asana.activated_muscles, ...asana.stretched_muscles]) {
        expect(
          muscleIds.has(id),
          `${asana.id}(${asana.name_ko})가 존재하지 않는 근육 ID '${id}'를 참조함`,
        ).toBe(true);
      }
    }
  });
});
