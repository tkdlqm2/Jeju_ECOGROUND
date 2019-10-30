import React from "react";
import { connect } from "react-redux";
import ui from "../utils/ui";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.8);
`;

const ModalDiv = styled.div`
  @include fixed-center();
  @include cardBox();
  width: 100%;
  max-width: $max-card-width;

  @include breakpoint("max-card") {
    width: 95%;
  }
`;

const ModalHeader = styled.h2`
  padding: 22px 24px;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  border-bottom: 1px solid $light-grey;
`;

const ModalBody = styled.div`
  @include clear-both();
  padding: 40px 24px;
`;

const ModalClose = styled.button`
  @include imageReplacement(24px, 24px, "/images/icon-close.png", $white);
  position: absolute;
  top: 18px;
  right: 24px;
  cursor: pointer;
`;

const Modal = ({ modal }) =>
  modal && (
    <Wrapper>
      <ModalDiv style={modal.width && { width: `${modal.width}` }}>
        <ModalHeader>{modal.header}</ModalHeader>
        <ModalBody>{modal.content}</ModalBody>
        <ModalClose onClick={ui.hideModal}>Close modal</ModalClose>
      </ModalDiv>
    </Wrapper>
  );

const mapStateToProps = state => ({
  modal: state.ui.modal
});

export default connect(mapStateToProps)(Modal);
