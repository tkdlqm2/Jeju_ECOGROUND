import React, { useEffect, useState } from "react";
import Slider from "@material-ui/core/Slider";
import styled from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { getValues } from "jest-validate/build/condition";

const SliderContainer = styled.div`
  width: 93%;
  padding: 0;
  height: 80px;
  margin-right: 10px;
  /* background-color: ${props => props.theme.lightGrey}; */
`;

const Margin = styled.div`
  height: 30px;
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

const StyledSlider = withStyles({
  root: {
    color: "#17202E",
    height: 8
  },
  thumb: {
    height: 20,
    width: 20
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

const useStyles = makeStyles({
  mark: {
    color: "transparent"
  }
});

const Container = ({ targetKlay, price, status, donate }) => {
  const [donateValue, setDonateValue] = useState(null);

  const getValues = () => {
    if (donateValue !== 0) {
      return;
    }
  };

  const wait = async () => {
    const value = await getValues();
    return value;
  };

  useEffect(() => {
    wait();
  }, []);

  return <MySlider donate={donate} targetKlay={targetKlay} />;
};

const MySlider = ({ targetKlay, donate }) => {
  const classes = useStyles();
  const [currentValue, setcurrentValue] = useState(null);

  const valuetext = value => {
    return `${value}`;
  };

  const marks = [
    {
      value: 0,
      label: "0"
    },
    {
      value: 100,
      label: `${targetKlay} KLAY`
    }
  ];

  console.log("target:", targetKlay);
  useState(() => {
    if (!targetKlay) {
      const floor = Math.floor((1 / targetKlay) * 100).toString();
      setcurrentValue(floor);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SliderContainer>
        <Margin />
        {currentValue === 0 ? (
          <StyledSlider
            defaultValue={0}
            getAriaValueText={valuetext}
            marks={marks}
            valueLabelDisplay="auto"
            textColor="secondary"
            classes={{
              mark: classes.mark
            }}
          />
        ) : (
          <StyledSlider
            defaultValue={currentValue}
            getAriaValueText={valuetext}
            marks={marks}
            valueLabelDisplay="auto"
            textColor="secondary"
            classes={{
              mark: classes.mark
            }}
          />
        )}
      </SliderContainer>
    </ThemeProvider>
  );
};

export default Container;
