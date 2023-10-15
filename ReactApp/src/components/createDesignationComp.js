import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import designationService from '../services/designationService';
import { useLocation } from 'react-router-dom';

function DesignationForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const [designation, setDesignation] = useState('');
    const [salary, setSalary] = useState('');

    useEffect(() => {
        if (location.state) {
            setDesignation(location.state.designation || '');
            setSalary(location.state.salary || '');
        }
    }, [location.state]);

    const editMode = location.state && location.state.id;

    const saveDesignation = (e) => {
        e.preventDefault();
        const designationObj = { designation: designation, salary: salary };
        console.log('designation => ' + JSON.stringify(designationObj));
        designationService.createDesignation(designationObj).then((res) => {
            navigate('/designations', { state: { message: 'Designation added successfully' } });
        });
    }

    const updateDesignation = (e) => {
        e.preventDefault();
        const designationDetails = { id: location.state.id, designation: designation, salary: salary };
        designationService.updateDesignation(designationDetails).then((res) => {
            navigate('/designations', { state: { message: 'Designation updated successfully' } });
        });
    }

    // Function to reset form fields
    const resetForm = () => {
        setDesignation('');
        setSalary('');
    }

    return (
        <div className="container">
            <div className="row">
                <div className="offset-md-3 col-md-6  offset-md-3 mt-4">
                    <div className='card mt-4'>
                        <div className='card-body'>
                            {editMode ? <h3 className='text-center'>Edit Designation</h3> : <h3 className='text-center'>Add Designation</h3>}
                            <form>
                                <div className='form-group'>
                                    <label>Designation</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Enter Designation'
                                        value={designation}
                                        onChange={(e) => setDesignation(e.target.value)}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Salary</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Enter Salary'
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                    />
                                </div>
                                <br />
                                {editMode ? <button className='btn btn-success' onClick={updateDesignation}>Update</button> : <button className='btn btn-success' onClick={saveDesignation}>Save</button>}
                                <button className='btn btn-danger' type='reset' style={{ marginLeft: '10px' }} onClick={() => { resetForm(); navigate('/add-designation'); }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DesignationForm;
