package com.example.shop_fan.service;

import com.example.shop_fan.model.customersModel;
import com.example.shop_fan.repository.customersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class customersService {
    @Autowired
    private customersRepository customerRepository;

    public List<customersModel> findAll() {
        return customerRepository.findAll();
    }

    public Optional<customersModel> findById(Integer id) {
        return customerRepository.findById(id);
    }

    public customersModel save(customersModel customer) {
        return customerRepository.save(customer);
    }

    public void deleteById(Integer id) {
        customerRepository.deleteById(id);
    }
}
