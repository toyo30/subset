import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
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
        <Fab color="primary" aria-label="add" sx={fabStyle}>
          <AddIcon />
        </Fab>
      </S.MyZiphapContainer>
    </>
  );
};

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};
