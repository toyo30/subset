interface Pin {
  lat: number;
  lng: number;
  name: string;
  status: string;
}

export const pins: Record<string, Pin> = {
  // 인문캠
  Minju: { lat: 37.587269, lng: 127.031758, name: "민주광장", status: "Super" },
  Center: { lat: 37.588529, lng: 127.03377, name: "중앙광장", status: "Cool" },
  Inmun_basket: {
    lat: 37.5873443,
    lng: 127.0330366,
    name: "인문계농구코트",
    status: "Hot",
  },
  InmunSocial_front: {
    lat: 37.5876031,
    lng: 127.0313914,
    name: "인문사회관 앞/자유마루",
    status: "Hot",
  },
  International: {
    lat: 37.5880154,
    lng: 127.0310206,
    name: "국제관 앞",
    status: "Cool",
  },
  Stud_back: {
    lat: 37.5866806,
    lng: 127.03254,
    name: "학생회관 뒤 원형극장",
    status: "Cool",
  },
  // 이캠
  Hana: { lat: 37.584851, lng: 127.025972, name: "하나스퀘어", status: "Cool" },
  Novel: { lat: 37.583577, lng: 127.02815, name: "노벨광장", status: "Cool" },
  Aegineung_basket: {
    lat: 37.5827944,
    lng: 127.0274422,
    name: "애기능 농구코트",
    status: "Cool",
  },
  //etc
  Nockji: {
    lat: 37.591473,
    lng: 127.025099,
    name: "녹지운동장",
    status: "Cool",
  },
  Biz: { lat: 37.5902808, lng: 127.0348337, name: "경영대", status: "Cool" },
  Jeonghu: {
    lat: 37.5868212,
    lng: 127.0299084,
    name: "정경대 후문",
    status: "Cool",
  },
  chamsal: {
    lat: 37.5849317,
    lng: 127.0295486,
    name: "참살이길",
    status: "Cool",
  },
};

export const bar_pins: Record<string, Pin> = {
  // 국제관앞
  Energy: {
    lat: 37.5877901,
    lng: 127.0307124,
    name: "융합에너지공학과 주점",
    status: "Hot",
  },
  France: {
    lat: 37.5878874,
    lng: 127.0308425,
    name: "불어불문학과 주점",
    status: "Hot",
  },
  Agriculture: {
    lat: 37.5880021,
    lng: 127.0309263,
    name: "농악대 주점",
    status: "Hot",
  },
  Chemibio: {
    lat: 37.588105,
    lng: 127.0310179,
    name: "화공생명공학과 주점",
    status: "Hot",
  },
  //인문사회관 주, status: "Hot",점 앞
  Politics: {
    lat: 37.5874349,
    lng: 127.031214,
    name: "정치외교학과 주점",
    status: "Hot",
  },
  Tgris: {
    lat: 37.5876055,
    lng: 127.03138,
    name: "티그리스 주점",
    status: "Hot",
  },
  Sportsku: {
    lat: 37.587742,
    lng: 127.0315127,
    name: "SPORTS KU 주점",
    status: "Hot",
  },
  // 구름다리, status: "Hot", 주점
  Bogun: {
    lat: 37.5874099,
    lng: 127.0313149,
    name: "보건정책관리학부 주점",
    status: "Hot",
  },
  China: {
    lat: 37.5876302,
    lng: 127.0315496,
    name: "중어중문학과 주점",
    status: "Hot",
  },
  //민주광장, status: "Hot", 주점
  Jungkyung: {
    lat: 37.5873278,
    lng: 127.0314118,
    name: "정경대학 주점",
    status: "Hot",
  },
  Koreanhistory: {
    lat: 37.5875321,
    lng: 127.0316559,
    name: "한국사학과 주점",
    status: "Hot",
  },
  Hanguk: {
    lat: 37.5874543,
    lng: 127.0318339,
    name: "한국사회연구회 주점",
    status: "Hot",
  },
  Engedu: {
    lat: 37.5872875,
    lng: 127.0320321,
    name: "영어교육과 주점",
    status: "Hot",
  },
  Smartsec: {
    lat: 37.5871299,
    lng: 127.031673,
    name: "스마트보안학과 주점",
    status: "Hot",
  },
  Foodeco: {
    lat: 37.5870135,
    lng: 127.0318266,
    name: "식품자원경제학과 주점",
    status: "Hot",
  },
  Cyber: {
    lat: 37.587097,
    lng: 127.0320019,
    name: "사이버국방학과 주점",
    status: "Hot",
  },
  // Biz: { lat: 37.5902808, lng: 127.0348337, name: "경영대 주점" },
};
