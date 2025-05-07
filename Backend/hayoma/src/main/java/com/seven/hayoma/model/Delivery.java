
package com.seven.hayoma.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String originType;
    private Long originId;
    private Long orderId;
    private Long driverId;
    private boolean confirmedByOrigin;
    private boolean confirmedByDriver;
    private boolean paymentConfirmed;
}
