package com.example.shop_fan.service;

import com.example.shop_fan.model.accountsModel;
import com.example.shop_fan.repository.accountsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class accountsService {
    @Autowired
    private accountsRepository accountRepository;

    public Optional<accountsModel> findByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    public List<accountsModel> findListByEmail(String email){
        return accountRepository.findListByEmail(email);
    }

    // Hàm đăng nhập, kiểm tra thông tin đăng nhập
    public accountsModel login(String email, String rawPassword) {
        Optional<accountsModel> optionalAccount = accountRepository.findByEmail(email);
        
        if (optionalAccount.isPresent()) {
            accountsModel account = optionalAccount.get();
            // Kiểm tra mật khẩu (sử dụng BCrypt hoặc cơ chế bảo mật khác)
            if (checkPassword(rawPassword, account.getPassword_hash())) {
                return account;
            }
        }
        return null;  // Trả về null nếu đăng nhập thất bại
    }

    // Phương thức kiểm tra mật khẩu
    private boolean checkPassword(String rawPassword, String passwordHash) {
        // Ở đây bạn nên dùng thư viện bảo mật như BCrypt
        return rawPassword.equals(passwordHash);  // Cách này không an toàn, chỉ là ví dụ
    }

    public List<accountsModel> findAll() {
        return accountRepository.findAll();
    }

    public Optional<accountsModel> findById(Integer id) {
        return accountRepository.findById(id);
    }

    public accountsModel save(accountsModel account) {
        return accountRepository.save(account);
    }

    public void deleteById(Integer id) {
        accountRepository.deleteById(id);
    }
}
