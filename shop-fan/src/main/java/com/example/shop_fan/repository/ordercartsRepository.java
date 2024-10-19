package com.example.shop_fan.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.shop_fan.model.ordercartsModel;

@Repository
public interface ordercartsRepository extends JpaRepository<ordercartsModel, Integer> {
    @Query("SELECT o FROM ordercartsModel o WHERE o.account_id = :account_id")
    List<ordercartsModel> findListByAccount_id(@Param("account_id") Integer account_id);

    @Query("SELECT o FROM ordercartsModel o WHERE o.account_id = :account_id")
    Optional<ordercartsModel> findByAccount_id(@Param("account_id") Integer account_id);
}
