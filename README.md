# Anatomy Archive

요가 아사나와 근육 해부학 정보를 연결하는 직관적인 아카이브 웹 애플리케이션입니다.

## 소개

아사나의 정렬과 신체 구조의 이해를 돕기 위한 인터랙티브 위키입니다. 각 근육의 기시점, 정지점, 주요 작용을 정리하고, 해당 근육을 사용하는 요가 아사나와 연결합니다.

## 기술 스택

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Lucide React
- **Runtime**: React 19

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx              # 홈 페이지
│   ├── layout.tsx            # 공통 레이아웃 (헤더, 푸터)
│   ├── globals.css           # 전역 스타일
│   ├── asanas/
│   │   ├── page.tsx          # 아사나 목록
│   │   └── [id]/page.tsx     # 아사나 상세
│   └── muscles/
│       ├── page.tsx          # 근육 목록
│       └── [id]/page.tsx     # 근육 상세 + 인터랙티브 탐색기
├── components/
│   ├── MuscleExplorer.tsx    # 근육 이미지 위 클릭 인터랙션 컴포넌트
│   ├── PageHeader.tsx        # 페이지 공통 헤더
│   ├── PageWrapper.tsx       # 페이지 레이아웃 래퍼
│   └── SectionHeading.tsx    # 섹션 제목
├── data/
│   ├── muscles.ts            # 근육 데이터 (상체)
│   └── asanas.ts             # 아사나 데이터
└── types/
    └── anatomy.ts            # Muscle, Asana 타입 정의
```

## 주요 기능

- **Muscle Map**: 상체 근육 목록 탐색 및 검색
- **근육 상세**: 기시점(Origin), 정지점(Insertion), 주요 작용(Action), 해부학적 설명
- **MuscleExplorer**: 근육 이미지 위에 영역을 클릭해 근육을 선택하는 인터랙티브 UI
- **Asana Index**: 아사나 목록 탐색 및 검색 (한국어 / 영어 / 산스크리트어)
- **아사나 ↔ 근육 연결**: 각 아사나에서 사용되는 근육 확인 및 이동

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

`http://localhost:3000` 에서 확인할 수 있습니다.

### 트러블슈팅

무한 로딩 또는 서버가 응답하지 않을 경우 `.next` 캐시를 삭제 후 재시작하세요.

```bash
rm -rf .next && npm run dev
```

## 데이터 구조

### Muscle

```ts
interface Muscle {
  id: string;
  name_ko: string;       // 한국어 명칭
  name_en: string;       // 영어 명칭
  category: BodyPart;    // 상체 | 몸통 | 하체 | 호흡
  origin: string;        // 기시점
  insertion: string;     // 정지점
  action: string[];      // 주요 작용
  description: string;   // 해부학적 설명
  area?: {               // 이미지 위 클릭 영역 (MuscleExplorer용)
    top: string;
    left: string;
    width: string;
    height: string;
  };
}
```

### Asana

```ts
interface Asana {
  id: string;
  name_ko: string;          // 한국어 명칭
  name_en: string;          // 영어 명칭
  name_sanskrit: string;    // 산스크리트어 명칭
  description: string;
  target_muscles: string[]; // 연결된 근육 ID 목록
  imageUrl?: string;
}
```

## 빌드

```bash
npm run build
npm run start
```
