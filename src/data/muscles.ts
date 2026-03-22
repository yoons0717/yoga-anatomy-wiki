import { Muscle } from '@/types/anatomy';

export const CATEGORY_IMAGES: Record<string, string> = {
  상체: '/images/muscles/upper.png',
  '복부 및 호흡': '/images/muscles/core.png',
  척추: '/images/muscles/spine.png',
  하체: '/images/muscles/lower.png',
};

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
    area: { top: '33.5%', left: '84.5%', width: '13%', height: '3%' },
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
    area: { top: '38%', left: '84.5%', width: '12%', height: '3%' },
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
    area: { top: '42.5%', left: '84.5%', width: '11%', height: '3%' },
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
    area: { top: '50%', left: '84.5%', width: '12%', height: '3%' },
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
    area: { top: '25%', left: '26%', width: '10%', height: '3%' },
  },
  {
    id: 'um6',
    name_ko: '광배근',
    name_en: 'Latissimus Dorsi',
    category: '상체',
    origin: '7번 흉추부터 장골능까지의 흉요근막',
    insertion: '상완골의 이두근구',
    action: [
      '견관절 내전(Adduction)',
      '견관절 내회전(Internal Rotation)',
      '견관절 신전(Extension)',
    ],
    description:
      '등의 넓은 근육으로, 팔을 몸쪽으로 당기고 내회전시키며, 팔을 뒤로 젖히는 동작에 관여합니다.',
    area: { top: '65%', left: '69%', width: '15%', height: '3%' },
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
    area: { top: '45.5%', left: '84.5%', width: '11%', height: '3%' },
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
    area: { top: '23.5%', left: '67%', width: '15%', height: '3%' },
  },
  {
    id: 'um9',
    name_ko: '능형근',
    name_en: 'Rhomboids',
    category: '상체',
    origin: '소능형근 - C7~T1의 극돌기, 대능형근 - T2~T5의 극돌기',
    insertion: '소능형근 - 견갑근, 대능형근 - 견갑골 내측면(Medial border of scapula)',
    action: [
      '견갑골 후인(Retraction)',
      '견갑골 하방회전(Downward Rotation), 견갑골 거상(Elevation), 견갑골의 안정성 유지',
    ],
    description:
      '승모근과 함께 견갑골을 뒤로 당기는 역할을 하는 근육으로, 승모근보다 안쪽에 위치한 속근육입니다.',
    area: { top: '29%', left: '77.5%', width: '11%', height: '3%' },
  },
  {
    id: 'um10',
    name_ko: '삼각근',
    name_en: 'Deltoid',
    category: '상체',
    origin: '전면 - 쇄골의 외측 1/3, 측면 - 견봉돌기 측면, 후면 - 견갑극돌기',
    insertion: '상완골 측면의 삼각근 조면',
    action: [
      '전면 - 견관절 굴곡(Flexion)',
      '측면 - 견관절 외전(Abduction)',
      '후면 - 견관절 신전(Extension)',
    ],
    description:
      '어깨 관절의 외전을 담당하는 주요 근육으로, 어깨관절을 둥글게 감싸고 있으며, 전면, 측면, 후면으로 나뉘어 다양한 어깨 움직임에 관여합니다.',
    area: { top: '36.5%', left: '10%', width: '8%', height: '3%' },
  },
  {
    id: 'um11',
    name_ko: '대흉근',
    name_en: 'Pectoralis Major',
    category: '상체',
    origin: '상부 - 쇄골의 내측 1/2, 중부 - 흉골과 제 2~7 늑연골, 하부 - 복직근초',
    insertion: '상완골의 이두근구 (Lateral lip of the bicipital groove)',
    action: [
      '견관절 굴곡(Flexion)',
      '견관절 수평내전(Horizontal Adduction)',
      '견관절 내회전(Internal Rotation)',
    ],
    description:
      '가슴을 덮고 있는 부채꼴 모양의 근육으로, 근육의 기시점이 넓게 퍼져 있어 다양한 어깨 움직임에 관여합니다.',
    area: { top: '43%', left: '3.5%', width: '14%', height: '3%' },
  },
  {
    id: 'um12',
    name_ko: '소흉근',
    name_en: 'Pectoralis Minor',
    category: '상체',
    origin: '3~5번 늑골',
    insertion: '견갑골의 오훼돌기',
    action: ['견갑골 전인, 견갑골 하강(Depression)', '견갑골 하방회전'],
    description: '갈비뼈에 붙어서 호흡을 크게 들이마실 때 보조하는 호흡 보조 근육입니다.',
    area: { top: '46.5%', left: '3.5%', width: '14%', height: '3%' },
  },
  {
    id: 'um13',
    name_ko: '전거근',
    name_en: 'Serratus Anterior',
    category: '상체',
    origin: '1~9번 늑골의 외측',
    insertion: '견갑골의 내측면(Medial border of scapula)',
    action: ['견갑골 전인(Protraction)', '견갑골 상방회전(Upward Rotation)', '견갑대의 안정화근'],
    description:
      '가슴과 어깨 사이에 위치한 근육으로, 견갑골을 앞으로 당기는 역할을 하며, 어깨를 들어올리는 동작에 관여합니다.',
    area: { top: '63.5%', left: '26%', width: '9%', height: '5%' },
  },
  {
    id: 'um14',
    name_ko: '상완이두근',
    name_en: 'Biceps Brachii',
    category: '상체',
    origin: '장두 - 견갑골의 관절상결절, 단두 - 견갑골의 오훼돌기',
    insertion: '요골조면',
    action: ['주관절 굴곡', '견관절 굴곡', '전완 회외(Supination)'],
    description:
      '팔의 앞쪽에 위치한 근육으로, 팔을 굽히는 동작과 전완을 회외하는 동작에 관여합니다.',
    area: { top: '50.5%', left: '5%', width: '13%', height: '3%' },
  },
  {
    id: 'um15',
    name_ko: '상완근',
    name_en: 'Brachialis',
    category: '상체',
    origin: '상완골의 전면 하부 절반',
    insertion: '척골조면',
    action: ['주관절 굴곡'],
    description:
      '상완이두근 아래에 위치한 근육으로, 팔을 굽히는 동작에 관여하며, 상완이두근과 함께 작용하여 팔을 굽히는 역할을 합니다.',
    area: { top: '56%', left: '8%', width: '10%', height: '3%' },
  },
  {
    id: 'um16',
    name_ko: '상완삼두근',
    name_en: 'Triceps Brachii',
    category: '상체',
    origin:
      '장두 - 견갑골의 관절하결절, 외측두 - 상완골 후면 상부 절반, 내측두 - 상완골의 후면 하부 절반',
    insertion: '척골 주두돌기',
    action: ['주관절 신전', '견관절 신전'],
    description: '팔의 뒤쪽에 위치한 근육으로, 장두는 상완골두를 안정화합니다.',
    area: { top: '54%', left: '84.5%', width: '13%', height: '3%' },
  },
];

