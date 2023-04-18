import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestoreIcon from "@mui/icons-material/Restore";
import { Fab } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { PathUrl } from "../../types/router/pathUrl";
import * as S from "./BottomNavigationStyles";
export const SimpleBottomNavigation = () => {
  const [value, setValue] = React.useState("");
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(`/${newValue}`);
  };

  const handleClick = () => {
    navigate(`${PathUrl.AddEvent}`);
  };

  return (
    <S.BottomNavigationContainer>
      <Box>
        <BottomNavigation showLabels value={value} onChange={handleChange}>
          <BottomNavigationAction
            label="History"
            // value={`${PathUrl.History.slice(1)}`}
            value="history"
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            label="내집합"
            value=""
            // value={`${PathUrl.MyZiphap.slice(1)}`}
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            label="외집합"
            // value={`${PathUrl.Other.slice(1)}`}
            value="other"
            icon={<LocationOnIcon />}
          />
        </BottomNavigation>
      </Box>
      <Fab color="primary" aria-label="add" sx={fabStyle} onClick={handleClick}>
        <AddIcon />
      </Fab>
    </S.BottomNavigationContainer>
  );
};

const fabStyle = {
  position: "absolute",
  bottom: "calc(70px + env(safe-area-inset-bottom))",
  right: 16,
};
