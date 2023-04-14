import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as RouterSwitch,
} from "react-router-dom";
import Appbar from "../components/appbar/Appbar";
import { Login } from "../pages/login/Login";
import { MyZiphap } from "../pages/myZiphap/MyZiphap";
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
            <Route
              path={`${PathUrl.Home}`}
              element={
                <AuthenticatedRoute>
                  <MyZiphap userObject={userObject} />
                </AuthenticatedRoute>
              }
            />
          ) : (
            <Route path={`${PathUrl.Login}`} element={<Login />} />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </RouterSwitch>
      </BrowserRouter>
    </>
  );
};
