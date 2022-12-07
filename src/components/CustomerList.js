import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

// Buttons
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Notification
import Snackbar from '@mui/material/Snackbar'

// Own files
import Addcustomer from './Addcustomer.js';
import Editcustomer from "./Editcustomer.js";

// CSS files
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function CustomerList() {

    // List of trainings
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    // URLs for data
    const customersUrl = 'https://customerrest.herokuapp.com/api/customers'
    const trainingsUrl = 'https://customerrest.herokuapp.com/api/trainings'

    const handleClose = () => {
        setOpen(false)
    }

    // Fetching customers from Heroku link
    const fetchCustomers = () => {
        fetch(customersUrl)
            .then((response) => response.json())
            .then((data) => setCustomers(data.content));
    };

    // Fetching customers everytime page loads
    // see fetchCustomers method
    useEffect(() => {
        fetchCustomers();
    }, []);

    // Adding a new customer with REST interface
    const addCustomer = (customer) => {
        console.log("CustomerList addCustomer method")
        fetch(customersUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer),
        })
            .then((response) => {
                if (response.ok) {
                    setMsg('New Customer added successfully');
                    setOpen(true);
                    fetchCustomers();
                } else {
                    alert('Something went wrong...');
                }
            })
            .catch(err => console.error(err))
        setOpen(false);
    }

    // Delete Customer Method
    const deleteCustomer = (url) => {
        if (window.confirm('Delete this customer?')) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMsg('Customer deleted successfully')
                        setOpen(true)
                        fetchCustomers();
                    } else {
                        alert('Something went wrong...');
                    }
                })
                .catch(err => console.error(err))
        }
        setOpen(false);
    }

    // Update Customer method
    const editCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedCustomer)
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Customer changes saved')
                    setOpen(true)
                    fetchCustomers();
                } else {
                    alert('Something went wrong...');
                }
            })
            .catch(err => console.error(err))
        setOpen(false);
    }

    // Table Columns
    const [columnDefs, setColumnDefs] = useState([
        {
            field: "firstname",
            width: 150,
            sortable: true,
            filter: true,
        },
        {
            field: "lastname",
            width: 200,
            sortable: true,
            filter: true
        },
        {
            headerName: 'Address',
            field: "streetaddress",
            width: 220,
            sortable: true,
            filter: true
        },
        {
            headerName: 'P.O',
            field: 'postcode',
            width: 100,
            sortable: true,
            filter: true,
        },
        {
            field: 'city',
            width: 160,
            sortable: true,
            filter: true,
        },
        {
            field: 'email',
            width: 220,
            sortable: true,
            filter: true,
        },
        {
            field: 'phone',
            width: 150,
            sortable: true,
            filter: true,
        },
        {
            headerName: '',
            field: 'links.0.href',
            width: 60,
            cellRenderer: params =>
                <IconButton color="success">
                    <AddCircleOutlineIcon />
                </IconButton>
        },
        {
            headerName: '',
            field: 'links.0.href',
            width: 60,
            cellRenderer: params => <Editcustomer editCustomer={editCustomer} customer={params} />
        },
        {
            headerName: '',
            field: 'links.0.href',
            width: 100,
            cellRenderer: params =>
                <IconButton color="error" onClick={() => deleteCustomer(params.value)}>
                    <DeleteIcon />
                </IconButton>
        }
    ]);

    return (
        <div>
            <Addcustomer addCustomer={addCustomer} />
            <div style={{ height: "100%", boxSizing: "border-box" }}>
                <div style={{ height: 600, width: '100%' }} className="ag-theme-material">
                    <AgGridReact
                        rowData={customers}
                        columnDefs={columnDefs}
                        paginationPageSize={15}
                        pagination={true}
                    />
                </div>
                <Snackbar
                    open={open}
                    message={msg}
                    autoHideDuration={4000}
                    onClose={handleClose}
                />
            </div>
        </div>
    );

}

export default CustomerList;