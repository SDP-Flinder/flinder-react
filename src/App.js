import React, {} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import './App.css';
import MatchList from "./Components/MatchList";

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={MatchList} />
      </div>
    </Router>
  );
}

export default App;