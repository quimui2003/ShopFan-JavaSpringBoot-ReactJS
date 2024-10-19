package com.example.shop_fan.model;

import jakarta.persistence.*;

import java.time.OffsetDateTime;

@Entity
@Table(name = "products")
public class productsModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer product_id;
    private String product_name;
    private String image_path;
    private Integer inventory_quantity;
    private float original_price;
    private float unit_price;
    private String description;
    private OffsetDateTime updated_time;
    private Integer category_id;

    public productsModel() {}

    public productsModel(String product_name, String image_path, Integer inventory_quantity, float original_price, float unit_price, String description, OffsetDateTime updated_time, Integer category_id) {
        this.product_name = product_name;
        this.image_path = image_path;
        this.inventory_quantity = inventory_quantity;
        this.original_price = original_price;
        this.unit_price = unit_price;
        this.description = description;
        this.updated_time = updated_time;
        this.category_id = category_id;
    }

    @PrePersist
    protected void onCreate(){
        this.updated_time = OffsetDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updated_time = OffsetDateTime.now();
    }

    public Integer getProduct_id() {
        return product_id;
    }
    public void setProduct_id(Integer product_id) {
        this.product_id = product_id;
    }
    public String getProduct_name() {
        return product_name;
    }
    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }
    public String getImage_path() {
        return image_path;
    }
    public void setImage_path(String image_path) {
        this.image_path = image_path;
    }
    public Integer getInventory_quantity() {
        return inventory_quantity;
    }
    public void setInventory_quantity(Integer inventory_quantity) {
        this.inventory_quantity = inventory_quantity;
    }
    public float getOriginal_price() {
        return original_price;
    }
    public void setOriginal_price(float original_price){
        this.original_price = original_price;
    }
    public float getUnit_price() {
        return unit_price;
    }
    public void setUnit_price(float unit_price) {
        this.unit_price = unit_price;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public OffsetDateTime getUpdated_time() {
        return updated_time;
    }
    public void setUpdated_time(OffsetDateTime updated_time) {
        this.updated_time = updated_time;
    }
    public Integer getCategory_id() {
        return category_id;
    }
    public void setCategory_id(Integer category_id) {
        this.category_id = category_id;
    }
}
