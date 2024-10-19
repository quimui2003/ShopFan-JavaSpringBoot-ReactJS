package com.example.shop_fan.repository;

import com.example.shop_fan.model.ordersModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ordersRepository extends JpaRepository<ordersModel, Integer> {
}
