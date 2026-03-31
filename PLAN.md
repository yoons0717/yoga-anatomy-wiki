# 개발 계획 — Anatomy Archive

> 포트폴리오 완성도를 높이기 위한 구현 계획입니다.
> 우선순위 순으로 작업하세요. 완료된 항목은 취소선으로 표시합니다.

---

## Phase 0. 데이터 확장 (LLM 기능의 전제 조건)

> 하체/척추 근육 데이터 없이는 LLM이 관련 질문에 답변 불가

### 근육 데이터 (`src/data/muscles.ts`)

~~- **하체 근육** 추가 — 햄스트링, 대퇴사두근, 내전근, 비복근, 장요근 등~~
~~- **척추 근육** 추가 — 척추기립근, 다열근, 요방형근 등~~
~~- **복부/호흡 근육** 추가 — 복직근, 복횡근, 횡격막 등 (일부 있음, 보완)~~

### 아사나 데이터 (`src/data/asanas.ts`)

~~- 현재 15개 → 30개 이상으로 확장~~
~~- 하체 위주 아사나 추가 — 전사 자세, 삼각 자세, 비라바드라사나 등~~
~~- 각 아사나 `activated_muscles` / `stretched_muscles` ID 정확히 연결~~

---

## Phase 1. LLM Q&A 기능

> 자연어로 증상/질문 입력 → 관련 근육·아사나 설명 + 링크 카드 렌더링

### API Route (`src/app/api/chat/route.ts`)

~~- `POST /api/chat` 엔드포인트 구현~~
~~- `muscles[]` + `asanas[]` 전체를 시스템 프롬프트에 주입~~
~~- **Structured output** 강제 (`answer` + `related_muscles` + `related_asanas`)~~
~~- **스트리밍** 적용 (`ReadableStream`) — `answer` 필드는 스트리밍, 나머지는 후처리~~
~~- 입력 검증 및 에러 핸들링 (빈 쿼리, API 실패)~~

### UI (`src/app/chat/page.tsx`)

~~- 질문 입력창 + 전송 버튼~~
~~- 질문 예시 칩 UI (예: "어깨 외회전이 안 돼요", "햄스트링이 항상 땡겨요")~~
~~- 스트리밍 텍스트 렌더링 (타이핑 효과)~~
~~- 응답 완료 후 관련 근육/아사나 **링크 카드** 렌더링~~
~~- 로딩 상태 (점 애니메이션)~~
~~- 에러 상태 UI~~

### 최적화 (데이터 증가 후)

- [ ] 질문 키워드 기반 카테고리 필터링으로 토큰 비용 절감

---

## Phase 2. 검색 고도화

> 현재 단순 `string.includes()` → 카테고리 필터 + 빈 결과 처리

~~- **카테고리 필터** UI — muscles: 상체/하체/척추/복부 탭 (asanas position 필터는 기존 완료)~~
~~- 검색 결과 없음 상태 UI~~

> Fuse.js, URL 동기화는 실용성 낮아 제외

---

## Phase 3. MuscleExplorer 연동 강화

> 보류 — 해부학 이미지 퀄리티 문제로 아사나 페이지 통합 시 비주얼 퀄리티가 낮음. 이미지 에셋 개선 전까지 스킵.

- [ ] 아사나 상세(`src/app/asanas/[id]/page.tsx`)에 `MuscleExplorer` 통합
- [ ] `MuscleExplorer`에 hover tooltip 추가
- [ ] 멀티 선택 모드 지원

---

## Phase 4. 코드 품질

### 테스트 (Vitest + Testing Library)

~~- 테스트 환경 세팅 (`vitest.config.ts`, `@testing-library/react`)~~
~~- `MuscleExplorer` 컴포넌트 테스트 — 클릭 시 선택 상태 변경~~
~~- 검색 로직 유닛 테스트~~
~~- LLM 응답 파싱 함수 테스트~~

### 접근성 (a11y)

- [ ] `MuscleExplorer` 클릭 영역에 `role="button"`, `aria-label` 추가
- [ ] 키보드 네비게이션 지원 (`Tab`, `Enter`, `Space`)
- [ ] 색상 대비 확인 (WCAG AA 기준)
- [ ] 이미지 `alt` 텍스트 전수 점검

---

## Phase 5. UX 완성도

- [ ] **스켈레톤 로딩** — 이미지/데이터 로드 전 placeholder
- [ ] **즐겨찾기** — `localStorage`로 아사나/근육 북마크, 별도 목록 페이지
- [ ] **최근 본 항목** — 상세 페이지 간 히스토리 (최대 10개)
- [ ] **OG 이미지** — 아사나/근육 상세 페이지 소셜 공유용 (`next/og`)

---

## 작업 순서 요약

```
Phase 0  →  Phase 1  →  Phase 2  →  Phase 3  →  Phase 4  →  Phase 5
데이터        LLM Q&A      검색         시각화        테스트        UX
확장          (핵심)       고도화       연동 강화      품질          완성
```
