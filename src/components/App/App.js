import React, { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { ProvideAuth } from "./Authentication";
// import Navigation from "./Navigation";
import Router from "./Router";

const App = () => {
  return (
    <ProvideAuth>
      <BrowserRouter basename="/">
        {/* <Navigation /> */}
        <Router />
      </BrowserRouter>
    </ProvideAuth>
  );
};

export default App;