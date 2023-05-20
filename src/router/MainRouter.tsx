import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Appbar from "../components/appbar/Appbar";
import { SimpleBottomNavigation } from "../components/bottomNavigation/BottomNavigation";
import { AddFestival } from "../pages/addFestival/AddFestival";
import { Comment } from "../pages/comment/Comment";
import { Map } from "../pages/map/Map";
import { PathUrl } from "../types/router/pathUrl";

export const MainRouter = () => {
  return (
    <>
      <BrowserRouter>
        <>
          <Appbar />
          <Routes>
            {/* <Route path={`${PathUrl.MyZiphap}`} element={<MyZiphap />} />
              <Route path={`${PathUrl.Other}`} element={<OtherZiphap />} />
              <Route path={`${PathUrl.History}`} element={<History />} />
              <Route path={`${PathUrl.AddGroup}`} element={<AddGroup />} />
              <Route path={`${PathUrl.AddEvent}`} element={<AddEvent />} /> */}
            <Route path={`${PathUrl.AddFestival}`} element={<AddFestival />} />
            <Route path={`${PathUrl.Home}`} element={<Map />} />
            <Route path={`${PathUrl.Bar}`} element={<Map />} />
            <Route path={`${PathUrl.Comment}`} element={<Comment />} />
            <Route path="*" element={<Navigate to={`${PathUrl.MyZiphap}`} />} />
          </Routes>
          <SimpleBottomNavigation />
        </>
      </BrowserRouter>
    </>
  );
};
