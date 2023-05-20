// MyContext.tsx

import { Dispatch, SetStateAction, createContext } from "react";
import { UserInstance } from "../types/user/user";

interface MyContextType {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  userInstance: UserInstance;
  setUserInstance: Dispatch<SetStateAction<UserInstance>>;
  groups: string[];
  setGroups: Dispatch<SetStateAction<string[]>>;
  hasUser: boolean;
  setHasUser: Dispatch<SetStateAction<boolean>>;
  selectGroup: string;
  setSelectGroup: Dispatch<SetStateAction<string>>;
  bottomSheetStatus: boolean;
  setBottomSheetStatus: Dispatch<SetStateAction<boolean>>;
  pinStatus: string;
  setPinStatus: Dispatch<SetStateAction<string>>;
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
  groups: [],
  setGroups: () => {},
  hasUser: true,
  setHasUser: () => {},
  selectGroup: "",
  setSelectGroup: () => {},
  bottomSheetStatus: false,
  setBottomSheetStatus: () => {},
  pinStatus: "",
  setPinStatus: () => {},
});

export default MyContext;
