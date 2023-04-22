import styled from "styled-components";

export const MyZiphapContainer = styled.div`
  height: calc(100vh - env(safe-area-inset-bottom) - 120px);
  overflow-y: auto;
  padding: 56px 0;
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
