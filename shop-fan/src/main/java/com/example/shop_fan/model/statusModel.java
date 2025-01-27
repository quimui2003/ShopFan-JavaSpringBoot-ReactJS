package com.example.shop_fan.model;

import jakarta.persistence.*;

@Entity
@Table(name = "status")
public class statusModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer status_id;
    private String status_name;

    public statusModel(){}

    public statusModel(String status_name) {
        this.status_name = status_name;
    }

    public Integer getStatus_id(){
        return status_id;
    }
    public void setStatus_id(Integer status_id){
        this.status_id = status_id;
    }
    public String getStatus_name(){
        return status_name;
    }
    public void setStatus_name(String status_name){
        this.status_name = status_name;
    }
}
