import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
    state = {
      data: null
    }
  
    componentDidMount() {
      // what to do if component was mounted??
    }
  
  
    render() {
      (function() {
        let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    
        let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    
        Date.prototype.getMonthName = function() {
            return months[ this.getMonth() ];
        };
        Date.prototype.getDayName = function() {
            return days[ this.getDay() ];
        };
      })();
      let now = new Date();
      let currentDate = now.getDate();
      let day = now.getDayName();
      let month = now.getMonthName();

      let currentHour = now.getHours();
      let greeting;
      if (currentHour < 12) {
        greeting = "Good morning"
      } else if (currentHour < 18) {
        greeting = "Good afternoon"
      } else {
        greeting = "Good evening"
      }
      let x = {fontSize: '30px', paddingRight: '10px'}
      return (
  
        <div className='home'>
            <h3 class='date'>
              {day}, {month} {currentDate}
            </h3>
            <h1>
              {greeting}, User
            </h1>

      
      
  
        
            <div className='box'>
              <h5>Today's Date</h5><br></br>
              <h4>Good afternoon, [Name]</h4><br></br>
              <h5>My Patient's Treatments</h5><br></br>
              <table>
                <tr>
                  <th style = {x}>Upcoming</th>
                  <th style = {x}>Overdue</th>
                  <th style = {x}>Completed</th>
                </tr>
                <tr>
                  <td>Long Le</td>
                </tr>
                <tr>
                  <td></td>
                </tr>
              </table>
            </div>
        </div>
      );  
      
    }
  }
  
  export default Home;