import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { firebaseApi } from "../../api/firebase-api";
import { ImageComponent } from "../../components/imgBox/ImgBox";
import { LottieComponent } from "../lottie/Lottie";

interface Props {
  id: string;
  url: string;
  userId: string;
  password: string;
  text: string;
  likeCount: number;
  location: string;
}

export const ImgCard: React.FC<Props> = ({
  id,
  url,
  likeCount,
  text,
  userId,
  password,
  location,
}) => {
  const [like, setLike] = useState<boolean>(false);
  const [lottieStauts, setLottieStatus] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setDeleteModal(true);
    document.body.style.overflowY = "hidden";
  };

  const handleLike = async () => {
    const updatePayload = {
      url,
      userId,
      password,
      text,
      like: likeCount + 1,
      location,
    };

    await firebaseApi.updateData(id, location, updatePayload);

    setLike(true);
    setLottieStatus(true);
    setTimeout(() => {
      setLottieStatus(false);
    }, 1000);
  };

  return (
    <>
      {deleteModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          }}
        >
          <div>test</div>
        </div>
      )}

      <Card sx={{ minWidth: "100vw" }} variant="outlined">
        <CardContent>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                minWidth: "calc(100% - 52px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
              }}
            >
              <SupervisedUserCircleIcon
                style={{
                  width: "42px",
                  height: "42px",
                  marginRight: "8px",
                }}
              />
              <p
                style={{
                  fontSize: "14px",
                }}
              >
                {userId}
              </p>
            </div>
            <div
              style={{
                minWidth: "48px",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MoreHorizSharpIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={logout}>삭제하기</MenuItem>
              </Menu>
            </div>
          </div>
          <div
            style={{
              maxWidth: "430px",
              minWidth: "calc(100vw - 32px)",
              maxHeight: "430px",
              height: "calc(100vw - 32px)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <ImageComponent
              path={url}
              style={{
                objectFit: "cover",
                height: "100%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>

          <div
            style={{
              textAlign: "left",
              marginBottom: "12px",
              position: "relative",
            }}
          >
            {lottieStauts && (
              <LottieComponent
                style={{
                  position: "absolute",
                  top: "-200px",
                  left: "-30px",
                }}
              />
            )}
            {like ? (
              <FavoriteIcon
                onClick={handleLike}
                fill="rgb(255, 48, 64)"
                style={{
                  width: "24px",
                  height: "24px",
                  color: "rgb(255, 48, 64)",
                }}
              />
            ) : (
              <FavoriteBorderIcon
                onClick={handleLike}
                style={{
                  width: "24px",
                  height: "24px",
                }}
              />
            )}
          </div>
          <p
            style={{
              fontSize: "14px",
              textAlign: "left",
              fontWeight: "600",
              marginBottom: "12px",
            }}
          >
            좋아요 {likeCount}개
          </p>
          <Typography variant="body2" textAlign={"left"}>
            <span style={{ fontWeight: "600", marginRight: "6px" }}>
              {userId}
            </span>
            <p style={{ display: "inline" }}>{text}</p>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
