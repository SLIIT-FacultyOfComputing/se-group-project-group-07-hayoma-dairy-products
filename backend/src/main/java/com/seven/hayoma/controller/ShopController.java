package com.seven.hayoma.controller;

import com.seven.hayoma.dto.ShopDTO;
import com.seven.hayoma.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shops")
public class ShopController {

    @Autowired
    private ShopService service;

    @GetMapping
    public List<ShopDTO> getAllShops() {
        return service.getAllShops();
    }

    @GetMapping("/{id}")
    public ShopDTO getShop(@PathVariable Long id) {
        return service.getShopById(id);
    }

    @PostMapping
    public ShopDTO createShop(@RequestBody ShopDTO dto) {
        return service.createShop(dto);
    }

    @DeleteMapping("/{id}")
    public void deleteShop(@PathVariable Long id) {
        service.deleteShop(id);
    }
}
