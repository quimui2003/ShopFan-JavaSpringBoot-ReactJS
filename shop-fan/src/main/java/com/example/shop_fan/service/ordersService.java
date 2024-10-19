package com.example.shop_fan.service;

import com.example.shop_fan.model.ordersModel;
import com.example.shop_fan.repository.ordersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ordersService {
    @Autowired
    private ordersRepository orderRepository;

    public List<ordersModel> findAll(){
        return orderRepository.findAll();
    }

    public Optional<ordersModel> findById(Integer id){
        return orderRepository.findById(id);
    }

    public ordersModel save(ordersModel orders){
        return orderRepository.save(orders);
    }

    public void deleteById(Integer id){
        orderRepository.deleteById(id);
    }
}
