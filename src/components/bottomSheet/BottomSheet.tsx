import React, { useContext, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import MyContext from "../../contexts/MyContext";
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
  const backgroundRef = useRef<any>(null);
  const { bottomSheetStatus, setBottomSheetStatus } = useContext(MyContext);
  let MIN_Y = minHeight || 64;
  let BOTTOM_SHEET_HEIGHT = window.innerHeight - MIN_Y - 66;
  let MAX_Y = maxHeight || BOTTOM_SHEET_HEIGHT;
  const { sheetRef, content } = useBottomSheet(MIN_Y, MAX_Y);
  const [windonwSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const closeShowBottomSheet = (e: TouchEvent) => {
    if (
      e.target === sheetRef.current ||
      e.target === content.current ||
      !backgroundRef.current?.contains(e.target as Node)
    ) {
      return;
    } else if (bottomSheetStatus) {
      setBottomSheetStatus(false);
    }
  };

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

    window.addEventListener("touchstart", closeShowBottomSheet);
    window.addEventListener("touchmove", closeShowBottomSheet);
    window.addEventListener("touchend", closeShowBottomSheet);

    return () => {
      window.removeEventListener("touchstart", closeShowBottomSheet);
      window.removeEventListener("touchmove", closeShowBottomSheet);
      window.removeEventListener("touchend", closeShowBottomSheet);
    };
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
    <>
      <FixedBackground ref={backgroundRef} />
      <Wrapper
        ref={sheetRef}
        className={`${opacity ? "opacity" : ""}`}
        {...rest}
      >
        <BottomSheetHeader className={`${opacity ? "opacity" : ""}`} />
        <BottomSheetContent
          className={`${opacity ? "opacity" : ""}`}
          ref={content}
          style={{ height: `${BOTTOM_SHEET_HEIGHT}px` }}
        >
          {children}
        </BottomSheetContent>
      </Wrapper>
    </>
  );
};

export default BottomSheet;

const fadeIn = keyframes`
  50% {
    opacity: 0;
  }
`;

const FixedBackground = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
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
