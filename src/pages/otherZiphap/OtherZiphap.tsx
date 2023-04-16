import { BasicCard } from "../../components/card/BasicCard";
import * as S from "./otherZiphapStyles";

export const OtherZiphap = () => {
  return (
    <>
      <S.MyZiphapContainer>
        <div>otherZipahp</div>
        {/* <BasicSelect /> */}
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
        <div>외집합</div>
      </S.MyZiphapContainer>
    </>
  );
};
