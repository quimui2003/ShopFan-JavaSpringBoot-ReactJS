package com.example.shop_fan.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.example.shop_fan.model.orderdetailsModel;
import com.example.shop_fan.service.orderdetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/details")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class orderdetailsController {
    @Autowired
    private orderdetailsService orderdetailService;

    @GetMapping("/getAll")
    public List<orderdetailsModel> getAllOrderDetails() {
        return orderdetailService.findAll();
    }

    @GetMapping("/getById/{detail_id}")
    public ResponseEntity<orderdetailsModel> getOrderDetailById(@PathVariable Integer detail_id){
        Optional<orderdetailsModel> orderdetail = orderdetailService.findById(detail_id);
        return orderdetail.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/getByOrderId/{order_id}")
    public ResponseEntity<List<orderdetailsModel>> getOrderDetailsByOrderId(@PathVariable Integer order_id) {
        List<orderdetailsModel> orderDetails = orderdetailService.findByOrder_id(order_id);
        if (orderDetails.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(orderDetails);
    }

    @PostMapping("/create")
    public orderdetailsModel createOrderDetail(@RequestBody orderdetailsModel orderdetail){
        return orderdetailService.save(orderdetail);
    }

    @PutMapping("/update/{detail_id}")
    public ResponseEntity<orderdetailsModel> updateOrderDetail(@PathVariable Integer detail_id, @RequestBody orderdetailsModel orderdetail){
        if(orderdetailService.findById(detail_id).isPresent()){
            orderdetail.setDetail_id(detail_id);
            return ResponseEntity.ok(orderdetailService.save(orderdetail));
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{detail_id}")
    public ResponseEntity<orderdetailsModel> deleteOrderDetail(@PathVariable Integer detail_id){
        if(orderdetailService.findById(detail_id).isPresent()){
            orderdetailService.deleteById(detail_id);
            return ResponseEntity.noContent().build();
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }
    
}
