package com.seven.hayoma.repository;

import com.seven.hayoma.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryItemRepository extends JpaRepository<InventoryItem, Long> {
    List<InventoryItem> findByShopId(Long shopId);
}