
package com.seven.hayoma.service;

import com.seven.hayoma.dto.DeliveryDTO;
import java.util.List;

public interface DeliveryService {
    DeliveryDTO createDelivery(DeliveryDTO dto);
    DeliveryDTO assignDriver(Long deliveryId, Long driverId);
    DeliveryDTO confirmByOrigin(Long deliveryId);
    DeliveryDTO confirmByDriver(Long deliveryId);
    DeliveryDTO confirmPayment(Long deliveryId);
    List<DeliveryDTO> getAllDeliveries();
    List<DeliveryDTO> getDeliveriesByDriver(Long driverId);
    List<DeliveryDTO> getDeliveriesByOrigin(Long originId, String originType);
}
