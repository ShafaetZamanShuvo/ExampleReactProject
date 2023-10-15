// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import employeeService from '../services/employeeService';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import userService from '../services/userService';
// import designationService from '../services/designationService';
// import { Button } from '@mui/material';

// function EmployeeListComp() {
//     const [employees, setEmployees] = useState([]);
//     const [designations, setDesignations] = useState([]);
//     const [isAdmin, setIsAdmin] = useState(false);

//     useEffect(() => {
//         // First check if the user is an admin
//         const user = userService.getCurrentUser();
//         if (user) {
//             setIsAdmin(user.roles.includes('ROLE_ADMIN'));
//         }

//         employeeService.getEmployees().then((res) => {
//             setEmployees(res.data);

//             // Fetch designation names for all employees using Promise.all
//             const designationPromises = res.data.map(async (employee) => {
//                 const res = await designationService.getDesignationById(employee.designation_id);
//                 return res.data.designation;
//             });

//             Promise.all(designationPromises).then((designationNames) => {
//                 setDesignations(designationNames);
//             });
//         });
//     }, []);

//     const navigate = useNavigate();

//     const editEmployee = (id) => {
//         employeeService.getEmployeeById(id).then((res) => {
//             navigate(`/edit-employee/${id}`, {
//                 state: {
//                     id: id,
//                     firstName: res.data.firstName,
//                     lastName: res.data.lastName,
//                     email: res.data.email,
//                     designation: res.data.designation_id,
//                 },
//             });
//         });
//     };

//     const deleteEmployee = (id) => {
//         // First show confirm dialog
//         if (window.confirm('Are you sure you want to delete this employee?')) {
//             // Delete employee
//             employeeService.deleteEmployee(id).then(() => {
//                 setEmployees(employees.filter((employee) => employee.id !== id));
//                 navigate('/employees', { state: { message: 'Employee deleted successfully' } });
//             });
//         }
//     };

//     return (
//         <div>
//             <div className="container">
//                 <div className="row">
//                     <div className="col-md-12">
//                         <div className='card mt-4'>
//                             <div className='card-body'>
//                                 <h3 className='text-center'>Employees</h3>
//                                 <table className='table table-bordered table-striped table-hover'>
//                                     <thead>
//                                         <tr>
//                                             <th>Employee ID</th>
//                                             <th>First Name</th>
//                                             <th>Last Name</th>
//                                             <th>Email</th>
//                                             <th>Designation</th>
//                                             <th>Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {employees.map((employee, index) => (
//                                             <tr key={index}>
//                                                 <td>{employee.id}</td>
//                                                 <td>{employee.firstName}</td>
//                                                 <td>{employee.lastName}</td>
//                                                 <td>{employee.email}</td>
//                                                 <td>{designations[index]}</td>
//                                                 <td>
//                                                     <Button
//                                                         // className='btn btn-info btn-sm'
//                                                         variant='outlined'
//                                                         size='small'
//                                                         onClick={() => editEmployee(employee.id)}
//                                                     >
//                                                         Edit
//                                                     </Button> &nbsp;
//                                                     {isAdmin && (
//                                                         <button
//                                                             className='btn btn-danger btn-sm'
//                                                             onClick={() => deleteEmployee(employee.id)}
//                                                         >
//                                                             Delete
//                                                         </button>
//                                                     )}
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                                 <div className='text-center'>
//                                     <Link to="/add-employee" className='btn btn-primary btn-sm'>
//                                         Add Employee
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default EmployeeListComp;

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';
import designationService from '../services/designationService';
import employeeService from '../services/employeeService';

function EmployeeListComp() {
    const [employees, setEmployees] = React.useState([]);
    const [designations, setDesignations] = React.useState([]);
    const [isAdmin, setIsAdmin] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        // First check if the user is an admin
        const user = userService.getCurrentUser();
        if (user) {
            setIsAdmin(user.roles.includes('ROLE_ADMIN'));
        }

        const fetchData = async () => {
            const res = await employeeService.getEmployees();
            setEmployees(res.data);

            // Fetch designation names for all employees using Promise.all
            const designationPromises = res.data.map(async (employee) => {
                const res = await designationService.getDesignationById(employee.designation_id);
                return res.data.designation;
            });

            Promise.all(designationPromises).then((designationNames) => {
                const designationMap = {};
                res.data.forEach((employee, index) => {
                    designationMap[employee.id] = designationNames[index];
                });
                setDesignations(designationMap);
            });
        };

        fetchData();
    }, []);

    const editEmployee = (id) => {
        employeeService.getEmployeeById(id).then((res) => {
            navigate(`/edit-employee/${id}`, {
                state: {
                    id: id,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    designation: res.data.designation_id,
                },
            });
        });
    };

    const deleteEmployee = (id) => {
        // First show confirm dialog
        if (window.confirm('Are you sure you want to delete this employee?')) {
            // Delete employee
            employeeService.deleteEmployee(id).then(() => {
                setEmployees(employees.filter((employee) => employee.id !== id));
                navigate('/employees', { state: { message: 'Employee deleted successfully' } });
            });
        }
    };

    const totalColumns = 6;
    const totalWidth = 120 * totalColumns;
    const columnWidth = totalWidth / totalColumns;

    const columns = [
        { field: 'id', headerName: 'Employee ID', flex: 0.05 },
        { field: 'firstName', headerName: 'First Name', flex: 0.1 },
        { field: 'lastName', headerName: 'Last Name', flex: 0.1 },
        { field: 'email', headerName: 'Email',  flex: 0.1 },
        {
            field: 'designation',
            headerName: 'Designation',
            flex: 0.1,
            valueGetter: (params) => designations[params.row.id] || '',
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.1,
            renderCell: (params) => (
                <div>
                    <button
                        className='btn btn-info btn-sm'
                        onClick={() => editEmployee(params.row.id)}
                        style={{ marginRight: '10px' }}
                    >
                        Edit
                    </button>
                    {isAdmin && (
                        <button
                            className='btn btn-danger btn-sm'
                            onClick={() => deleteEmployee(params.row.id)}
                        >
                            Delete
                        </button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className='card mt-4'>
                            <div className='card-body'>
                                <h3 className='text-center'>Employees</h3>
                                <DataGrid
                                    rows={employees}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                          paginationModel: { page: 0, pageSize: 10 },
                                        },
                                      }}
                                      pageSizeOptions={[5, 10, 15, 20]}
                                      
                                      density='compact'
                                />

                                <br />
                                <div className='text-center'>
                                    <Link to="/add-employee" className='btn btn-primary btn-sm'>
                                        Add Employee
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeListComp;
