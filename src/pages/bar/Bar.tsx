import { useContext, useEffect, useRef } from "react";
import BottomSheet from "../../components/bottomSheet/BottomSheet";
import MyContext from "../../contexts/MyContext";
import * as S from "./BarStyles";

const pins = {
  Minju: { lat: 37.587269, lng: 127.031758, name: "민주광장" }, // 민주광장
  Center: { lat: 37.588529, lng: 127.03377, name: "중앙광장" }, // 중앙광장
  Hana: { lat: 37.584851, lng: 127.025972, name: "하나스퀘어" }, // 하나스퀘어
  Novel: { lat: 37.583577, lng: 127.02815, name: "노벨광장" }, // 하나스퀘어
  Nockji: { lat: 37.591473, lng: 127.025099, name: "녹지운동장" },
  // 추가적인 핀의 좌표를 여기에 넣으세요.
};

export const Map = () => {
  const { bottomSheetStatus, setBottomSheetStatus, setPinStatus } =
    useContext(MyContext);
  const mapRef = useRef<HTMLElement | null | any>(null);

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
        setBottomSheetStatus(true);
        setPinStatus(item[1].name);
      });
    });

    // window.addEventListener("touchstart", closeShowBottomSheet);
    // window.addEventListener("touchmove", closeShowBottomSheet);
    // window.addEventListener("touchend", closeShowBottomSheet);

    // return () => {
    //   window.removeEventListener("touchstart", closeShowBottomSheet);
    //   window.removeEventListener("touchmove", closeShowBottomSheet);
    //   window.removeEventListener("touchend", closeShowBottomSheet);
    // };
  }, []);

  return (
    <S.MapContainer>
      <div
        id="map"
        ref={mapRef}
        style={{ width: "100%", height: "100vh" }}
      ></div>
      {bottomSheetStatus && <BottomSheet></BottomSheet>}
    </S.MapContainer>
  );
};
