import React, { Component } from 'react';

class Messages extends Component {
    state = {
      data: null
    }
  
    componentDidMount() {
      // what to do if component was mounted??
    }
  
  
    render() {
      return (
  
        <div className='messages'>
            <h1>Messages</h1>
        </div>
        
      );
    }
  }
  
  export default Messages;