import './App.css';
import { AppBar, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Home from './components/Home.js'
import Customers from './components/Customers.js'
import Trainings from './components/Trainings.js'

function App() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            HH PersonalTrainer
          </Typography>
          <Box sx={{ width: '50%', margin: 'auto' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab value="1" label="Home" />
              <Tab value="2" label="Trainings" />
              <Tab value="3" label="Customers" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
      <div class="content">
        {value === '1' && <Home />}
        {value === '2' && <Trainings />}
        {value === '3' && <Customers />}
      </div>
    </div>
  );
}

export default App;
