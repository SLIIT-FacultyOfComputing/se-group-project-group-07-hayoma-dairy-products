package com.seven.hayoma.service;

import com.seven.hayoma.dto.ProductDTO;
import java.util.List;

public interface ProductService {
    List<ProductDTO> getAllProducts();
    ProductDTO getProductById(Long id);
    ProductDTO createProduct(ProductDTO productDTO);
    void deleteProduct(Long id);
}
