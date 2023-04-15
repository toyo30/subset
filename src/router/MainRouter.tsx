import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Appbar from "../components/appbar/Appbar";
import { SimpleBottomNavigation } from "../components/bottomNavigation/BottomNavigation";
import MyContext from "../contexts/MyContext";
import { db } from "../firebase";
import { AddEvent } from "../pages/addEvent/AddEvent";
import { AddGroup } from "../pages/addGroup/AddGroup";
import { History } from "../pages/history/History";
import { MyZiphap } from "../pages/myZiphap/MyZiphap";
import { OtherZiphap } from "../pages/otherZiphap/OtherZiphap";
import { PathUrl } from "../types/router/pathUrl";

export const MainRouter = () => {
  const [hasUser, setHasUser] = useState(false);
  const { userInstance, setUserInstance, setValue } = useContext(MyContext);

  const readUserData = async () => {
    const querySnapshot = await getDocs(collection(db, "Users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      console.log(`${doc.id} => ${doc.data().name}`);
    });
    console.log(querySnapshot, "querySnapshot 1");
  };

  const readDataWithCondition = async () => {
    const q = query(
      collection(db, "Users"),
      where("uid", "==", userInstance.uid)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setHasUser(false);
    } else {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        setUserInstance({
          ...userInstance,
          name: doc.data().name,
          groups: doc.data().groups,
        });
      });
      setHasUser(true);
    }
  };

  useEffect(() => {
    readUserData();
    readDataWithCondition();
  }, []);

  //여기서 db를 불러오고, db가 있을 때, context provider를 세팅해준다.
  //일단 db 불러오기를 해보자.

  //db가 있으면 아래의 코드를 실행하고, 없으면 user 이름과 데이터를 생성하는 페이지로 이동시킨다.

  return (
    <>
      {hasUser ? (
        <BrowserRouter>
          <Appbar />
          <Routes>
            <Route
              path={`${PathUrl.MyZiphap}`}
              element={<MyZiphap userObject={{}} />}
            />
            <Route
              path={`${PathUrl.Other}`}
              element={<OtherZiphap userObject={{}} />}
            />
            <Route
              path={`${PathUrl.History}`}
              element={<History userObject={{}} />}
            />
            <Route
              path={`${PathUrl.AddGroup}`}
              element={<AddGroup userObject={{}} />}
            />
            <Route
              path={`${PathUrl.AddEvent}`}
              element={<AddEvent userObject={{}} />}
            />
            <Route path="*" element={<Navigate to={`${PathUrl.MyZiphap}`} />} />
          </Routes>
          <SimpleBottomNavigation />
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Appbar />
          <Routes>
            <Route
              path={`${PathUrl.AddGroup}`}
              element={<AddGroup userObject={{}} />}
            />
            <Route path="*" element={<Navigate to={`${PathUrl.AddGroup}`} />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};
