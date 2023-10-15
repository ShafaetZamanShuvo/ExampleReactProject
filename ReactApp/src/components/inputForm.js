// InputForm.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

const InputForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, //... means spread operator, it spreads the object, so we can add more properties to it , in this case we are adding the name and value
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
    });
  };

  return (
    <div className='card card-body' style={{ backgroundColor: '#f0f0f0' }}>
      <h2>Input Form</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>First Name:</label>
          <input
            className='form-control'
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            className='form-control'
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            className='form-control'
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <button 
          className='btn btn-primary'
        type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InputForm;
