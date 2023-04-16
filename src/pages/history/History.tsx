import { BasicCard } from "../../components/card/BasicCard";
import * as S from "./HistoryStyles";

export const History = () => {
  return (
    <>
      <S.MyZiphapContainer>
        <div>history</div>
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
      </S.MyZiphapContainer>
    </>
  );
};
