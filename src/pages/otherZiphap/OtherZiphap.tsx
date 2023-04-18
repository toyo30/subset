import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Card } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../contexts/MyContext";
import { backgroundColors, shuffleArray } from "../../utils/color/randomColor";
import * as S from "./otherZiphapStyles";

import { Button, CardActions, CardContent, Typography } from "@mui/material";
import { firebaseApi } from "../../api/firebase-api";
import { db } from "../../firebase";

export const OtherZiphap = () => {
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

      // const filteredQuery = query(
      //   collectionRef,
      //   where("group", "==", selectGroup)
      // );
      // console.log(selectGroup, "selectGroup");
      // 실시간 리스너 설정
      const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
        const newEventDocuments: any = [];
        querySnapshot.forEach((doc) => {
          newEventDocuments.push({
            ...doc.data(),
            id: doc.id,
          });
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
        <div>다른 집합 엿보기</div>
        {/* <BasicSelect /> */}
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
                    <Typography variant="h5" component="div">
                      {eventDocument.group}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {eventDocument.title}
                      {/* | {eventDocument.location} */}
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
                      {/* {eventDocument.attendance.map(
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
                      )} */}
                    </div>

                    {/* <Typography variant="body2">
                      {"시작: "}
                      {convertTimestampToDate(eventDocument.timeToStart)}
                      <br />
                      {"종료: "}
                      {convertTimestampToDate(eventDocument.timeToEnd)}
                    </Typography> */}
                  </CardContent>
                  <CardActions>
                    {/* {eventDocument.like.length === 0 && (
                      <Button
                        startIcon={<FavoriteBorderIcon fill="transparent" />}
                        size="small"
                        onClick={async () => {
                          const response = await firebaseApi.updateData(
                            eventDocument.id,
                            "Events",
                            {
                              like: [...eventDocument.like, userInstance.name],
                            }
                          );
                        }}
                      >
                        좋아요
                      </Button>
                    )} */}

                    {eventDocument.like.length > 0 &&
                    eventDocument.like.includes(userInstance.name) ? (
                      <Button
                        startIcon={<FavoriteIcon fill="transparent" />}
                        size="small"
                        onClick={async () => {
                          const response = await firebaseApi.updateData(
                            eventDocument.id,
                            "Events",
                            {
                              like: eventDocument.like.filter(
                                (name: any) => name !== userInstance.name
                              ),
                            }
                          );
                        }}
                      >
                        좋아요
                      </Button>
                    ) : (
                      <Button
                        startIcon={<FavoriteBorderIcon fill="transparent" />}
                        size="small"
                        onClick={async () => {
                          const response = await firebaseApi.updateData(
                            eventDocument.id,
                            "Events",
                            {
                              like: [...eventDocument.like, userInstance.name],
                            }
                          );
                        }}
                      >
                        좋아요
                      </Button>
                    )}
                    <Button>
                      {eventDocument.like.length > 0 &&
                        eventDocument.like.length}
                    </Button>
                    {/* {eventDocument.(
                      (name: any) => name === userInstance.name
                    ).length === 0 ? (
                      <Button startIcon={<FavoriteIcon />} size="small">
                        좋아요
                      </Button>
                    ) : (
                      <Button startIcon={<FavoriteIcon />} size="small">
                        좋아요
                      </Button>
                    )} */}

                    {/* <CustomizedDialogs eventDocument={eventDocument} /> */}
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
