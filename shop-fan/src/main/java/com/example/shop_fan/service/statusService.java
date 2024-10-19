package com.example.shop_fan.service;

import com.example.shop_fan.model.statusModel;
import com.example.shop_fan.repository.statusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class statusService {
    @Autowired
    private statusRepository statuRepository;

    public List<statusModel> findAll() {
        return statuRepository.findAll();
    }

    public Optional<statusModel> findById(Integer id) {
        return statuRepository.findById(id);
    }

    public statusModel save(statusModel status) {
        return statuRepository.save(status);
    }

    public void deleteById(Integer id) {
        statuRepository.deleteById(id);
    }
}
