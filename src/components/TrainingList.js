import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Addtraining from "./Addtraining";
import Edittraining from "./Edittraining";
import dayjs from 'dayjs'
import { format } from 'date-fns'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function TrainingList() {

    // List of trainings
    const [trainings, setTrainings] = useState([]);

    // URL for data
    const trainingListUrl = 'https://customerrest.herokuapp.com/gettrainings'
    const trainingsUrl = 'https://customerrest.herokuapp.com/api/trainings'

    // Fetching trainings from Heroku link
    const fetchTrainings = () => {
        fetch(trainingListUrl)
            .then((response) => response.json())
            .then((data) => setTrainings(data))
            .catch(err => console.error(err))
    };

    // Fetching trainings everytime page loads
    // see fetchTrainings function
    useEffect(() => {
        fetchTrainings();
    }, []);

    // Adding a new training with REST interface
    const addTraining = (training) => {
        fetch(trainingsUrl, {
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
            fetch(url, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        fetchTrainings();
                    } else {
                        alert('Something went wrong');
                    }
                })
                .catch(err => console.error(err))
        }
    }

    // Edit Training -method
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

    const dateValueGetter = (trainings) => {
        const formattedDate = format(new Date(trainings.data.date), 'dd.MM.yyyy HH:mm')
        return formattedDate;
    }

    // Table Columns
    const [columnDefs, setColumnDefs] = useState([
        {
            field: "date",
            valueGetter: dateValueGetter,
            width: 200,
            sortable: true,
            filter: true,
        },
        {
            headerName: "Duration (min)",
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
            headerName: 'Customer',
            field: 'customer.lastname',
            width: 200,
            sortable: true,
            filter: true,
        },
        {
            headerName: '',
            field: 'links.0.href',
            width: 90,
            cellRenderer: params => <Edittraining editTraining={editTraining} training={params} />
        },
        {
            headerName: '',
            field: 'links.0.href',
            width: 100,
            cellRenderer: params =>
                <IconButton color="error" onClick={() => deleteTraining("https://customerrest.herokuapp.com/api/trainings/" + params.data.id)}>
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