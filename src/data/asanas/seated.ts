import { Asana } from '@/types/anatomy';

export const seatedAsanas: Asana[] = [
  {
    id: 'a11',
    name_ko: '나비 자세',
    name_en: 'Butterfly Pose',
    name_sanskrit: 'Baddha Konasana',
    description:
      '앉아서 발바닥을 마주 붙이고 무릎을 양옆으로 펼치는 자세입니다. 내전근과 이상근을 깊게 이완시켜 고관절 가동성을 높입니다.',
    position: 'seated',
    activated_muscles: ['cm4'],
    stretched_muscles: ['lm10', 'lm11', 'lm5', 'lm2'],
    imageUrl: '/images/asanas/seated/baddhakonasana.png',
  },
  {
    id: 'a12',
    name_ko: '비둘기 자세',
    name_en: 'Pigeon Pose',
    name_sanskrit: 'Eka Pada Rajakapotasana',
    description:
      '앞발을 몸 앞에 접고 뒷발을 길게 뻗어 상체를 앞으로 숙이는 자세입니다. 고관절 외회전근과 장요근을 깊게 이완시킵니다.',
    position: 'seated',
    activated_muscles: ['cm5', 'cm6'],
    stretched_muscles: ['lm5', 'lm2', 'lm1', 'lm6', 'lm14'],
    imageUrl: '/images/asanas/seated/ekapadarajakapotasana.png',
  },
  {
    id: 'a13',
    name_ko: '앉은 전굴',
    name_en: 'Seated Forward Bend',
    name_sanskrit: 'Paschimottanasana',
    description:
      '다리를 앞으로 뻗고 앉아 상체를 앞으로 숙이는 자세입니다. 햄스트링과 척추 후면 전체를 깊이 이완시킵니다.',
    position: 'seated',
    activated_muscles: [],
    stretched_muscles: ['lm7', 'lm8', 'lm9', 'cm5', 'lm12'],
    imageUrl: '/images/asanas/seated/paschimottanasana.png',
  },
  {
    id: 'a15',
    name_ko: '아이 자세',
    name_en: "Child's Pose",
    name_sanskrit: 'Balasana',
    description:
      '무릎을 꿇고 앉아 상체를 앞으로 완전히 숙이는 휴식 자세입니다. 척추와 등 전체를 이완하고 긴장을 해소합니다.',
    position: 'seated',
    activated_muscles: [],
    stretched_muscles: ['cm5', 'cm8', 'lm2', 'um6'],
    imageUrl: '/images/asanas/seated/balasana.png',
  },
  {
    id: 'a17',
    name_ko: '보트 자세',
    name_en: 'Boat Pose',
    name_sanskrit: 'Navasana',
    description:
      '앉아서 다리와 상체를 들어 올려 V자 형태를 만드는 자세입니다. 복부와 장요근을 동시에 강화하는 강도 높은 코어 자세입니다.',
    position: 'seated',
    activated_muscles: ['cm1', 'cm2', 'cm3', 'cm4', 'lm1'],
    stretched_muscles: ['lm7', 'lm8', 'lm9'],
    imageUrl: '/images/asanas/seated/navasana.png',
  },
  {
    id: 'a19',
    name_ko: '낙타 자세',
    name_en: 'Camel Pose',
    name_sanskrit: 'Ustrasana',
    description:
      '무릎을 꿇고 앉아 뒤로 젖혀 두 손이 발뒤꿈치에 닿는 자세입니다. 강한 후굴로 척추 유연성을 높이고 가슴을 크게 열어줍니다.',
    position: 'seated',
    activated_muscles: ['cm5', 'cm6', 'lm2'],
    stretched_muscles: ['cm1', 'cm2', 'um11', 'um12', 'lm1', 'lm6'],
    imageUrl: '/images/asanas/seated/ustrasana.png',
  },
  {
    id: 'a21',
    name_ko: '척추 비틀기 자세',
    name_en: 'Half Lord of the Fishes',
    name_sanskrit: 'Ardha Matsyendrasana',
    description:
      '앉아서 한쪽 다리를 구부리고 반대쪽으로 척추를 비트는 자세입니다. 척추 회전성을 높이고 소화기관을 자극합니다.',
    position: 'seated',
    activated_muscles: ['cm2', 'cm3'],
    stretched_muscles: ['lm5', 'cm8', 'um9', 'cm2'],
    imageUrl: '/images/asanas/seated/ardhamatsyendrasana.png',
  },
  {
    id: 'a33',
    name_ko: '머리-무릎 자세',
    name_en: 'Head-to-Knee Pose',
    name_sanskrit: 'Janu Sirsasana',
    description:
      '한 다리를 펴고 다른 다리를 접어 상체를 뻗은 다리 쪽으로 숙이는 자세입니다. 햄스트링과 척추 후면을 이완하며 고관절 외회전 유연성을 높입니다.',
    position: 'seated',
    activated_muscles: ['cm4'],
    stretched_muscles: ['lm7', 'lm8', 'lm9', 'cm5', 'lm12', 'lm5'],
    imageUrl: '/images/asanas/seated/janushirshasana.png',
  },
  {
    id: 'a40',
    name_ko: '원숭이 자세',
    name_en: 'Monkey Pose',
    name_sanskrit: 'Hanumanasana',
    description:
      '한 다리는 앞으로 완전히 펴고 반대쪽 다리는 뒤로 뻗어 완전한 스플릿을 만드는 고급 자세입니다. 햄스트링과 고관절 굴곡근의 극단적인 유연성을 요구합니다.',
    position: 'seated',
    activated_muscles: ['cm4', 'lm3'],
    stretched_muscles: ['lm7', 'lm8', 'lm9', 'lm1', 'lm6', 'lm14'],
    imageUrl: '/images/asanas/seated/hanumanasana.png',
  },
];
