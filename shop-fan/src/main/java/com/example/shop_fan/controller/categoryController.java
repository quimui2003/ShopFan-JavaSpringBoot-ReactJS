package com.example.shop_fan.controller;

import com.example.shop_fan.model.categoryModel;
import com.example.shop_fan.service.categoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/category")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class categoryController {
    @Autowired
    private categoryService categoriesService;

    @GetMapping("/")
    public String Hello(){
        return "Hello World";
    }

    @GetMapping("/getAll")
    public List<categoryModel> getAllCategory(){
        return categoriesService.findAll();
    }

    @GetMapping("/getById/{category_id}")
    public ResponseEntity<categoryModel> getCategoryById(@PathVariable Integer category_id){
        Optional<categoryModel> category = categoriesService.findById(category_id);
        return category.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public categoryModel createCategory(@RequestBody categoryModel category){
        return categoriesService.save(category);
    }

    @PutMapping("/update/{category_id}")
    public ResponseEntity<categoryModel> updateCategory(@PathVariable Integer category_id,@RequestBody categoryModel category){
        if(categoriesService.findById(category_id).isPresent()){
            category.setCategory_id(category_id);
            return ResponseEntity.ok(categoriesService.save(category));
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{category_id}")
    public ResponseEntity<categoryModel> deleteCategory(@PathVariable Integer category_id){
        if(categoriesService.findById(category_id).isPresent()){
            categoriesService.deleteById(category_id);
            return ResponseEntity.noContent().build();
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }
}
