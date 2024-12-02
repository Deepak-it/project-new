import React, { useState } from 'react';
import { TextField, Button, Stack, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useNavigate } from "react-router-dom";
import DropdownMuiRct from '../../app-modules/reusableComponents/mui/single-select/index.tsx';
import { apiService } from '../../app-modules/reusableComponents/services/apiService.tsx';
import { NotificationManager } from 'react-notifications';

const AddDocument = () => {
    const [client, setClient] = useState('');
    const [staff, setStaff] = useState('');
    const [serviceTime, setServiceTime] = useState('');
    const [dateOfService, setDateOfService] = useState('');
    const [visitType, setVisitType] = useState('');
    const navigate = useNavigate();

    const clientOptions = [
        { label: 'Client A', value: 'clientA' },
        { label: 'Client B', value: 'clientB' },
        { label: 'Client C', value: 'clientC' },
    ];

    const staffOptions = [
        { label: 'Staff A', value: 'staffA' },
        { label: 'Staff B', value: 'staffB' },
        { label: 'Staff C', value: 'staffC' },
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { client, staff, serviceTime, dateOfService, visitType };
        const response = await apiService.addDocument(data)
        if(response.status === 200) {
            navigate('/Document/list')
            NotificationManager.success('Success')
        }
    };

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="form-container">
                    <div className="py-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3>Add Document</h3>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={3} sx={{ marginBottom: 4 }}>
                            <DropdownMuiRct
                                id="client-select"
                                label="Client"
                                options={clientOptions}
                                value={client}
                                onChange={(e) => setClient(e.target.value)}
                                name="client"
                                fullWidth
                            />

                            <DropdownMuiRct
                                id="staff-select"
                                label="Staff"
                                options={staffOptions}
                                value={staff}
                                onChange={(e) => setStaff(e.target.value)}
                                name="staff"
                                fullWidth
                            />

                            <TextField
                                id="service-time"
                                type="time"
                                variant="outlined"
                                label="Service Time"
                                color="secondary"
                                value={serviceTime}
                                onChange={(e) => setServiceTime(e.target.value)}
                                fullWidth
                                required
                            />

                            <TextField
                                id="date-of-service"
                                type="date"
                                variant="outlined"
                                label="Date of Service"
                                color="secondary"
                                value={dateOfService}
                                onChange={(e) => setDateOfService(e.target.value)}
                                fullWidth
                                required
                                InputLabelProps={{ shrink: true }}
                            />

                            <FormControl>
                                <FormLabel id="visit-type-label">Visit Type</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="visit-type-label"
                                    name="visit-type"
                                    value={visitType}
                                    onChange={(e) => setVisitType(e.target.value)}
                                >
                                    <FormControlLabel value="office" control={<Radio />} label="Office" />
                                    <FormControlLabel value="virtual" control={<Radio />} label="Virtual" />
                                    <FormControlLabel value="clientSite" control={<Radio />} label="Client Site" />
                                </RadioGroup>
                            </FormControl>
                        </Stack>

                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <Button variant="contained" type="submit">Submit</Button>
                            <Button variant="outlined" onClick={() => navigate(-1)} color="primary">Cancel</Button>
                        </Stack>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AddDocument;
