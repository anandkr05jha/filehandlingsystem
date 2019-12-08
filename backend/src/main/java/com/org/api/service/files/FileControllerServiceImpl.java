package com.org.api.service.files;

import com.org.api.domain.files.FileDetails;
import com.org.api.domain.files.RevisedFileDetails;
import com.org.api.domain.user.UserDetails;
import com.org.api.repository.filedetails.FileDetailsRepository;
import com.org.api.repository.filedetails.RevisedFileDetailsRepository;
import com.org.api.repository.filedetails.UserDetailsRepository;
import com.org.api.util.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class FileControllerServiceImpl implements FileControllerService {

    private static final Logger log = LogManager.getLogger(FileControllerServiceImpl.class);

    @Autowired
    private FileDetailsRepository fileDetailsRepository;

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Autowired
    private RevisedFileDetailsRepository revisedFileDetailsRepository;

    @Override
    public ResponseEntity<?> saveFileDetails(MultipartFile file, String userName, String emailAddress) {
        log.info("Method ::: saveCompanyPolicyDoc");
        boolean statusExtension = ValidateEntity.checkExtension(file.getContentType());
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        if (statusExtension && !fileName.contains("..")) {
            if (ConverterClass.convertFileInMB(file.getSize()) <= 5) {
                UserDetails userDetailsEO = userDetailsRepository.findByEmailAddress(emailAddress);
                if (userDetailsEO == null) {
                    String username = (userName != null ? userName : "NA");
                    UserDetails newUser = new UserDetails(username, emailAddress);
                    newUser = userDetailsRepository.save(newUser);
                    UserDetails newUserDetailsEO = userDetailsRepository.findByEmailAddress(newUser.getEmailAddress());
                    if (newUserDetailsEO != null) {
                        boolean saveFileStatus = saveFileStoreService(file, newUserDetailsEO);
                        if (saveFileStatus)
                            return ResponseDomain.postResponse("Your File Successfully Saved");
                    }
                    return ResponseDomain.internalServerError("Due to server issue, currently File not uploaded. Please try again");
                } else {
                    boolean saveFileStatus = saveFileStoreService(file, userDetailsEO);
                    if (saveFileStatus)
                        return ResponseDomain.postResponse("Your File Successfully Saved");
                    return ResponseDomain.internalServerError("Due to server issue, currently File not uploaded. Please try again");
                }
            } else {
                return ResponseDomain.badRequest("File size increase, Max File size : 5MB (.txt), Please upload valid file");
            }
        }
        return ResponseDomain.badRequest("You Enter Invalid File. Please upload 'Text/plain' File");
    }


    @Override
    public ResponseEntity<?> getFileReports() {
        log.info("Method ::: getFileReports");
        Iterable<FileDetails> itr = fileDetailsRepository.findAll();
        List<FileDetailsVO> fileDetailsVOList = new ArrayList<>();
        itr.forEach(fileDetails -> {
            List<RevisedFileDetails> revisedFileDetailsList = revisedFileDetailsRepository.findAllByFileDetails(fileDetails);
            Collections.synchronizedList(revisedFileDetailsList);
            List<RevisedFileVO> revisedFileVOList = new ArrayList<>();


            List<RevisedFileDetails> revisedFileDetailsList1 = new ArrayList<>();
            if (!revisedFileDetailsList.isEmpty()) {
                revisedFileDetailsList.forEach(revisedFileDetails1 -> {
                    String data = null;
                    try {
                        data = new String(revisedFileDetails1.getData(), "UTF-8");
                    } catch (UnsupportedEncodingException e) {
                        e.printStackTrace();
                    }

                    RevisedFileVO revisedFileDetails = new RevisedFileVO();
                    revisedFileDetails.setRevisedFileId(revisedFileDetails1.getRevisedFileId());
                    revisedFileDetails.setRevisedFileName(revisedFileDetails1.getRevisedFileName());
                    revisedFileDetails.setData(revisedFileDetails1.getData());
                    revisedFileDetails.setCreationDate(revisedFileDetails1.getCreationDate().toString());
                    revisedFileDetails.setModifiedDate(revisedFileDetails1.getLastModifiedDate().toString());
                    revisedFileDetails.setUserName(revisedFileDetails1.getUserDetails().getUserName() != null ? revisedFileDetails1.getUserDetails().getUserName() : revisedFileDetails1.getUserDetails().getEmailAddress());
                    revisedFileDetails.setEmailAddress(revisedFileDetails1.getUserDetails().getEmailAddress() != null ? revisedFileDetails1.getUserDetails().getEmailAddress() : "NA");

                    revisedFileDetails.setTextFileContent(data);

                    revisedFileDetails.setRootFileName(revisedFileDetails1.getFileDetails().getFileName());
                    revisedFileDetails.setRootFileCreatedBy(revisedFileDetails1.getFileDetails().getUserDetails().getUserName());
                    revisedFileDetails.setRootFileCreationDate(revisedFileDetails1.getFileDetails().getCreationDate().toString());
                    revisedFileDetails.setRootFileModifiedDate(revisedFileDetails1.getFileDetails().getLastModifiedDate().toString());
                    revisedFileDetails.setRootFileUserEmail(revisedFileDetails1.getFileDetails().getUserDetails().getEmailAddress());
                    revisedFileVOList.add(revisedFileDetails);
                });
            }
            FileDetailsVO fileDetailsVO = new FileDetailsVO(fileDetails.getFileId(),
                    fileDetails.getFileName(), fileDetails.getData(), fileDetails.getUserDetails().getUserId(),
                    fileDetails.getUserDetails().getUserName(), fileDetails.getUserDetails().getEmailAddress(),
                    fileDetails.getCreationDate().toString(), fileDetails.getLastModifiedDate().toString(), "",
                    revisedFileVOList);
            fileDetailsVOList.add(fileDetailsVO);
        });
        return new ResponseEntity<>(fileDetailsVOList, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> updateFileById(Long fileId, Optional<Long> revisedFileId, String userName, String emailAddress, MultipartFile file) {
        log.info("Method ::: updateFileById");
        boolean statusExtension = ValidateEntity.checkExtension(file.getContentType());
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        if (statusExtension && !fileName.contains("..")) {
            if (ConverterClass.convertFileInMB(file.getSize()) <= 5) {
                Optional<FileDetails> fileDetailsEO = fileDetailsRepository.findById(fileId);
                if (!fileDetailsEO.isPresent())
                    return ResponseDomain.internalServerError("File you are trying to Update is currently not exist");
                else {
                    UserDetails userDetailsEO = userDetailsRepository.findByEmailAddress(emailAddress);
                    if (userDetailsEO == null) {
                        String username = (userName != null ? userName : "NA");
                        UserDetails newUser = new UserDetails(username, emailAddress);
                        newUser = userDetailsRepository.save(newUser);
                        UserDetails newUserDetailsEO = userDetailsRepository.findByEmailAddress(newUser.getEmailAddress());
                        if (newUserDetailsEO != null) {
                            boolean status = updateFileStorageService(fileDetailsEO.get(), revisedFileId, fileName, file, newUserDetailsEO);
                            if (status)
                                return ResponseDomain.putResponse("Your File Successfully Updated");
                            return ResponseDomain.internalServerError("Due to server issue, currently File not Updated. Please try again");
                        }
                        return ResponseDomain.internalServerError("Due to server issue, currently File not Revised. Please try again");
                    } else {
                        boolean status = updateFileStorageService(fileDetailsEO.get(), revisedFileId, fileName, file, userDetailsEO);
                        if (status)
                            return ResponseDomain.putResponse("Your File Successfully Updated");
                        return ResponseDomain.internalServerError("Due to server issue, currently File not Updated. Please try again");
                    }
                }
            } else {
                return ResponseDomain.badRequest("File size increase, Max File size : 5MB (.txt), Please upload valid file");
            }
        }
        return ResponseDomain.badRequest("You Enter Invalid File. Please upload 'Text/plain' File");
    }


    @Override
    public ResponseEntity<?> revisedFileById(Long fileId, String fileType) {
        log.info("Method ::: revisedFileById");
        if (fileType.equalsIgnoreCase("Root")) {
            Optional<FileDetails> fileDetails = fileDetailsRepository.findById(fileId);
            if (!fileDetails.isPresent())
                return ResponseDomain.responseNotFound("Sorry, File you are trying to remove doesn't exist");
            else {
                boolean actionStatus = revisedStoredRootFile(fileDetails.get());
                if (actionStatus)
                    return ResponseDomain.putResponse("All Root File Successfully Rolled Back, But Root Can't be Roll Back");
                return ResponseDomain.internalServerError("Something gone wrong, Please try again");
            }
        } else if (fileType.equalsIgnoreCase("Revised")) {
            Optional<RevisedFileDetails> revisedFileDetails = revisedFileDetailsRepository.findById(fileId);
            if (!revisedFileDetails.isPresent())
                return ResponseDomain.responseNotFound("Sorry, File you are trying to remove doesn't exist");
            else {
                boolean actionStatus = revisedStoredRevisedFile(revisedFileDetails.get());
                if (actionStatus)
                    return ResponseDomain.putResponse("File Successfully Rolled Back");
                else
                    return ResponseDomain.internalServerError("Something gone wrong, Please try again");
            }
        }
        return ResponseDomain.badRequest();
    }

    @Override
    public ResponseEntity<?> getTreeMapFileReports() {
        log.info("Method ::: getTreeMapFileReports");
        Iterable<FileDetails> fileDetailsIterable = fileDetailsRepository.findAll();
        List<FileDetailsVO> fileDetailsVOList = new ArrayList<>();
        fileDetailsIterable.forEach(fileDetails -> {
            List<RevisedFileDetails> revisedFileDetailsList = revisedFileDetailsRepository.findAllByFileDetails(fileDetails)
                    .stream()
                    .filter(revisedFileDetails -> revisedFileDetails.isStatus()).collect(Collectors.toList());

            Collections.synchronizedList(revisedFileDetailsList);
            List<RevisedFileVO> revisedFileVOList = new ArrayList<>();


            List<RevisedFileDetails> revisedFileDetailsList1 = new ArrayList<>();
            if (!revisedFileDetailsList.isEmpty()) {
                revisedFileDetailsList.forEach(revisedFileDetails1 -> {
                    String data = null;
                    try {
                        data = new String(revisedFileDetails1.getData(), "UTF-8");
                    } catch (UnsupportedEncodingException e) {
                        e.printStackTrace();
                    }

                    RevisedFileVO revisedFileDetails = new RevisedFileVO();
                    revisedFileDetails.setRevisedFileId(revisedFileDetails1.getRevisedFileId());
                    revisedFileDetails.setRevisedFileName(revisedFileDetails1.getRevisedFileName());
                    revisedFileDetails.setData(revisedFileDetails1.getData());
                    revisedFileDetails.setCreationDate(revisedFileDetails1.getCreationDate().toString());
                    revisedFileDetails.setModifiedDate(revisedFileDetails1.getLastModifiedDate().toString());
                    revisedFileDetails.setUserName(revisedFileDetails1.getUserDetails().getUserName() != null ? revisedFileDetails1.getUserDetails().getUserName() : revisedFileDetails1.getUserDetails().getEmailAddress());
                    revisedFileDetails.setEmailAddress(revisedFileDetails1.getUserDetails().getEmailAddress() != null ? revisedFileDetails1.getUserDetails().getEmailAddress() : "NA");

                    revisedFileDetails.setTextFileContent(data);

                    revisedFileDetails.setRootFileName(revisedFileDetails1.getFileDetails().getFileName());
                    revisedFileDetails.setRootFileCreatedBy(revisedFileDetails1.getFileDetails().getUserDetails().getUserName());
                    revisedFileDetails.setRootFileCreationDate(revisedFileDetails1.getFileDetails().getCreationDate().toString());
                    revisedFileDetails.setRootFileModifiedDate(revisedFileDetails1.getFileDetails().getLastModifiedDate().toString());
                    revisedFileDetails.setRootFileUserEmail(revisedFileDetails1.getFileDetails().getUserDetails().getEmailAddress());
                    revisedFileVOList.add(revisedFileDetails);
                });
            }
            FileDetailsVO fileDetailsVO = new FileDetailsVO(fileDetails.getFileId(),
                    fileDetails.getFileName(), fileDetails.getData(), fileDetails.getUserDetails().getUserId(),
                    fileDetails.getUserDetails().getUserName(), fileDetails.getUserDetails().getEmailAddress(),
                    fileDetails.getCreationDate().toString(), fileDetails.getLastModifiedDate().toString(), "",
                    revisedFileVOList);
            fileDetailsVOList.add(fileDetailsVO);
        });
        return new ResponseEntity<>(fileDetailsVOList, HttpStatus.OK);
    }


    public boolean saveFileStoreService(MultipartFile file, UserDetails userDetails) {
        log.info("Method ::: saveFileService");
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            FileDetails dbFile = new FileDetails(fileName, file.getBytes(), userDetails);
            try {
                fileDetailsRepository.save(dbFile);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return false;
    }

    public boolean updateFileStorageService(FileDetails fileDetailsEO, Optional<Long> revisedFileId, String fileName, MultipartFile revisedFile, UserDetails userDetails) {
        log.info("Method ::: updateFileStorageService");
        try {
            RevisedFileDetails revisedFileDetailsDb = new RevisedFileDetails(fileName,
                    revisedFile.getBytes(),
                    true,
                    revisedFileId.isPresent() ? revisedFileId.get() : null,
                    fileDetailsEO, userDetails);
            try {
                revisedFileDetailsRepository.save(revisedFileDetailsDb);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return false;
    }

    public boolean revisedStoredRootFile(FileDetails fileDetails) {
        log.info("Method ::: revisedStoredRootFile");
        List<RevisedFileDetails> revisedFileDetailsList = revisedFileDetailsRepository.findAllByFileDetails(fileDetails);
        if (!revisedFileDetailsList.isEmpty()) {
            revisedFileDetailsList = revisedFileDetailsList.stream().map(revisedFileDetails -> {
                revisedFileDetails.setStatus(false);
                return revisedFileDetails;
            }).collect(Collectors.toList());
            revisedFileDetailsRepository.saveAll(revisedFileDetailsList);
        }
        try {
//            fileDetailsRepository.delete(fileDetails);
            log.info("Successfully Deleted ");
            return true;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return false;
    }

    public boolean revisedStoredRevisedFile(RevisedFileDetails revisedFileDetails) {
        log.info("Method ::: revisedStoredRevisedFile");
        try {
            List<RevisedFileDetails> revisedFileDetailsList = revisedFileDetailsRepository.findAllByFileDetails(revisedFileDetails.getFileDetails());
            List<RevisedFileDetails> afterCreationDateList = revisedFileDetailsList
                    .stream()
                    .filter(revisedFileDetails1 ->
                            revisedFileDetails1.getCreationDate().after(revisedFileDetails.getCreationDate()))
                    .collect(Collectors.toList());
            if (!revisedFileDetailsList.isEmpty()) {

                afterCreationDateList = afterCreationDateList.stream().map(revisedFileDetails1 -> {
                    revisedFileDetails1.setStatus(false);
                    return revisedFileDetails1;
                }).collect(Collectors.toList());
                revisedFileDetails.setStatus(false);

                revisedFileDetailsRepository.saveAll(afterCreationDateList);
                revisedFileDetailsRepository.save(revisedFileDetails);
                return true;
            } else {
                revisedFileDetails.setStatus(false);
                revisedFileDetailsRepository.save(revisedFileDetails);
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

//    public String updateRootFileById(Long fileId, UserDetails userDetails, MultipartFile file) {
//        log.info("Method ::: deleteRootRevisedFile");
//        Optional<FileDetails> fileDetailsEO = fileDetailsRepository.findById(fileId);
//        if (!fileDetailsEO.isPresent()) {
//            log.info("Invalid Root File. Please, try again to revised File" + HttpStatus.OK);
//        } else {
//            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
//            try {
//                if (fileName.contains("..")) {
//                    log.info("Sorry! Filename contains invalid path sequence " + fileName);
//                }
//                fileDetailsEO.get().setUserDetails(userDetails);
//                fileDetailsEO.get().setFileName(fileName);
//                fileDetailsEO.get().setData(file.getBytes());
//                try {
//                    fileDetailsRepository.save(fileDetailsEO.get());
//                    return "Success";
//                } catch (Exception ex) {
//                    ex.printStackTrace();
//                    return "Fails";
//                }
//            } catch (Exception ex) {
//                ex.printStackTrace();
//                log.info("Could not store file " + fileName + ". Please try again!" + ex);
//            }
//        }
//        return "Incomplete";
//    }
//
//    public String updateRootRevisedFileById(Long fileId, UserDetails userDetails, MultipartFile file) {
//        log.info("Method ::: deleteRootRevisedFile");
//        Optional<RevisedFileDetails> fileDetailsEO = revisedFileDetailsRepository.findById(fileId);
//        if (!fileDetailsEO.isPresent()) {
//            log.info("Invalid Root File. Please, try again to revised File" + HttpStatus.OK);
//        } else {
//            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
//            try {
//                if (fileName.contains("..")) {
//                    log.info("Sorry! Filename contains invalid path sequence " + fileName);
//                }
//                fileDetailsEO.get().setUserDetails(userDetails);
//                fileDetailsEO.get().setRevisedFileName(fileName);
//                fileDetailsEO.get().setData(file.getBytes());
//                try {
//                    revisedFileDetailsRepository.save(fileDetailsEO.get());
//                    return "Success";
//                } catch (Exception ex) {
//                    ex.printStackTrace();
//                    return "Fails";
//                }
//            } catch (Exception ex) {
//                ex.printStackTrace();
//                log.info("Could not store file " + fileName + ". Please try again!" + ex);
//            }
//        }
//        return "Incomplete";
//    }
}
