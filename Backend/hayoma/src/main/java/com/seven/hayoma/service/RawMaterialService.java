package com.seven.hayoma.service;

import com.seven.hayoma.dto.RawMaterialDTO;
import java.util.List;

public interface RawMaterialService {
    List<RawMaterialDTO> getAllRawMaterials();
    RawMaterialDTO getRawMaterialById(Long id);
    RawMaterialDTO createRawMaterial(RawMaterialDTO materialDTO);
    void deleteRawMaterial(Long id);
}
