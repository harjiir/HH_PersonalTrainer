import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

// Buttons
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// Notification
import Snackbar from '@mui/material/Snackbar'

// Own js
import Addtraining from "./Addtraining";
import Edittraining from "./Edittraining";

// Date fns format
import { format } from 'date-fns'

// CSS files
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function TrainingList() {

    // List of trainings
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    // URL for data
    const trainingListUrl = 'https://customerrest.herokuapp.com/gettrainings';
    const trainingsUrl = 'https://customerrest.herokuapp.com/api/trainings';

    const handleClose = () => {
        setOpen(false)
    }

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
                    setMsg('New Training added successfully');
                    setOpen(true);
                    fetchTrainings();
                } else {
                    alert('Something went wrong...');
                }
            })
            .catch(err => console.error(err))

    }

    // Delete Training -method
    const deleteTraining = (url) => {
        if (window.confirm('Delete this training?')) {
            fetch(url, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        setMsg('Training deleted successfully')
                        setOpen(true)
                        fetchTrainings();
                    } else {
                        alert('Something went wrong...');
                    }
                })
                .catch(err => console.error(err))
        }
        setOpen(false);
    }

    // Edit Training -method
    const editTraining = (url, updatedTraining) => {
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedTraining)
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Changes saved')
                    setOpen(true)
                    fetchTrainings();
                } else {
                    alert('Something went wrong...');
                }
            })
            .catch(err => console.error(err))
        setOpen(false);

    }

    // Format for date
    const dateValueGetter = (trainings) => {
        const formattedDate = format(new Date(trainings.data.date), 'dd.MM.yyyy HH:mm')
        return formattedDate;
    }

    // Table Columns
    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: "Date and Time",
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

export default TrainingList;