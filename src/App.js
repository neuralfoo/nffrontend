import './App.css';
import React from 'react';
import Login from './Login'
import Masthead from './Masthead'
import Dashboard from './Dashboard'

import { authtoken } from './globals'

import Cookies from 'universal-cookie';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";



function App() {

  const auth = authtoken.use()

  const cookies = new Cookies();

  console.log(cookies.get('token'));

  return (
    <Router>

    <div className="App">

      <Switch>


      <Route path="/login">
          {
            cookies.get('token') ?
              <Redirect to="/dashboard" />
              :
              <>
              <Masthead  cookies={cookies} hideLoginLink={true}/>
              <Login  cookies={cookies}/>
              </>
          }
      </Route>

      <Route path="/dashboard">
          {
            cookies.get('token') ? 
            <>
              <Masthead  cookies={cookies}/>
              <Dashboard  cookies={cookies}/>
            </>
            : 
            <Redirect to="/login" />
          }
      </Route>

      <Route path="/">
          <Masthead  cookies={cookies}/>
      </Route>

      </Switch>
    </div>

    </Router>
  );
}

export default App;
