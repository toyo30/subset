import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as RouterSwitch,
} from "react-router-dom";
import Appbar from "../components/appbar/Appbar";
import { SimpleBottomNavigation } from "../components/bottomNavigation/BottomNavigation";
import { History } from "../pages/history/History";
import { Login } from "../pages/login/Login";
import { MyZiphap } from "../pages/myZiphap/MyZiphap";
import { OtherZiphap } from "../pages/othersZiphap/OtherZiphap";
import { PathUrl } from "../types/router/pathUrl";
import { AuthenticatedRoute } from "./AuthenticatedRoute";
export const LoginRouter = () => {
  return (
    <>
      <Appbar />
      <BrowserRouter>
        <RouterSwitch>
          <Route path={`${PathUrl.Login}`} element={<Login />} />
          <Route
            path={`${PathUrl.Home}`}
            element={
              <AuthenticatedRoute>
                <MyZiphap userObject={{}} />
              </AuthenticatedRoute>
            }
          />
          <Route
            path={`${PathUrl.Other}`}
            element={<OtherZiphap userObject={{}} />}
          />
          <Route
            path={`${PathUrl.History}`}
            element={<History userObject={{}} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </RouterSwitch>
        <SimpleBottomNavigation />
      </BrowserRouter>
    </>
  );
};
