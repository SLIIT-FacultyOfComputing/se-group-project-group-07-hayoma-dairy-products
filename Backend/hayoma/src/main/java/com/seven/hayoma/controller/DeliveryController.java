
package com.seven.hayoma.controller;

import com.seven.hayoma.dto.DeliveryDTO;
import com.seven.hayoma.service.DeliveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/delivery")
@RequiredArgsConstructor
public class DeliveryController {

    private final DeliveryService deliveryService;

    @PostMapping
    @PreAuthorize("hasAnyRole('SHOP', 'SUPPLIER')")
    public DeliveryDTO createDelivery(@RequestBody DeliveryDTO dto) {
        return deliveryService.createDelivery(dto);
    }

    @PutMapping("/{id}/assign-driver/{driverId}")
    @PreAuthorize("hasRole('ADMIN')")
    public DeliveryDTO assignDriver(@PathVariable Long id, @PathVariable Long driverId) {
        return deliveryService.assignDriver(id, driverId);
    }

    @PutMapping("/{id}/confirm-origin")
    @PreAuthorize("hasAnyRole('SHOP', 'SUPPLIER')")
    public DeliveryDTO confirmByOrigin(@PathVariable Long id) {
        return deliveryService.confirmByOrigin(id);
    }

    @PutMapping("/{id}/confirm-driver")
    @PreAuthorize("hasRole('DRIVER')")
    public DeliveryDTO confirmByDriver(@PathVariable Long id) {
        return deliveryService.confirmByDriver(id);
    }

    @PutMapping("/{id}/confirm-payment")
    @PreAuthorize("hasRole('ADMIN')")
    public DeliveryDTO confirmPayment(@PathVariable Long id) {
        return deliveryService.confirmPayment(id);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<DeliveryDTO> getAll() {
        return deliveryService.getAllDeliveries();
    }

    @GetMapping("/driver/{driverId}")
    @PreAuthorize("hasRole('DRIVER')")
    public List<DeliveryDTO> getByDriver(@PathVariable Long driverId) {
        return deliveryService.getDeliveriesByDriver(driverId);
    }

    @GetMapping("/origin/{originType}/{originId}")
    @PreAuthorize("hasAnyRole('SHOP', 'SUPPLIER')")
    public List<DeliveryDTO> getByOrigin(@PathVariable String originType, @PathVariable Long originId) {
        return deliveryService.getDeliveriesByOrigin(originId, originType);
    }
}
