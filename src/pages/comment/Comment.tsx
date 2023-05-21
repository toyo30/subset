import { Button } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ImgCard } from "../../components/imgCard/ImgCard";
import { db } from "../../firebase";
import { sortByLike, sortByTime } from "../../utils/listSort/list-sort";
import * as S from "./CommentStyles";
import Lottie from "lottie-react";
import loadingLottie from "../../lotties/loading.json";

export const Comment = () => {
  const [eventDocuments, setEventDocuments] = useState<any[]>([]);
  const [likeSort, setLikeSort] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태를 관리하는 상태
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
    });

    // 컴포넌트가 언마운트되면 실시간 리스너 해제
    return () => {
      unsubscribe();
    };
    setLoading(false);
  }, []); // 의존성 배열에 빈 배열 사용

  const handleClickLike = () => {
    setLikeSort(true);
  };

  const handleClickRecent = () => {
    setLikeSort(false);
  };

  return (
    {loading ? (
      <S.CommentContainer>
        <Lottie animationData={loadingLottie} />
      </S.CommentContainer>
    ):(
      <S.CommentContainer>
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
      {eventDocuments.length > 0 ? (likeSort
        ? sortByLike(eventDocuments).map((item: any) => (
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
        : sortByTime(eventDocuments).map((item: any) => (
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
          ))):<img src={`${process.env.PUBLIC_URL}/Zola.png`}></img>
    </S.CommentContainer>)}
  );
};


// {loading ? (
//   <Lottie animationData={loadingLottie} />
// ) :

// :  <img src={`${process.env.PUBLIC_URL}/Zola.png`}></img>

  // useEffect(() => {
  //   const collectionNames = Object.keys(pins); // 각 컬렉션의 이름을 담은 배열

  //   const fetchData = async () => {
  //     let allData: string[] = [];

  //     // Promise.all을 이용하여 모든 컬렉션의 데이터를 병렬로 가져옵니다.
  //     // await Promise.all(
  //     //   collectionNames.map(async (collectionName) => {
  //     //     const collectionRef = collection(db, collectionName);
  //     //     console.log(collectionRef, "collectionRef");

  //     //     // 실시간 리스너 설정
  //     //     const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
  //     //       const newEventDocuments: any[] = [];
  //     //       querySnapshot.forEach((doc) => {
  //     //         console.log(doc.data(), "doc.data()");
  //     //         if (doc.data()) {
  //     //           newEventDocuments.push({
  //     //             ...doc.data(),
  //     //             id: doc.id,
  //     //           });
  //     //         }
  //     //       });

  //     //       allData = [...allData, ...newEventDocuments];
  //     //       setEventDocuments([...eventDocuments, ...newEventDocuments]);
  //     //     });

  //     //     // 컴포넌트가 언마운트되면 실시간 리스너 해제
  //     //     return () => {
  //     //       unsubscribe();
  //     //     };
  //     //   })
  //     // );

  //     // setEventDocuments(allData);
  //   };

  //   fetchData();
  // }, []);