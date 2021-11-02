import React from 'react';
import "./Masthead.css"

// import { NavLink } from "react-router-dom";
import { authtoken, resetAuthToken } from './globals'
import { NavLink,useHistory } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import endpoints from "./endpoints"


function Masthead(props) {

	const auth = authtoken.use()
	const history = useHistory();

	// const [localauth, setLocalauth] = useState(auth);

	var logout = () => {
		// console.log(props.cookies.get('token'))
		// console.log("Masthead Current auth token:",props.cookies.get('token'))
		
		// console.log("Masthead Reset auth token:",props.cookies.get('token')) 
		props.cookies.set('token', '', { path: '/' });
		resetAuthToken();
		history.push(endpoints.login);
	}

	// useEffect(() => {
	// 	setLocalauth(props.cookies.get('token'))
	// },[props.cookies.get('token')])

	return (
		<div className="masthead-holder">
			<NavLink to="/" className="masthead-title">Neural Foo</NavLink>
			
			{
				(auth === "" || auth === undefined) ? 
				<NavLink to="/login" activeClassName="masthead-nav-link-active" className="masthead-nav-link">Login</NavLink>
				 :
				<div className="masthead-nav">
					<NavLink to="/dashboard" activeClassName="masthead-nav-link-active" className="masthead-nav-link">Dashboard</NavLink> 
					<NavLink to="/account" activeClassName="masthead-nav-link-active" className="masthead-nav-link">Account</NavLink> 
					|
					<button className="masthead-nav-link" onClick={logout}>Logout</button>
					<ToastContainer />
				</div>
			}			
			
		</div>
		)

}

export default Masthead