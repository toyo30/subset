import styled from "styled-components";

export const AppContainer = styled.div`
  position: relative;
  max-width: 430px;
  margin: 0 auto;
  height: calc(100vh - env(safe-area-inset-bottom));
  border: 1px solid black;
`;
