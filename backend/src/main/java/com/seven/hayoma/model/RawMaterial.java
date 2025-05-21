package com.seven.hayoma.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class RawMaterial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private Double quantity;
    private String unit;
    private LocalDate lastUpdated;
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    // Getters and setters
}
