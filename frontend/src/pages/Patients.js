import React, { Component } from 'react';

class Patients extends Component {
    state = {
      data: null
    }
  
    componentDidMount() {
      // what to do if component was mounted??
    }
  
  
    render() {
      return (
  
        <div className='patients'>
            <h1>Patients</h1>
        </div>
        
      );
    }
  }
  
  export default Patients;