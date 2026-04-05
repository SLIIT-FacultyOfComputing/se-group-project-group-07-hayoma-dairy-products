package com.seven.hayoma.service;

import com.seven.hayoma.dto.ProductDTO;
import com.seven.hayoma.model.Product;
import com.seven.hayoma.repository.ProductRepository;
import com.seven.hayoma.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository repository;

    @Override
    public List<ProductDTO> getAllProducts() {
        return repository.findAll().stream().map(o -> {
            ProductDTO dto = new ProductDTO();
            dto.setId(dto.getId());
            dto.setId(dto.getId());
            dto.setDate(dto.getDate());
            dto.setStatus(dto.getStatus());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public ProductDTO getProductById(Long id) {
        return getAllProducts().stream().filter(o -> o.getId().equals(id)).findFirst().orElse(null);
    }

    @Override
    public ProductDTO createProduct(ProductDTO dto) {
        Product product = new Product();
        product.setId(dto.getId());
        product.setDate(dto.getDate());
        product.setStatus(dto.getStatus());
        return getProductById(repository.save(product).getId());
    }

    @Override
    public void deleteProduct(Long id) {
        repository.deleteById(id);
    }
}
