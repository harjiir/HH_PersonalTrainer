import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Addtraining from "./Addtraining";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Trainings() {

    // List of trainings
    const [trainings, setTrainings] = useState([]);

    // Table Columns
    const [columnDefs, setColumnDefs] = useState([
        {
            field: "date",
            width: 200,
            sortable: true,
            filter: true,
            cellRenderer: (data) => {
                return data.value ? (new Date(data.value)).toLocaleDateString() : '';
            }
        },
        {
            field: "duration",
            width: 200,
            sortable: true,
            filter: true
        },
        {
            field: "activity",
            width: 200,
            sortable: true,
            filter: true
        },
        {
            field: 'customer',
            width: 176,
            sortable: true,
            filter: true,
        },
        {
            field: '_links.self.href',
            headerName: '',
            width: 100,
            cellRenderer: params =>
                <IconButton color="error">
                    <DeleteIcon />
                </IconButton>
        },
        {
            field: '_links.self.href',
            headerName: '',
            width: 100,
            cellRenderer: params =>
                <IconButton color="error">
                    <DeleteIcon />
                </IconButton>
        }
    ]);

    // Fetching trainings from Heroku link
    const fetchTrainings = () => {
        fetch("https://customerrest.herokuapp.com/api/trainings")
            .then((response) => response.json())
            .then((data) => setTrainings(data.content));
    };

    // Fetching trainings everytime page loads
    // see fetchTrainings function
    useEffect(() => {
        fetchTrainings();
        console.log(trainings);
    }, []);

    // Adding a new training with REST interface
    const addTraining = (training) => {
        console.log("Trainings addTraining method")
        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(training),
        })
            .then((response) => {
                if (response.ok) {
                    fetchTrainings();
                }
            });
    };

    return (
        <div>
            <Addtraining addTraining={addTraining} />
            <div style={{ height: "100%", boxSizing: "border-box" }}>
                <div style={{ height: 600, width: '100%' }} className="ag-theme-material">
                    <AgGridReact
                        rowData={trainings}
                        columnDefs={columnDefs}
                        paginationPageSize={10}
                        pagination={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default Trainings;