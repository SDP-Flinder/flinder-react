import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ProvideAuth } from "./Authentication";
import Router from "./Router";
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createTheme({
  //This is a global font style for all components
  typography: {
    fontFamily: [
      'Raleway',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <ProvideAuth>
      <BrowserRouter basename="/">
        <Router />
      </BrowserRouter>
    </ProvideAuth>
    </ThemeProvider>
  );
};

export default App;