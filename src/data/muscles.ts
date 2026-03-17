import { Muscle } from '@/types/anatomy';

export const upperBodyMuscles: Muscle[] = [
  {
    id: 'um1',
    name_ko: '극상근',
    name_en: 'Supraspinatus',
    category: '상체',
    origin: '견갑골의 극상와 내측(Supraspinous fossa)',
    insertion: '상완골의 대결절의 상부(humerus Greater tubercle)',
    action: ['견관절 외전(Abduction) 초기 30도', '상완골 안정화'],
    description:
      '회전근개를 구성하는 네 개의 근육 중 하나로, 팔을 옆으로 벌리는 작용(외전)을 하고, 어깨 관절의 안정성을 유지하는 데 기여합니다.',
  },
  {
    id: 'um2',
    name_ko: '극하근',
    name_en: 'Infraspinatus',
    category: '상체',
    origin: '견갑골의 극하와(Infraspinous fossa)',
    insertion: '상완골의 대결절의 후면(humerus Greater tubercle)',
    action: ['견관절 외회전(External Rotation)', '견관절 신전(Extension)'],
    description:
      '회전근개를 구성하는 네 개의 근육 중 하나로, 어깨 관절의 외회전을 만들어주고, 어깨를 안정시켜주는 근육.',
  },
  {
    id: 'um3',
    name_ko: '소원근',
    name_en: 'Teres Minor',
    category: '상체',
    origin: '견갑골의 외측 가장자리(upper axillary border of scapula)',
    insertion: '상완골의 대결절(humerus Greater tubercle)',
    action: ['견관절 외회전(External Rotation)', '견관절 신전', '견관절 안정화'],
    description:
      '회전근개를 구성하는 네 개의 근육 중 하나로, 극하근과 함께 어깨 관절의 외회전을 도와주는 협력근',
  },
  {
    id: 'um4',
    name_ko: '견갑하근',
    name_en: 'Subscapularis',
    category: '상체',
    origin: '견갑골의 견갑하와(Subscapular fossa of scapula)',
    insertion: '상완골의 소결절(humerus Lesser tubercle)',
    action: ['견관절 내회전(Internal Rotation)', '상완골두의 안정성 제공'],
    description: '회전근개 중에서 유일하게 내회전을 담당하는 근육입니다.',
  },
  {
    id: 'um5',
    name_ko: '승모근',
    name_en: 'Trapezius',
    category: '상체',
    origin:
      '후두골(뒤통수뼈, occiput), 항인대(목덜미 인대, nuchal ligament), 7번 경추와 1~12번 흉추의 극돌기(C7-T12)',
    insertion: '상부 - 쇄골 외측, 견봉, 중부 - 견갑극(어깨뼈가시), 하부 - 견갑극(어깨뼈가시뿌리)',
    action: [
      '상부 - 견갑골 거상(Elevation), 상방회전(Upward Rotation)',
      '중부 - 견갑골 내전(Retraction), 상방회전(Upward Rotation)',
      '하부 - 견갑골 하강(Depression), 상방회전(Upward Rotation)',
    ],
    description:
      '등 전체에 넓게 퍼져 있는 근육으로, 상부, 중부, 하부로 나뉘며, 견갑골의 다양한 움직임에 관여합니다. 어깨를 들어올리고, 내리고, 뒤로 당기며, 회전시키는 역할을 합니다.',
  },
  {
    id: 'um6',
    name_ko: '광배근',
    name_en: 'Latissimus Dorsi',
    category: '상체',
    origin: '7번 흉추부터 장골능까지의 흉요근막', // cursor tip 같은거 추가하면 좋을 듯
    insertion: '상완골의 이두근구',
    action: [
      '견관절 내전(Adduction)',
      '견관절 내회전(Internal Rotation)',
      '견관절 신전(Extension)',
    ],
    description:
      '등의 넓은 근육으로, 팔을 몸쪽으로 당기고 내회전시키며, 팔을 뒤로 젖히는 동작에 관여합니다.',
  },
  {
    id: 'um7',
    name_ko: '대원근',
    name_en: 'Teres Major',
    category: '상체',
    origin: '견갑골 하각 1/3 지점',
    insertion: '상완골의 이두근구 내측순 (광배근 보다 약간 뒤쪽)',
    action: [
      '견관절 내전(Adduction)',
      '견관절 내회전(Internal Rotation)',
      '견관절 신전(Extension)',
      '광배근의 보조근',
    ],
    description: '광배근의 보조근으로 작용하며, 팔을 안으로 돌려 어깨의 내회전을 만듭니다.',
  },
  {
    id: 'um8',
    name_ko: '견갑거근',
    name_en: 'levator Scapulae',
    category: '상체',
    origin: '1~4번 경추의 횡돌기 (Transverse processes of C1-C4)',
    insertion: '견갑골의 상각과 견갑극근 사이',
    action: [
      '견갑골 거상 (Elevation)',
      '견갑골 하방회전 (Downward Rotation), 경추 동측 회전, 경추 동측 외측굴곡, 경추 신전',
    ],
    description:
      '목과 어깨를 연결하는 근육으로, 승모근보다 안쪽에 위치한 속근육으로 견갑골을 들어올리는 역할을 합니다.',
  },
];
