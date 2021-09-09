import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import Home from './view/home/Home'
import Questions from "./view/home/Questions";
import NotFound from "./view/home/NotFound";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/questions" component="{Questions}">
          <Questions />
        </Route>
        <Route path="*">
            <NotFound />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
