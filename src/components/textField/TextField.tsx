import { TextFieldProps } from "@mui/material";
import { useEffect, useRef } from "react";

export const TextFieldCustom: React.FC<TextFieldProps> = ({ ...rest }) => {
  const textFieldRef = useRef<HTMLInputElement | null>(null);
  const handleInputBlur = (e: any) => {
    console.log("---");
    if (!textFieldRef?.current?.contains(e.target)) {
      textFieldRef.current?.blur();
    }
  };

  useEffect(() => {
    console.log("---");
    handleInputBlur("asdf");
    window?.addEventListener("touchstart", handleInputBlur);
    window?.addEventListener("touchmove", handleInputBlur);
    window?.addEventListener("touchend", handleInputBlur);
    return () => {
      window?.removeEventListener("touchstart", handleInputBlur);
      window?.removeEventListener("touchmove", handleInputBlur);
      window?.removeEventListener("touchend", handleInputBlur);
    };
  }, []);

  return <>{/* <input ref={textFieldRef} {...rest} /> */}</>;
};
