package com.seven.hayoma.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplyRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;
    private String unit;
    private double quantity;
    private LocalDate requestDate;
    private LocalDate deliveryDate;

    @Enumerated(EnumType.STRING)
    private SupplyStatus status;

    private String notes;
}