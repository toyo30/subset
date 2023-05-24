import { Button } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import BottomSheet from "../../components/bottomSheet/BottomSheet";
import { ImgCard } from "../../components/imgCard/ImgCard";
import { bar_pins, pins } from "../../constant/pins";
import MyContext from "../../contexts/MyContext";
import { db } from "../../firebase";
import { sortByLike, sortByTime } from "../../utils/listSort/list-sort";
import { urlByStatus } from "../../utils/status/status";
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
    const result = { ...pins, ...bar_pins };

    const map = (mapRef.current = new naver.maps.Map("map", {
      //지도 추가, 좌표를 기점으로 주변 지도가 추가된다.
      center: new naver.maps.LatLng(37.5876055, 127.03138),
      zoom: 18,
    }));

    Object.entries(result).forEach((item) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(item[1].lat, item[1].lng),
        map: mapRef.current,
        icon: {
          url: urlByStatus(item[1].status),
          size: new naver.maps.Size(30, 40),
          scaledSize: new naver.maps.Size(30, 40),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(2, 13),
        },
      });

      const infoWindow = new window.naver.maps.InfoWindow({
        content: `
                  <div style="min-width:150px;text-align:center;padding:10px;">
                    <div>${item[1].name}</div>
                    ${
                      item[1].link
                        ? `<a href=${item[1].link} target="_blank">👉 주점정보 바로가기</a>`
                        : ""
                    }
                  </div>`,
      });

      window.naver.maps.Event.addListener(marker, "click", (e) => {
        infoWindow.open(map, marker);
        setBottomSheetStatus(true);
        setPinStatus(item[0]);
        // map.panTo(
        //   new naver.maps.LatLng(item[1].lat - 0.005, item[1].lng - 0.0001)
        // );
        const baseZoom = 18;
        const currentZoom = map.getZoom();

        // 줌 레벨에 따른 스케일 인자 계산
        const scale = Math.pow(2, baseZoom - currentZoom);

        const baseLatChange = 0.000825;
        const baseLngChange = 0.00000425;

        // 줌 레벨에 따라 변경값 조정
        const scaledLatChange = baseLatChange * scale;
        const scaledLngChange = baseLngChange * scale;
        map.panTo(
          new naver.maps.LatLng(
            item[1].lat - scaledLatChange,
            item[1].lng - scaledLngChange
          )
        );
      });
    });

    return () => {
      setBottomSheetStatus(false);
    };
  }, []);

  useEffect(() => {
    // 컬렉션 참조 생성

    const collectionRef = collection(db, "Post");
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
      <S.InfoBarContainer>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <S.ImgIcon src={`${process.env.PUBLIC_URL}/Hot.png`} /> 주점
        </div>
      </S.InfoBarContainer>
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
