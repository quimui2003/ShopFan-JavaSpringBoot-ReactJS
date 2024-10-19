package com.example.shop_fan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.shop_fan.model.orderdetailsModel;

@Repository
public interface orderdetailsRepository extends JpaRepository<orderdetailsModel, Integer>{
    @Query("SELECT o FROM orderdetailsModel o WHERE o.order_id = :order_id")
    List<orderdetailsModel> findByOrder_id(@Param("order_id") Integer order_id);
}
