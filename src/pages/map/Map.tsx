import { Button } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import BottomSheet from "../../components/bottomSheet/BottomSheet";
import { ImgCard } from "../../components/imgCard/ImgCard";
import { pins } from "../../constant/pins";
import MyContext from "../../contexts/MyContext";
import { db } from "../../firebase";
import { PostPathTest } from "../../types/constants/constants";
import { sortByLike, sortByTime } from "../../utils/listSort/list-sort";
import * as S from "./MapStyles";

export const Map = () => {
  const { bottomSheetStatus, setBottomSheetStatus, pinStatus, setPinStatus } =
    useContext(MyContext);
  const mapRef = useRef<HTMLElement | null | any>(null);
  const [eventDocuments, setEventDocuments] = useState([]);
  const [eventCount, setEventCount] = useState(0);
  const [likeSort, setLikeSort] = useState<boolean>(false);

  const handleClickLike = () => {
    setLikeSort(true);
  };

  const handleClickRecent = () => {
    setLikeSort(false);
  };

  useEffect(() => {
    const map = (mapRef.current = new naver.maps.Map("map", {
      //지도 추가, 좌표를 기점으로 주변 지도가 추가된다.
      center: new naver.maps.LatLng(37.5876055, 127.03138),
      zoom: 16,
    }));

    Object.entries(pins).forEach((item) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(item[1].lat, item[1].lng),
        map: mapRef.current,
        icon: {
          url: `${process.env.PUBLIC_URL}/Cool.png`,
          size: new naver.maps.Size(30, 40),
          scaledSize: new naver.maps.Size(30, 40),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(2, 13),
        },
      });

      window.naver.maps.Event.addListener(marker, "click", (e) => {
        setBottomSheetStatus(true);
        setPinStatus(item[0]);
        map.panTo(
          new naver.maps.LatLng(item[1].lat - 0.005, item[1].lng - 0.0001)
        );
      });
    });

    return () => {
      setBottomSheetStatus(false);
    };
  }, []);

  useEffect(() => {
    // 컬렉션 참조 생성

    const collectionRef = collection(db, PostPathTest);
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
      setEventCount(newEventDocuments.length);
    });

    // 컴포넌트가 언마운트되면 실시간 리스너 해제
    return () => {
      unsubscribe();
    };
  }, []); // 의존성 배열에 빈 배열 사용

  // useEffect(() => {
  //   if (eventDocuments.length > 0) {
  //     setEventCount(eventDocuments.length);
  //   }
  // }, [eventDocuments]);

  return (
    <S.MapContainer>
      <S.InfoContainer>
        <div>🏃‍♂️ 현재 근황 수 {eventCount}</div>
      </S.InfoContainer>
      <div
        id="map"
        ref={mapRef}
        style={{ width: "100%", height: "100vh" }}
      ></div>
      {bottomSheetStatus && (
        <BottomSheet>
          <div style={{ padding: "10px 20px 10px", textAlign: "right" }}>
            <Button
              variant={`${likeSort ? "contained" : "outlined"}`}
              onClick={handleClickLike}
            >
              좋아요 순
            </Button>
            <span
              style={{
                display: "inline-block",
                width: "20px",
              }}
            />
            <Button
              variant={`${likeSort ? "outlined" : "contained"}`}
              onClick={handleClickRecent}
            >
              최신순
            </Button>
          </div>

          {eventDocuments.filter((item: any) => item.location === pinStatus)
            .length > 0 ? (
            likeSort ? (
              sortByLike(eventDocuments)
                .filter((item: any) => item.location === pinStatus)
                .map((item: any) => (
                  <>
                    <ImgCard
                      key={item.id}
                      id={item.id}
                      url={item.url}
                      userId={item.userId}
                      password={item.password}
                      text={item.text}
                      likeCount={item.like}
                      location={item.location}
                      time={item.time}
                    />
                  </>
                ))
            ) : (
              sortByTime(eventDocuments)
                .filter((item: any) => item.location === pinStatus)
                .map((item: any) => (
                  <>
                    <ImgCard
                      key={item.id}
                      id={item.id}
                      url={item.url}
                      userId={item.userId}
                      password={item.password}
                      text={item.text}
                      likeCount={item.like}
                      location={item.location}
                      time={item.time}
                    />
                  </>
                ))
            )
          ) : (
            <>
              <img
                src={`${process.env.PUBLIC_URL}/Empty-img.png`}
                style={{ width: "100%" }}
              />
            </>
          )}
        </BottomSheet>
      )}
    </S.MapContainer>
  );
};
