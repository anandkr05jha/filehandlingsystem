package com.org.api.domain.files;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.org.api.configuration.Auditable;
import com.org.api.domain.user.UserDetails;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.beans.Transient;
import java.io.Serializable;
import java.util.List;

@Entity
@Data
@Table(name = "file_information")
@EqualsAndHashCode(callSuper = false)
@ToString(exclude = "userDetails")
public class FileDetails extends Auditable<String> implements Serializable {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY,generator = "fileDetails")
    @SequenceGenerator(name ="fileDetails" ,sequenceName = "fileDetails",allocationSize = 100)
    private Long fileId;

    private String fileName;

    @Lob
    private byte[] data;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "userId")
    private UserDetails userDetails;

    @javax.persistence.Transient
    private String userName;


    @javax.persistence.Transient
    private String createdDate;


    @javax.persistence.Transient
    private String modifiedDate;

    @javax.persistence.Transient
    private List<RevisedFileDetails> revisedFileDetailsList;

    public FileDetails(String fileName, byte[] data, UserDetails userDetails) {
        this.fileName = fileName;
        this.data = data;
        this.userDetails = userDetails;
    }

    public FileDetails() {
    }
}
