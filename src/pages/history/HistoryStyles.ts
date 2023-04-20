import styled from "styled-components";

export const MyZiphapContainer = styled.div`
  height: calc(100vh - env(safe-area-inset-bottom) - 120px);
  overflow-y: auto;
  padding-bottom: 56px;
`;

export const CardContainer = styled.div`
  padding: 0 32px;
`;

export const NameCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  min-width: 40px;
  color: white;
  font-weight: bold;
  font-size: 1em;
  padding: 5px;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;
