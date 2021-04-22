import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import NamesList from "./components/names-list.component";


function App() {
  return (
    <Router>
      <div className="container">
        <br/>
        <Route path="/" component={NamesList} />
      </div>
    </Router>
  );
}

export default App;
