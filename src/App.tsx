import { onAuthStateChanged } from "firebase/auth";
import { getToken, onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";
import "./App.css";
import * as S from "./AppStyles";
import { authService, messaging } from "./firebase";
import { AppRouter } from "./router/authRouter";
import { GlobalStyle } from "./themes/globalStyle";

export const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState(null);
  // const a = axios
  //   .get("https://jsonplaceholder.typicode.com/posts")
  //   .then((response: AxiosResponse) => {
  //     // console.log(response.data);
  //   })
  //   .catch((error) => {
  //     // console.log(error);
  //   });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService, (user: any) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObject(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);

      return () => {
        unsubscribe();
      };
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
  }, []);

  return (
    <S.AppContainer className="App">
      <GlobalStyle />
      {/* <LoginRouter /> */}
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObject={userObject} />
      ) : (
        // <LoginRouter />
        "loding"
      )}
    </S.AppContainer>
  );
};
