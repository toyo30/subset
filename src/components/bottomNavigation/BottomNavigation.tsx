import FavoriteIcon from "@mui/icons-material/Favorite";
import Map from "@mui/icons-material/Map";
import { Fab, Typography } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import * as React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PathUrl } from "../../types/router/pathUrl";
import * as S from "./BottomNavigationStyles";

export const SimpleBottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname.slice(1));

  // console.log(location.pathname);

  // useEffect(() => {
  //   setValue(location.pathname);
  // }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(`/${newValue}`);
  };

  const handleClick = () => {
    navigate(`${PathUrl.AddFestival}`);
  };

  return (
    <S.BottomNavigationContainer>
      <Box>
        <BottomNavigation
          defaultValue={value}
          value={value}
          onChange={handleChange}
          showLabels={true}
        >
          {/* <button
            onClick={async (e) => {
              await fcmApi.sendMessage({
                message: `test이
                  test
               이벤트를 생성했습니다.`,
                tokens: ["fcmToken"],
              });
            }}
          >
            fcm butotn
          </button> */}
          {/* <BottomNavigationAction
            label="History"
            // value={`${PathUrl.History.slice(1)}`}
            value="history"
            icon={<RestoreIcon />}
          /> */}
          <BottomNavigationAction
            label="피드"
            value={`${PathUrl.Comment.slice(1)}`}
            // value={`${PathUrl.MyZiphap.slice(1)}`}
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            label="지도"
            value=""
            // value={`${PathUrl.MyZiphap.slice(1)}`}
            icon={<Map />}
          />
          {/* <BottomNavigationAction
            label="외집합"
            // value={`${PathUrl.Other.slice(1)}`}
            value="other"
            icon={<LocationOnIcon />}
          /> */}
          {/* <BottomNavigationAction
            label="주점 지도"
            // value={`${PathUrl.Other.slice(1)}`}
            value={`${PathUrl.Bar.slice(1)}`}
            icon={<LocationOnIcon />}
          /> */}
        </BottomNavigation>
      </Box>

      {location.pathname !== PathUrl.AddFestival && (
        <Fab
          color="primary"
          aria-label="add"
          sx={fabStyle}
          onClick={handleClick}
        >
          <Typography sx={textStyle}>
            <img
              src={process.env.PUBLIC_URL + "/fab.png"}
              style={{
                width: "80px",
              }}
            />
            {/* <AddIcon /> */}
          </Typography>
        </Fab>
      )}
    </S.BottomNavigationContainer>
  );
};

const fabStyle = {
  position: "absolute",
  bottom: "calc(70px + env(safe-area-inset-bottom))",
  right: 16,
  fontSize: "16px",
  width: "70px",
  height: "70px",
};

const textStyle = {
  // position: "absolute",
  // bottom: "calc(110px + env(safe-area-inset-bottom))",
  // right: 16,
  // background: `${theme.palette.primary.main}`,
  // color: "white",
  // padding: "10px",
  // borderRadius: "10px",
  fontSize: "13px",
  display: "flex",
  alignItems: "center",
  fontWeight: "600",
};
