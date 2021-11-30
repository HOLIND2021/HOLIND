import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

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
        <>
          <div className='patients'>
              <Typography variant="h4" fontWeight="bold" style={{ paddingBottom: "20px", display: 'inline-block' }}>Patients</Typography>
              <Button variant="outlined" sx={{ float: 'right', display: 'inline-block' }}>
                    Add New Patient
              </Button>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Task Due Date</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.data.map((patient) => {
                      let earliestTask = patient?.exercises?.filter(task => task.due && task.status !== "completed").sort((a,b) => (a.due > b.due) ? 1 : (b.due > a.due) ? -1 : 0)[0];
                      let status = "";
                      if (earliestTask) {
                        let date = new Date(earliestTask.due);
                        let todaysDate = new Date();
                        if (date.setHours(0,0,0,0) >= todaysDate.setHours(0,0,0,0)) {
                          status = "Upcoming";
                        } else if (date.setHours(0,0,0,0) < todaysDate.setHours(0,0,0,0)) {
                          status = "Overdue";
                        }
                      } else {
                        status = "Completed";
                      }
                      return (
                      <TableRow
                        key={patient.first}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, textDecoration: "none" }} 
                        hover={true}
                        component={Link} 
                        to={{
                          pathname: `/patient/${patient.uid}`,
                          state: patient
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {patient.first} {patient.last}
                        </TableCell>
                        <TableCell align="right">{earliestTask?.due}</TableCell>
                        <TableCell align="right" sx={{color: (status === 'Completed' ? 'green' : status === 'Overdue' ? 'red' : '#1976d2')}}>{status}</TableCell>
                      </TableRow>
                    )})}
                  </TableBody>
                </Table>
              </TableContainer>
          </div>
        </>
      );
    }
  }
  

  export default Patients;