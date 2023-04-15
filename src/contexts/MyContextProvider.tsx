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

  const contextValue = {
    value,
    setValue,
    userInstance,
    setUserInstance,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export default MyContextProvider;
