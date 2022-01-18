import {useState} from 'react';
import { Upload, message, Button, Input, Modal } from 'antd';
import { UploadOutlined,FileAddOutlined } from '@ant-design/icons';

import backend from "./backend"

message.config({
  duration: 2,
  maxCount: 1
});

function ImportAccuracyCasesModal(props){

	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		props.getTestcases(props.testboardID)
		setIsModalVisible(false);	
	};

	const handleCancel = () => {
		// getTestImagesForTestboard()
		setIsModalVisible(false);
	};

	const uploadprops = {
	  name: 'file',
	  action: backend.importAccuracyTestcase,
	  headers: {
	  	Authorization : props.cookies.get('token')
	  },
	  multiple:false,
	  data:{testboardID : props.testboardID},
	  onChange(info) {
	    if (info.file.status !== 'uploading') {
	      // console.log(info.file, info.fileList);
	    }
	    if (info.file.status === 'done') {
	      // message.success(`${info.file.name} file uploaded successfully`);
	    } else if (info.file.status === 'error') {
	      message.error(`${info.file.name} file upload failed.`);
	    }
	  },
	};


	return (
	<div>
		<Button type="default" onClick={showModal} className="accuracytestcasestable-button">
	        <FileAddOutlined /> Import from CSV
		</Button>
		<Modal title="Upload file containing test cases" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
			<Upload {...uploadprops}>
				<Button icon={<UploadOutlined />}>Click to Upload</Button>
			</Upload>
		</Modal>
	</div>
	);

}

export default ImportAccuracyCasesModal;

