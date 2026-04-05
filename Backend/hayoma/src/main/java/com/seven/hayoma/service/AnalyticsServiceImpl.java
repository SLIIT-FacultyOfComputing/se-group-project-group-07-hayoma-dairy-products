package com.seven.hayoma.service;

import com.seven.hayoma.dto.GraphDataPointDTO;
import com.seven.hayoma.model.Order;
import com.seven.hayoma.model.Product;
import com.seven.hayoma.model.RawMaterial;
import com.seven.hayoma.repository.OrderRepository;
import com.seven.hayoma.repository.ProductRepository;
import com.seven.hayoma.repository.RawMaterialRepository;
import com.seven.hayoma.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.TextStyle;
import java.util.*;
import java.time.LocalDate;
import java.time.Month;
import java.util.stream.Collectors;

@Service
public class AnalyticsServiceImpl implements AnalyticsService {

    @Autowired private OrderRepository orderRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private RawMaterialRepository rawMaterialRepository;

    @Override
    public List<GraphDataPointDTO> getMonthlyOrderTotals() {
        Map<Month, Double> totals = new TreeMap<>();
        for (Order order : orderRepository.findAll()) {
            if (order.getDate() != null && order.getTotal() != null) {
                Month month = order.getDate().getMonth();
                totals.put(month, totals.getOrDefault(month, 0.0) + order.getTotal());
            }
        }
        return totals.entrySet().stream()
                .map(e -> new GraphDataPointDTO(e.getKey().getDisplayName(TextStyle.SHORT, Locale.ENGLISH), e.getValue()))
                .collect(Collectors.toList());
    }

    @Override
    public List<GraphDataPointDTO> getProductCategoryDistribution() {
        Map<String, Long> countMap = productRepository.findAll().stream()
                .collect(Collectors.groupingBy(Product::getCategory, Collectors.counting()));
        return countMap.entrySet().stream()
                .map(e -> new GraphDataPointDTO(e.getKey(), e.getValue().doubleValue()))
                .collect(Collectors.toList());
    }

    @Override
    public List<GraphDataPointDTO> getRawMaterialStockLevels() {
        return rawMaterialRepository.findAll().stream()
                .map(r -> new GraphDataPointDTO(r.getName(), r.getQuantity()))
                .collect(Collectors.toList());
    }
}
