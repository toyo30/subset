import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { authService } from "../../firebase";
import * as S from "./LogoutStyles";

interface Props {
  userObject: any;
}

export const Logout: React.FC<Props> = ({ userObject }) => {
  function handleLogout() {
    signOut(authService)
      .then(() => {
        console.log("로그아웃 성공"); // 여기서 필요한 경우 추가 처리를 수행하세요
      })
      .catch((error) => {
        console.error("로그아웃 실패: ", error);
      });
  }
  return (
    <S.LoginButtonContainer>
      {" "}
      {/* 다른 UI 요소 */}
      <Button onClick={handleLogout}>로그아웃</Button>
    </S.LoginButtonContainer>
  );
};
