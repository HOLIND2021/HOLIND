import React, { Component } from 'react';
import './Home.css';
import Tabs from '../components/Tabs';
import Typography from '@mui/material/Typography';
import { firebaseAuth } from '../Firebase';

class Home extends Component {
  state = {
    data: [],
    user: {},
    firstName: '',
    lastName: ''
  }

  componentDidMount() {
    this.getPatients()
      .then(res => this.setState({ data: res.body }))
      .catch(err => console.log(err));

    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        this.setState({user: user})
        
        const res = await fetch(`${process.env.REACT_APP_API}/api/user/${uid}`);
        const body = await res.json();
        if (res.status === 200) {
          this.setState({firstName: body.body.firstName, lastName: body.body.lastName });
        }
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
        <br></br>
        <br></br>
        <Typography variant="h4" fontWeight="bold">My Patient's Treatments</Typography><br></br>
        <Tabs data={this.state.data}></Tabs>
      </div>
    );
  }
}

export default Home;