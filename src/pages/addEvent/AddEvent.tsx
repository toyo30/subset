import { Button, TextField, Typography } from "@mui/material";
import { push, ref } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dbRT } from "../../firebase";
import * as S from "./AddEventStyles";

interface Props {
  userObject: any;
}

export const AddEvent: React.FC<Props> = ({ userObject }) => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [eventPlace, setEventPlace] = useState("");
  const [eventTime1, setEventTime1] = useState("");
  const [eventTime2, setEventTime2] = useState("");

  const createEvent = async () => {
    const eventData = {
      name: eventName,
      place: eventPlace,
      time1: eventTime1,
      time2: eventTime2,
    };
    try {
      await push(ref(dbRT, "events"), eventData);
      alert("이벤트가 성공적으로 생성되었습니다.");
      setEventName("");
      setEventPlace("");
      setEventTime1("");
      setEventTime2("");
      navigate("/");
    } catch (error) {
      alert("이벤트 생성에 실패했습니다. 다시 시도해주세요.");
      console.error(error);
    }
  };

  return (
    <S.AddGroupContainer>
      <S.TypographyContainer>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          ZipHap 이벤트 생성
        </Typography>
      </S.TypographyContainer>
      <S.TextFieldContainer>
        <TextField
          type="text"
          placeholder="이벤트 명"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="어디에서"
          value={eventPlace}
          onChange={(e) => setEventPlace(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="언제부터"
          value={eventTime1}
          onChange={(e) => setEventTime1(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="언제까지"
          value={eventTime2}
          onChange={(e) => setEventTime2(e.target.value)}
        />
      </S.TextFieldContainer>
      <S.ButtonContainer>
        <Button onClick={createEvent}>이벤트 생성</Button>
      </S.ButtonContainer>
    </S.AddGroupContainer>
  );
};
