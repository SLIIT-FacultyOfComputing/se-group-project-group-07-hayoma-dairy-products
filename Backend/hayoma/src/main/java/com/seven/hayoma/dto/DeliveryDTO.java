
package com.seven.hayoma.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeliveryDTO {

    private Long id;
    private String originType;
    private Long originId;
    private Long orderId;
    private Long driverId;
    private boolean confirmedByOrigin;
    private boolean confirmedByDriver;
    private boolean paymentConfirmed;
}
