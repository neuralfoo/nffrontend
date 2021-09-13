import React from 'react';
import "./Masthead.css"

// import { NavLink } from "react-router-dom";
import { authtoken, resetAuthToken } from './globals'
import { useHistory,NavLink } from "react-router-dom";


function Masthead(props) {

	const auth = authtoken.use()
	const history = useHistory();

	// const [localauth, setLocalauth] = useState(auth);

	var logout = () => {
		// console.log("Masthead Current auth token:",props.cookies.get('token'))
		props.cookies.set('token', '', { path: '/' });
		resetAuthToken();
		// console.log("Masthead Reset auth token:",props.cookies.get('token'))
		history.push('/login'); 
	}

	return (
		<div className="masthead-holder">
			<NavLink to="/" className="masthead-title">Neural Foo</NavLink>
			<div className="masthead-nav">

				{
					props.hideNav ? null :
					<NavLink to="/dashboard" className="masthead-nav-link">Dashboard</NavLink>
				}
				{
					props.cookies.get('token') ? 
					<button className="masthead-nav-link" onClick={logout}>Logout</button> : 
					null 
				}
				{
					props.cookies.get('token') === undefined && props.hideNav ?
					<NavLink to="/login" className="masthead-nav-link">Login</NavLink> : null
				}
						
				
			</div>
		</div>
		)

}

export default Masthead