import { BasicSelect } from "../../components/basicSelect/BasicSelect";
import { BasicCard } from "../../components/card/BasicCard";
import * as S from "./otherZiphapStyles";
interface Props {
  userObject: any;
}

export const OtherZiphap: React.FC<Props> = ({ userObject }) => {
  return (
    <>
      <S.MyZiphapContainer>
        <div>otherZipahp</div>
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
        <div>외집합</div>
      </S.MyZiphapContainer>
    </>
  );
};
