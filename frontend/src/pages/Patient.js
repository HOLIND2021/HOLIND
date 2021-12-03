import React, { Component } from 'react';
import {
    TextField, Dialog, DialogTitle, DialogContent,
    DialogActions, Checkbox, Typography, List, ListItemButton, ListItemText, Collapse,
    Button, Tooltip, IconButton
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import CalendarDate from '../components/CalendarDate';
import ExerciseOptionsMenu from '../components/ExerciseOptionsMenu';
import { firebaseAuth } from '../Firebase';
import {Link} from 'react-router-dom';

class Patient extends Component {
    state = {
        exercises: [],
        first: "",
        last: "",
        status: "",
        uid: "",
        cuid: "",
        user: null,
        open: [true, true, true, true, true, false],
        showDialog: false,
        caldate: "",
        registered: null,
        showInviteDialog: false,
        copied: false
    }

    constructor(props) {
        super(props)
        this.updateExercises = this.updateExercises.bind(this);
    }

    async componentDidMount() {
        firebaseAuth.onAuthStateChanged(async (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                const res = await fetch(`${process.env.REACT_APP_API}/api/user/${uid}`);
                const body = await res.json();
                if (res.status === 200) {
                    this.setState({ user: body.body });
                }
            } else {
                // User is signed out
                // ...
            }
        });
        this.setState({
            uid: this.props.match.params.uid
        });
        const res = await fetch(`${process.env.REACT_APP_API}/api/getPatient/${this.props.match.params.uid}`);
        const body = await res.json();
        if (res.status === 200) {
            this.setState({ exercises: body.body.exercises, first: body.body.first, last: body.body.last, status: body.body.status, caldate: body.body.caldate, registered: body.body.registered, cuid: body.body.cuid });
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
        if (!this.state.user) return null;

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

        const inviteLink = `https://holind-a4624.web.app/signup?pid=${this.state.uid}`;

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

            }).catch((err) => console.log(err))
        };

        const copy = () => {
            navigator.clipboard.writeText(inviteLink);
            this.setState({ copied: true })
        }

        const handleClose = () => {
            this.setState({ showInviteDialog: !this.state.showInviteDialog });
            setTimeout(() => this.setState({ copied: false }), 500);
        }

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
                {this.state.user.role !== 'patient' ? <Tooltip title="Patient Analytics">
                    <IconButton aria-label="message" sx={{ padding: '15px', marginTop: '10px', marginLeft: '15px' }}>
                        <AssessmentRoundedIcon color="action" fontSize="large"></AssessmentRoundedIcon>
                    </IconButton>
                </Tooltip> : ''}
                {this.state.user.role !== 'patient' && !this.state.registered ? <Tooltip title="Invite Patient">
                    <IconButton aria-label="message" sx={{ padding: '15px', marginTop: '10px', marginLeft: '15px' }} onClick={() => this.setState({ showInviteDialog: !this.state.showInviteDialog })}>
                        <PersonAddAltRoundedIcon color="action" fontSize="large"></PersonAddAltRoundedIcon>
                    </IconButton>
                </Tooltip> : ''}
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
                                    {this.state.exercises.sort((a, b) => (a.due > b.due) ? 1 : (b.due > a.due) ? -1 : 0).map((exercise) => { // sort exercises in ascending order by due date
                                        let date = new Date(exercise.due);
                                        let todaysDate = new Date();
                                        let statusValue = "";
                                        let tomorrowDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate() + 1);
                                        let dayAfterTomorrowDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate() + 2);
                                        let lastDayofWeekDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate() + 6);
                                        if (exercise.status === "completed") {
                                            statusValue = "completed";
                                            // check if due date is today
                                        } else if (date.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0)) {
                                            statusValue = "today";
                                            // check if date is tomorrow
                                        } else if (date.setHours(0, 0, 0, 0) === tomorrowDate.setHours(0, 0, 0, 0)) {
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
                                                <Typography sx={{ paddingLeft: "10px", paddingRight: "10px" }}>{new Date(exercise.due).toLocaleString('en-En', { weekday: "short", month: "short", day: "numeric" })}</Typography>
                                                <Checkbox checked={exercise.status === "completed"} name={exercise.name} id={exercise.due} onChange={handleComplete} />
                                                {this.state.user.role !== 'patient' ? <ExerciseOptionsMenu exercise={exercise} state={this.state} updateExercises={this.updateExercises} /> : ''}
                                            </ListItemButton>
                                        } else return '';
                                    })}
                                </List>
                            </Collapse>
                        </div>
                    ))}
                </List>

                {this.state.user.role !== 'patient' ? <Button variant="outlined" sx={{ marginTop: '20px' }} onClick={() => this.setState({ showDialog: !this.state.showDialog })}>
                    Add Task
                </Button> : ''}
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
                <Dialog open={this.state.showInviteDialog}>
                    <DialogTitle>Invite Patient</DialogTitle>
                    <DialogContent>
                        <Typography>Send This Signup Link to {this.state.first + ' ' + this.state.last}: </Typography>
                        <Link underline="hover" to={{ pathname: inviteLink }} target="_blank">{inviteLink}</Link>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button variant="contained" onClick={copy}>{!this.state.copied ? 'Copy URL' : 'Copied!'}</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default Patient;