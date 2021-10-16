import React, { Component } from 'react';

class Home extends Component {
    state = {
      data: null
    }
  
    componentDidMount() {
      // what to do if component was mounted??
    }
  
  
    render() {
      return (
  
        <div className='home'>
            <h1>Home</h1>
        </div>
        
      );
    }
  }
  
  export default Home;