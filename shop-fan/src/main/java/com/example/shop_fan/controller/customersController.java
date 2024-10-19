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
import org.springframework.web.bind.annotation.RestController;

import com.example.shop_fan.model.customersModel;
import com.example.shop_fan.service.customersService;

@RestController
@RequestMapping("/customers")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class customersController {
    @Autowired
    private customersService customerService;

    @GetMapping("/")
    public String Hello(){
        return "Hello World";
    }

    @GetMapping("/getAll")
    public List<customersModel> getAllCustomers(){
        return customerService.findAll();
    }

    @GetMapping("/getById/{customer_id}")
    public ResponseEntity<customersModel> getCustomerById(@PathVariable Integer customer_id){
        Optional<customersModel> customer = customerService.findById(customer_id);
        return customer.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public customersModel createCustomer(@RequestBody customersModel customer){
        return customerService.save(customer);
    }

    @PutMapping("/update/{customer_id}")
    public ResponseEntity<customersModel> updateCustomers(@PathVariable Integer customer_id, @RequestBody customersModel customer){
        if(customerService.findById(customer_id).isPresent()){
            customer.setCustomer_id(customer_id);
            return ResponseEntity.ok(customerService.save(customer));
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{customer_id}")
    public ResponseEntity<customersModel> deleteCustomer(@PathVariable Integer customer_id){
        if(customerService.findById(customer_id).isPresent()){
            customerService.deleteById(customer_id);
            return ResponseEntity.noContent().build();
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }
}
