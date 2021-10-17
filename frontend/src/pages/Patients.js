import React, { Component } from 'react';

class Patients extends Component {
    state = {
      data: null
    }
  
    componentDidMount() {
      this.getPatients()
        .then(res => this.setState({ data: res.body }))
        .catch(err => console.log(err));
    }
  
    getPatients = async () => {
      const res = await fetch('/api/patients');
      const body = await res.json();

      if (res.status !== 200) {
        throw Error(body.message)
      }
      return body;
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