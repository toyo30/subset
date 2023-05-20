import Lottie from "lottie-react";
import test from "../../lotties/LikeLottie.json";

interface Props {
  style?: React.CSSProperties;
}

export const LottieComponent: React.FC<Props> = ({ style }) => {
  const url = "https://assets1.lottiefiles.com/packages/lf20_S3YRnui9Hz.json"; // Your Lottie URL

  return <Lottie animationData={test} style={style} />;
};
