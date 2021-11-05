import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import backend from "./backend"

function FileUpload(props){

	const uploadprops = {
	  name: 'file',
	  action: backend.uploadImageFile,
	  headers: {
	  	Authorization : props.cookies.get('token')
	  },
	  multiple:true,
	  data:{testboardID : props.testboardID},
	  onChange(info) {
	    if (info.file.status !== 'uploading') {
	      console.log(info.file, info.fileList);
	    }
	    if (info.file.status === 'done') {
	      message.success(`${info.file.name} file uploaded successfully`);
	    } else if (info.file.status === 'error') {
	      message.error(`${info.file.name} file upload failed.`);
	    }
	  },
	};

	return (
	  <Upload {...uploadprops}>
	    <Button icon={<UploadOutlined />}>Click to Upload</Button>
	  </Upload>
	);

}

export default FileUpload;