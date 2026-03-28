# 프로젝트: Anatomy Archive
App Router, Tailwind CSS v4, React 19를 사용하는 Next.js 16 요가 해부학 아카이브 애플리케이션입니다.

## 코드 스타일

- TypeScript strict 모드 사용
- Tailwind 유틸리티 클래스 사용, 커스텀 CSS 파일 금지
- 컬러 팔레트: `stone-*` 계열 메인, `slate-*` 는 홈 페이지에만 사용
- 카드 hover 패턴: `sm:hover:-translate-y-1 sm:hover:shadow-xl` + CTA는 `sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100`

### 컴포넌트 컨벤션

- 컴포넌트는 `export default function` 으로 선언 (arrow function export 금지)
- 파일 내 서브 컴포넌트는 동일 파일 하단에 `function` 선언으로 정의
- 독립 컴포넌트 props: 별도 `interface XxxProps` 정의 후 구조분해
- 파일 내 서브 컴포넌트 props: 인라인 타입 정의 (`{ prop: type }`)
- `type`: 유니온 타입에 사용 (예: `BodyPart`), `interface`: 객체 모델에 사용 (예: `Muscle`, `Asana`)

### Import 순서

1. `'use client'` (최상단, 필요 시)
2. 타입 (`@/types/...`)
3. React hooks
4. Next.js 컴포넌트 (`next/image`, `next/navigation` 등)
5. 외부 라이브러리 (아이콘 등)
6. 내부 컴포넌트/데이터

### className 작성

- `cn` / `clsx` 없이 순수 Tailwind + 템플릿 리터럴 사용
- 동적 클래스: `` className={`고정클래스 ${조건 ? 'a' : 'b'}`} ``

### 데이터 상수 네이밍

- 정적 맵(`Record`): `UPPER_SNAKE_CASE` (예: `CATEGORY_IMAGES`)
- 배열: `camelCase` (예: `upperBodyMuscles`, `allMuscles`)

### App Router

- 동적 라우트 params 타입: `params: Promise<{ id: string }>` + `await params` 패턴

## 커밋 메시지 컨벤션

`type: 한국어 설명` 형식 사용

| type | 용도 |
|------|------|
| `feat` | 새 기능 추가 |
| `fix` | 버그 수정 |
| `refactor` | 기능 변경 없는 코드 개선 |
| `style` | 디자인/스타일 변경 |
| `docs` | 문서 수정 (CLAUDE.md, README 등) |
| `chore` | 설정, 패키지 등 기타 변경 |

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

구체적인 구현 계획은 [PLAN.md](./PLAN.md)를 참고하세요.

우선순위 요약: **데이터 확장 → LLM Q&A → 검색 고도화 → MuscleExplorer 연동 → 테스트/접근성**

## 중요 사항

- 근육 ID는 `um1`, `um2`, ... 형식, 아사나 ID는 `a1`, `a2`, ... 형식을 사용합니다
- 아사나와 근육의 연결은 `Asana.stretched_muscles`(이완) + `Asana.activated_muscles`(수축) 필드(근육 ID 배열)로 관리합니다
- `Muscle.area`는 MuscleExplorer 이미지 위 클릭 영역으로, `%` 단위 CSS style 형태입니다
- 무한 로딩 / 서버 무응답 시 `.next` 캐시 삭제 후 재시작하세요: `rm -rf .next && npm run dev`
