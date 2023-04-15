import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as RouterSwitch,
} from "react-router-dom";
import Appbar from "../components/appbar/Appbar";
import { SimpleBottomNavigation } from "../components/bottomNavigation/BottomNavigation";
import { AddEvent } from "../pages/addEvent/AddEvent";
import { AddGroup } from "../pages/addGroup/AddGroup";
import { History } from "../pages/history/History";
import { MyZiphap } from "../pages/myZiphap/MyZiphap";
import { OtherZiphap } from "../pages/otherZiphap/OtherZiphap";
import { PathUrl } from "../types/router/pathUrl";

export const SetUserRouter = () => {
  //여기서 db를 불러오고, db가 있을 때, context provider를 세팅해준다.
  //db가 있으면 아래의 코드를 실행하고, 없으면 user 이름과 데이터를 생성하는 페이지로 이동시킨다.

  return (
    <>
      <BrowserRouter>
        <Appbar />
        <RouterSwitch>
          <Route path={`${PathUrl.MyZiphap}`} element={<MyZiphap />} />
          <Route path={`${PathUrl.Other}`} element={<OtherZiphap />} />
          <Route path={`${PathUrl.History}`} element={<History />} />
          <Route path={`${PathUrl.AddGroup}`} element={<AddGroup />} />
          <Route path={`${PathUrl.AddEvent}`} element={<AddEvent />} />
          <Route path="*" element={<Navigate to={`${PathUrl.MyZiphap}`} />} />
        </RouterSwitch>
        <SimpleBottomNavigation />
      </BrowserRouter>
    </>
  );
};
