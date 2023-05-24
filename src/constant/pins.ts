interface Pin {
  lat: number;
  lng: number;
  name: string;
  status: string;
  link?: string;
}

export const pins: Record<string, Pin> = {
  // 인문캠
  Minju: { lat: 37.587067, lng: 127.032055, name: "민주광장", status: "Super" },
  Center: { lat: 37.588529, lng: 127.03377, name: "중앙광장", status: "Cool" },
  Inmun_basket: {
    lat: 37.5873443,
    lng: 127.0330366,
    name: "인문계농구코트",
    status: "Cool",
  },
  InmunSocial_front: {
    lat: 37.5876031,
    lng: 127.0313914,
    name: "인문사회관 앞/자유마루",
    status: "Cool",
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

export const bar_pins_day1: Record<string, Pin> = {
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

export const bar_pins: Record<string, Pin> = {
  //국제관 앞
  ICCUS: {
    lat: 37.5878874,
    lng: 127.0308425,
    name: "ICCUS",
    status: "Hot",
  },

  JASS: { lat: 37.5880021, lng: 127.0309263, name: "JASS", status: "Hot" },

  //민주광장
  // GeographyEducation: {
  //   lat: 37.5874291,
  //   lng: 127.0313045,
  //   name: "지리교육과",
  //   status: "Hot",
  //   link: "https://www.instagram.com/p/CsklU1yv0CO/",
  // },
  Germany: {
    lat: 37.5874291,
    lng: 127.0313045,
    name: "독어독문학과",
    status: "Hot",
  },
  WhaGu: {
    lat: 37.58761,
    lng: 127.031519,
    name: "화구회",
    status: "Hot",
    link: "https://www.instagram.com/p/CsgdHrbPiRB/",
  },
  // ChemicalBiologicalSciences: {
  //   lat: 37.5873037,
  //   lng: 127.031319,
  //   name: "화공생명공학과",
  //   status: "Hot",
  //   link: "https://www.instagram.com/p/Csa6jvrp5u9/",
  // },
  PenCing: {
    lat: 37.5873037,
    lng: 127.031319,
    name: "펜싱부",
    status: "Hot",
    link: "https://www.instagram.com/p/CsalrBzJdYC/",
  },
  // Society: {
  //   lat: 37.5876026,
  //   lng: 127.0317153,
  //   name: "사회학과",
  //   status: "Hot",
  //   link: "https://www.instagram.com/p/CsVaFSvvcWY/",
  // },
  Society: {
    lat: 37.5876026,
    lng: 127.0317153,
    name: "고대문학회",
    status: "Hot",
    link: "https://www.instagram.com/p/CsoWKM0h8pS/",
  },
  // Mountain: {
  //   lat: 37.5874894,
  //   lng: 127.0315858,
  //   name: "산악부",
  //   status: "Hot",
  //   link: "https://www.instagram.com/p/CslahDPSyf3/",
  // },
  //민주광장2

  // KoreaEducation: {
  //   lat: 37.5873411,
  //   lng: 127.0315587,
  //   name: "국어교육과",
  //   status: "Hot",
  //   link: "https://www.instagram.com/p/Csf_ZssJk6t/",
  // },

  SoccerAmatuer: {
    lat: 37.5873411,
    lng: 127.0315587,
    name: "아마추어축구부",
    status: "Hot",
  },

  // Language: {
  //   lat: 37.5871998,
  //   lng: 127.0315671,
  //   name: "언어학과",
  //   status: "Hot",
  //   link: "https://www.instagram.com/p/CsgidThPCoQ/",
  // },
  DolBit: {
    lat: 37.5871998,
    lng: 127.0315671,
    name: "돌빛",
    status: "Hot",
    link: "https://www.instagram.com/p/Csd3t2FLE-f/",
  },
  // IndustrialManagementEngineering: {
  //   lat: 37.5873951,
  //   lng: 127.0318366,
  //   name: "산업경영공학부",
  //   status: "Hot",
  //   link: "https://www.instagram.com/p/CshxVvDhG05/",
  // },
  ArchitecterSocietyEngineering: {
    lat: 37.5873951,
    lng: 127.0318366,
    name: "건축사회환경공학부",
    status: "Hot",
    link: "https://www.instagram.com/p/CskfgWmpWot/",
  },
  // Miss: {
  //   lat: 37.5874601,
  //   lng: 127.0319117,
  //   name: "미스디렉션",
  //   status: "Hot",
  // },

  // Philosophy: {
  //   lat: 37.587284,
  //   lng: 127.031741,
  //   name: "철학과",
  //   status: "Hot",
  //   link: "https://www.instagram.com/p/CslSjF7PT7Z/",
  // },
  //학생회관 뒤 원형광장
  // FestivalPreparatoryCommittee: {
  //   lat: 37.586837,
  //   lng: 127.032606,
  //   name: "석탑대동제준비위원회",
  //   status: "Hot",
  //   link: "https://www.instagram.com/p/CslSjF7PT7Z/",
  // },
  //농구코트
  Suho: {
    lat: 37.587194,
    lng: 127.033129,
    name: "수호회",
    status: "Hot",
    link: "https://www.instagram.com/p/Csgn_nerEUh/",
  },
  weightLifting: {
    lat: 37.587244,
    lng: 127.033235,
    name: "역도부",
    status: "Hot",
    link: "https://www.instagram.com/p/CsdaJrOPSQ0/",
  },
  HatBitChron: {
    lat: 37.587301,
    lng: 127.033099,
    name: "산악부",
    status: "Hot",
    link: "https://www.instagram.com/p/CslahDPSyf3/",
  },
  Judo: {
    lat: 37.587418,
    lng: 127.033023,
    name: "소믈리에",
    status: "Hot",
    link: "https://www.instagram.com/p/CslyqklPeIm/",
  },
  DSM: {
    lat: 37.587343,
    lng: 127.03292,
    name: "쿠핏",
    status: "Hot",
    link: "https://www.instagram.com/p/Csnly5eP-QC/",
  },
  //이과캠 농구코트
  // EngineeringExecutiveCommittee: {
  //   lat: 37.582669,
  //   lng: 127.027476,
  //   name: "공과대학집행위원회",
  //   status: "Hot",
  //   link: "https://www.instagram.com/p/CsiDN0npVCg/",
  // },

  Architecture: {
    lat: 37.582723,
    lng: 127.027461,
    name: "FREAKS",
    status: "Hot",
    link: "https://www.instagram.com/p/CskjvACPqoq/",
  },

  Engineering: {
    lat: 37.582744,
    lng: 127.027356,
    name: "기계공학부",
    status: "Hot",
    link: "https://www.instagram.com/p/Csgd6eVpCA-/",
  },
};

const basketBall = {
  //농구코트
  Suho: {
    lat: 37.587194,
    lng: 127.033129,
    name: "수호회",
    status: "Hot",
    link: "https://www.instagram.com/p/Csgn_nerEUh/",
  },
  weightLifting: {
    lat: 37.587244,
    lng: 127.033235,
    name: "역도부",
    status: "Hot",
    link: "https://www.instagram.com/p/CsdaJrOPSQ0/",
  },
  HatBitChron: {
    lat: 37.587301,
    lng: 127.033099,
    name: "햇빛촌",
    status: "Hot",
    link: "https://www.instagram.com/p/Cslle-shK0w/",
  },
  Judo: {
    lat: 37.587418,
    lng: 127.033023,
    name: "유도부",
    status: "Hot",
  },
  DSM: {
    lat: 37.587343,
    lng: 127.03292,
    name: "DSM",
    status: "Hot",
    link: "https://www.instagram.com/p/CsiV1LPLUD2/",
  },
  //이과캠 농구코트
  EngineeringExecutiveCommittee: {
    lat: 37.582669,
    lng: 127.027476,
    name: "공과대학집행위원회",
    status: "Hot",
    link: "https://www.instagram.com/p/CsiDN0npVCg/",
  },

  Architecture: {
    lat: 37.582723,
    lng: 127.027461,
    name: "건축학과",
    status: "Hot",
    link: "https://www.instagram.com/p/CsjW3nPvX8V/",
  },

  Engineering: {
    lat: 37.582744,
    lng: 127.027356,
    name: "기계공학부",
    status: "Hot",
    link: "https://www.instagram.com/p/Csgd6eVpCA-/",
  },

  //engineering
  // 공과대학집행위원회,
};

const minju = {
  // 국제관앞
  // Energy: {
  //   lat: 37.5877625,
  //   lng: 127.0307064,
  //   name: "서어서문학과",
  //   status: "Hot",
  // },
  // Chemibio: { lat: 37.588105, lng: 127.0310179, name: "화공생명공학과" },
  //인문사회관 앞
  // Politics: { lat: 37.5874349, lng: 127.0312140, name: "정치외교학과" },
  Interglobal: {
    lat: 37.5876055,
    lng: 127.03138,
    name: "국제학부 X 글로벌한국융합학부",
    status: "Hot",
  },
  // Sportsku: { lat: 37.5877420, lng: 127.0315127, name: "SPORTS KU" },
  // 구름다리
  Isback19: {
    lat: 37.5874099,
    lng: 127.0313149,
    name: "19학번ISBACK",
    status: "Hot",
  },
  // China: { lat: 37.5876302, lng: 127.0315496, name: "중어중문학과" },
  //민주광장

  Spanish: {
    lat: 37.5878874,
    lng: 127.0308425,
    name: "서어서문학과",
    status: "Hot",
    link: "https://www.instagram.com/p/CsVCpd8P0rP/",
  },

  Kuba: { lat: 37.5880021, lng: 127.0309263, name: "KUBA", status: "Hot" },

  GeographyEducation: {
    lat: 37.5874291,
    lng: 127.0313045,
    name: "지리교육과",
    status: "Hot",
    link: "https://www.instagram.com/p/CsklU1yv0CO/",
  },
  DepartmentOfPublicAdministration: {
    lat: 37.5875321,
    lng: 127.0316559,
    name: "행정학과",
    status: "Hot",
    link: "https://www.instagram.com/p/CsdYnaYv17K/",
  },
  ChemicalBiologicalSciences: {
    lat: 37.5873037,
    lng: 127.031319,
    name: "화공생명공학과",
    status: "Hot",
    link: "https://www.instagram.com/p/Csa6jvrp5u9/",
  },
  Mountain: {
    lat: 37.5876026,
    lng: 127.0317153,
    name: "산악부",
    status: "Hot",
    link: "https://www.instagram.com/p/CslahDPSyf3/",
  },

  //민주광장2
  KoreaEducation: {
    lat: 37.5873411,
    lng: 127.0315587,
    name: "국어교육과",
    status: "Hot",
    link: "https://www.instagram.com/p/Csf_ZssJk6t/",
  },

  Society: {
    lat: 37.5874894,
    lng: 127.0315858,
    name: "사회학과",
    status: "Hot",
    link: "https://www.instagram.com/p/CsVaFSvvcWY/",
  },

  Language: {
    lat: 37.5871998,
    lng: 127.0315671,
    name: "언어학과",
    status: "Hot",
    link: "https://www.instagram.com/p/CsgidThPCoQ/",
  },
  IndustrialManagementEngineering: {
    lat: 37.5873951,
    lng: 127.0318366,
    name: "산업경영공학부",
    status: "Hot",
    link: "https://www.instagram.com/p/CshxVvDhG05/",
  },
  Miss: {
    lat: 37.5874601,
    lng: 127.0319117,
    name: "미스디렉션",
    status: "Hot",
  },

  Philosophy: {
    lat: 37.5874166,
    lng: 127.0311996,
    name: "철학과",
    status: "Hot",
    link: "https://www.instagram.com/p/CslSjF7PT7Z/",
  },
};
