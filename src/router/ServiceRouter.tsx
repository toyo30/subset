import { BrowserRouter, Route, Routes as RouterSwitch } from "react-router-dom";
import { Login } from "../pages/login/Login";
import { MyZiphap } from "../pages/myZiphap/MyZiphap";

interface Props {
  userObject: any;
}

export const ServiceRouter: React.FC<Props> = ({ userObject }) => {
  return (
    <>
      <BrowserRouter>
        <RouterSwitch>
          <Route element={<MyZiphap userObject={userObject} />} />
          <Route element={<Login />} />
          {/* <SimpleBottomNavigation /> */}
        </RouterSwitch>
      </BrowserRouter>
    </>
  );
};
