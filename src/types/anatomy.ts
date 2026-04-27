export type BodyPart = '상체' | '복부 및 호흡' | '척추' | '하체';

export type AsanaSide = 'left' | 'right' | 'both';

export interface SequenceItem {
  uid: string;
  asanaId: string;
  side?: AsanaSide;
  notes?: string;
}

export interface Sequence {
  id: string;
  name: string;
  items: SequenceItem[];
  createdAt: string;
  updatedAt: string;
}

export type AsanaPosition = 'standing' | 'seated' | 'prone' | 'supine';

export interface Muscle {
  id: string;
  name_ko: string; // 예: 소흉근
  name_en: string; // 예: Pectoralis Minor
  category: BodyPart; // 대분류: 상체
  origin: string; // 기시점 (근육이 시작되는 고정점)
  insertion: string; // 정지점 (근육이 붙어 움직이는 점)
  action: string[]; // 주요 작용 (예: ["견갑골 전인", "견갑골 하방회전"])
  description: string; // 근육의 해부학적 위치 및 특징
  area?: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
}

export interface Asana {
  id: string;
  name_ko: string; // 예: 코브라 자세
  name_en: string; // 예: Cobra Pose
  name_sanskrit: string; // 예: Bhujangasana
  description: string; // 간단한 설명
  position: AsanaPosition; // 자세 유형
  activated_muscles: string[]; // 수축(강화)되는 근육 ID 목록
  stretched_muscles: string[]; // 이완(스트레칭)되는 근육 ID 목록
  imageUrl?: string;
}
