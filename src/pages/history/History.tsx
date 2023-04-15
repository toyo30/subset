import { BasicSelect } from "../../components/basicSelect/BasicSelect";
import { BasicCard } from "../../components/card/BasicCard";
import * as S from "./HistoryStyles";
interface Props {
  userObject: any;
}

export const History: React.FC<Props> = ({ userObject }) => {
  return (
    <>
      <S.MyZiphapContainer>
        <div>history</div>
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
      </S.MyZiphapContainer>
    </>
  );
};
