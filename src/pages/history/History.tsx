import CloseIcon from "@mui/icons-material/Close";
import { collection, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../contexts/MyContext";
import * as S from "./HistoryStyles";

import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { firebaseApi } from "../../api/firebase-api";
import { db } from "../../firebase";
import {
  backgroundColors,
  getRandomColor,
  shuffleArray,
} from "../../utils/color/randomColor";
import {
  convertTimestampToDate,
  formatConvertTimestampToDate,
} from "../../utils/time/timeFormat";
export const History = () => {
  // const [documents, setDocuments] = useState<
  //   Array<QuerySnapshot<DocumentData>>
  // >([]);
  const [eventDocuments, setEventDocuments] = useState([]);
  const { userInstance, selectGroup, setSelectGroup } = useContext(MyContext);

  const onChange = (groupName: string) => {
    setSelectGroup(groupName);
  };

  useEffect(() => {
    onChange(userInstance.groups[0]);
  }, [userInstance]);

  useEffect(() => {
    // 컬렉션 참조 생성
    if (selectGroup) {
      const collectionRef = collection(db, "Events");
      // 실시간 리스너 설정
      const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
        const newEventDocuments: any = [];
        querySnapshot.forEach((doc) => {
          if (
            doc
              .data()
              .attendance.filter(
                (attendance: any) => attendance.name === userInstance.name
              ).length > 0
          ) {
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
  }, [selectGroup]); // 의존성 배열에 빈 배열 사용
  return (
    <>
      <S.MyZiphapContainer>
        {/* {eventDocuments.length > 0 && (
          <>
            <Typography>
              지금까지 총 {eventDocuments.length}번의 이벤트에 참여했어요
            </Typography>
            <Typography>
              {10 - eventDocuments.length}번의 이벤트만 더 참여하면 외집합과
              모임을 도모할 수 있습니다
            </Typography>
          </>
        )} */}
        {eventDocuments && eventDocuments.length > 0 ? (
          eventDocuments.map((eventDocument: any, idx) => {
            const randomArray = shuffleArray(backgroundColors);

            return (
              <S.CardContainer>
                <Card
                  sx={{ minWidth: 275 }}
                  variant="outlined"
                  key={`${idx} ${eventDocument.title}`}
                >
                  <CardHeader
                    style={{
                      textAlign: "left",
                    }}
                    action={
                      <IconButton
                        aria-label="settings"
                        onClick={async () => {
                          await firebaseApi.deleteData(
                            eventDocument.id,
                            "Events"
                          );
                        }}
                      >
                        {eventDocument.author === userInstance.name && (
                          <CloseIcon />
                        )}
                      </IconButton>
                    }
                    title={eventDocument.title}
                    subheader={eventDocument.location}
                  />
                  <CardContent>
                    <Typography variant="body2">
                      {"시작: "}
                      {convertTimestampToDate(eventDocument.timeToStart)}
                      <br />
                      {"종료: "}
                      {convertTimestampToDate(eventDocument.timeToEnd)}
                    </Typography>

                    <Typography
                      variant="body1"
                      component="div"
                      style={{
                        textAlign: "left",
                      }}
                    >
                      참여자
                    </Typography>
                    <Typography
                      sx={{ mb: 1.5 }}
                      color="text.secondary"
                      style={{
                        textAlign: "left",
                      }}
                    >
                      {eventDocument.attendance
                        .flatMap((attendance: any) => attendance.name)
                        .join(" | ")}
                    </Typography>

                    <div>
                      {eventDocument.attendance.map(
                        (attendance: any, idx: number) => {
                          const randomColor = getRandomColor();

                          return (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                margin: "0 auto",
                              }}
                            >
                              <S.NameCircle
                                style={{
                                  background:
                                    randomArray[(idx + 1) % randomArray.length],
                                }}
                              >
                                {attendance.name}
                              </S.NameCircle>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <div
                                  style={{
                                    borderRadius: "50%",
                                    width: "10px",
                                    height: "10px",
                                    background:
                                      randomArray[
                                        (idx + 1) % randomArray.length
                                      ],
                                  }}
                                ></div>
                                <div>
                                  {formatConvertTimestampToDate(
                                    attendance.timeToStart
                                  )}{" "}
                                  {" ~ "}{" "}
                                  {formatConvertTimestampToDate(
                                    attendance.timeToEnd
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </CardContent>
                </Card>
              </S.CardContainer>
            );
          })
        ) : (
          <S.LoadingContainer>
            <img
              src={process.env.PUBLIC_URL + "/background.png"}
              alt="loading"
              style={{
                width: "220px",
                height: "220px",
              }}
            />
          </S.LoadingContainer>
        )}
      </S.MyZiphapContainer>
    </>
  );
};
