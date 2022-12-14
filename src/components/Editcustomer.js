import React, { useState } from "react";
import { Button } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function Editcustomer(props) {
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
            firstname: props.customer.data.firstname,
            lastname: props.customer.data.lastname,
            streetaddress: props.customer.data.streetaddress,
            postcode: props.customer.data.postcode,
            city: props.customer.data.city,
            email: props.customer.data.email,
            phone: props.customer.data.phone,
        })
    }

    // Closing form
    const handleClose = () => {
        setOpen(false);
    }

    // if save button is pressed in the form, update training
    const handleSave = () => {
        props.editCustomer(props.customer.value, customer);
        handleClose();
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

            <IconButton color="primary" onClick={handleClickOpen}>
                <ModeEditIcon />
            </IconButton>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Edit Customer</DialogTitle>
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