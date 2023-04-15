import { Button, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../../contexts/MyContext";
import { PathUrl } from "../../types/router/pathUrl";
import * as S from "./AddNameStyles";

export const AddName = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const { userInstance, setUserInstance, hasUser } = useContext(MyContext);

  const backNavigation = () => {
    navigate(-1);
  };

  const nextNavigation = () => {
    navigate(`${PathUrl.AddGroup}`);
  };

  if (hasUser) {
    navigate(`${PathUrl.MyZiphap}`);
  }

  return (
    <S.AddGroupContainer>
      <S.TypographyContainer>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          ZipHap 이름
        </Typography>
        <Typography variant="subtitle2" component="div" sx={{ flexGrow: 1 }}>
          이름을 적어주세요
        </Typography>
      </S.TypographyContainer>
      <S.TextFieldContainer>
        <TextField
          type="text"
          placeholder="사용자 이름"
          value={userInstance.name}
          onChange={(e) =>
            setUserInstance({
              ...userInstance,
              name: e.target.value,
            })
          }
        />
      </S.TextFieldContainer>
      <S.ButtonContainer>
        <Button onClick={backNavigation}>뒤로</Button>
        <Button onClick={nextNavigation}>다음으로</Button>
      </S.ButtonContainer>
    </S.AddGroupContainer>
  );
};
