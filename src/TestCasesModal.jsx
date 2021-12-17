import React, { useState } from 'react';
import { Modal, Button, Table, Space } from 'antd';
import { BarsOutlined } from '@ant-design/icons';

import "./TestCasesModal.css"

function TestCasesModal(props) {

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

  function deleteTestCase(testcaseID){

  }

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      sorter: (a, b) => parseInt(a.key) - parseInt(b.key)
    },
    {
      title: 'Testcase Name',
      dataIndex: 'testcaseName',
      key: 'testcaseName',
    },
    {
      title: 'Request Body - Request 1',
      dataIndex: 'requestBody1',
      key: 'requestBody1',
    },
    {
      title: 'Response Code - Request 1',
      dataIndex: 'responseCode1',
      key: 'responseCode1'
    },
    {
      title: 'Response Body - Request 1',
      dataIndex: 'responseBody1',
      key: 'responseBody1'
    },
    {
      title: 'Max Response Time - Request 1',
      dataIndex: 'responseTime1',
      key: 'responseTime1',
      render:(text) => text.toString()+"s"
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => deleteTestCase(record["testcaseID"])}>Delete</Button>
          <Button type="link" onClick={() => deleteTestCase(record["testcaseID"])}>Edit</Button>
        </Space>
      ),
    },
  ];  

  var tests = []

  function openAddTestCaseModal(){
    
  }

  return (
    <>
      <Button className="functionaltable-refresh-button" onClick={showModal}>
        <BarsOutlined /> View Test Cases
      </Button>
      <Modal title="Functional Test Cases" 
        width="70%" 
        className="testcasesmodal-modal" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={[
            <Button key="back" onClick={handleCancel}>
              Close
            </Button>,
            <Button key="submit" type="primary" onClick={openAddTestCaseModal}>
              Add testcase
            </Button>
          ]}
          >
        <Table className="testcasesmodal-table" scroll={{x:true}} columns={columns} dataSource={tests} />
      </Modal>
    </>
  );
};

export default TestCasesModal;