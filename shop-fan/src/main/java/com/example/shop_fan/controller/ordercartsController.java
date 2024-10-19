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

import com.example.shop_fan.model.ordercartsModel;
import com.example.shop_fan.service.ordercartsService;

@RestController
@RequestMapping("/carts")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class ordercartsController {
    @Autowired
    private ordercartsService cartService;

    @GetMapping("/")
    public String Hello(){
        return "Hello World";
    }

    @GetMapping("/getAll")
    public List<ordercartsModel> getAllCarts(){
        return cartService.findAll();
    }

    @GetMapping("/getById/{cart_id}")
    public ResponseEntity<ordercartsModel> getCartById(@PathVariable Integer cart_id){
        Optional<ordercartsModel> cart = cartService.findById(cart_id);
        return cart.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/getByAccountId/{account_id}")
    public ResponseEntity<ordercartsModel> getOrderCartsByAccountId(@PathVariable Integer account_id) {
        Optional<ordercartsModel> orderCarts = cartService.findByAccount_id(account_id);
        return orderCarts.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/getListByAccountId/{account_id}")
    public ResponseEntity<List<ordercartsModel>> getListOrderCartsByAccountId(@PathVariable Integer account_id) {
        List<ordercartsModel> orderCarts = cartService.findListByAccount_id(account_id);
        if (orderCarts.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(orderCarts);
    }

    @PutMapping("/updateQuantity/{cart_id}")
    public ResponseEntity<ordercartsModel> updateOrderStatus(@PathVariable Integer cart_id, @RequestParam Integer product_quantity) {
        Optional<ordercartsModel> cart = cartService.findById(cart_id);
        
        if (cart.isPresent()) {
            ordercartsModel ordercart = cart.get();
            ordercart.setProduct_quantity(product_quantity);
            cartService.save(ordercart);       // Lưu thay đổi vào database
            return ResponseEntity.ok(ordercart);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create")
    public ordercartsModel createCart(@RequestBody ordercartsModel cart){
        return cartService.save(cart);
    }

    @PutMapping("/update/{cart_id}")
    public ResponseEntity<ordercartsModel> updateCarts(@PathVariable Integer cart_id,@RequestBody ordercartsModel cart){
        if(cartService.findById(cart_id).isPresent()){
            cart.setCart_id(cart_id);
            return ResponseEntity.ok(cartService.save(cart));
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{cart_id}")
    public ResponseEntity<ordercartsModel> deleteCart(@PathVariable Integer cart_id){
        if(cartService.findById(cart_id).isPresent()){
            cartService.deleteById(cart_id);
            return ResponseEntity.noContent().build();
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }
}
