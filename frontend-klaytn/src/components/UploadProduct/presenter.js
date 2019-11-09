import React from "react";
import Input from "components/Input";
import InputFile from "components/InputFile";
import Button from "components/Button";
import styled from "styled-components";

const Container = styled.div``;

const Form = styled.form``;

const StyledButton = styled(Button)`
  background-color: ${props => props.theme.HeaderColor};
  margin-top: 30px;
`;

const UploadProduct = ({
  handleSubmit,
  handleFileChange,
  isCompressing,
  file,
  filePath,
  fileName,
  title,
  description,
  targetKlay,
  price,
  D_day
}) => {
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input label="Create New Product" placeholder={"Title"} {...title} />
        <Input placeholder={"Description"} {...description} />
        <Input placeholder={"price"} {...price} />
        <Input placeholder={"targetKlay"} {...targetKlay} />
        <Input placeholder={"D_day (ex.YYYYMMDD)"} {...D_day} />
        <Input type="hidden" {...filePath} />

        <InputFile
          className="UploadPhoto__file"
          name="file"
          label="Search file"
          fileName={isCompressing ? "Compressing image..." : fileName}
          onChange={handleFileChange}
          accept=".png, .jpg, .jpeg"
          required
        />
        <StyledButton type="submit">Upload</StyledButton>
      </Form>
    </Container>
  );
};
export default UploadProduct;
