package com.example.shop_fan.model;

import jakarta.persistence.*;

@Entity
@Table(name = "orderdetails")
public class orderdetailsModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer detail_id;
    private Integer total_quantity;
    private float sale_price;
    private Integer order_id;
    private Integer product_id;

    public orderdetailsModel(){}

    public orderdetailsModel(Integer total_quantity, float sale_price, Integer order_id, Integer product_id){
        this.total_quantity = total_quantity;
        this.sale_price = sale_price;
        this.order_id = order_id;
        this.product_id = product_id;
    }

    public Integer getDetail_id(){
        return detail_id;
    }
    public void setDetail_id(Integer detail_id){
        this.detail_id = detail_id;
    }
    public Integer getTotal_quantity(){
        return total_quantity;
    }
    public void setTotal_quantity(Integer total_quantity){
        this.total_quantity = total_quantity;
    }
    public float getSale_price(){
        return sale_price;
    }
    public void setSale_price(float sale_price){
        this.sale_price = sale_price;
    }
    public Integer getOrder_id(){
        return order_id;
    }
    public void setOrder_id(Integer order_id){
        this.order_id = order_id;
    }
    public Integer getProduct_id(){
        return product_id;
    }
    public void setProduct_id(Integer product_id){
        this.product_id = product_id;
    }
}
