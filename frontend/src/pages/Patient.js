import React, { Component } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { FormControl, InputLabel, Select, MenuItem, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

class Patient extends Component {
    state = {
        exercises: [],
        first: "",
        last: "",
        status: "",
        uid: "",
        open1: true,
        open2: true,
        open3: true,
        open4: true,
        showForm: false,
        showDialog: false
    }


    async componentDidMount() {
        this.setState({
            uid: this.props.match.params.uid
        });
        const res = await fetch(`${process.env.REACT_APP_API}/api/getPatient/${this.props.match.params.uid}`);
        const body = await res.json();
        if (res.status === 200) {
          this.setState({exercises: body.body.exercises, first: body.body.first, last: body.body.last, status: body.body.status });
        }
    }

    

    render() {    
        
        const category_text = {
            fontWeight: "bold"
        };

        const handleSubmit = async (event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const title = data.get('title');
            const date = data.get('date');
            const puid = this.state.uid
            console.log('Task Created ' + title + ' for ' + date)

            await fetch(`${process.env.REACT_APP_API}/api/updatePatient`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    puid,
                    title,
                    date
                })
            }).then((res) => window.location.reload())
            .catch((err) => console.log(err))
          };

        const handleDelete = async (event) => {
            event.preventDefault();
            const title = event.currentTarget.name
            const date = event.currentTarget.id
            const puid = this.state.uid
            console.log(title + ' ' + date + ' ' + puid)

            await fetch(`${process.env.REACT_APP_API}/api/deleteTask`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    puid,
                    title,
                    date
                })
            }).then((res) => window.location.reload())
            .catch((err) => console.log(err))
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
                                        <ListItemText primary={exercise.name} primaryTypographyProps={{ style: {
                                                                                                        whiteSpace: 'nowrap',
                                                                                                        overflow: 'hidden',
                                                                                                        textOverflow: 'ellipsis'
                                                                                                    } }} />
                                        <IconButton aria-label="delete" name={exercise.name} id={exercise.status} onClick={handleDelete}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemButton>
                                } else return '';
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
                                        <ListItemText primary={exercise.name} primaryTypographyProps={{ style: {
                                                                                                        whiteSpace: 'nowrap',
                                                                                                        overflow: 'hidden',
                                                                                                        textOverflow: 'ellipsis'
                                                                                                    } }} />
                                        <IconButton aria-label="delete" name={exercise.name} id={exercise.status} onClick={handleDelete}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemButton>
                                } else return '';
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
                                        <ListItemText primary={exercise.name} primaryTypographyProps={{ style: {
                                                                                                        whiteSpace: 'nowrap',
                                                                                                        overflow: 'hidden',
                                                                                                        textOverflow: 'ellipsis'
                                                                                                    } }} />
                                        <IconButton aria-label="delete" name={exercise.name} id={exercise.status} onClick={handleDelete}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemButton>
                                } else return '';
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
                                        <ListItemText primary={exercise.name} primaryTypographyProps={{ style: {
                                                                                                        whiteSpace: 'nowrap',
                                                                                                        overflow: 'hidden',
                                                                                                        textOverflow: 'ellipsis'
                                                                                                    } }} />
                                        <IconButton aria-label="delete" name={exercise.name} id={exercise.status} onClick={handleDelete}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemButton>
                                } else return '';
                            })}
                        </List>
                    </Collapse>
                </List>

                <Button variant="outlined" onClick={() => this.setState({ showDialog: !this.state.showDialog })}>
                    Add Task
                </Button>
                <Dialog open={this.state.showDialog} component="form" onSubmit={handleSubmit}>
                    <DialogTitle>Add Task</DialogTitle>
                    <DialogContent>
                    <TextField
                            margin="normal"
                            id="title"
                            label="Task Name"
                            name="title"
                            autoFocus
                        />
                        <br></br>
                        <FormControl sx={{ minWidth: 80, mt: 1}}>
                        <InputLabel id="demo-simple-select-autowidth-label">Date</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            label="date"
                            name="date"
                        >
                            <MenuItem value="recently_assigned">Recently Assigned</MenuItem>
                            <MenuItem value="do_today">Do Today</MenuItem>
                            <MenuItem value="do_nextweek">Do Next Week</MenuItem>
                            <MenuItem value="do_later">Do Later</MenuItem>
                        </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => this.setState({ showDialog: !this.state.showDialog })}>Cancel</Button>
                    <Button type="submit" variant="contained">Add Task</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
  }
  

  export default Patient;