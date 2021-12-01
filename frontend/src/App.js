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
import SignUpPage from './pages/SignUpPage';

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/' exact component={LoginPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/signup' component={SignUpPage} />
            <Route path='/home' component={Home} />
            <Route path='/patients' component={Patients} />
            <Route path='/messages' component={Messages} />
            <Route path='/help' component={Help} />
            <Route path='/patient/:uid' component={Patient} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
