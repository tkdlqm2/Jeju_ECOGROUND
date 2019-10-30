import React from "react";
import cx from "classnames";
import styled from "styled-components";

const Container = styled.button`
  -webkit-appearance: none;
  width: 100%;
  background-color: ${props => props.theme.lightGrey};
  color: ${props => props.theme.brownGrey};
  border-radius: 5px;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  padding: 23px;
  cursor: pointer;

  &:hover,
  &:active {
    background-color: ${props => props.theme.darkBrown};
    color: $white;
  }
`;

const Button = ({ className, title, onClick, icon, disabled }) => {
  const iconStyle = {
    paddingLeft: "18px",
    background: `left / 12px no-repeat url('/images/${icon}')`
  };

  return (
    <Container
      className={cx("Button", className)}
      onClick={onClick}
      disabled={disabled}
    >
      <span style={icon && iconStyle}>{title}</span>
    </Container>
  );
};

export default Button;
