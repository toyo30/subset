import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import BottomSheetHeader from "./BottomSheetHeader";
import { useBottomSheet } from "./UseBottomSheetHook";

interface BottomSheetProps {
  /* children: react node */
  children?: React.ReactNode;
  /* MIN_Y: 바텀시트가 최대로 높이 올라갔을 때의 y 값 */
  minHeight?: number;
  /* MAX_Y: 바텀시트가 최대로 높이 올라갔을 때의 y 값 */
  maxHeight?: number;
  /* visible: 바텀시트가 보이냐 보이지 않느냐 */
  visible?: boolean;

  opacity?: boolean;

  opacityTime?: number;
}

// export let MIN_Y: number = 100; // 바텀시트가 최대로 높이 올라갔을 때의 y 값
// export let BOTTOM_SHEET_HEIGHT = window.innerHeight; // 바텀시트의 세로 길이
// export let MAX_Y: number = window.innerHeight - BOTTOM_SHEET_HEIGHT / 2;

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  minHeight,
  maxHeight,
  visible,
  opacity,
  ...rest
}) => {
  let MIN_Y = minHeight || 64;
  let BOTTOM_SHEET_HEIGHT = window.innerHeight - MIN_Y - 66;
  let MAX_Y = maxHeight || BOTTOM_SHEET_HEIGHT;
  const { sheetRef, content } = useBottomSheet(MIN_Y, MAX_Y);
  const [windonwSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    MIN_Y = minHeight || MIN_Y;
    BOTTOM_SHEET_HEIGHT = window.innerHeight - MIN_Y - 76;
    MAX_Y = maxHeight || MAX_Y;

    if (sheetRef) {
      sheetRef?.current?.style.setProperty("height", `${BOTTOM_SHEET_HEIGHT}`);
    }

    if (sheetRef) {
      sheetRef?.current?.style.setProperty("transfrom", `translateY${MAX_Y}px`);
    }

    // window.addEventListener("touchstart", closeShowBottomSheet);
    // window.addEventListener("touchmove", closeShowBottomSheet);
    // window.addEventListener("touchend", closeShowBottomSheet);

    // return () => {
    //   window.removeEventListener("touchstart", closeShowBottomSheet);
    //   window.removeEventListener("touchmove", closeShowBottomSheet);
    //   window.removeEventListener("touchend", closeShowBottomSheet);
    // };
  }, []);

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    BOTTOM_SHEET_HEIGHT = window.innerHeight - MIN_Y - 76;
    MAX_Y = maxHeight ? maxHeight : MAX_Y;
  };

  useEffect(() => {
    console.log(window.innerHeight, "window.innerHeight");
    console.log(MIN_Y, "MIN_Y");
    console.log(window.innerHeight - MIN_Y - 66, "window.innerHeight minus");
    window.addEventListener("resize", handleSize);
    if (sheetRef) {
      sheetRef?.current?.style.setProperty("height", `${BOTTOM_SHEET_HEIGHT}`);
    }

    if (sheetRef) {
      sheetRef?.current?.style.setProperty("transfrom", `translateY${MAX_Y}px`);
    }
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, [windonwSize]);

  return (
    <Wrapper ref={sheetRef} className={`${opacity ? "opacity" : ""}`} {...rest}>
      <BottomSheetHeader className={`${opacity ? "opacity" : ""}`} />
      <BottomSheetContent
        className={`${opacity ? "opacity" : ""}`}
        ref={content}
        style={{ height: `${BOTTOM_SHEET_HEIGHT}px` }}
      >
        {children}
      </BottomSheetContent>
    </Wrapper>
  );
};

export default BottomSheet;

const fadeIn = keyframes`
  50% {
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;

  transform: translateY(100vh);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: #fff;
  box-shadow: 0px -4px 14px rgb(0 0 0 / 11%);
  transition: transform 150ms ease-out;

  &.opacity {
    ${(props: any) => {
      const time = props.opacityTime;
      return css`
        animation: ${fadeIn} ${time}ms step-end infinite;
      `;
    }}
    transition: unset;
  }
`;

const BottomSheetContent = styled.div`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  padding-bottom: calc(88px + env(safe-area-inset-bottom));
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

BottomSheet.defaultProps = {
  maxHeight: 500,
  opacityTime: 500,
};
