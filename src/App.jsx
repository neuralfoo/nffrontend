import './App.css';
import React,{useLayoutEffect} from 'react';
import Login from './Login'
import Masthead from './Masthead'
import Dashboard from './Dashboard'
import Testboard from './Testboard'

// import { Spin } from 'antd';

import { authtoken,setAuthToken } from './globals'

import Cookies from 'universal-cookie';

import endpoints from './endpoints';

// import backend from "./backend"
// import axios from 'axios'
// import sendErrorNotification from "./notification"

// import { useHistory } from "react-router-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";



function App() {

  authtoken.use()

  const cookies = new Cookies();

  // const history = useHistory();

  useLayoutEffect(() => {
    setAuthToken(cookies.get('token'))
    document.title = "Neural Foo"
    // console.log("Reloading app")
  }, []);

  return (

    <Router>
      <div className="App">
        <Masthead  cookies={cookies}/>
        <Switch>
          <Route path={endpoints.login}>
            <Login  cookies={cookies}/>
          </Route>

          <Route path={endpoints.dashboard}>      
              <Dashboard  cookies={cookies}/>
          </Route>

          <Route path={endpoints.newTestboard}>
            <Testboard cookies={cookies} /> 
          </Route>

          <Route path={endpoints.getTestboard}>
            <Testboard cookies={cookies} />
          </Route>

          <Route exact path="/">
            Home
          </Route>

          <Route path="*">
              404 - Page Not Found
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
