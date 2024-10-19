package com.example.shop_fan.model;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class rolesModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer role_id;
    private String role_name;

    public rolesModel(){}

    public rolesModel(String role_name) {
        this.role_name = role_name;
    }

    public Integer getRole_id(){
        return role_id;
    }
    public void setRole_id(Integer role_id){
        this.role_id = role_id;
    }
    public String getRole_name(){
        return role_name;
    }
    public void setRole_name(String role_name){
        this.role_name = role_name;
    }
}
