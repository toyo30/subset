import React from "react";
import styled, { css } from "styled-components";

interface TopAppBarsProps {
  /**
   * text: topAppText text
   */
  children?: string;
  /**
   * name: dom 요소 접근
   */
  name?: string;
  /**
   * backgroundColor: backgroundColor
   */
  backgroundColor?: "white" | "black";
  /**
   * topApptype
   */
  topAppType?: "centered" | "collapsed";
  /**
   * borderBottom
   */
  borderBottom?: boolean;
  /**
   * sx: 버튼 커스텀 css
   */
  sx?: any;
  /**
   * 왼쪽 상단 버튼: 왼쪽 상단 버튼
   */
  topAppLeft?: React.ReactNode;
  /**
   * 오른쪽 상단 버튼: 오른쪽 상단 버튼
   */
  topAppRight?: React.ReactNode;
  /**
   * onClick 이벤트: 온클릭이벤트 만들기
   */
  onClick?: (e: any) => void;
}

const TopAppBars: React.FC<TopAppBarsProps> = ({
  children,
  topAppLeft,
  topAppRight,
  onClick,
  ...rest
}) => {
  return (
    <TopAppBox {...rest}>
      {/* TopLeftBtn */}
      <TopAppLeftBtn>{topAppLeft}</TopAppLeftBtn>
      {/* TopAppCenterText */}
      <TopAppCenterText>{children}</TopAppCenterText>
      {/* TopAppRightBtn */}
      <TopAppRightBtn>{topAppRight}</TopAppRightBtn>
    </TopAppBox>
  );
};

export default TopAppBars;

const TopAppBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 48px;
  box-sizing: border-box;
  padding: 0 8px;

  /* props.borderBottom */
  ${(props: any) =>
    props.borderBottom
      ? css`
          border-bottom: 1px solid black;
        `
      : null}

  /* props.topAppType */
  ${(props: any) => {
    switch (props.topAppType) {
      case "centered":
        return css`
          & p {
            position: absolute;
            left: 80px;
            right: 80px;
            text-align: center;
          }
        `;
      case "collapsed":
        return css`
          & p {
            position: relative;
          }
        `;
      default:
        return css``;
    }
  }};

  /* props.backgroundColor */
  ${(props: any) =>
    props.backgroundColor === "white"
      ? css`
          color: black;
          background: white;
          & button {
            fill: black;
          }
          & button:active {
            & path {
              fill: black;
            }
          }
        `
      : css`
          color: white;
          background: black;
          & path {
            fill: white;
          }
          & button:active {
            & path {
              fill: black;
            }
          }
        `};

  /* css 커스텀 */
  ${(props: any) => props.sx};
`;

const TopAppLeftBtn = styled.div``;

const TopAppRightBtn = styled.div`
  position: absolute;
  right: 0;
`;

const TopAppCenterText = styled.p`
  line-height: 26px;
  height: 24px;
  cursor: pointer;
`;

TopAppBars.defaultProps = {
  backgroundColor: "white",
  children: "",
  topAppType: "centered",
  borderBottom: false,
};
