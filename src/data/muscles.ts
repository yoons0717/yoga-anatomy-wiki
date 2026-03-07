import { Muscle } from '@/types/anatomy';

export const upperBodyMuscles: Muscle[] = [
  {
    id: 'm1',
    name_ko: '소흉근',
    name_en: 'Pectoralis Minor',
    category: '상체',
    sub_category: '어깨/가슴',
    origin: '제3, 4, 5 갈비뼈 전면',
    insertion: '견갑골의 오훼돌기 (Coracoid process)',
    action: ['견갑골 전인(Protraction)', '견갑골 하방회전(Downward Rotation)', '강제 흡기 보조'],
    description:
      '대흉근 안쪽에 위치하며, 견갑골을 앞과 아래로 당겨 흉벽에 고정시키는 역할을 합니다.',
    imageUrl: '/images/muscles/m1.jpg',
  },
];
