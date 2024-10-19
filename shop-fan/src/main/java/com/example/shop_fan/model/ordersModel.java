package com.example.shop_fan.model;

import java.time.OffsetDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class ordersModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer order_id;
    private OffsetDateTime order_date;
    private float total_price;
    private Integer status_id;
    private Integer customer_id;

    public ordersModel() {}

    public ordersModel(OffsetDateTime order_date, float total_price, Integer status_id, Integer customer_id) {
        this.order_date = order_date;
        this.total_price = total_price;
        this.status_id = status_id;
        this.customer_id = customer_id;
    }

    @PrePersist
    protected void onCreate() {
        this.order_date = OffsetDateTime.now();
    }

    // @PreUpdate
    // protected void onUpdate() {
    //     this.order_date = OffsetDateTime.now();
    // }

    public Integer getOrder_id() {
        return order_id;
    }
    public void setOrder_id(Integer order_id) {
        this.order_id = order_id;
    }
    public OffsetDateTime getOrder_date() {
        return order_date;
    }
    public void setOrder_date(OffsetDateTime order_date) {
        this.order_date = order_date;
    }
    public float getTotal_price() {
        return total_price;
    }
    public void setTotal_price(float total_price) {
        this.total_price = total_price;
    }
    public Integer getStatus_id() {
        return status_id;
    }
    public void setStatus_id(Integer status_id) {
        this.status_id = status_id;
    }
    public Integer getCustomer_id() {
        return customer_id;
    }
    public void setCustomer_id(Integer customer_id) {
        this.customer_id = customer_id;
    }
}
