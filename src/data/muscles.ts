import { Muscle } from '@/types/anatomy';

export const upperBodyMuscles: Muscle[] = [
  {
    id: 'm1',
    name_ko: '소흉근',
    name_en: 'Pectoralis Minor',
    category: '상체',
    origin: '제3, 4, 5 갈비뼈 전면',
    insertion: '견갑골의 오훼돌기 (Coracoid process)',
    action: ['견갑골 전인(Protraction)', '견갑골 하방회전(Downward Rotation)', '강제 흡기 보조'],
    description:
      '대흉근 안쪽에 위치하며, 견갑골을 앞과 아래로 당겨 흉벽에 고정시키는 역할을 합니다.',
    imageUrl: '/images/muscles/m1.jpg',
    area: { top: '35%', left: '2%', width: '10%', height: '5%' },
  },
  {
    id: 'm2',
    name_ko: '전거근',
    name_en: 'Serratus Anterior',
    category: '상체',
    origin: '제1~8 또는 9 갈비뼈 바깥쪽',
    insertion: '견갑골의 척추연(내측연) 전체',
    action: ['견갑골 전인(Protraction)', '견갑골 상방회전', '흉벽에 견갑골 밀착'],
    description:
      '겨드랑이 아래 갈비뼈에 붙어 있는 근육으로, 차투랑가나 핸드스탠드 시 견갑골이 뜨지 않게 잡아주는 핵심 근육입니다.',
  },
  {
    id: 'm3',
    name_ko: '하부 승모근',
    name_en: 'Lower Trapezius',
    category: '상체',
    origin: '제4~12 흉추(T4-T12) 가시돌기',
    insertion: '견갑극(Spine of scapula)의 내측 끝부분',
    action: ['견갑골 하강(Depression)', '견갑골 상방회전 보조'],
    description:
      '어깨를 아래로 끌어내리는 힘을 주어, 귀와 어깨가 멀어지게 만드는 어깨 안정화의 핵심 근육입니다.',
  },
  {
    id: 'm4',
    name_ko: '광배근',
    name_en: 'Latissimus Dorsi',
    category: '상체',
    origin: '제7흉추~장골능까지의 흉요근막, 하부 갈비뼈',
    insertion: '상완골(위팔뼈)의 이두근구 결절간구',
    action: ['상완골 신전', '상완골 내전', '상완골 내회전'],
    description:
      '인체에서 가장 넓은 근육 중 하나로, 팔을 몸쪽으로 당기거나 후굴 자세에서 상체를 단단하게 지지하는 역할을 합니다.',
  },
  {
    id: 'm5',
    name_ko: '상부 승모근',
    name_en: 'Upper Trapezius',
    category: '상체',
    origin: '후두골 외부 돌기, 항인대, 제7경추 가시돌기',
    insertion: '쇄골 외측 1/3, 견봉',
    action: ['견갑골 거상(Elevation)', '견갑골 상방회전'],
    description:
      '목과 어깨를 이어주며 고개를 뒤로 젖히거나 어깨를 으쓱할 때 사용됩니다. 스트레스 시 가장 먼저 긴장되는 부위입니다.',
  },
];
