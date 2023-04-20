import { ThemeProvider } from "@mui/material/styles";
import { onAuthStateChanged } from "firebase/auth";
import { getToken, onMessage } from "firebase/messaging";
import { useContext, useEffect, useState } from "react";
import "./App.css";
import * as S from "./AppStyles";
import MyContext from "./contexts/MyContext";
import MyContextProvider from "./contexts/MyContextProvider";
import { authService, messaging } from "./firebase";
import { AuthRouter } from "./router/AuthRouter";
import { MainRouter } from "./router/MainRouter";
import { GlobalStyle } from "./themes/globalStyle";
import theme from "./themes/theme";

export const App = () => {
  return (
    <MyContextProvider>
      <AppContent />
    </MyContextProvider>
  );
};

const AppContent = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState(null);
  const { userInstance, setUserInstance, value, setValue } =
    useContext(MyContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService, (user: any) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObject(user);
        setUserInstance((prevState) => ({
          ...prevState,
          uid: user.uid,
          email: user.email,
        }));
      } else {
        setIsLoggedIn(false);
        setUserObject(null);
      }

      setInit(true);
    });

    // Get the FCM token and log it to the console
    getToken(messaging, {
      vapidKey:
        "BILnzoSfp_R5AqlOq_E0cVaPrymPxneIPe9uMtoSInnzsUh9J1oigJEWkMGBVynpEdnk4UKFYhytqS19q-KvA40",
    })
      .then((token) => {
        console.log("FCM Token:", token);
        //여기서도 fcm 토큰 관련, db 생성해서 추가해주기
        setUserInstance({
          ...userInstance,
          fcmToken: token,
        });
      })
      .catch((err) => {
        console.error("Failed to get FCM token:", err);
      });

    // Handle incoming messages
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      // ...
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // const appHeight = () => {
  //   const doc = document.documentElement;
  //   doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  // };

  // useEffect(() => {
  //   window.addEventListener("resize", appHeight);

  //   return () => {
  //     window.removeEventListener("resize", appHeight);
  //   };
  // }, []);

  if (!init) {
    return (
      <S.AppContainer className="App">
        <ThemeProvider theme={theme}>
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
          <S.ScrollContainer />
        </ThemeProvider>
      </S.AppContainer>
    );
  }

  return (
    <S.AppContainer className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        {isLoggedIn ? <MainRouter /> : <AuthRouter />}
        <S.ScrollContainer />
      </ThemeProvider>
    </S.AppContainer>
  );
};
