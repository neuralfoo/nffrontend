import React, {useState,useLayoutEffect} from 'react';
import { Table,Space,Modal, Button,Typography } from 'antd';

import { useHistory } from "react-router-dom";

import "./AccuracyTestCasesTable.css"
import "antd/dist/antd.css";

import { authtoken,resetAuthToken } from './globals'
import backend from "./backend"
import axios from 'axios'
import notif from "./notification"

import endpoints from "./endpoints"

import CodeEditor from '@uiw/react-textarea-code-editor';

function AccuracyTestCasesTable(props) {

	authtoken.use()

	const history = useHistory();

	const [testcases, setTestcases] = useState([]);

	const [isModalVisible, setIsModalVisible] = useState(false);
	
	const [modalType, setModalType] = useState("create");
	
	const [testcaseRequest, setTestcaseRequest] = useState("");
	const [testcaseResponse, setTestcaseResponse] = useState("");
	const [editTestcaseID, setEditTestcaseID] = useState("");

	const { Text, Link } = Typography;	

	const showCreateModal = () => {
		setTestcaseRequest("")
		setTestcaseResponse("")
		setModalType("create")
		showModal()
	};

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {

		if (modalType === "create") {
			addTestCaseAPI()	
		} 
		else {
			editTestcaseAPI()
		}

		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};



	const getTestCasesForTestboard = () => {
  	
	  	const payload = {testboardID:props.testboardID};

	    axios.post(backend.getAccuracyTestcases, payload,
    		{ 
    			headers: {"Authorization" : props.cookies.get('token')}
    		} 
    	)
        .then(response => { 
        	// console.log(response.data.files)
        	setTestcases(response.data.testcases)
        })
        .catch(error => {
            
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
            } 
        });
	}


	function deleteTestcase(testcaseID) {
		const payload = {testboardID:props.testboardID,testcaseID:testcaseID};

	    axios.post(backend.deleteAccuracyTestcase, payload,
    		{ 
    			headers: {"Authorization" : props.cookies.get('token')}
    		} 
    	)
        .then(response => {
        	notif.success("Testcase deleted.")
        	getTestCasesForTestboard()
        })
        .catch(error => {
            
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
            } 
        });
	}

	function editTestcase(record){
		setTestcaseRequest(record["requestVariables"])
		setTestcaseResponse(record["responseVariables"])
		setModalType("edit")
		setEditTestcaseID(record["testcaseID"])
		showModal()
	}

	function addTestCaseAPI(){

		const payload = {
			testboardID:props.testboardID,
			requestVariables:testcaseRequest,
			responseVariables:testcaseResponse
		};


	    axios.post(backend.addAccuracyTestcase, payload,
    		{ 
    			headers: {"Authorization" : props.cookies.get('token')}
    		} 
    	)
        .then(response => {
        	notif.success("Testcase saved.")
        	getTestCasesForTestboard()
        })
        .catch(error => {
            
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
            } 
        });
	}

	function editTestcaseAPI() {

		const payload = {
			testboardID:props.testboardID,
			testcaseID:editTestcaseID,
			requestVariables:testcaseRequest,
			responseVariables:testcaseResponse
		};


	    axios.post(backend.editAccuracyTestcase, payload,
    		{ 
    			headers: {"Authorization" : props.cookies.get('token')}
    		} 
    	)
        .then(response => {
        	notif.success("Testcase saved.")
        	getTestCasesForTestboard()
        })
        .catch(error => {
            
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
            } 
        });
	}

	useLayoutEffect(() => {
		getTestCasesForTestboard()
	},[]);


	const columns = [
	  {
	    title: '#',
	    dataIndex: 'key',
	    key: 'key',
	    sorter: (a, b) => parseInt(a.key) - parseInt(b.key)
	  },
	  {
	    title: 'Request variables',
	    dataIndex: 'requestVariables',
	    key: 'requestVariables',
	    width: "40%"
	  },
	  {
	    title: 'Response variables',
	    dataIndex: 'responseVariables',
	    key: 'responseVariables',
	    width: "40%"
	  },
	  {
	    title: 'Actions',
	    key: 'actions',
	    width:200,
	    render: (text, record) => (
	      <Space size="middle">
	        <Button type="link" onClick={() => editTestcase(record)}>Edit</Button>
	        <Button type="link" onClick={() => deleteTestcase(record["testcaseID"])}>Delete</Button>
	      </Space>
	    ),
	  },
	];


	return (
			
		<div className="accuracytestcasestable-holder">
			<div className="accuracytestcasestable-horizontal-holder">
				<div className="accuracytestcasestable-title">
					Accuracy Test Cases
				</div>

				<div className="accuracytestcasestable-upload-holder">
					<Button type="default" onClick={showCreateModal}>
				    	Add Test Case 
				    </Button>
				</div>
			</div>

		    <Modal title={ modalType==="create" ? "Create new test case" : "Edit test case"} 
				visible={isModalVisible}
				onOk={handleOk}
				width="70%"
				onCancel={handleCancel}
				footer={[
				<Button key="back" onClick={handleCancel}>
				  Cancel
				</Button>,
				<Button key="submit" type="primary" onClick={ handleOk }>
					{modalType==="create" ? "Add test case" : "Save test case" }
				</Button>
				]}
				>
				
				<div className="accuracytestcasestable-modal-horizontal-holder">

					<div className="accuracytestcasestable-modal-input-holder">
						<Text>Request Variables (as JSON):</Text>
						<CodeEditor
									value={testcaseRequest} 
									onChange = {(e) => setTestcaseRequest(e.target.value)} 
									
									language="json"
									placeholder='{ "url":"example.com/dog.jpg" }'
									padding={15}
									className="accuracytestcasestable-modal-input"
									style={{fontSize: 14,fontFamily:"monospace"}}
								/>

					</div>

					<div className="accuracytestcasestable-modal-input-holder">
						<Text>Response Variables (as JSON):</Text>
						<CodeEditor
									value={testcaseResponse} 
									onChange = {(e) => setTestcaseResponse(e.target.value)} 
									
									language="json"
									placeholder='{ "prediction":"dog" }'
									padding={15}
									className="accuracytestcasestable-modal-input"
									style={{fontSize: 14,fontFamily:"monospace"}}
								/>
					</div>
				</div>
			</Modal>
		    <Table className="accuracytestcasestable-table" 
		    	pagination={{ pageSize: 5}}
		    	columns={columns} 
		    	dataSource={testcases} />
		</div>
	)

}

export default AccuracyTestCasesTable

