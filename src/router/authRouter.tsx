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
import { Login } from "../pages/login/Login";
import { Logout } from "../pages/logout/Logout";
import { MyZiphap } from "../pages/myZiphap/MyZiphap";
import { OtherZiphap } from "../pages/othersZiphap/OtherZiphap";
import { PathUrl } from "../types/router/pathUrl";
import { AuthenticatedRoute } from "./AuthenticatedRoute";

interface Props {
  isLoggedIn: boolean;
  userObject: any;
}

export const AppRouter: React.FC<Props> = ({ isLoggedIn, userObject }) => {
  return (
    <>
      <Appbar />
      <BrowserRouter>
        <RouterSwitch>
          {isLoggedIn ? (
            <>
              <Route
                path={`${PathUrl.Home}`}
                element={
                  <AuthenticatedRoute>
                    <MyZiphap userObject={userObject} />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path={`${PathUrl.AddGroup}`}
                element={
                  <AuthenticatedRoute>
                    <AddGroup userObject={userObject} />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path={`${PathUrl.AddEvent}`}
                element={
                  <AuthenticatedRoute>
                    <AddEvent userObject={userObject} />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path={`${PathUrl.Logout}`}
                element={
                  <AuthenticatedRoute>
                    <Logout userObject={userObject} />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path={`${PathUrl.Other}`}
                element={
                  <AuthenticatedRoute>
                    <OtherZiphap userObject={userObject} />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path={`${PathUrl.History}`}
                element={
                  <AuthenticatedRoute>
                    <History userObject={userObject} />
                  </AuthenticatedRoute>
                }
              />
            </>
          ) : (
            <Route path={`${PathUrl.Login}`} element={<Login />} />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </RouterSwitch>
        <SimpleBottomNavigation />
      </BrowserRouter>
    </>
  );
};
