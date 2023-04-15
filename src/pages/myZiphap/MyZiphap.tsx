import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { BasicSelect } from "../../components/basicSelect/BasicSelect";
import { BasicCard } from "../../components/card/BasicCard";
import * as S from "./MyZiphapStyles";
import { useNavigate } from "react-router-dom";

interface Props {
  userObject: any;
}

export const MyZiphap: React.FC<Props> = ({ userObject }) => {
  const navigate = useNavigate();
  const navigateToAddevent = () => {
    navigate("/addevent");
  };

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
        <Fab onClick={navigateToAddevent} color="primary" aria-label="add" sx={fabStyle}>
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
