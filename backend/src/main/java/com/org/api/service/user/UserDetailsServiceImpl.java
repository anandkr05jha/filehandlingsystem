package com.org.api.service.user;

import com.org.api.domain.user.UserDetails;
import com.org.api.repository.filedetails.UserDetailsRepository;
import com.org.api.util.ResponseDomain;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Override
    public ResponseEntity<?> getUserList() {
        List<UserDetails> userDetailsListEO = (List<UserDetails>) userDetailsRepository.findAll();
        List<UserDetails> userDetailsListVO = new ArrayList<>();
        if (!userDetailsListEO.isEmpty()) {
            userDetailsListEO.forEach(userDetails -> {
                UserDetails userDetailsObj = new UserDetails(userDetails.getUserId(),
                        userDetails.getUserName(), userDetails.getEmailAddress(),
                        userDetails.getCreationDate().toString(), userDetails.getLastModifiedDate().toString());
                userDetailsListVO.add(userDetailsObj);
            });
        }
        return new ResponseEntity<>(userDetailsListVO, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> saveUserDetails(UserDetails userDetails) {
        UserDetails userDetailsEO = userDetailsRepository.findByEmailAddress(userDetails.getEmailAddress());
        if (userDetailsEO == null) {
            userDetailsRepository.save(userDetails);
            return ResponseDomain.postResponse("User Saved Successfully");
        } else
            return ResponseDomain.postResponse("User Already Exist with this email Address");
    }
}
