package com.seven.hayoma.service;

import com.seven.hayoma.dto.SupplyRequestDTO;
import com.seven.hayoma.dto.SupplyHistoryDTO;

import java.util.List;

public interface SupplyService {
    SupplyRequestDTO createRequest(SupplyRequestDTO dto);
    List<SupplyRequestDTO> getAllRequests();
    SupplyRequestDTO updateRequestStatus(Long id, String status);
    List<SupplyHistoryDTO> getSupplyHistory();
}