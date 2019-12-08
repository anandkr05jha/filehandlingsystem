package com.org.api.repository.filedetails;

import com.org.api.domain.files.FileDetails;
import com.org.api.domain.files.RevisedFileDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface RevisedFileDetailsRepository extends CrudRepository<RevisedFileDetails, Long> {

    public List<RevisedFileDetails> findAllByFileDetails(FileDetails fileDetails);

    List<RevisedFileDetails> findByCreationDateAfter(Date creationDate);

    List<RevisedFileDetails> findAllByRevisedFileIdAndCreationDateAfter(Long fileId, Date creationDate);

//    public void saveAll(List<RevisedFileDetails> revisedFileDetails);
}
