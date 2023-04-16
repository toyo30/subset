import { useContext } from "react";
import { BasicSelect } from "../../components/basicSelect/BasicSelect";
import { BasicCard } from "../../components/card/BasicCard";
import MyContext from "../../contexts/MyContext";
import * as S from "./MyZiphapStyles";

export const MyZiphap = () => {
  const { userInstance, setUserInstance, value, setValue } =
    useContext(MyContext);

  return (
    <>
      <S.MyZiphapContainer>
        <BasicSelect selectOptions={userInstance.groups} />
        <S.CardContainer>
          <BasicCard />
        </S.CardContainer>
        <S.CardContainer>
          <BasicCard />
        </S.CardContainer>
        <S.CardContainer>
          <BasicCard />
        </S.CardContainer>
        <S.CardContainer>
          <BasicCard />
        </S.CardContainer>
        <div>내집합</div>
      </S.MyZiphapContainer>
    </>
  );
};
