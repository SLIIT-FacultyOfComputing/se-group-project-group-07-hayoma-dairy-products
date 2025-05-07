
package com.seven.hayoma.service.impl;

import com.seven.hayoma.dto.DeliveryDTO;
import com.seven.hayoma.model.Delivery;
import com.seven.hayoma.repository.DeliveryRepository;
import com.seven.hayoma.service.DeliveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DeliveryServiceImpl implements DeliveryService {

    private final DeliveryRepository deliveryRepository;

    @Override
    public DeliveryDTO createDelivery(DeliveryDTO dto) {
        Delivery delivery = toEntity(dto);
        return toDTO(deliveryRepository.save(delivery));
    }

    @Override
    public DeliveryDTO assignDriver(Long deliveryId, Long driverId) {
        Delivery delivery = getDeliveryOrThrow(deliveryId);
        delivery.setDriverId(driverId);
        return toDTO(deliveryRepository.save(delivery));
    }

    @Override
    public DeliveryDTO confirmByOrigin(Long deliveryId) {
        Delivery delivery = getDeliveryOrThrow(deliveryId);
        delivery.setConfirmedByOrigin(true);
        return toDTO(deliveryRepository.save(delivery));
    }

    @Override
    public DeliveryDTO confirmByDriver(Long deliveryId) {
        Delivery delivery = getDeliveryOrThrow(deliveryId);
        delivery.setConfirmedByDriver(true);
        return toDTO(deliveryRepository.save(delivery));
    }

    @Override
    public DeliveryDTO confirmPayment(Long deliveryId) {
        Delivery delivery = getDeliveryOrThrow(deliveryId);
        delivery.setPaymentConfirmed(true);
        return toDTO(deliveryRepository.save(delivery));
    }

    @Override
    public List<DeliveryDTO> getAllDeliveries() {
        return deliveryRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<DeliveryDTO> getDeliveriesByDriver(Long driverId) {
        return deliveryRepository.findByDriverId(driverId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<DeliveryDTO> getDeliveriesByOrigin(Long originId, String originType) {
        return deliveryRepository.findByOriginIdAndOriginType(originId, originType).stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    private Delivery getDeliveryOrThrow(Long id) {
        return deliveryRepository.findById(id).orElseThrow(() -> new RuntimeException("Delivery not found"));
    }

    private Delivery toEntity(DeliveryDTO dto) {
        return Delivery.builder()
                .id(dto.getId())
                .originId(dto.getOriginId())
                .originType(dto.getOriginType())
                .driverId(dto.getDriverId())
                .orderId(dto.getOrderId())
                .confirmedByOrigin(dto.isConfirmedByOrigin())
                .confirmedByDriver(dto.isConfirmedByDriver())
                .paymentConfirmed(dto.isPaymentConfirmed())
                .build();
    }

    private DeliveryDTO toDTO(Delivery delivery) {
        return DeliveryDTO.builder()
                .id(delivery.getId())
                .originId(delivery.getOriginId())
                .originType(delivery.getOriginType())
                .driverId(delivery.getDriverId())
                .orderId(delivery.getOrderId())
                .confirmedByOrigin(delivery.isConfirmedByOrigin())
                .confirmedByDriver(delivery.isConfirmedByDriver())
                .paymentConfirmed(delivery.isPaymentConfirmed())
                .build();
    }
}
