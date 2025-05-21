package com.seven.hayoma.controller;

import com.seven.hayoma.dto.GraphDataPointDTO;
import com.seven.hayoma.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService service;

    @GetMapping("/orders/monthly")
    public List<GraphDataPointDTO> getMonthlyOrderTotals() {
        return service.getMonthlyOrderTotals();
    }

    @GetMapping("/products/categories")
    public List<GraphDataPointDTO> getProductCategoryDistribution() {
        return service.getProductCategoryDistribution();
    }

    @GetMapping("/materials/stocks")
    public List<GraphDataPointDTO> getRawMaterialStockLevels() {
        return service.getRawMaterialStockLevels();
    }
}
