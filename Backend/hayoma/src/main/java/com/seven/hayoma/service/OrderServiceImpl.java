package com.seven.hayoma.service;

import com.seven.hayoma.dto.OrderDTO;
import com.seven.hayoma.model.Order;
import com.seven.hayoma.repository.OrderRepository;
import com.seven.hayoma.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository repository;

    @Override
    public List<OrderDTO> getAllOrders() {
        return repository.findAll().stream().map(o -> {
            OrderDTO dto = new OrderDTO();
            dto.setId(o.getId());
            dto.setOrderId(o.getOrderId());
            dto.setDate(o.getDate());
            dto.setTotal(o.getTotal());
            dto.setStatus(o.getStatus());
            dto.setPayment(o.getPayment());
            dto.setShopId(o.getShop().getId());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public OrderDTO getOrderById(Long id) {
        return getAllOrders().stream().filter(o -> o.getId().equals(id)).findFirst().orElse(null);
    }

    @Override
    public OrderDTO createOrder(OrderDTO dto) {
        Order order = new Order();
        order.setOrderId(dto.getOrderId());
        order.setDate(dto.getDate());
        order.setTotal(dto.getTotal());
        order.setStatus(dto.getStatus());
        order.setPayment(dto.getPayment());
        return getOrderById(repository.save(order).getId());
    }

    @Override
    public void deleteOrder(Long id) {
        repository.deleteById(id);
    }
}
