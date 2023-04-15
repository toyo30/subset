import { Button, TextField, Typography } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseApi } from "../../api/firebase-api";
import { BasicSelect } from "../../components/basicSelect/BasicSelect";
import MyContext from "../../contexts/MyContext";
import { db } from "../../firebase";
import { PathUrl } from "../../types/router/pathUrl";
import * as S from "./AddGroupStyles";

export const AddGroup = () => {
  const navigate = useNavigate();
  const [select, setSelect] = useState(true);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const {
    groups,
    setGroups,
    userInstance,
    setUserInstance,
    setHasUser,
    hasUser,
  } = useContext(MyContext);

  const toggleSelect = () => {
    setSelect(!select);
  };

  const backNavigation = () => {
    navigate(-1);
  };

  const createGroup = async () => {
    const groupData = {
      name: groupName,
      description: groupDescription,
    };
    try {
      await addDoc(collection(db, "groups"), groupData);
      alert("그룹이 성공적으로 생성되었습니다.");
      setGroups([...groups, groupName]);
      setGroupName("");
      setGroupDescription("");
      navigate("/");
    } catch (error) {
      alert("그룹 생성에 실패했습니다. 다시 시도해주세요.");
      console.error(error);
    }
  };

  const handleCreateUserInfo = async () => {
    if (!userInstance || !groupName) {
      alert("정보를 다시 입력해주세요");
      window.location.reload();
    }

    const response = await firebaseApi.createData("Users", {
      ...userInstance,
      groups: [...userInstance.groups, groupName],
    });

    console.log(response, "response");

    if (!select) {
      createGroup();
    }

    setUserInstance({
      ...userInstance,
      groups: [...userInstance.groups, groupName],
    });

    if (response) {
      setHasUser(true);
      navigate(`${PathUrl.MyZiphap}`);
    }

    // window.location.reload();
  };

  useEffect(() => {
    console.log(groupName, "groupName");
  }, [groupName]);

  if (!userInstance.name) {
    navigate(`${PathUrl.AddName}`);
  }

  if (hasUser) {
    navigate(`${PathUrl.MyZiphap}`);
  }

  return (
    <S.AddGroupContainer>
      <S.TypographyContainer>
        <Button onClick={toggleSelect}>
          {select ? "그룹 생성" : "그룹 선택"}
        </Button>

        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          {select ? "집합할 그룹 선택하기" : "집합할 그룹 생성하기"}
        </Typography>
      </S.TypographyContainer>

      {select ? (
        <BasicSelect
          label="집합"
          selectOptions={groups}
          onChange={(e) => setGroupName(e.target.value)}
        />
      ) : (
        <S.TextFieldContainer>
          <TextField
            type="text"
            placeholder="그룹 이름"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <TextField
            type="text"
            placeholder="한줄소개"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
          />
        </S.TextFieldContainer>
      )}

      <S.ButtonContainer>
        <Button onClick={backNavigation}>뒤로</Button>

        {select ? (
          <Button onClick={handleCreateUserInfo}>그룹 선택</Button>
        ) : (
          <Button onClick={handleCreateUserInfo}>그룹 생성</Button>
        )}
      </S.ButtonContainer>
    </S.AddGroupContainer>
  );
};
