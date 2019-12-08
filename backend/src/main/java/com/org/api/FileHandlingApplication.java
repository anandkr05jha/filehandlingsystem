package com.org.api;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FileHandlingApplication {
	private static final Logger log = LogManager.getLogger(FileHandlingApplication.class);

	public static void main(String[] args) {

		SpringApplication.run(FileHandlingApplication.class, args);
		log.info("|---------------------------------------------------|");
		log.info("|                                                   |");
		log.info("|                 START SERVER                      |");
		log.info("|                                                   |");
		log.info("|---------------------------------------------------|");
	}

}
