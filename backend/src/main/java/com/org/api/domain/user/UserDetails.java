package com.org.api.domain.user;

import com.org.api.configuration.Auditable;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@Table(name = "users_details")
@EqualsAndHashCode(callSuper = false)
public class UserDetails extends Auditable<String> implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String userName;

    @Column(unique = true)
    private String emailAddress;

    @Transient
    private String createdDate;

    @Transient
    private String updatedDate;

    public UserDetails(String userName, String emailAddress) {
        this.userName = userName;
        this.emailAddress = emailAddress;
    }

    public UserDetails(Long userId, String userName, String emailAddress, String createdDate, String updatedDate) {
        this.userId = userId;
        this.userName = userName;
        this.emailAddress = emailAddress;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }

    public UserDetails() {

    }
}
