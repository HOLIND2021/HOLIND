import React, { Component } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { FormControl, InputLabel, Select, MenuItem, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function ExerciseOptionsMenu({ exercise, state, setExercises }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showEditDialog, setShowEditDialog] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setAnchorEl(null);
        setShowEditDialog(true);
    }

    const handleDelete = async (event) => {
        setAnchorEl(null);
        event.preventDefault();
        const title = exercise.name
        const date = exercise.status
        const puid = state.uid

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
        }).then(async (res) => {
            const response = await fetch(`${process.env.REACT_APP_API}/api/getPatient/${state.uid}`);
            const body = await response.json();
            if (response.status === 200) {
                setExercises(body.body.exercises)
                setShowEditDialog(false);
            }
        })
            .catch((err) => console.log(err))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const title = data.get('title');
        const date = data.get('date');
        const puid = state.uid
        console.log('Task Edited ' + title + ' for ' + date)

        await fetch(`${process.env.REACT_APP_API}/api/updateExercise`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                puid,
                oldTitle: exercise.name,
                title,
                date
            })
        }).then(async (res) => {
            const response = await fetch(`${process.env.REACT_APP_API}/api/getPatient/${state.uid}`);
            const body = await response.json();
            if (response.status === 200) {
                setExercises(body.body.exercises)
                setShowEditDialog(false);
            }
        })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <Tooltip title="Options">
                <IconButton
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MoreVertRoundedIcon />
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleEdit}>
                    <ListItemIcon>
                        <EditRoundedIcon />
                    </ListItemIcon>
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    Delete
                </MenuItem>
            </Menu>
            <Dialog open={showEditDialog} component="form" onSubmit={handleSubmit}>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        id="title"
                        label="Task Name"
                        name="title"
                        defaultValue={exercise.name}
                        autoFocus
                    />
                    <br></br>
                    <FormControl sx={{ minWidth: 80, mt: 1 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Date</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            label="date"
                            name="date"
                            defaultValue={exercise.status}
                        >
                            <MenuItem value="recently_assigned">Recently Assigned</MenuItem>
                            <MenuItem value="do_today">Do Today</MenuItem>
                            <MenuItem value="do_nextweek">Do Next Week</MenuItem>
                            <MenuItem value="do_later">Do Later</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowEditDialog(false)}>Cancel</Button>
                    <Button type="submit" variant="contained">Edit Task</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


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

    constructor(props) {
        super(props)
        this.setExercises = this.setExercises.bind(this);
    }

    async componentDidMount() {
        this.setState({
            uid: this.props.match.params.uid
        });
        const res = await fetch(`${process.env.REACT_APP_API}/api/getPatient/${this.props.match.params.uid}`);
        const body = await res.json();
        if (res.status === 200) {
            this.setState({ exercises: body.body.exercises, first: body.body.first, last: body.body.last, status: body.body.status });
        }
    }

    setExercises(exercises) {
        this.setState({
            exercises: exercises
        })
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
            }).then(async (res) => {
                const response = await fetch(`${process.env.REACT_APP_API}/api/getPatient/${this.state.uid}`);
                const body = await response.json();
                if (response.status === 200) {
                    this.setState({
                        exercises: body.body.exercises,
                        showDialog: false
                    })
                }
            })
                .catch((err) => console.log(err))
        };

        return (
            <div className='patient'>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {this.state.first} {this.state.last}
                </Typography>
                <Tooltip title="Upload Video">
                    <IconButton aria-label="uploadVideo" sx={{ padding: '15px', marginTop: '10px' }}>
                        <VideoCameraBackIcon color="action" fontSize="large"></VideoCameraBackIcon>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Direct Message">
                    <IconButton aria-label="message" sx={{ padding: '15px', marginTop: '10px', marginLeft: '15px' }}>
                        <EmailRoundedIcon color="action" fontSize="large"></EmailRoundedIcon>
                    </IconButton>
                </Tooltip>
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
                                        <ListItemText primary={exercise.name} primaryTypographyProps={{
                                            style: {
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }
                                        }} />
                                        <ExerciseOptionsMenu exercise={exercise} state={this.state} setExercises={this.setExercises} />
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
                                        <ListItemText primary={exercise.name} primaryTypographyProps={{
                                            style: {
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }
                                        }} />
                                        <ExerciseOptionsMenu exercise={exercise} state={this.state} setExercises={this.setExercises} />
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
                                        <ListItemText primary={exercise.name} primaryTypographyProps={{
                                            style: {
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }
                                        }} />
                                        <ExerciseOptionsMenu exercise={exercise} state={this.state} setExercises={this.setExercises} />
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
                                        <ListItemText primary={exercise.name} primaryTypographyProps={{
                                            style: {
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }
                                        }} />
                                        <ExerciseOptionsMenu exercise={exercise} state={this.state} setExercises={this.setExercises} />
                                    </ListItemButton>
                                } else return '';
                            })}
                        </List>
                    </Collapse>
                </List>

                <Button variant="outlined" sx={{marginTop: '20px'}} onClick={() => this.setState({ showDialog: !this.state.showDialog })}>
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
                        <FormControl sx={{ minWidth: 80, mt: 1 }}>
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