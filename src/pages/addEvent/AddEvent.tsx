import { Button, TextField, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseApi } from "../../api/firebase-api";
import { DateAndTimePicker } from "../../components/dateAndTimePicker/DateAndTimePicker";
import MyContext from "../../contexts/MyContext";
import { PathUrl } from "../../types/router/pathUrl";
import { convertDayjsTostamp } from "../../utils/time/timeFormat";
import * as S from "./AddEventStyles";

export const AddEvent = () => {
  const { selectGroup, userInstance } = useContext(MyContext);
  const date = new Date();
  const today = dayjs(date);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventTimeStart, setEventTimeStart] = useState<Dayjs | null>(today);
  const [eventTimeEnd, setEventTimeEnd] = useState<Dayjs | null>(today);

  //  시간 바꿔주기
  // group name 선택된 이벤트로 바꿔주기

  const createEvent = async () => {
    const eventData = {
      title: eventTitle,
      location: eventLocation,
      timeToStart: eventTimeStart && convertDayjsTostamp(eventTimeStart),
      timeToEnd: eventTimeEnd && convertDayjsTostamp(eventTimeEnd),
      group: selectGroup || userInstance.groups[0],
      attendance: [
        {
          name: userInstance.name,
          timeToStart: eventTimeStart && convertDayjsTostamp(eventTimeStart),
          timeToEnd: eventTimeEnd && convertDayjsTostamp(eventTimeEnd),
        },
      ],
      like: [],
      author: userInstance.name,
    };

    try {
      if (eventTimeStart?.isAfter(eventTimeEnd)) {
        alert("시작 시간이 종료 시간보다 늦습니다. 다시 시간을 설정해주세요");
        return;
      }

      await firebaseApi.createData("Events", eventData);
      alert("이벤트가 성공적으로 되었습니다.");
      setEventTitle("");
      setEventLocation("");
      setEventTimeStart(today);
      setEventTimeEnd(today);
      navigate(`${PathUrl.MyZiphap}`);
    } catch (error) {
      alert("이벤트 생성에 실패했습니다. 다시 시도해주세요.");
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("eventTimeStart", eventTimeStart);
  }, [eventTimeStart]);

  return (
    <S.AddGroupContainer>
      <S.TypographyContainer>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          {selectGroup || userInstance.groups[0]} 이벤트 생성
        </Typography>
      </S.TypographyContainer>
      <S.TextFieldContainer>
        <TextField
          type="text"
          placeholder="이벤트 명"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="어디에서"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
        />
        {/* <TextField
          type="text"
          placeholder="언제부터"
          value={eventTimeStart}
          onChange={(e) => setEventTimeStart(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="언제까지"
          value={eventTimeEnd}
          onChange={(e) => setEventTimeEnd(e.target.value)}
        /> */}
        <DateAndTimePicker
          onChange={(e) => setEventTimeStart(e)}
          defaultDay={today}
        />
        <DateAndTimePicker
          onChange={(e) => setEventTimeEnd(e)}
          defaultDay={today}
        />
      </S.TextFieldContainer>
      <S.ButtonContainer>
        <Button onClick={createEvent}>이벤트 생성</Button>
      </S.ButtonContainer>
    </S.AddGroupContainer>
  );
};
