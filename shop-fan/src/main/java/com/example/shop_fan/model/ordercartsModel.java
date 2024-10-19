package com.example.shop_fan.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ordercarts")
public class ordercartsModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cart_id;
    private Integer product_quantity;
    private Integer account_id;
    private Integer product_id;

    public ordercartsModel() {}

    public ordercartsModel(Integer product_quantity, Integer account_id, Integer product_id) {
        this.product_quantity = product_quantity;
        this.account_id = account_id;
        this.product_id = product_id;
    }

    public Integer getCart_id() {
        return cart_id;
    }
    public void setCart_id(Integer cart_id) {
        this.cart_id = cart_id;
    }
    public Integer getProduct_quantity() {
        return product_quantity;
    }
    public void setProduct_quantity(Integer product_quantity) {
        this.product_quantity = product_quantity;
    }
    public Integer getAccount_id() {
        return account_id;
    }
    public void setAccount_id(Integer account_id) {
        this.account_id = account_id;
    }
    public Integer getProduct_id() {
        return product_id;
    }
    public void setProduct_id(Integer product_id) {
        this.product_id = product_id;
    }
}
