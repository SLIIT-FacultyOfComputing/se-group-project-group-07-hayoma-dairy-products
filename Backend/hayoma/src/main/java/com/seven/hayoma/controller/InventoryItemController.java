package com.seven.hayoma.controller;

import com.seven.hayoma.dto.InventoryItemDTO;
import com.seven.hayoma.service.InventoryItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryItemController {

    private final InventoryItemService inventoryItemService;

    @PostMapping
    public ResponseEntity<InventoryItemDTO> create(@RequestBody InventoryItemDTO dto) {
        return ResponseEntity.ok(inventoryItemService.createItem(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InventoryItemDTO> update(@PathVariable Long id, @RequestBody InventoryItemDTO dto) {
        return ResponseEntity.ok(inventoryItemService.updateItem(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        inventoryItemService.deleteItem(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/shop/{shopId}")
    public ResponseEntity<List<InventoryItemDTO>> getByShop(@PathVariable Long shopId) {
        return ResponseEntity.ok(inventoryItemService.getItemsByShop(shopId));
    }
}