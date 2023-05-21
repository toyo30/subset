import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ImgCard } from "../../components/imgCard/ImgCard";
import { db } from "../../firebase";
import { sortByLike } from "../../utils/listSort/list-sort";
import * as S from "./CommentStyles";

export const Comment = () => {
  const [eventDocuments, setEventDocuments] = useState<any[]>([]);

  // useEffect(() => {
  //   const collectionNames = Object.keys(pins); // 각 컬렉션의 이름을 담은 배열

  //   const fetchData = async () => {\
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

  // useEffect(() => {
  //   const collectionNames = Object.keys(pins); // 각 컬렉션의 이름을 담은 배열

  //   const fetchData = async () => {
  //     let allData: any[] = [];

  //     await Promise.all(
  //       collectionNames.map(async (collectionName) => {
  //         const collectionRef = collection(db, collectionName);
  //         const snapshot = await getDocs(collectionRef);

  //         const newEventDocuments = snapshot.docs.map((doc) => ({
  //           ...doc.data(),
  //           id: doc.id,
  //         }));

  //         allData = [...allData, ...newEventDocuments];
  //       })
  //     );

  //     setEventDocuments(allData);
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const collectionNames = Object.keys(pins); // 각 컬렉션의 이름을 담은 배열
  //   const collectionRef0 = collection(db, collectionNames[0]);
  //   const collectionRef1 = collection(db, collectionNames[1]);
  //   const collectionRef2 = collection(db, collectionNames[2]);
  //   const collectionRef3 = collection(db, collectionNames[3]);
  //   const collectionRef4 = collection(db, collectionNames[4]);
  //   // 실시간 리스너 설정

  //   let allData: any = [];

  //   const unsubscribe0 = onSnapshot(collectionRef0, (querySnapshot) => {
  //     const newEventDocuments0: any = [];
  //     querySnapshot.forEach((doc) => {
  //       if (doc.data()) {
  //         newEventDocuments0.push({
  //           ...doc.data(),
  //           id: doc.id,
  //         });
  //       }
  //     });

  //     console.log
  //     allData.concat([...allData, ...newEventDocuments0]);
  //   });

  //   const unsubscribe1 = onSnapshot(collectionRef1, (querySnapshot) => {
  //     const newEventDocuments1: any = [];
  //     querySnapshot.forEach((doc) => {
  //       if (doc.data()) {
  //         newEventDocuments1.push({
  //           ...doc.data(),
  //           id: doc.id,
  //         });
  //       }
  //     });
  //     allData.concat([...allData, ...newEventDocuments1]);
  //   });

  //   const unsubscribe2 = onSnapshot(collectionRef2, (querySnapshot) => {
  //     const newEventDocuments2: any = [];
  //     querySnapshot.forEach((doc) => {
  //       if (doc.data()) {
  //         newEventDocuments2.push({
  //           ...doc.data(),
  //           id: doc.id,
  //         });
  //       }
  //     });
  //     allData.concat([...allData, ...newEventDocuments2]);
  //   });

  //   const unsubscribe3 = onSnapshot(collectionRef3, (querySnapshot) => {
  //     const newEventDocuments3: any = [];
  //     querySnapshot.forEach((doc) => {
  //       if (doc.data()) {
  //         newEventDocuments3.push({
  //           ...doc.data(),
  //           id: doc.id,
  //         });
  //       }
  //     });
  //     allData.concat([...allData, ...newEventDocuments3]);
  //   });

  //   const unsubscribe4 = onSnapshot(collectionRef4, (querySnapshot) => {
  //     const newEventDocuments4: any = [];
  //     querySnapshot.forEach((doc) => {
  //       if (doc.data()) {
  //         newEventDocuments4.push({
  //           ...doc.data(),
  //           id: doc.id,
  //         });
  //       }
  //     });
  //     allData.concat([...allData, ...newEventDocuments4]);
  //   });

  //   console.log(allData, "allData");
  //   setEventDocuments(allData);

  //   // 컴포넌트가 언마운트되면 실시간 리스너 해제
  //   return () => {
  //     unsubscribe0();
  //     unsubscribe1();
  //     unsubscribe2();
  //     unsubscribe3();
  //     unsubscribe4();
  //   };
  // }, []);

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
  }, []); // 의존성 배열에 빈 배열 사용

  useEffect(() => {
    console.log(eventDocuments, "eventDocuments");
  }, [eventDocuments]);

  return (
    <S.CommentContainer>
      {eventDocuments.length > 0 &&
        sortByLike(eventDocuments).map((item: any) => {
          return (
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
          );
        })}
    </S.CommentContainer>
  );
};
