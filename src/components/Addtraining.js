import React, { useState } from "react";
import { Button } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Addtraining({ addTraining }) {
    const [open, setOpen] = useState(false);

    // Training state
    const [training, setTraining] = useState({
        date: "",
        duration: "",
        activity: "",
    });

    // Add New Training button and opening a form
    const handleClickOpen = () => {
        console.log('Add new training button handled');
        setOpen(true);
    }

    // If save button is pressed in the training form
    const handleClose = () => {
        console.log('Save training button handled')
        addTraining(training);
        setOpen(false);
    }

    // If cancel button is pressed in the training form
    const handleCancel = () => {
        console.log('Handle cancel called')
        setOpen(false);
    }

    // Changing values for the training
    const inputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    }
    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Button variant="outlined" onClick={handleClickOpen}> + New Training Session</Button>
            </Box>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        name="date"
                        value={training.date}
                        margin="dense"
                        type="datetime-local"
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
                    <Button onClick={handleClose}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}

export default Addtraining;