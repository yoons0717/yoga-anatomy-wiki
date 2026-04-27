# 드래그&드롭 시퀀스 빌더 — 설계 보고서

> 작성일: 2026-04-04  
> 목적: 포트폴리오 기술 깊이 강화 (스타트업/중견기업 서류 통과)  
> 대상 기능: `/sequence` 라우트 — 아사나를 조합해 수련 시퀀스를 직접 설계하는 인터랙티브 페이지

---

## 1. 왜 이 기능이 포트폴리오에 효과적인가

| 평가 요소            | 근거                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **복잡한 인터랙션**  | DnD 라이브러리 없이 구현 시 포인터 이벤트 직접 제어, 유지보수 어렵고 접근성 없음 → `@dnd-kit` 선택 이유를 설명할 수 있는 기술 판단력 |
| **상태 관리 복잡도** | 라이브러리 패널 필터 상태 + 시퀀스 아이템 목록 + 선택/드래그 active 상태를 동시에 관리                                               |
| **접근성**           | `@dnd-kit`의 키보드 DnD + `aria-*` 속성으로 WCAG 기준 충족 → a11y 언급 가능                                                          |
| **퍼시스턴스**       | localStorage로 시퀀스 저장/불러오기 — 실용적 완성도                                                                                  |

---

## 2. 핵심 기능 정의

### 2-1. 아사나 라이브러리 패널 (왼쪽)

- 전체 39개 아사나를 카드 형태로 표시
- 검색 (name_ko / name_en / name_sanskrit)
- 위치 필터 탭 (전체 / 선 자세 / 앉은 자세 / 엎드린 자세 / 누운 자세)
- 카드를 드래그해 오른쪽 시퀀스 영역에 드롭
- 이미 시퀀스에 추가된 아사나는 시각적 표시 (불투명도 낮춤 or 뱃지)

### 2-2. 시퀀스 편집 영역 (오른쪽)

- 추가된 아사나 카드를 세로 목록으로 표시
- 카드 간 순서 재정렬 (드래그&드롭)
- 개별 카드에서: 제거 버튼, 메모 입력, 좌/우/양측 side 선택
- 시퀀스 이름 편집 (인라인)
- 아이템 수 / 총 예상 소요 시간 표시

### 2-3. 저장 / 관리

- 시퀀스 이름 + 아이템 목록을 localStorage에 저장
- 최대 10개 시퀀스 저장
- 저장된 시퀀스 목록에서 불러오기 / 삭제

---

## 3. 기술 스택 및 선택 이유

### 3-1. DnD 라이브러리: `@dnd-kit/core` + `@dnd-kit/sortable`

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

**선택 이유:**

- `react-beautiful-dnd`: React 18+ Strict Mode 미지원, 유지보수 중단 상태
- `react-dnd`: 낮은 수준 API → 보일러플레이트 많음
- `@dnd-kit`: 접근성(키보드 DnD, aria-live) 내장, Strict Mode 지원, 가볍고 Tree-shakeable

**구현할 두 가지 DnD 컨텍스트:**

1. **라이브러리 → 시퀀스**: `useDraggable` (소스) + `useDroppable` (타겟)
2. **시퀀스 내 재정렬**: `SortableContext` + `useSortable`

### 3-2. 상태 관리: React Context + useReducer

전역 라이브러리(Redux 등) 없이 구성. Context를 두 레이어로 분리:

```
SequenceContext     — 시퀀스 아이템 CRUD, 저장/불러오기 로직
LibraryContext      — 검색어, 위치 필터 상태
```

### 3-3. 애니메이션: Framer Motion

기존 프로젝트 스택. 드래그 중 카드 overlay, 드롭 시 목록 레이아웃 애니메이션에 활용.

---

## 4. 데이터 모델

```typescript
// 시퀀스 내 단일 아이템
interface SequenceItem {
  uid: string; // 시퀀스 내 고유 ID (같은 아사나 중복 추가 허용)
  asanaId: string; // Asana.id 참조
  side?: 'left' | 'right' | 'both'; // 좌우 구분 (없으면 미지정)
  notes?: string; // 개인 메모
}

// 저장되는 시퀀스 단위
interface Sequence {
  id: string;
  name: string;
  items: SequenceItem[];
  createdAt: string; // ISO string (JSON 직렬화)
  updatedAt: string;
}
```

**중복 추가 허용 이유**: 같은 아사나를 시퀀스 내 여러 번 반복 배치하는 수련 구성이 실제로 존재함 (`uid`로 구분).

---

## 5. 컴포넌트 구조

```
/src/app/sequence/
  page.tsx                    — 레이아웃 조합 (두 패널)

/src/components/sequence/
  SequenceProvider.tsx        — Context + useReducer (CRUD, localStorage)
  LibraryPanel.tsx            — 왼쪽: 검색 + 필터 + 아사나 카드 목록
  SequencePanel.tsx           — 오른쪽: SortableContext, 시퀀스 카드 목록
  DraggableAsanaCard.tsx      — 라이브러리 패널용 드래그 소스 카드
  SortableSequenceItem.tsx    — 시퀀스 패널용 정렬 가능 아이템
  DragOverlayCard.tsx         — 드래그 중 마우스 따라다니는 ghost 카드
  SavedSequenceList.tsx       — 저장된 시퀀스 목록 + 불러오기/삭제
```

