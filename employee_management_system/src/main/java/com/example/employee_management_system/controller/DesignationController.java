package com.example.employee_management_system.controller;

import com.example.employee_management_system.model.Designation;
import com.example.employee_management_system.repository.DesignationDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class DesignationController {

    @Autowired
    private DesignationDao designationDao;

    @GetMapping("/designations")
    public List<Designation> getAllDesignations()
    {
        return designationDao.findAll();
    }

    @GetMapping("/designations/{id}")
    public Optional<Designation> getDesignationById(@PathVariable Long id)
    {
        return designationDao.findById(id);
    }

    @PostMapping("/designations")
    @PreAuthorize("hasRole('ADMIN')")
    public Designation createDesignation(@RequestBody Designation designationObj)
    {
        return designationDao.save(designationObj);
    }

    @PutMapping ("/designations")
    @PreAuthorize("hasRole('ADMIN')")
    public Optional<Designation> updateDesignation(@RequestBody Designation designationDetails)
    {
        Designation designation = designationDao.findById(designationDetails.getId()).orElseThrow(() -> new RuntimeException("Designation not found with id: " + designationDetails.getId()));
        designation.setDesignation(designationDetails.getDesignation());
        designation.setSalary(designationDetails.getSalary());

        designationDao.save(designation);

        return designationDao.findById(designationDetails.getId());
    }

    @DeleteMapping ("/designations/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteDesignation(@PathVariable Long id)
    {
        designationDao.findById(id).orElseThrow(() -> new RuntimeException("Designation not found with id: " + id));
        designationDao.deleteById(id);
    }


}
