package com.seven.hayoma.service;

import com.seven.hayoma.dto.GraphDataPointDTO;
import java.util.List;

public interface AnalyticsService {
    List<GraphDataPointDTO> getMonthlyOrderTotals();
    List<GraphDataPointDTO> getProductCategoryDistribution();
    List<GraphDataPointDTO> getRawMaterialStockLevels();
}
