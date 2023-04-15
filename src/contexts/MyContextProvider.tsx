import React, { useState } from "react";
import { UserInstance } from "../types/user/user";
import MyContext from "./MyContext";

interface MyContextProviderProps {
  children: React.ReactNode;
}

const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [value, setValue] = useState("Hello, Context!");
  const [userInstance, setUserInstance] = useState<UserInstance>({
    uid: "",
    name: "",
    email: "",
    groups: [],
    fcmToken: "",
  });
  const [groups, setGroups] = useState<string[]>([]);
  const [hasUser, setHasUser] = useState<boolean>(true);

  const contextValue = {
    value,
    setValue,
    userInstance,
    setUserInstance,
    groups,
    setGroups,
    hasUser,
    setHasUser,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export default MyContextProvider;
