import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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
import { useNavigate } from "react-router-dom";
import { firebaseApi } from "../../api/firebase-api";
import { CustomizedDialogs } from "../../components/dialog/dialog";
import { db } from "../../firebase";
import {
  backgroundColors,
  getRandomColor,
  shuffleArray,
} from "../../utils/color/randomColor";
import {
  convertTimestampToDate,
  formatConvertTimestampToDate,
  isItValidTimeArrange,
} from "../../utils/time/timeFormat";

export const MyZiphap = () => {
  const navigate = useNavigate();
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
          if (
            isItValidTimeArrange(doc.data().timeToStart, doc.data().timeToEnd)
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

  const navigateToAddGroup = () => {
    navigate("/add-group");
    // navigate(`${PathUrl.AddGroup}`);
  };

  return (
    <>
      <S.MyZiphapContainer>
        <BasicSelect
          selectOptions={userInstance.groups}
          setSelectGroup={onChange}
        />
        <Button
          startIcon={<AddCircleOutlineIcon />}
          onClick={navigateToAddGroup}
        >
          집합 만들기
        </Button>
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
                                fontSize: "16px",
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

                    <Typography variant="body2">
                      {"시작: "}
                      {convertTimestampToDate(eventDocument.timeToStart)}
                      <br />
                      {"종료: "}
                      {convertTimestampToDate(eventDocument.timeToEnd)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {eventDocument.attendance.filter(
                      (attendance: any) => attendance.name === userInstance.name
                    ).length === 0 ? (
                      <CustomizedDialogs eventDocument={eventDocument} />
                    ) : (
                      <Button
                        size="small"
                        onClick={async () => {
                          const response = await firebaseApi.updateData(
                            eventDocument.id,
                            "Events",
                            {
                              attendance: eventDocument.attendance.filter(
                                (attendance: any) =>
                                  attendance.name !== userInstance.name
                              ),
                            }
                          );
                          alert("이벤트에서 나왔습니다.");
                        }}
                      >
                        나오기
                      </Button>
                    )}
                    <Button
                      onClick={async () => {
                        const currentURL = window.location.href;
                        const text = `[${selectGroup}] 집합에서 만든 초대되었습니다. ${currentURL}  이 링크를 통해 회원가입 후 이벤트에 참여해보세요  집합소개: https://minhazinayoung.notion.site/_0418-e2448767efa94b1a973c300b98331ced`;
                        try {
                          // navigator.clipboard API를 사용하여 클립보드에 텍스트 복사
                          await navigator.clipboard.writeText(text);
                          console.log("URL copied to clipboard:", text);
                        } catch (err) {
                          // 에러 발생 시
                          console.error("Error copying URL to clipboard:", err);
                        }
                        alert("초대 링크가 복사되었습니다.");
                      }}
                    >
                      공유하기
                    </Button>
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
