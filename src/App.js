import './App.css';
import React from 'react';
import Login from './Login'
import Masthead from './Masthead'
import Dashboard from './Dashboard'

import { authtoken, resetAuthToken, setAuthToken } from './globals'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";



function App() {

  const auth = authtoken.use()

  return (
    <Router>

    <div className="App">

      <Switch>


      <Route path="/login">
          <Masthead />
          <Login />
      </Route>

      <Route path="/dashboard">
          {
            auth === "" ? 
            <Redirect to="/login" />
            :
          <>
          <Masthead />
          <Dashboard />
          </>
          }
      </Route>

      <Route path="/">
          <Masthead />
          <NavLink to="/login" activeClassName="hurray">Go to login page</NavLink>
      </Route>

      </Switch>
    </div>

    </Router>
  );
}

export default App;
