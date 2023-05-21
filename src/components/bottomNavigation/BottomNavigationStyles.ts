import styled from "styled-components";

export const BottomNavigationContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 4;
  border-top: 1px solid #e0e0e0;
  width: 100%;
  padding-bottom: env(safe-area-inset-bottom);
  box-sizing: content-box;
`;
