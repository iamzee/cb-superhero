import React from "react";
import ReactDOM from "react-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HomePage from "./src/pages/index.js";
import { deepOrange } from "@mui/material/colors";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CallbackPage from "./src/pages/callback.js";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/callback" element={<CallbackPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
