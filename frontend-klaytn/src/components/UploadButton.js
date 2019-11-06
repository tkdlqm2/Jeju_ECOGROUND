import React from "react";
import ui from "utils/ui";
import UploadProduct from "components/UploadProduct";
import styled from "styled-components";

const ButtonContainer = styled.button`
  width: 64px;
  height: 64px;
  position: fixed;
  right: 50px;
  bottom: 50px;
  z-index: 5;
  color: ${props => props.theme.white};
  background: ${props => props.theme.lightGreen};
  border-radius: 50%;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  cursor: pointer;

  &::before,
  &::after {
    content: "";
    display: block;
    width: 24px;
    height: 2px;
    background-color: $white;
  }
  &::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }
`;

const UploadButton = () => (
  <ButtonContainer
    onClick={() =>
      ui.showModal({
        header: "Upload Product",
        content: <UploadProduct />
      })
    }
  >
    Upload
  </ButtonContainer>
);

export default UploadButton;
