import React, {useState,useEffect} from 'react';
import { Input,Select } from 'antd';

import { EditOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

import "./Testboard.css"
import "antd/dist/antd.css";

import { authtoken } from './globals'





function Testboard(props) {

	const auth = authtoken.use()

	const useFormInput = initialValue => {
	  const [value, setValue] = useState(initialValue);
	 
	  const handleChange = e => {
	    setValue(e.target.value);
	  }
	  return {
	    value,
	    onChange: handleChange
	  }
	}


	const useSelectInput = initialValue => {
	  const [value, setValue] = useState(initialValue);
	 
	  const handleChange = e => {
	    setValue(e);
	  }
	  return {
	    value,
	    onChange: handleChange
	  }
	}

	const apiname = useFormInput('')
	const apitype = useSelectInput(null)
	const apienvironment = useSelectInput(null)

	const { Option } = Select;

	return (
		<div className="testboard-holder">

			<div className="testboard-container">

				<div className="testboard-title">
					{apiname.value} Testboard
				</div>

				<div className="testboard-key-value-holder">
					<div className="testboard-keyname">
						API Name
					</div>
					<div className="testboard-valuename">
						<Input 
							placeholder="Write down your API name here ..." 
							size="large" className="testboard-input" 
							{...apiname} bordered={false} />
					</div>
				</div>

				<div className="testboard-horizontal-holder">
					<div className="testboard-key-value-holder">
						<div className="testboard-keyname">
							API Type
						</div>
						<div className="testboard-valuename">
							<Select 
								placeholder="Choose an API Type..." size="large" 
								className="testboard-select" {...apitype} >

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
								placeholder="Choose your deployment environment" size="large" 
								className="testboard-select" {...apienvironment} >

								<Option value="development">Development</Option>
								<Option value="staging">Staging</Option>
								<Option value="preproduction">Preproduction</Option>
								<Option value="production">Production</Option>
							</Select>
						</div>
					</div>
				</div>

			</div>
			
		</div>
	)

}

export default Testboard

