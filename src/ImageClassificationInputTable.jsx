import React, {useState,useLayoutEffect} from 'react';
import { Table,Space,Modal, Button } from 'antd';

import { NavLink } from "react-router-dom";

import "./ImageClassificationInputTable.css"
import "antd/dist/antd.css";

import { authtoken } from './globals'
// import backend from "./backend"
// import axios from 'axios'

import FileUpload from "./FileUpload"

function ImageClassificationInputTable(props) {

	authtoken.use()

	const [files, setFiles] = useState([]);

	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const getTestImagesForTestboard = () => {

	}

	useLayoutEffect(() => {
		
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
	    dataIndex: 'fileName',
	    key: 'fileName',
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
	        <NavLink to="#">Preview</NavLink>
	        <NavLink to="#">Delete</NavLink>
	      </Space>
	    ),
	  },
	];


	return (
			
		<div className="inputtable-holder">
			<div className="inputtable-horizontal-holder">
				<div className="inputtable-title">
					Test images for Image Classification
				</div>

				<div className="inputtable-upload-holder">
					<Button type="default" onClick={showModal}>
				    	Upload more test images
				    </Button>
				</div>
			</div>
			<Modal title="Upload test images" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
				<FileUpload cookies={props.cookies} testboardID={props.testboardID} />
		    </Modal>
		    <Table className="inputtable-table" pagination={{ pageSize: 20}} columns={columns} dataSource={[]} />
		</div>
	)

}

export default ImageClassificationInputTable

