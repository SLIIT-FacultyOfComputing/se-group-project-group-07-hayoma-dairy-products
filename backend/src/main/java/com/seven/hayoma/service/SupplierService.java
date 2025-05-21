package com.seven.hayoma.service;

import com.seven.hayoma.dto.SupplierDTO;
import java.util.List;

public interface SupplierService {
    List<SupplierDTO> getAllSuppliers();
    SupplierDTO getSupplierById(Long id);
    SupplierDTO createSupplier(SupplierDTO supplierDTO);
    void deleteSupplier(Long id);
}
