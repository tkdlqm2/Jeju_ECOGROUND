import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import styled from "styled-components";

const StyledKeyboardDatePicker = styled(KeyboardDatePicker)`
  font-weight: 500;
  width: 100%;
`;

export default () => {
  // The first commit of Material-UI

  const today = new Date();

  const [selectedDate, setSelectedDate] = React.useState(today);

  const handleDateChange = date => {
    const yearValue = date.getYear() + 1900;
    const monthValue = date.getMonth() + 1;
    const dateValue = date.getDate();

    if (monthValue >= 10 && dateValue >= 10) {
      const selectedValue = `${yearValue}-${monthValue}-${dateValue}`;
      setSelectedDate(selectedValue);
      console.log("Selected date: ", selectedValue);
    } else if (monthValue >= 10 && dateValue < 10) {
      const selectedValue = `${yearValue}-${monthValue}-0${dateValue}`;
      setSelectedDate(selectedValue);
      console.log("Selected date: ", selectedValue);
    } else if (monthValue < 10 && dateValue >= 10) {
      const selectedValue = `${yearValue}-0${monthValue}-${dateValue}`;
      setSelectedDate(selectedValue);
      console.log("Selected date: ", selectedValue);
    } else if (monthValue < 10 && dateValue < 10) {
      const selectedValue = `${yearValue}-0${monthValue}-0${dateValue}`;
      setSelectedDate(selectedValue);
      console.log("Selected date: ", selectedValue);
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="left">
        <StyledKeyboardDatePicker
          disableToolbar
          format="yyyy년 MM월 dd일"
          margin="normal"
          id="date-picker-dialog"
          label="마감일을 선택해주세요"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};
