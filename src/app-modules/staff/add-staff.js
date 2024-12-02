import React, {useEffect, useState} from 'react';
import { TextField, Button, Container, Stack } from '@mui/material';
import { Link, useLocation, useNavigate } from "react-router-dom"
import DropdownMuiRct from '../reusableComponents/mui/single-select/index.tsx';
import { apiService } from '../reusableComponents/services/apiService.tsx';
 
 
const AddStaff = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setusername] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [gender, setGender] = useState()
    const [isEdit, setIsEdit] = useState(false)
    const [dept, setDept] = useState()
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        if (location && location.state && location.state.user && location.state.isEdit) {
            const user = JSON.parse(location.state.user)
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setusername(user.username)
            setEmail(user.email)
            setMobile(user.mobile)
            setGender(user.gender); 
            setDept(user.department); 
            setIsEdit(location.state.isEdit)
        }
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
    
        const data = {
            firstName,
            lastName,
            username,
            email,
            mobile,
            gender,
            department: dept,
        };
    
        if (isEdit) {
            data.id = JSON.parse(location.state.user).id;
        }
    
        try {
            const response = isEdit
                ? await apiService.updateStaff(data)
                : await apiService.addStaff(data);
    
            if (response.status === 200) {
                navigate('/staff/list');
            } else {
                alert('An error occurred while processing your request.');
            }
        } catch (error) {
            console.error("Error occurred:", error);
            alert('Something went wrong. Please try again.');
        }
    }
    

    const genderOptions = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Unknown', value: 'unknown' }
    ];
    const deptOptions = [
        { label: 'Staff', value: 1 },
        { label: 'HR', value: 2 },
        { label: 'Management', value: 3 }
    ];
 
    return (
        <React.Fragment>
            <div className='container-fluid'>
                <div className='form-container'>
               <div className="py-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h3>
                        {isEdit ? 'Edit Staff' : 'Add Staff'}
                    </h3>
                </div>
                </div>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        placeholder='First Name'
                        color='secondary'
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        placeholder='Last Name'
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        onChange={e => setusername(e.target.value)}
                        value={username}
                        placeholder='username'
                        fullWidth
                        required
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                <TextField
                    type="email"
                    variant='outlined'
                    color='secondary'
                    placeholder='Enter your work email'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    fullWidth
                    required
                    sx={{mb: 4}}
                    autoComplete='off'
                />
                    <TextField
                        type='text'
                        variant='outlined'
                        placeholder='Mobile'
                        color='secondary'
                        onChange={e => setMobile(e.target.value)}
                        value={mobile}
                        fullWidth
                        required
                    />
                    
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>

                <DropdownMuiRct
                    id={'gender-select'}
                    label="Gender"
                    options={genderOptions}
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)} 
                    name="gender"
                    fullWidth
                />


                <DropdownMuiRct
                    id={'department-select'}
                    label="Department"
                    options={deptOptions}
                    value={dept}
                    onChange={(e) => setDept(e.target.value)} 
                    name="dept"
                    fullWidth
                />

                    
                </Stack>
 
                <Button className='submitButon' variant='contained' type="submit">{isEdit ? 'Edit Staff' : 'Add Staff'}</Button>
                <Button variant='outlined' onClick={() => {navigate(-1)}} className="mx-2" color="primary">Cancel</Button>
            </form>
            </div>
            </div>
        </React.Fragment>
    )
}
 
export default AddStaff;