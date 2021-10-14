import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './LoginPage';

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
    const res = await fetch('/api/apiTest');
    const body = await res.json();

    if (res.status !== 200) {
      throw Error(body.message)
    }

    return body;
  }

  render() {
    return (

      <LoginPage/>
      
    );
  }
}

export default App;
