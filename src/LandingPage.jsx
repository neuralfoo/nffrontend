import React from 'react';
import './LandingPage.css';
import { CheckSquareOutlined } from '@ant-design/icons';
import endpoints from "./endpoints"



function LandingPage(props) {

  
  return (
    <div className="landingpage-container">
      <div className="landingpage-subcontainer">
        <div className="landingpage-title">
          A simple no-code tool for testing machine learning APIs.
        </div>
        <div className="landingpage-feature-list">
          <div className="landingpage-feature-list-item-container">
            <div className="landingpage-feature-list-title">
              Neural Foo Features
            </div>
            <div className="landingpage-feature-list-item">
              <CheckSquareOutlined /> Functional testing for AI/ML APIs
            </div>
            <div className="landingpage-feature-list-item">
              <CheckSquareOutlined /> Accuracy testing for AI/ML APIs
            </div>
            <div className="landingpage-feature-list-item">
              <CheckSquareOutlined /> Rigour testing for AI/ML APIs
            </div>
            <div className="landingpage-feature-list-item">
              <CheckSquareOutlined /> Load and Endurance testing for AI/ML APIs
            </div>
            <div className="landingpage-feature-list-item">
              <CheckSquareOutlined /> Standardized templates for all of the above tests
            </div>
            <div className="landingpage-feature-list-item">
              <CheckSquareOutlined /> 5 minute TAT from Setup to Testing any API
            </div>
            <div className="landingpage-feature-list-item">
              <CheckSquareOutlined /> Completely No Code Interface
            </div>
            <div className="landingpage-feature-list-item">
              <CheckSquareOutlined /> Always Free!
            </div>
          </div>
        </div>
        <div className="landingpage-calltoaction-container">
          {
            props.cookies.get('token') ?
              <a className="landingpage-calltoaction" href={endpoints.host+endpoints.dashboard}>
                Go to dashboard
              </a>
            :
              <a className="landingpage-calltoaction" href={endpoints.host+endpoints.signup}>
                Signup Now!
              </a>
          }
          
        </div>
      </div>
    </div>
  );
}
  
export default LandingPage;
