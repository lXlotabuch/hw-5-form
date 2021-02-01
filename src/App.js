import { React, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.scss";
import store from "./store";
import { Provider } from "react-redux";
import CardsPlace from "./components/CardsPlace/CardsPlace";
import Header from "./components/Header/Header";
import { SubmiteForm } from "./components/Form/Form.jsx";

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
