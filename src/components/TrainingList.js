import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Addtraining from "./Addtraining";
import Edittraining from "./Edittraining";
import dayjs from 'dayjs'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function TrainingList() {

    // List of trainings
    const [trainings, setTrainings] = useState([]);

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
        console.log("TrainingList addTraining method")
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

    // Delete Training -method
    const deleteTraining = (url) => {
        if (window.confirm('Are you sure?')) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        fetchTrainings();
                    } else {
                        alert('Something is wrong');
                    }
                })
                .catch(err => console.error(err))
        }
    }

    // Update Training function
    const editTraining = (url, updatedTraining) => {
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedTraining)
        })
            .then(_ => {
                fetchTrainings();

            })
            .catch(err => console.error(err))
    }

    // Table Columns
    const [columnDefs, setColumnDefs] = useState([
        {
            field: "date",
            width: 200,
            sortable: true,
            filter: true,
            valueFormatter: (params) => { return dayjs(params.value).format('DD.MM.YYYY hh:mm') }
        },
        {
            headerName: "Duration (minutes)",
            field: "duration",
            width: 200,
            sortable: true,
            filter: true
        },
        {
            field: "activity",
            width: 400,
            sortable: true,
            filter: true
        },
        {
            field: 'customer',
            width: 400,
            sortable: true,
            filter: true,
        },
        {
            headerName: '',
            field: 'links.0.href',
            width: 100,
            cellRenderer: params =>
                <Edittraining editTraining={editTraining} training={params} />
        },
        {
            headerName: '',
            field: 'links.0.href',
            width: 100,
            cellRenderer: params =>
                <IconButton color="error" onClick={() => deleteTraining(params.value)}>
                    <DeleteIcon />
                </IconButton>
        }
    ]);

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

export default TrainingList;