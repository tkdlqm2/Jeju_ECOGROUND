import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import styled from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const SliderContainer = styled.div`
  width: 85%;
  margin-bottom: 20px;
`;

const Margin = styled.div`
  height: 20px;
`;

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

export default ({ targetKlay, price, status }) => {
  const marks = [
    {
      value: 0,
      label: "0"
    },
    {
      value: 100,
      label: targetKlay
    }
  ];

  const valuetext = value => {
    return `${value}`;
  };

  const currentValue = Math.floor((1 / targetKlay) * 100);

  return (
    <ThemeProvider theme={theme}>
      <SliderContainer>
        <Margin />
        Klay 달성률
        <Slider
          defaultValue={currentValue}
          getAriaValueText={valuetext}
          step={targetKlay}
          marks={marks}
          valueLabelDisplay="off"
          textColor="secondary"
        />
      </SliderContainer>
    </ThemeProvider>
  );
};
