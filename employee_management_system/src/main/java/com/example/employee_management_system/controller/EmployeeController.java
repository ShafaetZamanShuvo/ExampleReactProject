package com.example.employee_management_system.controller;

import com.example.employee_management_system.exception.ResourceNotFoundException;
import com.example.employee_management_system.model.Employee;
import com.example.employee_management_system.repository.EmployeeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
    private EmployeeDao employeeDao;

    @GetMapping("/employees")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<Employee> getAllEmployees()
    {
        return employeeDao.findAll();
    }

    @PostMapping("/employees")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public Employee createEmployee(@RequestBody Employee employee)
    {
        return employeeDao.save(employee);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR') or hasRole('USER')")
    @GetMapping("/employees/{id}")
    public Optional<Employee> getEmployeeById(@PathVariable Long id)
    {
        return employeeDao.findById(id);
    }

    @PutMapping ("/employees/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR')")
    public Employee updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails)
    {
        Employee employee = employeeDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmail(employeeDetails.getEmail());
        employee.setDesignation_id(employeeDetails.getDesignation_id());
        return employeeDao.save(employee);
    }

    @DeleteMapping ("/employees/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteEmployee(@PathVariable Long id)
    {
        employeeDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        employeeDao.deleteById(id);
    }


}
