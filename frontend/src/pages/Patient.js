import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';


class Patient extends Component {
    state = {
        exercises: [],
        first: "",
        last: "",
        status: "",
        open1: true,
        open2: true,
        open3: true,
        open4: true
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
        // <div className='patient'>
        //     {this.state.first}
        //     <p>{this.state.exercises.map((exercise) => {
        //         return exercise.name + ' ' + exercise.status
        //     })}</p>
        // </div>
            <div className='patient'>
                <Typography variant="h4">
                    {this.state.first}
                </Typography>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    >

                    <ListItemButton onClick={() => this.setState({ open1: !this.state.open1 })}>
                        <ListItemText primary="Recently Assigned" />
                        {this.state.open1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={this.state.open1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="Starred" />
                        </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={() => this.setState({ open2: !this.state.open2 })}>
                        <ListItemText primary="Do Today" />
                        {this.state.open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={this.state.open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="Starred" />
                        </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={() => this.setState({ open3: !this.state.open3 })}>
                        <ListItemText primary="Do Next Week" />
                        {this.state.open3 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={this.state.open3} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="Starred" />
                        </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={() => this.setState({ open4: !this.state.open4 })}>
                        <ListItemText primary="Do Later" />
                        {this.state.open4 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={this.state.open4} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="Starred" />
                        </ListItemButton>
                        </List>
                    </Collapse>

                </List>
            </div>
        );
    }
  }
  

  export default Patient;