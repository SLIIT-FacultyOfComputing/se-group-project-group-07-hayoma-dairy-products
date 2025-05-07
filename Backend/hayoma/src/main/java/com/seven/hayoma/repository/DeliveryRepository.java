
package com.seven.hayoma.repository;

import com.seven.hayoma.model.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    List<Delivery> findByOriginIdAndOriginType(Long originId, String originType);
    List<Delivery> findByDriverId(Long driverId);
}
