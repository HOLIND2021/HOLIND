import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
            <h1 style={{ paddingBottom: "20px" }}>Patients</h1>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.data.map((patient) => (
                    <TableRow
                      key={patient.first}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {patient.first} {patient.last}
                      </TableCell>
                      <TableCell align="right">{patient.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </div>
        
      );
    }
  }
  

  export default Patients;