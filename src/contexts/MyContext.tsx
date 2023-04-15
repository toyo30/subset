// MyContext.tsx

import { Dispatch, SetStateAction, createContext } from "react";
import { UserInstance } from "../types/user/user";

interface MyContextType {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  userInstance: UserInstance;
  setUserInstance: Dispatch<SetStateAction<UserInstance>>;
}

const MyContext = createContext<MyContextType>({
  value: "",
  setValue: () => {},
  userInstance: {
    uid: "",
    name: "",
    email: "",
    groups: [],
    fcmToken: "",
  },
  setUserInstance: () => {},
});

export default MyContext;
