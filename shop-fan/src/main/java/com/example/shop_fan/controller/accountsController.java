package com.example.shop_fan.controller;

import com.example.shop_fan.model.accountsModel;
import com.example.shop_fan.service.accountsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import com.example.shop_fan.model.LoginRequest;

@RestController
@RequestMapping("/accounts")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class accountsController {
    @Autowired
    private accountsService accountService;

    @GetMapping("/")
    public String Hello(){
        return "Hello World";
    }

    @GetMapping("/getAll")
    public List<accountsModel> getAllAccounts(){
        return accountService.findAll();
    }

    @GetMapping("/getById/{account_id}")
    public ResponseEntity<accountsModel> getAccountById(@PathVariable Integer account_id){
        Optional<accountsModel> account = accountService.findById(account_id);
        return account.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/getByEmail/{email}")
    public ResponseEntity<accountsModel> getAccountByEmail(@PathVariable String email){
        Optional<accountsModel> account = accountService.findByEmail(email);
        return account.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        accountsModel account = accountService.login(loginRequest.getEmail(), loginRequest.getPassword());

        if (account == null) {
            // Nếu đăng nhập thất bại
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email hoặc mật khẩu không đúng.");
        }

        // Đăng nhập thành công, trả về thông tin tài khoản hoặc token
        return ResponseEntity.ok(account);  // Có thể trả về JWT token nếu cần
    }

    @PostMapping("/create")
    public accountsModel createAccount(@RequestBody accountsModel account){
        return accountService.save(account);
    }

    @PutMapping("/update/{account_id}")
    public ResponseEntity<accountsModel> updateAccount(@PathVariable Integer account_id, @RequestBody accountsModel account){
        if(accountService.findById(account_id).isPresent()){
            account.setAccount_id(account_id);
            return ResponseEntity.ok(accountService.save(account));
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/updateRoles/{account_id}")
    public ResponseEntity<String> updateAccountRole(@PathVariable Integer account_id, @RequestParam Integer role_id) {
        Optional<accountsModel> accountOptional = accountService.findById(account_id);
        
        if (accountOptional.isPresent()) {
            accountsModel account = accountOptional.get();
            account.setRole_id(role_id);  // Cập nhật role_id
            accountService.save(account);       // Lưu thay đổi vào database
            return ResponseEntity.ok("Account role updated successfully");
        } else {
            return ResponseEntity.status(404).body("Account not found");
        }
    }

    @DeleteMapping("/delete/{account_id}")
    public ResponseEntity<accountsModel> deleteAccount(@PathVariable Integer account_id){
        if(accountService.findById(account_id).isPresent()){
            accountService.deleteById(account_id);
            return ResponseEntity.noContent().build();
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }
}
