package com.example.shop_fan.repository;

import java.util.Optional;
import java.util.List;

import com.example.shop_fan.model.accountsModel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface accountsRepository extends JpaRepository<accountsModel, Integer> {
    @Query("SELECT o FROM accountsModel o WHERE o.email = :email")
    Optional<accountsModel> findByEmail(String email);

    @Query("SELECT o FROM accountsModel o WHERE o.email = :email")
    List<accountsModel> findListByEmail(String email);
}
