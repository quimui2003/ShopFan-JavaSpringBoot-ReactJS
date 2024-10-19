package com.example.shop_fan.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shop_fan.model.ordercartsModel;
import com.example.shop_fan.repository.ordercartsRepository;

@Service
public class ordercartsService {
    @Autowired
    private ordercartsRepository cartRepository;

    public List<ordercartsModel> findAll(){
        return cartRepository.findAll();
    }

    public Optional<ordercartsModel> findById(Integer id){
        return cartRepository.findById(id);
    }

    public List<ordercartsModel> findListByAccount_id(Integer account_id) {
        return cartRepository.findListByAccount_id(account_id);
    }

    public Optional<ordercartsModel> findByAccount_id(Integer account_id){
        return cartRepository.findByAccount_id(account_id);
    }

    public ordercartsModel save(ordercartsModel cart){
        return cartRepository.save(cart);
    }

    public void deleteById(Integer id){
        cartRepository.deleteById(id);
    }
}
