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

function Addcustomer({ addCustomer }) {
    const [open, setOpen] = useState(false);

    // Customer state
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '',
    });

    // Add New Customer button and opening a form
    const handleClickOpen = () => {
        console.log('Add new customer button handled');
        setOpen(true);
    }

    // If save button is pressed in the customer form
    const handleClose = () => {
        console.log('Save customer button handled')
        addCustomer(customer);
        setOpen(false);
    }

    // If cancel button is pressed in the training form
    const handleCancel = () => {
        console.log('Handle cancel called')
        setOpen(false);
    }

    // Changing values for the training
    const inputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }
    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Button variant="outlined" onClick={handleClickOpen}> + New Customer</Button>
            </Box>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle> + New Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        name="firstname"
                        value={customer.firstname}
                        margin="dense"
                        label="Firstname"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={inputChanged}
                    />
                    <TextField
                        name="lastname"
                        value={customer.lastname}
                        margin="dense"
                        label="Lastname"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={inputChanged}
                    />
                    <TextField
                        name="streetaddress"
                        value={customer.streetaddress}
                        margin="dense"
                        label="Address"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={inputChanged}
                    />
                    <TextField
                        name="postcode"
                        value={customer.postcode}
                        margin="dense"
                        label="Postcode"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={inputChanged}
                    />
                    <TextField
                        name="city"
                        value={customer.city}
                        margin="dense"
                        label="City"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={inputChanged}
                    />
                    <TextField
                        name="email"
                        value={customer.email}
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={inputChanged}
                    />
                    <TextField
                        name="phone"
                        value={customer.phone}
                        margin="dense"
                        label="Phone"
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

export default Addcustomer;