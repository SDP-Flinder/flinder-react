import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
// import App from "./components/App/App";
import App from "./components/Listing/App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();