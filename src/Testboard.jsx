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

import CodeEditor from '@uiw/react-textarea-code-editor';


function Testboard(props) {

	authtoken.use()
 	
	let { testboardID } = useParams();

	const [testboard, setTestboard] = useState({});
	const [testboardReceived, setTestboardReceived] = useState(false);
	const [testboardEdited, setTestboardEdited] = useState(false);


	const history = useHistory();

	const [apiName, setApiName] = useState("");
	const [apiHeader, setApiHeader] = useState([]);
	const [apiInputDataType, setApiInputDataType] = useState(null);
	const [apiRequestBodyType, setApiRequestBodyType] = useState(null);
	const [apiResponseBodyType, setApiResponseBodyType] = useState(null);


	const initValues = (response) => {

		setTestboard(response.data.testboard)
		setApiName(response.data.testboard.apiName)
		setApiHeader(response.data.testboard.apiHeader)
		setApiInputDataType(response.data.testboard.apiInputDataType)
		setApiRequestBodyType(response.data.testboard.apiRequestBodyType)
		setApiResponseBodyType(response.data.testboard.apiResponseBodyType)


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

		getTestboard()
	});


	const onChangeApiName = (e) => {
		onFieldChange(e,"apiName") 
		setApiName(e.target.value)
		setTestboardEdited(true)
	}

	const onChangeApiInputDataType = (e) => {
		onFieldChange(e,"apiInputDataType") 
		setApiInputDataType(e.target.value)
		setTestboardEdited(true)

	}

	const onChangeApiRequestBodyType = (e) => {
		onFieldChange(e,"apiRequestBodyType") 
		setApiRequestBodyType(e.target.value)
		setTestboardEdited(true)

	}

	const onChangeApiResponseBodyType = (e) => {
		onFieldChange(e,"apiResponseBodyType") 
		setApiResponseBodyType(e.target.value)
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


	const onHeaderNameChange = e => {

	    const { target: {value, name } } = e

	    let newArr = [...apiHeader]
	    newArr[parseInt(name)][0] = value

	    setApiHeader(newArr)
	    
	    let temp = testboard
	    temp.apiHeader = apiHeader
	    setTestboard(temp)
		setTestboardEdited(true)


	}

	const onHeaderValueChange = e => {
	    const { target: {value, name } } = e

	    let newArr = [...apiHeader]
	    newArr[parseInt(name)][1] = value
	    
	    setApiHeader(newArr)

	    let temp = testboard
	    temp.apiHeader = apiHeader
	    setTestboard(temp)
		setTestboardEdited(true)


	}
	 
	const addHeader = () => {
		setApiHeader(prev =>([
	        ...prev,
	        ["",""] 
	    ]))

	    let temp = testboard
	    temp.apiHeader = apiHeader
	    setTestboard(temp)

		setTestboardEdited(true)

	}

	const removeHeader = e => {

	    let newArr = [...apiHeader]
	    newArr.splice(parseInt(e),1)
	    setApiHeader(newArr)

	    let temp = testboard
	    temp.apiHeader = newArr
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


				<div className="testboard-horizontal-holder">
					<div className="testboard-key-value-holder">
						<div className="testboard-keyname">
							HTTP Method
						</div>
						<div className="testboard-valuename">
							<Select 
								placeholder="Method" size="medium" 
								className="testboard-input-httpmethod"  
								value={testboard ? testboard.apiHttpMethod : "" } 
								onChange = {(evn) => onFieldChange(evn,"apiHttpMethod")} >

								<Option value="GET">GET</Option>
								<Option value="POST">POST</Option>
								<Option value="PUT">PUT</Option>
								<Option value="DELETE">DELETE</Option>
							</Select>
						</div>
					</div>


					<div className="testboard-key-value-holder-fullwidth">
						<div className="testboard-keyname">
							API Endpoint
						</div>
						<div className="testboard-valuename-endpoint">
							<Input 
								placeholder="Type your API endpoint here ..." 
								size="large" className="testboard-input-endpoint" 
								value={testboard ? testboard.apiEndpoint : "" } 
								onChange = {(evn) => onFieldChange(evn,"apiEndpoint")}
								bordered={false} />
						</div>
					</div>

				</div>
				

				<div className="testboard-keyname">
					HTTP headers
				</div>

				{
					apiHeader.map((item,index) => (
						<div className="testboard-horizontal-holder" key={index}>
                        	<div className="testboard-key-value-holder">
								<div className="testboard-valuename">
									<Input 
										placeholder="key" 
										size="large" className="testboard-input-header" 
										bordered={true} name={index} value={item[0]} onChange={onHeaderNameChange}/>
								</div>
							</div>

							<div className="testboard-key-value-holder">
								<div className="testboard-valuename">
									<Input 
										placeholder="value" 
										size="large" className="testboard-input-header" 
										bordered={true} name={index} value={item[1]} onChange={onHeaderValueChange}/>
								</div>
							</div>

							<div className="testboard-icon-holder"> <MinusSquareOutlined name={index} onClick={() => removeHeader(index)} /> </div> 
						</div>
                	)) 
				}

				<Button className="add-header-button" type="dashed" 
						icon={<PlusOutlined />} size="medium" onClick={addHeader}>
					Add Header
				</Button>

				<div className="testboard-key-value-holder">
					<div className="testboard-keyname">
						API Input Type
					</div>
					<Radio.Group className="testboard-requestbodytype"
						value={apiInputDataType} 
						onChange = {onChangeApiInputDataType} >

					  <Radio value="url" className="testboard-radio-button-text">URL</Radio>
					  <Radio value="file" className="testboard-radio-button-text">File</Radio>
					  <Radio value="base64" className="testboard-radio-button-text">Base64</Radio>
					</Radio.Group>
				</div>

				<div className="testboard-key-value-holder">
					<div className="testboard-keyname">
						API Request Body
					</div>
					
					<Radio.Group className="testboard-requestbodytype" 
						value={apiRequestBodyType } 
						onChange = {onChangeApiRequestBodyType} 
						>
					  <Radio value="json" className="testboard-radio-button-text" >JSON</Radio>
					  <Radio value="formData" className="testboard-radio-button-text">Form-Data</Radio>
					  <Radio value="binary" className="testboard-radio-button-text">Binary</Radio>
					  <Radio value="none" className="testboard-radio-button-text">None</Radio>
					</Radio.Group>

					<CodeEditor
						value={testboard ? testboard.apiRequestBody : "" } 
						onChange = {(evn) => onFieldChange(evn,"apiRequestBody")} 
						
						language="json"
						placeholder="Type request body template here ..."
						padding={15}
						className="testboard-requestbody"
						style={{fontSize: 14,fontFamily:"monospace"}}
					/>
				</div>


				<div className="testboard-key-value-holder">
					<div className="testboard-keyname">
						API Response Body
					</div>
					<Radio.Group className="testboard-requestbodytype" 

						value={apiResponseBodyType} 
						onChange = {onChangeApiResponseBodyType}
						>
					  <Radio value="json" className="testboard-radio-button-text">JSON</Radio>
					  <Radio value="rawText" className="testboard-radio-button-text">Raw Text</Radio>
					</Radio.Group>
					<CodeEditor
						value={testboard ? testboard.apiResponseBody : "" } 
						onChange = {(evn) => onFieldChange(evn,"apiResponseBody")}
						
						language="json"
						placeholder="Type response body template here ..."

						padding={15}
						className="testboard-requestbody"
						style={{fontSize: 14,fontFamily:"monospace"}}
						
					/>
				</div>

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

