import React from "react";
import Input from "components/Input";
import InputFile from "components/InputFile";
import Button from "components/Button";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const StyledKeyboardDatePicker = styled(KeyboardDatePicker)`
  font-weight: 500;
  width: 100%;
`;

const Container = styled.div``;

const Form = styled.form``;

const StyledButton = styled(Button)`
  background-color: ${props => props.theme.HeaderColor};
  margin-top: 30px;
`;

const Textarea = styled(TextareaAutosize)`
  border: 0;
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.bgColor};
  min-height: 150px;
  max-height: 200px;
  font-size: 15px;
  padding: 15px;
  width: 100%;
  margin-bottom: 30px;
  resize: none;
  &:focus {
    outline: none;
  }
  display: block;
  color: ${props => props.theme.black};
  @import url("https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap");
  font-family: -apple-system, "Noto Sans KR", sans-serif, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans";
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Klay = styled.span`
  margin-top: 35px;
  font-size: 16px;
  margin-left: 10px;
  padding-right: 40px;

  &:last-child {
    padding-right: 0px;
  }
`;

const KlayInput = styled(Input)`
  text-align: right;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 25px;
`;

const UploadProduct = ({
  handleSubmit,
  filePath,
  title,
  description,
  targetKlay,
  price,
  selectedDate,
  handleDateChange
}) => {
  return (
    <Container>
      <Form>
        <Input label="상품 정보" placeholder={"상품 이름"} {...title} />
        <Input placeholder={""} type="hidden" {...filePath} />
        <Textarea placeholder={"상세 설명"} {...description} />
        <PriceWrapper>
          <KlayInput label="상품 가격" placeholder={"0"} {...price} />
          <Klay>KLAY</Klay>
          <KlayInput label="수량" placeholder={"0"} {...targetKlay} />
          <Klay>EA</Klay>
        </PriceWrapper>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="left">
            <StyledKeyboardDatePicker
              className="D_day"
              disableToolbar
              format="yyyy년 MM월 dd일"
              margin="normal"
              id="date-picker-dialog"
              label="상품 등록일"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <Input label="image" placeholder={"image"} {...filePath} />

        {/* <InputFile
          className="UploadPhoto__file"
          name="file"
          label="Search file"
          fileName={isCompressing ? "Compressing image..." : fileName}
          onChange={handleFileChange}
          accept=".png, .jpg, .jpeg"
          required
        /> */}
        <StyledButton onClick={handleSubmit}>Upload</StyledButton>
      </Form>
    </Container>
  );
};
export default UploadProduct;