export const coreBodyMuscles: Muscle[] = [
  {
    id: 'cm1',
    name_ko: '복직근',
    name_en: 'Rectus Abdominis',
    category: '복부 및 호흡',
    origin: '치골결합(Pubic symphysis), 치골능(Pubic crest)',
    insertion: '흉골 검상돌기, 5~7번 늑연골(Costal cartilages of ribs 5–7)',
    action: ['척추 굴곡(Spinal Flexion)', '요추 안정화', '장기 보호', '호기 보조'],
    description:
      '골반에서 상복부까지 길게 붙어 있는 근육으로, "식스팩"으로 알려져 있습니다. 척추를 앞으로 굽히는 주요 근육이며, 호흡 시 복강내압을 조절합니다.',
  },
  {
    id: 'cm2',
    name_ko: '외복사근',
    name_en: 'External Oblique',
    category: '복부 및 호흡',
    origin: '6~12번 늑골',
    insertion: '장골능, 복건막',
    action: [
      '반대측 회전(Contralateral Rotation)',
      '동측 척추 측굴(Ipsilateral Lateral Flexion)',
      '척추 굴곡',
      '복압 상승',
      '골반 후방경사',
    ],
    description:
      '복부의 장기를 보호하고 압박하며 내장을 받쳐주는 역할을 합니다. 척추를 옆으로 돌리고 굽히는 작용을 하며 골반이 움직일 수 있도록 도와줍니다.',
  },
  {
    id: 'cm3',
    name_ko: '내복사근',
    name_en: 'Internal Oblique',
    category: '복부 및 호흡',
    origin: '흉요근막(Thoracolumbar fascia), 장골능(Iliac crest), 서혜인대의 외측 1/2',
    insertion: '10~12번 늑연골, 복건막',
    action: ['척추 굴곡', '골반 전방경사', '복압 상승'],
    description:
      '외복사근 아래에 위치하며, 외복사근과 반대 방향으로 주행하는 근육입니다. 동측 회전을 담당하며 복부 안정화에 기여합니다.',
  },
  {
    id: 'cm4',
    name_ko: '복횡근',
    name_en: 'Transversus Abdominis',
    category: '복부 및 호흡',
    origin: '흉요근막, 장골능, 서혜인대, 7~12번 늑연골 내면',
    insertion: '복건막, 백선(Linea alba), 치골',
    action: ['복압', '척추 안정화', '장기 보호', '호흡 보조 근육'],
    description:
      '복부의 가장 깊은 층에 위치한 근육으로, 코르셋처럼 복부를 감싸 척추를 안정시키는 핵심 근육입니다. ',
  },
  {
    id: 'cm5',
    name_ko: '척추기립근',
    name_en: 'Erector Spinae',
    category: '척추',
    origin: '천골(Sacrum), 장골능(Iliac crest), 흉요근막',
    insertion: '늑골각(Rib angles), 횡돌기(Transverse processes), 극돌기(Spinous processes)',
    action: ['척추 신전(Spinal Extension)', '척추 측굴(Lateral Flexion)', '척추 안정화'],
    description:
      '척추를 따라 수직으로 주행하는 근육군으로, 장근·최장근·극근으로 구성됩니다. 직립 자세를 유지하고 척추를 뒤로 펴는 주요 근육입니다.',
  },
  {
    id: 'cm6',
    name_ko: '다열근',
    name_en: 'Multifidus',
    category: '척추',
    origin: '천골 후면, 요추 유돌기(Mammillary processes of lumbar), 흉추 횡돌기, 경추 관절돌기',
    insertion: '2~4마디 위 척추의 극돌기',
    action: ['척추 신전', '척추 회전', '척추 분절 안정화'],
    description:
      '척추 가장 깊은 층에 위치한 근육으로, 각 척추 마디 사이의 안정성을 제공합니다. 요통 예방에 중요한 핵심 안정화 근육입니다.',
  },
  {
    id: 'cm7',
    name_ko: '횡격막',
    name_en: 'Diaphragm',
    category: '복부 및 호흡',
    origin: '흉골 검상돌기, 1~3번 요추, 7~12번 늑연골',
    insertion: '중심건(Central tendon)',
    action: ['흡기(Inspiration) — 주요 호흡근'],
    description:
      '흉강과 복강을 나누는 돔 형태의 근육으로, 호흡 시 수축하여 흉강을 확장시키고 공기를 들이마시는 역할을 합니다. 호흡의 가장 중요한 근육입니다.',
  },
  {
    id: 'cm8',
    name_ko: '요방형근',
    name_en: 'Quadratus Lumborum',
    category: '척추',
    origin: '장골능 후면(Posterior iliac crest)',
    insertion: '12번 늑골, 요추 1~4번 횡돌기',
    action: ['척추 측굴(Lateral Flexion)', '12번 늑골 하강(호기 보조)', '골반 거상', '척추 안정화'],
    description:
      '허리 깊은 곳에 위치한 사각형 근육으로, 한쪽으로 허리를 굽히거나 골반을 들어올리는 동작에 관여합니다. 요통의 흔한 원인 중 하나입니다.',
  },
];

export const allMuscles: Muscle[] = [...upperBodyMuscles, ...coreBodyMuscles];
