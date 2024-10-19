package com.example.shop_fan.controller;

import com.example.shop_fan.model.productsModel;
import com.example.shop_fan.service.productsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class productsController {
    @Autowired
    private productsService productService;

    @GetMapping("/getAll")
    public List<productsModel> getAllProducts() {
        return productService.findAll();
    }

    @GetMapping("/getById/{product_id}")
    public ResponseEntity<productsModel> getProductById(@PathVariable Integer product_id) {
        Optional<productsModel> product = productService.findById(product_id);
        return product.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // @PostMapping("/create")
    // public productsModel createProduct(@RequestBody productsModel product) {
    //     return productService.save(product);
    // }

    // @PutMapping("/update/{product_id}")
    // public ResponseEntity<productsModel> updateProduct(@PathVariable Integer product_id, @RequestBody productsModel product) {
    //     if(productService.findById(product_id).isPresent()) {
    //         product.setProduct_id(product_id);
    //         return ResponseEntity.ok(productService.save(product));
    //     }
    //     else{
    //         return ResponseEntity.notFound().build();
    //     }
    // }

    @PostMapping("/create")
    public productsModel createProduct(@RequestParam("image_path") MultipartFile image, 
                                       @RequestParam("product_name") String productName,
                                       @RequestParam("inventory_quantity") Integer inventoryQuantity,
                                       @RequestParam("original_price") float originalPrice,
                                       @RequestParam("unit_price") float unitPrice,
                                       @RequestParam("description") String description,
                                       @RequestParam("category_id") Integer categoryId) {
        // Lưu file ảnh
        String fileName = productService.saveFile(image);
        
        // Tạo đối tượng sản phẩm
        productsModel product = new productsModel();
        product.setProduct_name(productName);
        product.setInventory_quantity(inventoryQuantity);
        product.setOriginal_price(originalPrice);
        product.setUnit_price(unitPrice);
        product.setDescription(description);
        product.setCategory_id(categoryId);
        product.setImage_path(fileName);  // Lưu tên file ảnh vào CSDL

        return productService.save(product);
    }

    @PutMapping("/update/{product_id}")
    public ResponseEntity<productsModel> updateProduct(@PathVariable Integer product_id,
                                                       @RequestParam(value = "image_path", required = false) MultipartFile image,
                                                       @RequestParam("product_name") String productName,
                                                       @RequestParam("inventory_quantity") Integer inventoryQuantity,
                                                       @RequestParam("original_price") float originalPrice,
                                                       @RequestParam("unit_price") float unitPrice,
                                                       @RequestParam("description") String description,
                                                       @RequestParam("category_id") Integer categoryId) {
        Optional<productsModel> optionalProduct = productService.findById(product_id);
        if (optionalProduct.isPresent()) {
            productsModel product = optionalProduct.get();
            product.setProduct_name(productName);
            product.setInventory_quantity(inventoryQuantity);
            product.setOriginal_price(originalPrice);
            product.setUnit_price(unitPrice);
            product.setDescription(description);
            product.setCategory_id(categoryId);

            // Nếu có file ảnh, cập nhật
            if (image != null) {
                String fileName = productService.saveFile(image);
                product.setImage_path(fileName);
            }

            return ResponseEntity.ok(productService.save(product));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{product_id}")
    public ResponseEntity<productsModel> deleteProduct(@PathVariable Integer product_id) {
        if(productService.findById(product_id).isPresent()) {
            productService.deleteById(product_id);
            return ResponseEntity.noContent().build();
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }
}
