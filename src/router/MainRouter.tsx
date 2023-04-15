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

interface Props {
  isLoggedIn: boolean;
  userObject: any;
}

export const MainRouter: React.FC<Props> = ({ isLoggedIn, userObject }) => {
  return (
    <>
      <BrowserRouter>
        <Appbar />
        <RouterSwitch>
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
            element={<AddGroup userObject={userObject} />}
          />
          <Route
            path={`${PathUrl.AddEvent}`}
            element={<AddEvent userObject={userObject} />}
          />
          <Route path="*" element={<Navigate to={`${PathUrl.MyZiphap}`} />} />
        </RouterSwitch>
        <SimpleBottomNavigation />
      </BrowserRouter>
    </>
  );
};
