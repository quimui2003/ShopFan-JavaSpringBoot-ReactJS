package com.example.shop_fan.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shop_fan.model.orderdetailsModel;
import com.example.shop_fan.repository.orderdetailsRepository;

@Service
public class orderdetailsService {
    @Autowired
    private orderdetailsRepository orderdetailRepository;

    public List<orderdetailsModel> findAll(){
        return orderdetailRepository.findAll();
    }

    public Optional<orderdetailsModel> findById(Integer id){
        return orderdetailRepository.findById(id);
    }

    public List<orderdetailsModel> findByOrder_id(Integer order_id) {
        return orderdetailRepository.findByOrder_id(order_id);
    }

    public orderdetailsModel save(orderdetailsModel orderdetail){
        return orderdetailRepository.save(orderdetail);
    }

    public void deleteById(Integer id){
        orderdetailRepository.deleteById(id);
    }
}
