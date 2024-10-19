package com.example.shop_fan.controller;

import com.example.shop_fan.model.rolesModel;
import com.example.shop_fan.service.rolesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/roles")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class rolesController {
    @Autowired
    private rolesService roleService;

    @GetMapping("/")
    public String Hello(){
        return "Hello World";
    }

    @GetMapping("/getAll")
    public List<rolesModel> getAllRoles(){
        return roleService.findAll();
    }

    @GetMapping("/getById/{role_id}")
    public ResponseEntity<rolesModel> getRoleById(@PathVariable Integer role_id){
        Optional<rolesModel> role = roleService.findById(role_id);
        return role.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public rolesModel createRole(@RequestBody rolesModel role){
        return roleService.save(role);
    }

    @PutMapping("/update/{role_id}")
    public ResponseEntity<rolesModel> updateRole(@PathVariable Integer role_id, @RequestBody rolesModel role){
        if(roleService.findById(role_id).isPresent()){
            role.setRole_id(role_id);
            return ResponseEntity.ok(roleService.save(role));
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{role_id}")
    public ResponseEntity<rolesModel> deleteRole(@PathVariable Integer role_id){
        if(roleService.findById(role_id).isPresent()){
            roleService.deleteById(role_id);
            return ResponseEntity.noContent().build();
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }
}
