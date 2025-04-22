package com.seven.hayoma.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderId;
    private LocalDate date;
    private Double total;
    private String status;
    private String payment;

    @ManyToOne
    @JoinColumn(name = "shop_id")
    private Shop shop;

    // Getters and setters
}
