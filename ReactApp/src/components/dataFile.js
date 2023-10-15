// DataTable.js
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

const DataTable = ({ formData }) => {

  const [data, setData] = useState(formData);

  useEffect(() => {
    setData(formData);
  }, [formData]);

  const removeUser = (index) => {
    formData.splice(index, 1);
    setData([...formData]); 
  };

  return (
    <div className='card card-body'>
      <h2>Data Table</h2>
      <table className='table table-striped table-hover table-bordered'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <tr key={index}>
              <td>{data.firstName}</td>
              <td>{data.lastName}</td>
              <td>{data.email}</td>
              <td>
                <button className='btn btn-primary mr-2'>Edit</button>
                <button className='btn btn-danger' onClick={() => removeUser(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
