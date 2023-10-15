package com.example.employee_management_system.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "designations")
public class Designation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "designation", nullable = false, length = 50)
    private String designation;

    @Column(name = "salary", nullable = false, length = 50)
    private int salary;

}
