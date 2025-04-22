package com.seven.hayoma.controller;

import com.seven.hayoma.dto.SupplierDTO;
import com.seven.hayoma.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {

    @Autowired
    private SupplierService service;

    @GetMapping
    public List<SupplierDTO> getAllSuppliers() {
        return service.getAllSuppliers();
    }

    @GetMapping("/{id}")
    public SupplierDTO getSupplier(@PathVariable Long id) {
        return service.getSupplierById(id);
    }

    @PostMapping
    public SupplierDTO createSupplier(@RequestBody SupplierDTO dto) {
        return service.createSupplier(dto);
    }

    @DeleteMapping("/{id}")
    public void deleteSupplier(@PathVariable Long id) {
        service.deleteSupplier(id);
    }
}
