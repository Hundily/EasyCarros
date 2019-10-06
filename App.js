console.disableYellowBox = true;

import React, { Component } from "react";
import { Router, Stack, Scene } from "react-native-router-flux";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import ReduxThunk from 'redux-thunk';

import Login from "./src/screens/Login";
import FeedCars from "./src/screens/FeedCars";

const App = () => (
  <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
    <Router>
      <Stack key="root">
        <Scene key="login" hideNavBar gesturesEnabled={false} component={Login} />
        <Scene key="feed" renderLeftButton={() => ""} title="Veículos" gesturesEnabled={false} component={FeedCars} />
      </Stack>
    </Router>
  </Provider>
);

export default App;