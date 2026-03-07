export type BodyPart = '상체' | '몸통' | '하체' | '호흡';

export interface Muscle {
  id: string;
  name_ko: string; // 예: 소흉근
  name_en: string; // 예: Pectoralis Minor
  category: BodyPart; // 대분류: 상체
  sub_category: string; // 소분류: 어깨/가슴
  origin: string; // 기시점 (근육이 시작되는 고정점)
  insertion: string; // 정지점 (근육이 붙어 움직이는 점)
  action: string[]; // 주요 작용 (예: ["견갑골 전인", "견갑골 하방회전"])
  description: string; // 근육의 해부학적 위치 및 특징
  imageUrl?: string; // 해부학 도해 이미지 경로
}
