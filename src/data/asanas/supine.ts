import { Asana } from '@/types/anatomy';

export const supineAsanas: Asana[] = [
  {
    id: 'a16',
    name_ko: '다리 자세',
    name_en: 'Bridge Pose',
    name_sanskrit: 'Setu Bandha Sarvangasana',
    description:
      '누운 상태에서 골반을 들어 올려 다리와 상체가 사선을 이루는 자세입니다. 둔근과 햄스트링을 강화하고 가슴을 열어줍니다.',
    position: 'supine',
    activated_muscles: ['lm2', 'lm7', 'lm8', 'cm5', 'cm6'],
    stretched_muscles: ['cm1', 'um11', 'um12', 'lm1'],
    imageUrl: '/images/asanas/supine/setubandhasarvangasana.png',
  },
  {
    id: 'a27',
    name_ko: '물고기 자세',
    name_en: 'Fish Pose',
    name_sanskrit: 'Matsyasana',
    description:
      '누운 상태에서 가슴을 들어 올려 머리 정수리를 바닥에 댄 자세입니다. 목과 가슴을 열어 호흡 근육을 이완하고 승모근 긴장을 풀어줍니다.',
    position: 'supine',
    activated_muscles: ['cm5'],
    stretched_muscles: ['um11', 'um12', 'um5', 'cm7'],
    imageUrl: '/images/asanas/supine/matsyasana.png',
  },
  {
    id: 'a30',
    name_ko: '누운 척추 비틀기',
    name_en: 'Supine Spinal Twist',
    name_sanskrit: 'Supta Matsyendrasana',
    description:
      '누운 상태에서 무릎을 한쪽으로 넘겨 척추를 비트는 이완 자세입니다. 요통 완화에 효과적이며 수련 마무리에 많이 사용됩니다.',
    position: 'supine',
    activated_muscles: ['cm2', 'cm3'],
    stretched_muscles: ['lm5', 'cm8', 'lm2', 'cm2'],
    imageUrl: '/images/asanas/supine/suptamatsyendrasana.png',
  },
  {
    id: 'a31',
    name_ko: '사바사나',
    name_en: 'Corpse Pose',
    name_sanskrit: 'Savasana',
    description:
      '등을 대고 완전히 이완하여 누운 최종 휴식 자세입니다. 수련 중 활성화된 모든 근육을 완전히 이완시키고 신경계를 안정시킵니다.',
    position: 'supine',
    activated_muscles: [],
    stretched_muscles: [],
    imageUrl: '/images/asanas/supine/savasana.png',
  },
  {
    id: 'a32',
    name_ko: '쟁기 자세',
    name_en: 'Plow Pose',
    name_sanskrit: 'Halasana',
    description:
      '누운 상태에서 다리를 머리 뒤로 넘겨 발가락을 바닥에 닿게 하는 역전 자세입니다. 햄스트링과 척추 후면 전체를 깊이 이완시키며 목과 어깨 유연성을 높입니다.',
    position: 'supine',
    activated_muscles: ['cm4', 'cm1', 'um5'],
    stretched_muscles: ['lm7', 'lm8', 'lm9', 'cm5', 'cm8', 'um5'],
    imageUrl: '/images/asanas/supine/halasana.png',
  },
  {
    id: 'a35',
    name_ko: '어깨 서기',
    name_en: 'Supported Shoulderstand',
    name_sanskrit: 'Salamba Sarvangasana',
    description:
      '누운 상태에서 두 손으로 등을 받쳐 다리와 몸통을 수직으로 들어 올리는 역전 자세입니다. 코어와 어깨 안정화 근육을 강화하고 전신 혈액순환을 촉진합니다.',
    position: 'supine',
    activated_muscles: ['cm4', 'cm1', 'cm5', 'um10', 'um13'],
    stretched_muscles: ['um5', 'um11', 'cm8'],
    imageUrl: '/images/asanas/supine/salambasarvangasana.png',
  },
  {
    id: 'a36',
    name_ko: '물구나무 서기',
    name_en: 'Supported Headstand',
    name_sanskrit: 'Salamba Sirsasana',
    description:
      '팔꿈치로 삼각대를 만들고 정수리를 바닥에 대어 전신을 수직으로 들어 올리는 역전 자세입니다. 전신 코어 강화와 균형 능력, 집중력을 요구하는 고급 자세입니다.',
    position: 'supine',
    activated_muscles: ['cm4', 'cm1', 'cm5', 'lm3', 'um13'],
    stretched_muscles: ['um5', 'cm6'],
    imageUrl: '/images/asanas/supine/salambashirshasana.png',
  },
  {
    id: 'a37',
    name_ko: '휠 자세',
    name_en: 'Wheel Pose',
    name_sanskrit: 'Urdhva Dhanurasana',
    description:
      '누운 상태에서 손과 발을 바닥에 짚고 전신을 아치 모양으로 들어 올리는 강한 후굴 자세입니다. 가슴과 어깨, 고관절 굴곡근을 깊이 열어주며 척추 유연성을 극대화합니다.',
    position: 'supine',
    activated_muscles: ['lm2', 'cm5', 'cm6', 'um16', 'lm6'],
    stretched_muscles: ['cm1', 'um11', 'um12', 'lm1', 'um6'],
    imageUrl: '/images/asanas/supine/urdhvadhanurasana.png',
  },
];
