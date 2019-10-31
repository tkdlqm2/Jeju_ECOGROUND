import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.button`
  width: 100%;
  height: 50px;
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${props => props.theme.lightGreen};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
`;

const Button = ({ title, onClick }) => (
  <Container onClick={onClick}>{title}</Container>
);

Button.propTypes = {
  title: PropTypes.string.isRequired
};

export default Button;
