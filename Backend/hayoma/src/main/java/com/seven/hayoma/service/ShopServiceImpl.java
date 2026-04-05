package com.seven.hayoma.service;

import com.seven.hayoma.dto.ShopDTO;
import com.seven.hayoma.model.Shop;
import com.seven.hayoma.repository.ShopRepository;
import com.seven.hayoma.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShopServiceImpl implements ShopService {

    @Autowired
    private ShopRepository repository;

    private ShopDTO mapToDTO(Shop shop) {
        ShopDTO dto = new ShopDTO();
        dto.setId(shop.getId());
        dto.setName(shop.getName());
        dto.setContactPerson(shop.getContactPerson());
        dto.setPhone(shop.getPhone());
        dto.setEmail(shop.getEmail());
        dto.setAddress(shop.getAddress());
        return dto;
    }

    @Override
    public List<ShopDTO> getAllShops() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public ShopDTO getShopById(Long id) {
        return repository.findById(id).map(this::mapToDTO).orElse(null);
    }

    @Override
    public ShopDTO createShop(ShopDTO dto) {
        Shop shop = new Shop();
        shop.setName(dto.getName());
        shop.setContactPerson(dto.getContactPerson());
        shop.setPhone(dto.getPhone());
        shop.setEmail(dto.getEmail());
        shop.setAddress(dto.getAddress());
        return mapToDTO(repository.save(shop));
    }

    @Override
    public void deleteShop(Long id) {
        repository.deleteById(id);
    }
}
