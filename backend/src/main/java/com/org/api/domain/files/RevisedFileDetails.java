package com.org.api.domain.files;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.org.api.configuration.Auditable;
import com.org.api.domain.user.UserDetails;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@Table(name = "revised_files")
@EqualsAndHashCode(callSuper = false)
@ToString(exclude = "fileDetails")
public class RevisedFileDetails extends Auditable<String> implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "revised_file_info")
    @SequenceGenerator(name = "revised_file_info", sequenceName = "revised_file_info", allocationSize = 100)
    private Long revisedFileId;


    private String revisedFileName;

    @Lob
    private byte[] data;

    private boolean status;

    private Long revisedByRevisedFileId;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "fileId")
    private FileDetails fileDetails;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "userId")
    private UserDetails userDetails;



    public RevisedFileDetails() {
    }

    public RevisedFileDetails(String revisedFileName, byte[] data, FileDetails fileDetails, UserDetails userDetails) {
        this.revisedFileName = revisedFileName;
        this.data = data;
        this.fileDetails = fileDetails;
        this.userDetails = userDetails;
    }

    public RevisedFileDetails(String revisedFileName, byte[] data, FileDetails fileDetails, boolean status, UserDetails userDetails) {
        this.revisedFileName = revisedFileName;
        this.data = data;
        this.fileDetails = fileDetails;
        this.status = status;
        this.userDetails = userDetails;
    }

    public RevisedFileDetails(String revisedFileName, byte[] data, boolean status, Long revisedByRevisedFileId, FileDetails fileDetails, UserDetails userDetails) {
        this.revisedFileName = revisedFileName;
        this.data = data;
        this.status = status;
        this.revisedByRevisedFileId = revisedByRevisedFileId;
        this.fileDetails = fileDetails;
        this.userDetails = userDetails;
    }
}
