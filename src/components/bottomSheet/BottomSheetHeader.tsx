import React from "react";
import styled from "styled-components";

interface BottomSheetHeaderProps {
  /* children: react node */
  children?: React.ReactNode;
  /* MIN_Y: 바텀시트가 최대로 높이 올라갔을 때의 y 값 */
  className?: string;
}

const Wrapper = styled.div`
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  position: relative;
  padding-top: 8px;
  background-color: #ffffff;
  z-index: 1500;
`;

const Handle = styled.div`
  width: 64px;
  height: 4px;
  border-radius: 2px;
  background-color: #d0d0d0;
  margin: auto;
`;

const BottomSheetHeader: React.FC<BottomSheetHeaderProps> = ({ className }) => {
  return (
    <Wrapper className={className}>
      <Handle />
      {/* <TopAppBars
        topAppType="collapsed"
        borderBottom
        sx={{ padding: "18px 16px", height: "64px" }}
      >
        배송 전체 일정
      </TopAppBars> */}
    </Wrapper>
  );
};

export default BottomSheetHeader;

// const fadeIn = keyframes`
//   50% {
//     opacity: 0;
//   }
// `;
