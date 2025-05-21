package com.seven.hayoma.controller;

import com.seven.hayoma.model.Order;
import com.seven.hayoma.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*") // Adjust CORS as needed
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    // Get all orders
    @GetMapping
    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    // Create order
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        if (order.getOrderId() == null || order.getOrderId().isEmpty()) {
            order.setOrderId("ORD-" + System.currentTimeMillis());
        }
        if (order.getDate() == null) {
            order.setDate(LocalDate.now());
        }
        Order saved = orderRepository.save(order);
        return ResponseEntity.status(201).body(saved);
    }
}
