import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ProvideAuth } from "./Authentication";
import Router from "./Router";
import { ThemeProvider} from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';


const THEME = createTheme({
  typography: {
   "fontFamily": `"Raleway", "Helvetica", "Arial", sans-serif`,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500
  }
});

const App = () => {
  return (
    <ThemeProvider theme={THEME}>
    <ProvideAuth>
      <BrowserRouter basename="/">
        <Router />
      </BrowserRouter>
    </ProvideAuth>
    </ThemeProvider>
  );
};

export default App;