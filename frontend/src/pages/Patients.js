import React, { Component } from 'react';
import * as CgIcons from 'react-icons/cg';

class Patients extends Component {
    state = {
      data: []
    }
  
    componentDidMount() {
      this.getPatients()
        .then(res => this.setState({ data: res.body }))
        .catch(err => console.log(err));
    }
  
    getPatients = async () => {
      const res = await fetch(`${process.env.REACT_APP_API}/api/patients`);
      const body = await res.json();

      if (res.status !== 200) {
        throw Error(body.message)
      }
      return body;
    }
  
    render() {

      return (
        <div className='patients'>
            <h1 style={{ margin: "10px", padding: "10px"}}>Patients</h1>

            <div style={{}}>
              <div>{this.state.data.map((patient) => (
                  <div style={{ fontSize: "1.2em", margin: "10px", padding: "10px"}}>{patient.first} {patient.last}</div>
              ))}</div>
            </div>
        </div>
        
      );
    }
  }
  

  export default Patients;