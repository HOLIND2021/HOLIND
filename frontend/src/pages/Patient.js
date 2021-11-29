import React, { Component } from 'react';
import {
    MenuItem, TextField, Dialog, DialogTitle, DialogContent,
    DialogActions, Checkbox, Typography, List, ListItemButton, ListItemText, Collapse, Menu,
    Button, Tooltip, ListItemIcon, IconButton
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import Stack from '@mui/material/Stack';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

function CalendarDate() {
    const [value, setValue] = React.useState(new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+(new Date().getDate()+1));
  
    const handleChange = (newValue) => {
      setValue(newValue);
    };
  
    return (
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Stack spacing={3}>
          <MobileDatePicker
            label="Due Date"
            inputFormat="MM/dd/yyyy"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField id="caldate" name="caldate" {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    );
  }

function EditCalendarDate({ exercise }) {
    const [value, setValue] = React.useState(exercise.due);
  
    const handleChange = (newValue) => {
      setValue(newValue);
    };
  
    return (
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Stack spacing={3}>
          <MobileDatePicker
            label="Due Date"
            inputFormat="MM/dd/yyyy"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField id="caldate" name="caldate" {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    );
  }

function ExerciseOptionsMenu({ exercise, state, updateExercises }) {
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
        const puid = state.uid
        const status = exercise.status
        const caldate = exercise.due

        await fetch(`${process.env.REACT_APP_API}/api/deleteTask`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                puid,
                title,
                status,
                caldate
            })
        }).then(async (res) => {
            updateExercises()
            setShowEditDialog(false);
        })
            .catch((err) => console.log(err))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const title = data.get('title');
        const puid = state.uid
        const caldate = data.get('caldate')
        console.log('Task Edited ' + title + ' for ' + caldate)

        await fetch(`${process.env.REACT_APP_API}/api/updateExercise`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                puid,
                oldTitle: exercise.name,
                title,
                status: exercise.status,
                caldate
            })
        }).then(async (res) => {
            updateExercises()
            setShowEditDialog(false);
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
                        required
                    />
                    <br></br>
                    <br></br>
                    <EditCalendarDate exercise={exercise} />
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
        open: [true, true, true, true, true, false],
        showDialog: false,
        caldate: ""
    }

    constructor(props) {
        super(props)
        this.updateExercises = this.updateExercises.bind(this);
    }

    async componentDidMount() {
        this.setState({
            uid: this.props.match.params.uid
        });
        const res = await fetch(`${process.env.REACT_APP_API}/api/getPatient/${this.props.match.params.uid}`);
        const body = await res.json();
        if (res.status === 200) {
            this.setState({ exercises: body.body.exercises, first: body.body.first, last: body.body.last, status: body.body.status, caldate: body.body.caldate });
        }
    }

    async updateExercises() {
        const response = await fetch(`${process.env.REACT_APP_API}/api/getPatient/${this.state.uid}`);
        const body = await response.json();
        if (response.status === 200) {
            this.setState({
                exercises: body.body.exercises,
            })
        }
    }

    render() {

        const category_text = {
            fontWeight: "bold"
        };

        const taskList = [
            {
                name: "Overdue",
                value: "overdue"
            }, {
                name: "Today",
                value: "today"
            }, {
                name: "Tomorrow",
                value: "tomorrow"
            }, {
                name: "This Week",
                value: "this_week"
            }, {
                name: "Later",
                value: "later"
            }, {
                name: "Completed",
                value: "completed"
            }
        ]

        const handleOpen = async (index) => {
            let open = this.state.open;
            open[index] = !open[index];
            this.setState({ open: open });
        }

        const handleComplete = async (event) => {
            event.preventDefault();
            const name = event.currentTarget.name;
            const puid = this.state.uid;
            const caldate = event.currentTarget.id;

            if (!event.target.checked) {
                await fetch(`${process.env.REACT_APP_API}/api/updateExercise`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        puid,
                        oldTitle: name,
                        title: name,
                        status: '',
                        caldate: caldate
                    })
                }).then(async (res) => {
                    this.updateExercises()
                })
                    .catch((err) => console.log(err))
            } else {
                await fetch(`${process.env.REACT_APP_API}/api/updateExercise`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        puid,
                        oldTitle: name,
                        title: name,
                        status: 'completed',
                        caldate: caldate
                    })
                }).then(async (res) => {
                    this.updateExercises()
                })
                    .catch((err) => console.log(err))
            }
        }

        const handleSubmit = async (event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const title = data.get('title');
            const puid = this.state.uid
            const caldate = data.get('caldate')
            console.log('Task Created ' + title + ' for ' + caldate)

            await fetch(`${process.env.REACT_APP_API}/api/updatePatient`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    puid,
                    title,
                    status: "",
                    caldate
                })
            }).then(async (res) => {
                this.updateExercises()
                this.setState({ showDialog: false })

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
                    sx={{ width: '100%', maxWidth: 480, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    {taskList.map((task, index) => (
                        <div>
                            <ListItemButton onClick={() => handleOpen(index)}>
                                <ListItemText primaryTypographyProps={{ style: category_text }} primary={task.name} />
                                {this.state.open[index] ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={this.state.open[index]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {this.state.exercises.sort((a,b) => (a.due > b.due) ? 1 : (b.due > a.due) ? -1 : 0).map((exercise) => { // sort exercises in ascending order by due date
                                        let date = new Date(exercise.due);
                                        let todaysDate = new Date();
                                        let statusValue = "";
                                        let tomorrowDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate() + 1);
                                        let dayAfterTomorrowDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate() + 2);
                                        let lastDayofWeekDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate() + 6);
                                        if (exercise.status === "completed") {
                                            statusValue = "completed";
                                        // check if due date is today
                                        } else if (date.setHours(0,0,0,0) === todaysDate.setHours(0,0,0,0)) {
                                            statusValue = "today";
                                        // check if date is tomorrow
                                        } else if (date.setHours(0,0,0,0) === tomorrowDate.setHours(0,0,0,0)) {
                                            statusValue = "tomorrow";
                                        // check if date is this week
                                        } else if (date >= dayAfterTomorrowDate && date <= lastDayofWeekDate) {
                                            statusValue = "this_week";
                                        // check if date is after this week
                                        } else if (date >= lastDayofWeekDate) {
                                            statusValue = "later";
                                        // check if date is before today
                                        } else if (date < todaysDate) {
                                            statusValue = "overdue";
                                        }

                                        if (statusValue === task.value) {
                                            return <ListItemButton sx={{ pl: 4 }}>
                                                <ListItemText primary={exercise.name} primaryTypographyProps={{
                                                    style: {
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis', 
                                                        maxWidth: "220px",
                                                        paddingRight: "10px"
                                                    }
                                                }} />
                                                <CalendarTodayRoundedIcon fontSize="small"></CalendarTodayRoundedIcon>
                                                <Typography sx={{paddingLeft: "10px", paddingRight: "10px"}}>{new Date(exercise.due).toLocaleString('en-En',{weekday: "short", month: "short", day: "numeric"})}</Typography>
                                                <Checkbox checked={exercise.status === "completed"} name={exercise.name} id={exercise.due} onChange={handleComplete} />
                                                <ExerciseOptionsMenu exercise={exercise} state={this.state} updateExercises={this.updateExercises} />
                                            </ListItemButton>
                                        } else return '';
                                    })}
                                </List>
                            </Collapse>
                        </div>
                    ))}
                </List>

                <Button variant="outlined" sx={{ marginTop: '20px' }} onClick={() => this.setState({ showDialog: !this.state.showDialog })}>
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
                            required
                        />
                        <br></br>
                        <br></br>
                        <CalendarDate />
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