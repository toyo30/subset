import { useEffect, useRef } from "react";
import * as S from "./MapStyles";

export const Map = () => {
  const mapRef = useRef<HTMLElement | null | any>(null);

  useEffect(() => {
    const initMap = () => {
      mapRef.current = new naver.maps.Map("map", {
        //지도 추가, 좌표를 기점으로 주변 지도가 추가된다.
        center: new naver.maps.LatLng(37.586466, 127.029169),
        zoom: 16,
      });
    };
    initMap();
  }, []);

  return (
    <S.MapContainer>
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>
    </S.MapContainer>
  );
};
