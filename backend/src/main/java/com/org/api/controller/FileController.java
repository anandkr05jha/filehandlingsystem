package com.org.api.controller;


import com.org.api.service.files.FileControllerService;
import com.org.api.util.ConverterClass;
import com.org.api.util.ResponseDomain;
import com.org.api.util.RevisedFileRO;
import com.org.api.util.ValidateEntity;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping("/file")
@CrossOrigin
public class FileController {

    private static final Logger log = LogManager.getLogger(FileController.class);

    @Autowired
    private FileControllerService fileControllerService;


    @PostMapping("/save")
    public ResponseEntity<?> saveFileDetails(@RequestPart("file") MultipartFile file,
                                             @RequestParam("userName") String userName,
                                             @RequestParam("email") String emailAddress) {
        log.info("Methods ::: saveFileDetails");
        return fileControllerService.saveFileDetails(file,userName, emailAddress);
    }

    @GetMapping("/reports")
    public ResponseEntity<?> getFileReports() {
        log.info("Method ::: getFileReports");
        return fileControllerService.getFileReports();
    }


    @GetMapping("/tree")
    public ResponseEntity<?> getTreeMapFileReports() {
        log.info("Method ::: getTreeMapFileReports");
        return fileControllerService.getTreeMapFileReports();
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateFileById(@RequestParam("fileId") Long fileId,
                                            @RequestParam("revisedFileId") Optional<Long> revisedFileId,
                                            @RequestParam("userName") String userName,
                                            @RequestParam("email") String emailAddress,
                                            @RequestPart("file") MultipartFile file) {
        log.info("Method ::: updateFileById");
        return fileControllerService.updateFileById(fileId, revisedFileId,userName, emailAddress, file);
    }

    @PutMapping("/{fileId}/{fileType}")
    public ResponseEntity<?> revisedFileById(@PathVariable Long fileId, @PathVariable String fileType) {
        log.info("Method ::: revisedFileById");
        if (fileType.equalsIgnoreCase("Root") || fileType.equalsIgnoreCase("Revised"))
            return fileControllerService.revisedFileById(fileId, fileType);
        else
            return ResponseDomain.badRequest("Invalid Input. Please Enter valid file type (e.g Root,Revised )");
    }
}
