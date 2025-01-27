package com.example.shop_fan.model;

import jakarta.persistence.*;

@Entity
@Table(name = "category")
public class categoryModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer category_id;
    private String category_name;

    public categoryModel() {}

    public categoryModel(String category_name) {
        this.category_name = category_name;
    }

    public Integer getCategory_id() {
        return category_id;
    }
    public void setCategory_id(Integer category_id) {
        this.category_id = category_id;
    }
    public String getCategory_name() {
        return category_name;
    }
    public void setCategory_name(String category_name) {
        this.category_name = category_name;
    }
}
