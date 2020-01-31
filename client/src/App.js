import React from 'react';
import { Route } from "react-router-dom";
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Jokes from "./components/Jokes";

function App() {
  return (
    <>
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <PrivateRoute path='/jokes' component={Jokes} />
    </>
  );
}

export default App;
