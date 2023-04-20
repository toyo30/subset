import { errorMessageKorean } from "../../types/error/error";

export const getKoreanErrorMessage = (errorCode: string) => {
  return (
    errorMessageKorean[errorCode] ||
    ("알 수 없는 오류가 발생했습니다." as string)
  );
};
