package com.org.api.util;


import com.org.api.domain.files.RevisedFileDetails;
import lombok.Data;

import javax.persistence.Lob;
import java.util.List;

@Data
public class FileDetailsVO {

    private Long fileId;
    private String fileName;

    @Lob
    private byte[] data;

    private Long userId;
    private String userName;
    private String emailAddress;

    private String creationDate;
    private String modifiedDate;

    private String fileTextData;

    List<RevisedFileVO> revisedFileVOList;

    public FileDetailsVO() {
    }

    public FileDetailsVO(Long fileId, String fileName, byte[] data, Long userId, String userName, String emailAddress, List<RevisedFileVO> revisedFileVOList) {
        this.fileId = fileId;
        this.fileName = fileName;
        this.data = data;
        this.userId = userId;
        this.userName = userName;
        this.emailAddress = emailAddress;
        this.revisedFileVOList = revisedFileVOList;
    }

    public FileDetailsVO(Long fileId, String fileName, byte[] data, Long userId, String userName, String emailAddress, String creationDate, String modifiedDate, String fileTextData) {
        this.fileId = fileId;
        this.fileName = fileName;
        this.data = data;
        this.userId = userId;
        this.userName = userName;
        this.emailAddress = emailAddress;
        this.creationDate = creationDate.split(" ")[0];
        this.modifiedDate = modifiedDate.split(" ")[0];
        this.fileTextData = fileTextData;
    }

    public FileDetailsVO(Long fileId, String fileName, byte[] data, String userName, String emailAddress, String address, String s) {
    }


    public FileDetailsVO(Long fileId, String fileName, byte[] data, Long userId, String userName, String emailAddress, String creationDate, String modifiedDate, String fileTextData, List<RevisedFileVO> revisedFileVOList) {
        this.fileId = fileId;
        this.fileName = fileName;
        this.data = data;
        this.userId = userId;
        this.userName = userName;
        this.emailAddress = emailAddress;
        this.creationDate = creationDate.split(" ")[0];
        this.modifiedDate = modifiedDate.split(" ")[0];
        this.fileTextData = fileTextData;
        this.revisedFileVOList = revisedFileVOList;

    }
}
