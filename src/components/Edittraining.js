import React, { useState } from "react";
import { Button } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function Edittraining(props) {
    const [open, setOpen] = useState(false);

    // Training state
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
    });

    // Edit Training button and opening a form with previous infos
    const handleClickOpen = () => {
        console.log('Edit training button handled');
        setOpen(true);
        setTraining({
            date: props.training.data.date,
            duration: props.training.data.duration,
            activity: props.training.data.activity,
        })
    }

    // Closing form
    const handleClose = () => {
        setOpen(false);
    }

    // if save button is pressed in the form, update training
    const handleSave = () => {
        props.editTraining(props.training.value, training);
        handleClose();
    }

    // If cancel button is pressed in the car form
    const handleCancel = () => {
        console.log('Handle cancel')
        setOpen(false);
    }

    // Changing values for the car
    const inputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    }

    return (
        <div>
            <IconButton color="primary" onClick={handleClickOpen}>
                <ModeEditIcon />
            </IconButton>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Edit Training</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        name="date"
                        value={training.date}
                        margin="dense"
                        type="date"
                        fullWidth
                        variant="standard"
                        onChange={inputChanged}
                    />
                    <TextField
                        name="duration"
                        value={training.duration}
                        margin="dense"
                        label="Duration (minutes)"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={inputChanged}
                    />
                    <TextField
                        name="activity"
                        value={training.activity}
                        margin="dense"
                        label="Activity"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={inputChanged}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Edittraining;