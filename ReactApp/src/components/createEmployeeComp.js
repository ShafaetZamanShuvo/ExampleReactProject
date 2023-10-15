import React, { useState, useEffect } from 'react';
import employeeService from '../services/employeeService';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import designationService from '../services/designationService';

function CreateEmployeeComp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [designation, setDesignation] = useState('');
    const [designations, setDesignations] = useState([]);


    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setFirstName(location.state.firstName || '');
            setLastName(location.state.lastName || '');
            setEmail(location.state.email || '');
            setId(location.state.id || '');
            setDesignation(location.state.designation || '');
            designationService.getDesignations().then((res) => {
                setDesignations(res.data);
            });

        } else {
            designationService.getDesignations().then((res) => {
                setDesignations(res.data);
                console.log(res.data);
            });
        }

    }, [location.state]);


    const editMode = location.state && location.state.id;

    const saveEmployee = (e) => {
        e.preventDefault();

        if (editMode) {
            const employee = { id: location.state.id, firstName: firstName, lastName: lastName, email: email, designation_id: designation };
            employeeService.updateEmployee(employee).then((res) => {
                navigate('/employees', { state: { message: 'Employee updated successfully' } });

            });
        }
        else {
            const employee = { firstName: firstName, lastName: lastName, email: email, designation_id: designation };
            console.log('employee => ' + JSON.stringify(employee));
            employeeService.createEmployee(employee).then((res) => {
                navigate('/employees', { state: { message: 'Employee added successfully' } });
            });
        }

    };


    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3 mt-4'>
                        <div className=''>
                            <h3 className='text-center'>{editMode ? 'Edit Employee' : 'Add Employee'}</h3>
                            <Link to='/employees' className='btn btn-primary btn-sm' style={{ float: 'right' }}>
                                Back
                            </Link>
                        </div>
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label className='form-label text-left'>First Name:</label>
                                    <input
                                        placeholder='First Name'
                                        name='firstName'
                                        className='form-control'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label className='form-label text-left'> Last Name:</label>
                                    <input
                                        placeholder='Last Name'
                                        name='lastName'
                                        className='form-control'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label className='form-label text-left'>Email Id:</label>
                                    <input
                                        placeholder='Email Id'
                                        name='email'
                                        className='form-control'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label className='form-label text-left'>Designation:</label>
                                    <select
                                        className='form-select'
                                        name='designation'
                                        value={designation}
                                        style={{ width: '100%', textShadow: '-moz-initial' }}
                                        onChange={(e) => setDesignation(e.target.value)}
                                    >
                                        <option value=''>Select Designation</option>
                                        {designations.map((d) => (

                                            <option key={d.id} value={d.id}>
                                                {d.designation}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                <br></br>
                                <div className='form-group'>
                                    <button className='btn btn-success' onClick={saveEmployee}>
                                        {editMode ? 'Update' : 'Save'}
                                    </button>
                                    <button
                                        className='btn btn-danger'
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => navigate('/add-employee')}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateEmployeeComp;
