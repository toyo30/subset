import { useContext, useEffect } from "react";
import { BasicSelect } from "../../components/basicSelect/BasicSelect";
import { BasicCard } from "../../components/card/BasicCard";
import MyContext from "../../contexts/MyContext";
import * as S from "./MyZiphapStyles";

export const MyZiphap = () => {
  const { userInstance, setUserInstance, value, setValue } =
    useContext(MyContext);
  useEffect(() => {}, []);

  const handleChangeValue = () => {
    setValue("New value!");
  };
  return (
    <>
      <S.MyZiphapContainer>
        <button onClick={handleChangeValue}>Change value</button>
        <div>
          {"asdgasdg"}
          {userInstance.uid}
        </div>
        <div>{value}</div>
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
