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
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import {Link} from 'react-router-dom';
import { firebaseAuth } from '../Firebase';

class Patients extends Component {
  state = {
    data: null,
    showDialog: false,
    user: null,
    showInviteDialog: false,
    invitePatient: null,
    inviteLink: '',
    copied: false
  }

  componentDidMount() {
    this.getPatients()
      .then(res => this.setState({ data: res.body }))
      .catch(err => console.log(err));
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.setState({user});
      } else {
        // User is signed out
        // ...
      }
    });

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
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const first = data.get('first');
      const last = data.get('last');

      await fetch(`${process.env.REACT_APP_API}/api/createPatient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first,
          last,
          cuid: this.state.user.uid
        })
      }).then((res) => {
        this.getPatients()
        .then(res => {
          this.setState({ showDialog: false })
          let patients = res.body
          this.setState({ data: patients })
          let newPatient = patients.filter((patient) => patient.first === first && patient.last === last)[0];
          console.log(newPatient);
          let inviteLink = `https://holind-a4624.web.app/signup?pid=${newPatient.uid}`;
          this.setState({ invitePatient: newPatient, showInviteDialog: true, inviteLink });
        })
        .catch(err => console.log(err));
      }).catch((err) => console.log(err))
    }
    
    const copy = () => {
      navigator.clipboard.writeText(this.state.inviteLink);
      this.setState({ copied: true })
    }

    if (!this.state.user || !this.state.data) return null;
    
    return (
      <>
        <div className='patients'>
          <Typography variant="h4" fontWeight="bold" style={{ paddingBottom: "20px", display: 'inline-block' }}>Patients</Typography>
          <Button variant="outlined" sx={{ float: 'right', display: 'inline-block' }} onClick={() => this.setState({ showDialog: !this.state.showDialog })}>
            Add Patient
          </Button>
          {this.state.data?.filter((patient) => patient.cuid === this.state.user?.uid).length === 0 ? 
          <Typography style={{paddingTop: "10px"}}>You currently have no patients, please add a new patient with the button at the top right.</Typography> :
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
                {this.state.data?.filter((patient) => patient.cuid === this.state.user?.uid ).map((patient) => {
                  let earliestTask = patient?.exercises?.filter(task => task.due && task.status !== "completed").sort((a, b) => (a.due > b.due) ? 1 : (b.due > a.due) ? -1 : 0)[0];
                  let status = "";
                  if (earliestTask) {
                    let date = new Date(earliestTask.due);
                    let todaysDate = new Date();
                    if (date.setHours(0, 0, 0, 0) >= todaysDate.setHours(0, 0, 0, 0)) {
                      status = "Upcoming";
                    } else if (date.setHours(0, 0, 0, 0) < todaysDate.setHours(0, 0, 0, 0)) {
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
                      <TableCell align="right" sx={{ color: (status === 'Completed' ? 'green' : status === 'Overdue' ? 'red' : '#1976d2') }}>{status}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>}
          <Dialog open={this.state.showDialog} component="form" onSubmit={handleSubmit}>
            <DialogTitle>Add Patient</DialogTitle>
            <DialogContent>
              <TextField
                margin="normal"
                id="first"
                label="First Name"
                name="first"
                autoFocus
                required
              />
              <br></br>
              <TextField
                margin="normal"
                id="last"
                label="Last Name"
                name="last"
                required
              />
              <br></br>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.setState({ showDialog: !this.state.showDialog })}>Cancel</Button>
              <Button type="submit" variant="contained">Add Patient</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={this.state.showInviteDialog && this.state.invitePatient}>
            <DialogTitle>Invite Patient</DialogTitle>
            <DialogContent>
                <Typography>Send This Signup Link to the New Patient: </Typography>
                <Link underline="hover" to={{ pathname: this.state.inviteLink }} target="_blank">{this.state.inviteLink}</Link>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.setState({ showInviteDialog: !this.state.showInviteDialog })}>Close</Button>
              <Button variant="contained" onClick={copy}>{!this.state.copied ? 'Copy URL' : 'Copied!'}</Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    );
  }
}


export default Patients;