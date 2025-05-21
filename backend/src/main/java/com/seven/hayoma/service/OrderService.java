package com.seven.hayoma.service;

import com.seven.hayoma.dto.OrderDTO;
import java.util.List;

public interface OrderService {
    List<OrderDTO> getAllOrders();
    OrderDTO getOrderById(Long id);
    OrderDTO createOrder(OrderDTO orderDTO);
    void deleteOrder(Long id);
}
