import styled from "styled-components";

export const AppContainer = styled.div`
  position: relative;
  max-width: 430px;
  margin: 0 auto;
  height: calc(100vh - env(safe-area-inset-bottom));
  border: 1px solid black;
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
  height: 100%;
`;
