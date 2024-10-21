package com.example.shop_fan.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.shop_fan.model.productsModel;
import com.example.shop_fan.repository.productsRepository;

@Service
public class productsService {
    @Autowired
    private productsRepository productRepository;

    public List<productsModel> findAll() {
        return productRepository.findAll();
    }

    public Optional<productsModel> findById(Integer id) {
        return productRepository.findById(id);
    }

    public productsModel save(productsModel product) {
        return productRepository.save(product);
    }

    public void deleteById(Integer id) {
        productRepository.deleteById(id);
    }

    @Value("${file.upload-dir}")
    private String uploadDir;

    public String saveFile(MultipartFile file) {
        try {
            // Lấy tên file
            String fileName = file.getOriginalFilename();
            Path path = Paths.get(uploadDir + "/" + fileName);

            // Lưu file vào thư mục chỉ định
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
