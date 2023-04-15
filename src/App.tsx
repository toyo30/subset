import { onAuthStateChanged } from "firebase/auth";
import { getToken, onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";
import "./App.css";
import * as S from "./AppStyles";
import { authService, messaging } from "./firebase";
import { AuthRouter } from "./router/AuthRouter";
import { MainRouter } from "./router/MainRouter";
import { GlobalStyle } from "./themes/globalStyle";

export const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService, (user: any) => {
      console.log("auth 변경 됨");
      if (user) {
        setIsLoggedIn(true);
        setUserObject(user);
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

  if (!init) {
    return (
      <S.AppContainer className="App">
        <S.LoadingContainer>Loading...!</S.LoadingContainer>
      </S.AppContainer>
    );
  }

  return (
    <S.AppContainer className="App">
      <GlobalStyle />
      {/* <LoginRouter /> */}
      {isLoggedIn ? (
        <MainRouter isLoggedIn={isLoggedIn} userObject={userObject} />
      ) : (
        <AuthRouter />
      )}
    </S.AppContainer>
  );
};

// const a = axios
//   .get("https://jsonplaceholder.typicode.com/posts")
//   .then((response: AxiosResponse) => {
//     // console.log(response.data);
//   })
//   .catch((error) => {
//     // console.log(error);
//   });
