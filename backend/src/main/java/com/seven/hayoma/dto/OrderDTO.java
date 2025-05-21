package com.seven.hayoma.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class OrderDTO {
    private Long id;
    private String orderId;
    private LocalDate date;
    private Double total;
    private String status;
    private String payment;
    private Long shopId;
}
