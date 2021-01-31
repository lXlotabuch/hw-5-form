import { React, useState, useEffect } from "react";
import CardsPlace from "./components/CardsPlace";
import Header from "./components/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import store from "./state";
import { Provider } from "react-redux";
import { SubmiteForm } from "./components/Form.js";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className='App'>
          <Header />
          <Switch>
            <Route exact path='/'>
              <CardsPlace />
            </Route>
            <Route path='/favorites'>
              <CardsPlace />
            </Route>
            <Route path='/cart'>
              <CardsPlace />
            </Route>
          </Switch>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
