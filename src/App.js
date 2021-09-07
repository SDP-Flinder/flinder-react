import React, { } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import './styles.css';
import CreateListing from "./Components/CreateListing";

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/listings/add" exact component={CreateListing} />
      </div>
    </Router>
  );
}

export default App;
