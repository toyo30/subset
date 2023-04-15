import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestoreIcon from "@mui/icons-material/Restore";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./BottomNavigationStyles";

export const SimpleBottomNavigation = () => {
  const [value, setValue] = React.useState("myZiphap");
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log("handleChange", newValue);
    setValue(newValue);
    navigate(`/${newValue}`);
  };

  //   const handleNavigateHomeClick = (e: HTMLButtonElement) => {
  //     // 로그인 처리를 수행한 후
  //     navigate("/");
  //   };

  //   const handleNavigateHistoryClick = (e: HTMLButtonElement) => {
  //     // 로그인 처리를 수행한 후
  //     navigate("/history");
  //   };

  //   const handleNavigateOthersClick = (e: HTMLButtonElement) => {
  //     // 로그인 처리를 수행한 후
  //     navigate("/others");
  //   };

  return (
    <S.BottomNavigationContainer>
      <Box>
        <BottomNavigation showLabels value={value} onChange={handleChange}>
          <BottomNavigationAction
            label="History"
            value="history"
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            label="내집합"
            value="myZiphap"
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            label="외집합"
            value="others"
            icon={<LocationOnIcon />}
          />
        </BottomNavigation>
      </Box>
    </S.BottomNavigationContainer>
  );
};
