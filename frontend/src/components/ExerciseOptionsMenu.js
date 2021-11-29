import React from 'react';
import {
    MenuItem, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Menu,
    Button, Tooltip, ListItemIcon, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EditCalendarDate from './EditCalendarDate';

export default function ExerciseOptionsMenu({ exercise, state, updateExercises }) {
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
