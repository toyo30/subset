import { Button, TextField, Typography } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import * as S from "./AddNameStyles";

interface Props {
  userObject: any;
}

export const AddGroup: React.FC<Props> = ({ userObject }) => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const createGroup = async () => {
    const groupData = {
      name: groupName,
      description: groupDescription,
    };
    try {
      await addDoc(collection(db, "groups"), groupData);
      alert("그룹이 성공적으로 생성되었습니다.");
      setGroupName("");
      setGroupDescription("");
      navigate("/");
    } catch (error) {
      alert("그룹 생성에 실패했습니다. 다시 시도해주세요.");
      console.error(error);
    }
  };

  return (
    <S.AddGroupContainer>
      <S.TypographyContainer>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          ZipHap 그룹 생성
        </Typography>
      </S.TypographyContainer>
      <S.TextFieldContainer>
        <TextField
          type="text"
          placeholder="그룹 이름"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="한줄소개"
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
        />
      </S.TextFieldContainer>
      <S.ButtonContainer>
        <Button onClick={createGroup}>그룹 생성</Button>
      </S.ButtonContainer>
    </S.AddGroupContainer>
  );
};
