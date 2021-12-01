import React, { Component } from 'react';
import './Home.css';
import Tabs from '../components/Tabs';
import Typography from '@mui/material/Typography';
import { firebaseAuth } from '../Firebase';

class Home extends Component {
  state = {
    data: [],
    user: {},
    uid: '',
    signingIn: true,
    firstName: '',
    lastName: '',
    role: '',
    pid: '',
    title: '',
  }

  componentDidMount() {
    let patients;
    this.getPatients().then((res) => patients = res.body)
    .catch((err) => console.log(err));

    this.authUser().then(async (user) => {
      this.setState({ user, uid: user.uid })
      const res = await fetch(`${process.env.REACT_APP_API}/api/user/${user.uid}`);
      const body = await res.json();
      if (res.status === 200) {
        this.setState({ firstName: body.body.firstName, lastName: body.body.lastName, role: body.body.role, pid: body.body.pid });
        if (body.body.role === 'patient') {
          this.setState({ title: ' My Tasks' })
          const patientRes = await fetch(`${process.env.REACT_APP_API}/api/getPatient/${body.body.pid}`);
          const patientBody = await patientRes.json();
          if (patientRes.status === 200) {
            this.setState({ data: patientBody.body.exercises })
          }
        } else {
          this.setState({ title: `My Patient's Treatments` })
          this.setState({ data: patients })
        }
        this.setState({ signingIn: false })
      } else {
        throw Error(body.message);
      }
    })
  }

  authUser() {
    return new Promise((resolve, reject) => {
      firebaseAuth.onAuthStateChanged(async (user) => {
        if (user) {
          resolve(user);
        } else {
          reject('User not logged in');
        }
      })
    })
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
    if (this.state.signingIn) return null;

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let now = new Date();
    let currentDate = now.getDate();
    let day = days[now.getDay()];
    let month = months[now.getMonth()];

    let currentHour = now.getHours();
    let greeting;
    if (currentHour < 12) {
      greeting = "Good morning"
    } else if (currentHour < 18) {
      greeting = "Good afternoon"
    } else {
      greeting = "Good evening"
    }

    return (
      <div className='home'>
        <Typography variant="h5">
          {day}, {month} {currentDate}
        </Typography>
        <Typography variant="h4">
          {greeting}, {this.state.firstName} {this.state.lastName}
        </Typography>
        <div>
          <br></br>
          <br></br>
          <Typography variant="h4" fontWeight="bold">{this.state.title}</Typography><br></br>
          <Tabs data={this.state.data} role={this.state.role} pid={this.state.pid}></Tabs>
        </div>
      </div>
    );
  }
}

export default Home;