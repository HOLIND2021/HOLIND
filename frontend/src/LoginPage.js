import React, { Component } from 'react';

class LoginPage extends Component {
    state = {
      data: null
    }
  
    componentDidMount() {
      // what to do if component was mounted??
    }
  
  
    render() {
      return (
  
        <div>
            <h2>HOLIND</h2>
            <form>
              <label>Username <br></br>
                <input type="text" name="username"/>
              </label>
              <br></br>
              <label>Password <br></br>
                <input type="text" name="username"/>
              </label>
              <br></br>
              <button type="submit" >Sign In</button>
              <button type="submit">Sign Up</button>
            </form>
        </div>
        
      );
    }
  }
  
  export default LoginPage;