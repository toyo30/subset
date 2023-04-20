import GoogleIcon from "@mui/icons-material/Google";
import { Button, TextField, Typography } from "@mui/material";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../firebase";
import { getKoreanErrorMessage } from "../../utils/error/error";
import * as S from "./LoginStyles";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string>("");
  const [authCheck, setAuthCheck] = useState("로그인");
  const [error, setError] = useState<string>("");

  const handleGoogleAuthEvent = async () => {
    // 구글 로그인 provider
    const provider = new GoogleAuthProvider();
    // 팝업 띄우기
    try {
      await signInWithPopup(authService, provider);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const onChange = (event: any) => {
    const {
      target: { type, value },
    } = event;
    if (type === "email") {
      setEmail(value);
    } else if (type === "password") {
      setPassword(value);
    }
  };
  const handleAuthEvent = async (event: any) => {
    event.preventDefault();
    console.log(email, password, "email, password");
    try {
      if (authCheck === "로그인") {
        const response = await signInWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else if (authCheck === "회원가입") {
        await createUserWithEmailAndPassword(authService, email, password);
      }
    } catch (error: any) {
      setError(getKoreanErrorMessage(error.code));
      console.log(error);
    } finally {
    }
  };
  const toggleAuth = () => {
    setAuthCheck((prev) => (prev === "로그인" ? "회원가입" : "로그인"));
    setError("");
  };
  return (
    <S.LoginContainer>
      <S.TypographyContainer>
        <img
          src={process.env.PUBLIC_URL + "/signup.png"}
          style={{
            maxWidth: "300px",
            width: "100%",
          }}
        />
      </S.TypographyContainer>

      <S.TextFieldContainer>
        <TextField
          id="standard-required"
          type="email"
          name="email"
          label="이메일"
          variant="standard"
          onChange={onChange}
        />
        <TextField
          id="standard-password-input"
          label="비밀번호"
          type="password"
          name="password"
          autoComplete="current-password"
          variant="standard"
          onChange={onChange}
        />
      </S.TextFieldContainer>

      {error && <Typography>{error}</Typography>}
      <S.LoginButtonContainer>
        <Button
          variant="contained"
          onClick={handleAuthEvent}
          size="large"
          sx={{ minWidth: "280px" }}
        >
          {authCheck === "로그인" ? "로그인" : "회원가입"}
        </Button>
      </S.LoginButtonContainer>

      <S.SocialButtonContainer>
        <S.GoogleButton onClick={handleGoogleAuthEvent}>
          <GoogleIcon />
          <span>구글로 3초만에 시작하기</span>
        </S.GoogleButton>
      </S.SocialButtonContainer>

      <Button
        variant="outlined"
        onClick={toggleAuth}
        sx={{ minWidth: "280px" }}
      >
        {authCheck === "로그인" ? "회원가입" : "로그인"}
      </Button>
    </S.LoginContainer>
  );
};
