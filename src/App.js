import React, {} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import './App.css';
import MatchList from "./Components/MatchList";
import Match from "./Components/Match";

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={MatchList} />
        <Route path="/match" exact component={Match}/>
      </div>
    </Router>
  );
}

export default App;