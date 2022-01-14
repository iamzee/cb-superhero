import React from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HomePage from "./src/pages/index.js";
import { deepOrange } from "@mui/material/colors";

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small",
        margin: "dense",
      },
    },
  },
  palette: {
    primary: deepOrange,
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <HomePage />
  </ThemeProvider>,
  document.getElementById("root")
);
