package com.example.shop_fan.repository;

import com.example.shop_fan.model.categoryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface categoryRepository extends JpaRepository<categoryModel, Integer> {
}
