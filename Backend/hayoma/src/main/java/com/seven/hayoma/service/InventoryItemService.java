package com.seven.hayoma.service;

import com.seven.hayoma.dto.InventoryItemDTO;

import java.util.List;

public interface InventoryItemService {
    InventoryItemDTO createItem(InventoryItemDTO dto);
    InventoryItemDTO updateItem(Long id, InventoryItemDTO dto);
    void deleteItem(Long id);
    List<InventoryItemDTO> getItemsByShop(Long shopId);
}
