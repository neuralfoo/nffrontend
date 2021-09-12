import React from 'react';
import "./Dashboard.css"
import { authtoken } from './globals'


function Dashboard(props) {

	const auth = authtoken.use()

	// console.log(auth)
	// console.log("dashboard Current auth token:",props.cookies.get('token'))

	return (
		<div className="dashboard-holder">
		dashboard 
		</div>
		)

}

export default Dashboard