**파일당 단일 책임** 원칙 적용. `SortableSequenceItem` 내부에는 메모 입력, side 선택, 제거 버튼이 포함되지만, 각각 별도 하위 함수 컴포넌트로 분리.

---

## 6. 핵심 구현 로직

### 6-1. useReducer 액션 설계

```typescript
type SequenceAction =
  | { type: 'ADD_ITEM'; asanaId: string }
  | { type: 'REMOVE_ITEM'; uid: string }
  | { type: 'REORDER'; oldIndex: number; newIndex: number }
  | { type: 'UPDATE_ITEM'; uid: string; patch: Partial<SequenceItem> }
  | { type: 'RENAME'; name: string }
  | { type: 'SAVE' }
  | { type: 'LOAD'; sequence: Sequence }
  | { type: 'NEW_SEQUENCE' };
```

### 6-2. DnD 두 컨텍스트 분리

라이브러리→시퀀스 드롭과 시퀀스 내 재정렬을 단일 `DndContext`로 처리하면 충돌 발생. 두 컨텍스트를 중첩하되, `DragOverlay`는 최상위 하나만 사용.

```tsx
<DndContext onDragEnd={handleGlobalDragEnd} onDragStart={handleDragStart}>
  <LibraryPanel /> {/* useDraggable 사용 */}
  <SortableContext items={sequenceItemIds}>
    <SequencePanel /> {/* useSortable 사용 */}
  </SortableContext>
  <DragOverlay>{activeItem && <DragOverlayCard item={activeItem} />}</DragOverlay>
</DndContext>
```

`handleGlobalDragEnd`에서 `event.over?.id`가 `'sequence-drop-zone'`이면 ADD_ITEM, `sortableIds` 중 하나면 REORDER 처리.

---

## 7. 페이지 레이아웃 (데스크탑 기준)

```
┌─────────────────────────────────────────────────────────────────┐
│  Sequence Builder                             [저장] [새 시퀀스]  │
├───────────────────────────┬─────────────────────────────────────┤
│  LIBRARY                  │  "나의 시퀀스 이름" ✏️   (8 poses)   │
│  ┌──────────────────────┐ │  ─────────────────────────────────  │
│  │ 🔍 Search...         │ │  ① 다운도그      ⠿  [L/R/양] [×]    │
│  └──────────────────────┘ │  ② 전사 1        ⠿  [L/R/양] [×]    │
│  [전체][선][앉][엎][누]   │  ③ 코브라        ⠿         [×]      │
│                            │  ④ 아이 자세     ⠿         [×]      │
│  ┌──────┐ ┌──────┐        │                                     │
│  │ 다운 │ │ 코브 │        │  + 아사나를 여기에 드롭하세요       │
│  │ 도그 │ │ 라   │        │                                     │
│  └──────┘ └──────┘        │                                     │
│  ┌──────┐ ┌──────┐        │                                     │
│  │ 전사 │ │ 아이 │        │                                     │
│  │ 1    │ │ 자세 │        │                                     │
│  └──────┘ └──────┘        │                                     │
└───────────────────────────┴─────────────────────────────────────┘
```

모바일: 라이브러리 패널 → 상단 슬라이딩 드로어, 시퀀스 패널 → 전체 화면.

---

## 8. 구현 단계 (권장 순서)

### Step 1 — 데이터 레이어 & Context

- `SequenceProvider` + `useReducer` 구현 (ADD, REMOVE, REORDER, RENAME)
- localStorage 저장/불러오기

### Step 2 — 정적 레이아웃

- `page.tsx` 2-panel 레이아웃 (Tailwind)
- `LibraryPanel` 정적 카드 목록 (DnD 없이)
- `SequencePanel` 정적 리스트

### Step 3 — 라이브러리 → 시퀀스 드롭 ✅

- `DndContext` + `useDraggable` + `useDroppable`
- `DragOverlay` ghost 카드

### Step 4 — 시퀀스 내 재정렬 ✅

- `SortableContext` + `useSortable` + `arrayMove`
- 애니메이션 (Framer Motion layout + AnimatePresence)

### Step 5 — 아이템 편집 UI

- side 선택, notes 입력, 제거 버튼

### Step 6 — 저장 / 시퀀스 관리 ✅

- 저장 목록 모달/사이드패널
- 불러오기 / 삭제

### Step 7 — 모바일 반응형 + a11y

- 드로어 패널, 터치 DnD
- 키보드 DnD (Space로 집기, 화살표로 이동, Enter로 놓기)
- aria-live 영역

---

## 9. 확정된 판단 사항

| 항목 | 결정 |
|---|---|
| 시퀀스 진입점 | 독립 탭 (`/sequence`) |
| 같은 아사나 중복 허용 | 허용 (uid로 구분) |
| 시퀀스 공유 | 삭제 — 구현하지 않음 |
| 저장소 | localStorage |
| 아이템 수 | 상한 없음 |
