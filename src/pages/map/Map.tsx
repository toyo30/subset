import { useEffect, useRef, useState } from "react";
import BottomSheet from "../../components/bottomSheet/BottomSheet";
import * as S from "./MapStyles";

const pins = {
  minju: { lat: 37.587269, lng: 127.031758 }, // 민주광장
  center: { lat: 37.588529, lng: 127.03377 }, // 중앙광장
  hana: { lat: 37.584851, lng: 127.025972 }, // 하나스퀘어
  novel: { lat: 37.583577, lng: 127.02815 }, // 하나스퀘어
  nockji: { lat: 37.591473, lng: 127.025099 },
  // 추가적인 핀의 좌표를 여기에 넣으세요.
};

export const Map = () => {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const [showBottomSheet, setShowBottomSheet] = useState<Boolean>(false);
  const [pinStatus, setPinStatus] = useState<string>("");

  const closeShowBottomSheet = (e: TouchEvent) => {
    if (e.target === mapRef.current) {
      console.log(e.target, "e.target");
      setShowBottomSheet(false);
    }
  };

  useEffect(() => {
    const map = (mapRef.current = new naver.maps.Map("map", {
      //지도 추가, 좌표를 기점으로 주변 지도가 추가된다.
      center: new naver.maps.LatLng(37.586466, 127.029169),
      zoom: 16,
    }));

    Object.entries(pins).forEach((item) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(item[1].lat, item[1].lng),
        map: mapRef.current,
      });

      window.naver.maps.Event.addListener(marker, "click", (e) => {
        setShowBottomSheet(true);
        setPinStatus(item[0]);
      });
    });

    window.addEventListener("touchstart", closeShowBottomSheet);
    window.addEventListener("touchmove", closeShowBottomSheet);
    window.addEventListener("touchend", closeShowBottomSheet);

    return () => {
      window.removeEventListener("touchstart", closeShowBottomSheet);
      window.removeEventListener("touchmove", closeShowBottomSheet);
      window.removeEventListener("touchend", closeShowBottomSheet);
    };
  }, []);

  useEffect(() => {
    console.log(pinStatus, "pinStatus");
  }, [pinStatus]);

  return (
    <S.MapContainer>
      <div
        id="map"
        ref={mapRef}
        style={{ width: "100%", height: "100vh" }}
      ></div>
      {showBottomSheet && <BottomSheet />}
    </S.MapContainer>
  );
};
