package com.org.api.repository.filedetails;

import com.org.api.domain.files.FileDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileDetailsRepository extends CrudRepository<FileDetails, Long> {

    public FileDetails findFirstByOrderByFileIdDesc();
}
