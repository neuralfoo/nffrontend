import './App.css';
import React from 'react';
import Login from './Login'
import Masthead from './Masthead'
import Dashboard from './Dashboard'
import Testboard from './Testboard'

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
              <Masthead  cookies={cookies} hideNav={true}/>
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

      <Route path="/test/new">
          {
            cookies.get('token') ? 
            <>
              <Masthead  cookies={cookies}/>
              <Testboard cookies={cookies}/>
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
