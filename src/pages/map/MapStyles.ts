import styled from "styled-components";

export const MapContainer = styled.div`
  position: relative;
`;

export const InfoContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  padding: 10px;
  top: 15px;
  left: 10px;
  background: #ffffff;
  z-index: 1;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  line-height: 19px;
  font-size: 15px;
  font-weight: 600;
  color: #242424;
`;

export const InfoBarContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  padding: 10px;
  top: 15px;
  left: 150px;
  background: #ffffff;
  z-index: 1;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  line-height: 19px;
  font-size: 15px;
  font-weight: 600;
  color: #242424;
`;

export const ImgIcon = styled.img`
  object-fit: cover;
  object-fit: cover;
  width: 12px;
  margin-right: 6px;
`;
