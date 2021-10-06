import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ProvideAuth } from "./Authentication";
import Router from "./Router";
import { ThemeProvider} from '@material-ui/styles';
import THEME from "../../style/THEME";

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