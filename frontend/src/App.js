import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.data}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
