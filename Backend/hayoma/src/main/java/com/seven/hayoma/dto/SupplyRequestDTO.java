package com.seven.hayoma.dto;

import com.seven.hayoma.model.SupplyStatus;
import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplyRequestDTO {
    private Long id;
    private String productName;
    private String unit;
    private double quantity;
    private LocalDate requestDate;
    private LocalDate deliveryDate;
    private SupplyStatus status;
    private String notes;
}