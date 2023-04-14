import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as RouterSwitch,
} from "react-router-dom";
import Appbar from "../components/appbar/Appbar";
import { Home } from "../pages/Home";
import { Login } from "../pages/login/Login";
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
                <Home userObject={{}} />
              </AuthenticatedRoute>
            }
          />
          {/* 추가 경로를 여기에 작성 */}
          <Route path="*" element={<Navigate to="/" />} />
        </RouterSwitch>
      </BrowserRouter>
    </>
  );
};
