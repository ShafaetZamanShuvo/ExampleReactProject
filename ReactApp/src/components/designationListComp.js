import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import designationService from '../services/designationService';
import UnauthorizedAccessComp from './unauthorizedAccessComp';
import userService from '../services/userService';

function DesignationListComp() {
    const [designations, setDesignations] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);



    useEffect(() => {
        //first check if user is admin
        const user = userService.getCurrentUser();
        if (user) {
            setIsAdmin(user.roles.includes('ROLE_ADMIN'));
        }

        designationService.getDesignations().then((res) => {
            setDesignations(res.data);
            console.log(res.data);
        });
    }, []);

    const navigate = useNavigate();

    const editDesignation = (id) => {
        designationService.getDesignationById(id).then((res) => {
            console.log(res.data);
            navigate(`/add-designation`, { state: { id: id, designation: res.data.designation, salary: res.data.salary } });
        });
    }

    const deleteDesignation = (id) => {
        //first show confirm dialog
        if (window.confirm('Are you sure you want to delete this designation?')) {
            //delete designation
            designationService.deleteDesignation(id).then(() => {
                setDesignations(designations.filter((designation) => designation.id !== id));
                navigate('/designations', { state: { message: 'Designation deleted successfully' } });
            });
        }
    }




    return (
        <div>
            {isAdmin ? (
                <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className='card mt-4'>
                            <div className='card-body'>
                                <h3 className='text-center'>Designations</h3>
                                <table className='table table-bordered table-striped table-hover'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Designation Name</th>
                                            <th>Starting Salary</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {designations.map((designation) => (
                                            <tr key={designation.id}>
                                                <td>{designation.id}</td>
                                                <td>{designation.designation}</td>
                                                <td>{designation.salary}</td>
                                                <td>
                                                    <button
                                                        className='btn btn-info btn-sm'
                                                        onClick={() => editDesignation(designation.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className='btn btn-danger btn-sm'
                                                        style={{ marginLeft: '10px' }}
                                                        onClick={() => deleteDesignation(designation.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Link to='/add-designation' className='btn btn-primary btn-sm'>
                                    Add Designation
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) : (
                <UnauthorizedAccessComp />
            )}
        </div>
    );
}

export default DesignationListComp;
