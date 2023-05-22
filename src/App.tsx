import { Snackbar } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import "./App.css";
import * as S from "./AppStyles";
import MyContext from "./contexts/MyContext";
import MyContextProvider from "./contexts/MyContextProvider";
import { authService } from "./firebase";
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
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    body: "",
  });

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // const requestNotificationPermissionAndGetToken = async () => {
  //   if (
  //     Notification.permission === "default" ||
  //     Notification.permission === "denied"
  //   ) {
  //     try {
  //       const permission = await Notification.requestPermission();
  //       if (permission === "granted") {
  //         console.log("Notification permission granted.");
  //       } else {
  //         console.log("Notification permission denied.");
  //         return;
  //       }
  //     } catch (error) {
  //       console.error("Error requesting notification permission:", error);
  //       return;
  //     }
  //   } else if (Notification.permission === "granted") {
  //     console.log("Notification permission already granted.");
  //   }

  //   // Get FCM token
  //   try {
  //     const token = await getToken(messaging, {
  //       vapidKey:
  //         "BILnzoSfp_R5AqlOq_E0cVaPrymPxneIPe9uMtoSInnzsUh9J1oigJEWkMGBVynpEdnk4UKFYhytqS19q-KvA40",
  //     });
  //     console.log("FCM Token:", token);
  //     // 여기서도 fcm 토큰 관련, db 생성해서 추가해주기
  //     setUserInstance({
  //       ...userInstance,
  //       fcmToken: token,
  //     });
  //   } catch (err) {
  //     console.error("Failed to get FCM token:", err);
  //   }

  //   // Handle incoming messages
  //   onMessage(messaging, (payload) => {
  //     console.log("Message received. ", payload);

  //     setMessage({
  //       title: payload.notification?.title || "",
  //       body: payload.notification?.body || "",
  //     });

  //     setOpen(true);
  //     // setMessage(payload?.body.);
  //     // ...
  //   });
  // };

  useEffect(() => {
    // const handleForegroundMessage = async () => {
    //   try {
    //     await requestPermission(messaging);
    //     console.log("Notification permission granted.");
    //   } catch (error) {
    //     console.log("Unable to get permission to notify.", error);
    //   }
    //   onMessage(messaging, (payload) => {
    //     console.log("Message received in foreground:", payload);
    //     // 메시지를 처리하는 로직을 추가하세요.
    //   });
    // };
    // handleForegroundMessage();

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

    // requestNotificationPermissionAndGetToken();
    // // Get the FCM token and log it to the console
    // getToken(messaging, {
    //   vapidKey:
    //     "BILnzoSfp_R5AqlOq_E0cVaPrymPxneIPe9uMtoSInnzsUh9J1oigJEWkMGBVynpEdnk4UKFYhytqS19q-KvA40",
    // })
    //   .then((token) => {
    //     console.log("FCM Token:", token);
    //     //여기서도 fcm 토큰 관련, db 생성해서 추가해주기
    //     setUserInstance({
    //       ...userInstance,
    //       fcmToken: token,
    //     });
    //   })
    //   .catch((err) => {
    //     console.error("Failed to get FCM token:", err);
    //   });

    // // Handle incoming messages
    // onMessage(messaging, (payload) => {
    //   console.log("Message received. ", payload);
    //   // ...
    // });

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
              src={process.env.PUBLIC_URL + "/assets/marker/Zola.png"}
              alt="loading"
              style={{
                maxWidth: "300px",
                maxHeight: "180px",
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
        <MainRouter />
        <S.ScrollContainer />
      </ThemeProvider>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        title={message.title}
        message={message.body}
      />
    </S.AppContainer>
  );
};
