interface Pin {
  lat: number;
  lng: number;
  name: string;
}

export const pins: Record<string, Pin> = {
  Minju: { lat: 37.587269, lng: 127.031758, name: "민주광장" },
  Center: { lat: 37.588529, lng: 127.03377, name: "중앙광장" },
  Hana: { lat: 37.584851, lng: 127.025972, name: "하나스퀘어" },
  Novel: { lat: 37.583577, lng: 127.02815, name: "노벨광장" },
  Nockji: { lat: 37.591473, lng: 127.025099, name: "녹지운동장" },
};
