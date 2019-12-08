package com.org.api.util;

import lombok.Data;

import javax.persistence.Lob;

@Data
public class RevisedFileVO {

    private Long revisedFileId;
    private String revisedFileName;
    private String userName;
    private String emailAddress;


    @Lob
    private byte[] data;
    private String creationDate;
    private String modifiedDate;

    private String textFileContent;

    private String rootFileName;
    private String rootFileCreatedBy;
    private String rootFileCreationDate;
    private String rootFileModifiedDate;
    private String rootFileUserEmail;

    public RevisedFileVO() {
    }

    public RevisedFileVO(Long revisedFileId, String revisedFileName, String userName, String emailAddress, byte[] data, String creationDate, String modifiedDate, String rootFileName, String rootFileCreatedBy, String rootFileCreationDate, String rootFileModifiedDate,String rootFileUserEmail) {
        this.revisedFileId = revisedFileId;
        this.revisedFileName = revisedFileName;
        this.userName = userName;
        this.emailAddress = emailAddress;
        this.data = data;
        this.creationDate = creationDate;
        this.modifiedDate = modifiedDate;
        this.rootFileName = rootFileName;
        this.rootFileCreatedBy = rootFileCreatedBy;
        this.rootFileCreationDate = rootFileCreationDate;
        this.rootFileModifiedDate = rootFileModifiedDate;
        this.rootFileUserEmail = rootFileUserEmail;
    }
}
