import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { Provider } from 'react-redux'
import configureStore from "configureStore";

// Views & styles
import './App.css';
import Home from './view/HomeView'
import Questions from "./view/QuestionsView";
import NotFound from "./view/NotFoundView";
import End from "view/EndView";


const store = configureStore()


function App() {
  return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/questions" component="{Questions}">
              <Questions />
            </Route>
            <Route path="/end" component="{End}">
              <End />
            </Route>
            <Route path="*">
                <NotFound />
              </Route>
          </Switch>
        </Router>
      </Provider>
  );
}

export default App;
