package com.seven.hayoma.controller;

import com.seven.hayoma.dto.ProductDTO;
import com.seven.hayoma.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return service.getAllProducts();
    }

    @GetMapping("/{id}")
    public ProductDTO getProduct(@PathVariable Long id) {
        return service.getProductById(id);
    }
    
    @PostMapping("/api/products")
    public ProductDTO createProduct(@RequestBody ProductDTO dto) {
        return service.createProduct(dto);
    }

    @DeleteMapping("/{id}")
    @PostAuthorize("hasRole('ADMIN')")
    public void deleteProduct(@PathVariable Long id) {
        service.deleteProduct(id);
    }
}
