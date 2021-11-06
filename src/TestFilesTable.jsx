import React, {useState,useLayoutEffect} from 'react';
import { Table,Space,Modal, Button } from 'antd';

import { useHistory,NavLink } from "react-router-dom";

import "./TestFilesTable.css"
import "antd/dist/antd.css";

import { authtoken,resetAuthToken } from './globals'
import backend from "./backend"
import axios from 'axios'
import notif from "./notification"

import endpoints from "./endpoints"

import FileUpload from "./FileUpload"

function TestFilesTable(props) {

	authtoken.use()

	const history = useHistory();

	const [files, setFiles] = useState([]);

	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		getTestImagesForTestboard()
		setIsModalVisible(false);	
	};

	const handleCancel = () => {
		getTestImagesForTestboard()
		setIsModalVisible(false);
	};

	const getTestImagesForTestboard = () => {
  	
	  	const payload = {testboardID:props.testboardID};

	    axios.post(backend.getTestFiles, payload,
    		{ 
    			headers: {"Authorization" : props.cookies.get('token')}
    		} 
    	)
        .then(response => { 
        	setFiles(response.data.files)
        })
        .catch(error => {
            
            if (error.response.status === 400){
	            notif.error(error.response.data.message)
            }

            if (error.response.status === 401){
            	// notif.error(error.response.data.message);
            	props.cookies.set('token', '', { path: '/' });
	            resetAuthToken();
	            history.push(endpoints.login);
            }
        });
  	
	}

	useLayoutEffect(() => {
		getTestImagesForTestboard()
	},[]);

	const columns = [
	  {
	    title: '#',
	    dataIndex: 'key',
	    key: 'key',
	    sorter: (a, b) => parseInt(a.testno) - parseInt(b.testno)
	  },
	  {
	    title: 'Filename',
	    dataIndex: 'filename',
	    key: 'filename',
	  },
	  {
	    title: 'File Size',
	    dataIndex: 'fileSize',
	    key: 'fileSize',
	  },
	  {
	    title: 'Image Resolution',
	    dataIndex: 'imageResolution',
	    key: 'imageResolution'
	  },
	  {
	    title: 'Filetype',
	    dataIndex: 'fileType',
	    key: 'fileType'
	  },
	  {
	    title: 'Classname',
	    dataIndex: 'className',
	    key: 'className'
	  },
	  {
	    title: 'Action',
	    key: 'action',
	    render: (text, record) => (
	      <Space size="middle">
	        <a target="_blank" href={backend.getImageFile+record["imageID"]+"/"+record["filename"]}>Preview</a>
	        <NavLink to="#">Delete</NavLink>
	      </Space>
	    ),
	  },
	];


	return (
			
		<div className="inputtable-holder">
			<div className="inputtable-horizontal-holder">
				<div className="inputtable-title">
					Test files
				</div>

				<div className="inputtable-upload-holder">
					<Button type="default" onClick={showModal}>
				    	Upload test files
				    </Button>
				</div>
			</div>
			<Modal title="Upload test images" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
				<FileUpload cookies={props.cookies} testboardID={props.testboardID} />
		    </Modal>
		    <Table className="inputtable-table" columns={columns} dataSource={files} />
		</div>
	)

}

export default TestFilesTable

