package com.org.api.service.user;


import com.org.api.domain.user.UserDetails;
import org.springframework.http.ResponseEntity;

public interface UserDetailsService {
    ResponseEntity<?> getUserList();
    ResponseEntity<?> saveUserDetails(UserDetails userDetails);
}
