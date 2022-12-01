import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Addcustomer from './Addcustomer.js';
import Editcustomer from "./Editcustomer.js";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function CustomerList() {

    // List of trainings
    const [customers, setCustomers] = useState([]);

    // Table Columns
    const [columnDefs, setColumnDefs] = useState([
        {
            field: "firstname",
            width: 180,
            sortable: true,
            filter: true,
        },
        {
            field: "lastname",
            width: 180,
            sortable: true,
            filter: true
        },
        {
            headerName: 'Address',
            field: "streetaddress",
            width: 240,
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
            width: 200,
            sortable: true,
            filter: true,
        },
        {
            field: 'phone',
            width: 200,
            sortable: true,
            filter: true,
        },
        {
            headerName: '',
            field: 'links.href',
            width: 100,
            cellRenderer: params =>
                <Editcustomer updateCustomer={updateCustomer} params={params} />
        },
        {
            headerName: '',
            field: 'links.href',
            width: 100,
            cellRenderer: params =>
                <IconButton color="error" onClick={() => deleteCustomer(params.value)}>
                    <DeleteIcon />
                </IconButton>
        }
    ]);

    // Fetching customers from Heroku link
    const fetchCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
            .then((response) => response.json())
            .then((data) => setCustomers(data.content));
    };

    // Fetching customers everytime page loads
    // see fetchCustomers method
    useEffect(() => {
        fetchCustomers();
        console.log(customers);
    }, []);

    // Adding a new customer with REST interface
    const addCustomer = (customer) => {
        console.log("CustomerList addCustomer method")
        fetch("https://customerrest.herokuapp.com/api/customers", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer),
        })
            .then((response) => {
                if (response.ok) {
                    fetchCustomers();
                }
            });
    };

    // Delete Customer Method
    const deleteCustomer = (link) => {
        console.log("Delete method")
        fetch(link, {
            method: 'DELETE'
        })
            .then((response) => {
                if (response.ok) {
                    fetchCustomers();
                }
            })
    }

    // Update Customer method
    const updateCustomer = (updateCustomer, link) => {
        console.log("Edit method")
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateCustomer),
        })
            .then((response) => {
                if (response.ok) {
                    fetchCustomers();
                }
            })
    }

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
            </div>
        </div>
    );
}

export default CustomerList;