import styled from "styled-components";

export const AppContainer = styled.div`
  position: relative;
  overflow-y: auto;
  margin: 0 auto;
  height: var(--app-height);

  /* border: 1px solid black; */
`;

export const ScrollContainer = styled.div`
  /* position: absolute;
  top: 0;
  left: 0;
  width: 1;
  height: calc(100vh - env(safe-area-inset-bottom) + 1px); */
`;

export const LoadingContainer = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - env(safe-area-inset-bottom));
`;
