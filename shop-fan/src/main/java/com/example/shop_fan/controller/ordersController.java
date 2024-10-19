package com.example.shop_fan.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.shop_fan.model.ordersModel;
import com.example.shop_fan.service.ordersService;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class ordersController {
    @Autowired
    private ordersService orderService;

    @GetMapping("/getAll")
    public List<ordersModel> getAllOrders(){
        return orderService.findAll();
    }

    @GetMapping("/getById/{order_id}")
    public ResponseEntity<ordersModel> getOrderById(@PathVariable Integer order_id){
        Optional<ordersModel> order = orderService.findById(order_id);
        return order.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public ordersModel createOrder(@RequestBody ordersModel order){
        return orderService.save(order);
    }

    @PutMapping("/update/{order_id}")
    public ResponseEntity<ordersModel> updateOrder(@PathVariable Integer order_id, @RequestBody ordersModel order){
        if(orderService.findById(order_id).isPresent()){
            order.setOrder_id(order_id);
            return ResponseEntity.ok(orderService.save(order));
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/updateStatus/{order_id}")
    public ResponseEntity<String> updateOrderStatus(@PathVariable Integer order_id, @RequestParam Integer status_id) {
        Optional<ordersModel> orderOptional = orderService.findById(order_id);
        
        if (orderOptional.isPresent()) {
            ordersModel order = orderOptional.get();
            order.setStatus_id(status_id);  // Cập nhật status_id
            orderService.save(order);       // Lưu thay đổi vào database
            return ResponseEntity.ok("Order status updated successfully");
        } else {
            return ResponseEntity.status(404).body("Order not found");
        }
    }

    @DeleteMapping("/delete/{order_id}")
    public ResponseEntity<ordersModel> deleteOrder(@PathVariable Integer order_id){
        if(orderService.findById(order_id).isPresent()){
            orderService.deleteById(order_id);
            return ResponseEntity.noContent().build();
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }
}
