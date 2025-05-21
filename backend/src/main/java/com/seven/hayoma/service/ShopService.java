package com.seven.hayoma.service;

import com.seven.hayoma.dto.ShopDTO;
import java.util.List;

public interface ShopService {
    List<ShopDTO> getAllShops();
    ShopDTO getShopById(Long id);
    ShopDTO createShop(ShopDTO dto);
    void deleteShop(Long id);
}
