package com.org.api.util;

import lombok.Data;

@Data
public class RevisedFileRO {

    private String emailAddress;
    private String fileType;
    private String textFileContent;

    public RevisedFileRO() {
    }

    public RevisedFileRO(String emailAddress, String fileType, String textFileContent) {
        this.emailAddress = emailAddress;
        this.fileType = fileType;
        this.textFileContent = textFileContent;
    }
}
