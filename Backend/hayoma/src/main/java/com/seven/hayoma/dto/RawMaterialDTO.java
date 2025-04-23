package com.seven.hayoma.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class RawMaterialDTO {
    private Long id;
    private String name;
    private String category;
    private Double quantity;
    private String unit;
    private LocalDate lastUpdated;
    private Long supplierId;
    private LocalDate date;
}
