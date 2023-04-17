import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login/Login";
import { PathUrl } from "../types/router/pathUrl";

export const AuthRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={`${PathUrl.Login}`} element={<Login />} />
          <Route path="*" element={<Navigate to={`${PathUrl.Login}`} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
