package com.seven.hayoma.controller;

import com.seven.hayoma.dto.SupplyRequestDTO;
import com.seven.hayoma.dto.SupplyHistoryDTO;
import com.seven.hayoma.service.SupplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/supplies")
@RequiredArgsConstructor
public class SupplyController {

    private final SupplyService supplyService;

    @PostMapping("/request")
    public SupplyRequestDTO create(@RequestBody SupplyRequestDTO dto) {
        return supplyService.createRequest(dto);
    }

    @GetMapping("/requests")
    public List<SupplyRequestDTO> allRequests() {
        return supplyService.getAllRequests();
    }

    @PutMapping("/request/{id}/status")
    public SupplyRequestDTO updateStatus(@PathVariable Long id, @RequestParam String status) {
        return supplyService.updateRequestStatus(id, status);
    }

    @GetMapping("/history")
    public List<SupplyHistoryDTO> getHistory() {
        return supplyService.getSupplyHistory();
    }
}