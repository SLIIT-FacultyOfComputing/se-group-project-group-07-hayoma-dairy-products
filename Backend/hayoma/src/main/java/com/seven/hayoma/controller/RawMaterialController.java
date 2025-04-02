package com.seven.hayoma.controller;

import com.seven.hayoma.dto.RawMaterialDTO;
import com.seven.hayoma.service.RawMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materials")
public class RawMaterialController {

    @Autowired
    private RawMaterialService service;

    @GetMapping
    public List<RawMaterialDTO> getAllRawMaterials() {
        return service.getAllRawMaterials();
    }

    @GetMapping("/{id}")
    public RawMaterialDTO getRawMaterial(@PathVariable Long id) {
        return service.getRawMaterialById(id);
    }

    @PostMapping
    public RawMaterialDTO createRawMaterial(@RequestBody RawMaterialDTO dto) {
        return service.createRawMaterial(dto);
    }

    @DeleteMapping("/{id}")
    public void deleteRawMaterial(@PathVariable Long id) {
        service.deleteRawMaterial(id);
    }
}
