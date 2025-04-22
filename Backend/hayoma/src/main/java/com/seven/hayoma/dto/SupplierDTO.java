package com.seven.hayoma.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class SupplierDTO {
    private Long id;
    private String name;
    private String category;
    private String contactPerson;
    private String phone;
    private String status;
}
