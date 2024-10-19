package com.example.shop_fan.model;

import jakarta.persistence.*;

@Entity
@Table(name = "customers")
public class customersModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer customer_id;
    private String customer_name;
    private String address;
    private String phone_number;

    public customersModel() {}

    public customersModel(String customer_name, String address, String phone_number) {
        this.customer_name = customer_name;
        this.address = address;
        this.phone_number = phone_number;
    }

    public Integer getCustomer_id() {
        return customer_id;
    }
    public void setCustomer_id(Integer customer_id) {
        this.customer_id = customer_id;
    }
    public String getCustomer_name() {
        return customer_name;
    }
    public void setCustomer_name(String customer_name) {
        this.customer_name = customer_name;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getPhone_number() {
        return phone_number;
    }
    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }
}
