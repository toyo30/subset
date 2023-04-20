import { Button, TextField, Typography } from "@mui/material";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseApi } from "../../api/firebase-api";
import { BasicSelect } from "../../components/basicSelect/BasicSelect";
import MyContext from "../../contexts/MyContext";
import { db } from "../../firebase";
import { PathUrl } from "../../types/router/pathUrl";
import * as S from "./AddGroupStyles";

export const AddGroup = () => {
  const {
    groups,
    setGroups,
    userInstance,
    setUserInstance,
    setHasUser,
    hasUser,
  } = useContext(MyContext);
  const navigate = useNavigate();
  const [select, setSelect] = useState(true);
  const [groupName, setGroupName] = useState(groups[0]);
  const [groupDescription, setGroupDescription] = useState("");

  // useEffect(() => {}, []);

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
      members: [userInstance.name],
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

    return true;
  };

  const updateGroup = async () => {
    const groupPayload = await firebaseApi.getDocIdByName("groups", groupName);

    if (groupPayload) {
      const groupId = groupPayload.docs[0].id;
      const groupData = groupPayload.docs[0].data();
      console.log(groupData, "groupData");
      const groupResponse = await firebaseApi.updateData(groupId, "groups", {
        ...groupData,
        members: [...groupData.members, userInstance.name],
      });
    }

    return true;
  };

  const handleCreateUserInfo = async () => {
    if (!userInstance || !groupName) {
      console.log(userInstance, groupName, "userInstance, groupName");
      alert("정보를 다시 입력해주세요");

      // window.location.reload();
    }

    // const getId = await firebaseApi.getDocIdByUid("Users", userInstance.uid);

    const q = query(
      collection(db, "Users"),
      where("uid", "==", userInstance.uid)
    );

    const querySnapshot = await getDocs(q);

    const response =
      userInstance.groups.length === 0
        ? await firebaseApi.createData("Users", {
            ...userInstance,
            groups: [groupName],
          })
        : await firebaseApi.updateData(querySnapshot.docs[0].id, "Users", {
            ...userInstance,
            groups: [...userInstance.groups, groupName],
          });

    if (userInstance.groups.includes(groupName)) {
      return alert("이미 가입된 그룹입니다.");
    }
    const responseGroup = !select ? await createGroup() : await updateGroup();

    setUserInstance({
      ...userInstance,
      groups: [...userInstance.groups, groupName],
    });

    if (response) {
      setHasUser(true);
    }

    if (responseGroup) {
      navigate(`${PathUrl.MyZiphap}`);
    }
  };

  if (!userInstance.name) {
    navigate(`${PathUrl.AddName}`);
  }

  // useEffect(() => {
  //   if (hasUser) {
  //     navigate(`${PathUrl.MyZiphap}`);
  //   }
  // }, [hasUser]);

  return (
    <S.AddGroupContainer>
      <S.TypographyContainer>
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
          <Button variant="contained" onClick={handleCreateUserInfo}>
            그룹 참가하기
          </Button>
        ) : (
          <Button variant="contained" onClick={handleCreateUserInfo}>
            그룹 생성하기
          </Button>
        )}
        <Button variant="outlined" onClick={toggleSelect}>
          {select ? "그룹 생성" : "그룹 선택"}
        </Button>
      </S.ButtonContainer>
    </S.AddGroupContainer>
  );
};
