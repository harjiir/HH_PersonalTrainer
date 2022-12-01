import React, { useState } from "react";
import { Button } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

function Editcustomer({ updateCustomer, params }) {
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

    // Edit Customer button and opening a form with previous infos
    const handleClickOpen = () => {
        console.log('Edit customer button handled');
        setOpen(true);
        setCustomer({
            firstname: params.data.firstname,
            lastname: params.data.lastname,
            streetaddress: params.data.streetaddress,
            postcode: params.data.postcode,
            city: params.data.city,
            email: params.data.email,
            phone: params.data.phone,
        })
    }

    // Closing form
    const handleClose = () => {
        console.log('Form closed')
        setOpen(false);
    }

    // if save button is pressed in the form, update training
    const handleSave = () => {
        updateCustomer(customer, params.value);
        setOpen(false);
    }

    // If cancel button is pressed in the car form
    const handleCancel = () => {
        console.log('Handle cancel')
        setOpen(false);
    }

    // Changing values for the car
    const inputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>EDIT</Button>
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
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Editcustomer;