import React, {useState,useLayoutEffect} from 'react';
import { Table,Space,Button } from 'antd';

import { useHistory } from "react-router-dom";

import "./AccuracyTable.css"
import "antd/dist/antd.css";

import { authtoken,resetAuthToken } from './globals'
import backend from "./backend"
import axios from 'axios'
import notif from "./notification"

import endpoints from "./endpoints"




function AccuracyTable(props) {

	authtoken.use()
	const history = useHistory();
	const [tests, setTests] = useState([]);

	const runAccuracyTest = () => {
		
	}

	const deleteTest = (testID) => {

	}

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
	    title: '# Test Images',
	    dataIndex: 'imageCount',
	    key: 'imageCount'
	  },
	  {
	    title: 'Performance',
	    dataIndex: 'performance',
	    key: 'performance'
	  },
	  {
	    title: 'Action',
	    key: 'action',
	    render: (text, record) => (
	      <Space size="middle">
	        <a target="_blank" rel="noreferrer" href={endpoints.accuracyTestReport+record["testID"]}>Open Report</a>
	        <Button type="link" onClick={() => deleteTest(record["testID"])}>Delete Test</Button>
	      </Space>
	    ),
	  },
	];

	return (
		<div className="accuracytable-holder">
			<div className="accuracytable-horizontal-holder">
				<div className="accuracytable-title">
					Accuracy Tests
				</div>
				<div className="accuracytable-upload-holder">
					<Button type="primary" onClick={runAccuracyTest}>
				    	Run new test
				    </Button>
				</div>
			</div>
		    <Table className="accuracytable-table" columns={columns} dataSource={tests} />
		</div>
	)
}

export default AccuracyTable;

