package com.example.shop_fan.model;

import jakarta.persistence.*;

@Entity
@Table(name = "accounts")
public class accountsModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer account_id;
    private String email;
    private String password_hash;
    private Integer role_id;
    private Integer customer_id;

    public accountsModel(){}

    public accountsModel(String email, String password_hash, Integer role_id, Integer customer_id) {
        this.email = email;
        this.password_hash = password_hash;
        this.role_id = role_id;
        this.customer_id = customer_id;
    }

    public Integer getAccount_id() {
        return account_id;
    }
    public void setAccount_id(Integer account_id) {
        this.account_id = account_id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword_hash() {
        return password_hash;
    }
    public void setPassword_hash(String password_hash) {
        this.password_hash = password_hash;
    }
    public Integer getRole_id() {
        return role_id;
    }
    public void setRole_id(Integer role_id) {
        this.role_id = role_id;
    }
    public Integer getCustomer_id() {
        return customer_id;
    }
    public void setCustomer_id(Integer customer_id) {
        this.customer_id = customer_id;
    }
}
