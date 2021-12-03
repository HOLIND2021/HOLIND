import React, { Component } from 'react';
import { HelpData } from '../components/HelpData';
import './Help.css';
import Faq from 'react-faq-component';

class Help extends Component {
    
    constructor(props) {
      super(props);

      this.state = {
      }
    }
  
    componentDidMount() {
      // what to do if component was mounted??
    }
  
  
    render() {

      return (
        <div className="help">
          <Faq data={HelpData} styles={HelpData.styles} config={{animate: true}}/>
        </div>
      );
    }
  }
  
  export default Help;