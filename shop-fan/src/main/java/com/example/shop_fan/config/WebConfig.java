package com.example.shop_fan.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer{
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Ánh xạ URL /images/** tới thư mục static/images/
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("classpath:/uploads/");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Cấu hình CORS cho tất cả các endpoint
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")  // Cho phép từ frontend localhost:3000
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Các phương thức HTTP được phép
                .allowCredentials(true);
    }
}
