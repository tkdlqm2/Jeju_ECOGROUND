import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import styled from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const SliderContainer = styled.div`
  width: 80%;
`;

const Margin = styled.div`
  height: 20px;
`;

const marks = [
  {
    value: 0,
    label: "0"
  },
  {
    value: 20,
    label: "20Klay"
  },
  {
    value: 100,
    label: "100"
  }
];

function valuetext(value) {
  return `${value}`;
}

const theme = createMuiTheme({
  palette: {
    primary: { main: "#17202E" },
    secondary: { main: "#17202E" }
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "Noto Sans KR",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    fontSize: 16,
    fontWeight: 700
  }
});

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <SliderContainer>
        <Margin />
        <Typography id="discrete-slider-always" gutterBottom>
          목표금액 2000Klay
        </Typography>
        <Slider
          defaultValue={80}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-always"
          step={10}
          marks={marks}
          valueLabelDisplay="on"
          textColor="secondary"
        />
      </SliderContainer>
    </ThemeProvider>
  );
};
