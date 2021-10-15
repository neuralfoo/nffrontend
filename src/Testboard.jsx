import React, {useState,useEffect} from 'react';
import { Input,Select,Button,Radio } from 'antd';

import { PlusOutlined, MinusSquareOutlined } from '@ant-design/icons';
import { useHistory,useParams } from "react-router-dom";

import "./Testboard.css"
import "antd/dist/antd.css";

import { authtoken,resetAuthToken } from './globals'
import backend from "./backend"
import axios from 'axios'

import sendErrorNotification from "./notification"

import Request from "./Request"

function Testboard(props) {

	authtoken.use()
 	


	let { testboardID } = useParams();

	const [testboard, setTestboard] = useState({});
	const [testboardReceived, setTestboardReceived] = useState(false);
	const [testboardEdited, setTestboardEdited] = useState(false);
	
	const [executeOnce, setExecuteOnce] = useState(false);


	const history = useHistory();

	const [apiName, setApiName] = useState("");
	const [apiRequests, setApiRequests] = useState([]);

	
	const newRequest = () => {

		var r = {}
		r.apiEndpoint = ""
		r.apiHeader = []
		r.apiInputDataType = null
		r.apiRequestBodyType = null
		r.apiResponseBodyType = null
		r.apiResponseBody = ""
		r.apiRequestBody = ""
		r.apiHttpMethod = null
		setApiRequests([...apiRequests,r])
		setTestboardEdited(true)
	}

	const removeRequest = (i) => {
	    let newArr = [...apiRequests]
	    newArr.splice(parseInt(i),1)

	    setApiRequests(newArr)
		setTestboardEdited(true)
	}


	const changeRequestParam = (i,p,v) => {
		var r = apiRequests
		r[i][p] = v
		setApiRequests(r)

	}

	const initValues = (response) => {

		setTestboard(response.data.testboard);
		setApiName(response.data.testboard.apiName);
		// setApiRequests(response.data.testboard.apiRequests);
	}

	const getTestboard = () => {
		if (testboardID !== undefined && testboardReceived === false){

			axios.get(backend.getTestboard+testboardID,{ 
		    			headers: {"Authorization" : props.cookies.get('token')}
		    		})
			.then(function (response) {
				
				setTestboardReceived(true)
				initValues(response)
			})
			.catch(function (error) {
			
				if (error.response.status === 400){
		            sendErrorNotification(error.response.data.message)
	            }

	            if (error.response.status === 401){
	            	// sendErrorNotification(error.response.data.message);
	            	props.cookies.set('token', '', { path: '/' });
		            resetAuthToken();
	            }
			})
		}
	}

	useEffect(() => {

		if (executeOnce === false) {
			if (testboardID === undefined){
				newRequest()			
			}
			setExecuteOnce(true)
		}

		getTestboard()
	});


	const onChangeApiName = (e) => {
		onFieldChange(e,"apiName") 
		setApiName(e.target.value)
		setTestboardEdited(true)
	}


	const onFieldChange = (e,f) => {


	    let temp = testboard

		if (typeof e == "string"){
			temp[f] = e
		}
		else{
		    temp[f] = e.target.value
		}

	    setTestboard(temp)
		setTestboardEdited(true)


	}


	const createTestboard = () => {
	  	
	  	const payload = testboard;
	    axios.post(backend.createTestboard, payload,
	    		{ 
	    			headers: {"Authorization" : props.cookies.get('token')}
	    		} 
	    	)
	        .then(response => { 

	        	history.push('/testboard/details/'+response.data.id); 
	        })
	        .catch(error => {
	            
	            if (error.response.status === 400){
		            sendErrorNotification(error.response.data.message)
	            }

	            if (error.response.status === 401){
	            	// sendErrorNotification(error.response.data.message);
	            	props.cookies.set('token', '', { path: '/' });
		            resetAuthToken();
	            }
	        });
  	}

  	const updateTestboard = () => {
	  	
	  	const payload = testboard;
	    axios.post(backend.updateTestboard, payload,
	    		{ 
	    			headers: {"Authorization" : props.cookies.get('token')}
	    		} 
	    	)
	        .then(response => { 
	        	// history.push('/testboard/details/'+response.data.id);
	        	setTestboardEdited(false) 
	        })
	        .catch(error => {
	            
	            if (error.response.status === 400){
		            sendErrorNotification(error.response.data.message)
	            }

	            if (error.response.status === 401){
	            	// sendErrorNotification(error.response.data.message);
	            	props.cookies.set('token', '', { path: '/' });
		            resetAuthToken();
	            }
	        });
  	}

  	const discardTestboard = () => {
  		history.push('/dashboard'); 
  	}




	const { Option } = Select;


	return (
		<div className="testboard-holder">

			<div className="testboard-container">

				<div className="testboard-title">
					{apiName} Testboard
				</div>

				<div className="testboard-key-value-holder">
					<div className="testboard-keyname">
						API Name
					</div>
					<div className="testboard-valuename">
						<Input 
							placeholder="Type your API name here ..." 
							size="large" className="testboard-input" 
							value={testboard ? testboard.apiName : "" } 
							onChange = {onChangeApiName} bordered={true} />
					</div>
				</div>


				<div className="testboard-horizontal-holder">
					<div className="testboard-key-value-holder">
						<div className="testboard-keyname">
							API Type
						</div>
						<div className="testboard-valuename">
							<Select 
								placeholder="What does it do" size="medium" 
								className="testboard-select" 
								value={testboard ? testboard.apiType : "" } 
								onChange = {(evn) => onFieldChange(evn,"apiType")} >

								<Option value="imageclassification">Image Classification</Option>
								<Option value="imagesegmentation">Image Segmentation</Option>
								<Option value="objectdetection">Object Detection</Option>
							</Select>
						</div>
					</div>


					<div className="testboard-key-value-holder">
						<div className="testboard-keyname">
							API Environment
						</div>
						<div className="testboard-valuename">
							<Select 
								placeholder="Where is it hosted" size="medium" 
								className="testboard-select"  
								value={testboard ? testboard.apiEnvironment : "" } 
								onChange = {(evn) => onFieldChange(evn,"apiEnvironment")} >

								<Option value="development">Development</Option>
								<Option value="staging">Staging</Option>
								<Option value="preproduction">Preproduction</Option>
								<Option value="production">Production</Option>
							</Select>
						</div>
					</div>
				</div>

				{
					
					apiRequests.map((item,index) => (
							<Request key={index} index={index} data={item} removeRequest={removeRequest} onChange={changeRequestParam} setTestboardEdited={setTestboardEdited} />
					))

				}
				
				<Button className="add-request-button" 
						icon={<PlusOutlined />} size="medium" onClick={newRequest}>
					Add Request
				</Button>

				{
					testboardID ?
				
					<div className="testboard-horizontal-holder testboard-button-holder">
						<Button type="primary" 
								className="create-testboard-button" 
								onClick={updateTestboard} 
								disabled={testboardEdited ? false : true} >
								Save Changes
						</Button>
					</div>	

				:			
					<div className="testboard-horizontal-holder testboard-button-holder">
						<Button type="primary" 
								className="create-testboard-button" 
								onClick={createTestboard} >
								Create Testboard
						</Button>
						<Button className="discard-testboard-button" onClick={discardTestboard} >Discard</Button>
					</div>

				}
			</div>

		</div>
	)

}

export default Testboard

