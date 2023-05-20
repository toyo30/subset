import { collection, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import BottomSheet from "../../components/bottomSheet/BottomSheet";
import { ImageComponent } from "../../components/imgBox/ImgBox";
import { pins } from "../../constant/pins";
import MyContext from "../../contexts/MyContext";
import { db } from "../../firebase";
import * as S from "./MapStyles";

export const Map = () => {
  const { bottomSheetStatus, setBottomSheetStatus, pinStatus, setPinStatus } =
    useContext(MyContext);
  const mapRef = useRef<HTMLElement | null | any>(null);
  const [eventDocuments, setEventDocuments] = useState([]);

  useEffect(() => {
    console.log(process.env.PUBLIC_URL, "--------- url");
    const map = (mapRef.current = new naver.maps.Map("map", {
      //지도 추가, 좌표를 기점으로 주변 지도가 추가된다.
      center: new naver.maps.LatLng(37.586466, 127.029169),
      zoom: 16,
    }));

    Object.entries(pins).forEach((item) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(item[1].lat, item[1].lng),
        map: mapRef.current,
        // icon: {
        //   url: `${process.env.PUBLIC_URL}/Hot.png`,
        //   size: new naver.maps.Size(10, 10),
        //   origin: new naver.maps.Point(0, 0),
        //   anchor: new naver.maps.Point(2, 13),
        // },
      });

      window.naver.maps.Event.addListener(marker, "click", (e) => {
        setBottomSheetStatus(true);
        setPinStatus(item[0]);
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

  useEffect(() => {
    // 컬렉션 참조 생성
    if (pinStatus.length > 0 && bottomSheetStatus) {
      const collectionRef = collection(db, pinStatus);
      console.log(collectionRef, "collectionRef", pinStatus, "pinStatus");
      // 실시간 리스너 설정
      const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
        const newEventDocuments: any = [];
        querySnapshot.forEach((doc) => {
          if (doc.data()) {
            newEventDocuments.push({
              ...doc.data(),
              id: doc.id,
            });
          }
        });
        setEventDocuments(newEventDocuments);
      });

      // 컴포넌트가 언마운트되면 실시간 리스너 해제
      return () => {
        unsubscribe();
      };
    }
  }, [bottomSheetStatus]); // 의존성 배열에 빈 배열 사용

  useEffect(() => {
    console.log(eventDocuments, "eventDocuments");
  }, [eventDocuments]);

  return (
    <S.MapContainer>
      <div
        id="map"
        ref={mapRef}
        style={{ width: "100%", height: "100vh" }}
      ></div>
      {bottomSheetStatus && (
        <BottomSheet>
          {eventDocuments.length > 0 &&
            eventDocuments.map((item: any) => (
              <div>
                <h1>{item.name}</h1>
                <ImageComponent key={item.id} path={item.url} />
              </div>
            ))}
        </BottomSheet>
      )}
    </S.MapContainer>
  );
};
