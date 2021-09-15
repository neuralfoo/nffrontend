import React, {useState,useEffect} from 'react';
import { Input,Select,Button } from 'antd';

import { PlusOutlined, MinusSquareOutlined } from '@ant-design/icons';
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
	const httpmethod = useSelectInput(null)

	const apiendpoint = useFormInput('')


	const [apiHeader, setApiHeader] = useState([])
	// const [apiHeaderCounter, setApiHeaderCounter] = useState(0)


	const onHeaderNameChange = e => {
	    // console.log(e)
	    const { target: {value, name } } = e

	    let newArr = [...apiHeader]
	    newArr[parseInt(name)][0] = value

	    setApiHeader(newArr)
	    // setApiHeader(prev =>({
	    //     ...prev,
	    //     [name] : value
	    // }))
	}

	const onHeaderValueChange = e => {
	    // console.log(e)
	    const { target: {value, name } } = e

	    let newArr = [...apiHeader]
	    newArr[parseInt(name)][1] = value
	    
	    setApiHeader(newArr)
	    // setApiHeader(prev =>({
	    //     ...prev,
	    //     [name] : value
	    // }))
	}

	// const onHeaderChange = e => {
	//     console.log(e)
	//     const { target: {value, name } } = e

	//     setApiHeader(prev =>({
	//         ...prev,
	//         [name] : value
	//     }))
	// }

	 
	const addHeader = () => {
		setApiHeader(prev =>([
	        ...prev,
	        ["",""] 
	    ]))
	    // setApiHeaderCounter(apiHeaderCounter+1)
	    console.log(apiHeader)
	}

	const removeHeader = e => {
		console.log(e)
	    // const { target: { name } } = e
	    let newArr = [...apiHeader]
	    newArr.splice(parseInt(e),1)
	    // console.log(name)
	    setApiHeader(newArr)
	}

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
							placeholder="Type your API name here ..." 
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
								placeholder="What does it do" size="large" 
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
								placeholder="Where is it hosted" size="large" 
								className="testboard-select" {...apienvironment} >

								<Option value="development">Development</Option>
								<Option value="staging">Staging</Option>
								<Option value="preproduction">Preproduction</Option>
								<Option value="production">Production</Option>
							</Select>
						</div>
					</div>
				</div>


				<div className="testboard-horizontal-holder">
					<div className="testboard-key-value-holder">
						<div className="testboard-keyname">
							HTTP Method
						</div>
						<div className="testboard-valuename">
							<Select 
								placeholder="Method" size="large" 
								className="testboard-input-httpmethod" {...httpmethod} >

								<Option value="GET">GET</Option>
								<Option value="POST">POST</Option>
								<Option value="PUT">PUT</Option>
								<Option value="DELETE">DELETE</Option>
							</Select>
						</div>
					</div>


					<div className="testboard-key-value-holder">
						<div className="testboard-keyname">
							API Endpoint
						</div>
						<div className="testboard-valuename">
							<Input 
								placeholder="Type your API endpoint here ..." 
								size="large" className="testboard-input" 
								{...apiendpoint} bordered={false} />
						</div>
					</div>

				</div>
				

				<div className="testboard-keyname">
					HTTP headers
				</div>

				{
					apiHeader.map((item,index) => (
						<div className="testboard-horizontal-holder" key={index}>
                        	<div className="testboard-key-value-holder">
								<div className="testboard-valuename">
									<Input 
										placeholder="Type new header name here" 
										size="large" className="testboard-input-header" 
										bordered={false} name={index} value={item[0]} onChange={onHeaderNameChange}/>
								</div>
							</div>

							<div className="testboard-key-value-holder">
								<div className="testboard-valuename">
									<Input 
										placeholder="Type new header value here" 
										size="large" className="testboard-input-header" 
										bordered={false} name={index} value={item[1]} onChange={onHeaderValueChange}/>
								</div>
							</div>

							<div className="testboard-icon-holder"> <MinusSquareOutlined name={index} onClick={() => removeHeader(index)} /> </div> 
						</div>
                	)) 
				}

				<Button className="add-header-button" type="dashed" 
						icon={<PlusOutlined />} size="medium" onClick={addHeader}>
					Add Header
				</Button>


			</div>
			
		</div>
	)

}

export default Testboard

