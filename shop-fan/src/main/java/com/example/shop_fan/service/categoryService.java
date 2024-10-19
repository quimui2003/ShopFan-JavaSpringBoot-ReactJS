package com.example.shop_fan.service;

import com.example.shop_fan.model.categoryModel;
import com.example.shop_fan.repository.categoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class categoryService {
    @Autowired
    private categoryRepository categoriesRepository;

    public List<categoryModel> findAll() {
        return categoriesRepository.findAll();
    }

    public Optional<categoryModel> findById(Integer id) {
        return categoriesRepository.findById(id);
    }

    public categoryModel save(categoryModel category) {
        return categoriesRepository.save(category);
    }

    public void deleteById(Integer id) {
        categoriesRepository.deleteById(id);
    }
}
