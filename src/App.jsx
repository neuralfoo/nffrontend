import './App.css';
import React from 'react';
import Login from './Login'
import Masthead from './Masthead'
import Dashboard from './Dashboard'
import Testboard from './Testboard'

import { authtoken } from './globals'

import Cookies from 'universal-cookie';

import endpoints from './endpoints';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";



function App() {

  authtoken.use()

  const cookies = new Cookies();

  return (
    <Router>

    <div className="App">

      <Switch>


      <Route path={endpoints.login}>
          {
            cookies.get('token') ?
              <Redirect to={endpoints.dashboard} />
              :
              <>
              <Masthead  cookies={cookies} hideNav={true}/>
              <Login  cookies={cookies}/>
              </>
          }
      </Route>

      <Route path={endpoints.dashboard}>
          {
            cookies.get('token') ? 
            <>
              <Masthead  cookies={cookies}/>
              <Dashboard  cookies={cookies}/>
            </>
            : 
            <Redirect to={endpoints.login} />
          }
      </Route>

      <Route path={endpoints.newTestboard}>
          {
            cookies.get('token') ? 
            <>
              <Masthead  cookies={cookies}/>
              <Testboard cookies={cookies} />
            </>
            : 
            <Redirect to={endpoints.login} />
          }
      </Route>

      <Route path={endpoints.getTestboard}>
          {
            cookies.get('token') ? 
            <>
              <Masthead  cookies={cookies}/>
              <Testboard cookies={cookies} />
            </>
            : 
            <Redirect to={endpoints.login} />
          }
      </Route>

      <Route exact path="/">
          <Masthead  cookies={cookies}/>
      </Route>

      <Route path="*">
        <>
          <Masthead  cookies={cookies}/>
          404 - Page Not Found
        </>
      </Route>

      </Switch>
    </div>

    </Router>
  );
}

export default App;
