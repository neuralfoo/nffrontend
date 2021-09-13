import React from 'react';
import { Table, Tag, Space, Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

import "./Dashboard.css"
import "antd/dist/antd.css";

import { authtoken } from './globals'



function Dashboard(props) {

	const auth = authtoken.use()

	// console.log(auth)
	// console.log("dashboard Current auth token:",props.cookies.get('token'))

	const history = useHistory();

	const createNewTest = () => {
		history.push('/test/new'); 
	}


	const columns = [
	  {
	    title: 'Test No.',
	    dataIndex: 'testno',
	    key: 'testno',
	    sorter: (a, b) => parseInt(a.testno) - parseInt(b.testno)
	  },
	  {
	    title: 'API Name',
	    dataIndex: 'apiname',
	    key: 'apiname',

	  },
	  {
	    title: 'Environment',
	    dataIndex: 'environment',
	    key: 'environment',
	    render: environment => {
	    	let color = "#38b000"
	    	if (environment === 'production') {
	            color = '#147df5';
	        }
	        else if (environment === 'preproduction') {
	            color = '#90be6d';
	        }
	        else if (environment === 'staging') {
	            color = '#f8961e';
	        }
	        else if (environment === 'development') {
	            color = '#f94144';
	        }

	        return (
	            <Tag color={color}>
	              {environment.toUpperCase()}
	            </Tag>
	          );
	    },
	    onFilter:(value, record) => record.environment.includes(value),
	    filters: [
	      {
	        text: 'DEVELOPMENT',
	        value: 'development',
	      },
	      {
	        text: 'STAGING',
	        value: 'staging',
	      },
	      {
	        text: 'PREPRODUCTION',
	        value: 'preproduction',
	      },
	      {
	        text: 'PRODUCTION',
	        value: 'production',
	      }]
	  },
	  {
	    title: 'Last Run on',
	    dataIndex: 'lastrunon',
	    key: 'lastrunon',
	  },
	  {
	    title: 'Status',
	    dataIndex: 'status',
	    key: 'status',
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
	    },
	  },
	  {
	    title: 'Action',
	    key: 'action',
	    render: (text, record) => (
	      <Space size="middle">
	        <a href="/test/open">Open</a>
	      </Space>
	    ),
	  },
	];


	const data = [
	  {
	    key: '1',
	    testno: '1',
	    apiname: 'ID Classification',
	    environment: 'staging',
	    lastrunon: '12-12-2021 12:12:12PM',
	    status: 'stopped',
	  },
	  {
	    key: '2',
	    testno: '2',
	    apiname: 'CIFAR Test',
	    environment: 'production',
	    lastrunon: '12-12-2021 12:12:12PM',
	    status: 'running',
	  },
	  {
	    key: '3',
	    testno: '3',
	    apiname: 'Image Net',
	    environment: 'preproduction',
	    lastrunon: '12-12-2021 12:12:12PM',
	    status: 'completed',
	  },
	  {
	    key: '4',
	    testno: '4',
	    apiname: 'Person Detection API',
	    environment: 'development',
	    lastrunon: '12-12-2021 12:12:12PM',
	    status: 'ready',
	  },
	];

	return (
		<div className="dashboard-holder">

			<div className="table-holder">
				<div className="dashboard-title">
					Testing Dashboard
				</div>

				<div className="dashboard-buttons">
					<Button icon={<PlusOutlined />} size="medium" className="dashboard-button" onClick={createNewTest}>
						Create New Test
					</Button>
				</div>

				<Table className="testdash-table" columns={columns} dataSource={data} />
			</div>


		</div>
		)

}

export default Dashboard