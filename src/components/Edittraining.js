import React, { useState } from "react";
import { Button } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

function Edittraining({ updateTraining, params }) {
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
            date: params.data.date,
            duration: params.data.duration,
            activity: params.data.activity,
        })
    }

    // Closing form
    const handleClose = () => {
        console.log('Form closed')
        setOpen(false);
    }

    // if save button is pressed in the form, update training
    const handleSave = () => {
        updateTraining(training, params.value);
        setOpen(false);
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
            <Button className="addButton" variant="outlined" onClick={handleClickOpen}>EDIT</Button>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>New Car</DialogTitle>
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