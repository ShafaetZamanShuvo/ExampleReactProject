import React from 'react';
import './App.css';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import EmployeeListComp from './components/employeeListComp';
import HeaderComp from './components/headerComp';
import FooterComp from './components/footerComp';
import CreateEmployeeComp from './components/createEmployeeComp';
import AlertComp from './components/alertComp';
import DesignationListComp from './components/designationListComp';
import LoginComp from './components/loginComp';
import DesignationForm from './components/createDesignationComp';
import MultipleComp from './components/multipleComp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComp />
        <AlertComp />
        <Routes>
          <Route path="/login" element={<LoginComp />} />
          <Route path="/employees" element={<EmployeeListComp />} />
          <Route path="/add-employee" element={<CreateEmployeeComp />} />
          <Route path="/edit-employee/:id" element={<CreateEmployeeComp />} />
          <Route path="/designations" element={<DesignationListComp />} />
          <Route path="/add-designation" element={<DesignationForm />} />
          <Route path="/multiple" element={<MultipleComp />} />
        </Routes>
        <FooterComp />
      </BrowserRouter>
    </div>
  );
}

export default App;
