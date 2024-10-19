package com.example.shop_fan.service;

import com.example.shop_fan.model.rolesModel;
import com.example.shop_fan.repository.rolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class rolesService {
    @Autowired
    private rolesRepository roleRepository;

    public List<rolesModel> findAll() {
        return roleRepository.findAll();
    }

    public Optional<rolesModel> findById(Integer id) {
        return roleRepository.findById(id);
    }

    public rolesModel save(rolesModel role) {
        return roleRepository.save(role);
    }

    public void deleteById(Integer id) {
        roleRepository.deleteById(id);
    }
}
