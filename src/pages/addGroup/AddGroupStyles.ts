import styled from "styled-components";

export const AddGroupContainer = styled.div`
  padding-top: 72px;
`;

export const TypographyContainer = styled.div`
  padding: 30px 0;
`;

export const TextFieldContainer = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: space-around;
  -ms-flex-pack: space-around;
  justify-content: space-around;
  max-width: 400px;
  margin: 0 auto;
  padding: 0 48px;
  height: 150px;
  margin-bottom: 30px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 250px;
  margin: 0 auto;
  margin-top: 30px;
  padding: 10px;
`;

export const GoogleButton = styled.button`
  min-width: 280px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0 auto;
  background-color: #fff;
  color: #444;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  padding: 8px 16px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #eee;
    border-color: #bbb;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  &:active {
    background-color: #ddd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transform: translateY(1px);
  }
`;

export const SignUpButtonContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 10px;
`;
