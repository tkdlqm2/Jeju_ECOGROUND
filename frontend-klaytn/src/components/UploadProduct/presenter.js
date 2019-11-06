import React from "react";
import Input from "components/Input";
import InputFile from "components/InputFile";
import Button from "components/Button";
import styled from "styled-components";

const Form = styled.form``;

const UploadProduct = ({
  handleSubmit,
  handleFileChange,
  isCompressing,
  file,
  fileName,
  title,
  description,
  targetKlay,
  D_day
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Input label="Create new account" placeholder={"Title"} {...title} />
      <Input placeholder={"Description"} {...description} />
      <Input placeholder={"targetKlay"} {...targetKlay} />
      <Input placeholder={"D_day"} {...D_day} />
      <InputFile
        className="UploadPhoto__file"
        name="file"
        label="Search file"
        fileName={isCompressing ? "Compressing image..." : fileName}
        onChange={handleFileChange}
        accept=".png, .jpg, .jpeg"
        required
      />
      <Button type="submit">Upload</Button>
    </Form>
  );
};
export default UploadProduct;
