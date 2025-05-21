package com.seven.hayoma.service;

import com.seven.hayoma.dto.RawMaterialDTO;
import com.seven.hayoma.model.RawMaterial;
import com.seven.hayoma.repository.RawMaterialRepository;
import com.seven.hayoma.service.RawMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RawMaterialServiceImpl implements RawMaterialService {
    @Autowired
    private RawMaterialRepository repository;

    @Override
    public List<RawMaterialDTO> getAllRawMaterials() {
        return repository.findAll().stream().map(o -> {
            RawMaterialDTO dto = new RawMaterialDTO();
            dto.setId(o.getId());
            dto.setId(o.getId());
            dto.setDate(o.getDate());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public RawMaterialDTO getRawMaterialById(Long id) {
        return getAllRawMaterials().stream().filter(o -> o.getId().equals(id)).findFirst().orElse(null);
    }

    @Override
    public RawMaterialDTO createRawMaterial(RawMaterialDTO dto) {
        RawMaterial material = new RawMaterial();
        material.setId(dto.getId());
        material.setDate(dto.getDate());
        return getRawMaterialById(repository.save(material).getId());
    }

    @Override
    public void deleteRawMaterial(Long id) {
        repository.deleteById(id);
    }
}
