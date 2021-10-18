import React, { Component } from 'react';
import { useLocation } from 'react-router-dom'


class Patient extends Component {
    state = {
        exercises: [],
        first: "",
        last: "",
        status: ""
    }


    componentDidMount() {
        const { state } = this.props.location;
        
        this.setState({
            exercises: state.exercises,
            first: state.first,
            last: state.last,
            status: state.status
        });
    }

    render() {
        return (
        <div className='patient'>
            {this.state.first}
            <p>{this.state.exercises.map((exercise) => {
                return exercise.name + ' ' + exercise.status
            })}</p>
        </div>
        );
    }
  }
  

  export default Patient;