import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { LottieComponent } from "../lottie/Lottie";

export const ImgCard = () => {
  const [like, setLike] = useState<boolean>(false);
  const [lottieStauts, setLottieStatus] = useState<boolean>(false);

  const handleLike = () => {
    setLike(true);
    setLottieStatus(true);
    setTimeout(() => {
      setLottieStatus(false);
    }, 1000);
    // debounce((term: any) => {
    //   // API 호출 등의 비용이 큰 연산
    // }, 500);
  };

  return (
    <>
      <Card sx={{ minWidth: "100vw" }} variant="outlined">
        <CardContent>
          <div>
            <div
              style={{
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
                테스트입니다
              </p>
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
            <img
              src={`${process.env.PUBLIC_URL}/Cool.png`}
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
            좋아요 354개
          </p>
          <Typography variant="body2" textAlign={"left"}>
            <span style={{ fontWeight: "600", marginRight: "6px" }}>
              텍스트입니다!
            </span>
            <p style={{ display: "inline" }}>글자입니다!</p>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
