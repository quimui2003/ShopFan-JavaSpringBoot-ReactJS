package com.example.shop_fan.controller;

import com.example.shop_fan.model.statusModel;
import com.example.shop_fan.service.statusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/status")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class statusController {
    @Autowired
    private statusService statuService;

    @GetMapping("/")
    public String Hello(){
        return "Hello World";
    }

    @GetMapping("/getAll")
    public List<statusModel> getAllStatus(){
        return statuService.findAll();
    }

    @GetMapping("/getById/{status_id}")
    public ResponseEntity<statusModel> getStatusById(@PathVariable Integer status_id){
        Optional<statusModel> status = statuService.findById(status_id);
        return status.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public statusModel createStatus(@RequestBody statusModel status){
        return statuService.save(status);
    }

    @PutMapping("/update/{status_id}")
    public ResponseEntity<statusModel> updateStatus(@PathVariable Integer status_id, @RequestBody statusModel status){
        if(statuService.findById(status_id).isPresent()){
            status.setStatus_id(status_id);
            return ResponseEntity.ok(statuService.save(status));
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{status_id}")
    public ResponseEntity<statusModel> deleteStatus(@PathVariable Integer status_id){
        if(statuService.findById(status_id).isPresent()){
            statuService.deleteById(status_id);
            return ResponseEntity.noContent().build();
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }
}
