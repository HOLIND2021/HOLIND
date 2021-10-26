import React, { Component } from 'react';
import './Home.css';
import Tabs from '../components/Tabs';
import Typography from '@mui/material/Typography';

class Home extends Component {
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

    let userRole = 'patient';

    return (

      <div className='home'>
        <Typography variant="h5">
          {day}, {month} {currentDate}
        </Typography>
        <Typography variant="h4">
          {greeting}, User
        </Typography>
        <br></br>
        <br></br>
        <Typography variant="h4" fontWeight="bold">{userRole === 'clinical' ? `My Patient's Treatments` : userRole === 'patient' ? `My Tasks` : ''}</Typography><br></br>
        <Tabs data={this.state.data}></Tabs>
      </div>
    );
  }
}

export default Home;