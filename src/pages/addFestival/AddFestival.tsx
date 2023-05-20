import PhotoUpload from "../../components/photoUpload/PhotoUpload";
import * as S from "./AddFestivalStyles";

export const AddFestival = () => {
  return (
    <S.AddGroupContainer>
      <S.TextFieldContainer>
        <PhotoUpload />
      </S.TextFieldContainer>
    </S.AddGroupContainer>
  );
};
