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
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

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
        
        const category_text = {
            fontWeight: "bold"
        };

        return (
            <div className='patient'>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {this.state.first} {this.state.last}
                </Typography>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    >

                    <ListItemButton onClick={() => this.setState({ open1: !this.state.open1 })}>
                        <ListItemText primaryTypographyProps={{ style: category_text }} primary="Recently Assigned" />
                        {this.state.open1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={this.state.open1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        {this.state.exercises.map((exercise) => {
                            if (exercise.status === "recently_assigned") {
                                return <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary={exercise.name} />
                                        <IconButton aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemButton>
                                }
                            })}
                        </List>
                    </Collapse>

                    <ListItemButton onClick={() => this.setState({ open2: !this.state.open2 })}>
                        <ListItemText primaryTypographyProps={{ style: category_text }} primary="Do Today" />
                        {this.state.open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={this.state.open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        {this.state.exercises.map((exercise) => {
                            if (exercise.status === "do_today") {
                                return <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary={exercise.name} />
                                        <IconButton aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemButton>
                                }
                            })}
                        </List>
                    </Collapse>

                    <ListItemButton onClick={() => this.setState({ open3: !this.state.open3 })}>
                        <ListItemText primaryTypographyProps={{ style: category_text }} primary="Do Next Week" />
                        {this.state.open3 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={this.state.open3} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        {this.state.exercises.map((exercise) => {
                            if (exercise.status === "do_nextweek") {
                                return <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary={exercise.name} />
                                        <IconButton aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemButton>
                                }
                            })}
                        </List>
                    </Collapse>

                    <ListItemButton onClick={() => this.setState({ open4: !this.state.open4 })}>
                        <ListItemText primaryTypographyProps={{ style: category_text }} primary="Do Later" />
                        {this.state.open4 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={this.state.open4} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        {this.state.exercises.map((exercise) => {
                            if (exercise.status === "do_later") {
                                return <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary={exercise.name} />
                                        <IconButton aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemButton>
                                }
                            })}
                        </List>
                    </Collapse>

                </List>

                <Stack spacing={2} direction="row">
                    <Button variant="outlined" sx={{ marginTop: "10px" }}>Add Exercise</Button>
                </Stack>
            </div>
        );
    }
  }
  

  export default Patient;