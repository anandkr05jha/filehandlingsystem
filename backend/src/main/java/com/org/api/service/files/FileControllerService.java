package com.org.api.service.files;

import com.org.api.util.RevisedFileRO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface FileControllerService {


    ResponseEntity<?> saveFileDetails(MultipartFile file,String userName, String emailAddress);
    ResponseEntity<?> getFileReports();
    ResponseEntity<?> updateFileById(Long fileId, Optional<Long> revisedFileId, String emailAddress,String userName, MultipartFile file);
    ResponseEntity<?> revisedFileById(Long fileId, String fileType);
    ResponseEntity<?> getTreeMapFileReports();
}
