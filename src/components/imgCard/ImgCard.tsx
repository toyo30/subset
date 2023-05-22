import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Timestamp } from "firebase/firestore";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { firebaseApi } from "../../api/firebase-api";
import { ImageComponent } from "../../components/imgBox/ImgBox";
import { bar_pins, pins } from "../../constant/pins";
import { getTimeDiff } from "../../utils/time/timeFormat";
import { LottieComponent } from "../lottie/Lottie";

interface Props {
  id: string;
  url: string;
  userId: string;
  password: string;
  text: string;
  likeCount: number;
  location: string;
  time: Timestamp;
}

export const ImgCard: React.FC<Props> = ({
  id,
  url,
  likeCount,
  text,
  userId,
  password,
  location,
  time,
}) => {
  const [like, setLike] = useState<boolean>(false);
  const [lottieStauts, setLottieStatus] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const modalRef = useRef<any>(null);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const result = { ...pins, ...bar_pins };

  const list = [
    `${process.env.PUBLIC_URL}/peope_white.png`,
    `${process.env.PUBLIC_URL}/tiger.png`,
    `${process.env.PUBLIC_URL}/bottle.png`,
  ];

  const randomIndex = Math.floor(Math.random() * list.length);

  const randomItem = list[randomIndex];

  const [profile, setProfile] = useState(randomItem);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    handleClose();
    setDeleteModal(true);
  };

  const closeModalFunction = () => {
    setDeleteModal(false);
  };

  const deletePost = async () => {
    if (confirmPassword === password) {
      await firebaseApi.deleteData(id, "Post");
      closeModalFunction();
      alert("삭제되었습니다.");
    } else {
      alert("비밀번호를 다시 입력해주세요");
    }
  };

  const closeModal = (e: TouchEvent) => {
    e.stopPropagation();
    if (
      e.target === modalRef.current ||
      modalRef.current?.contains(e.target as Node)
    ) {
      return;
    } else {
      setDeleteModal(false);
    }
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

    await firebaseApi.updateData(id, "Post", updatePayload);

    setLike(true);
    setLottieStatus(true);
    setTimeout(() => {
      setLottieStatus(false);
    }, 1000);
  };

  useEffect(() => {
    window.addEventListener("touchstart", closeModal);
    window.addEventListener("touchmove", closeModal);
    window.addEventListener("touchend", closeModal);

    return () => {
      window.removeEventListener("touchstart", closeModal);
      window.removeEventListener("touchmove", closeModal);
      window.removeEventListener("touchend", closeModal);
    };
  }, []);

  return (
    <>
      {deleteModal && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            backgroundColor: "#4949491B",
            zIndex: 1000,
            top: 0,
            left: 0,
          }}
        >
          <div
            ref={modalRef}
            style={{
              position: "fixed",
              top: "30%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              background: "white",
              minWidth: "80%",
              height: "300px",
              border: "1px solid black",
              borderRadius: "20px",
              padding: "30px 0",
            }}
          >
            <h2
              style={{
                color: "#EF3A4A",
                padding: "10px 0",
                marginBottom: "30px",
              }}
            >
              "게시글"의 비밀번호를 입력해주세요.
            </h2>
            <div
              style={{
                padding: "0 20px",
              }}
            >
              <TextField
                id="standard-required"
                required
                label="비번"
                color="primary"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  marginBottom: "20px",
                }}
              />
            </div>
            <Button variant="contained" onClick={deletePost}>
              삭제하기
            </Button>
            <span
              style={{
                display: "inline-block",
                width: "15px",
              }}
            ></span>
            <Button variant="outlined" onClick={closeModalFunction}>
              취소하기
            </Button>
          </div>
        </div>
      )}

      <Card sx={{ minWidth: "100vw" }} variant="outlined">
        <CardContent>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                minWidth: "unset",
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
              }}
            >
              <div
                style={{
                  minWidth: "42px",
                  height: "42px",
                  marginRight: "8px",
                  borderRadius: "30px",
                  background: "black",
                  position: "relative",
                  // border: "1px solid black",
                }}
              >
                <img
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "41px",
                    height: "41px",
                    borderRadius: "30px",
                  }}
                  src={profile}
                />
              </div>
              <p
                style={{
                  fontSize: "14px",
                }}
              >
                {userId}
              </p>
            </div>
            <p
              style={{
                fontSize: "14px",
                textAlign: "left",
                color: "gray",
              }}
            >
              {`${result[location].name}`}
            </p>
          </div>
          <div
            style={{
              minWidth: "calc(100vw - 32px)",
              height: "calc(100vw - 32px)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <ImageComponent
              path={url}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>

          <Typography
            variant="body2"
            textAlign={"center"}
            style={{ padding: "10px 0" }}
          >
            {/* <span style={{ fontWeight: "600", marginRight: "6px" }}>
                {userId}
              </span> */}
            <p style={{ display: "inline" }}>{text}</p>
          </Typography>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minWidth: "unset",
            }}
          >
            <div
              style={{
                textAlign: "left",
                marginBottom: "12px",
                position: "relative",
                minWidth: "unset",
              }}
            >
              {lottieStauts && (
                <LottieComponent
                  style={{
                    position: "absolute",
                    top: "-100px",
                    left: "-30px",
                  }}
                />
              )}
              {like ? (
                <>
                  <FavoriteIcon
                    onClick={handleLike}
                    fill="rgb(255, 48, 64)"
                    style={{
                      width: "24px",
                      height: "24px",
                      color: "rgb(255, 48, 64)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      textAlign: "left",
                      fontWeight: "600",
                      marginBottom: "12px",
                    }}
                  >
                    {likeCount}
                  </span>
                </>
              ) : (
                <>
                  <FavoriteBorderIcon
                    onClick={handleLike}
                    style={{
                      width: "24px",
                      height: "24px",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      textAlign: "left",
                      fontWeight: "600",
                      marginBottom: "12px",
                    }}
                  >
                    {likeCount}
                  </span>
                </>
              )}
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
                <MoreHorizIcon />
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
              display: "flex",
              justifyContent: "space-between",
              fontSize: "14px",
              textAlign: "left",
              color: "gray",
            }}
          >
            {getTimeDiff(time)}
            {/* <p
              style={{
                fontSize: "14px",
                textAlign: "left",
                fontWeight: "600",
                marginBottom: "12px",
              }}
            >
              좋아요 {likeCount}번
            </p> */}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
