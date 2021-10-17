import React, { Component } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Messages from './pages/Messages';
import Patients from './pages/Patients';
import Help from './pages/Help';
import Patient from './pages/Patient'

class App extends Component {
  state = {
    data: null
  }

  componentDidMount() {
    this.backendTest()
      .then(res => this.setState({ data: res.body }))
      .catch(err => console.log(err));
  }

  backendTest = async () => {
    const res = await fetch(`${process.env.REACT_APP_API}/api/apiTest`);
    const body = await res.json();

    if (res.status !== 200) {
      throw Error(body.message)
    }

    return body;
  }

  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/' exact component={LoginPage} />
            <Route path='/home' component={Home} />
            <Route path='/patients' component={Patients} />
            <Route path='/messages' component={Messages} />
            <Route path='/help' component={Help} />
            <Route path='/patient' component={Patient} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
