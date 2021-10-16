import React, { Component } from 'react';

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

      return (
  
        <div className='home'>
            <h3 class='date'>
              {day}, {month} {currentDate}
            </h3>
            <h1>
              {greeting}, User
            </h1>
        </div>
        
      );
    }
  }
  
  export default Home;