package com.seven.hayoma.service;

import com.seven.hayoma.dto.InventoryItemDTO;
import com.seven.hayoma.model.InventoryItem;
import com.seven.hayoma.model.Shop;
import com.seven.hayoma.repository.InventoryItemRepository;
import com.seven.hayoma.repository.ShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryItemServiceImpl implements InventoryItemService {

    private final InventoryItemRepository inventoryItemRepository;
    private final ShopRepository shopRepository;

    @Override
    public InventoryItemDTO createItem(InventoryItemDTO dto) {
        InventoryItem entity = toEntity(dto);
        return toDto(inventoryItemRepository.save(entity));
    }

    @Override
    public InventoryItemDTO updateItem(Long id, InventoryItemDTO dto) {
        InventoryItem item = inventoryItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory item not found"));

        item.setName(dto.getName());
        item.setQuantity(dto.getQuantity());
        item.setPrice(dto.getPrice());
        if (dto.getShopId() != null) {
            Shop shop = shopRepository.findById(dto.getShopId())
                    .orElseThrow(() -> new RuntimeException("Shop not found"));
            item.setShop(shop);
        }

        return toDto(inventoryItemRepository.save(item));
    }

    @Override
    public void deleteItem(Long id) {
        inventoryItemRepository.deleteById(id);
    }

    @Override
    public List<InventoryItemDTO> getItemsByShop(Long shopId) {
        return inventoryItemRepository.findByShopId(shopId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private InventoryItemDTO toDto(InventoryItem entity) {
        return InventoryItemDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .quantity(entity.getQuantity())
                .price(entity.getPrice())
                .shopId(entity.getShop() != null ? entity.getShop().getId() : null)
                .build();
    }

    private InventoryItem toEntity(InventoryItemDTO dto) {
        Shop shop = null;
        if (dto.getShopId() != null) {
            shop = shopRepository.findById(dto.getShopId())
                    .orElseThrow(() -> new RuntimeException("Shop not found"));
        }

        return InventoryItem.builder()
                .id(dto.getId())
                .name(dto.getName())
                .quantity(dto.getQuantity())
                .price(dto.getPrice())
                .shop(shop)
                .build();
    }
}
