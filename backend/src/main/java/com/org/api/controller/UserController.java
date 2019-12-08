package com.org.api.controller;


import com.org.api.domain.user.UserDetails;
import com.org.api.service.user.UserDetailsService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/user/")
public class UserController {

    private static final Logger log = LogManager.getLogger(UserController.class);

    @Autowired
    private UserDetailsService userDetailsService;

    @GetMapping("/")
    public ResponseEntity<?> getUserList() {
        log.info("Enter in the Controller ::: UserController ::: method ::: getUserList");
        return userDetailsService.getUserList();
    }

    @PostMapping(path = "/save")
    public ResponseEntity<?> saveUserDetails(@RequestBody UserDetails userDetails) {
        log.info("Enter Controller Class ::: UserController ::: methods ::: saveUserDetails");
        return userDetailsService.saveUserDetails(userDetails);

    }
}
