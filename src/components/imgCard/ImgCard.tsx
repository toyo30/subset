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
import { useEffect, useRef, useState } from "react";
import { firebaseApi } from "../../api/firebase-api";
import { ImageComponent } from "../../components/imgBox/ImgBox";
import { pins } from "../../constant/pins";
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const modalRef = useRef<any>(null);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

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
      await firebaseApi.deleteData(id, location);
      closeModalFunction();
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
      console.log("no");
      return;
    } else {
      console.log("yes");
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
          }}
        >
          <div
            ref={modalRef}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              background: "white",
              minWidth: "80%",
              height: "70vh",
              border: "1px solid black",
            }}
          >
            <div>"게시글"의 비밀번호를 입력해주세요.</div>
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={deletePost}>삭제하기</button>
            <button onClick={closeModalFunction}>취소하기</button>
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
                width: "100%",
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
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
            <p
              style={{
                fontSize: "14px",
                textAlign: "left",
                marginBottom: "12px",
                color: "gray",
              }}
            >
              {`${pins[location].name}`}
            </p>
          </div>
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
