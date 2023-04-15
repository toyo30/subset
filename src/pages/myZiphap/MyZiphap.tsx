import { useEffect } from "react";
import { BasicSelect } from "../../components/basicSelect/BasicSelect";
import { BasicCard } from "../../components/card/BasicCard";
import * as S from "./MyZiphapStyles";

interface Props {
  userObject: any;
}

export const MyZiphap: React.FC<Props> = ({ userObject }) => {
  useEffect(() => {}, []);

  return (
    <>
      <S.MyZiphapContainer>
        <BasicSelect />
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
