package com.seven.hayoma.service;

import com.seven.hayoma.dto.SupplyRequestDTO;
import com.seven.hayoma.dto.SupplyHistoryDTO;
import com.seven.hayoma.model.*;
import com.seven.hayoma.repository.SupplyRequestRepository;
import com.seven.hayoma.repository.SupplyHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplyServiceImpl implements SupplyService {

    //private final SupplyRequestRepository requestRepo;
    //private final SupplyHistoryRepository historyRepo;

    @Override
    public SupplyRequestDTO createRequest(SupplyRequestDTO dto) {
        SupplyRequest entity = SupplyRequest.builder()
                .productName(dto.getProductName())
                .unit(dto.getUnit())
                .quantity(dto.getQuantity())
                .requestDate(dto.getRequestDate())
                .deliveryDate(dto.getDeliveryDate())
                .status(SupplyStatus.PENDING)
                .notes(dto.getNotes())
                .build();
        entity = requestRepo.save(entity);
        dto.setId(entity.getId());
        return dto;
    }

    @Override
    public List<SupplyRequestDTO> getAllRequests() {
        return requestRepo.findAll().stream().map(r ->
                SupplyRequestDTO.builder()
                        .id(r.getId())
                        .productName(r.getProductName())
                        .unit(r.getUnit())
                        .quantity(r.getQuantity())
                        .requestDate(r.getRequestDate())
                        .deliveryDate(r.getDeliveryDate())
                        .status(r.getStatus())
                        .notes(r.getNotes())
                        .build()).collect(Collectors.toList());
    }

    @Override
    public SupplyRequestDTO updateRequestStatus(Long id, String status) {
        SupplyRequest request = requestRepo.findById(id).orElseThrow();
        request.setStatus(SupplyStatus.valueOf(status.toUpperCase()));
        requestRepo.save(request);
        return getAllRequests().stream().filter(r -> r.getId().equals(id)).findFirst().orElse(null);
    }

    @Override
    public List<SupplyHistoryDTO> getSupplyHistory() {
        return historyRepo.findAll().stream().map(h ->
                SupplyHistoryDTO.builder()
                        .id(h.getId())
                        .supplyId(h.getSupplyId())
                        .productName(h.getProductName())
                        .unit(h.getUnit())
                        .quantity(h.getQuantity())
                        .date(h.getDate())
                        .status(h.getStatus())
                        .payment(h.getPayment())
                        .amount(h.getAmount())
                        .build()).collect(Collectors.toList());
    }
}