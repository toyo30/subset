import { Button } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import BottomSheet from "../../components/bottomSheet/BottomSheet";
import { ImgCard } from "../../components/imgCard/ImgCard";
import { bar_pins } from "../../constant/pins";
import MyContext from "../../contexts/MyContext";
import { db } from "../../firebase";
import { PostPathTest } from "../../types/constants/constants";
import { sortByLike, sortByTime } from "../../utils/listSort/list-sort";
import * as S from "./MapStyles";

export const MapBar = () => {
  const { bottomSheetStatus, setBottomSheetStatus, pinStatus, setPinStatus } =
    useContext(MyContext);
  const mapRef = useRef<HTMLElement | null | any>(null);
  const [eventDocuments, setEventDocuments] = useState([]);
  const [likeSort, setLikeSort] = useState<boolean>(false);
  const [eventCount, setEventCount] = useState<any[]>([]);

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
      zoom: 18,
    }));

    Object.entries(bar_pins).forEach((item) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(item[1].lat, item[1].lng),
        map: mapRef.current,
        icon: {
          url: `${process.env.PUBLIC_URL}/Hot.png`,
          size: new naver.maps.Size(30, 40),
          scaledSize: new naver.maps.Size(30, 40),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(2, 13),
        },
      });

      const infoWindow = new window.naver.maps.InfoWindow({
        content: `<div style="min-width:150px;text-align:center;padding:10px;">
        ${item[1].name}</div>`,
      });

      window.naver.maps.Event.addListener(marker, "click", (e) => {
        infoWindow.open(map, marker);
        setBottomSheetStatus(true);
        setPinStatus(item[0]);
        map.panTo(
          new naver.maps.LatLng(item[1].lat - 0.001, item[1].lng - 0.00005)
        );
      });
    });
    return () => {
      setBottomSheetStatus(false);
    };
  }, []);

  useEffect(() => {
    // 컬렉션 참조 생성
    if (pinStatus.length > 0 && bottomSheetStatus) {
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
      });

      // 컴포넌트가 언마운트되면 실시간 리스너 해제
      return () => {
        unsubscribe();
      };
    }
  }, [bottomSheetStatus]); // 의존성 배열에 빈 배열 사용

  return (
    <S.MapContainer>
      {/* <S.InfoContainer>
        <div
          onClick={(e) => {
            const filteredList = eventCount.sort((a, b) => b.count - a.count);
            console.log(filteredList, "filteredList");
            setBottomSheetStatus(true);
            setPinStatus(filteredList[0].location);
          }}
        >
          🔥 현재 제일 핫한 주점
        </div>
      </S.InfoContainer> */}
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
          {/* {eventDocuments.filter((item: any) => item.location === pinStatus).length > 0 && likeSort
            ? sortByLike(eventDocuments)
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
                    />
                  </>
                ))
            : sortByTime(eventDocuments)
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
                    />
                  </>
                ))} */}
        </BottomSheet>
      )}
    </S.MapContainer>
  );
};
