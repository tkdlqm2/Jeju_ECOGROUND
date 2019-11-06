import React from "react";
// import cx from "classnames";
import styled from "styled-components";

const InputFileContainer = styled.div`
  position: relative;
  font-size: 14px;
  border: 1px solid $light-grey;
  border-radius: 5px;
  margin-top: 26px;
  @include clear-both();
  &--err {
    border-color: $alert-red;
  }
`;
const Label = styled.p`
  position: absolute;
  top: -26px;
  font-size: 12px;
  font-weight: bold;
  line-height: 1;
  color: $brown-grey;
`;

const InputButton = styled.label`
  float: right;
  display: block;
  width: 120px;
  height: 62px;
  line-height: 62px;
  text-align: center;
  font-weight: bold;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: $white;
  background-color: $dark-brown;
  cursor: pointer;
`;
const InputFileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;
const FileName = styled.p`
  float: left;
  padding: 22px 24px;
  text-align: left;
  color: $black;
  @include textEllipsis();

  &--empty {
    color: $middle-grey;
  }
`;
const Err = styled.p`
  position: absolute;
  top: -22px;
  right: 0;
  font-size: 12px;
  color: $alert-red;
`;

const Input = ({
  className,
  name,
  value,
  label,
  fileName,
  onChange,
  required,
  accept,
  err
}) => (
  <InputFileContainer>
    <Label>{label}</Label>
    <InputButton htmlFor="upload">Search</InputButton>
    <InputFileInput
      id="upload"
      type="file"
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      accept={accept}
    />
    <FileName>{fileName || "No photo"}</FileName>
    {err && <Err>{err}</Err>}
  </InputFileContainer>
);

export default Input;
