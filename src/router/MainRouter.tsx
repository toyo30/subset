import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { firebaseApi } from "../api/firebase-api";
import Appbar from "../components/appbar/Appbar";
import { SimpleBottomNavigation } from "../components/bottomNavigation/BottomNavigation";
import MyContext from "../contexts/MyContext";
import { db } from "../firebase";
import { AddEvent } from "../pages/addEvent/AddEvent";
import { AddGroup } from "../pages/addGroup/AddGroup";
import { AddName } from "../pages/addName/AddName";
import { History } from "../pages/history/History";
import { MyZiphap } from "../pages/myZiphap/MyZiphap";
import { OtherZiphap } from "../pages/otherZiphap/OtherZiphap";
import { PathUrl } from "../types/router/pathUrl";

export const MainRouter = () => {
  const { userInstance, setUserInstance, setGroups, hasUser, setHasUser } =
    useContext(MyContext);

  const readUserDataWithCondition = async () => {
    const q = query(
      collection(db, "Users"),
      where("uid", "==", userInstance.uid)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setHasUser(false);
    } else {
      querySnapshot.forEach((doc) => {
        setUserInstance({
          ...userInstance,
          name: doc.data().name,
          groups: doc.data().groups,
        });
      });
      setHasUser(true);
    }
  };

  const readGroupData = async () => {
    const response = await firebaseApi.readData("groups");
    const resonseArray: string[] = [];
    response.forEach((doc) => {
      resonseArray.push(doc.data().name);
    });
    setGroups([...resonseArray]);
  };

  useEffect(() => {
    readUserDataWithCondition();
    readGroupData();
  }, []);

  return (
    <>
      {hasUser ? (
        <BrowserRouter>
          <Appbar />
          <Routes>
            <Route path={`${PathUrl.MyZiphap}`} element={<MyZiphap />} />
            <Route path={`${PathUrl.Other}`} element={<OtherZiphap />} />
            <Route path={`${PathUrl.History}`} element={<History />} />
            <Route path={`${PathUrl.AddGroup}`} element={<AddGroup />} />
            <Route path={`${PathUrl.AddEvent}`} element={<AddEvent />} />
            <Route path="*" element={<Navigate to={`${PathUrl.MyZiphap}`} />} />
          </Routes>
          <SimpleBottomNavigation />
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Appbar />
          <Routes>
            <Route path={`${PathUrl.AddName}`} element={<AddName />} />
            <Route path={`${PathUrl.AddGroup}`} element={<AddGroup />} />
            <Route path="*" element={<Navigate to={`${PathUrl.AddName}`} />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};
