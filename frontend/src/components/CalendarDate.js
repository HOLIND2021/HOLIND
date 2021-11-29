import React from 'react';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

export default function CalendarDate() {
    const [value, setValue] = React.useState(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate() + 1));

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Stack spacing={3}>
                <MobileDatePicker
                    label="Due Date"
                    inputFormat="MM/dd/yyyy"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField id="caldate" name="caldate" {...params} />}
                />
            </Stack>
        </LocalizationProvider>
    );
}