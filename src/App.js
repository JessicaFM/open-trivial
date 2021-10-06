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
import theme from './ui/Theme'
import Home from './view/home/Home'
import Questions from "./view/home/Questions";
import NotFound from "./view/home/NotFound";


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
            <Route path="*">
                <NotFound />
              </Route>
          </Switch>
        </Router>
      </Provider>
  );
}

export default App;
