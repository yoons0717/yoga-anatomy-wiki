# 프로젝트: Anatomy Archive
App Router, Tailwind CSS v4, React 19를 사용하는 Next.js 16 요가 해부학 아카이브 애플리케이션입니다.

## 코드 스타일

- TypeScript strict 모드 사용
- Tailwind 유틸리티 클래스 사용, 커스텀 CSS 파일 금지
- 컬러 팔레트: `stone-*` 계열 메인, `slate-*` 는 홈 페이지에만 사용
- 카드 hover 패턴: `sm:hover:-translate-y-1 sm:hover:shadow-xl` + CTA는 `sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100`

## 명령어

- `npm run dev`: 개발 서버 시작 (포트 3000)
- `npm run build`: 프로덕션 빌드
- `npm run lint`: ESLint 검사

## 아키텍처

- `/src/app`: Next.js App Router 페이지 및 레이아웃
- `/src/components`: 재사용 가능한 공통 컴포넌트
- `/src/data`: 근육(`muscles.ts`), 아사나(`asanas.ts`) 정적 데이터
- `/src/types`: `Muscle`, `Asana`, `BodyPart` 타입 정의 (`anatomy.ts`)

## 로드맵

우선순위 순서로 진행 예정:

1. **아사나 데이터 추가** — 현재 데이터 부족, 콘텐츠 확장 필요
2. **근육 데이터 추가** — 현재 상체(`upperBodyMuscles`)만 존재, 몸통/하체/호흡 카테고리 추가 필요
3. **LLM Q&A 기능** — 사용자 증상/질문을 받아 관련 근육·아사나를 설명하고 해당 페이지로 연결

### LLM Q&A 기능 설계 (`/src/app/api/chat`)

- 사용자 자연어 입력 (예: "어깨 외회전이 잘 안돼", "햄스트링이 땡겨")
- `muscles[]` + `asanas[]` 전체를 컨텍스트로 Claude API에 전달 (데이터가 정적 파일이라 RAG 불필요)
- **응답은 structured output으로 받아야 링크 카드 렌더링 가능:**
  ```json
  {
    "answer": "설명 텍스트",
    "related_muscles": ["um1", "um3"],
    "related_asanas": ["a2", "a7"]
  }
  ```
- 스트리밍(`stream: true`) 적용 권장 — 응답 체감 속도 개선
- 데이터가 늘어나면 질문 카테고리 기반 필터링으로 토큰 비용 최적화 필요
- **전제 조건**: 근육 데이터에 하체(햄스트링 등)가 없으면 관련 질문에 답변 불가 → 데이터 확장이 선행되어야 함

## 중요 사항

- 근육 ID는 `um1`, `um2`, ... 형식, 아사나 ID는 `a1`, `a2`, ... 형식을 사용합니다
- 아사나와 근육의 연결은 `Asana.target_muscles` 필드(근육 ID 배열)로 관리합니다
- `Muscle.area`는 MuscleExplorer 이미지 위 클릭 영역으로, `%` 단위 CSS style 형태입니다
- 무한 로딩 / 서버 무응답 시 `.next` 캐시 삭제 후 재시작하세요: `rm -rf .next && npm run dev`
