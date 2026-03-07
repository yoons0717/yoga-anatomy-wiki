import { Asana } from '@/types/anatomy';

export const asanas: Asana[] = [
  {
    id: 'a1',
    name_ko: '코브라 자세',
    name_en: 'Cobra Pose',
    name_sanskrit: 'Bhujangasana',
    description: '가슴을 열어 소흉근을 이완하고 등을 강화합니다.',
    target_muscles: ['m1', 'm3'], // 소흉근(m1), 하부 승모근(m3) 연결
  },
  {
    id: 'a2',
    name_ko: '플랭크',
    name_en: 'Plank Pose',
    name_sanskrit: 'Phalakasana',
    description: '전거근을 활성화하여 견갑골의 안정성을 높입니다.',
    target_muscles: ['m2'], // 전거근(m2) 연결
  },
];
