package com.example.shop_fan.repository;

import com.example.shop_fan.model.customersModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface customersRepository extends JpaRepository<customersModel, Integer> {
}
