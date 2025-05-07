package com.seven.hayoma.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryItemDTO {
    private Long id;
    private String name;
    private int quantity;
    private double price;
    private Long shopId;
}