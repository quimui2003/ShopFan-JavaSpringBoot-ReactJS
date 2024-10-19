package com.example.shop_fan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.shop_fan.model.statusModel;

@Repository
public interface statusRepository extends JpaRepository<statusModel, Integer>{

}
