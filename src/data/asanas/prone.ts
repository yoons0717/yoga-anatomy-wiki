import { Asana } from '@/types/anatomy';

export const proneAsanas: Asana[] = [
  {
    id: 'a1',
    name_ko: '코브라 자세',
    name_en: 'Cobra Pose',
    name_sanskrit: 'Bhujangasana',
    description:
      '엎드린 상태에서 팔로 상체를 들어 올려 척추를 신전시키는 자세입니다. 가슴을 열어 호흡을 깊게 하고 등 근육을 강화합니다.',
    position: 'prone',
    activated_muscles: ['cm5', 'cm6', 'lm2', 'um5', 'um10'],
    stretched_muscles: ['cm1', 'um11', 'um12', 'lm1'],
    imageUrl: '/images/asanas/prone/bhujangasana.png',
  },
  {
    id: 'a2',
    name_ko: '플랭크',
    name_en: 'Plank Pose',
    name_sanskrit: 'Phalakasana',
    description:
      '팔굽혀펴기 시작 자세처럼 몸을 일직선으로 유지하는 자세입니다. 전신 코어 안정화와 어깨 안정화에 효과적입니다.',
    position: 'prone',
    activated_muscles: ['cm4', 'cm1', 'cm2', 'um13', 'um10', 'lm6'],
    stretched_muscles: [],
    imageUrl: '/images/asanas/prone/phalakasana.png',
  },
  {
    id: 'a3',
    name_ko: '아래를 향한 개 자세',
    name_en: 'Downward-Facing Dog',
    name_sanskrit: 'Adho Mukha Svanasana',
    description:
      '엉덩이를 높이 들어 올려 역V자 형태를 만드는 자세입니다. 상체와 하체를 동시에 스트레칭하며 전신 이완에 효과적입니다.',
    position: 'prone',
    activated_muscles: ['um13', 'um10', 'cm4', 'cm5'],
    stretched_muscles: ['lm7', 'lm8', 'lm9', 'lm12', 'lm13', 'um6', 'cm5'],
    imageUrl: '/images/asanas/prone/adhomukhashvanasana.png',
  },
  {
    id: 'a4',
    name_ko: '위를 향한 개 자세',
    name_en: 'Upward-Facing Dog',
    name_sanskrit: 'Urdhva Mukha Svanasana',
    description:
      '엎드린 상태에서 팔을 완전히 펴고 가슴을 높이 들어 올리는 자세입니다. 코브라보다 더 깊은 후굴로 척추와 가슴을 크게 열어줍니다.',
    position: 'prone',
    activated_muscles: ['cm5', 'cm6', 'lm2', 'um10', 'um5'],
    stretched_muscles: ['cm1', 'cm2', 'um11', 'um12', 'lm1', 'lm6'],
    imageUrl: '/images/asanas/prone/urdhvamukhashvanasana.png',
  },
  {
    id: 'a14',
    name_ko: '고양이 자세',
    name_en: 'Cat Pose',
    name_sanskrit: 'Marjaryasana',
    description:
      '네발기기 자세에서 척추를 위로 둥글게 말아 올리는 자세입니다. 복부를 수축하고 척추 신전근을 이완시켜 등의 긴장을 해소합니다.',
    position: 'prone',
    activated_muscles: ['cm1', 'cm2', 'cm3', 'cm4'],
    stretched_muscles: ['cm5', 'cm6'],
    imageUrl: '/images/asanas/prone/marjaryasana.png',
  },
  {
    id: 'a18',
    name_ko: '활 자세',
    name_en: 'Bow Pose',
    name_sanskrit: 'Dhanurasana',
    description:
      '엎드려 누운 상태에서 양손으로 발목을 잡고 상체와 하체를 동시에 들어 올리는 자세입니다. 전신 후굴과 복부 스트레칭에 효과적입니다.',
    position: 'prone',
    activated_muscles: ['cm5', 'cm6', 'lm2', 'lm7', 'lm8'],
    stretched_muscles: ['cm1', 'um11', 'um12', 'lm1', 'lm6'],
    imageUrl: '/images/asanas/prone/dhanurasana.png',
  },
  {
    id: 'a29',
    name_ko: '메뚜기 자세',
    name_en: 'Locust Pose',
    name_sanskrit: 'Salabhasana',
    description:
      '엎드린 상태에서 양팔과 양다리를 동시에 들어 올리는 자세입니다. 척추 신전근과 둔근을 집중적으로 강화하고 등 근육을 균형 있게 발달시킵니다.',
    position: 'prone',
    activated_muscles: ['cm5', 'cm6', 'lm2', 'lm7', 'lm8', 'um9', 'um5'],
    stretched_muscles: ['cm1', 'um11'],
    imageUrl: '/images/asanas/prone/salabhasana.png',
  },
  {
    id: 'a38',
    name_ko: '소 자세',
    name_en: 'Cow Pose',
    name_sanskrit: 'Bitilasana',
    description:
      '네발기기 자세에서 척추를 아래로 늘어뜨려 가슴과 배를 바닥 쪽으로 여는 자세입니다. 척추 신전근을 활성화하고 복부를 이완시킵니다.',
    position: 'prone',
    activated_muscles: ['cm5', 'cm6', 'lm2'],
    stretched_muscles: ['cm1', 'cm7'],
    imageUrl: '/images/asanas/prone/bitilasana.png',
  },
  {
    id: 'a39',
    name_ko: '까마귀 자세',
    name_en: 'Crow Pose',
    name_sanskrit: 'Bakasana',
    description:
      '손바닥을 바닥에 짚고 무릎을 팔뚝에 올려 몸 전체를 들어 올리는 팔 균형 자세입니다. 코어와 어깨 안정화 근육을 강화하며 집중력과 균형 감각을 요구합니다.',
    position: 'prone',
    activated_muscles: ['cm4', 'cm1', 'cm2', 'um13', 'um10', 'um16'],
    stretched_muscles: ['lm5', 'um6'],
    imageUrl: '/images/asanas/prone/bakasana.png',
  },
];
