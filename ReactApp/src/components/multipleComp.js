// MultipleComp.js
import React, { useState } from 'react';
import InputForm from './inputForm';
import DataTable from './dataFile';

function MultipleComp() {
  const [formData, setFormData] = useState([]);

  const handleFormSubmit = (data) => {
    setFormData([...formData, data]);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className='card' style={{ marginTop: '50px', backgroundColor: 'lightblue' }}>
            <div className='card-body mt-5'>
              <div className='row'>
                <div className="col-md-6">
                  <InputForm onFormSubmit={handleFormSubmit} />
                </div>
                <div className="col-md-6">
                  <DataTable formData={formData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultipleComp;
