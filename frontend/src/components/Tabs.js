import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link} from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ data }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let upcoming = [];
  let overdue = [];
  let completed = [];

  data.map((patient) => {
    let earliestTask = patient?.exercises?.filter(task => task.due && task.status !== "completed").sort((a,b) => (a.due > b.due) ? 1 : (b.due > a.due) ? -1 : 0)[0];
    patient.earliestTask = earliestTask;
    if (earliestTask) {
      let date = new Date(earliestTask.due);
      let todaysDate = new Date();
      if (date.setHours(0,0,0,0) >= todaysDate.setHours(0,0,0,0)) {
        upcoming.push(patient);
      } else if (date.setHours(0,0,0,0) < todaysDate.setHours(0,0,0,0)) {
        overdue.push(patient);
      }
    } else {
      completed.push(patient);
    }
    return patient;
  })

  let patientArrays = [upcoming, overdue, completed];

  return (
    <Box sx={{ width: '35em', marginLeft: 'auto', marginRight: 'auto' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label={<p style={{ marginLeft: '30px' }}>Upcoming</p>} {...a11yProps(0)} sx={{ marginRight: '30px' }} />
          <Tab label={<p style={{ marginLeft: '30px' }}>Overdue</p>} {...a11yProps(1)} sx={{ marginRight: '30px' }} />
          <Tab label={<p style={{ marginLeft: '30px' }}>Completed</p>} {...a11yProps(2)} sx={{ marginRight: '30px' }} />
        </Tabs>
      </Box>
      {patientArrays.map((array, index) => (
        <TabPanel value={value} index={index}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Task Due Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {array.map((patient) => (
                  <TableRow
                    key={patient.first}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, textDecoration: "none" }}
                    hover={true}
                    component={Link}
                    to={{
                      pathname: `/patient/${patient.uid}`,
                      state: patient
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {patient.first} {patient.last}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {patient.earliestTask ? patient.earliestTask.due : 'Completed'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      ))}
    </Box>
  );
}