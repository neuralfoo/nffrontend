import React, {useState,useLayoutEffect} from 'react';
import { Table,Space,Button,Tag } from 'antd';

import {
  ReloadOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  CoffeeOutlined,
  PauseCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

import { useHistory } from "react-router-dom";

import "./GeneralAccuracyTable.css"
import "antd/dist/antd.css";

import { authtoken,resetAuthToken } from './globals'
import backend from "./backend"
import axios from 'axios'
import notif from "./notification"

import endpoints from "./endpoints"




function GeneralAccuracyTable(props) {

	authtoken.use()
	const history = useHistory();
	const [tests, setTests] = useState([]);


	const getAccuracyTests = () => {
		
		let payload = {
			testboardID:props.testboardID
		}

		axios.post(backend.getImgClfAccuracyTests,payload,
				{ 
	    			headers: {"Authorization" : props.cookies.get('token')}
	    		})
		.then(function (response) {
			// console.log(response.data.tests)
			setTests(response.data.tests)
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

	const runAccuracyTest = () => {

		let payload = {
			testboardID:props.testboardID,
			action:"start",
			accuracyTestID:""
		}

		axios.post(backend.runAccuracyTestImgClf, payload,
    		{ 
    			headers: {"Authorization" : props.cookies.get('token')}
    		} 
    	)
        .then(response => { 
        	// history.push(endpoints.getTestboardPrefix+response.data.id);
        	notif.success(response.data.message)
        	getAccuracyTests()
        })
        .catch(error => {
            
            if (error.response !== undefined){
	            if (error.response.status === 400){
		            notif.error(error.response.data.message)
	            }

	            if (error.response.status === 401){
	            	props.cookies.set('token', '', { path: '/' });
		            resetAuthToken();
		            history.push(endpoints.login);
	            }
        	}
        });
	}

	const deleteTest = (testID) => {
		let payload = {
			testID:testID,
			testboardID:props.testboardID
		}

		axios.post(backend.deleteTest, payload,
    		{ 
    			headers: {"Authorization" : props.cookies.get('token')}
    		} 
    	)
        .then(response => { 
        	// history.push(endpoints.getTestboardPrefix+response.data.id);
        	notif.success(response.data.message)
        	getAccuracyTests()
        })
        .catch(error => {
            
            if (error.response !== undefined){
	            if (error.response.status === 400){
		            notif.error(error.response.data.message)
	            }

	            if (error.response.status === 401){
	            	props.cookies.set('token', '', { path: '/' });
		            resetAuthToken();
		            history.push(endpoints.login);
	            }
        	}
        });
	}

	useLayoutEffect(()=>{
		// getAccuracyTests()
	},[])


	const columns = [
	  {
	    title: '#',
	    dataIndex: 'key',
	    key: 'key',
	    sorter: (a, b) => parseInt(a.key) - parseInt(b.key)
	  },
	  {
	    title: 'Start time',
	    dataIndex: 'startTime',
	    key: 'startTime',
	  },
	  {
	    title: 'Duration',
	    dataIndex: 'duration',
	    key: 'duration',
	  },
	  {
	    title: '# Test Cases',
	    dataIndex: 'testImagesCount',
	    key: 'testImagesCount'
	  },
	  {
	    title: 'Accuracy',
	    dataIndex: 'accuracy',
	    key: 'accuracy',
	    render:(text) => text ? text.toString()+"%" : "-"
	  },
	  {
	    title: 'Status',
	    dataIndex: 'testStatus',
	    key: 'testStatus',
	    filters: [
	      {
	        text: 'STOPPED',
	        value: 'stopped',
	      },
	      {
	        text: 'RUNNING',
	        value: 'running',
	      },
	      {
	        text: 'COMPLETED',
	        value: 'completed',
	      },
	      {
	        text: 'READY',
	        value: 'ready',
	      }
	    ],
	    onFilter:(value, record) => record.status.includes(value),
	    render: status => {
	    	let color = "blue"
	    	if (status === 'running') {
	            color = 'purple';
	            return (
		            <Tag icon={<SyncOutlined spin />} color={color} key={status}>
		              {status.toUpperCase()}
		            </Tag>
		          );
	        }
	        else if (status === 'completed') {
	            color = 'green';
	            return (
		            <Tag icon={<CheckCircleOutlined />} color={color} key={status}>
		              {status.toUpperCase()}
		            </Tag>
		          );
	        }
	        else if (status === 'stopped') {
	            color = 'red';
	            return (
		            <Tag icon={<ExclamationCircleOutlined />} color={color} key={status}>
		              {status.toUpperCase()}
		            </Tag>
		          );
	        }
	        else if (status === 'ready') {
	            color = 'gold';
	            return (
		            <Tag icon={<CoffeeOutlined />} color={color} key={status}>
		              {status.toUpperCase()}
		            </Tag>
		          );
	        }
	        
	        
	    },
	  },
	  {
	    title: 'Action',
	    key: 'action',
	    render: (text, record) => (
	      <Space size="middle">
	        <a target="_blank" rel="noreferrer" href={endpoints.host+endpoints.accuracyReportPrefix+props.testboardID+"/"+record["testID"]}>Open Report</a>
	        <Button type="link" onClick={() => deleteTest(record["testID"])}>Delete Test</Button>
	      </Space>
	    ),
	  },
	];

	return (
		<div className="generalaccuracytable-holder">
			<div className="generalaccuracytable-horizontal-holder">
				<div className="generalaccuracytable-title">
					Accuracy Tests
				</div>
				<div className="generalaccuracytable-upload-holder">
				    <Button className="generalaccuracytable-refresh-button" onClick={getAccuracyTests}>
				    	<ReloadOutlined /> Refresh Test List
				    </Button>
				    <Button type="primary" className="functionaltable-refresh-button" onClick={runAccuracyTest}>
				    	Run New Test
				    </Button>
				</div>
			</div>
		    <Table className="generalaccuracytable-table" columns={columns} dataSource={tests} />
		</div>
	)
}

export default GeneralAccuracyTable;

