package com.hayoma.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplyHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String supplyId;
    private String productName;
    private double quantity;
    private String unit;
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private SupplyStatus status;

    @Enumerated(EnumType.STRING)
    private PaymentStatus payment;

    private double amount;
}