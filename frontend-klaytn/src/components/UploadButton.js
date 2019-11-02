import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 64px;
  height: 64px;
  position: fixed;
  right: 50px;
  bottom: 50px;
  z-index: 5;
  color: $dark-brown;
  background: $dark-brown;
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
    @include absolute-center();
  }
  &::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }
`;

const UploadButton = () => (
  <StyledButton
  // onClick={() => ui.showModal({
  //   header: 'Upload Photo',
  //   content: <UploadPhoto />,
  // })}
  >
    Upload photo
  </StyledButton>
);

export default UploadButton;
