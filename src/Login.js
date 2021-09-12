import React, { useState } from 'react';
import './Login.css';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Login(props) {
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // handle button click of login form
  const handleLogin = () => {
  	console.log("hitting login API")
  	
    history.push('/dashboard');
  }
 
  return (
    <div className="login-holder">

    	<div className="login-box">

	    	<div className="login-title">
	    		Login
	    	</div>
      
			<div>
				<TextField id="outlined-basic-email" type="text" {...username} label="Email ID" variant="outlined" autoComplete="new-password" />
			</div>

			<div style={{ marginTop: 10 }}>
				<TextField id="outlined-basic-password" type="password" {...password} autoComplete="new-password" label="Password" variant="outlined" />
			</div>
			
			{error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
			
			<Button variant="contained" disabled={loading} onClick={handleLogin} color="primary">
			  {loading ? 'Loading...' : 'Login'}
			</Button>
    	</div>
    </div>
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
 
export default Login;
