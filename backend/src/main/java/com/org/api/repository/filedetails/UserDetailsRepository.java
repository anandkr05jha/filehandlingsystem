package com.org.api.repository.filedetails;

import com.org.api.domain.user.UserDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserDetailsRepository extends CrudRepository<UserDetails, Long> {
    public Optional<UserDetails> findById(Long aLong);
    public UserDetails findByEmailAddress(String emailAddress);

}
