import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { BasicSelect } from "../../components/basicSelect/BasicSelect";
import MyContext from "../../contexts/MyContext";
import * as S from "./MyZiphapStyles";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
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

export const MyZiphap = () => {
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

      const filteredQuery = query(
        collectionRef,
        where("group", "==", selectGroup)
      );
      // console.log(selectGroup, "selectGroup");
      // 실시간 리스너 설정
      const unsubscribe = onSnapshot(filteredQuery, (querySnapshot) => {
        const newEventDocuments: any = [];
        querySnapshot.forEach((doc) => {
          newEventDocuments.push(doc.data());
        });
        console.log(newEventDocuments, "newEventDocuments");
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
        <BasicSelect
          selectOptions={userInstance.groups}
          setSelectGroup={onChange}
        />
        {eventDocuments && eventDocuments.length > 0 ? (
          eventDocuments.map((eventDocument: any, idx) => {
            const randomArray = shuffleArray(backgroundColors);
            console.log(randomArray, "randomArray");
            return (
              <S.CardContainer>
                <Card
                  sx={{ minWidth: 275 }}
                  variant="outlined"
                  key={`${idx} ${eventDocument.title}`}
                >
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {eventDocument.title} | {eventDocument.location}
                    </Typography>
                    <Typography variant="h5" component="div">
                      참여자
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
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
                                maxWidth: "280px",
                                margin: "0 auto",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderRadius: "50%",
                                  width: "30px",
                                  height: "30px",
                                  background:
                                    randomArray[(idx + 1) % randomArray.length],
                                  color: "white",
                                  fontWeight: "bold",
                                }}
                              >
                                {attendance.name.slice(
                                  attendance.name.length - 2
                                )}
                              </div>
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

                    <Typography variant="body2">
                      {"시작: "}
                      {convertTimestampToDate(eventDocument.timeToStart)}
                      <br />
                      {"종료: "}
                      {convertTimestampToDate(eventDocument.timeToEnd)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">참가하기</Button>
                  </CardActions>
                </Card>
              </S.CardContainer>
            );
          })
        ) : (
          <>없음</>
        )}
      </S.MyZiphapContainer>
    </>
  );
};
