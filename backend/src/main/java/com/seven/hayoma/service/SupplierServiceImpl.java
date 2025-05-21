package com.seven.hayoma.service;

import com.seven.hayoma.dto.SupplierDTO;
import com.seven.hayoma.model.Supplier;
import com.seven.hayoma.repository.SupplierRepository;
import com.seven.hayoma.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SupplierServiceImpl implements SupplierService {
    @Autowired
    private SupplierRepository repository;

    @Override
    public List<SupplierDTO> getAllSuppliers() {
        return repository.findAll().stream().map(o -> {
            SupplierDTO dto = new SupplierDTO();
            dto.setId(o.getId());
            dto.setId(o.getId());
            dto.setStatus(o.getStatus());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public SupplierDTO getSupplierById(Long id) {
        return getAllSuppliers().stream().filter(o -> o.getId().equals(id)).findFirst().orElse(null);
    }

    @Override
    public SupplierDTO createSupplier(SupplierDTO dto) {
        Supplier supplier = new Supplier();
        supplier.setId(dto.getId());;
        supplier.setStatus(dto.getStatus());
        return getSupplierById(repository.save(supplier).getId());
    }

    @Override
    public void deleteSupplier(Long id) {
        repository.deleteById(id);
    }
}
