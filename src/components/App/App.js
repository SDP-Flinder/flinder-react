import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ProvideAuth } from "./Authentication";
import Router from "./Router";
import "../../style/global.css"

const App = () => {
  return (
    <ProvideAuth>
      <BrowserRouter basename="/">
        <Router />
      </BrowserRouter>
    </ProvideAuth>
  );
};

export default App;