import React, {useState,useLayoutEffect} from 'react';
import { Button,Tag,Table,Modal,Space,Input } from 'antd';

import { useHistory,useParams } from "react-router-dom";

import "./AccuracyTestReport.css"
import "antd/dist/antd.css";

import { authtoken,resetAuthToken } from './globals'
import backend from "./backend"
import axios from 'axios'

import notif from "./notification"
import endpoints from "./endpoints"


function AccuracyTestReport(props) {

	authtoken.use()

	let { testboardID,testID } = useParams();

	const [test, setTestDetails] = useState({});
	const [hits, setHits] = useState([]);
	
	const history = useHistory();
	
	const { TextArea } = Input;

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [modalOutput1, setModalOutput1] = useState("");
	const [modalOutput2, setModalOutput2] = useState("");
	const [modalTitle, setModalTitle] = useState("");

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const updateModalData = (record,e,title) => {

		console.log(record)
		// console.log(e.target.parentNode.getAttribute("index"))

		var text1 = JSON.stringify(JSON.parse(record[e.target.parentNode.getAttribute("text1")]),undefined, 2)
		var text2 = JSON.stringify(JSON.parse(record[e.target.parentNode.getAttribute("text2")]),undefined, 2)
		
		setModalOutput1(text1)
		setModalOutput2(text2)

		setModalTitle(title)
		showModal()
	}

	const getTestDetails = () => {
		let payload = {
			testID : testID,
			testboardID:testboardID
		}
		axios.post(backend.functionalTestDetails,payload,
		{ 
			headers: {"Authorization" : props.cookies.get('token')}
		})
		.then(function (response) {
			// console.log(response.data.test)
			setTestDetails(response.data.test)
		})
		.catch(function (error) {
		
			if (error.response !== undefined){
				if (error.response.status === 400){
		            notif.error(error.response.data.message)
	            }

	            if (error.response.status === 401){
	            	// notif.error(error.response.data.message);
	            	props.cookies.set('token', '', { path: '/' });
		            resetAuthToken();
		            history.push(endpoints.login);
	            }

	            if (error.response.status === 403){
	            	notif.error("Access denied");
	            }
	        }

		})

	}


	const getApiHits = () => {
		let payload = {
			testID : testID,
			testboardID:testboardID
		}
		axios.post(backend.listApiHits,payload,
		{ 
			headers: {"Authorization" : props.cookies.get('token')}
		})
		.then(function (response) {
			// console.log(response.data.hits)
			setHits(response.data.hits)
		})
		.catch(function (error) {
		
			if (error.response !== undefined){
				if (error.response.status === 400){
		            notif.error(error.response.data.message)
	            }

	            if (error.response.status === 401){
	            	// notif.error(error.response.data.message);
	            	props.cookies.set('token', '', { path: '/' });
		            resetAuthToken();
		            history.push(endpoints.login);
	            }

	            if (error.response.status === 403){
	            	notif.error("Access denied");
	            }
	        }

		})

	}

	useLayoutEffect(() => {
		getTestDetails()
		getApiHits()
	}, []);

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	var columns = [
	  {
	    title: '#',
	    dataIndex: 'key',
	    key: 'key',
	    sorter: (a, b) => parseInt(a.key) - parseInt(b.key)
	  }]

	if (test.testboard){
		for (var i = 0; i < test.testboard.requests.length; i++) {
			var ii = (i+1).toString()
			columns = columns.concat(
				[
					{
					  	title: 'Request '+(i+1).toString(),
					  	children:[
						  {
						    title: 'Full Request & Response Body',
						    key: 'requestBody'+(i+1).toString(),
						    render: (text, record) => (
						      <Space size="middle">
						        <Button type="link" 
						        	text1={'requestBody'+ii} 
						        	text2={'responseBody'+ii} onClick={(e) => updateModalData(record,e,"API Request & Response Body")}>Show request & response</Button>
						      </Space>
						    ),
						  },
						  {
						    title: 'Response Code',
						    dataIndex: 'responseCode'+ii,
						    key: 'responseCode'+ii,
						  }]
					  }
				]
				)	
		}	
	}
	
	  
	columns = columns.concat([
		{
			title: 'Total Response Time',
		    dataIndex: 'totalResponseTime',
		    key: 'totalResponseTime',
		    render:(text)=>text
		},
		{
			title: 'Response Variables',
			key: "responseVariables",
			render: (text, record) => (
			  <Space size="middle">
			    <Button type="link" 
			    	text1="expectedResponseVariables"
			    	text2="receivedResponseVariables" 
			    	onClick={(e) => updateModalData(record,e,"API Response Variables (Expected vs Received)")}>Compare Input/Output</Button>
			  </Space>
			)
		},
		{
		    title: 'Result',
		    dataIndex: 'result',
		    key: 'result',
		    filters: [
		      {
		        text: 'PASS',
		        value: true,
		      },
		      {
		        text: 'FAIL',
		        value: false,
		      }
		    ],
		    onFilter:(value, record) => record.result == value,
		    render: status => {
		    	let color = ""
		    	let value = ""
		    	if (status === true) {
		            color = 'green';
		            value = 'PASS'
		        }
		        else if (status === false) {
		            color = 'red';
		            value = "FAIL"
		        }
		        return (
		            <Tag color={color} key={status}>
		              {value}
		            </Tag>
		          );
		    }
		},
		{
			title: 'Remarks',
			dataIndex: 'remarks',
			key: 'remarks',
		}
	]);


	function statusTag(status) {
    	let color = "blue"
    	if (status === 'running') {
            color = 'green';
        }
        else if (status === 'completed') {
            color = 'gold';
        }
        else if (status === 'stopped') {
            color = 'red';
        }
        else if (status === 'ready') {
            color = 'blue';
        }
        
        return (
            <Tag color={color} key={status}>
              {status.toUpperCase()}
            </Tag>
          );
    }

    function envTag(environment) {
	    	let color = "#38b000"
	    	if (environment === 'production') {
	            color = '#FB3640';
	        }
	        else if (environment === 'preproduction') {
	            color = '#F85E00';
	        }
	        else if (environment === 'staging') {
	            color = '#2EC0F9';
	        }
	        else if (environment === 'development') {
	            color = '#44AF69';
	        }

	        return (
	            <Tag color={color}>
	              {environment.toUpperCase()}
	            </Tag>
	          );
	    }


	return (
		<div className="accuracytestreport-holder">

			{test.testboard ?
				<div className="accuracytestreport-content">
					
					<div className="accuracytestreport-title">
						Functional Test Report
					</div>

					<div className="accuracytestreport-testboard-details">

						<div className="accuracytestreport-sub-title">
							Testboard Details
						</div>

						<div className="accuracytestreport-key-value">
							<div className="accuracytestreport-key" >
								Testboard Name:
							</div>
							<div className="accuracytestreport-value">
								<a  className="accuracytestreport-link" target="_blank" rel="noreferrer" href={endpoints.host+endpoints.getTestboardPrefix+testboardID}>
									{test.testboard.apiName}
								</a>
							</div>
						</div>

						<div className="accuracytestreport-key-value">
							<div className="accuracytestreport-key-value">
								<div className="accuracytestreport-key" >
									Testboard Type:
								</div>
								<div className="accuracytestreport-value">
									{test.testboard.apiTypeName}
								</div>
							</div>

							<div className="accuracytestreport-key-value">
								<div className="accuracytestreport-key" >
									Testboard Environment:
								</div>
								<div className="accuracytestreport-value">
									{envTag(test.testboard.apiEnvironment)}
								</div>
							</div>
						</div>

						<div className="accuracytestreport-sub-title">
							Test Details
						</div>

						<div className="accuracytestreport-key-value">

							<div className="accuracytestreport-key-value">
								<div className="accuracytestreport-key" >
									Test start time:
								</div>
								<div className="accuracytestreport-value">
									{test.startTime}
								</div>
							</div>

							<div className="accuracytestreport-key-value">
								<div className="accuracytestreport-key" >
									Test end time:
								</div>
								<div className="accuracytestreport-value">
									{test.endTime}
								</div>
							</div>

							<div className="accuracytestreport-key-value">
								<div className="accuracytestreport-key" >
									Test run duration:
								</div>
								<div className="accuracytestreport-value">
									{test.duration}
								</div>
							</div>

						</div>

						<div className="accuracytestreport-key-value">

							<div className="accuracytestreport-key-value">
								<div className="accuracytestreport-key" >
									Number of test cases:
								</div>
								<div className="accuracytestreport-value">
									{test.totalCasesCount}
								</div>
							</div>

							<div className="accuracytestreport-key-value">
								<div className="accuracytestreport-key" >
									Test status:
								</div>
								<div className="accuracytestreport-value">
									{statusTag(test.testStatus)}
								</div>
							</div>
						</div>

						<div className="accuracytestreport-sub-title">
							API Request Template
						</div>

						{
							test.testboard.requests.map(
								(item,index) => (
									<div key={index}>	
										<div className="accuracytestreport-small-title">
											{"Request "+(index+1).toString()}
										</div>
										<div className="accuracytestreport-key-value">
											<div className="accuracytestreport-key-value">
												<div className="accuracytestreport-key" >
													HTTP Method:
												</div>
												<div className="accuracytestreport-value">
													{item.apiHttpMethod}
												</div>
											</div>

											<div className="accuracytestreport-key-value">
												<div className="accuracytestreport-key" >
													Endpoint:
												</div>
												<div className="accuracytestreport-value">
													{item.apiEndpoint}
												</div>
											</div>
										</div>
										<div className="accuracytestreport-key-value">
											<div className="accuracytestreport-key" >
												HTTP Headers:
											</div>
											<div className="accuracytestreport-value">
												{item.apiHeader.map((item,index) => {
													return (
														<div key={index}>
															<br/>
															{item[0] + " : " + item[1]}
														</div>
														)
												})}
											</div>
										</div>
										<div className="accuracytestreport-key-value">
											<div className="accuracytestreport-key-value">
												<div className="accuracytestreport-key" >
													API Input Type:
												</div>
												<div className="accuracytestreport-value">
													{item.apiInputDataType}
												</div>
											</div>

											<div className="accuracytestreport-key-value">
												<div className="accuracytestreport-key" >
													Request Body Type:
												</div>
												<div className="accuracytestreport-value">
													{item.apiRequestBodyType}
												</div>
											</div>

											<div className="accuracytestreport-key-value">
												<div className="accuracytestreport-key" >
													Response Body Type:
												</div>
												<div className="accuracytestreport-value">
													{item.apiResponseBodyType}
												</div>
											</div>
										</div>
										<div className="accuracytestreport-key-value">
											<div className="accuracytestreport-key" >
												Request Body:
											</div>
											<div className="accuracytestreport-value">
												{item.apiRequestBody}
											</div>
										</div>
										<div className="accuracytestreport-key-value">
											<div className="accuracytestreport-key" >
												Response Body:
											</div>
											<div className="accuracytestreport-value">
												{item.apiResponseBody}
											</div>
										</div>
										<br/>
									</div>

							))	
						}

						<div className="accuracytestreport-sub-title">
							Test Metrics
						</div>
						<div className="accuracytestreport-key-value">
							<div className="accuracytestreport-key" >
								Passed cases:
							</div>
							<div className="accuracytestreport-value">
								{test.passedCasesCount}
							</div>
						</div>
						<div className="accuracytestreport-key-value">
							<div className="accuracytestreport-key" >
								Failed cases:
							</div>
							<div className="accuracytestreport-value">
								{test.failedCasesCount}
							</div>
						</div>
						
						<div className="accuracytestreport-sub-title">
							API Hits
						</div>

					    <Table className="accuracytestreport-table" columns={columns} dataSource={hits} />

					    <Modal width={"80%"} title={modalTitle} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
							<div className="accuracytestreport-horizontal-holder">
								<div style={{width:"100%", margin:"10px"}}>
									<span>Input</span>
									<TextArea rows={20} value={modalOutput1} />
								</div>

								<div style={{width:"100%",margin:"10px"}}>
									<span>Output</span>
									<TextArea rows={20} value={modalOutput2} /> 
								</div>
								
							</div>
							
						</Modal>

					</div>
				</div>
			: null }

		</div>
	)

}

export default AccuracyTestReport

