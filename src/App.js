import './App.css';
import { AppBar, Toolbar, Typography } from '@mui/material';
import * as React from 'react';

// From mui
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

// Own js files
import Home from './components/Home.js'
import CustomerList from './components/CustomerList.js'
import TrainingList from './components/TrainingList.js'
import Calendar from './components/Calendar.js'

function App() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" sx={{ bgcolor: '#B67C9A' }}>
        <Toolbar>
          < Typography variant="h6">
            HH PersonalTrainer
          </Typography>
          <Box sx={{ width: '50%', margin: 'auto' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs"
            >
              <Tab value="1" label="Home" />
              <Tab value="2" label="Trainings" />
              <Tab value="3" label="Customers" />
              <Tab value="4" label="Calendar" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar >
      <div class="content">
        {value === '1' && <Home />}
        {value === '2' && <TrainingList />}
        {value === '3' && <CustomerList />}
        {value === '4' && <Calendar />}
      </div>
    </div >
  );
}

export default App;
